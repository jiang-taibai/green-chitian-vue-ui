// A lightweight runtime config center that loads public/config.json once and caches it.
// Provides JSDoc typedefs for IDE type hinting.

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
    apiBaseUrl: 'http://111.230.80.160:18088/',
    tianditu: {
        key: '62f493357ff4a1d542d07733b7803fd7',
    },
    tecentMap: {
        key: "KP6BZ-WOB3I-5K2GM-UPTW2-4MXIQ-B3BAN",
    },
    weixin: {
        appId: 'wx9a1c74e8fbc93fb8',
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
 * Perform a shallow merge of user config into defaults.
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
 * Load config.json from the public directory and cache it.
 * Safe to call multiple times; concurrent calls share the same promise.
 *
 * @param {boolean} [forceReload=false] - Force re-fetch even if cached.
 * @returns {Promise<AppConfig>} The resolved application config.
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
 * Get the last loaded config synchronously. You should call loadConfig() once during app bootstrap.
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
 * Convenience helper to retrieve apiBaseUrl.
 * @returns {string}
 */
export function getApiBaseUrl() {
    return getConfig().apiBaseUrl || DEFAULT_CONFIG.apiBaseUrl;
}

/**
 * Get a nested value from config via a dot path, e.g. 'weixin.appId'.
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

