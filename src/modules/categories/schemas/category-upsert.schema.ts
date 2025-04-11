import * as z from "zod";

export const categoryUpsertSchema = z.object({
    name: z.string().nonempty("Valore vuoto")
})

export type CategoryUpsert = z.infer<typeof categoryUpsertSchema>