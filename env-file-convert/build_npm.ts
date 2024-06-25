import { build, emptyDir } from "@deno/dnt";

await emptyDir("./npm");

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  shims: {
    deno: "dev",
  },
  // no cjs/umd output, only esm
  scriptModule: false,
  typeCheck: "single",
  package: {
    // package.json properties
    name: "@raltra/env-file-convert",
    version: Deno.args[0],
    description: "Your package.",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/username/repo.git",
    },
    bugs: {
      url: "https://github.com/username/repo/issues",
    },
    dependencies: {},
    devDependencies: {
      "@types/node": "^20",
    },
  },
});

/**
 * execute command in particular directory, Deno.Command is very unfriendly
 * especially on Windows
 * copy from dnt, thx to https://github.com/dsherret
 * @param command
 * @param workDir
 * @returns command output
 */
function runCommand(command: string[], workDir: string) {
  let executedCommand: string;
  let args: string[];
  if (Deno.build.os === "windows") {
    executedCommand = "cmd";
    args = ["/c", ...command];
  } else {
    [executedCommand, ...args] = command;
  }

  const process = new Deno.Command(executedCommand, {
    args,
    cwd: workDir,
  });

  const output = process.outputSync();
  if (!output.success) {
    throw new Error(
      `${command.join(" ")} failed with exit code ${output.code}`,
    );
  }

  return new TextDecoder().decode(output.stdout);
}

console.log("@types/node as devDependencies only");
console.log(runCommand(["npm", "rm", "@types/node"], "./npm"));
console.log(runCommand(["npm", "install", "-D", "@types/node@^20.*"], "./npm"));

console.log("remove picocolors");
console.log(runCommand(["npm", "rm", "picocolors"], "./npm"));
