import { MMKV, MMKVConfiguration } from './MMKV';
/**
 * Use the default, shared MMKV instance.
 */
export declare function useMMKV(): MMKV;
/**
 * Use a custom MMKV instance with the given configuration.
 * @param configuration The configuration to initialize the MMKV instance with. Does not have to be memoized.
 */
export declare function useMMKV(configuration: MMKVConfiguration): MMKV;
/**
 * Use the string value of the given `key` from the given MMKV storage instance.
 *
 * If no instance is provided, a shared default instance will be used.
 *
 * @example
 * ```ts
 * const [username, setUsername] = useMMKVString("user.name")
 * ```
 */
export declare const useMMKVString: (key: string, instance?: MMKV) => [value: string | undefined, setValue: (value: string | ((current: string | undefined) => string | undefined) | undefined) => void];
/**
 * Use the number value of the given `key` from the given MMKV storage instance.
 *
 * If no instance is provided, a shared default instance will be used.
 *
 * @example
 * ```ts
 * const [age, setAge] = useMMKVNumber("user.age")
 * ```
 */
export declare const useMMKVNumber: (key: string, instance?: MMKV) => [value: number | undefined, setValue: (value: number | ((current: number | undefined) => number | undefined) | undefined) => void];
/**
 * Use the boolean value of the given `key` from the given MMKV storage instance.
 *
 * If no instance is provided, a shared default instance will be used.
 *
 * @example
 * ```ts
 * const [isPremiumAccount, setIsPremiumAccount] = useMMKVBoolean("user.isPremium")
 * ```
 */
export declare const useMMKVBoolean: (key: string, instance?: MMKV) => [value: boolean | undefined, setValue: (value: boolean | ((current: boolean | undefined) => boolean | undefined) | undefined) => void];
/**
 * Use the buffer value (unsigned 8-bit (0-255)) of the given `key` from the given MMKV storage instance.
 *
 * If no instance is provided, a shared default instance will be used.
 *
 * @example
 * ```ts
 * const [privateKey, setPrivateKey] = useMMKVBuffer("user.privateKey")
 * ```
 */
export declare const useMMKVBuffer: (key: string, instance?: MMKV) => [value: Uint8Array | undefined, setValue: (value: Uint8Array | ((current: Uint8Array | undefined) => Uint8Array | undefined) | undefined) => void];
/**
 * Use an object value of the given `key` from the given MMKV storage instance.
 *
 * If no instance is provided, a shared default instance will be used.
 *
 * The object will be serialized using `JSON`.
 *
 * @example
 * ```ts
 * const [user, setUser] = useMMKVObject<User>("user")
 * ```
 */
export declare function useMMKVObject<T>(key: string, instance?: MMKV): [
    value: T | undefined,
    setValue: (value: T | undefined | ((prevValue: T | undefined) => T | undefined)) => void
];
/**
 * Listen for changes in the given MMKV storage instance.
 * If no instance is passed, the default instance will be used.
 * @param valueChangedListener The function to call whenever a value inside the storage instance changes
 * @param instance The instance to listen to changes to (or the default instance)
 *
 * @example
 * ```ts
 * useMMKVListener((key) => {
 *   console.log(`Value for "${key}" changed!`)
 * })
 * ```
 */
export declare function useMMKVListener(valueChangedListener: (key: string) => void, instance?: MMKV): void;
//# sourceMappingURL=hooks.d.ts.map