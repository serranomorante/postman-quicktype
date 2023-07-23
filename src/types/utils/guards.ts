/* eslint-disable @typescript-eslint/no-explicit-any */

export function assertIsTypedObject<T>(
  arg: any,
  check: (val: any) => val is T
): asserts arg is T {
  if (!check(arg)) {
    throw new Error(`Invalid type: ${JSON.stringify(arg, null, 2)}`);
  }
}

export function assertIsTypedArray<T>(
  arg: any,
  check: (val: any) => val is T
): asserts arg is T[] {
  if (!Array.isArray(arg)) {
    throw new Error(`Not an array: ${JSON.stringify(arg)}`);
  }
  if (arg.some((item) => !check(item))) {
    throw new Error(`Invalid type: ${JSON.stringify(arg)}`);
  }
}
