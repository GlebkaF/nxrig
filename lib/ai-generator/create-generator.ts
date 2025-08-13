// import { createDefaultChain } from "lib/core/helpers/create-default-chain";
import { Blocks, Chain } from "../core/interface";
import OpenAI from "openai";
import { createOpenAIClient } from "lib/ai-generator/helpers/create-openai-client";
import { createEmptyChain } from "lib/core/helpers/create-default-chain";
import { NoiseGateType } from "lib/core/blocks/noisegate";
import { EffectType } from "lib/core/blocks/effect";
import { AmplifierType } from "lib/core/blocks/amplifier";
import { CabinetType } from "lib/core/blocks/cabinet";
import { EqType } from "lib/core/blocks/eq";
import { parseEnum } from "lib/ai-generator/helpers/parse-enum";
// import { ReverbType } from "lib/core/blocks/reverb";
// import { DelayType } from "lib/core/blocks/delay";

const GPT_41_MINI_MODEL = "gpt-4.1-mini";

interface ProDescription {
  genre: string;
  sound_description: string;
  guitar_rig_description: string;
  references: string[];
  additional_info: string;
}

interface RealRig {
  pedalboard: string[];
  amplifier: string;
  cabinet: string;
  settings: unknown;
}

class ChainGenerator {
  constructor(private openai: OpenAI) {}

  async generate(prompt: string): Promise<Chain> {
    const proDescription = await this.createProDescription(prompt);
    const realRig = await this.createRealRig(proDescription);
    const emptyChain = await this.createEmptyChain(realRig);
    const finalChain = await this.createFinalChain(emptyChain);

    console.log(finalChain[Blocks.Amplifier]);

    return finalChain;
  }

  private async createProDescription(prompt: string): Promise<ProDescription> {
    return Promise.resolve({
      genre: "Thrash Metal",
      sound_description:
        "Sharp, aggressive, tight, palm-muted chug, mid-scooped, high-gain with clarity and strong attack.",
      guitar_rig_description:
        "Noise Gate: Used to eliminate unwanted noise and keep palm-muted riffing tight. Compressor: Not used, as dynamics are largely controlled by the player's right hand attack. Overdrive/Distortion/Boost: Classic mid-gain overdrive pedal (TS-style) used as a boost in front of a high-gain amplifier for added tightness and definition, not for primary distortion. Amplifier: High-gain tube amp head (Mesa/Boogie style) provides the main saturated distortion with an aggressive and tight character. Cabinet: 4x12 closed-back cabinet with Celestion speakers emulates the punch and articulation of the original recording. EQ: Graphic or amp EQ with scooped mids, accentuated lows and highs to match 80s thrash tones. Modulation: Not used. Delay: Not used. Reverb: Not used, or minimal to dry; tone is focused and direct, as on the original recording.",
      references: [
        "Metallica - Master of Puppets",
        "Metallica - Battery",
        "Slayer - Raining Blood",
      ],
      additional_info:
        "Use the bridge humbucker pickup for maximum output and aggressive palm mute attack. Heavier gauge strings recommended (10-46 or higher), tuned to standard E. Downpicking technique is essential for authentic attack and articulation.",
    });
  }

  private async createEmptyChain(realRig: RealRig): Promise<Chain> {
    const noisegate = parseEnum(NoiseGateType, "Noise Gate");
    const effect = parseEnum(EffectType, "T Screamer");
    const amplifier = parseEnum(AmplifierType, "Dual Rect");
    const cabinet = parseEnum(CabinetType, "RECT 412");
    const eq = parseEnum(EqType, "10-Band");

    const emptyChain = createEmptyChain({
      noisegate: noisegate,
      compressor: null,
      modulation: null,
      effect: effect,
      amplifier: amplifier,
      cabinet: cabinet,
      eq: eq,
      reverb: null,
      delay: null,
    });

    return Promise.resolve(emptyChain);
  }

  private async createRealRig(
    proDescription: ProDescription
  ): Promise<RealRig> {
    return Promise.resolve({
      pedalboard: [
        "ISP Decimator II Noise Gate",
        "Ibanez TS808 Tube Screamer (used as a boost)",
        "MXR 10-Band EQ (for mid scoop and shaping lows/highs)",
      ],
      amplifier: "Mesa/Boogie Mark IV",
      cabinet:
        "Mesa/Boogie 4x12 Rectifier Standard with Celestion Vintage 30 speakers",
      settings: {
        amp: {
          Gain: 7,
          Bass: 7,
          Middle: 3,
          Treble: 7,
          Presence: 6,
          Master: 5,
        },
        ts808: {
          Drive: 3,
          Tone: 6,
          Level: 7,
        },
        eq: {
          "100Hz": "+3dB",
          "250Hz": "-4dB",
          "500Hz": "-5dB",
          "1kHz": "-5dB",
          "2kHz": "-4dB",
          "4kHz": "+4dB",
          "8kHz": "+4dB",
          "16kHz": "+2dB",
        },
        noise_gate: {
          Threshold: "Set to reduce hum but preserve palm-muted attack",
        },
      },
    });
  }

  private async createFinalChain(emptyChain: Chain): Promise<Chain> {
    return Promise.resolve(emptyChain);
  }

  private async createJsonCompletion(prompt: string): Promise<unknown> {
    const completion = await this.openai.chat.completions.create({
      model: GPT_41_MINI_MODEL,
      messages: [
        {
          role: "system",
          content: "always say hello, json example: { response: 'hello' }",
        },
        {
          role: "user",
          content: `Hey! What is this? ${prompt}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
      response_format: { type: "json_object" },
    });

    const responseText = completion.choices[0]?.message.content;
    if (!responseText) {
      throw new Error("No response from OpenAI");
    }

    return JSON.parse(responseText) as unknown;
  }
}

export const createGenerator = async (): Promise<ChainGenerator> => {
  const client = await createOpenAIClient();
  return new ChainGenerator(client);
};
