"use server"

import {db} from "@/db";
import {categories} from "@/db/schema";
import {CategoryUpsert} from "@/modules/categories/schemas/category-upsert.schema";
import {eq} from "drizzle-orm";

export async function categoriesGetAll() {
    return await db.select().from(categories).orderBy(categories.name);
}

export async function categoryCreate(dto: CategoryUpsert) {
    await db.insert(categories).values({
        name: dto.name,
    })
}

export async function categoryUpdate(dto: CategoryUpsert & { id: number }) {
    await db.update(categories).set({
        name: dto.name,
    }).where(eq(categories.id, dto.id))
}