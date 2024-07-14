import { assertEquals } from "@std/assert";
import {
  buildOptionsPipe,
  createDefaultOptions,
  envFileConvert,
  setOptionsByMockServer,
} from "../mod.ts";

Deno.test(
  "mock server local convert test",
  { sanitizeResources: false, sanitizeOps: false },
  () => {
    const options = buildOptionsPipe(
      (options) => setOptionsByMockServer(options, "local"),
    )(createDefaultOptions());

    envFileConvert(
      "./__tests__/env-template.ts",
      "./__tests__/env.js",
      options,
      function() {
        const result = Deno.readTextFileSync("./__tests__/env.js");
        const expect = Deno.readTextFileSync(
          "./__tests__/mockServerLocalResult.js",
        );
        assertEquals(result, expect);
        Deno.removeSync("./__tests__/env.js");
      }
    );

  },
);
