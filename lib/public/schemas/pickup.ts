import { z } from "zod";

// Схема для Pickup
export const pickupSchema = z
  .object({
    type: z.union([z.literal("humbucker"), z.literal("single")]),
    tone: z.union([
      z.literal(1),
      z.literal(2),
      z.literal(3),
      z.literal(4),
      z.literal(5),
      z.literal(6),
      z.literal(7),
      z.literal(8),
      z.literal(9),
      z.literal(10),
    ]),
    position: z.union([
      z.literal("neck"),
      z.literal("bridge"),
      z.literal("middle"),
    ]),
  })
  .strict();

// Тип для валидированного Pickup
export type ValidatedPickup = z.infer<typeof pickupSchema>;

// Функция для валидации Pickup
export function validatePickup(pickup: unknown): ValidatedPickup {
  return pickupSchema.parse(pickup);
}
