#!/usr/bin/env -S deno run --allow-read --allow-write
import { parseArgs } from "jsr:@std/cli@^0.224.3";
import {
  buildOptionsPipe,
  createDefaultOptions,
  enableOptionAppConfig,
  envFileConvert,
  getUrlModuleSuffix,
  setOptionsBackendInfoUrl,
  setOptionsByBaseUrl,
} from "./env-file-convert/mod.ts";

function printHelp() {
  console.log(
    "create-env-pr-test.ts [-h|help] OPTIONS\n" +
      "create configuration for pull request test environments\n\n" +
      "available options:\n" +
      "--base-url-suffix <name>: mandatory - suffix for base url https://host.name/<CUSTOMER>_<NAME>\n" +
      '   transforms suffix strings like this - for options "test", "first-test"\n' +
      "   TEST, FIRST_TEST will be in url as result\n" +
      '--customer <name>: mandatory - customer name mandatory - e.g. "sako"\n' +
      '--app-module <name>: mandatory - module name e.g. "crm"\n' +
      '--pull-request-id <id>: mandatory - pull request identifier e.g. "1294"\n' +
      '--enable-app-config: enable customer application configuration (will be deprecated), default disabled\n',
  );
}

function main() {
  const args = parseArgs(Deno.args, {
    alias: { "h": "help" },
    boolean: ["help", "enable-app-config"],
    string: ["base-url", "customer", "app-module", "pull-request-id"],
  });

  if (args.help) {
    printHelp();
    Deno.exit();
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
  const enableAppConfig = args["enable-app-config"];

  if (!pullRequestId) {
    console.error("pull-request-id options is mandatory, see --help");
    Deno.exit(1);
  }

  // base url must be without "prid" suffix before setOptionsByBaseUrl is called
  // "prid" suffix is presented only in baseUrl, isn't in api url, and other urls
  const pdAppBaseUrl = `/${customer}_${baseUrlSuffix}`.replace("-", "_")
    .toUpperCase();
  const baseUrl = pdAppBaseUrl + getUrlModuleSuffix(appModule) + "/";

  //@todo add optional appConfigUrl, is used only for some modules e.g. dustbins
  const options = buildOptionsPipe(
    (options) => setOptionsByBaseUrl(options, baseUrl),
    (options) => enableAppConfig ? enableOptionAppConfig(options) : options,
    (options) => {
      options.identityServer.authorityUrl = pdAppBaseUrl + "/identity";
      //add "prid" - pull request id - suffix
      options.baseUrl += `prid-${pullRequestId}/`;
      options.enableTestBanner = true;
      return options;
    },
    (options) => setOptionsBackendInfoUrl(options),
  )(createDefaultOptions());

  envFileConvert(
    "env-file-convert/__tests__/env-template.ts",
    "env-file-convert/__tests__/env.js",
    options,
  );
}

main();
