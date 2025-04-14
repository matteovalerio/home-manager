import {
  boolean,
  doublePrecision,
  foreignKey,
  integer,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

const pk = () => integer().primaryKey().generatedAlwaysAsIdentity();

export const categories = pgTable("categories", {
  id: pk(),
  name: varchar({ length: 255 }).notNull(),
  isKindExpense: boolean().notNull(),
});

export const expenses = pgTable(
  "expenses",
  {
    id: pk(),
    name: varchar({ length: 255 }).notNull(),
    amount: doublePrecision().notNull(),
    categoryId: integer().notNull(),
    payerUserId: integer()
      .notNull()
      .references(() => users.id),
    //
    paidAt: timestamp().notNull().defaultNow(),
  },
  (table) => [
    foreignKey({
      columns: [table.categoryId],
      foreignColumns: [categories.id],
      name: "exp_category_id_fk",
    }),
  ]
);

export const users = pgTable("users", {
  id: pk(),
  name: varchar({ length: 255 }).notNull(),
});

export const revenues = pgTable("revenues", {
  id: pk(),
  name: varchar({ length: 255 }).notNull(),
  amount: doublePrecision().notNull(),
  categoryId: integer()
    .notNull()
    .references(() => categories.id),
  payerUserId: integer()
    .notNull()
    .references(() => users.id),
  //
  paidAt: timestamp().notNull().defaultNow(),
});
