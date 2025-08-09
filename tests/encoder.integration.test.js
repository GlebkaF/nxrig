import { describe, it, expect } from 'vitest';
import { flatPresetToQrString, qrStringToFlatPreset } from '../lib/encoder.js';

function rand01() { return Math.random() > 0.5; }
function r100() { return (Math.random() * 101) | 0; }

const pick = (arr) => arr[(Math.random() * arr.length) | 0];

const AMP = ['Jazz Clean', 'Deluxe Rvb', 'Brit 800'];
const EFX = ['Distortion+', 'T Screamer', 'RC Boost'];
const DLY = ['Analog Delay', 'Digital Delay', 'Mod Delay'];
const RVB = ['Room', 'Hall', 'Plate'];
const CAB = ['JZ120', 'DR112', 'M1960AV'];

function makePreset() {
  return {
    product_id: 15,
    version: 1,
    master: r100(),
    noise_gate: { enabled: rand01(), sensitivity: r100(), decay: r100() },
    comp: { enabled: rand01(), type: 'K Comp', sustain: r100(), level: r100(), attack: r100(), blend: r100() },
    efx: { enabled: rand01(), type: pick(EFX), var1: r100(), var2: r100(), var3: r100() },
    amp: { enabled: true, type: pick(AMP), gain: r100(), master: r100(), bass: r100(), mid: r100(), treble: r100(), bright: 0 },
    cab: { enabled: rand01(), type: pick(CAB), level: r100(), lowcut: r100(), hicut: r100() },
    mod: { enabled: rand01(), type: 'CE-2', rate: r100(), depth: r100(), mix: r100() },
    delay: { enabled: rand01(), type: pick(DLY), time: r100(), feedback: r100(), mix: r100() },
    reverb: { enabled: rand01(), type: pick(RVB), decay: r100(), tone: r100(), mix: r100() },
  };
}

describe('encoder integration', () => {
  it('roundtrips a full preset', () => {
    const preset = makePreset();
    const qr = flatPresetToQrString(preset);
    const dec = qrStringToFlatPreset(qr);
    expect(dec.product_id).toBe(15);
    expect(dec.amp.type).toBeTypeOf('string');
    expect(dec.reverb.mix).toBeGreaterThanOrEqual(0);
  });

  it('supports Delay aliases', () => {
    const p = { product_id: 15, version: 1, master: 50, delay: { enabled: true, type: 'Analog Delay', time: 61, feedback: 25, mix: 50 } };
    const qr = flatPresetToQrString(p);
    const dec = qrStringToFlatPreset(qr);
    expect(dec.delay.type).toBe('Analog Delay');
  });
});