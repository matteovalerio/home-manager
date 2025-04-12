// zod-helpers.ts

import { z } from "zod";

/**
 * Trasforma stringhe (es. da input text/number) in numeri,
 * scartando input vuoti o invalidi come NaN.
 */
export const toNumber = (
  schema: z.ZodNumber = z.number()
): z.ZodEffects<z.ZodTypeAny, number, unknown> =>
  z.preprocess((val) => {
    if (typeof val === "string" && val.trim() !== "") {
      const parsed = Number(val);
      return isNaN(parsed) ? undefined : parsed;
    }
    return val;
  }, schema);
