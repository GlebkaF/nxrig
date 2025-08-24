import { Chain } from "lib/core/interface";

export interface Preset {
  id: string;
  title: string;
  origin: {
    artist: Artist;
    song: string;
    part: string;
    imageUrl: string | null;
  };
  description: string;
  chain: Chain;
  slug: string;
}

export interface Artist {
  title: string;
  slug: string;
}
