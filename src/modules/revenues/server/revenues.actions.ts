"use server";

import { db } from "@/db";
import { categories, revenues, users } from "@/db/schema";
import { Paginate } from "@/modules/pagination/schemas/paginate";
import { paginationUtils } from "@/modules/pagination/utils/pagination.utils";
import { desc, eq } from "drizzle-orm";
import { RevenueUpsert } from "../schemas/revenue-upsert-schema";

export async function revenuesGetAll() {
  return await db.select().from(revenues).orderBy(desc(revenues.receivedAt));
}

export async function revenueCreate(dto: RevenueUpsert) {
  await db.insert(revenues).values({
    name: dto.name,
    amount: dto.amount,
    receiverUserId: dto.receiverUserId,
    categoryId: dto.categoryId,
    receivedAt: dto.receivedAt,
  });
}

export async function revenuesGetPaginated(dto: Paginate) {
  const limit = dto.pageSize;
  const offset = dto.page * dto.pageSize;

  const totalItemsRes = await db.select({ id: revenues.id }).from(revenues);

  const res = await db
    .select({
      id: revenues.id,
      name: revenues.name,
      amount: revenues.amount,
      receivedAt: revenues.receivedAt,
      category: categories,
      receiver: users,
    })
    .from(revenues)
    .innerJoin(categories, eq(categories.id, revenues.categoryId))
    .innerJoin(users, eq(users.id, revenues.receiverUserId))
    .limit(limit)
    .offset(offset)
    .orderBy(desc(revenues.receivedAt));

  return paginationUtils.toPaginated(res, totalItemsRes.length);
}

export async function revenueGetOne(id: number) {
  const res = await db
    .select({
      id: revenues.id,
      name: revenues.name,
      amount: revenues.amount,
      receivedAt: revenues.receivedAt,
      receiver: users,
      category: categories,
    })
    .from(revenues)
    .innerJoin(users, eq(users.id, revenues.receiverUserId))
    .innerJoin(categories, eq(categories.id, revenues.categoryId))
    .where(eq(revenues.id, id));

  if (res.length === 0) {
    throw new Error("revenue not found");
  }

  return res[0];
}

export async function revenueUpdate(dto: RevenueUpsert & { id: number }) {
  await db
    .update(revenues)
    .set({
      name: dto.name,
      amount: dto.amount,
      receivedAt: dto.receivedAt,
      categoryId: dto.categoryId,
      receiverUserId: dto.receiverUserId,
    })
    .where(eq(revenues.id, dto.id));
}
