import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextApiRequest, NextApiResponse } from "next";
import handler from "./generate-chain";

describe("generate-chain API", () => {
  // Smoke test - проверка структуры API
  it("should have correct API structure", () => {
    expect(handler).toBeDefined();
    expect(typeof handler).toBe("function");
  });

  it("should return 405 for non-POST requests", () => {
    const req = {
      method: "GET",
    } as NextApiRequest;

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as NextApiResponse;

    handler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({ error: "Method not allowed" });
  });

  it("should return 400 if prompt is missing", () => {
    const req = {
      method: "POST",
      body: {},
    } as NextApiRequest;

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as NextApiResponse;

    handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Prompt is required" });
  });

  it("should return 400 if prompt is not a string", () => {
    const req = {
      method: "POST",
      body: {
        prompt: 123,
      },
    } as NextApiRequest;

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as NextApiResponse;

    handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Prompt is required" });
  });

  it("should return chain and QR code for valid prompt", async () => {
    const req = {
      method: "POST",
      body: {
        prompt: "Heavy metal sound with distortion",
      },
    } as NextApiRequest;

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as NextApiResponse;

    // Mock console.log to verify prompt is being processed
    const consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    await handler(req, res);

    expect(consoleLogSpy).toHaveBeenCalledWith(
      "Received prompt:",
      "Heavy metal sound with distortion"
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        chain: expect.objectContaining({
          noisegate: expect.any(Object),
          compressor: expect.any(Object),
          modulation: expect.any(Object),
          effect: expect.any(Object),
          amplifier: expect.any(Object),
          cabinet: expect.any(Object),
          eq: expect.any(Object),
          reverb: expect.any(Object),
          delay: expect.any(Object),
        }),
        qrCode: expect.stringContaining("nux://MightyAmp:"),
        rawBytes: expect.any(Array),
      })
    );

    consoleLogSpy.mockRestore();
  });

  it("should validate response structure", async () => {
    const req = {
      method: "POST",
      body: {
        prompt: "Test prompt",
      },
    } as NextApiRequest;

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as NextApiResponse;

    await handler(req, res);

    const callArgs = res.json.mock.calls[0][0];

    // Проверяем структуру ответа
    expect(callArgs).toHaveProperty("chain");
    expect(callArgs).toHaveProperty("qrCode");
    expect(callArgs).toHaveProperty("rawBytes");

    // Проверяем типы
    expect(typeof callArgs.qrCode).toBe("string");
    expect(Array.isArray(callArgs.rawBytes)).toBe(true);
    expect(typeof callArgs.chain).toBe("object");

    // Проверяем новые поля для AI
    expect("aiGenerated" in callArgs).toBe(true);
    expect(typeof callArgs.aiGenerated).toBe("boolean");
  });

  it("should include aiGenerated flag in response", async () => {
    const req = {
      method: "POST",
      body: {
        prompt: "Blues sound with overdrive",
      },
    } as NextApiRequest;

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as NextApiResponse;

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    const response = res.json.mock.calls[0][0];
    expect(response).toHaveProperty("aiGenerated");
    expect(typeof response.aiGenerated).toBe("boolean");
  });
});
