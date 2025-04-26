"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { revenuesQueryKey } from "../queries/revenues.queries";
import { revenueCreate, revenueUpdate } from "../server/revenues.actions";

export function useRevenueCreateMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: revenueCreate,
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: [revenuesQueryKey] });
    },
  });
}

export function useRevenueUpdateMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: revenueUpdate,
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: [revenuesQueryKey] });
    },
  });
}
