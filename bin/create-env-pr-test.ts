#!/usr/bin/env -S deno run --allow-read --allow-write
import { parseArgs } from "jsr:@std/cli@^0.224.3";
import { createEnvPrTest } from "../mod.ts";

function printHelp() {
  console.log(
    "create-env-pr-test.ts [-h|help] OPTIONS\n" +
      "create configuration for pull request test environments\n\n" +
      "mandatory options:\n" +
      "--output <file>: output file\n" +
      "--identity-client-id <id>: identity server client id\n" +
      "--identity-scope <scope>: identity server scope\n" +
      "--base-url-suffix <name>: suffix for base url https://host.name/<CUSTOMER>_<NAME>\n" +
      '   transforms suffix strings like this - for options "test", "first-test"\n' +
      "   TEST, FIRST_TEST will be in url as result\n" +
      '--customer <name>: customer name mandatory - e.g. "sako"\n' +
      '--app-module <name>: module name e.g. "crm"\n' +
      '--pull-request-id <id>:  pull request identifier e.g. "1294"\n' +
      "\n" +
      "optional options:\n" +
      "--enable-app-config: enable customer application configuration (will be deprecated)",
  );
  console.log(
    "\nexample:\n" +
      "bin/create-env-pr-test.ts --identity-client-id pd3.waste.js.client \\\n" +
      "--identity-scope 'openid profile offline_access email roles pd1_identity_resource pd3_waste_apigateway' \\\n" +
      "--base-url-suffix test \\\n" +
      "--customer sako \\\n" +
      "--app-module crm \\\n" +
      "--pull-request-id 14532 \\\n" +
      "--enable-app-config \\\n" +
      "--output __tests__/env.js",
  );
}

function main() {
  const args = parseArgs(Deno.args, {
    alias: { "h": "help" },
    boolean: ["help", "enable-app-config"],
    string: [
      "output",
      "base-url-suffix",
      "customer",
      "app-module",
      "pull-request-id",
      "identity-client-id",
      "identity-scope",
    ],
  });

  if (args.help) {
    printHelp();
    Deno.exit();
  }

  const outputFile = args.output;
  if (!outputFile) {
    console.error("output suffix options is mandatory, see --help");
    Deno.exit(1);
  }
  const baseUrlSuffix = args["base-url-suffix"];
  if (!baseUrlSuffix) {
    console.error("base-url-suffix options is mandatory, see --help");
    Deno.exit(1);
  }
  const customer = args.customer;
  if (!customer) {
    console.error("customer options is mandatory, see --help");
    Deno.exit(1);
  }
  const appModule = args["app-module"];
  if (!appModule) {
    console.error("app-module options is mandatory, see --help");
    Deno.exit(1);
  }
  const pullRequestId = args["pull-request-id"];
  if (!pullRequestId) {
    console.error("pull-request-id options is mandatory, see --help");
    Deno.exit(1);
  }
  const identityClientId = args["identity-client-id"];
  if (!identityClientId) {
    console.error("identity-client-id options is mandatory, see --help");
    Deno.exit(1);
  }
  const identityScope = args["identity-scope"];
  if (!identityScope) {
    console.error("identity-scope options is mandatory, see --help");
    Deno.exit(1);
  }

  const enableAppConfig = args["enable-app-config"];

  createEnvPrTest(
    outputFile,
    baseUrlSuffix,
    customer,
    appModule,
    pullRequestId,
    identityClientId,
    identityScope,
    enableAppConfig,
  );
}

main();
