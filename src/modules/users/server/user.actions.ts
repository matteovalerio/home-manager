"use server";

import { users } from "@/db/schema";
import { UserUpsert } from "../schemas/user-upsert.schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";

export async function userCreate(dto: UserUpsert) {
  await db.insert(users).values({
    name: dto.name,
  });
}
export async function userUpdate(dto: UserUpsert & { id: number }) {
  await db
    .update(users)
    .set({
      name: dto.name,
    })
    .where(eq(users.id, dto.id));
}

// TODO add pagination
export async function usersGetAll() {
  return await db.select().from(users).orderBy(users.name);
}
