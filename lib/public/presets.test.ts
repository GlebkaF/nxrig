import { describe, expect, test } from "vitest";
import { presets } from "./presets";

describe("Presets", () => {
  test("presets should match snapshot", { skip: true }, () => {
    expect(presets).toMatchSnapshot();
  });
});
