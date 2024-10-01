import { NativeModules } from "react-native";
import { OneError, OneErrorCode } from "./src/error";
export * from "./src/core";
export * from "./src/error";
const ONE = NativeModules.ProcivisOneCoreModule;
// Config entities are exposed as serialized JSON, here conversion to structs
const originalGetConfig = ONE.getConfig;
ONE.getConfig = () => originalGetConfig().then((config) => objectMap(config, (entities) => objectMap(entities, (json) => JSON.parse(json))));
/**
 * Initialize ONE Core for Holder
 * @note Beware that only one instance can be initialized at a time, repeated calls will fail
 * @returns ONE Core instance
 */
export async function initializeHolderCore() {
    await wrapFn(ONE.initializeHolder, "initializeHolderCore")();
    return wrapObj(ONE);
}
/**
 * Initialize ONE Core for Verifier
 * @note Beware that only one instance can be initialized at a time, repeated calls will fail
 * @returns ONE Core instance
 */
export async function initializeVerifierCore() {
    await wrapFn(ONE.initializeVerifier, "initializeVerifierCore")();
    return wrapObj(ONE);
}
// UTILS
// returns a new object with the values at each key mapped using fn(value)
const objectMap = (obj, fn) => Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, fn(v)]));
// Function call arguments/Error transformation
// for devs: Beware to not declare function parameters as optional, otherwise automatic conversion to null will not be performed
function wrapFn(fn, name) {
    return (...args) => {
        const errHandler = (cause) => {
            const code = (cause ?? {}).code;
            if (Object.values(OneErrorCode).includes(code)) {
                // throw a specific error to be able to handle it easily
                throw new OneError({
                    code,
                    cause,
                    message: cause?.message,
                });
            }
            else {
                throw cause;
            }
        };
        // set name on the err handler to display the original function name in callstack
        Object.defineProperty(errHandler, "name", { value: name });
        // convert undefined parameters to null for proper parameter matching in native code
        return fn(...args.map((x) => (x === undefined ? null : x))).catch(errHandler);
    };
}
function wrapObj(obj) {
    return Object.entries(obj).reduce((aggr, [key, fn]) => ({
        ...aggr,
        [key]: typeof fn === "function" ? wrapFn(fn, key) : fn,
    }), {});
}
