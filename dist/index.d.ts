import { ONECore } from "./src/core";
export * from "./src/core";
export * from "./src/error";
/**
 * Initialize ONE Core for Holder
 * @note Beware that only one instance can be initialized at a time, repeated calls will fail
 * @returns ONE Core instance
 */
export declare function initializeHolderCore(): Promise<ONECore>;
/**
 * Initialize ONE Core for Verifier
 * @note Beware that only one instance can be initialized at a time, repeated calls will fail
 * @returns ONE Core instance
 */
export declare function initializeVerifierCore(): Promise<ONECore>;
