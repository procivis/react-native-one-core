import { ONECore } from "./src/core";
export * from "./src/core";
export * from "./src/error";
/**
 * Initialize ONE Core
 * @note Beware that only one instance can be initialized at a time, repeated calls will fail
 * @param config one-core configuration
 * @returns ONE Core instance
 */
export declare function initializeCore(config?: Record<string, unknown>): Promise<ONECore>;
