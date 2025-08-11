/* eslint-disable @typescript-eslint/typedef */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */

import { config, blockHeadMapping, encoderConfig } from './config';
import { createDefaultChain } from './helpers/create-default-chain';
import { Blocks } from './interface';
import { NuxMp3PresetIndex } from './const';

// Типы для декодера
type Chain = ReturnType<typeof createDefaultChain>;
type ChainBlock = Chain[keyof Chain];

// Константы NUX
const NUX_PREFIX = 'nux://MightyAmp:' as const;
const DISABLED_FLAG = 0x40 as const;
const TYPE_MASK = 0x3f as const;
const DATA_SIZE = 113 as const;
const HEADER_SIZE = 2 as const;
const TOTAL_SIZE = 115 as const;

// Результат декодинга
export interface DecodedChain {
  readonly chain: Chain;
  readonly productId: number;
  readonly version: number;
  readonly master: number;
}

// Утилиты для декодинга
const b64ToBytes = (b64: string): Uint8Array => {
  const binaryString = typeof window !== 'undefined' 
    ? window.atob(b64)
    : Buffer.from(b64, 'base64').toString('binary');
  
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

const getHeadIndex = (blockType: Blocks): number => {
  return NuxMp3PresetIndex[blockHeadMapping[blockType]] ?? -1;
};

const findTypeByEncodeType = (blockConfig: any, encodeType: number): string | null => {
  const typeConfig = blockConfig.types.find((t: any) => t.encodeType === encodeType);
  return typeConfig?.label || null;
};

const decodeBlockParams = (data: Uint8Array, typeConfig: any): Record<string, number> => {
  const params: Record<string, number> = {};
  
  for (const paramConfig of typeConfig.params) {
    const value = data[paramConfig.encodeIndex] || 0;
    params[paramConfig.label] = value;
  }
  
  return params;
};

// Основная функция декодера
export const decodeQrToChain = (qrString: string): DecodedChain => {
  // Валидация входных данных
  if (!qrString || typeof qrString !== 'string') {
    throw new Error('QR string is empty or invalid');
  }
  
  if (!qrString.startsWith(NUX_PREFIX)) {
    throw new Error(`Invalid QR prefix. Expected "${NUX_PREFIX}", got "${qrString.substring(0, NUX_PREFIX.length)}"`);
  }
  
  // Извлекаем base64 данные
  const b64 = qrString.slice(NUX_PREFIX.length);
  let bytes: Uint8Array;
  
  try {
    bytes = b64ToBytes(b64);
  } catch (error) {
    throw new Error(`Failed to decode base64 data: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
  
  // Проверяем размер данных
  if (bytes.length < TOTAL_SIZE) {
    throw new Error(`QR payload too short. Expected ${TOTAL_SIZE} bytes, got ${bytes.length}`);
  }
  
  // Извлекаем заголовок
  const productId = bytes[0];
  const version = bytes[1];
  const data = bytes.slice(HEADER_SIZE);
  
  // Создаем базовый чейн
  const chain = createDefaultChain();
  
  // Декодируем каждый блок
  for (const [blockKey, blockData] of Object.entries(chain)) {
    const blockType = blockKey as Blocks;
    const blockConfig = config[blockType];
    
    if (!blockConfig?.types) continue;
    
    const headIndex = getHeadIndex(blockType);
    if (headIndex < 0 || headIndex >= data.length) continue;
    
    const headValue = data[headIndex];
    if (!headValue) continue; // Блок не установлен
    
    // Извлекаем информацию о блоке
    const enabled = (headValue & DISABLED_FLAG) === 0;
    const typeId = headValue & TYPE_MASK;
    const typeName = findTypeByEncodeType(blockConfig, typeId);
    
    if (!typeName) continue; // Неизвестный тип
    
    // Находим конфигурацию типа
    const typeConfig = blockConfig.types.find(t => t.label === typeName);
    if (!typeConfig) continue;
    
    // Декодируем параметры
    const params = decodeBlockParams(data, typeConfig);
    
    // Обновляем блок в чейне
    (chain as any)[blockKey] = {
      type: typeName,
      enabled,
      params,
    };
  }
  
  // Извлекаем master уровень
  const master = data[encoderConfig.masterIndex] || encoderConfig.defaultMasterValue;
  
  return {
    chain,
    productId,
    version,
    master,
  };
};

// Упрощенная версия, которая возвращает только чейн
export const qrToChain = (qrString: string): Chain => {
  const decoded = decodeQrToChain(qrString);
  return decoded.chain;
};

// Валидация QR кода без полного декодинга
export const validateQrCode = (qrString: string): boolean => {
  try {
    decodeQrToChain(qrString);
    return true;
  } catch {
    return false;
  }
};

// Экспорт по умолчанию
export default decodeQrToChain;