import { ArgumentsCamelCase, Omit } from "yargs";

/**
 * Checks for a Postman API key in the command line arguments or environment variables.
 * Throws an error if not found.
 *
 * This is an unpure function that mutates the argv to inject the env-obtained api-key.
 *
 * @param argv - The command line arguments.
 */
export function ingestPostmanAPIKey(
  argv: ArgumentsCamelCase<Omit<object, keyof string[]> & string[]>
) {
  const { k } = argv;
  if (!k) {
    const envPostmanApiKey = process.env.POSTMAN_API_KEY || "";
    if (!envPostmanApiKey) {
      throw new Error(
        "You must provide a Postman API key via the command line or environment variable."
      );
    }
    argv.k = envPostmanApiKey;
  }
}
