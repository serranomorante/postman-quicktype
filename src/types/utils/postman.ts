/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  TPostmanCollection,
  TPostmanCollections,
  TPostmanWorkspace,
} from "../postman.js";

export function isPostmanWorkspace(arg: any): arg is TPostmanWorkspace {
  return (
    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    typeof arg.id === "string" &&
    typeof arg.name === "string" &&
    typeof arg.type === "string" &&
    typeof arg.visibility === "string"
  );
}

export function isPostmanCollections(arg: any): arg is TPostmanCollections {
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

export function isPostmanCollection(arg: any): arg is TPostmanCollection {
  return (
    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    typeof arg.info === "object" &&
    typeof arg.info._postman_id === "string" &&
    typeof arg.info.name === "string" &&
    typeof arg.info.schema === "string" &&
    typeof arg.info.updatedAt === "string" &&
    typeof arg.info.uid === "string" &&
    Array.isArray(arg.item)
  );
}
