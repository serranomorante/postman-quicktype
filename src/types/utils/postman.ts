/* eslint-disable @typescript-eslint/no-explicit-any */
import { TPostmanCollection, TPostmanWorkspace } from "../postman";

export function isPostmanWorkspace(arg: any): arg is TPostmanWorkspace {
  return (
    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    typeof arg.id === "string" &&
    typeof arg.name === "string" &&
    typeof arg.type === "string" &&
    typeof arg.visibility === "string"
  );
}

export function isPostmanCollection(arg: any): arg is TPostmanCollection {
  return (
    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    typeof arg.id === "string" &&
    typeof arg.name === "string" &&
    typeof arg.owner === "string" &&
    typeof arg.createdAt === "string" &&
    typeof arg.updatedAt === "string" &&
    typeof arg.uid === "string" &&
    typeof arg.isPublic === "boolean"
  );
}
