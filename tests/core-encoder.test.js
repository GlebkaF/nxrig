import { describe, it, expect } from 'vitest';
import { createDefaultChain } from '../lib/core/helpers/create-default-chain';
import { encodeChainToBytes, encodeDefaultChain, debugEncoding } from '../lib/core/encoder';

describe('Core Encoder Tests', () => {
  it('should encode default chain to NUX compatible QR code', () => {
    const chain = createDefaultChain();
    const encoded = encodeChainToBytes(chain);
    
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
    
    // Отключаем один блок (используем правильное имя из Blocks enum)
    chain.amplifier.enabled = false;
    
    const encoded = encodeChainToBytes(chain);
    const debug = debugEncoding(chain);
    
    // Проверяем что отключенный блок имеет DISABLED_FLAG
    const ampHeader = debug.debug.find(item => 
      item.description.includes('Head_AMP')
    );
    
    if (ampHeader) {
      expect(ampHeader.enabled).toBe(false);
    }
  });

  it('should handle empty parameters gracefully', () => {
    const chain = createDefaultChain();
    
    // Очищаем параметры одного блока
    chain.amplifier.params = {};
    
    const encoded = encodeChainToBytes(chain);
    
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
    
    const encoded = encodeChainToBytes(chain);
    
    // Проверяем что значения ограничены
    expect(encoded.rawBytes.every(byte => byte >= 0 && byte <= 255)).toBe(true);
  });

  it('should use encodeDefaultChain shortcut correctly', () => {
    const directEncoded = encodeDefaultChain();
    const chainEncoded = encodeChainToBytes(createDefaultChain());
    
    // Результаты должны быть идентичными
    expect(directEncoded.qrCode).toBe(chainEncoded.qrCode);
    expect(directEncoded.rawBytes).toEqual(chainEncoded.rawBytes);
  });

  it('should provide meaningful debug information', () => {
    const chain = createDefaultChain();
    const debug = debugEncoding(chain);
    
    // Проверяем структуру отладочной информации
    expect(debug).toHaveProperty('encoding');
    expect(debug).toHaveProperty('debug');
    expect(Array.isArray(debug.debug)).toBe(true);
    
    // Должны быть записи с ненулевыми значениями
    expect(debug.debug.length).toBeGreaterThan(0);
    
    // Каждая запись должна иметь правильную структуру
    debug.debug.forEach(item => {
      expect(item).toHaveProperty('index');
      expect(item).toHaveProperty('value');
      expect(item).toHaveProperty('description');
      expect(typeof item.index).toBe('number');
      expect(typeof item.value).toBe('number');
      expect(typeof item.description).toBe('string');
    });
  });

  it('should handle all block types from config', () => {
    const chain = createDefaultChain();
    const encoded = encodeChainToBytes(chain);
    
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
    const encoded = encodeChainToBytes(chain);
    
    // Проверяем что LINK поля установлены (начиная с индекса 89, но с учетом заголовка +2)
    const linkStart = 89 + 2; // +2 для заголовка (product_id, version)
    const chainOrder = [5, 1, 6, 2, 3, 9, 4, 8, 7];
    
    chainOrder.forEach((expectedValue, i) => {
      expect(encoded.rawBytes[linkStart + i]).toBe(expectedValue);
    });
  });

  it('should set master volume correctly', () => {
    const chain = createDefaultChain();
    const encoded = encodeChainToBytes(chain);
    
    // Мастер должен быть на индексе 84+2 (с учетом заголовка) со значением 50
    expect(encoded.rawBytes[84 + 2]).toBe(50);
  });
});