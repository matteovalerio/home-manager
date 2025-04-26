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

export const expensesDestinataries = pgTable("expenses_destinataries", {
  id: pk(),
  expenseId: integer()
    .notNull()
    .references(() => expenses.id),
  userId: integer()
    .notNull()
    .references(() => users.id),
});

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
  receiverUserId: integer()
    .notNull()
    .references(() => users.id),
  //
  receivedAt: timestamp().notNull().defaultNow(),
});
