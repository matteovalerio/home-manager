import { toNumber } from "@/app/utils/zod-helpers";
import * as z from "zod";

export const expenseUpsertSchema = z.object({
  name: z.string().nonempty("Richiesto"),
  amount: z.preprocess((value) => {
    if (typeof value === "string" && value.trim() !== "") {
      const parsed = Number.parseFloat(value);
      return isNaN(parsed) ? undefined : parsed;
    }
    if (typeof value === "number") {
      return value;
    }
    return undefined;
  }, z.number({ required_error: "Importo richiesto" }).positive("Importo positivo")) as z.ZodEffects<
    z.ZodNumber,
    number,
    number
  >,
  paidAt: z.date(),
  categoryId: toNumber(z.number()) as z.ZodEffects<z.ZodNumber, number, number>,
});

export type ExpenseUpsert = z.infer<typeof expenseUpsertSchema>;
