import { Chain } from "lib/core/interface";

export interface Preset {
  id: string;
  title: string;
  origin: {
    artist: string;
    song: string;
    part: string;
    // imageUrl: string | null;
  };
  description: string;
  chain: Chain;
}
