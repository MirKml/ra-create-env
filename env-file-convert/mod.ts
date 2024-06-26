// @deno-types="npm:@types/node"
import { createWriteStream, readFileSync } from "node:fs";
import type { EnvOptions } from "./options.ts";

export function envFileConvert(
  inputFileName: string,
  outputFileName: string,
  options: EnvOptions,
) {
  const inputLines = readFileSync(inputFileName, "utf-8").split(/\r?\n/);

  const outputWriteStream = createWriteStream(outputFileName);
  let hasWriteError = false;
  for (const line of inputLines) {
    if (hasWriteError) {
      break;
    }

    outputWriteStream.write(processLine(line, options), "utf8", (err) => {
      if (err) {
        console.error("error occurs when writing to file:", err);
        hasWriteError = true;
      }
    });
  }

  outputWriteStream.close();
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
    .replace("<app_config_url>", options.appConfigUrl || "");

  return outputLine + "\n";
}

function setOptionsByBaseUrl(options: EnvOptions, baseUrl: string) {
  options.apiBaseUrl = baseUrl + "web/api";
  // api config url is used only in dustbins, will be replaced later with backend config solution
  options.appConfigUrl = baseUrl + "config.json";
  options.signalRUrl = baseUrl + "web/signalR";
  options.swaggerUrl = options.apiBaseUrl;
  options.identityServer.appAuthBaseUrl = options.baseUrl;
  return options;
}
