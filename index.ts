import { NativeModules } from "react-native";
import { OneError, OneErrorCode } from "./src/error";
import { ONECore } from "./src/core";

export * from "./src/core";
export * from "./src/error";

const ONE = NativeModules.ProcivisOneCoreModule;

// Config entities are exposed as serialized JSON, here conversion to structs
const originalGetConfig: () => Promise<
  Record<
    string /* entity type */,
    Record<string /* entity identifier */, string /* json */>
  >
> = ONE.getConfig;
ONE.getConfig = () =>
  originalGetConfig().then((config) =>
    objectMap(config, (entities) =>
      objectMap(entities, (json) => JSON.parse(json))
    )
  );

/**
 * Initialize ONE Core for Holder
 * @note Beware that only one instance can be initialized at a time, repeated calls will fail
 * @returns ONE Core instance
 */
export async function initializeHolderCore(): Promise<ONECore> {
  await wrapFn(ONE.initializeHolder, "initializeHolderCore")();
  return wrapObj(ONE);
}

/**
 * Initialize ONE Core for Verifier
 * @note Beware that only one instance can be initialized at a time, repeated calls will fail
 * @returns ONE Core instance
 */
export async function initializeVerifierCore(): Promise<ONECore> {
  await wrapFn(ONE.initializeVerifier, "initializeVerifierCore")();
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
  name: string
) {
  return (...args: any[]) => {
    const errHandler = (cause: any) => {
      const code = (cause ?? {}).code;
      if (Object.values(OneErrorCode).includes(code)) {
        // throw a specific error to be able to handle it easily
        throw new OneError({
          code,
          cause,
          message: cause?.message,
        });
      } else {
        throw cause;
      }
    };

    // set name on the err handler to display the original function name in callstack
    Object.defineProperty(errHandler, "name", { value: name });

    // convert undefined parameters to null for proper parameter matching in native code
    return fn(...args.map((x) => (x === undefined ? null : x))).catch(
      errHandler
    ) as unknown as Fn;
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
