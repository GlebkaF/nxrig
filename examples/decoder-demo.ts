/**
 * Демонстрация работы QR декодера
 * 
 * Этот файл показывает, как использовать декодер для преобразования
 * QR кодов обратно в объекты чейна.
 */

import { encodeChain } from '../lib/core/encoder';
import { decodeQrToChain, qrToChain, validateQrCode } from '../lib/core/decoder';
import { createDefaultChain } from '../lib/core/helpers/create-default-chain';
import { AmplifierType } from '../lib/core/blocks/amplifier';
import { ReverbType } from '../lib/core/blocks/reverb';

console.log('=== QR Decoder Demo ===\n');

// 1. Создаем тестовый чейн
console.log('1. Creating test chain...');
const originalChain = createDefaultChain();

// Настраиваем чейн
originalChain.amplifier.params.Gain = 75;
originalChain.amplifier.params.Master = 60;
originalChain.reverb.type = ReverbType.Hall;
originalChain.reverb.params.Level = 80;
originalChain.effect.enabled = false;

console.log('Original chain:', {
  amp: {
    type: originalChain.amplifier.type,
    enabled: originalChain.amplifier.enabled,
    gain: originalChain.amplifier.params.Gain,
    master: originalChain.amplifier.params.Master
  },
  reverb: {
    type: originalChain.reverb.type,
    enabled: originalChain.reverb.enabled,
    level: originalChain.reverb.params.Level
  },
  effect: {
    enabled: originalChain.effect.enabled
  }
});

// 2. Кодируем в QR
console.log('\n2. Encoding to QR...');
const encoded = encodeChain(originalChain);
console.log('QR Code:', encoded.qrCode);
console.log('QR Length:', encoded.qrCode.length);

// 3. Валидируем QR код
console.log('\n3. Validating QR code...');
const isValid = validateQrCode(encoded.qrCode);
console.log('QR is valid:', isValid);

// 4. Декодируем QR обратно в чейн (полная информация)
console.log('\n4. Decoding QR to chain (full info)...');
const decodedFull = decodeQrToChain(encoded.qrCode);
console.log('Decoded (full):', {
  productId: decodedFull.productId,
  version: decodedFull.version,
  master: decodedFull.master,
  amp: {
    type: decodedFull.chain.amplifier.type,
    enabled: decodedFull.chain.amplifier.enabled,
    gain: decodedFull.chain.amplifier.params.Gain,
    master: decodedFull.chain.amplifier.params.Master
  },
  reverb: {
    type: decodedFull.chain.reverb.type,
    enabled: decodedFull.chain.reverb.enabled,
    level: decodedFull.chain.reverb.params.Level
  },
  effect: {
    enabled: decodedFull.chain.effect.enabled
  }
});

// 5. Декодируем QR в чейн (только чейн)
console.log('\n5. Decoding QR to chain (chain only)...');
const decodedChain = qrToChain(encoded.qrCode);
console.log('Decoded chain amp type:', decodedChain.amplifier.type);
console.log('Decoded chain reverb type:', decodedChain.reverb.type);

// 6. Проверяем идентичность данных
console.log('\n6. Verifying data integrity...');
const isIdentical = 
  decodedFull.chain.amplifier.type === originalChain.amplifier.type &&
  decodedFull.chain.amplifier.params.Gain === originalChain.amplifier.params.Gain &&
  decodedFull.chain.reverb.type === originalChain.reverb.type &&
  decodedFull.chain.effect.enabled === originalChain.effect.enabled;

console.log('Data integrity preserved:', isIdentical);

// 7. Тестируем обработку ошибок
console.log('\n7. Testing error handling...');

try {
  validateQrCode('invalid-qr');
  console.log('Invalid QR validation: false (as expected)');
} catch (error) {
  console.log('Unexpected error in validation');
}

try {
  decodeQrToChain('');
  console.log('ERROR: Should have thrown for empty string');
} catch (error) {
  console.log('Empty string error: ✓ (as expected)');
}

try {
  decodeQrToChain('invalid://prefix:data');
  console.log('ERROR: Should have thrown for invalid prefix');
} catch (error) {
  console.log('Invalid prefix error: ✓ (as expected)');
}

console.log('\n=== Demo completed successfully! ===');

export { originalChain, encoded, decodedFull, decodedChain };