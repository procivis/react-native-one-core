import { NativeModules } from "react-native";
import { OneError } from "./src/error";
import { ONECore, interfaceMethodNames } from "./src/core";
import * as ubiqu from "./src/ubiqu";

export * from "./src/core";
export * from "./src/error";

export const Ubiqu = ubiqu;
export declare namespace Ubiqu {
  export type PinEventType = ubiqu.PinEventType;
  export type PinFlowType = ubiqu.PinFlowType;
  export type PinFlowStage = ubiqu.PinFlowStage;
}

const ONE = NativeModules.ProcivisOneCoreModule;

// New Architecture bridgeless issue workaround: see https://github.com/facebook/react-native/issues/43221
interfaceMethodNames.forEach((method) => ONE?.[method]);

// Config entities are exposed as serialized JSON, here conversion to structs
const originalGetConfig: () => Promise<
  Record<
    string /* entity type */,
    Record<string /* entity identifier */, string /* json */>
  >
> = ONE?.getConfig;
if (originalGetConfig) {
  ONE.getConfig = () =>
    originalGetConfig().then((config) =>
      objectMap(config, (entities) =>
        objectMap(entities, (json) => JSON.parse(json))
      )
    );
}

/**
 * Initialize ONE Core
 * @note Beware that only one instance can be initialized at a time, repeated calls will fail
 * @param config one-core configuration
 * @returns ONE Core instance
 */
export async function initializeCore(
  config: Record<string, unknown> = {}
): Promise<ONECore> {
  await wrapFn(ONE.initialize, "initializeCore")(JSON.stringify(config));
  return wrapObj(ONE);
}

// UTILS
// returns a new object with the values at each key mapped using fn(value)
const objectMap = <Source, Result>(
  obj: Record<string, Source>,
  fn: (value: Source) => Result
): Record<string, Result> =>
  Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, fn(v)]));

// Function call arguments/Error transformation
// for devs: Beware to not declare function parameters as optional, otherwise automatic conversion to null will not be performed

function wrapFn<Fn extends (...args: any[]) => Promise<any>>(
  fn: Fn,
  operation: string
) {
  return (...args: any[]) => {
    const errHandler = (e: unknown) => {
      if (e instanceof Error && "code" in e) {
        const userInfo =
          "userInfo" in e && typeof e.userInfo === "object"
            ? e.userInfo
            : undefined;
        const cause =
          userInfo && "cause" in userInfo && typeof userInfo.cause === "string"
            ? userInfo.cause
            : undefined;

        throw new OneError({
          operation,
          code: e.code as string,
          message: e.message,
          cause,
          originalError: e,
        });

        // iOS additional fields: "nativeStackIOS"
        // android additional fields: "nativeStackAndroid"
      } else {
        throw e;
      }
    };

    // set name on the err handler to display the original function name in callstack
    Object.defineProperty(errHandler, "name", { value: operation });

    return fn(...args).catch(errHandler) as unknown as Fn;
  };
}

function wrapObj<T extends Record<string, (...args: any[]) => Promise<any>>>(
  obj: T
): T {
  return Object.entries(obj).reduce(
    (aggr, [key, fn]) => ({
      ...aggr,
      [key]: typeof fn === "function" ? wrapFn(fn, key) : fn,
    }),
    {} as T
  );
}
