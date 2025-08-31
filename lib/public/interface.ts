import { ValidatedPresetWithArtist } from "./schemas";

// Тип для валидированного Preset с Artist объектом
export type Preset = ValidatedPresetWithArtist;

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
