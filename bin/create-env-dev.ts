#!/usr/bin/env -S deno run --allow-read --allow-write
import { parseArgs } from "./deps.ts";
import { createEnvDev } from "../mod.ts";

function printHelp() {
  console.log(
    "create-env-dev.ts [-h|help] OPTIONS\n" +
      "create configuration for frontend only dev environments\n\n" +
      "mandatory options:\n" +
      "--output <file>: output file\n" +
      "--base-url <url>: base url, format like /url/path/ \n" +
      "\n" +
      "optional options:\n" +
      "--enable-app-config: enable customer application configuration (will be deprecated)",
  );
  console.log(
    "\nexample:\n" +
      "bin/create-env-dev.ts --base-url /frontend-dev/dustbins/ \\\n" +
      "--enable-app-config \\\n" +
      "--output __tests__/env.js",
  );
  console.log(
    '\nfor MSYS2 based shells, disable mangling / for C:/msys64/, e.g. with MSYS2_ARG_CONV_EXCL="*"\n' +
      "see https://stackoverflow.com/a/65570275",
  );
}

function main() {
  const args = parseArgs(Deno.args, {
    alias: { "h": "help" },
    boolean: ["help", "enable-app-config"],
    string: [
      "output",
      "base-url",
    ],
  });

  if (args.help) {
    printHelp();
    Deno.exit();
  }

  const outputFile = args.output;
  if (!outputFile) {
    console.error("--output options is mandatory, see --help");
    Deno.exit(1);
  }
  const baseUrl = args["base-url"];
  if (!baseUrl) {
    console.error("--base-url options is mandatory, see --help");
    Deno.exit(1);
  }

  const enableAppConfig = args["enable-app-config"];
  console.log(baseUrl);
  createEnvDev(
    outputFile,
    baseUrl,
    enableAppConfig,
  );
}

main();
