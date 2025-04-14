"use server";

import { db } from "@/db";
import { categories, expenses } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { ExpenseUpsert } from "../schemas/expense-upsert-schema";
import { Paginate } from "@/modules/pagination/schemas/paginate";
import { paginationUtils } from "@/modules/pagination/utils/pagination.utils";

export async function expensesGetAll() {
  return await db.select().from(expenses).orderBy(desc(expenses.paidAt));
}

export async function expenseCreate(dto: ExpenseUpsert) {
  await db.insert(expenses).values({
    name: dto.name,
    amount: dto.amount,
    paidAt: dto.paidAt,
    categoryId: dto.categoryId,
    payerUserId: dto.payerUserId,
  });
}

export async function expensesGetPaginated(dto: Paginate) {
  const limit = dto.pageSize;
  const offset = dto.page * dto.pageSize;

  const totalItemsRes = await db.select({ id: expenses.id }).from(expenses);

  const res = await db
    .select({
      id: expenses.id,
      name: expenses.name,
      amount: expenses.amount,
      paidAt: expenses.paidAt,
      category: categories,
    })
    .from(expenses)
    .innerJoin(categories, eq(categories.id, expenses.categoryId))
    .limit(limit)
    .offset(offset)
    .orderBy(desc(expenses.paidAt));

  return paginationUtils.toPaginated(res, totalItemsRes.length);
}
