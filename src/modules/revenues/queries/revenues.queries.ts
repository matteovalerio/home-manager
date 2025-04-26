"use client";

import { useQuery } from "@tanstack/react-query";

import { Paginate } from "@/modules/pagination/schemas/paginate";
import {
  revenuesGetAll,
  revenuesGetPaginated,
  revenueGetOne,
} from "../server/revenues.actions";

export const revenuesQueryKey = "revenues";

export function useRevenuesQuery() {
  return useQuery({
    queryKey: [revenuesQueryKey, "all"],
    queryFn: revenuesGetAll,
  });
}

export function useRevenuesPaginatedQuery(paginate: Paginate) {
  return useQuery({
    queryKey: [revenuesQueryKey, "paginated", paginate.page, paginate.pageSize],
    queryFn: () => revenuesGetPaginated(paginate),
  });
}

export function useRevenueQuery(id: number) {
  return useQuery({
    queryKey: [revenuesQueryKey, "by-id", id],
    queryFn: () => revenueGetOne(id),
  });
}
