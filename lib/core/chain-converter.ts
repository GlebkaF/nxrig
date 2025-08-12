import { Chain, Blocks } from "./interface";
import { encodeChain } from "./encoder";
import { decodeChain } from "./decoder";
import { createDefaultChain } from "./helpers/create-default-chain";
import { processorConfig } from "../processorConfig";

// Конвертация Chain в формат для визуализации
export function chainToVisualizationChain(chain: Chain): any[] {
  const vizChain: any[] = [];
  
  // Порядок блоков для визуализации
  const blockOrder = [
    Blocks.Noisegate,
    Blocks.Compressor,
    Blocks.Effect,
    Blocks.Amplifier,
    Blocks.Cabinet,
    Blocks.Eq,
    Blocks.Modulation,
    Blocks.Delay,
    Blocks.Reverb,
  ];

  const slotNames: Record<Blocks, string> = {
    [Blocks.Noisegate]: "Noisegate",
    [Blocks.Compressor]: "Compressor",
    [Blocks.Effect]: "EFX",
    [Blocks.Amplifier]: "Amp",
    [Blocks.Cabinet]: "Cabinet",
    [Blocks.Eq]: "EQ",
    [Blocks.Modulation]: "Mod",
    [Blocks.Delay]: "Delay",
    [Blocks.Reverb]: "RVB",
  };

  for (const blockType of blockOrder) {
    const block = chain[blockType];
    if (!block) continue;

    const slot = slotNames[blockType];
    const params = buildParamsForVisualization(slot, block.type, block.params);

    vizChain.push({
      slot,
      model: block.type,
      enabled: block.enabled,
      params,
    });
  }

  return vizChain;
}

function buildParamsForVisualization(slot: string, model: string, params: any): any {
  const cfg = processorConfig[slot]?.types?.[model] || null;
  if (!cfg || !cfg.params) return params || {};
  
  const out: any = {};
  
  // Маппинг параметров для визуализации
  if (slot === "Amp") {
    const add = (k: string, v: any) => {
      if (v !== undefined) out[k] = v;
    };
    add("AMP_Para1", params?.Gain);
    add("AMP_Para2", params?.Master);
    add("AMP_Para3", params?.Bass);
    add("AMP_Para4", params?.Middle || params?.Mid);
    add("AMP_Para5", params?.Treble);
    add("AMP_Para6", params?.Bright || params?.Presence || params?.Cut);
    add("AMP_Para7", params?.Presence);
    add("AMP_Para8", params?.Resonance);
    return out;
  }
  
  if (slot === "EFX") {
    const add = (k: string, v: any) => {
      if (v !== undefined) out[k] = v;
    };
    add("EFX_Para1", params?.Output || params?.Volume || params?.Level);
    add("EFX_Para2", params?.Sensitivity || params?.Gain || params?.Drive);
    add("EFX_Para3", params?.Bass || params?.Tone || params?.Filter);
    add("EFX_Para4", params?.Treble);
    add("EFX_Para5", params?.Tone || params?.Type);
    add("EFX_Para6", params?.Presence || params?.Wow || params?.Sense);
    return out;
  }
  
  if (slot === "Mod") {
    const add = (k: string, v: any) => {
      if (v !== undefined) out[k] = v;
    };
    add("MOD_Para1", params?.Rate);
    add("MOD_Para2", params?.Depth);
    add("MOD_Para3", params?.Intensity || params?.Mix);
    return out;
  }
  
  if (slot === "RVB") {
    const add = (k: string, v: any) => {
      if (v !== undefined) out[k] = v;
    };
    // Найти правильные ключи для параметров
    let levelKey: string | undefined;
    for (const [k, meta] of Object.entries(cfg.params)) {
      const lbl = String(meta.label).toLowerCase();
      if (!levelKey && (lbl === "level" || lbl === "mix")) levelKey = k;
    }
    
    for (const [k, meta] of Object.entries(cfg.params)) {
      const lbl = String(meta.label).toLowerCase();
      if (lbl.includes("decay")) add(k, params?.Decay);
      if (lbl.includes("tone") || lbl.includes("liveliness")) add(k, params?.Tone);
    }
    if (levelKey) add(levelKey, params?.Level);
    return out;
  }
  
  if (slot === "EQ") {
    const outEq: any = {};
    // Для EQ возвращаем параметры как есть
    return params || {};
  }
  
  if (slot === "Noisegate") {
    return {
      Sens: params?.Sensitivity ?? 50,
      Decay: params?.Decay ?? 50,
    };
  }
  
  // Для остальных слотов возвращаем параметры как есть
  return params || {};
}

// Парсинг JSON и создание Chain
export function parseJsonToChain(jsonText: string): Chain {
  const parsed = JSON.parse(jsonText);
  
  // Если это уже Chain формат (содержит noisegate, compressor и т.д. как ключи)
  if (parsed.noisegate || parsed.compressor || parsed.effect) {
    return parsed as Chain;
  }
  
  // Создаем дефолтную цепочку и обновляем из parsed данных
  const chain = createDefaultChain();
  
  // Обновляем блоки из входных данных
  if (parsed.noise_gate) {
    chain.noisegate = {
      type: "Noise Gate",
      enabled: parsed.noise_gate.enabled !== false,
      params: {
        Sensitivity: parsed.noise_gate.sensitivity ?? 50,
        Decay: parsed.noise_gate.decay ?? 50,
      },
    };
  }
  
  if (parsed.comp) {
    chain.compressor = {
      type: parsed.comp.type || "K Comp",
      enabled: parsed.comp.enabled !== false,
      params: {
        Sustain: parsed.comp.sustain ?? 50,
        Level: parsed.comp.level ?? 50,
        Clipping: parsed.comp.attack ?? 50,
        Blend: parsed.comp.blend ?? 50,
      },
    };
  }
  
  if (parsed.efx) {
    chain.effect = {
      type: parsed.efx.type || "Distortion+",
      enabled: parsed.efx.enabled !== false,
      params: {
        Output: parsed.efx.var1 ?? 50,
        Sensitivity: parsed.efx.var2 ?? 50,
        Bass: parsed.efx.var3 ?? 50,
        Treble: parsed.efx.var4 ?? 50,
        Tone: parsed.efx.var5 ?? 50,
        Presence: parsed.efx.var6 ?? 50,
      },
    };
  }
  
  if (parsed.amp) {
    chain.amplifier = {
      type: parsed.amp.type || "Jazz Clean",
      enabled: parsed.amp.enabled !== false,
      params: {
        Gain: parsed.amp.gain ?? 50,
        Master: parsed.amp.master ?? 50,
        Bass: parsed.amp.bass ?? 50,
        Middle: parsed.amp.mid ?? 50,
        Treble: parsed.amp.treble ?? 50,
        Bright: parsed.amp.bright ?? 50,
        Presence: parsed.amp.param7 ?? 50,
        Resonance: parsed.amp.param8 ?? 50,
      },
    };
  }
  
  if (parsed.cab) {
    chain.cabinet = {
      type: parsed.cab.type || "JZ120",
      enabled: parsed.cab.enabled !== false,
      params: {
        MicPos: parsed.cab.param1 ?? 50,
        MicDist: parsed.cab.param2 ?? 50,
        MicType: parsed.cab.param3 ?? 50,
        Level: parsed.cab.level ?? 50,
        LowCut: parsed.cab.lowcut ?? 50,
        HighCut: parsed.cab.hicut ?? 50,
      },
    };
  }
  
  if (parsed.eq) {
    const type = parsed.eq.type === '10-Band' ? '10-Band' : '6-Band';
    const params: any = {};
    
    if (type === '6-Band') {
      params['100'] = parsed.eq.eq1 ?? 50;
      params['220'] = parsed.eq.eq2 ?? 50;
      params['500'] = parsed.eq.eq3 ?? 50;
      params['1200'] = parsed.eq.eq4 ?? 50;
      params['2600'] = parsed.eq.eq5 ?? 50;
      params['6400'] = parsed.eq.eq6 ?? 50;
    } else {
      params['31'] = parsed.eq.eq1 ?? 50;
      params['62'] = parsed.eq.eq2 ?? 50;
      params['125'] = parsed.eq.eq3 ?? 50;
      params['250'] = parsed.eq.eq4 ?? 50;
      params['500'] = parsed.eq.eq5 ?? 50;
      params['1000'] = parsed.eq.eq6 ?? 50;
      params['2000'] = parsed.eq.eq7 ?? 50;
      params['4000'] = parsed.eq.eq8 ?? 50;
      params['8000'] = parsed.eq.eq9 ?? 50;
      params['16000'] = parsed.eq.eq10 ?? 50;
    }
    
    chain.eq = {
      type,
      enabled: parsed.eq.enabled !== false,
      params,
    };
  }
  
  if (parsed.mod) {
    chain.modulation = {
      type: parsed.mod.type || "CE-1",
      enabled: parsed.mod.enabled !== false,
      params: {
        Rate: parsed.mod.rate ?? 50,
        Depth: parsed.mod.depth ?? 50,
        Intensity: parsed.mod.mix ?? 50,
        Resonance: parsed.mod.param4 ?? 50,
        Manual: parsed.mod.param5 ?? 50,
        Feedback: parsed.mod.param6 ?? 50,
      },
    };
  }
  
  if (parsed.delay) {
    chain.delay = {
      type: parsed.delay.type || "Analog Delay",
      enabled: parsed.delay.enabled !== false,
      params: {
        Intensity: parsed.delay.mix ?? 50,
        Rate: parsed.delay.time ?? 50,
        Echo: parsed.delay.feedback ?? 50,
      },
    };
  }
  
  if (parsed.reverb) {
    chain.reverb = {
      type: parsed.reverb.type || "Room",
      enabled: parsed.reverb.enabled !== false,
      params: {
        Level: parsed.reverb.mix ?? 50,
        Decay: parsed.reverb.decay ?? 50,
        Tone: parsed.reverb.tone ?? 50,
        PreDelay: parsed.reverb.predelay ?? 50,
      },
    };
  }
  
  return chain;
}

// Конвертация Chain обратно в старый формат для отображения
export function chainToDisplayJson(chain: Chain): any {
  const preset: any = {
    product_id: 15,
    version: 1,
    master: 50,
  };

  if (chain.noisegate) {
    preset.noise_gate = {
      enabled: chain.noisegate.enabled,
      sensitivity: (chain.noisegate.params as any).Sensitivity,
      decay: (chain.noisegate.params as any).Decay,
    };
  }

  if (chain.compressor) {
    const params = chain.compressor.params as any;
    preset.comp = {
      enabled: chain.compressor.enabled,
      type: chain.compressor.type,
      sustain: params.Sustain ?? 50,
      level: params.Level ?? 50,
      attack: params.Clipping ?? 50,
      blend: params.Blend ?? 50,
    };
  }

  if (chain.effect) {
    const params = chain.effect.params as any;
    preset.efx = {
      enabled: chain.effect.enabled,
      type: chain.effect.type,
      var1: params.Output ?? 50,
      var2: params.Sensitivity ?? 50,
      var3: params.Bass ?? 50,
      var4: params.Treble ?? 50,
      var5: params.Tone ?? 50,
      var6: params.Presence ?? 50,
    };
  }

  if (chain.amplifier) {
    const params = chain.amplifier.params as any;
    preset.amp = {
      enabled: chain.amplifier.enabled,
      type: chain.amplifier.type,
      gain: params.Gain,
      master: params.Master,
      bass: params.Bass,
      mid: params.Middle,
      treble: params.Treble,
      bright: params.Bright,
      param7: params.Presence ?? 50,
      param8: params.Resonance ?? 50,
    };
  }

  if (chain.cabinet) {
    const params = chain.cabinet.params as any;
    preset.cab = {
      enabled: chain.cabinet.enabled,
      type: chain.cabinet.type,
      param1: params.MicPos ?? 50,
      param2: params.MicDist ?? 50,
      param3: params.MicType ?? 50,
      level: params.Level,
      lowcut: params.LowCut,
      hicut: params.HighCut,
    };
  }

  if (chain.eq) {
    const params = chain.eq.params as any;
    preset.eq = {
      enabled: chain.eq.enabled,
      type: chain.eq.type,
    };
    
    if (chain.eq.type === '6-Band') {
      preset.eq.eq1 = params['100'];
      preset.eq.eq2 = params['220'];
      preset.eq.eq3 = params['500'];
      preset.eq.eq4 = params['1200'];
      preset.eq.eq5 = params['2600'];
      preset.eq.eq6 = params['6400'];
    } else {
      preset.eq.eq1 = params['31'];
      preset.eq.eq2 = params['62'];
      preset.eq.eq3 = params['125'];
      preset.eq.eq4 = params['250'];
      preset.eq.eq5 = params['500'];
      preset.eq.eq6 = params['1000'];
      preset.eq.eq7 = params['2000'];
      preset.eq.eq8 = params['4000'];
      preset.eq.eq9 = params['8000'];
      preset.eq.eq10 = params['16000'];
    }
  }

  if (chain.modulation) {
    const params = chain.modulation.params as any;
    preset.mod = {
      enabled: chain.modulation.enabled,
      type: chain.modulation.type,
      rate: params.Rate,
      depth: params.Depth,
      mix: params.Intensity,
      param4: params.Resonance ?? 50,
      param5: params.Manual ?? 50,
      param6: params.Feedback ?? 50,
    };
  }

  if (chain.delay) {
    const params = chain.delay.params as any;
    // Для Analog Delay используем специальный маппинг
    if (chain.delay.type === "Analog Delay") {
      preset.delay = {
        enabled: chain.delay.enabled,
        type: chain.delay.type,
        time: params.Rate ?? 50,
        feedback: params.Echo ?? 50,
        mix: params.Intensity ?? 50,
      };
    } else {
      preset.delay = {
        enabled: chain.delay.enabled,
        type: chain.delay.type,
        time: params.Time ?? 50,
        feedback: params.Feedback ?? params.Repeat ?? 50,
        mix: params['E.Level'] ?? params.Level ?? params.Mix ?? 50,
      };
    }
  }

  if (chain.reverb) {
    const params = chain.reverb.params as any;
    preset.reverb = {
      enabled: chain.reverb.enabled,
      type: chain.reverb.type,
      mix: params.Level,
      decay: params.Decay,
      tone: params.Tone,
      predelay: params.PreDelay ?? 50,
    };
  }

  return preset;
}

// Экспортируем функции для использования в index.js
export function chainToQrString(chain: Chain): string {
  const encoded = encodeChain(chain);
  return encoded.qrCode;
}

export function qrStringToChain(qrString: string): Chain {
  return decodeChain(qrString);
}