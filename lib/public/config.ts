export const publicConfig = {
  contacts: {
    email: "1fokingleb+nxrig@gmail.com",
    telegram: "https://t.me/glebkaf",
  },
  email: {
    subjects: {
      presetRequest: "nxrig.com - Preset Request",
    },
    templates: {
      presetRequest: (songName: string) =>
        `I would like to request a preset for the song ${songName}`,
    },
  },
} as const;
