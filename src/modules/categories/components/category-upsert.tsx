"use client";

import { useForm } from "react-hook-form";
import {
  categoryUpsertSchema,
  CategoryUpsert as Upsert,
} from "@/modules/categories/schemas/category-upsert.schema";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  useCategoryCreateMutation,
  useCategoryUpdateMutation,
} from "@/modules/categories/mutations/categories.mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { CategoryRead } from "@/modules/categories/schemas/category-read";

type Props = {
  onDone?: () => void;
  defaultValues?: CategoryRead | null;
};

export function CategoryUpsert(props: Props) {
  const form = useForm<Upsert>({
    resolver: zodResolver(categoryUpsertSchema),
    defaultValues: {
      name: props.defaultValues?.name ?? "",
    },
  });

  const createMutation = useCategoryCreateMutation();
  const updateMutation = useCategoryUpdateMutation();

  function onValidSubmit(data: Upsert) {
    if (!props.defaultValues) {
      createMutation.mutate(data, {
        onSuccess() {
          props.onDone?.();
        },
      });
    } else {
      const payload = {
        ...data,
        id: props.defaultValues.id,
      };
      updateMutation.mutate(payload, {
        onSuccess() {
          props.onDone?.();
        },
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onValidSubmit)}
        className="flex flex-col gap-4 px-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="mt-4"
          type="submit"
          disabled={createMutation.isPending || updateMutation.isPending}
        >
          Salva
        </Button>
      </form>
    </Form>
  );
}
