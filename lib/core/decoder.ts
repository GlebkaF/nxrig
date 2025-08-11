import {
  config,
  NUX_PREFIX,
  DISABLED_FLAG,
  TYPE_MASK,
  HEADER_SIZE,
  TOTAL_SIZE,
  PRODUCT_ID,
  VERSION,
} from "./config";
import { Blocks, Chain } from "./interface";

// Утилиты
const b64ToBytes = (b64: string): Uint8Array => {
  const binaryStr =
    typeof window !== "undefined"
      ? window.atob(b64)
      : Buffer.from(b64, "base64").toString("binary");
  return Uint8Array.from(binaryStr, (char) => char.charCodeAt(0));
};

export const decodeChain = (qrCode: string): Chain => {
  // Проверяем префикс
  if (!qrCode.startsWith(NUX_PREFIX)) {
    throw new Error("Invalid QR code prefix");
  }

  // Декодируем base64 в байты
  const b64 = qrCode.slice(NUX_PREFIX.length);
  const bytes = b64ToBytes(b64);

  // Проверяем размер и заголовок
  if (bytes.length !== TOTAL_SIZE) {
    throw new Error(`Invalid data size: ${bytes.length}`);
  }
  if (bytes[0] !== PRODUCT_ID || bytes[1] !== VERSION) {
    throw new Error("Invalid product ID or version");
  }

  // Получаем данные без заголовка
  const data = bytes.slice(HEADER_SIZE);

  // Создаем пустую цепочку
  const chain = {} as Chain;

  // Декодируем блоки
  for (const [blockKey, blockConfig] of Object.entries(config.blocks)) {
    const blockType = blockKey as Blocks;
    const headIndex = blockConfig.encoderHeadIndex;

    if (headIndex >= 0) {
      const headValue = data[headIndex];
      const typeValue = headValue & TYPE_MASK;
      const enabled = (headValue & DISABLED_FLAG) === 0;

      // Находим конфигурацию типа
      const typeConfig = blockConfig.types.find(
        (t) => (t.encodeType & TYPE_MASK) === typeValue
      );

      if (typeConfig) {
        // Создаем объект с параметрами
        const params = {} as Record<string, number>;
        for (const param of typeConfig.params) {
          params[param.label] = data[param.encodeIndex];
        }

        // Добавляем блок в цепочку
        chain[blockType] = {
          type: typeConfig.label,
          enabled,
          params,
        };
      }
    }
  }

  return chain;
};
