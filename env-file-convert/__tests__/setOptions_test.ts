import { assertEquals } from "@std/assert";
import {
  buildOptionsPipe,
  createDefaultOptions,
  enableOptionAppConfig,
  setOptionsByMockServer,
} from "../mod.ts";

Deno.test("setOptionsByMockServer test", () => {
  const options = buildOptionsPipe(
    (options) => setOptionsByMockServer(options, "local"),
    (options) => enableOptionAppConfig(options, "config-default.json"),
  )(createDefaultOptions(
    "pd3.waste.js.client",
    "openid profile",
  ));

  assertEquals(options.baseUrl, "/");
  assertEquals(options.apiBaseUrl, "/mock-server-local");
  assertEquals(options.appConfigUrl, "/config-default.json");
  assertEquals(options.swaggerUrl, options.apiBaseUrl);
  assertEquals(options.backendBuildInfoUrl, "/backend-build-example.json");
});
