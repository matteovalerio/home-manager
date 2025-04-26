"use client";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useCategoriesQuery } from "@/modules/categories/queries/categories.queries";
import { CategoryRead } from "@/modules/categories/schemas/category-read";
import { useUsersQuery } from "@/modules/users/queries/user.queries";
import { UserRead } from "@/modules/users/schemas/user-read";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RevenueUpsertSubform } from "./revenue-upsert.subform";
import { useRevenueQuery } from "../queries/revenues.queries";
import { RevenueRead } from "../schemas/revenue-read";
import {
  RevenueUpsert,
  revenueUpsertSchema,
} from "../schemas/revenue-upsert-schema";
import { useRevenueUpdateMutation } from "../mutations/revenues.mutations";

type Props = {
  id: number;
  onDone?: () => void;
};

export function RevenueUpdate(props: Props) {
  const query = useRevenueQuery(props.id);
  const categoriesQuery = useCategoriesQuery();
  const usersQuery = useUsersQuery();

  if (!query.data || !categoriesQuery.data || !usersQuery.data) {
    return <>Caricamento...</>;
  }

  return (
    <InternalForm
      revenue={query.data}
      categories={categoriesQuery.data}
      users={usersQuery.data}
      onDone={props.onDone}
    />
  );
}

function InternalForm(props: {
  revenue: RevenueRead;
  categories: CategoryRead[];
  users: UserRead[];
  onDone?: () => void;
}) {
  const form = useForm<RevenueUpsert>({
    resolver: zodResolver(revenueUpsertSchema),
    defaultValues: {
      name: props.revenue.name,
      receivedAt: props.revenue.receivedAt,
      amount: props.revenue.amount,
      categoryId: props.revenue.category.id,
      receiverUserId: props.revenue.receiver.id,
    },
  });

  const mutation = useRevenueUpdateMutation();

  function onValidSubmit(data: RevenueUpsert) {
    const payload = {
      ...data,
      id: props.revenue.id,
    };
    mutation.mutate(payload, {
      onSuccess: () => {
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
        <RevenueUpsertSubform
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
