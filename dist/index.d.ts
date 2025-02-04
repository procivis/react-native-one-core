import { ONECore } from "./src/core";
import * as ubiqu from "./src/ubiqu";
export * from "./src/core";
export * from "./src/error";
export declare const Ubiqu: typeof ubiqu;
export declare namespace Ubiqu {
    type PinEventType = ubiqu.PinEventType;
    type PinFlowType = ubiqu.PinFlowType;
    type PinFlowStage = ubiqu.PinFlowStage;
}
/**
 * Initialize ONE Core
 * @note Beware that only one instance can be initialized at a time, repeated calls will fail
 * @param config one-core configuration
 * @returns ONE Core instance
 */
export declare function initializeCore(config?: Record<string, unknown>): Promise<ONECore>;
