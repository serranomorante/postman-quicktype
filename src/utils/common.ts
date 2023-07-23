/**
 * Whether the given argument is not null neither undefined.
 *
 * @param arg - The argument to check.
 */
export function isDefined<T>(arg: T): arg is NonNullable<typeof arg> {
  return arg !== undefined && arg !== null;
}

/**
 * Whether T is undefined or not.
 */
type IsUndefined<T> = T extends undefined ? T : never;

/**
 * Whether the given argument is undefined or not.
 *
 * @param arg - The argument to check.
 */
export function isUndefined<T>(arg: T): arg is IsUndefined<typeof arg> {
  return typeof arg === "undefined";
}

/**
 * Whether the given object has the given property.
 *
 * @param obj - The object to check.
 * @param key - The property to check.
 */
export function hasProperty<T extends object, K extends PropertyKey>(
  obj: T,
  key: K
): obj is T & Record<K, unknown> {
  return key in obj;
}
