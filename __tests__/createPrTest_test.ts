import { assertEquals } from "@std/assert";
import { createEnvPrTest } from "../mod.ts";

Deno.test(
  "pr test env test",
  { sanitizeResources: false, sanitizeOps: false },
  () => {
    createEnvPrTest(
      "./__tests__/env.js",
      "test",
      "sako",
      "crm",
      "1543",
      "pd3.waste.js.client",
      "openid profile offline_access email roles pd1_identity_resource pd3_waste_apigateway",
      true,
      function () {
        const result = Deno.readTextFileSync("./__tests__/env.js");
        const expect = Deno.readTextFileSync(
          "./__tests__/assert-expects/prTest.js",
        );
        assertEquals(result, expect);
        Deno.removeSync("./__tests__/env.js");
      },
    );
  },
);
