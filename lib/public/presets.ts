import { Preset } from "lib/public/interface";

import generations from "data/generations.json";
import { GenerationRecord } from "lib/jsondb";

const mapGenerationToPreset = (id: string): Preset => {
  const generation = generations.generations.find((gen) => gen.id === id) as
    | GenerationRecord
    | undefined;

  if (!generation) {
    throw new Error(`Generation with id ${id} not found`);
  }

  const version = generation.versions[generation.versions.length - 1];

  if (!version) {
    throw new Error(`Version with id ${id} not found`);
  }

  return {
    id: generation.id,
    title: generation.originalPrompt,
    origin: null,
    description: generation.proDescription.sound_description,
    chain: version.chain,
  };
};

export const presets: Preset[] = [
  {
    ...mapGenerationToPreset("gen_meh734a9_vn6pc6u9f"),
    origin: {
      artist: "Metallica",
      song: "Nothing Else Matters",
      part: "Intro",
    },
  },
  {
    ...mapGenerationToPreset("gen_mefr628f_g8cftbhm4"),
    origin: {
      artist: "AC/DC",
      song: "Back in Black",
      part: "Intro",
    },
  },
  {
    ...mapGenerationToPreset("gen_mefrrfkk_w8x18ppjc"),
    origin: {
      artist: "Rammstein",
      song: "Sonne",
      part: "Main Riff",
    },
  },
  {
    ...mapGenerationToPreset("gen_meftgp5v_1uj3ojci1"),
    origin: {
      artist: "Bullet for My Valentine",
      song: "Waking the Demon",
      part: "Main Riff",
    },
  },
  {
    ...mapGenerationToPreset("gen_meftp13j_wgpgnsr26"),
    origin: {
      artist: "Enter Shikari",
      song: "Sorry You're Not A Winner",
      part: "Intro",
    },
  },
  {
    ...mapGenerationToPreset("gen_meftu2kp_9tm4qgcd9"),
    origin: {
      artist: "Slipknot",
      song: "Before I Forget",
      part: "Intro",
    },
  },
  {
    ...mapGenerationToPreset("gen_meh65m2y_npavw2gjd"),
    origin: {
      artist: "Metallica",
      song: "Master Of Puppets",
      part: "Main Riff",
    },
  },
  {
    ...mapGenerationToPreset("gen_meh6v9ds_y8jhmhs8n"),
    origin: {
      artist: "Led Zeppelin",
      song: "Stairway to Heaven",
      part: "Intro",
    },
  },
  {
    ...mapGenerationToPreset("gen_meh6yh0e_mpx8o7n8n"),
    origin: {
      artist: "Led Zeppelin",
      song: "Stairway to Heaven",
      part: "Solo",
    },
  },
  {
    ...mapGenerationToPreset("gen_meh7c8l4_gf67b392l"),
    origin: {
      artist: "Guns and Roses",
      song: "Sweet Child o Mine",
      part: "Intro",
    },
  },
  {
    ...mapGenerationToPreset("gen_meh7yxtq_istxg3la5"),
    origin: {
      artist: "Ozzy Osbourne",
      song: "Crazy Train",
      part: "Intro",
    },
  },
  {
    ...mapGenerationToPreset("gen_meh81zzg_llzmwnnp5"),
    origin: {
      artist: "Metallica",
      song: "Enter Sandman",
      part: "Main Riff",
    },
  },
];
