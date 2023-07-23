import { z } from "zod";
import { ConfigFileSchema } from "./utils/schemas.js";

export type TArguments = {
  [x: string]: unknown;
  /**
   * The postman api key
   */
  k: string | undefined;
};

export type TPackageJSONFile = {
  name: string;
  version: string;
};

// export type TConfigurationPath = {
//   extractFrom: string;
//   saveTo?: string;
// };
//
// export type TConfigFile = {
//   paths: TConfigurationPath[];
//   separator: string;
// };

export type TConfigFile = z.infer<typeof ConfigFileSchema>;
