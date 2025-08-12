// Минимальный файл для обратной совместимости с тестами
// Экспортируем константы и функции из нового API

import { 
  flatPresetToQrString, 
  qrStringToFlatPreset 
} from './core/adapter-for-tests';

// Экспортируем константы типов для тестов
export const AMP_TYPES = { 'Jazz Clean': 1, 'Deluxe Rvb': 2, 'Bass Mate': 3, 'Tweedy': 4, 'Hiwire': 6, 'Cali Crunch': 7, 'Class A15': 8, 'Class A30': 9, 'Plexi 100': 10, 'Plexi 45': 11, 'Brit 800': 12, '1987 X 50': 13, 'SLO 100': 14, 'Fireman HBE': 15, 'Dual Rect': 16, 'Die VH4': 17, 'Mr. Z38': 20, 'Super Rvb': 21, AGL: 26, MLD: 27, 'Optima Air': 28, Stageman: 29, 'Twin Reverb': 5, 'Vibro King': 18, Budda: 19, 'Brit Blues': 22, 'Match D30': 23, 'Brit 2000': 24, 'Uber HiGain': 25 };
export const EFX_TYPES = { 'Distortion+': 1, 'RC Boost': 2, 'AC Boost': 3, 'Dist One': 4, 'T Screamer': 5, 'Blues Drive': 6, 'Morning Drive': 7, 'Eat Dist': 8, 'Red Dirt': 9, Crunch: 10, 'Muff Fuzz': 11, Katana: 12, 'ST Singer': 13, 'Touch Wah': 14 };
export const COMP_TYPES = { 'Rose Comp': 1, 'K Comp': 2, 'Studio Comp': 3 };
export const MOD_TYPES = { 'CE-1': 1, 'CE-2': 2, 'ST Chorus': 3, Vibrato: 4, Detune: 5, Flanger: 6, 'Phase 90': 7, 'Phase 100': 8, 'S.C.F.': 9, 'U-Vibe': 10, Tremolo: 11, Rotary: 12, 'SCH-1': 13, 'Mono Octave': 14 };
export const DELAY_TYPES = { 'Analog Delay': 1, 'Digital Delay': 2, 'Mod Delay': 3, 'Tape Echo': 4, 'Pan Delay': 5, 'Phi Delay': 6 };
export const REVERB_TYPES = { Room: 1, Hall: 2, Plate: 3, Spring: 4, Shimmer: 5, Damp: 6 };
export const CABINET_TYPES = { JZ120: 1, DR112: 2, TR212: 3, HIWIRE412: 4, 'CALI 112': 5, A112: 6, GB412: 7, M1960AX: 8, M1960AV: 9, M1960TV: 10, SLO412: 11, 'FIREMAN 412': 12, 'RECT 412': 13, DIE412: 14, MATCH212: 15, UBER412: 16, BS410: 17, A212: 18, M1960AHW: 19, M1936: 20, BUDDA112: 21, Z212: 22, SUPERVERB410: 23, VIBROKING310: 24, AGL_DB810: 25, AMP_SV212: 26, AMP_SV410: 27, AMP_SV810: 28, BASSGUY410: 29, EDEN410: 30, MKB410: 31, 'G-HBIRD': 32, 'G-J15': 33, 'M-D45': 34 };

export { flatPresetToQrString, qrStringToFlatPreset };