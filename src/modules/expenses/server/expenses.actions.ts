"use server";

import { db } from "@/db";
import { categories, expenses } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { ExpenseUpsert } from "../schemas/expense-upsert-schema";

// TODO add pagination
export async function expensesGetAll() {
  return await db
    .select({
      id: expenses.id,
      name: expenses.name,
      amount: expenses.amount,
      paidAt: expenses.paidAt,
      category: categories,
    })
    .from(expenses)
    .innerJoin(categories, eq(categories.id, expenses.categoryId))
    .orderBy(desc(expenses.paidAt));
}

export async function expenseCreate(dto: ExpenseUpsert) {
  await db.insert(expenses).values({
    name: dto.name,
    amount: dto.amount,
    paidAt: dto.paidAt,
    categoryId: dto.categoryId,
  });
}
