import { z } from 'zod';
import { AMP_TYPES, EFX_TYPES, COMP_TYPES, MOD_TYPES, DELAY_TYPES, REVERB_TYPES, CABINET_TYPES } from './encoder';

const num0100 = z.number().min(0).max(100);
const boolOpt = z.boolean().optional();

export const NoiseGateSchema = z
  .object({ enabled: boolOpt, sensitivity: num0100, decay: num0100 })
  .partial({ sensitivity: true, decay: true });

export const CompSchema = z
  .object({ enabled: boolOpt, type: z.enum(Object.keys(COMP_TYPES) as [string, ...string[]]), sustain: num0100, level: num0100, attack: num0100, blend: num0100 })
  .partial({ sustain: true, level: true, attack: true, blend: true });

export const EfxSchema = z
  .object({ enabled: boolOpt, type: z.enum(Object.keys(EFX_TYPES) as [string, ...string[]]), var1: num0100, var2: num0100, var3: num0100, var4: num0100, var5: num0100, var6: num0100 })
  .partial({ var1: true, var2: true, var3: true, var4: true, var5: true, var6: true });

export const AmpSchema = z
  .object({ enabled: boolOpt, type: z.enum(Object.keys(AMP_TYPES) as [string, ...string[]]), gain: num0100, master: num0100, bass: num0100, mid: num0100, treble: num0100, bright: num0100 })
  .partial({ gain: true, master: true, bass: true, mid: true, treble: true, bright: true });

export const CabSchema = z
  .object({ enabled: boolOpt, type: z.enum(Object.keys(CABINET_TYPES) as [string, ...string[]]), level: num0100, lowcut: num0100, hicut: num0100 })
  .partial({ level: true, lowcut: true, hicut: true });

export const ModSchema = z
  .object({ enabled: boolOpt, type: z.enum(Object.keys(MOD_TYPES) as [string, ...string[]]), rate: num0100, depth: num0100, mix: num0100 })
  .partial({ rate: true, depth: true, mix: true });

export const DelaySchema = z
  .object({ enabled: boolOpt, type: z.enum(Object.keys(DELAY_TYPES) as [string, ...string[]]), time: num0100, feedback: num0100, mix: num0100 })
  .partial({ time: true, feedback: true, mix: true });

export const ReverbSchema = z
  .object({ enabled: boolOpt, type: z.enum(Object.keys(REVERB_TYPES) as [string, ...string[]]), decay: num0100, tone: num0100, mix: num0100 })
  .partial({ decay: true, tone: true, mix: true });

export const EqSchema = z
  .object({ enabled: boolOpt, type: z.enum(['6-Band', '10-Band', 'Bluetooth EQ', 'Speaker EQ'] as [string, ...string[]]) })
  .catchall(num0100);

export const FlatPresetSchema = z.object({
  product_id: z.number().int().min(1).default(15),
  version: z.number().int().min(1).default(1),
  master: num0100.default(50),
  noise_gate: NoiseGateSchema.optional(),
  comp: CompSchema.optional(),
  efx: EfxSchema.optional(),
  amp: AmpSchema.optional(),
  cab: CabSchema.optional(),
  mod: ModSchema.optional(),
  delay: DelaySchema.optional(),
  reverb: ReverbSchema.optional(),
  eq: EqSchema.optional(),
});

export default FlatPresetSchema;