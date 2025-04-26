"use client";

import { useQuery } from "@tanstack/react-query";
import {
  expenseGetOne,
  expensesGetAll,
  expensesGetPaginated,
} from "../server/expenses.actions";
import { Paginate } from "@/modules/pagination/schemas/paginate";

export const expensesQueryKey = "expenses";

export function useExpensesQuery() {
  return useQuery({
    queryKey: [expensesQueryKey, "all"],
    queryFn: expensesGetAll,
  });
}

export function useExpensesPaginatedQuery(paginate: Paginate) {
  return useQuery({
    queryKey: [expensesQueryKey, "paginated", paginate.page, paginate.pageSize],
    queryFn: () => expensesGetPaginated(paginate),
  });
}

export function useExpenseQuery(id: number) {
  return useQuery({
    queryKey: [expensesQueryKey, "by-id", id],
    queryFn: () => expenseGetOne(id),
  });
}
