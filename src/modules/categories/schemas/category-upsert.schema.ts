import * as z from "zod";

export const categoryUpsertSchema = z.object({
  name: z.string().nonempty("Richiesto"),
  isKindExpense: z.boolean(),
});

export type CategoryUpsert = z.infer<typeof categoryUpsertSchema>;
