/**
 * @typedef {Object} AppConfig
 * @property {string} apiBaseUrl - Base URL for backend API requests.
 * @property {Object} tianditu - Tianditu map service config.
 * @property {string} tianditu.key - Tianditu API key.
 * @property {Object} tecentMap - Tencent Map service config.
 * @property {string} tecentMap.key - Tencent Map API key.
 * @property {Object} weixin - Weixin (WeChat) config.
 * @property {string} weixin.appId - Weixin application ID.
 */


/** @type {AppConfig} */
const DEFAULT_CONFIG = Object.freeze({
    apiBaseUrl: 'xxx',
    tianditu: {
        key: 'xxx',
    },
    tecentMap: {
        key: "xxx",
    },
    weixin: {
        appId: 'xxx',
    },
});

/** @type {AppConfig | null} */
let cachedConfig = null;
/** @type {Promise<AppConfig> | null} */
let loadingPromise = null;

/** Deeply freeze an object to avoid accidental runtime mutation. */
function deepFreeze(obj) {
    if (obj && typeof obj === 'object' && !Object.isFrozen(obj)) {
        Object.freeze(obj);
        for (const key of Object.keys(obj)) {
            deepFreeze(obj[key]);
        }
    }
    return obj;
}

/**
 * 将用户配置浅层合并到默认值中。
 * @param {AppConfig} defaults
 * @param {Partial<AppConfig>} overrides
 * @returns {AppConfig}
 */
function merge(defaults, overrides) {
    const out = {...defaults};
    if (overrides && typeof overrides === 'object') {
        if (typeof overrides.apiBaseUrl === 'string') out.apiBaseUrl = overrides.apiBaseUrl;
        if (overrides.tianditu && typeof overrides.tianditu === 'object') {
            out.tianditu = {...defaults.tianditu, ...overrides.tianditu};
        }
        if (overrides.weixin && typeof overrides.weixin === 'object') {
            out.weixin = {...defaults.weixin, ...overrides.weixin};
        }
    }
    return /** @type {AppConfig} */(out);
}

/**
 * 从 public 目录加载 config.json 并缓存它。
 * 多次通话安全；并发调用共享相同的承诺。
 *
 * @param {boolean} [forceReload=false] - 即使已缓存，也强制重新获取。
 * @returns {Promise<AppConfig>} 已解析的应用程序配置。
 */
export function loadConfig(forceReload = false) {
    if (cachedConfig && !forceReload) return Promise.resolve(cachedConfig);
    if (loadingPromise && !forceReload) return loadingPromise;

    const url = `${import.meta.env.BASE_URL || '/'}config.json?t=${Date.now()}`;
    loadingPromise = fetch(url, {cache: forceReload ? 'reload' : 'default'})
        .then(async (res) => {
            if (!res.ok) throw new Error(`Failed to load config.json: ${res.status} ${res.statusText}`);
            return /** @type {Partial<AppConfig>} */ (await res.json());
        })
        .then((userConfig) => {
            cachedConfig = deepFreeze(merge(DEFAULT_CONFIG, userConfig));
            return cachedConfig;
        })
        .catch((err) => {
            // Fall back to defaults if config.json missing, but keep an error in console for visibility.
            console.warn('[config-center] Using DEFAULT_CONFIG due to error:', err);
            cachedConfig = DEFAULT_CONFIG;
            return cachedConfig;
        })
        .finally(() => {
            // Keep the promise for future calls only if not cached (should be cached on success/fallback)
            loadingPromise = null;
        });

    return loadingPromise;
}

/**
 * 同步获取最后加载的配置。您应该在应用程序引导期间调用一次 loadConfig()。
 * 最佳实践：使用函数式访问，例如 const value = () => getConfig().some.nested.value;
 * @returns {AppConfig}
 */
export function getConfig() {
    if (!cachedConfig) {
        console.warn('[config-center] getConfig() used before loadConfig(). Returning DEFAULT_CONFIG.');
        return DEFAULT_CONFIG;
    }
    return cachedConfig;
}

/**
 * 通过点路径从配置中获取嵌套值，例如'weixin.appId'.
 * @template T
 * @param {string} path
 * @param {T} [fallback]
 * @returns {T | unknown}
 */
export function getConfigValue(path, fallback) {
    const cfg = getConfig();
    const parts = String(path).split('.').filter(Boolean);
    let cur = /** @type {any} */ (cfg);
    for (const p of parts) {
        if (cur && Object.prototype.hasOwnProperty.call(cur, p)) {
            cur = cur[p];
        } else {
            return fallback;
        }
    }
    return cur ?? fallback;
}

