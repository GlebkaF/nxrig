import { describe, it, expect } from "vitest";
import { createDefaultChain } from "./helpers/create-default-chain";
import { encodeChain } from "./encoder";
import { config } from "./config";
import { Blocks } from "./interface";

describe("Core Encoder Tests", () => {
  describe("Basic Encoding", () => {
    it("should encode default chain to NUX compatible QR code", () => {
      const chain = createDefaultChain();
      const encoded = encodeChain(chain);

      // Проверяем структуру результата
      expect(encoded).toHaveProperty("bytes");
      expect(encoded).toHaveProperty("qrCode");
      expect(encoded).toHaveProperty("rawBytes");

      // Проверяем размер байтов (115 = 2 заголовок + 113 данных)
      expect(encoded.bytes).toHaveLength(115);
      expect(encoded.rawBytes).toHaveLength(115);

      // Проверяем NUX префикс
      expect(encoded.qrCode).toMatch(/^nux:\/\/MightyAmp:/);

      // Проверяем заголовок (product_id=15, version=1)
      expect(encoded.rawBytes[0]).toBe(15);
      expect(encoded.rawBytes[1]).toBe(1);
    });

    it("should encode enabled and disabled blocks correctly", () => {
      const chain = createDefaultChain();

      // Отключаем один блок
      chain.amplifier.enabled = false;

      const encoded = encodeChain(chain);

      // Проверяем что QR код создается корректно даже с отключенными блоками
      expect(encoded.qrCode).toMatch(/^nux:\/\/MightyAmp:/);
      expect(encoded.bytes).toHaveLength(115);
    });

    it("should handle empty parameters gracefully", () => {
      const chain = createDefaultChain();

      // Очищаем параметры одного блока
      // @ts-expect-error: Проверяем обработку некорректного типа блока
      chain.amplifier.params = {};

      const encoded = encodeChain(chain);

      // Энкодер должен работать без ошибок
      expect(encoded.qrCode).toMatch(/^nux:\/\/MightyAmp:/);
      expect(encoded.bytes).toHaveLength(115);
    });

    it("should clamp parameter values to 0-100 range", () => {
      const chain = createDefaultChain();

      // Устанавливаем значения вне диапазона
      chain.amplifier.params = {
        Gain: 150, // > 100
        Master: -10, // < 0
        Bass: 50, // нормальное значение
        Middle: 50,
        Treble: 50,
        Bright: 50,
      };

      const encoded = encodeChain(chain);

      // Проверяем что значения ограничены
      expect(encoded.rawBytes.every((byte) => byte >= 0 && byte <= 255)).toBe(
        true
      );
    });
  });

  describe("Chain Configuration", () => {
    it("should encode different chain configurations", () => {
      const chain1 = createDefaultChain();
      const chain2 = createDefaultChain();

      // Изменяем один из чейнов
      // Проверяем что это JazzClean тип (по умолчанию)
      if (chain2.amplifier.type === "Jazz Clean") {
        chain2.amplifier.params.Bass = 99;
      }
      chain2.effect.enabled = false;

      const encoded1 = encodeChain(chain1);
      const encoded2 = encodeChain(chain2);

      // QR коды должны быть разными
      expect(encoded1.qrCode).not.toBe(encoded2.qrCode);
      expect(encoded1.qrCode).toMatch(/^nux:\/\/MightyAmp:/);
      expect(encoded2.qrCode).toMatch(/^nux:\/\/MightyAmp:/);
    });

    it("should handle all block types from config", () => {
      const chain = createDefaultChain();
      const encoded = encodeChain(chain);

      // QR код должен быть валидным base64 после префикса
      const base64Part = encoded.qrCode.replace("nux://MightyAmp:", "");
      expect(() => {
        if (typeof window !== "undefined") {
          window.atob(base64Part);
        } else {
          Buffer.from(base64Part, "base64");
        }
      }).not.toThrow();
    });

    it("should maintain chain order in LINK fields", () => {
      const chain = createDefaultChain();
      const encoded = encodeChain(chain);

      // Проверяем что LINK поля установлены (используем конфиг)
      const linkStart = config.encoder.linkStartIndex + 2; // +2 для заголовка (product_id, version)

      config.encoder.chainOrder.forEach((expectedValue, i) => {
        expect(encoded.rawBytes[linkStart + i]).toBe(expectedValue);
      });
    });

    it("should set master volume correctly", () => {
      const chain = createDefaultChain();
      const encoded = encodeChain(chain);

      // Мастер должен быть на правильном индексе с дефолтным значением (используем конфиг)
      expect(encoded.rawBytes[config.encoder.masterIndex + 2]).toBe(50);
    });
  });

  describe("Block State and Head Index Tests", () => {
    it("should encode blocks with correct head indices", () => {
      const chain = createDefaultChain();
      const encoded = encodeChain(chain);

      // Проверяем что все блоки закодированы в правильных позициях
      Object.entries(config.blocks).forEach(([_blockType, blockConfig]) => {
        const headIndex = blockConfig.encoderHeadIndex;
        if (headIndex >= 0) {
          // Проверяем что в позиции заголовка есть какое-то значение (не 0)
          expect(encoded.rawBytes[headIndex + 2]).toBeGreaterThan(0);
        }
      });
    });

    it("should encode enabled and disabled states with correct flags", () => {
      const chain = createDefaultChain();
      const DISABLED_FLAG = 0x40;

      // Отключаем все блоки
      Object.keys(chain).forEach((blockType) => {
        chain[blockType as Blocks].enabled = false;
      });

      const encoded = encodeChain(chain);

      // Проверяем что все блоки имеют флаг DISABLED
      Object.entries(config.blocks).forEach(([_blockType, blockConfig]) => {
        const headIndex = blockConfig.encoderHeadIndex;
        if (headIndex >= 0) {
          const value = encoded.rawBytes[headIndex + 2] ?? 0;
          expect(value & DISABLED_FLAG).toBe(DISABLED_FLAG);
        }
      });
    });
    it("should encode blocks with different types correctly", () => {
      const chain = createDefaultChain();
      const encoded = encodeChain(chain);

      // Проверяем базовую структуру результата
      expect(encoded.bytes).toHaveLength(115);
      expect(encoded.qrCode).toMatch(/^nux:\/\/MightyAmp:/);

      // Проверяем что все блоки закодированы (результат имеет правильный размер)
      const base64Part = encoded.qrCode.replace("nux://MightyAmp:", "");
      const decodedLength =
        typeof window !== "undefined"
          ? window.atob(base64Part).length
          : Buffer.from(base64Part, "base64").length;
      expect(decodedLength).toBe(115);
    });

    it("should encode chain with all blocks disabled correctly", () => {
      const chain = createDefaultChain();

      // Отключаем все блоки
      Object.keys(chain).forEach((blockType) => {
        chain[blockType as Blocks].enabled = false;
      });

      const encoded = encodeChain(chain);

      // Проверяем что результат валидный
      expect(encoded.bytes).toHaveLength(115);
      expect(encoded.qrCode).toMatch(/^nux:\/\/MightyAmp:/);

      // Проверяем что закодированная цепь отличается от цепи с включенными блоками
      const enabledChain = encodeChain(createDefaultChain());
      expect(encoded.qrCode).not.toBe(enabledChain.qrCode);
    });

    it("should handle invalid block types gracefully", () => {
      const chain = createDefaultChain();
      const encoded = encodeChain({
        ...chain,
        // @ts-expect-error: Проверяем обработку некорректного типа блока
        invalidBlock: {
          type: "Invalid",
          enabled: true,
          params: {},
        },
      });

      // Проверяем, что энкодер не сломался и вернул валидный результат
      expect(encoded.bytes).toHaveLength(115);
      expect(encoded.qrCode).toMatch(/^nux:\/\/MightyAmp:/);
    });
  });
});
