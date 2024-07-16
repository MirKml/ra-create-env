import { assertEquals } from "@std/assert";
import {
  buildOptionsPipe,
  createDefaultOptions,
  envFileCreate,
  setOptionsByMockServer,
} from "../mod.ts";

Deno.test(
  "mock server local convert test",
  { sanitizeResources: false, sanitizeOps: false },
  () => {
    const options = buildOptionsPipe(
      (options) => setOptionsByMockServer(options, "local"),
    )(createDefaultOptions());

    envFileCreate(
      "./__tests__/env.js",
      options,
      undefined,
      function () {
        const result = Deno.readTextFileSync("./__tests__/env.js");
        const expect = Deno.readTextFileSync(
          "./__tests__/mockServerLocalResult.js",
        );
        assertEquals(result, expect);
        Deno.removeSync("./__tests__/env.js");
      },
    );
  },
);
