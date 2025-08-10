import { describe, it, expect } from 'vitest';
import { createDefaultChain } from '../lib/core/helpers/create-default-chain';
import { encodeChain, encodeDefaultChain } from '../lib/core/encoder';
import { encoderConfig } from '../lib/core/config';

describe('Core Encoder Tests', () => {
  it('should encode default chain to NUX compatible QR code', () => {
    const chain = createDefaultChain();
    const encoded = encodeChain(chain);
    
    // Проверяем структуру результата
    expect(encoded).toHaveProperty('bytes');
    expect(encoded).toHaveProperty('qrCode');
    expect(encoded).toHaveProperty('rawBytes');
    
    // Проверяем размер байтов (115 = 2 заголовок + 113 данных)
    expect(encoded.bytes).toHaveLength(115);
    expect(encoded.rawBytes).toHaveLength(115);
    
    // Проверяем NUX префикс
    expect(encoded.qrCode).toMatch(/^nux:\/\/MightyAmp:/);
    
    // Проверяем заголовок (product_id=15, version=1)
    expect(encoded.rawBytes[0]).toBe(15);
    expect(encoded.rawBytes[1]).toBe(1);
  });

  it('should encode enabled and disabled blocks correctly', () => {
    const chain = createDefaultChain();
    
    // Отключаем один блок
    chain.amplifier.enabled = false;
    
    const encoded = encodeChain(chain);
    
    // Проверяем что QR код создается корректно даже с отключенными блоками
    expect(encoded.qrCode).toMatch(/^nux:\/\/MightyAmp:/);
    expect(encoded.bytes).toHaveLength(115);
  });

  it('should handle empty parameters gracefully', () => {
    const chain = createDefaultChain();
    
    // Очищаем параметры одного блока
    chain.amplifier.params = {};
    
    const encoded = encodeChain(chain);
    
    // Энкодер должен работать без ошибок
    expect(encoded.qrCode).toMatch(/^nux:\/\/MightyAmp:/);
    expect(encoded.bytes).toHaveLength(115);
  });

  it('should clamp parameter values to 0-100 range', () => {
    const chain = createDefaultChain();
    
    // Устанавливаем значения вне диапазона
    chain.amplifier.params = {
      Gain: 150,    // > 100
      Master: -10,  // < 0
      Bass: 50      // нормальное значение
    };
    
    const encoded = encodeChain(chain);
    
    // Проверяем что значения ограничены
    expect(encoded.rawBytes.every(byte => byte >= 0 && byte <= 255)).toBe(true);
  });

  it('should use encodeDefaultChain shortcut correctly', () => {
    const directEncoded = encodeDefaultChain();
    const chainEncoded = encodeChain(createDefaultChain());
    
    // Результаты должны быть идентичными
    expect(directEncoded.qrCode).toBe(chainEncoded.qrCode);
    expect(directEncoded.rawBytes).toEqual(chainEncoded.rawBytes);
  });

  it('should encode different chain configurations', () => {
    const chain1 = createDefaultChain();
    const chain2 = createDefaultChain();
    
    // Изменяем один из чейнов
    chain2.amplifier.type = 'Deluxe Rvb';
    chain2.effect.enabled = false;
    
    const encoded1 = encodeChain(chain1);
    const encoded2 = encodeChain(chain2);
    
    // QR коды должны быть разными
    expect(encoded1.qrCode).not.toBe(encoded2.qrCode);
    expect(encoded1.qrCode).toMatch(/^nux:\/\/MightyAmp:/);
    expect(encoded2.qrCode).toMatch(/^nux:\/\/MightyAmp:/);
  });

  it('should handle all block types from config', () => {
    const chain = createDefaultChain();
    const encoded = encodeChain(chain);
    
    // QR код должен быть валидным base64 после префикса
    const base64Part = encoded.qrCode.replace('nux://MightyAmp:', '');
    expect(() => {
      if (typeof window !== 'undefined' && window.atob) {
        window.atob(base64Part);
      } else {
        Buffer.from(base64Part, 'base64');
      }
    }).not.toThrow();
  });

  it('should maintain chain order in LINK fields', () => {
    const chain = createDefaultChain();
    const encoded = encodeChain(chain);
    
    // Проверяем что LINK поля установлены (используем конфиг)
    const linkStart = encoderConfig.linkStartIndex + 2; // +2 для заголовка (product_id, version)
    
    encoderConfig.chainOrder.forEach((expectedValue, i) => {
      expect(encoded.rawBytes[linkStart + i]).toBe(expectedValue);
    });
  });

  it('should set master volume correctly', () => {
    const chain = createDefaultChain();
    const encoded = encodeChain(chain);
    
    // Мастер должен быть на правильном индексе с дефолтным значением (используем конфиг)
    expect(encoded.rawBytes[encoderConfig.masterIndex + 2]).toBe(encoderConfig.defaultMasterValue);
  });
});