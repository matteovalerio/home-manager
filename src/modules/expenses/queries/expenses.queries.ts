"use client";

import { useQuery } from "@tanstack/react-query";
import { expensesGetAll } from "../server/expenses.actions";

export const expensesQueryKey = "expenses";

export function useExpensesQuery() {
  return useQuery({
    queryKey: [expensesQueryKey, "all"],
    queryFn: expensesGetAll,
  });
}
