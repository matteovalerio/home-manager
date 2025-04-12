import * as z from "zod";

export const userUpsertSchema = z.object({
  name: z.string().nonempty(),
});

export type UserUpsert = z.infer<typeof userUpsertSchema>;
