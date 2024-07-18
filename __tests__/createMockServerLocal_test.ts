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
    )(createDefaultOptions(
      "pd3.waste.js.client",
      "openid profile offline_access email roles pd1_identity_resource pd3_waste_apigateway",
    ));

    envFileCreate(
      "./__tests__/env.js",
      options,
      undefined,
      function () {
        const result = Deno.readTextFileSync("./__tests__/env.js");
        const expect = Deno.readTextFileSync(
          "./__tests__/assert-expects/mockServerLocal.js",
        );
        assertEquals(result, expect);
        Deno.removeSync("./__tests__/env.js");
      },
    );
  },
);
