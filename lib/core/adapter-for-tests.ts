// Минимальный адаптер для обратной совместимости с тестами
import { 
  chainToQrString, 
  qrStringToChain, 
  parseJsonToChain, 
  chainToDisplayJson 
} from "./chain-converter";

// Функции-обертки для совместимости со старым API
export function flatPresetToQrString(preset: any): string {
  const chain = parseJsonToChain(JSON.stringify(preset));
  return chainToQrString(chain);
}

export function qrStringToFlatPreset(qrString: string): any {
  const chain = qrStringToChain(qrString);
  return chainToDisplayJson(chain);
}