import { encodeDefaultChain, encodeChainToBytes, debugEncoding } from './lib/core/encoder';
import { createDefaultChain } from './lib/core/helpers/create-default-chain';

/**
 * Тестовый файл для демонстрации работы нового энкодера
 */

console.log('🎸 Тестирование нового энкодера...');

// Тест 1: Энкодинг дефолтного чейна
console.log('\n📋 Тест 1: Дефолтный чейн');
const defaultChain = createDefaultChain();
console.log('Дефолтный чейн:', JSON.stringify(defaultChain, null, 2));

const encoded = encodeDefaultChain();
console.log('\n🔢 Результат энкодинга:');
console.log('Байтов всего:', encoded.bytes.length);
console.log('Ненулевых байтов:', encoded.bytes.filter(b => b !== 0).length);
console.log('QR код (первые 100 символов):', encoded.qrCode.substring(0, 100) + '...');

// Тест 2: Отладочная информация
console.log('\n🔍 Тест 2: Отладочная информация');
const debugInfo = debugEncoding(defaultChain);
console.log('Ненулевые байты:');
debugInfo.debug.forEach(item => {
  console.log(`  Индекс ${item.index}: ${item.value} (${item.description})`);
});

// Тест 3: Кастомный чейн
console.log('\n🎛️ Тест 3: Кастомный чейн');
const customChain = createDefaultChain();
// Модифицируем параметры
customChain.amplifier.params.Gain = 75;
customChain.amplifier.params.Master = 80;
customChain.effect.params.Output = 90;
customChain.reverb.enabled = false; // Отключаем реверб

const customEncoded = encodeChainToBytes(customChain);
console.log('Кастомный чейн энкодирован');
console.log('Изменения в байтах:');

// Сравниваем с дефолтным
encoded.bytes.forEach((defaultByte, index) => {
  const customByte = customEncoded.bytes[index];
  if (defaultByte !== customByte) {
    console.log(`  Индекс ${index}: ${defaultByte} → ${customByte}`);
  }
});

// Тест 4: Проверка структуры QR кода
console.log('\n📱 Тест 4: Структура QR кода');
console.log('Длина QR кода:', encoded.qrCode.length);
console.log('QR код разбит по блокам:');
const qrChunks = encoded.qrCode.match(/.{1,30}/g) || [];
qrChunks.forEach((chunk, index) => {
  console.log(`  Часть ${index + 1}: ${chunk}`);
});

// Экспорт для использования в браузере или Node.js
export {
  encodeDefaultChain,
  encodeChainToBytes,
  debugEncoding,
  createDefaultChain
};