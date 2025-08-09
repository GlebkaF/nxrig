import jsQR from 'jsqr';
import { PNG } from 'pngjs';
import qrcodegen from 'qrcode-generator';
import { describe, it, expect } from 'vitest';

import { flatPresetToQrString, qrStringToFlatPreset } from '../lib/encoder.js';

function renderQrPngData(text, scale = 4, margin = 2) {
  const qr = qrcodegen(0, 'L');
  qr.addData(text);
  qr.make();
  const size = qr.getModuleCount();
  const px = (size + margin * 2) * scale;
  const png = new PNG({ width: px, height: px });
  for (let y = 0; y < px; y++) {
    for (let x = 0; x < px; x++) {
      const mx = Math.floor(x / scale) - margin;
      const my = Math.floor(y / scale) - margin;
      const isDark = mx >= 0 && my >= 0 && mx < size && my < size ? qr.isDark(my, mx) : false;
      const idx = (png.width * y + x) << 2;
      const v = isDark ? 0 : 255;
      png.data[idx] = v;
      png.data[idx + 1] = v;
      png.data[idx + 2] = v;
      png.data[idx + 3] = 255;
    }
  }
  return PNG.sync.write(png);
}

function decodeQrFromPngBuffer(buf) {
  const png = PNG.sync.read(buf);
  const { width, height, data } = png;
  const out = jsQR(data, width, height);
  return out?.data || '';
}

describe('QR end-to-end', () => {
  it('generates a scannable PNG that decodes back to preset', () => {
    const preset = { product_id: 15, version: 1, master: 50, amp: { enabled: true, type: 'Jazz Clean', gain: 10, master: 20, bass: 30, mid: 40, treble: 50, bright: 100 } };
    const qrText = flatPresetToQrString(preset);
    const pngBuf = renderQrPngData(qrText);
    const scanned = decodeQrFromPngBuffer(pngBuf);
    expect(scanned).toBe(qrText);
    const decoded = qrStringToFlatPreset(scanned);
    expect(decoded.amp.type).toBe('Jazz Clean');
    expect(decoded.amp.bright).toBe(100);
  });
});