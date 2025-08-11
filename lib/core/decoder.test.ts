import { describe, expect, it } from "vitest";
import { decodeChain } from "./decoder";
import { encodeChain } from "./encoder";
import { createDefaultChain } from "./helpers/create-default-chain";

describe("decoder", () => {
  it("should decode encoded chain back to original", () => {
    const originalChain = createDefaultChain();
    const encoded = encodeChain(originalChain);
    const decoded = decodeChain(encoded.qrCode);

    expect(decoded).toEqual(originalChain);
  });

  it("should throw on invalid prefix", () => {
    expect(() => decodeChain("invalid://data")).toThrow(
      "Invalid QR code prefix"
    );
  });

  it("should throw on invalid data size", () => {
    const invalidData = "nux://MightyAmp:ABC"; // Короткие данные
    expect(() => decodeChain(invalidData)).toThrow("Invalid data size");
  });

  it("should throw on invalid product ID or version", () => {
    // Создаем неправильный QR-код с измененным ID продукта
    const chain = createDefaultChain();
    const encoded = encodeChain(chain);
    const bytes = new Uint8Array(encoded.bytes);
    bytes[0] = 0; // Неправильный ID продукта
    const invalidQr = "nux://MightyAmp:" + btoa(String.fromCharCode(...bytes));

    expect(() => decodeChain(invalidQr)).toThrow(
      "Invalid product ID or version"
    );
  });

  it("should throw on unknown block type", () => {
    const invalidQr =
      "nux://MightyAmp:DwEAAkcBAQFJRAIBAAAAAAAjPAAAADJGQQAAAAAeMjcyPAEAAAAyNTI1OTkAAAAAAAAAKCgAAAA8RgEAAAAABSMUAAAAAAAAGQo8AAAAAAAyEj8AAAAmAAAAAAUBBgIDCQQIBwAAAAAAAAAAAAAAAAAAAA==";

    expect(() => decodeChain(invalidQr)).toThrow(
      `Unknown type (9) for block "modulation". Known types are: CE-1 (1). This preset might be from a newer firmware version.`
    );
  });
});
