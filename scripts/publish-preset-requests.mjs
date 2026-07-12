import fs from "node:fs/promises";

const baseUrl = process.env.BASE_URL ?? "http://localhost:3000";

const requests = [
  {
    artist: "Powerwolf",
    song: "Sanctified with Dynamite",
    part: "Main Riff",
    device: "NUX Mighty Space",
    details: "Distorted power-metal rhythm tone.",
  },
  {
    artist: "Avenged Sevenfold",
    song: "Unholy Confessions",
    part: "Lead Riffs",
    device: "NUX Mighty Plug",
    details: "Synyster Gates lead parts and riffs; saturated distortion.",
    tabsUrl:
      "https://www.songsterr.com/a/wsa/avenged-sevenfold-unholy-confessions-tab-s580",
  },
  {
    artist: "Dire Straits",
    song: "Money for Nothing",
    part: "Main Riff",
    device: "NUX Mighty Plug Pro",
  },
  {
    artist: "Oasis",
    song: "Live Forever",
    part: "Main Riff",
    device: "NUX Mighty Space",
  },
  {
    artist: "Jack White",
    song: "Lazaretto",
    part: "Main Riff and Solo",
    device: "NUX Mighty Space",
    details: "Jack White-style fuzz tone for the main riff and solo.",
  },
  {
    artist: "The Offspring",
    song: "Gone Away",
    part: "Main Riff",
    device: "NUX Mighty Space",
  },
  {
    artist: "Carlos Santana",
    song: "Black Magic Woman",
    part: "Intro",
    device: "NUX Mighty Plug Pro",
    details: "Intro riff tone.",
  },
  {
    artist: "B.B. King",
    song: "The Thrill Is Gone",
    part: "Solo",
    device: "NUX Mighty Plug Pro",
    details: "Clean solo tone for a P-90-style guitar.",
    tabsUrl:
      "https://www.songsterr.com/a/wsa/bb-king-the-thrill-is-gone-tab-s2316",
  },
  {
    artist: "Mor Ve Otesi",
    song: "Bir Derdim Var",
    part: "Intro",
    device: "NUX Mighty Space",
    tabsUrl:
      "https://www.songsterr.com/a/wsa/mor-ve-otesi-bir-derdim-var-tab-s388668",
  },
  {
    artist: "Del Shannon",
    song: "Runaway",
    part: "Outro",
    device: "NUX Mighty Space",
    details: "Guitar arrangement in the style of The Ventures.",
  },
  {
    artist: "Lamb of God",
    song: "Laid to Rest",
    part: "Main Riff",
    device: "NUX Mighty Space",
  },
  {
    artist: "Buckethead",
    song: "Soothsayer",
    part: "Lead Parts",
    device: "NUX Mighty Space",
    details: "Tone for the intro, chorus, bridge, and solo.",
  },
  {
    artist: "Avenged Sevenfold",
    song: "Almost Easy",
    part: "Main Riff and Solo",
    device: "NUX Mighty Space",
  },
  {
    artist: "Steely Dan",
    song: "Reelin' in the Years",
    part: "Intro Solo",
    device: "NUX Mighty Plug Pro",
    details: "Distorted intro solo tone.",
  },
  {
    artist: "The Offspring",
    song: "Original Prankster",
    part: "Full Song",
    device: "NUX Mighty Space",
    tabsUrl:
      "https://www.songsterr.com/a/wsa/offspring-original-prankster-tab-s22828",
  },
  {
    artist: "The Darkness",
    song: "I Believe in a Thing Called Love",
    part: "Full Song",
    device: "NUX Mighty Space",
    tabsUrl:
      "https://www.songsterr.com/a/wsa/darkness-i-believe-in-a-thing-called-love-100-correct-tab-s2450237",
  },
  {
    artist: "Oasis",
    song: "Supersonic",
    part: "Solo",
    device: "NUX Mighty Space",
  },
  {
    artist: "Jimi Hendrix",
    song: "Who Knows (Live at Fillmore East)",
    part: "Intro",
    device: "NUX Mighty Space",
    tabsUrl:
      "https://www.songsterr.com/a/wsa/jimi-hendrix-who-knows-tab-s8817t0",
  },
  {
    artist: "Def Leppard",
    song: "Pour Some Sugar on Me",
    part: "Intro and Solo",
    device: "NUX Mighty Plug Pro",
  },
  {
    artist: "Carlos Santana",
    song: "Black Magic Woman",
    part: "Solo",
    device: "NUX Mighty Space",
  },
  {
    artist: "Elvis Presley",
    song: "Polk Salad Annie",
    part: "Outro",
    device: "NUX Mighty Space",
  },
];

const normalize = (value) =>
  value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const jsonRequest = async (path, body) => {
  const response = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  const payload = await response.json();
  if (!response.ok) {
    throw new Error(`${path} failed (${String(response.status)}): ${JSON.stringify(payload)}`);
  }
  return payload;
};

const readData = async () => {
  const [generationsFile, presetsFile, artistsFile] = await Promise.all([
    fs.readFile("data/generations.json", "utf8"),
    fs.readFile("data/presets.json", "utf8"),
    fs.readFile("data/artists.json", "utf8"),
  ]);
  return {
    generations: JSON.parse(generationsFile).generations,
    presets: JSON.parse(presetsFile),
    artists: JSON.parse(artistsFile),
  };
};

const pickupFromDescription = (description) => {
  const value = description.toLowerCase();
  const toneMatch = value.match(/tone\s*=\s*(10|[1-9])/);
  return {
    type: value.includes("humbucker") ? "humbucker" : "single",
    tone: toneMatch ? Number(toneMatch[1]) : 7,
    position: value.includes("neck")
      ? "neck"
      : value.includes("middle")
        ? "middle"
        : "bridge",
  };
};

const promptFor = (request) =>
  [
    `${request.artist} — ${request.song} — ${request.part} guitar tone`,
    `for ${request.device}.`,
    request.details,
  ]
    .filter(Boolean)
    .join(" ");

const findArtist = (artists, title) =>
  artists.find((artist) => normalize(artist.title) === normalize(title));

const findPreset = (presets, artists, request) =>
  presets.find((preset) => {
    const artist = artists.find((item) => item.id === preset.origin.artistId);
    return (
      artist &&
      normalize(artist.title) === normalize(request.artist) &&
      normalize(preset.origin.song) === normalize(request.song) &&
      normalize(preset.origin.part) === normalize(request.part)
    );
  });

for (const request of requests) {
  let data = await readData();
  let preset = findPreset(data.presets, data.artists, request);

  if (preset?.isDraft === false) {
    console.log(`skip published: ${request.artist} — ${request.song} (${request.part})`);
    continue;
  }

  if (preset?.isDraft === true) {
    await jsonRequest("/api/preset/publish/", { presetIds: [preset.id] });
    console.log(`published draft: ${request.artist} — ${request.song} (${request.part})`);
    continue;
  }

  const prompt = promptFor(request);
  let generation = data.generations.find(
    (item) => normalize(item.originalPrompt) === normalize(prompt),
  );

  if (!generation) {
    const generated = await jsonRequest("/api/generate-chain/", {
      prompt,
      ...(request.tabsUrl
        ? {
            songsterrData: {
              url: request.tabsUrl,
              artist: request.artist,
              title: request.song,
              trackType: "Guitar",
              suggestedPart: request.part,
            },
          }
        : {}),
    });
    data = await readData();
    generation = data.generations.find(
      (item) => item.id === generated.generationId,
    );
  }

  if (!generation) {
    throw new Error(`Generation missing for ${request.artist} — ${request.song}`);
  }

  const artist = findArtist(data.artists, request.artist);
  const created = await jsonRequest("/api/preset/create/", {
    generationId: generation.id,
    ...(artist
      ? { artistId: artist.id }
      : {
          newArtist: {
            title: request.artist,
            description: `${request.artist} guitar presets for NUX Mighty Plug and Mighty Space, inspired by the artist's signature tones and recordings.`,
          },
        }),
    song: request.song,
    part: request.part,
    imageUrl: null,
    ...(request.tabsUrl ? { tabsUrl: request.tabsUrl } : {}),
    pickup: pickupFromDescription(generation.proDescription.preferred_pickup),
  });

  await jsonRequest("/api/preset/publish/", { presetIds: [created.presetId] });
  console.log(`published: ${request.artist} — ${request.song} (${request.part})`);
}
