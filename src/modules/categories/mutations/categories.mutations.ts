"use client"

import {useQueryClient, useMutation} from "@tanstack/react-query";
import {categoriesQueryKey} from "@/modules/categories/queries/categories.queries";
import {categoryCreate, categoryUpdate} from "@/modules/categories/server/categories.actions";

export function useCategoryCreateMutation(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: categoryCreate,
        async onSuccess(){
            await queryClient.invalidateQueries({
                queryKey: [categoriesQueryKey]
            })
        }
    })
}

export function useCategoryUpdateMutation(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: categoryUpdate,
        async onSuccess(){
            await queryClient.invalidateQueries({
                queryKey: [categoriesQueryKey]
            })
        }
    })
}