import { assertEquals } from "@std/assert";
import { createEnvDev } from "../mod.ts";

Deno.test(
  "frontend dev env test",
  { sanitizeResources: false, sanitizeOps: false },
  () => {
    createEnvDev(
      "./__tests__/env.js", "/frontend-dev/dustbins/", false,
      function () {
        const result = Deno.readTextFileSync("./__tests__/env.js");
        const expect = Deno.readTextFileSync(
          "./__tests__/assert-expects/feDev.js",
        );
        assertEquals(result, expect);
        Deno.removeSync("./__tests__/env.js");
      },
    );
  },
);
