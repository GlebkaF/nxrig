import { config } from './config';
import { createDefaultChain } from './helpers/create-default-chain';
import { Blocks } from './interface';
import { NuxMp3PresetIndex } from './const';

// Тип для результата энкодинга
export interface EncodedChain {
  bytes: number[];
  qrCode: string;
}

/**
 * Основная функция энкодера
 * Принимает чейн из createDefaultChain() и конвертирует его в байтовый массив для QR кода
 * Использует config.ts как источник истины для структуры байтов
 */
export function encodeChainToBytes(chain: ReturnType<typeof createDefaultChain>): EncodedChain {
  // Инициализируем массив байтов (100 элементов согласно константам)
  const bytes = new Array(100).fill(0);
  
  // Проходим по всем блокам в чейне
  Object.entries(chain).forEach(([blockKey, blockData]) => {
    const blockType = blockKey as Blocks;
    const blockConfig = config[blockType];
    
    if (!blockConfig || !blockConfig.types) {
      console.warn(`No config found for block type: ${blockType}`);
      return;
    }
    
    // Находим конфигурацию для текущего типа блока
    const typeConfig = blockConfig.types.find(type => type.label === blockData.type);
    
    if (!typeConfig) {
      console.warn(`No type config found for ${blockData.type} in ${blockType}`);
      return;
    }
    
    // Устанавливаем тип блока в соответствующий заголовок
    const headIndex = getHeadIndex(blockType);
    if (headIndex !== -1) {
      bytes[headIndex] = blockData.enabled ? typeConfig.encodeType : 0;
    }
    
    // Устанавливаем параметры блока согласно конфигурации
    typeConfig.params.forEach(paramConfig => {
      const paramValue = blockData.params[paramConfig.label];
      if (paramValue !== undefined) {
        bytes[paramConfig.encodeIndex] = paramValue;
      }
    });
  });
  
  // Конвертируем байты в строку для QR кода (каждый байт в 3-значное число)
  const qrCode = bytes.map(byte => byte.toString().padStart(3, '0')).join('');
  
  return {
    bytes,
    qrCode
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
  const defaultChain = createDefaultChain();
  return encodeChainToBytes(defaultChain);
}

/**
 * Функция для отладки - показывает какие байты установлены
 */
export function debugEncoding(chain: ReturnType<typeof createDefaultChain>): {
  encoding: EncodedChain;
  debug: Array<{ index: number; value: number; description: string }>;
} {
  const encoding = encodeChainToBytes(chain);
  const debug = encoding.bytes
    .map((value, index) => ({ index, value, description: getIndexDescription(index) }))
    .filter(item => item.value !== 0);
  
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
  return `Unknown index ${index}`;
}
