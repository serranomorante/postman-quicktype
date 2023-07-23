import fetch from "node-fetch";
import { assertIsTypedArray, assertIsTypedObject } from "../types/index.js";
import {
  isPostmanCollection,
  isPostmanCollections,
  isPostmanWorkspace,
} from "../types/utils/postman.js";
import { hasProperty } from "../utils/index.js";

export class PostmanAPIService {
  postmanAPIKey: string;
  baseUrl = "https://api.getpostman.com";

  constructor(postmanAPIKey: string, baseUrl?: string) {
    this.baseUrl = baseUrl || this.baseUrl;
    this.postmanAPIKey = postmanAPIKey;
  }

  public async getWorkspaces() {
    const response = await fetch(`${this.baseUrl}/workspaces`, {
      headers: {
        "X-Api-Key": this.postmanAPIKey,
      },
    });
    const jsonResponse = await response.json();
    if (!jsonResponse) {
      throw new Error("No response from Postman API.");
    }
    if (!hasProperty(jsonResponse, "workspaces")) {
      throw new Error("No workspaces property in Postman API response.");
    }
    assertIsTypedArray(jsonResponse.workspaces, isPostmanWorkspace);
    return jsonResponse.workspaces;
  }

  public async getCollections(workspaceId: string) {
    const response = await fetch(
      `${this.baseUrl}/collections?workspace=${workspaceId}`,
      {
        headers: {
          "X-Api-Key": this.postmanAPIKey,
        },
      }
    );
    const jsonResponse = await response.json();
    if (!jsonResponse) {
      throw new Error("No response from Postman API.");
    }

    if (!hasProperty(jsonResponse, "collections")) {
      throw new Error("No collections property in Postman API response.");
    }
    assertIsTypedArray(jsonResponse.collections, isPostmanCollections);
    return jsonResponse.collections;
  }

  public async getCollection(collectionId: string) {
    const response = await fetch(
      `${this.baseUrl}/collections/${collectionId}`,
      {
        headers: {
          "X-Api-Key": this.postmanAPIKey,
        },
      }
    );
    const jsonResponse = await response.json();
    if (!jsonResponse) {
      throw new Error("No response from Postman API.");
    }
    if (!hasProperty(jsonResponse, "collection")) {
      throw new Error("No collection property in Postman API response.");
    }
    assertIsTypedObject(jsonResponse.collection, isPostmanCollection);
    return jsonResponse.collection;
  }
}
