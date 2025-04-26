"use client";

import { Alert } from "@/components/ui/alert";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useExpenseUpdateMutation } from "../mutations/expenses.mutations";
import { useExpenseQuery } from "../queries/expenses.queries";
import { ExpenseRead } from "../schemas/expense-read";
import {
  ExpenseUpsert,
  expenseUpsertSchema,
} from "../schemas/expense-upsert-schema";
import { ExpenseUpsertSubform } from "./expense-upsert-subform";
import { useCategoriesQuery } from "@/modules/categories/queries/categories.queries";
import { useUsersQuery } from "@/modules/users/queries/user.queries";
import { CategoryRead } from "@/modules/categories/schemas/category-read";
import { UserRead } from "@/modules/users/schemas/user-read";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

type Props = {
  id: number;
};

export function ExpenseUpdate(props: Props) {
  const query = useExpenseQuery(props.id);
  const categoriesQuery = useCategoriesQuery();
  const usersQuery = useUsersQuery();

  if (!query.data || !categoriesQuery.data || !usersQuery.data) {
    return <>Caricamento...</>;
  }

  return (
    <InternalForm
      expense={query.data}
      categories={categoriesQuery.data}
      users={usersQuery.data}
    />
  );
}

function InternalForm(props: {
  expense: ExpenseRead;
  categories: CategoryRead[];
  users: UserRead[];
}) {
  const form = useForm<ExpenseUpsert>({
    resolver: zodResolver(expenseUpsertSchema),
    defaultValues: {
      name: props.expense.name,
      paidAt: props.expense.paidAt,
      amount: props.expense.amount,
      categoryId: props.expense.category.id,
      payerUserId: props.expense.payer.id,
      chargedUserIds: props.expense.chargedUsers.map((e) => e.id),
    },
  });

  const mutation = useExpenseUpdateMutation();

  function onValidSubmit(data: ExpenseUpsert) {
    const payload = {
      ...data,
      id: props.expense.id,
    };
    mutation.mutate(payload);
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
