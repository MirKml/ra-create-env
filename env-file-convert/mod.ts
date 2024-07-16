// @deno-types="npm:@types/node"
import { createWriteStream, readFileSync } from "node:fs";
import {
  buildOptionsPipe,
  createDefaultOptions,
  enableOptionAppConfig,
  type EnvOptions,
  setOptionsBackendInfoUrl,
  setOptionsByBaseUrl,
} from "./options.ts";

export type { EnvironmentConfig } from "./EnvironmentConfig.ts";
export { buildOptionsPipe, createDefaultOptions, enableOptionAppConfig };
export { setOptionsByMockServer } from "./options.ts";

export function envFileCreate(
  outputFileName: string,
  options: EnvOptions,
  inputFileName?: string,
  afterWriting?: () => void,
) {
  const inputFileContent = readFileSync(
    inputFileName ?? import.meta.dirname + "/env-template.ts",
    "utf-8",
  );
  const inputLines = inputFileContent.split(/\r?\n/);

  const outputWriteStream = createWriteStream(outputFileName, {
    encoding: "utf-8",
  });

  let hasWriteError = false;
  outputWriteStream.on("error", (error) => {
    console.error("error occurs when writing to file: ", error);
    hasWriteError = true;
  });

  outputWriteStream.write(
    `// =====================================================
// THIS FILE WAS GENERATED, BE AWARE OF MANUAL EDITING!
// =====================================================
`,
    "utf-8",
  );

  let startProcessing = false;
  for (const line of inputLines) {
    if (hasWriteError) {
      break;
    }

    // start processing when globalThis is found, it strips all initial comments
    // and typescript stuff
    if (!startProcessing && line.startsWith("globalThis.createEnvConfig")) {
      startProcessing = true;
    }
    if (!startProcessing) continue;

    outputWriteStream.write(processLine(line, options), "utf8");
  }

  outputWriteStream.end(() => afterWriting?.());

  if (options.appConfigUrl) {
    console.warn(
      "warning: appConfigUrl option is obsolete, complicated, error prone\n" +
        "  try to use backend solution for frontend application configuration",
    );
  }
}

function processLine(line: string, options: EnvOptions) {
  // keep empty lines as is
  if (line.trim().length === 0) return "\n";

  const outputLine = line.replace("<base_url>", options.baseUrl)
    .replace("<api_base_url>", options.apiBaseUrl)
    .replace("<log_server_url>", options.logServerUrl || "")
    .replace("<signal_r_url>", options.signalRUrl || "")
    .replace("<swagger_url>", options.swaggerUrl)
    .replace("<id_server_authority_url>", options.identityServer.authorityUrl)
    .replace(
      "<id_server_app_auth_base_url>",
      options.identityServer.appAuthBaseUrl,
    )
    .replace("<backend_build_info_url>", options.backendBuildInfoUrl || "")
    .replace("<app_config_url>", options.appConfigUrl || "")
    .replace(
      /ENABLE_TEST_BANNER: [a-z]+/,
      "ENABLE_TEST_BANNER: " + (options.enableTestBanner ? "true" : "false"),
    );

  return outputLine + "\n";
}

export function getUrlModuleSuffix(appModule: string) {
  return "/Modules/" + appModule;
}

export function createEnvPrTest(
  baseUrlSuffix: string,
  customer: string,
  appModule: string,
  pullRequestId: string,
  enableAppConfig = false,
) {
  // base url must be without "prid" suffix before setOptionsByBaseUrl is called
  // "prid" suffix is presented only in baseUrl, isn't in api url, and other urls
  const pdAppBaseUrl = `/${customer}_${baseUrlSuffix}`.replace("-", "_")
    .toUpperCase();
  const baseUrl = pdAppBaseUrl + getUrlModuleSuffix(appModule) + "/";

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

  envFileCreate(
    "env-file-convert/__tests__/env.js",
    options,
  );
}
