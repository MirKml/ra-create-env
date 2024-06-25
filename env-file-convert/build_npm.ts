import { build, emptyDir } from "@deno/dnt";

await emptyDir("./npm");

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  shims: {
    // see JS docs for overview and more options
    deno: "dev"
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
      "@types/node": "^20.*"
    }
  },
  postBuild() {
    // steps to run after building and before running the tests
    //Deno.Command(copyFileSync("LICENSE", "npm/LICENSE");
    //Deno.copyFileSync("README.md", "npm/README.md");
  },
});

