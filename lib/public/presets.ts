import { Preset } from "lib/public/interface";

import generations from "data/generations.json";
import { GenerationRecord } from "lib/jsondb";
import { createSlug } from "lib/utils/create-slug";

const mapGenerationToPreset = (id: string): Omit<Preset, "origin"> => {
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
    description: generation.proDescription.sound_description,
    chain: version.chain,
  };
};

const createPresetSlug = (preset: Preset): string => {
  return `${createSlug(preset.origin.song)}-guitar-${createSlug(
    preset.origin.part
  )}`;
};

export const presets: Preset[] = [
  {
    ...mapGenerationToPreset("gen_meh734a9_vn6pc6u9f"),
    origin: {
      artist: "Metallica",
      song: "Nothing Else Matters",
      part: "Intro",
      imageUrl: "/images/cover/metallica/the-black-album.jpg",
    },
  },
  {
    ...mapGenerationToPreset("gen_meh81zzg_llzmwnnp5"),
    origin: {
      artist: "AC/DC",
      song: "Back in Black",
      part: "Intro",
      imageUrl: "/images/cover/acdc/back-in-black.png",
    },
  },
  {
    ...mapGenerationToPreset("gen_mefrrfkk_w8x18ppjc"),
    origin: {
      artist: "Rammstein",
      song: "Sonne",
      part: "Main Riff",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/en/4/41/Sonnesingle.jpg",
    },
  },
  {
    ...mapGenerationToPreset("gen_meftgp5v_1uj3ojci1"),
    origin: {
      artist: "Bullet for My Valentine",
      song: "Waking the Demon",
      part: "Main Riff",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/en/2/25/Bullet_for_My_Valentine_-_Waking_The_Demon.jpg",
    },
  },
  {
    ...mapGenerationToPreset("gen_meftp13j_wgpgnsr26"),
    origin: {
      artist: "Enter Shikari",
      song: "Sorry You're Not A Winner",
      part: "Intro",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/en/6/6e/Taketotheskies2.jpg",
    },
  },
  {
    ...mapGenerationToPreset("gen_meftu2kp_9tm4qgcd9"),
    origin: {
      artist: "Slipknot",
      song: "Before I Forget",
      part: "Intro",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/en/e/e9/Slipknot_-_Vol._3-_%28The_Subliminal_Verses%29.jpg",
    },
  },
  {
    ...mapGenerationToPreset("gen_meh65m2y_npavw2gjd"),
    origin: {
      artist: "Metallica",
      song: "Master Of Puppets",
      part: "Main Riff",
      imageUrl: "/images/cover/metallica/master-of-puppets.webp",
    },
  },
  {
    ...mapGenerationToPreset("gen_meh6v9ds_y8jhmhs8n"),
    origin: {
      artist: "Led Zeppelin",
      song: "Stairway to Heaven",
      part: "Intro",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/4/4b/Stairway_to_Heaven_by_Led_Zeppelin_US_promotional_single.png",
    },
  },
  {
    ...mapGenerationToPreset("gen_meh6yh0e_mpx8o7n8n"),
    origin: {
      artist: "Led Zeppelin",
      song: "Stairway to Heaven",
      part: "Solo",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/4/4b/Stairway_to_Heaven_by_Led_Zeppelin_US_promotional_single.png",
    },
  },
  {
    ...mapGenerationToPreset("gen_meh7c8l4_gf67b392l"),
    origin: {
      artist: "Guns and Roses",
      song: "Sweet Child o Mine",
      part: "Intro",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/en/6/60/GunsnRosesAppetiteforDestructionalbumcover.jpg",
    },
  },
  {
    ...mapGenerationToPreset("gen_meh7yxtq_istxg3la5"),
    origin: {
      artist: "Ozzy Osbourne",
      song: "Crazy Train",
      part: "Intro",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/en/7/74/Crazy_Train_45.jpg",
    },
  },
  {
    ...mapGenerationToPreset("gen_meh7i6j2_8cr4dyzia"),
    origin: {
      artist: "Metallica",
      song: "Enter Sandman",
      part: "Main Riff",
      imageUrl: "/images/cover/metallica/the-black-album.jpg",
    },
  },
].map((preset: Preset) => {
  return {
    ...preset,
    slug: createPresetSlug(preset),
  };
});
