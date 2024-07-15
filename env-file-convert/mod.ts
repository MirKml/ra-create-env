// @deno-types="npm:@types/node"
import { createWriteStream, readFileSync } from "node:fs";
import type { EnvOptions } from "./options.ts";

export function envFileConvert(
  inputFileName: string,
  outputFileName: string,
  options: EnvOptions,
  afterWriting?: () => void,
) {
  let inputFileContent = readFileSync(inputFileName, "utf-8");

  // remove multi line comments which starts on first character and starts with double **
  // e.g
  // /** first line
  //  *  next line
  //  *  next line
  //  */
  const multilineCommentRegex = /^\/\*\*[\s\S]*?\*\//g;
  inputFileContent = inputFileContent.replace(multilineCommentRegex, "");

  const inputLines = inputFileContent.split(/\r?\n/);
  const outputWriteStream = createWriteStream(outputFileName, {
    encoding: "utf-8",
  });

  outputWriteStream.write(
    `// =====================================================
// THIS FILE WAS GENERATED, BE AWARE OF MANUAL EDITING!
// =====================================================`,
    "utf-8",
  );

  let hasWriteError = false;
  outputWriteStream.on("error", (error) => {
    console.error("error occurs when writing to file: ", error);
    hasWriteError = true;
  });

  for (const line of inputLines) {
    if (hasWriteError) {
      break;
    }

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

export function createDefaultOptions(): EnvOptions {
  return {
    baseUrl: "",
    apiBaseUrl: "",
    enableTestBanner: false,
    identityServer: {
      appAuthBaseUrl: "",
      authorityUrl: "",
    },
    swaggerUrl: "",
  };
}

export function setOptionsByBaseUrl(options: EnvOptions, baseUrl: string) {
  options.baseUrl = baseUrl;
  options.apiBaseUrl = baseUrl + "web/api";
  options.signalRUrl = baseUrl + "web/signalR";
  options.swaggerUrl = options.apiBaseUrl;
  options.identityServer.appAuthBaseUrl = baseUrl;
  return options;
}

export function enableOptionAppConfig(options: EnvOptions, configFile = "config.json") {
  options.appConfigUrl = options.baseUrl + configFile;
  return options;
}

export function setOptionsByCustomerLocal(
  options: EnvOptions,
  customer: string,
  moduleName: string,
) {
  options.baseUrl = "/" + customer + "/Modules/" + moduleName + "/";
  options = setOptionsByBaseUrl(options, options.baseUrl);
  options.identityServer.authorityUrl = "/" + customer + "/identity";
  return options;
}

function setOptionsSignalRMock(options: EnvOptions) {
  options.signalRUrl = options.apiBaseUrl + "/signalR";
  return options;
}

export function setOptionsByMockServer(
  options: EnvOptions,
  suffix: "local" | "dev",
) {
  options.baseUrl = "/";
  options.apiBaseUrl = "/mock-server-" + suffix;
  options.swaggerUrl = options.apiBaseUrl;
  options = setOptionsSignalRMock(options);
  // use local commit file for local development of backend build info
  options.backendBuildInfoUrl = options.baseUrl + "backend-build-example.json";
  options.enableTestBanner = true;
  return options;
}

export function setOptionsBackendInfoUrl(options: EnvOptions, url?: string) {
  options.backendBuildInfoUrl = options.baseUrl +
    (url ?? "backend-build-info/build-info.json");
  return options;
}

/**
 * nice build options pipeline :-)
 * @param funcs
 * @returns (options: EnvOptions) => EnvOptions
 */
export function buildOptionsPipe(
  ...funcs: ((options: EnvOptions) => EnvOptions)[]
) {
  return (value: EnvOptions) =>
    funcs.reduce((value, fn) => {
      return fn(value);
    }, value);
}

export function getUrlModuleSuffix(appModule: string) {
  return "/Modules/" + appModule;
}
