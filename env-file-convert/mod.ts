// @deno-types="npm:@types/node"
import { createWriteStream, readFileSync } from "node:fs";

export function envFileConvert(
  inputFileName: string,
  outputFileName: string,
  options: {},
) {
  const inputLines = readFileSync(inputFileName, "utf-8").split(/\r?\n/);

  const outputWriteStream = createWriteStream(outputFileName);
  let hasWriteError = false;
  for (const line of inputLines) {
    if (hasWriteError) {
      break;
    }

    outputWriteStream.write(processLine(line), "utf8", (err) => {
      if (err) {
        console.error("Error writing to file:", err);
        hasWriteError = true;
      }
    });
  }

  outputWriteStream.close();
}

function processLine(line: string) {
  const outputLine = line.replace("<base_url>", "outputbaseurl");
  return outputLine + "\n";
}
