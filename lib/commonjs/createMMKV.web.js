"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMMKV = void 0;
var _createTextEncoder = require("./createTextEncoder");
/* global localStorage */

const canUseDOM = typeof window !== 'undefined' && window.document?.createElement != null;
const hasAccessToLocalStorage = () => {
  try {
    // throws ACCESS_DENIED error
    window.localStorage;
    return true;
  } catch {
    return false;
  }
};
const KEY_WILDCARD = '\\';
const inMemoryStorage = new Map();
const createMMKV = config => {
  if (config.encryptionKey != null) {
    throw new Error("MMKV: 'encryptionKey' is not supported on Web!");
  }
  if (config.path != null) {
    throw new Error("MMKV: 'path' is not supported on Web!");
  }

  // canUseDOM check prevents spam in Node server environments, such as Next.js server side props.
  if (!hasAccessToLocalStorage() && canUseDOM) {
    console.warn('MMKV: LocalStorage has been disabled. Your experience will be limited to in-memory storage!');
  }
  const storage = () => {
    if (!canUseDOM) {
      throw new Error('Tried to access storage on the server. Did you forget to call this in useEffect?');
    }
    if (!hasAccessToLocalStorage()) {
      return {
        getItem: key => inMemoryStorage.get(key) ?? null,
        setItem: (key, value) => inMemoryStorage.set(key, value),
        removeItem: key => inMemoryStorage.delete(key),
        clear: () => inMemoryStorage.clear(),
        length: inMemoryStorage.size,
        key: index => Object.keys(inMemoryStorage).at(index) ?? null
      };
    }
    const domStorage = global?.localStorage ?? window?.localStorage ?? localStorage;
    if (domStorage == null) {
      throw new Error(`Could not find 'localStorage' instance!`);
    }
    return domStorage;
  };
  const textEncoder = (0, _createTextEncoder.createTextEncoder)();
  if (config.id.includes(KEY_WILDCARD)) {
    throw new Error('MMKV: `id` cannot contain the backslash character (`\\`)!');
  }
  const keyPrefix = `${config.id}${KEY_WILDCARD}`; // mmkv.default\\
  const prefixedKey = key => {
    if (key.includes('\\')) {
      throw new Error('MMKV: `key` cannot contain the backslash character (`\\`)!');
    }
    return `${keyPrefix}${key}`;
  };
  return {
    clearAll: () => {
      const keys = Object.keys(storage());
      for (const key of keys) {
        if (key.startsWith(keyPrefix)) {
          storage().removeItem(key);
        }
      }
    },
    delete: key => storage().removeItem(prefixedKey(key)),
    set: (key, value) => {
      storage().setItem(prefixedKey(key), value.toString());
    },
    getString: key => storage().getItem(prefixedKey(key)) ?? undefined,
    getNumber: key => {
      const value = storage().getItem(prefixedKey(key));
      if (value == null) return undefined;
      return Number(value);
    },
    getBoolean: key => {
      const value = storage().getItem(prefixedKey(key));
      if (value == null) return undefined;
      return value === 'true';
    },
    getBuffer: key => {
      const value = storage().getItem(prefixedKey(key));
      if (value == null) return undefined;
      return textEncoder.encode(value);
    },
    getAllKeys: () => {
      const keys = Object.keys(storage());
      return keys.filter(key => key.startsWith(keyPrefix)).map(key => key.slice(keyPrefix.length));
    },
    contains: key => storage().getItem(prefixedKey(key)) != null,
    recrypt: () => {
      throw new Error('`recrypt(..)` is not supported on Web!');
    }
  };
};
exports.createMMKV = createMMKV;
//# sourceMappingURL=createMMKV.web.js.map