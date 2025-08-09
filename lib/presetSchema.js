import { z } from 'zod';

export const SlotEnum = z.enum([
  'Noisegate',
  'Compressor',
  'EFX',
  'Amp',
  'IR',
  'EQ',
  'Mod',
  'DLY',
  'RVB',
]);

export const ParamsSchema = z.record(z.string(), z.number());

export const ChainBlockSchema = z.object({
  slot: SlotEnum,
  model: z.string(),
  params: ParamsSchema,
});

export const PresetSchema = z.object({
  name: z.string().optional(),
  notes: z.string().optional(),
  chain: z.array(ChainBlockSchema).min(1),
});

/**
 * @typedef {z.infer<typeof PresetSchema>} PresetJson
 * @typedef {z.infer<typeof ChainBlockSchema>} ChainBlock
 */

export default PresetSchema;