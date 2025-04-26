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
import { useRevenueCreateMutation } from "../mutations/revenues.mutations";
import {
  RevenueUpsert,
  revenueUpsertSchema,
} from "../schemas/revenue-upsert-schema";

type Props = {
  onDone?: () => void;
};

export function RevenueCreate(props: Props) {
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
  const form = useForm<RevenueUpsert>({
    resolver: zodResolver(revenueUpsertSchema),
    defaultValues: {
      name: "",
      receivedAt: new Date(),
      amount: 0.0,
    },
  });

  const mutation = useRevenueCreateMutation();

  function onValidSubmit(data: RevenueUpsert) {
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
