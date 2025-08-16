import { describe, it, expect } from "vitest";

import { createDefaultChain } from "./create-chain";

describe("create-default-chain", () => {
  it("should match snapshot", () => {
    expect(createDefaultChain()).toMatchSnapshot();
  });
});
