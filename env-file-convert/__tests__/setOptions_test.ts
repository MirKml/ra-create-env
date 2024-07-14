import { assertEquals } from "@std/assert";
import {
  buildOptionsPipe,
  createDefaultOptions,
  setOptionsByMockServer,
} from "../mod.ts";

Deno.test("setOptionsByMockServer test", () => {
  const options = buildOptionsPipe(
    (options) => setOptionsByMockServer(options, "local"),
  )(createDefaultOptions());

  assertEquals(options.baseUrl, "/");
  assertEquals(options.apiBaseUrl, "/mock-server-local");
  assertEquals(options.appConfigUrl, "/config-default.json");
  assertEquals(options.swaggerUrl, options.apiBaseUrl);
  assertEquals(options.backendBuildInfoUrl, "/backend-build-example.json");
});
