import { describe, expect, test } from "vitest";
import { config } from "./config";

describe("Config", () => {
  test("compressor should to match snapshot", () => {
    expect(config).toMatchSnapshot();
  });
});
