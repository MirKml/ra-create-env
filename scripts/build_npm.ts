import { build, emptyDir } from "@deno/dnt";

await emptyDir("../npm");

await build({
  entryPoints: ["./mod.ts"],
  outDir: "../npm",
  shims: {
    deno: "dev",
  },
  // no cjs/umd output, only esm
  scriptModule: false,
  // typescript source also isn't important
  skipSourceOutput: true,
  typeCheck: "single",
  // no tests
  test: false,
  declaration: "inline",
  package: {
    // package.json properties
    name: "@raltra/env-config",
    version: Deno.args[0],
    description: "environment configuration tools",
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
 * execute command in particular directory, multi platform support
 * Deno.Command is very unfriendly especially on Windows
 * copied from dnt, thx to https://github.com/dsherret
 * @param command
 * @param workDir
 * @returns command output
 */
function runCommand(command: string[], workDir: string) {
  let executedCommand: string;
  let args: string[];
  if (Deno.build.os === "windows") {
    executedCommand = "powershell";
    args = ["-Command", ...command];
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

console.log("[after dnt] @types/node as devDependencies only");
console.log(runCommand(["npm", "rm", "@types/node"], "../npm"));
console.log(runCommand(["npm", "install", "-D", "@types/node@^20.*"], "../npm"));

console.log("[after dnt] remove picocolors");
console.log(runCommand(["npm", "rm", "picocolors"], "../npm"));

console.log("[after dnt] copy npmrc");
Deno.copyFileSync("./npmrc-src", "../npm/.npmrc");
