#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import { ingestPostmanAPIKey } from "./cli/utils";
import { TArguments } from "./types";
import { isDefined } from "./utils";
import { PostmanAPIService } from "./service/PostmanAPIService";

const parser = yargs(hideBin(process.argv))
  .middleware(ingestPostmanAPIKey)
  .option("k", {
    alias: "postman-api-key",
    describe: "Postman API Key",
    type: "string",
  });

void (async () => {
  const argv: TArguments = await parser.argv;

  const postmanAPIKey = argv.k;

  if (!isDefined(postmanAPIKey)) {
    throw new Error(
      "You must provide a Postman API key via the command line or environment variable."
    );
  }

  const postmanService = new PostmanAPIService(postmanAPIKey);
  postmanService
    .getWorkspaces()
    .then((workspaces) => {
      console.log("workspaces", workspaces);
    })
    .catch((err) => {
      console.error("err", err);
    });

  // console.log("#1 argv", argv);
})();
