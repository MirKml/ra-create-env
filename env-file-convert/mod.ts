/// <reference types="npm:@types/node" />
import { createWriteStream, readFileSync } from "node:fs";

function envFileConvert( inputFileName: string, outputFileName: string, options: {},
) {
  const inputLines = readFileSync(inputFileName, "utf-8").split(/\r?\n/);

  const outputWriteStream = createWriteStream(outputFileName);
  for (const line of inputLines) {
    outputWriteStream.write(processLine(line), "utf8", (err: Error) => {
      if (err) {
        console.error("Error writing to file:", err);
      } else {
        console.log("Data has been written to the file.");
        outputWriteStream.end();
      }
    });

    outputWriteStream.close();
  }
}

function processLine(line: string) {
  const outputLine = line.replace("<base_url>", "outputbaseurl");
  return outputLine + "\n";
}
