import { describe, it, expect } from 'vitest';
import { decodeQrToChain, qrToChain, validateQrCode } from '../lib/core/decoder';
import { encodeChain } from '../lib/core/encoder';
import { createDefaultChain } from '../lib/core/helpers/create-default-chain';
import { Blocks } from '../lib/core/interface';
import { AmplifierType } from '../lib/core/blocks/amplifier';
import { EffectType } from '../lib/core/blocks/effect';
import { ModulationType } from '../lib/core/blocks/modulation';
import { ReverbType } from '../lib/core/blocks/reverb';

describe('Core Decoder Tests', () => {
  
  describe('decodeQrToChain', () => {
    it('should decode a valid QR code to chain object', () => {
      const originalChain = createDefaultChain();
      const encoded = encodeChain(originalChain);
      const decoded = decodeQrToChain(encoded.qrCode);
      
      expect(decoded).toHaveProperty('chain');
      expect(decoded).toHaveProperty('productId');
      expect(decoded).toHaveProperty('version');
      expect(decoded).toHaveProperty('master');
      
      expect(decoded.productId).toBe(15);
      expect(decoded.version).toBe(1);
      expect(decoded.master).toBe(50);
    });

    it('should correctly decode enabled/disabled states', () => {
      const originalChain = createDefaultChain();
      originalChain.amplifier.enabled = false;
      originalChain.effect.enabled = false;
      
      const encoded = encodeChain(originalChain);
      const decoded = decodeQrToChain(encoded.qrCode);
      
      expect(decoded.chain.amplifier.enabled).toBe(false);
      expect(decoded.chain.effect.enabled).toBe(false);
      expect(decoded.chain.compressor.enabled).toBe(true); // Should remain enabled
    });

    it('should correctly decode different effect types', () => {
      const originalChain = createDefaultChain();
      // Use only configured types
      originalChain.amplifier.type = AmplifierType.JazzClean; // Only configured type
      originalChain.effect.type = EffectType.DistortionPlus; // Only configured type
      originalChain.modulation.type = ModulationType.CE1; // Only configured type
      originalChain.reverb.type = ReverbType.Hall; // Multiple types configured
      
      const encoded = encodeChain(originalChain);
      const decoded = decodeQrToChain(encoded.qrCode);
      
      expect(decoded.chain.amplifier.type).toBe(AmplifierType.JazzClean);
      expect(decoded.chain.effect.type).toBe(EffectType.DistortionPlus);
      expect(decoded.chain.modulation.type).toBe(ModulationType.CE1);
      expect(decoded.chain.reverb.type).toBe(ReverbType.Hall);
    });

    it('should correctly decode parameter values', () => {
      const originalChain = createDefaultChain();
      originalChain.amplifier.params.Gain = 75;
      originalChain.amplifier.params.Bass = 25;
      originalChain.amplifier.params.Treble = 90;
      
      const encoded = encodeChain(originalChain);
      const decoded = decodeQrToChain(encoded.qrCode);
      
      expect(decoded.chain.amplifier.params.Gain).toBe(75);
      expect(decoded.chain.amplifier.params.Bass).toBe(25);
      expect(decoded.chain.amplifier.params.Treble).toBe(90);
    });

    it('should throw error for empty QR string', () => {
      expect(() => decodeQrToChain('')).toThrow('QR string is empty or invalid');
      expect(() => decodeQrToChain(null as any)).toThrow('QR string is empty or invalid');
      expect(() => decodeQrToChain(undefined as any)).toThrow('QR string is empty or invalid');
    });

    it('should throw error for invalid QR prefix', () => {
      expect(() => decodeQrToChain('invalid://prefix:data')).toThrow('Invalid QR prefix');
      expect(() => decodeQrToChain('nux://WrongAmp:data')).toThrow('Invalid QR prefix');
    });

    it('should throw error for invalid base64 data or malformed QR', () => {
      // Test with completely invalid base64 that should fail
      expect(() => decodeQrToChain('nux://MightyAmp:===invalid===')).toThrow();
      
      // Test with malformed QR structure
      expect(() => decodeQrToChain('nux://MightyAmp:')).toThrow();
    });

    it('should throw error for insufficient data length', () => {
      // Create a valid base64 string but with insufficient length
      const shortData = 'nux://MightyAmp:' + Buffer.from('short', 'binary').toString('base64');
      expect(() => decodeQrToChain(shortData)).toThrow('QR payload too short');
    });
  });

  describe('qrToChain', () => {
    it('should return only the chain object', () => {
      const originalChain = createDefaultChain();
      const encoded = encodeChain(originalChain);
      const chain = qrToChain(encoded.qrCode);
      
      expect(chain).toHaveProperty(Blocks.Amplifier);
      expect(chain).toHaveProperty(Blocks.Effect);
      expect(chain).toHaveProperty(Blocks.Modulation);
      expect(chain).not.toHaveProperty('productId');
      expect(chain).not.toHaveProperty('version');
    });
  });

  describe('validateQrCode', () => {
    it('should return true for valid QR codes', () => {
      const originalChain = createDefaultChain();
      const encoded = encodeChain(originalChain);
      
      expect(validateQrCode(encoded.qrCode)).toBe(true);
    });

    it('should return false for invalid QR codes', () => {
      expect(validateQrCode('')).toBe(false);
      expect(validateQrCode('invalid')).toBe(false);
      expect(validateQrCode('nux://MightyAmp:invalid-data')).toBe(false);
    });
  });

  describe('Complex chain scenarios', () => {
    it('should handle chain with multiple disabled blocks', () => {
      const originalChain = createDefaultChain();
      originalChain.amplifier.enabled = false;
      originalChain.effect.enabled = false;
      originalChain.modulation.enabled = false;
      originalChain.reverb.enabled = false;
      
      const encoded = encodeChain(originalChain);
      const decoded = decodeQrToChain(encoded.qrCode);
      
      expect(decoded.chain.amplifier.enabled).toBe(false);
      expect(decoded.chain.effect.enabled).toBe(false);
      expect(decoded.chain.modulation.enabled).toBe(false);
      expect(decoded.chain.reverb.enabled).toBe(false);
      expect(decoded.chain.compressor.enabled).toBe(true);
    });

    it('should handle chain with extreme parameter values', () => {
      const originalChain = createDefaultChain();
      originalChain.amplifier.params.Gain = 0;
      originalChain.amplifier.params.Bass = 100;
      originalChain.effect.params.Output = 0;
      originalChain.effect.params.Sensitivity = 100;
      
      const encoded = encodeChain(originalChain);
      const decoded = decodeQrToChain(encoded.qrCode);
      
      expect(decoded.chain.amplifier.params.Gain).toBe(0);
      expect(decoded.chain.amplifier.params.Bass).toBe(100);
      expect(decoded.chain.effect.params.Output).toBe(0);
      expect(decoded.chain.effect.params.Sensitivity).toBe(100);
    });

    it('should handle chain with different reverb types and parameters', () => {
      const originalChain = createDefaultChain();
      originalChain.reverb.type = ReverbType.Hall;
      originalChain.reverb.params.Level = 80;
      originalChain.reverb.params.Decay = 30;
      // Note: Tone parameter might not be available for Hall type, check the actual config
      
      const encoded = encodeChain(originalChain);
      const decoded = decodeQrToChain(encoded.qrCode);
      
      expect(decoded.chain.reverb.type).toBe(ReverbType.Hall);
      expect(decoded.chain.reverb.params.Level).toBe(80);
      expect(decoded.chain.reverb.params.Decay).toBe(30);
      // Only test parameters that are actually configured for Hall type
    });
  });

  describe('Round-trip encoding/decoding', () => {
    it('should maintain data integrity through encode-decode cycle', () => {
      const originalChain = createDefaultChain();
      
      // Modify some values to test round-trip (use only configured types)
      originalChain.amplifier.type = AmplifierType.JazzClean; // Only configured type
      originalChain.amplifier.params.Gain = 85;
      originalChain.amplifier.params.Master = 65;
      originalChain.effect.type = EffectType.DistortionPlus; // Only configured type
      originalChain.effect.enabled = false;
      originalChain.reverb.type = ReverbType.Spring; // Test different reverb type
      
      const encoded = encodeChain(originalChain);
      const decoded = decodeQrToChain(encoded.qrCode);
      
      expect(decoded.chain.amplifier.type).toBe(originalChain.amplifier.type);
      expect(decoded.chain.amplifier.params.Gain).toBe(originalChain.amplifier.params.Gain);
      expect(decoded.chain.amplifier.params.Master).toBe(originalChain.amplifier.params.Master);
      expect(decoded.chain.effect.type).toBe(originalChain.effect.type);
      expect(decoded.chain.effect.enabled).toBe(originalChain.effect.enabled);
      expect(decoded.chain.reverb.type).toBe(originalChain.reverb.type);
    });
  });
});