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
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw new Error(`Invalid data size: ${bytes.length}`);
  }
  if (bytes[0] !== PRODUCT_ID || bytes[1] !== VERSION) {
    throw new Error("Invalid product ID or version");
  }

  // Получаем данные без заголовка
  const data = bytes.slice(HEADER_SIZE);

  // Создаем пустую цепочку - используем Partial для безопасности
  const chain: Partial<Chain> = {};

  // Декодируем блоки
  for (const [blockKey, blockConfig] of Object.entries(config.blocks)) {
    const blockType = blockKey as Blocks;
    const headIndex = blockConfig.encoderHeadIndex;

    if (headIndex >= 0) {
      const headValue = data[headIndex];

      // Проверяем, что headValue существует и это число
      if (typeof headValue !== "number") {
        throw new Error(
          `Invalid head value at index ${headIndex.toString()} for block ${blockType}`
        );
      }

      const typeValue = headValue & TYPE_MASK;
      const enabled = (headValue & DISABLED_FLAG) === 0;

      // Находим конфигурацию типа
      const typeConfig = blockConfig.types.find(
        (t) => (t.encodeType & TYPE_MASK) === typeValue
      );

      if (typeConfig === undefined) {
        const knownTypes = blockConfig.types
          .map(
            (t) =>
              t.realName + " (" + (t.encodeType & TYPE_MASK).toString() + ")"
          )
          .join(", ");
        throw new Error(
          "Unknown type (" +
            typeValue.toString() +
            ') for block "' +
            blockType +
            '". ' +
            "Known types are: " +
            knownTypes +
            ". " +
            "This preset might be from a newer firmware version."
        );
      }

      // Создаем объект с параметрами
      const params = {} as Record<string, number>;
      for (const param of typeConfig.params) {
        const paramValue = data[param.encodeIndex];
        if (typeof paramValue !== "number") {
          throw new Error(
            `Invalid parameter value at index ${param.encodeIndex.toString()} for param ${param.label}`
          );
        }
        params[param.label] = paramValue;
      }

      // Добавляем блок в цепочку с безопасной типизацией
      const blockData = {
        type: typeConfig.label,
        enabled,
        params,
      };

      // Используем безопасное присваивание через индексный доступ
      (chain as Record<string, typeof blockData>)[blockType] = blockData;
    }
  }

  // Проверяем, что все блоки были декодированы
  const allBlocks = Object.values(Blocks);
  const decodedBlocks = Object.keys(chain);

  if (decodedBlocks.length !== allBlocks.length) {
    const missingBlocks = allBlocks.filter(
      (block) => !decodedBlocks.includes(block)
    );
    throw new Error(
      `Missing blocks in decoded chain: ${missingBlocks.join(", ")}`
    );
  }

  return chain as Chain;
};
