"use client";

import { useQuery } from "@tanstack/react-query";
import { usersGetAll } from "../server/user.actions";

export const usersQueryKey = "users";

export function useUsersQuery() {
  return useQuery({
    queryKey: [usersQueryKey, "all"],
    queryFn: usersGetAll,
  });
}
