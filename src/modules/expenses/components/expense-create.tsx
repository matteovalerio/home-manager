"use client";

import { useForm } from "react-hook-form";
import {
  ExpenseUpsert,
  expenseUpsertSchema,
} from "../schemas/expense-upsert-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExpenseUpsertSubform } from "./expense-upsert-subform";
import { Button } from "@/components/ui/button";
import { useExpenseCreateMutation } from "../mutations/expenses.mutations";
import { Form } from "@/components/ui/form";
import { Alert } from "@/components/ui/alert";
import { useCategoriesQuery } from "@/modules/categories/queries/categories.queries";
import { CategoryRead } from "@/modules/categories/schemas/category-read";

type Props = {
  onDone?: () => void;
};

export function ExpenseCreate(props: Props) {
  const { data: categories } = useCategoriesQuery();

  if (!categories) {
    return <div>Loading...</div>;
  }

  return <InternalForm categories={categories} {...props} />;
}

function InternalForm(props: {
  categories: CategoryRead[];
  onDone?: () => void;
}) {
  const form = useForm<ExpenseUpsert>({
    resolver: zodResolver(expenseUpsertSchema),
    defaultValues: {
      name: "",
      paidAt: new Date(),
      amount: 0.0,
      categoryId: -1,
    },
  });

  const mutation = useExpenseCreateMutation();

  function onValidSubmit(data: ExpenseUpsert) {
    mutation.mutate(data, {
      onSuccess() {
        props.onDone?.();
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onValidSubmit)}
        className="flex flex-col gap-4"
      >
        <ExpenseUpsertSubform form={form} categories={props.categories} />

        {mutation.isError && (
          <Alert variant={"destructive"}>
            {"Ops..qualcosa è andato storto"}
          </Alert>
        )}

        <div className="mt-4" />

        <Button disabled={mutation.isPending} type="submit">
          Salva
        </Button>
      </form>
    </Form>
  );
}
