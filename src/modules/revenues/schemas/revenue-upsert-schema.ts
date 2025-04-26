import { toNumber } from "@/app/utils/zod-helpers";
import * as z from "zod";

export const revenueUpsertSchema = z.object({
  name: z.string().nonempty("Richiesto"),
  amount: toNumber(
    z
      .number({ required_error: "Importo richiesto" })
      .positive("Importo positivo")
  ),
  receivedAt: z.date(),
  categoryId: toNumber(z.number()),
  receiverUserId: toNumber(z.number()),
});

export type RevenueUpsert = z.infer<typeof revenueUpsertSchema>;
