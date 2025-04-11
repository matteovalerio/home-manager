"use client"

import {useQuery} from "@tanstack/react-query";
import {categoriesGetAll} from "@/modules/categories/server/categories.actions";

export const categoriesQueryKey = "categories";

export function useCategoriesQuery(){
    return useQuery({
        queryFn: categoriesGetAll,
        queryKey: [categoriesQueryKey, "all"]
    })
}