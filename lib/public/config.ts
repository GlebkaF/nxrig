export const publicConfig = {
  contacts: {
    email: "request@nxrig.com",
    telegram: "https://t.me/+JUGLVuLHoKgzZWZi",
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
