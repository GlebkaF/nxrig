import { Chain, Blocks } from "./interface";
import { encodeChain } from "./encoder";
import { decodeChain } from "./decoder";
import { NoiseGateType } from "./blocks/noisegate";
import { CompressorType } from "./blocks/compressor";
import { EffectType } from "./blocks/effect";
import { AmplifierType } from "./blocks/amplifier";
import { CabinetType } from "./blocks/cabinet";
import { EqType } from "./blocks/eq";
import { ModulationType } from "./blocks/modulation";
import { DelayType } from "./blocks/delay";
import { ReverbType } from "./blocks/reverb";

// Маппинг старых типов на новые
const AMP_TYPE_MAP: Record<string, AmplifierType> = {
  'Jazz Clean': AmplifierType.JazzClean,
  'Deluxe Rvb': AmplifierType.DeluxeRvb,
  'Bass Mate': AmplifierType.BassMate,
  'Tweedy': AmplifierType.Tweedy,
  'Hiwire': AmplifierType.Hiwire,
  'Cali Crunch': AmplifierType.CaliCrunch,
  'Class A15': AmplifierType.ClassA15,
  'Class A30': AmplifierType.ClassA30,
  'Plexi 100': AmplifierType.Plexi100,
  'Plexi 45': AmplifierType.Plexi45,
  'Brit 800': AmplifierType.Brit800,
  '1987 X 50': AmplifierType.Amp1987X50,
  'SLO 100': AmplifierType.Slo100,
  'Fireman HBE': AmplifierType.FiremanHbe,
  'Dual Rect': AmplifierType.DualRect,
  'Die VH4': AmplifierType.DieVh4,
  'Mr. Z38': AmplifierType.MrZ38,
  'Super Rvb': AmplifierType.SuperRvb,
  'AGL': AmplifierType.Agl,
  'MLD': AmplifierType.Mld,
  'Optima Air': AmplifierType.OptimaAir,
  'Stageman': AmplifierType.Stageman,
  'Twin Reverb': AmplifierType.TwinReverb,
  'Vibro King': AmplifierType.VibroKing,
  'Budda': AmplifierType.Budda,
  'Brit Blues': AmplifierType.BritBlues,
  'Match D30': AmplifierType.MatchD30,
  'Brit 2000': AmplifierType.Brit2000,
  'Uber HiGain': AmplifierType.UberHiGain,
};

const EFX_TYPE_MAP: Record<string, EffectType> = {
  'Distortion+': EffectType.DistortionPlus,
  'RC Boost': EffectType.RCBoost,
  'AC Boost': EffectType.ACBoost,
  'Dist One': EffectType.DistOne,
  'T Screamer': EffectType.TScreamer,
  'Blues Drive': EffectType.BluesDrive,
  'Morning Drive': EffectType.MorningDrive,
  'Eat Dist': EffectType.EatDist,
  'Red Dirt': EffectType.RedDirt,
  'Crunch': EffectType.Crunch,
  'Muff Fuzz': EffectType.MuffFuzz,
  'Katana': EffectType.Katana,
  'ST Singer': EffectType.STSinger,
  'Touch Wah': EffectType.TouchWah,
};

const COMP_TYPE_MAP: Record<string, CompressorType> = {
  'Rose Comp': CompressorType.RoseComp,
  'K Comp': CompressorType.KComp,
  'Studio Comp': CompressorType.StudioComp,
};

const MOD_TYPE_MAP: Record<string, ModulationType> = {
  'CE-1': ModulationType.CE1,
  'CE-2': ModulationType.CE2,
  'ST Chorus': ModulationType.STChorus,
  'Vibrato': ModulationType.Vibrato,
  'Detune': ModulationType.Detune,
  'Flanger': ModulationType.Flanger,
  'Phase 90': ModulationType.Phase90,
  'Phase 100': ModulationType.Phase100,
  'S.C.F.': ModulationType.SCF,
  'U-Vibe': ModulationType.UVibe,
  'Tremolo': ModulationType.Tremolo,
  'Rotary': ModulationType.Rotary,
  'SCH-1': ModulationType.SCH1,
  'Mono Octave': ModulationType.MonoOctave,
};

const DELAY_TYPE_MAP: Record<string, DelayType> = {
  'Analog Delay': DelayType.AnalogDelay,
  'Digital Delay': DelayType.DigitalDelay,
  'Mod Delay': DelayType.ModDelay,
  'Tape Echo': DelayType.TapeEcho,
  'Pan Delay': DelayType.PanDelay,
  'Phi Delay': DelayType.PhiDelay,
};

const REVERB_TYPE_MAP: Record<string, ReverbType> = {
  'Room': ReverbType.Room,
  'Hall': ReverbType.Hall,
  'Plate': ReverbType.Plate,
  'Spring': ReverbType.Spring,
  'Shimmer': ReverbType.Shimmer,
  'Damp': ReverbType.Damp,
};

const CAB_TYPE_MAP: Record<string, CabinetType> = {
  'JZ120': CabinetType.JZ120,
  'DR112': CabinetType.DR112,
  'TR212': CabinetType.TR212,
  'HIWIRE412': CabinetType.HIWIRE412,
  'CALI 112': CabinetType.CALI112,
  'A112': CabinetType.A112,
  'GB412': CabinetType.GB412,
  'M1960AX': CabinetType.M1960AX,
  'M1960AV': CabinetType.M1960AV,
  'M1960TV': CabinetType.M1960TV,
  'SLO412': CabinetType.SLO412,
  'FIREMAN 412': CabinetType.FIREMAN412,
  'RECT 412': CabinetType.RECT412,
  'DIE412': CabinetType.DIE412,
  'MATCH212': CabinetType.MATCH212,
  'UBER412': CabinetType.UBER412,
  'BS410': CabinetType.BS410,
  'A212': CabinetType.A212,
  'M1960AHW': CabinetType.M1960AHW,
  'M1936': CabinetType.M1936,
  'BUDDA112': CabinetType.BUDDA112,
  'Z212': CabinetType.Z212,
  'SUPERVERB410': CabinetType.SUPERVERB410,
  'VIBROKING310': CabinetType.VIBROKING310,
  'AGL_DB810': CabinetType.AGL_DB810,
  'AMP_SV212': CabinetType.AMP_SV212,
  'AMP_SV410': CabinetType.AMP_SV410,
  'AMP_SV810': CabinetType.AMP_SV810,
  'BASSGUY410': CabinetType.BASSGUY410,
  'EDEN410': CabinetType.EDEN410,
  'MKB410': CabinetType.MKB410,
  'G-HBIRD': CabinetType.G_HBIRD,
  'G-J15': CabinetType.G_J15,
  'M-D45': CabinetType.M_D45,
};

// Конвертация из старого формата в новый
export function flatPresetToChain(preset: any): Chain {
  const chain: Partial<Chain> = {};

  // Noise Gate - всегда добавляем, даже если отсутствует в preset
  chain[Blocks.Noisegate] = {
    type: NoiseGateType.NoiseGate,
    enabled: preset.noise_gate?.enabled !== false,
    params: {
      Sensitivity: preset.noise_gate?.sensitivity ?? 50,
      Decay: preset.noise_gate?.decay ?? 50,
    },
  };

  // Compressor - всегда добавляем
  const compType = preset.comp?.type ? COMP_TYPE_MAP[preset.comp.type] : undefined;
  chain[Blocks.Compressor] = {
    type: compType ?? CompressorType.KComp,
    enabled: preset.comp ? preset.comp.enabled !== false : false,
    params: {
      Sustain: preset.comp?.sustain ?? 50,
      Level: preset.comp?.level ?? 50,
      Clipping: preset.comp?.attack ?? 50,
      Blend: preset.comp?.blend ?? 50,
    },
  };

  // Effect - всегда добавляем
  const efxType = preset.efx?.type ? EFX_TYPE_MAP[preset.efx.type] : undefined;
  chain[Blocks.Effect] = {
    type: efxType ?? EffectType.DistortionPlus,
    enabled: preset.efx ? preset.efx.enabled !== false : false,
    params: {
      Output: preset.efx?.var1 ?? 50,
      Sensitivity: preset.efx?.var2 ?? 50,
      Bass: preset.efx?.var3 ?? 50,
      Treble: preset.efx?.var4 ?? 50,
      Tone: preset.efx?.var5 ?? 50,
      Presence: preset.efx?.var6 ?? 50,
    },
  };

  // Amplifier - всегда добавляем
  const ampType = preset.amp?.type ? AMP_TYPE_MAP[preset.amp.type] : undefined;
  chain[Blocks.Amplifier] = {
    type: ampType ?? AmplifierType.JazzClean,
    enabled: preset.amp ? preset.amp.enabled !== false : false,
    params: {
      Gain: preset.amp?.gain ?? 50,
      Master: preset.amp?.master ?? 50,
      Bass: preset.amp?.bass ?? 50,
      Middle: preset.amp?.mid ?? 50,
      Treble: preset.amp?.treble ?? 50,
      Bright: preset.amp?.bright ?? 50,
      Presence: preset.amp?.param7 ?? 50,
      Resonance: preset.amp?.param8 ?? 50,
    },
  };

  // Cabinet - всегда добавляем
  const cabType = preset.cab?.type ? CAB_TYPE_MAP[preset.cab.type] : undefined;
  chain[Blocks.Cabinet] = {
    type: cabType ?? CabinetType.JZ120,
    enabled: preset.cab ? preset.cab.enabled !== false : false,
    params: {
      MicPos: preset.cab?.param1 ?? 50,
      MicDist: preset.cab?.param2 ?? 50,
      MicType: preset.cab?.param3 ?? 50,
      Level: preset.cab?.level ?? 50,
      LowCut: preset.cab?.lowcut ?? 50,
      HighCut: preset.cab?.hicut ?? 50,
    },
  };

  // EQ - всегда добавляем
  const eqType = preset.eq?.type === '10-Band' ? EqType.TenBand : EqType.SixBand;
  const eqParams: any = {};
  
  if (!preset.eq || eqType === EqType.SixBand) {
    eqParams['100'] = preset.eq?.eq1 ?? 50;
    eqParams['220'] = preset.eq?.eq2 ?? 50;
    eqParams['500'] = preset.eq?.eq3 ?? 50;
    eqParams['1200'] = preset.eq?.eq4 ?? 50;
    eqParams['2600'] = preset.eq?.eq5 ?? 50;
    eqParams['6400'] = preset.eq?.eq6 ?? 50;
  } else {
    eqParams['31'] = preset.eq?.eq1 ?? 50;
    eqParams['62'] = preset.eq?.eq2 ?? 50;
    eqParams['125'] = preset.eq?.eq3 ?? 50;
    eqParams['250'] = preset.eq?.eq4 ?? 50;
    eqParams['500'] = preset.eq?.eq5 ?? 50;
    eqParams['1000'] = preset.eq?.eq6 ?? 50;
    eqParams['2000'] = preset.eq?.eq7 ?? 50;
    eqParams['4000'] = preset.eq?.eq8 ?? 50;
    eqParams['8000'] = preset.eq?.eq9 ?? 50;
    eqParams['16000'] = preset.eq?.eq10 ?? 50;
  }
  
  chain[Blocks.Eq] = {
    type: eqType,
    enabled: preset.eq ? preset.eq.enabled !== false : false,
    params: eqParams,
  };

  // Modulation - всегда добавляем
  const modType = preset.mod?.type ? MOD_TYPE_MAP[preset.mod.type] : undefined;
  chain[Blocks.Modulation] = {
    type: modType ?? ModulationType.CE1,
    enabled: preset.mod ? preset.mod.enabled !== false : false,
    params: {
      Rate: preset.mod?.rate ?? 50,
      Depth: preset.mod?.depth ?? 50,
      Intensity: preset.mod?.mix ?? 50,
      Resonance: preset.mod?.param4 ?? 50,
      Manual: preset.mod?.param5 ?? 50,
      Feedback: preset.mod?.param6 ?? 50,
    },
  };

  // Delay - всегда добавляем
  const delayType = preset.delay?.type ? DELAY_TYPE_MAP[preset.delay.type] : undefined;
  chain[Blocks.Delay] = {
    type: delayType ?? DelayType.AnalogDelay,
    enabled: preset.delay ? preset.delay.enabled !== false : false,
    params: {
      Time: preset.delay?.time ?? 50,
      Feedback: preset.delay?.feedback ?? 50,
      Intensity: preset.delay?.mix ?? 50,
      Rate: preset.delay?.param4 ?? 50,
      Echo: preset.delay?.param5 ?? 50,
      Depth: preset.delay?.param6 ?? 50,
      Tone: preset.delay?.param7 ?? 50,
      Mix: preset.delay?.param8 ?? 50,
    },
  };

  // Reverb - всегда добавляем
  const reverbType = preset.reverb?.type ? REVERB_TYPE_MAP[preset.reverb.type] : undefined;
  chain[Blocks.Reverb] = {
    type: reverbType ?? ReverbType.Room,
    enabled: preset.reverb ? preset.reverb.enabled !== false : false,
    params: {
      Level: preset.reverb?.mix ?? 50,
      Decay: preset.reverb?.decay ?? 50,
      Tone: preset.reverb?.tone ?? 50,
      PreDelay: preset.reverb?.predelay ?? 50,
    },
  };

  return chain as Chain;
}

// Обратная конвертация из нового формата в старый
export function chainToFlatPreset(chain: Chain): any {
  const preset: any = {
    product_id: 15,
    version: 1,
    master: 50,
  };

  // Noise Gate
  if (chain[Blocks.Noisegate]) {
    const ng = chain[Blocks.Noisegate];
    preset.noise_gate = {
      enabled: ng.enabled,
      sensitivity: ng.params.Sensitivity,
      decay: ng.params.Decay,
    };
  }

  // Compressor
  if (chain[Blocks.Compressor]) {
    const comp = chain[Blocks.Compressor];
    const reverseMap = Object.entries(COMP_TYPE_MAP).find(([_, v]) => v === comp.type);
    preset.comp = {
      enabled: comp.enabled,
      type: reverseMap?.[0] ?? 'K Comp',
      sustain: comp.params.Sustain ?? 50,
      level: comp.params.Level ?? 50,
      attack: comp.params.Clipping ?? 50,
      blend: comp.params.Blend ?? 50,
    };
  }

  // Effect
  if (chain[Blocks.Effect]) {
    const efx = chain[Blocks.Effect];
    const reverseMap = Object.entries(EFX_TYPE_MAP).find(([_, v]) => v === efx.type);
    preset.efx = {
      enabled: efx.enabled,
      type: reverseMap?.[0] ?? 'Distortion+',
      var1: efx.params.Output ?? 50,
      var2: efx.params.Sensitivity ?? 50,
      var3: efx.params.Bass ?? 50,
      var4: efx.params.Treble ?? 50,
      var5: efx.params.Tone ?? 50,
      var6: efx.params.Presence ?? 50,
    };
  }

  // Amplifier
  if (chain[Blocks.Amplifier]) {
    const amp = chain[Blocks.Amplifier];
    const reverseMap = Object.entries(AMP_TYPE_MAP).find(([_, v]) => v === amp.type);
    preset.amp = {
      enabled: amp.enabled,
      type: reverseMap?.[0] ?? 'Jazz Clean',
      gain: amp.params.Gain,
      master: amp.params.Master,
      bass: amp.params.Bass,
      mid: amp.params.Middle,
      treble: amp.params.Treble,
      bright: amp.params.Bright,
      param7: amp.params.Presence ?? 50,
      param8: amp.params.Resonance ?? 50,
    };
  }

  // Cabinet
  if (chain[Blocks.Cabinet]) {
    const cab = chain[Blocks.Cabinet];
    const reverseMap = Object.entries(CAB_TYPE_MAP).find(([_, v]) => v === cab.type);
    preset.cab = {
      enabled: cab.enabled,
      type: reverseMap?.[0] ?? 'JZ120',
      param1: cab.params.MicPos ?? 50,
      param2: cab.params.MicDist ?? 50,
      param3: cab.params.MicType ?? 50,
      level: cab.params.Level,
      lowcut: cab.params.LowCut,
      hicut: cab.params.HighCut,
    };
  }

  // EQ
  if (chain[Blocks.Eq]) {
    const eq = chain[Blocks.Eq];
    preset.eq = {
      enabled: eq.enabled,
      type: eq.type === EqType.TenBand ? '10-Band' : '6-Band',
    };
    
    if (eq.type === EqType.SixBand) {
      preset.eq.eq1 = eq.params['100'];
      preset.eq.eq2 = eq.params['220'];
      preset.eq.eq3 = eq.params['500'];
      preset.eq.eq4 = eq.params['1200'];
      preset.eq.eq5 = eq.params['2600'];
      preset.eq.eq6 = eq.params['6400'];
    } else {
      preset.eq.eq1 = eq.params['31'];
      preset.eq.eq2 = eq.params['62'];
      preset.eq.eq3 = eq.params['125'];
      preset.eq.eq4 = eq.params['250'];
      preset.eq.eq5 = eq.params['500'];
      preset.eq.eq6 = eq.params['1000'];
      preset.eq.eq7 = eq.params['2000'];
      preset.eq.eq8 = eq.params['4000'];
      preset.eq.eq9 = eq.params['8000'];
      preset.eq.eq10 = eq.params['16000'];
    }
  }

  // Modulation
  if (chain[Blocks.Modulation]) {
    const mod = chain[Blocks.Modulation];
    const reverseMap = Object.entries(MOD_TYPE_MAP).find(([_, v]) => v === mod.type);
    preset.mod = {
      enabled: mod.enabled,
      type: reverseMap?.[0] ?? 'CE-1',
      rate: mod.params.Rate,
      depth: mod.params.Depth,
      mix: mod.params.Intensity,
      param4: mod.params.Resonance ?? 50,
      param5: mod.params.Manual ?? 50,
      param6: mod.params.Feedback ?? 50,
    };
  }

  // Delay
  if (chain[Blocks.Delay]) {
    const delay = chain[Blocks.Delay];
    const reverseMap = Object.entries(DELAY_TYPE_MAP).find(([_, v]) => v === delay.type);
    preset.delay = {
      enabled: delay.enabled,
      type: reverseMap?.[0] ?? 'Analog Delay',
      time: delay.params.Time ?? 50,
      feedback: delay.params.Feedback ?? 50,
      mix: delay.params.Intensity ?? 50,
      param4: delay.params.Rate ?? 50,
      param5: delay.params.Echo ?? 50,
      param6: delay.params.Depth ?? 50,
      param7: delay.params.Tone ?? 50,
      param8: delay.params.Mix ?? 50,
    };
  }

  // Reverb
  if (chain[Blocks.Reverb]) {
    const reverb = chain[Blocks.Reverb];
    const reverseMap = Object.entries(REVERB_TYPE_MAP).find(([_, v]) => v === reverb.type);
    preset.reverb = {
      enabled: reverb.enabled,
      type: reverseMap?.[0] ?? 'Room',
      mix: reverb.params.Level,
      decay: reverb.params.Decay,
      tone: reverb.params.Tone,
      predelay: reverb.params.PreDelay ?? 50,
    };
  }

  return preset;
}

// Функции-обертки для совместимости со старым API
export function flatPresetToQrString(preset: any): string {
  const chain = flatPresetToChain(preset);
  const encoded = encodeChain(chain);
  return encoded.qrCode;
}

export function qrStringToFlatPreset(qrString: string): any {
  const chain = decodeChain(qrString);
  return chainToFlatPreset(chain);
}