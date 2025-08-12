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

  // Создаем пустую цепочку
  const chain = {} as Chain;

  // Декодируем блоки
  for (const [blockKey, blockConfig] of Object.entries(config.blocks)) {
    const blockType = blockKey as Blocks;
    const headIndex = blockConfig.encoderHeadIndex;

    if (headIndex >= 0) {
      const headValue = data[headIndex];
      // @ts-expect-error - headValue is not a number
      const typeValue = headValue & TYPE_MASK;
      // @ts-expect-error - headValue is not a number
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
        // @ts-expect-error - undefined is not a number
        params[param.label] = data[param.encodeIndex];
      }

      // Добавляем блок в цепочку
      // Используем any для обхода проблемы со сложными union типами
      (chain as any)[blockType] = {
        type: typeConfig.label,
        enabled,
        params,
      };
    }
  }

  return chain;
};
