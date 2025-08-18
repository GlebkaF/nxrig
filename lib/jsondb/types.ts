import { Chain } from "../core/interface";

// Интерфейсы для JSON DB

export interface GenerationVersion {
  chain: Chain;
  prompt: string;
  timestamp: string;
}

export type PresetStatus = "draft" | "ready";

export interface GenerationRecord {
  id: string;
  timestamp: string;
  originalPrompt: string;
  status: PresetStatus;
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
  versions: GenerationVersion[];
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
  statusCount: {
    ready: number;
    draft: number;
  };
}
