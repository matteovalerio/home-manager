import { CategoryRead } from "@/modules/categories/schemas/category-read";
import { UserRead } from "@/modules/users/schemas/user-read";

export type ExpenseRead = {
  id: number;
  name: string;
  amount: number;
  paidAt: Date;
  category: CategoryRead;
  payer: UserRead;
  chargedUsers: UserRead[];
};
