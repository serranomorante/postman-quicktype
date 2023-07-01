import { TPackageJSONFile } from "../common";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function isPackageJSONFile(arg: any): arg is TPackageJSONFile {
  return (
    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    typeof arg === "object" &&
    typeof arg.name === "string" &&
    typeof arg.version === "string"
  );
}
