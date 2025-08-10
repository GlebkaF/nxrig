import { describe, it, expect } from "vitest";

import { createDefaultChain } from "./create-default-chain";
import { Blocks } from "../interface";

describe("create-default-chain", () => {
  it("creates chain with required keys and default noisegate", () => {
    const chain = createDefaultChain();

    // required keys exist
    const requiredKeys = Object.values(Blocks);
    for (const key of requiredKeys) {
      expect(chain).toHaveProperty(key);
    }

    // noisegate default config
    expect(chain[Blocks.Noisegate]).toBeTruthy();
    expect(chain[Blocks.Noisegate]?.type).toBe(Blocks.Noisegate);
    expect(chain[Blocks.Noisegate]?.enabled).toBe(true);
    expect(chain[Blocks.Noisegate]?.params).toEqual({
      Sensitivity: 50,
      Decay: 50,
    });

    // others are null
    expect(chain[Blocks.Compressor]).toBeNull();
    expect(chain[Blocks.Modulation]).toBeNull();
    expect(chain[Blocks.Effect]).toBeNull();
    expect(chain[Blocks.Amplifier]).toBeNull();
    expect(chain[Blocks.Cabinet]).toBeNull();
    expect(chain[Blocks.Eq]).toBeNull();
    expect(chain[Blocks.Reverb]).toBeNull();
    expect(chain[Blocks.Delay]).toBeNull();
  });
});
