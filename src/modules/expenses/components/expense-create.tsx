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
import { UserRead } from "@/modules/users/schemas/user-read";
import { useUsersQuery } from "@/modules/users/queries/user.queries";

type Props = {
  onDone?: () => void;
};

export function ExpenseCreate(props: Props) {
  const { data: categories } = useCategoriesQuery();
  const { data: users } = useUsersQuery();

  if (!categories || !users) {
    return <div>Loading...</div>;
  }

  return <InternalForm categories={categories} users={users} {...props} />;
}

function InternalForm(props: {
  categories: CategoryRead[];
  users: UserRead[];
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
        <ExpenseUpsertSubform
          form={form}
          categories={props.categories}
          users={props.users}
        />

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
