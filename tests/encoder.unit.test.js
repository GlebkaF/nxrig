import { describe, it, expect } from 'vitest';

import { flatPresetToQrString, qrStringToFlatPreset, AMP_TYPES, EFX_TYPES, COMP_TYPES, MOD_TYPES, DELAY_TYPES, REVERB_TYPES, CABINET_TYPES } from '../lib/encoder.js';

function makeBase() {
  return { product_id: 15, version: 1, master: 50 };
}

describe('encoder/decoder unit', () => {
  it('encodes and decodes Compressor', () => {
    const preset = { ...makeBase(), comp: { enabled: true, type: Object.keys(COMP_TYPES)[0], sustain: 10, level: 20, attack: 30, blend: 40 } };
    const qr = flatPresetToQrString(preset);
    const dec = qrStringToFlatPreset(qr);
    expect(dec.comp.type).toBe(preset.comp.type);
    expect(dec.comp.sustain).toBe(10);
  });

  it('encodes and decodes EFX', () => {
    const preset = { ...makeBase(), efx: { enabled: true, type: Object.keys(EFX_TYPES)[0], var1: 11, var2: 22, var3: 33 } };
    const qr = flatPresetToQrString(preset);
    const dec = qrStringToFlatPreset(qr);
    expect(dec.efx.type).toBe(preset.efx.type);
    expect(dec.efx.var1).toBe(11);
  });

  it('encodes and decodes Amp', () => {
    const preset = { ...makeBase(), amp: { enabled: true, type: Object.keys(AMP_TYPES)[0], gain: 1, master: 2, bass: 3, mid: 4, treble: 5, bright: 100 } };
    const qr = flatPresetToQrString(preset);
    const dec = qrStringToFlatPreset(qr);
    expect(dec.amp.type).toBe(preset.amp.type);
    expect(dec.amp.bright).toBe(100);
  });

  it('encodes and decodes Cabinet', () => {
    const preset = { ...makeBase(), cab: { enabled: true, type: Object.keys(CABINET_TYPES)[0], level: 10, lowcut: 20, hicut: 30 } };
    const qr = flatPresetToQrString(preset);
    const dec = qrStringToFlatPreset(qr);
    expect(dec.cab.hicut).toBe(30);
  });

  it('encodes and decodes Mod', () => {
    const preset = { ...makeBase(), mod: { enabled: true, type: Object.keys(MOD_TYPES)[0], rate: 10, depth: 20, mix: 30 } };
    const qr = flatPresetToQrString(preset);
    const dec = qrStringToFlatPreset(qr);
    expect(dec.mod.mix).toBe(30);
  });

  it('encodes and decodes Delay', () => {
    const preset = { ...makeBase(), delay: { enabled: true, type: Object.keys(DELAY_TYPES)[0], time: 10, feedback: 20, mix: 30 } };
    const qr = flatPresetToQrString(preset);
    const dec = qrStringToFlatPreset(qr);
    expect(dec.delay.time).toBe(10);
  });

  it('encodes and decodes Reverb', () => {
    const preset = { ...makeBase(), reverb: { enabled: true, type: Object.keys(REVERB_TYPES)[0], decay: 10, tone: 20, mix: 30 } };
    const qr = flatPresetToQrString(preset);
    const dec = qrStringToFlatPreset(qr);
    expect(dec.reverb.tone).toBe(20);
  });
});