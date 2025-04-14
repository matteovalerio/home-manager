import { Paginated } from "../schemas/paginated";

export const paginationUtils = {
  pageSizes: [10, 20, 50],
  default: {
    page: 0,
    pageSize: 10,
  },
  toPaginated<T>(items: T, totalItems: number): Paginated<T> {
    return {
      items,
      totalItems,
    };
  },
};
