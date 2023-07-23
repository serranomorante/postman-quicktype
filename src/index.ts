#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import { ingestPostmanAPIKey } from "./cli/utils.js";
import { isDefined, isUndefined } from "./utils/index.js";
import { PostmanAPIService } from "./service/PostmanAPIService.js";
import { findUpSync } from "find-up";
import { readFileSync } from "fs";
import {
  ConfigFileSchema,
  TArgvSchemaWithConfig,
} from "./types/utils/schemas.js";

const configPath = findUpSync(".typegen.json");

if (isUndefined(configPath)) {
  throw new Error("Configuration file is missing.");
}

const config = ConfigFileSchema.parse(
  JSON.parse(readFileSync(configPath, { encoding: "utf-8", flag: "r" }))
);

const parser = yargs(hideBin(process.argv))
  .middleware(ingestPostmanAPIKey)
  .option("k", {
    alias: "postman-api-key",
    describe: "Postman API Key",
    type: "string",
  })
  .config(config)
  .fail((msg, err, yargs) => {
    if (err) throw err; // preserve stack
    console.error("You broke it!");
    console.error(msg);
    console.error("You should be doing", yargs.help());
    process.exit(1);
  });

void (async () => {
  const argv = TArgvSchemaWithConfig.parse(await parser.argv);

  const postmanAPIKey = argv.k;

  if (!isDefined(postmanAPIKey)) {
    throw new Error(
      "You must provide a Postman API key via the command line or environment variable."
    );
  }

  const postmanService = new PostmanAPIService(postmanAPIKey);
  const workspacesResponse = await postmanService.getWorkspaces();
  const workspace = workspacesResponse.find(
    (workspace) => workspace.name === "GEMS"
  );
  if (isUndefined(workspace)) {
    throw new Error("No workspace found.");
  }
  const collectionsResponse = await postmanService.getCollections(workspace.id);
  const collection = collectionsResponse.find(
    (collection) => collection.name === "Auth"
  );
  if (isUndefined(collection)) {
    throw new Error("No collection found.");
  }
  const collectionResponse = await postmanService.getCollection(collection.uid);
  console.log(collectionResponse);
})();
