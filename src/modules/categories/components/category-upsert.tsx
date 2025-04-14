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
import { FInput } from "@/components/f-input";
import { FSwitch } from "@/components/f-switch";

type Props = {
  onDone?: () => void;
  defaultValues?: CategoryRead | null;
};

export function CategoryUpsert(props: Props) {
  const form = useForm<Upsert>({
    resolver: zodResolver(categoryUpsertSchema),
    defaultValues: {
      name: props.defaultValues?.name ?? "",
      isKindExpense: props.defaultValues?.isKindExpense ?? true,
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
        <FInput
          control={form.control}
          name="name"
          placeholder="nome"
          label="Nome"
        />
        <FSwitch control={form.control} name="isKindExpense" label="Uscita" />
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
