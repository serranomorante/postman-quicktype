import fetch from "node-fetch";
import { assertIsTypedArray } from "../types";
import {
  isPostmanCollection,
  isPostmanWorkspace,
} from "../types/utils/postman";
import { hasProperty } from "../utils";

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
    const jsonResponse = (await response.json()) as unknown;
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
      `${this.baseUrl}/workspaces/${workspaceId}/collections`,
      {
        headers: {
          "X-Api-Key": this.postmanAPIKey,
        },
      }
    );
    const jsonResponse = (await response.json()) as unknown;
    if (!jsonResponse) {
      throw new Error("No response from Postman API.");
    }

    if (!hasProperty(jsonResponse, "collections")) {
      throw new Error("No collections property in Postman API response.");
    }
    assertIsTypedArray(jsonResponse.collections, isPostmanCollection);
    return jsonResponse.collections;
  }
}
