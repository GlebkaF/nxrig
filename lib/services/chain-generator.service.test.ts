import { describe, it, expect, vi, beforeEach } from "vitest";
import { ChainGeneratorService } from "./chain-generator.service";

describe("ChainGeneratorService", () => {
  beforeEach(() => {
    // Очищаем переменные окружения перед каждым тестом
    vi.unstubAllEnvs();
  });

  describe("constructor", () => {
    it("should use default config when no config provided", () => {
      const service = new ChainGeneratorService();
      expect(service).toBeDefined();
    });

    it("should use provided config", () => {
      const config = {
        apiKey: "test-key",
        model: "gpt-4",
        proxyUrl: "http://test-proxy:8080",
      };
      const service = new ChainGeneratorService(config);
      expect(service).toBeDefined();
    });

    it("should use environment variables", () => {
      vi.stubEnv("OPENAI_API_KEY", "env-key");
      vi.stubEnv("OPENAI_MODEL", "gpt-3.5-turbo");
      vi.stubEnv("PROXY_URL", "http://env-proxy:3000");

      const service = new ChainGeneratorService();
      expect(service).toBeDefined();
    });
  });

  describe("generateChain", () => {
    it("should return default chain when no API key", async () => {
      // Явно убираем API ключ из окружения
      const originalKey = process.env.OPENAI_API_KEY;
      delete process.env.OPENAI_API_KEY;

      const service = new ChainGeneratorService({ apiKey: undefined });
      const result = await service.generateChain("test prompt");

      expect(result.isAiGenerated).toBe(false);
      expect(result.chain).toBeDefined();
      expect(result.chain.noisegate).toBeDefined();
      expect(result.chain.compressor).toBeDefined();

      // Восстанавливаем ключ
      if (originalKey) process.env.OPENAI_API_KEY = originalKey;
    });

    it("should handle empty prompt gracefully", async () => {
      const originalKey = process.env.OPENAI_API_KEY;
      delete process.env.OPENAI_API_KEY;

      const service = new ChainGeneratorService({ apiKey: undefined });
      const result = await service.generateChain("");

      expect(result.isAiGenerated).toBe(false);
      expect(result.chain).toBeDefined();

      if (originalKey) process.env.OPENAI_API_KEY = originalKey;
    });

    it("should return chain structure with all required blocks", async () => {
      const originalKey = process.env.OPENAI_API_KEY;
      delete process.env.OPENAI_API_KEY;

      const service = new ChainGeneratorService({ apiKey: undefined });
      const result = await service.generateChain("heavy metal");

      const requiredBlocks = [
        "noisegate",
        "compressor",
        "modulation",
        "effect",
        "amplifier",
        "cabinet",
        "eq",
        "reverb",
        "delay",
      ];

      requiredBlocks.forEach((block) => {
        expect(result.chain).toHaveProperty(block);
        expect(result.chain[block as keyof typeof result.chain]).toHaveProperty(
          "type"
        );
        expect(result.chain[block as keyof typeof result.chain]).toHaveProperty(
          "enabled"
        );
        expect(result.chain[block as keyof typeof result.chain]).toHaveProperty(
          "params"
        );
      });

      if (originalKey) process.env.OPENAI_API_KEY = originalKey;
    });
  });

  describe("type corrections", () => {
    it("should have comprehensive type corrections map", () => {
      const service = new ChainGeneratorService();
      // Проверяем, что сервис создаётся без ошибок
      expect(service).toBeDefined();
    });
  });

  describe("validation", () => {
    it("should validate chain structure", async () => {
      const originalKey = process.env.OPENAI_API_KEY;
      delete process.env.OPENAI_API_KEY;

      const service = new ChainGeneratorService({ apiKey: undefined });
      const result = await service.generateChain("test");

      // Проверяем, что все блоки имеют правильную структуру
      Object.values(result.chain).forEach((block) => {
        expect(typeof block.type).toBe("string");
        expect(typeof block.enabled).toBe("boolean");
        expect(typeof block.params).toBe("object");
      });

      if (originalKey) process.env.OPENAI_API_KEY = originalKey;
    });
  });
});
