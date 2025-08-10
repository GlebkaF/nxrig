/* eslint-disable @typescript-eslint/typedef */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */

import { config } from './config';
import { createDefaultChain } from './helpers/create-default-chain';
import { Blocks } from './interface';
import { NuxMp3PresetIndex } from './const';

// Улучшенные типы
type Chain = ReturnType<typeof createDefaultChain>;
type ChainBlock = Chain[keyof Chain];

// Константы NUX
const NUX_PREFIX = 'nux://MightyAmp:' as const;
const DISABLED_FLAG = 0x40 as const;
const TYPE_MASK = 0x3f as const;
const DATA_SIZE = 113 as const;
const HEADER_SIZE = 2 as const;
const TOTAL_SIZE = 115 as const; // HEADER_SIZE + DATA_SIZE
const PRODUCT_ID = 15 as const;
const VERSION = 1 as const;
const DEFAULT_MASTER = 50 as const;
const CHAIN_ORDER = [5, 1, 6, 2, 3, 9, 4, 8, 7] as const;

// Результат энкодинга
export interface EncodedChain {
  readonly bytes: Uint8Array;
  readonly qrCode: string;
  readonly rawBytes: readonly number[];
}

// Отладочная информация
export interface DebugItem {
  readonly index: number;
  readonly value: number;
  readonly description: string;
  readonly enabled?: boolean;
}

export interface DebugInfo {
  readonly encoding: EncodedChain;
  readonly debug: readonly DebugItem[];
}

// Утилиты
const clamp = (value: number): number => Math.max(0, Math.min(100, value));

const bytesToB64 = (bytes: Uint8Array): string => {
  const chars = Array.from(bytes, byte => String.fromCharCode(byte)).join('');
  return typeof window !== 'undefined' 
    ? window.btoa(chars)
    : Buffer.from(chars, 'binary').toString('base64');
};

const getHeadIndex = (blockType: Blocks): number => {
  const headMap: Record<Blocks, keyof typeof NuxMp3PresetIndex> = {
    [Blocks.Noisegate]: 'Head_iNG',
    [Blocks.Compressor]: 'Head_iCMP', 
    [Blocks.Effect]: 'Head_iEFX',
    [Blocks.Amplifier]: 'Head_iAMP',
    [Blocks.Cabinet]: 'Head_iCAB',
    [Blocks.Eq]: 'Head_iEQ',
    [Blocks.Modulation]: 'Head_iMOD',
    [Blocks.Delay]: 'Head_iDLY',
    [Blocks.Reverb]: 'Head_iRVB',
  };
  return NuxMp3PresetIndex[headMap[blockType]] ?? -1;
};

const getIndexDescription = (index: number): string => {
  const entry = Object.entries(NuxMp3PresetIndex).find(([, value]) => value === index);
  return entry?.[0] ?? `Unknown index ${index}`;
};

// Основная функция энкодера (максимально упрощенная)
export const encodeChainToBytes = (chain: Chain): EncodedChain => {
  const data = new Uint8Array(DATA_SIZE);
  data[NuxMp3PresetIndex.MASTER] = DEFAULT_MASTER;

  // Энкодируем блоки
  for (const [blockKey, blockData] of Object.entries(chain)) {
    const blockType = blockKey as Blocks;
    const blockConfig = config[blockType];
    
    if (!blockConfig?.types) continue;
    
    const typeConfig = blockConfig.types.find(t => t.label === blockData.type);
    if (!typeConfig) continue;
    
    // Устанавливаем заголовок блока
    const headIndex = getHeadIndex(blockType);
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
  CHAIN_ORDER.forEach((fxid, i) => {
    data[NuxMp3PresetIndex.LINK1 + i] = fxid;
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

// Упрощенные утилиты
export const encodeDefaultChain = (): EncodedChain => 
  encodeChainToBytes(createDefaultChain());

export const debugEncoding = (chain: Chain): DebugInfo => {
  const encoding = encodeChainToBytes(chain);
  
  const debug = Array.from(encoding.bytes, (value, index) => {
    const description = getIndexDescription(index);
    const isHeader = description.startsWith('Head_');
    const actualValue = isHeader ? value & TYPE_MASK : value;
    
    const item: DebugItem = { 
      index, 
      value: actualValue, 
      description,
      ...(isHeader && { enabled: (value & DISABLED_FLAG) === 0 })
    };
    
    return item;
  }).filter(item => item.value !== 0);

  return { encoding, debug };
};
