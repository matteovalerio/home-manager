import { CategoryRead } from "@/modules/categories/schemas/category-read";

export type ExpenseRead = {
  id: number;
  name: string;
  amount: number;
  paidAt: Date;
  category: CategoryRead;
};
