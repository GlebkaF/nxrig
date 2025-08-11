import {
  config,
  NUX_PREFIX,
  DISABLED_FLAG,
  TYPE_MASK,
  DATA_SIZE,
  HEADER_SIZE,
  TOTAL_SIZE,
  PRODUCT_ID,
  VERSION,
  DEFAULT_MASTER,
} from "./config";
import { Blocks, Chain } from "./interface";

// Результат энкодинга
interface EncodedChain {
  readonly bytes: Uint8Array;
  readonly qrCode: string;
  readonly rawBytes: readonly number[];
}

// Утилиты
const clamp = (value: number): number => Math.max(0, Math.min(100, value));
const bytesToB64 = (bytes: Uint8Array): string => {
  const chars = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");
  return typeof window !== "undefined"
    ? window.btoa(chars)
    : Buffer.from(chars, "binary").toString("base64");
};

export const encodeChain = (chain: Chain): EncodedChain => {
  const data = new Uint8Array(DATA_SIZE);
  data[config.encoder.masterIndex] = DEFAULT_MASTER;

  // Энкодируем блоки
  for (const [blockKey, blockData] of Object.entries(chain)) {
    const blockType = blockKey as Blocks;
    const blockConfig = config.blocks[blockType];

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!blockConfig?.types) continue;

    const typeConfig = blockConfig.types.find(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
      (t) => t.label === blockData.type
    );
    if (!typeConfig) continue;

    // Устанавливаем заголовок блока
    const headIndex = blockConfig.encoderHeadIndex;
    if (headIndex >= 0) {
      let value = typeConfig.encodeType & TYPE_MASK;
      if (!blockData.enabled) value |= DISABLED_FLAG;
      data[headIndex] = value;
    }

    // Устанавливаем параметры
    for (const paramConfig of typeConfig.params) {
      const params = blockData.params as Record<string, number>;
      const paramValue = params[paramConfig.label];
      if (paramValue !== undefined) {
        data[paramConfig.encodeIndex] = clamp(paramValue);
      }
    }
  }

  // Устанавливаем порядок чейна
  config.encoder.chainOrder.forEach((fxid, i) => {
    data[config.encoder.linkStartIndex + i] = fxid;
  });

  // Создаем финальный массив с заголовком
  const result = new Uint8Array(TOTAL_SIZE);
  result.set([PRODUCT_ID, VERSION], 0);
  result.set(data, HEADER_SIZE);

  return {
    bytes: result,
    qrCode: NUX_PREFIX + bytesToB64(result),
    rawBytes: Array.from(result),
  };
};
