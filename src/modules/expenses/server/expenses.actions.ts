"use server";

import { db } from "@/db";
import {
  categories,
  expenses,
  expensesDestinataries,
  users,
} from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { ExpenseUpsert } from "../schemas/expense-upsert-schema";
import { Paginate } from "@/modules/pagination/schemas/paginate";
import { paginationUtils } from "@/modules/pagination/utils/pagination.utils";
import { ExpenseRead } from "../schemas/expense-read";

export async function expensesGetAll() {
  return await db.select().from(expenses).orderBy(desc(expenses.paidAt));
}

export async function expenseCreate(dto: ExpenseUpsert) {
  await db.transaction(async (tx) => {
    const res = await tx
      .insert(expenses)
      .values({
        name: dto.name,
        amount: dto.amount,
        paidAt: dto.paidAt,
        categoryId: dto.categoryId,
        payerUserId: dto.payerUserId,
      })
      .returning({ id: expenses.id });
    await tx.insert(expensesDestinataries).values(
      dto.chargedUserIds.map((e) => ({
        expenseId: res[0].id,
        userId: e,
      }))
    );
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
      payer: users,
    })
    .from(expenses)
    .innerJoin(categories, eq(categories.id, expenses.categoryId))
    .innerJoin(users, eq(users.id, expenses.payerUserId))
    .limit(limit)
    .offset(offset)
    .orderBy(desc(expenses.paidAt));

  const dtos: ExpenseRead[] = [];
  for (const expense of res) {
    const destinataries = await db
      .select({
        id: expensesDestinataries.userId,
        name: users.name,
      })
      .from(expensesDestinataries)
      .innerJoin(users, eq(users.id, expensesDestinataries.userId))
      .where(eq(expensesDestinataries.expenseId, expense.id));
    dtos.push({
      ...expense,
      chargedUsers: destinataries,
    });
  }

  return paginationUtils.toPaginated(dtos, totalItemsRes.length);
}

export async function expenseGetOne(id: number) {
  const res = await db
    .select({
      id: expenses.id,
      name: expenses.name,
      amount: expenses.amount,
      paidAt: expenses.paidAt,
      payer: users,
      category: categories,
    })
    .from(expenses)
    .innerJoin(users, eq(users.id, expenses.payerUserId))
    .innerJoin(categories, eq(categories.id, expenses.categoryId))
    .where(eq(expenses.id, id));

  if (res.length === 0) {
    throw new Error("Expense not found");
  }

  const expense = res[0];

  const destinataries = await db
    .select({
      id: expensesDestinataries.userId,
      name: users.name,
    })
    .from(expensesDestinataries)
    .innerJoin(users, eq(users.id, expensesDestinataries.userId))
    .where(eq(expensesDestinataries.expenseId, expense.id));

  return {
    ...expense,
    chargedUsers: destinataries,
  };
}

export async function expenseUpdate(dto: ExpenseUpsert & { id: number }) {
  await db
    .update(expenses)
    .set({
      name: dto.name,
      amount: dto.amount,
      paidAt: dto.paidAt,
      categoryId: dto.categoryId,
      payerUserId: dto.payerUserId,
    })
    .where(eq(expenses.id, dto.id));
}
