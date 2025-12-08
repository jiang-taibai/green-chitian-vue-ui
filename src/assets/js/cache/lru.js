export class LRUCache {
    /**
     * @param {string} id 实例唯一标识（必填，仅用于区分实例，不做持久化）
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
     * 异步初始化：纯内存实现，不做任何加载，预留接口以兼容之前用法
     * @returns {Promise<void>}
     */
    async init() {
        // no-op
    }

    /** 获取并提升为最近使用 */
    get(key) {
        if (!this._map.has(key)) return undefined;
        const value = this._map.get(key);
        this._map.delete(key);
        this._map.set(key, value);
        return value;
    }

    /** 写入，如果存在则更新并提升；容量超限时驱逐最旧项 */
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
        return this;
    }

    /** 删除一个键 */
    delete(key) {
        return this._map.delete(key);
    }

    /** 清空 */
    clear() {
        this._map.clear();
    }

    /** 返回所有键，按从旧到新（被驱逐优先） */
    keys() {
        return Array.from(this._map.keys());
    }

    /** 返回所有值，按从旧到新 */
    values() {
        return Array.from(this._map.values());
    }

    /** 可选：设置新容量（若变小则立即按 LRU 驱逐） */
    resize(newCapacity) {
        if (!Number.isFinite(newCapacity) || newCapacity <= 0) {
            throw new Error("LRUCache: newCapacity must be a positive finite number");
        }
        this._capacity = Math.floor(newCapacity);
        while (this._map.size > this._capacity) {
            const oldestKey = this._map.keys().next().value;
            this._map.delete(oldestKey);
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
