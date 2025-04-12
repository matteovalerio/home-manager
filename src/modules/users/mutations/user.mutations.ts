"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userCreate, userUpdate } from "../server/user.actions";
import { usersQueryKey } from "../queries/user.queries";

export function useUserCreateMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userCreate,
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: [usersQueryKey],
      });
    },
  });
}

export function useUserUpdateMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userUpdate,
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: [usersQueryKey],
      });
    },
  });
}
