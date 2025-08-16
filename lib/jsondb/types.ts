import { Chain } from "../core/interface";

// Интерфейсы для JSON DB
export interface GenerationRecord {
  id: string;
  timestamp: string;
  originalPrompt: string;
  proDescription: {
    genre: string;
    sound_description: string;
    guitar_rig_description: string;
    references: string[];
    additional_info: string;
  };
  realRig: {
    pedalboard: string[];
    amplifier: string;
    cabinet: string;
    settings: unknown;
  };
  finalChain: Chain;
}

export interface JsonDatabase {
  generations: GenerationRecord[];
  meta: {
    version: string;
    lastUpdated: string;
  };
}

export interface GenerationStats {
  totalGenerations: number;
  latestGeneration: string | null;
  genresCount: Record<string, number>;
}
