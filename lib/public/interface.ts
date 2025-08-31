import { Chain } from "lib/core/interface";

export interface Preset {
  id: string;
  origin: {
    artist: Artist;
    song: string;
    part: string;
    imageUrl: string | null;
  };
  description: string;
  chain: Chain;
  pickup: Pickup;
  slug: string;
  tabsUrl?: string;
}

export interface Artist {
  id: number;
  title: string;
  slug: string;
  description: string;
}

export interface Pickup {
  type: "humbucker" | "single";
  tone: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  position: "neck" | "bridge" | "middle";
}
