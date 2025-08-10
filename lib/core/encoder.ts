import { config } from './config';
import { createDefaultChain } from './helpers/create-default-chain';
import { Blocks, BlockConfig, TypeParamConfig } from './interface';
import { NuxMp3PresetIndex } from './const';

// Тип для блока чейна
type ChainBlock = {
  type: string;
  enabled: boolean;
  params: Record<string, number>;
};

// Константы для NUX совместимости
const NUX_PREFIX: string = 'nux://MightyAmp:';
const DISABLED_FLAG: number = 0x40;
const TYPE_MASK: number = 0x3f;

// Тип для результата энкодинга
export interface EncodedChain {
  bytes: Uint8Array;
  qrCode: string;
  rawBytes: number[];
}

// Функции для base64 кодирования (совместимость с браузером и Node.js)
function bytesToB64(bytes: Uint8Array): string {
  let s: string = '';
  for (let i: number = 0; i < bytes.length; i++) {
    s += String.fromCharCode(bytes[i] as number);
  }
  if (typeof window !== 'undefined') {
    return window.btoa(s);
  }
  return Buffer.from(s, 'binary').toString('base64');
}

/**
 * Основная функция энкодера
 * Принимает чейн из createDefaultChain() и конвертирует его в байтовый массив для QR кода
 * Использует config.ts как источник истины для структуры байтов
 */
export function encodeChainToBytes(chain: ReturnType<typeof createDefaultChain>): EncodedChain {
  // Инициализируем массив байтов (113 элементов для NUX совместимости)
  const data: Uint8Array = new Uint8Array(113);
  
  // Устанавливаем мастер уровень (по умолчанию 50)
  data[NuxMp3PresetIndex.MASTER] = 50;
  
  // Проходим по всем блокам в чейне
  Object.entries(chain).forEach(([blockKey, blockData]: [string, ChainBlock]) => {
    const blockType: Blocks = blockKey as Blocks;
    const blockConfig: BlockConfig | undefined = config[blockType];
    
    if (!blockConfig?.types) {
      console.warn(`No config found for block type: ${blockType}`);
      return;
    }
    
    // Находим конфигурацию для текущего типа блока
    const typeConfig: { label: string; realName: string; encodeType: number; params: TypeParamConfig[] } | undefined = blockConfig.types.find((type: { label: string; realName: string; encodeType: number; params: TypeParamConfig[] }) => type.label === blockData.type);
    
    if (!typeConfig) {
      console.warn(`No type config found for ${blockData.type} in ${blockType}`);
      return;
    }
    
    // Устанавливаем тип блока в соответствующий заголовок
    const headIndex: number = getHeadIndex(blockType);
    if (headIndex !== -1) {
      let value: number = typeConfig.encodeType & TYPE_MASK;
      if (!blockData.enabled) {
        value |= DISABLED_FLAG;
      }
      data[headIndex] = value;
    }
    
    // Устанавливаем параметры блока согласно конфигурации
    typeConfig.params.forEach((paramConfig: TypeParamConfig) => {
      const paramValue: number | undefined = blockData.params[paramConfig.label];
      if (paramValue !== undefined) {
        data[paramConfig.encodeIndex] = Math.max(0, Math.min(100, paramValue));
      }
    });
  });
  
  // Устанавливаем дефолтный порядок чейна
  const chainOrder: number[] = [5, 1, 6, 2, 3, 9, 4, 8, 7]; // CHAIN_DEFAULT из старого энкодера
  chainOrder.forEach((fxid: number, i: number) => {
    data[NuxMp3PresetIndex.LINK1 + i] = fxid;
  });
  
  // Добавляем заголовок с product_id и version
  const productId: number = 15; // NUX MP-3 product ID
  const version: number = 1;
  const head: Uint8Array = new Uint8Array([productId, version]);
  const allBytes: Uint8Array = new Uint8Array(head.length + data.length);
  allBytes.set(head, 0);
  allBytes.set(data, head.length);
  
  // Создаем NUX совместимый QR код
  const qrCode: string = NUX_PREFIX + bytesToB64(allBytes);
  
  return {
    bytes: allBytes,
    qrCode,
    rawBytes: Array.from(allBytes)
  };
}

/**
 * Получает индекс заголовка для блока из константы NuxMp3PresetIndex
 */
function getHeadIndex(blockType: Blocks): number {
  switch (blockType) {
    case Blocks.Noisegate:
      return NuxMp3PresetIndex.Head_iNG;
    case Blocks.Compressor:
      return NuxMp3PresetIndex.Head_iCMP;
    case Blocks.Modulation:
      return NuxMp3PresetIndex.Head_iMOD;
    case Blocks.Effect:
      return NuxMp3PresetIndex.Head_iEFX;
    case Blocks.Amplifier:
      return NuxMp3PresetIndex.Head_iAMP;
    case Blocks.Cabinet:
      return NuxMp3PresetIndex.Head_iCAB;
    case Blocks.Eq:
      return NuxMp3PresetIndex.Head_iEQ;
    case Blocks.Reverb:
      return NuxMp3PresetIndex.Head_iRVB;
    case Blocks.Delay:
      return NuxMp3PresetIndex.Head_iDLY;
    default:
      return -1;
  }
}

/**
 * Вспомогательная функция для энкодинга дефолтного чейна
 */
export function encodeDefaultChain(): EncodedChain {
  const defaultChain: ReturnType<typeof createDefaultChain> = createDefaultChain();
  return encodeChainToBytes(defaultChain);
}

/**
 * Функция для отладки - показывает какие байты установлены
 */
export function debugEncoding(chain: ReturnType<typeof createDefaultChain>): {
  encoding: EncodedChain;
  debug: Array<{ index: number; value: number; description: string; enabled?: boolean }>;
} {
  const encoding: EncodedChain = encodeChainToBytes(chain);
  const debug: Array<{ index: number; value: number; description: string; enabled?: boolean }> = Array.from(encoding.bytes)
    .map((value: number, index: number) => {
      const description: string = getIndexDescription(index);
      const isHeader: boolean = description.startsWith('Head_');
      const actualValue: number = isHeader ? value & TYPE_MASK : value;
      
      const result: { index: number; value: number; description: string; enabled?: boolean } = { 
        index, 
        value: actualValue, 
        description
      };
      
      if (isHeader) {
        result.enabled = (value & DISABLED_FLAG) === 0;
      }
      
      return result;
    })
    .filter((item: { index: number; value: number; description: string; enabled?: boolean }) => item.value !== 0);
  
  return { encoding, debug };
}

/**
 * Получает описание для индекса байта (для отладки)
 */
function getIndexDescription(index: number): string {
  // Поиск в константах NuxMp3PresetIndex
  for (const [key, value] of Object.entries(NuxMp3PresetIndex)) {
    if (value === index) {
      return key;
    }
  }
  return `Unknown index ${index.toString()}`;
}
