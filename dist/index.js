import { NativeModules } from "react-native";
import { OneError } from "./src/error";
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
function wrapFn(fn, operation) {
    return (...args) => {
        const errHandler = (e) => {
            if (e instanceof Error && "code" in e) {
                throw new OneError({
                    operation,
                    code: e.code,
                    message: e.message,
                    cause: "cause" in e ? e.cause : undefined,
                    originalError: e
                });
                // iOS additional fields: "domain", "nativeStackIOS"
                // android additional fields: "nativeStackAndroid"
            }
            else {
                throw e;
            }
        };
        // set name on the err handler to display the original function name in callstack
        Object.defineProperty(errHandler, "name", { value: operation });
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
