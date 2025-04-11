"use client"

import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import React from "react";

export function QueryProvider(props: {
    children: React.ReactNode;
}) {
    const queryClient = getQueryClient();

    return <QueryClientProvider client={queryClient}>
        {props.children}
    </QueryClientProvider>
}

let queryClient: QueryClient | null = null;

function getQueryClient() {
    if (typeof window === "undefined") {
        queryClient = new QueryClient({
            defaultOptions: {
                queries: {
                    retry: 1,
                    staleTime: 60 * 1000
                }
            }
        })
    }

    if (!queryClient) {
        queryClient = new QueryClient({
            defaultOptions: {
                queries: {
                    retry: 1,
                    staleTime: 60 * 1000
                }
            }
        })
    }

    return queryClient;
}