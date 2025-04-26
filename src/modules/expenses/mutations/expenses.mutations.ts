"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { expensesQueryKey } from "../queries/expenses.queries";
import { expenseCreate, expenseUpdate } from "../server/expenses.actions";

export function useExpenseCreateMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: expenseCreate,
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: [expensesQueryKey] });
    },
  });
}

export function useExpenseUpdateMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: expenseUpdate,
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: [expensesQueryKey] });
    },
  });
}
