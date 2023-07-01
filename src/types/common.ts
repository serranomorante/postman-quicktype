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
