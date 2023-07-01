/**
 * Whether the given argument is not null neither undefined.
 *
 * @param arg - The argument to check.
 */
export function isDefined<T>(arg: T): arg is NonNullable<typeof arg> {
  return arg !== undefined && arg !== null;
}

export function hasProperty<T extends object, K extends PropertyKey>(
  obj: T,
  key: K
): obj is T & Record<K, unknown> {
  return key in obj;
}
