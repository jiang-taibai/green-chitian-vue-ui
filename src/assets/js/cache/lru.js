// IndexedDB 辅助：数据库与对象仓库
const DB_NAME = "green-chitian-cache";
const STORE_NAME = "lru";

function openDB() {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open(DB_NAME, 1);
        req.onupgradeneeded = () => {
            const db = req.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, {keyPath: "id"});
            }
        };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

async function idbGet(id) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readonly");
        const store = tx.objectStore(STORE_NAME);
        const req = store.get(id);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => reject(req.error);
    });
}

async function idbPut(record) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);
        const req = store.put(record);
        req.onsuccess = () => resolve(true);
        req.onerror = () => reject(req.error);
    });
}

async function idbDelete(id) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);
        const req = store.delete(id);
        req.onsuccess = () => resolve(true);
        req.onerror = () => reject(req.error);
    });
}

async function idbGetAllKeys() {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readonly");
        const store = tx.objectStore(STORE_NAME);
        const req = store.getAllKeys();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => reject(req.error);
    });
}

export class LRUCache {
    /**
     * @param {string} id 实例唯一标识（必填且同源唯一）
     * @param {number} capacity 最大容量（>0）
     */
    constructor(id, capacity = 100) {
        if (typeof id !== "string" || !id) {
            throw new Error("LRUCache: id must be a non-empty string");
        }
        if (!Number.isFinite(capacity) || capacity <= 0) {
            throw new Error("LRUCache: capacity must be a positive finite number");
        }
        this._id = id;
        this._capacity = Math.floor(capacity);
        this._map = new Map();
        this._persistScheduled = false;
    }

    /** 实例标识 */
    get id() {
        return this._id;
    }

    /** 最大容量 */
    get capacity() {
        return this._capacity;
    }

    /** 当前元素数量 */
    get size() {
        return this._map.size;
    }

    /** 判断是否存在 */
    has(key) {
        return this._map.has(key);
    }

    /**
     * 异步初始化：从 IndexedDB 载入已有实例数据
     * @returns {Promise<void>}
     */
    async init() {
        try {
            const rec = await idbGet(this._id);
            if (rec && rec.entries && Array.isArray(rec.entries)) {
                // 载入时保持原始顺序（从旧到新）
                this._map.clear();
                for (const [k, v] of rec.entries) {
                    this._map.set(k, v);
                }
                // 容量以存档为准（若存在），否则用当前容量
                if (Number.isFinite(rec.capacity) && rec.capacity > 0) {
                    this._capacity = Math.floor(rec.capacity);
                }
                // 超出容量时做一次修剪
                while (this._map.size > this._capacity) {
                    const oldestKey = this._map.keys().next().value;
                    this._map.delete(oldestKey);
                }
            }
        } catch (e) {
            // 忽略读取错误，使用空缓存
            // 可以在需要时上报日志
        }
    }

    /** 获取并提升为最近使用 */
    get(key) {
        if (!this._map.has(key)) return undefined;
        const value = this._map.get(key);
        this._map.delete(key);
        this._map.set(key, value);
        // 读取不强制持久化（顺序改变不一定需要落盘），但可选择持久化
        this._schedulePersist();
        return value;
    }

    /** 写入，如果存在则更新并提升；容量超限时驱逐最旧项，并持久化 */
    set(key, value) {
        if (typeof key !== "string") {
            throw new Error("LRUCache: key must be a string");
        }
        if (this._map.has(key)) {
            this._map.delete(key);
        }
        this._map.set(key, value);
        while (this._map.size > this._capacity) {
            const oldestKey = this._map.keys().next().value;
            this._map.delete(oldestKey);
        }
        this._schedulePersist();
        return this;
    }

    /** 删除一个键，并持久化 */
    delete(key) {
        const res = this._map.delete(key);
        if (res) this._schedulePersist();
        return res;
    }

    /** 清空，并持久化 */
    clear() {
        this._map.clear();
        this._schedulePersist();
    }

    /** 返回所有键，按从旧到新（被驱逐优先） */
    keys() {
        return Array.from(this._map.keys());
    }

    /** 返回所有值，按从旧到新 */
    values() {
        return Array.from(this._map.values());
    }

    /** 可选：设置新容量（若变小则立即按 LRU 驱逐），并持久化 */
    resize(newCapacity) {
        if (!Number.isFinite(newCapacity) || newCapacity <= 0) {
            throw new Error("LRUCache: newCapacity must be a positive finite number");
        }
        this._capacity = Math.floor(newCapacity);
        while (this._map.size > this._capacity) {
            const oldestKey = this._map.keys().next().value;
            this._map.delete(oldestKey);
        }
        this._schedulePersist();
    }

    /** 将当前实例持久化到 IndexedDB */
    async _persist() {
        try {
            const entries = Array.from(this._map.entries());
            await idbPut({id: this._id, capacity: this._capacity, entries});
        } catch (e) {
            // 持久化失败时静默，必要时上报
        }
    }

    _schedulePersist() {
        if (this._persistScheduled) return;
        this._persistScheduled = true;
        Promise.resolve().then(() => {
            this._persistScheduled = false;
            this._persist();
        });
    }

    /** 列出所有已持久化的实例 ID */
    static async listInstanceIds() {
        try {
            const keys = await idbGetAllKeys();
            return keys;
        } catch {
            return [];
        }
    }

    /** 删除某个已持久化的实例 */
    static async removeInstance(id) {
        try {
            await idbDelete(id);
            return true;
        } catch {
            return false;
        }
    }
}

/**
 * 工厂方法，便于创建实例
 * @param {string} id 实例唯一标识
 * @param {number} capacity
 * @returns {LRUCache}
 */
export function createLRU(id, capacity = 100) {
    return new LRUCache(id, capacity);
}
