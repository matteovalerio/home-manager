import * as z from "zod";

export const paginateSchema = z.object({
  page: z.number().positive(),
  pageSize: z.number().positive(),
});

export type Paginate = z.infer<typeof paginateSchema>;
