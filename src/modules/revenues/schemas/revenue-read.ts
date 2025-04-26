import { CategoryRead } from "@/modules/categories/schemas/category-read";
import { UserRead } from "@/modules/users/schemas/user-read";

export type RevenueRead = {
  id: number;
  name: string;
  amount: number;
  receivedAt: Date;
  category: CategoryRead;
  receiver: UserRead;
};
