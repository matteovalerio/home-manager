import { toNumber } from "@/app/utils/zod-helpers";
import * as z from "zod";

export const expenseUpsertSchema = z.object({
  name: z.string().nonempty("Richiesto"),
  amount: toNumber(
    z
      .number({ required_error: "Importo richiesto" })
      .positive("Importo positivo")
  ),
  paidAt: z.date(),
  categoryId: toNumber(z.number()),
  payerUserId: toNumber(z.number()),
});

export type ExpenseUpsert = z.infer<typeof expenseUpsertSchema>;
