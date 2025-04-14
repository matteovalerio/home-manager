"use client";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUserCreateMutation } from "../mutations/user.mutations";
import { UserUpsert, userUpsertSchema } from "../schemas/user-upsert.schema";
import { UserUpsertSubform } from "./user-upsert-subform";

type Props = {
  onDone?: () => void;
};

export function UserCreate(props: Props) {
  const form = useForm<UserUpsert>({
    resolver: zodResolver(userUpsertSchema),
    defaultValues: {
      name: "",
    },
  });

  const mutation = useUserCreateMutation();

  function onValidSubmit(data: UserUpsert) {
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
        className="flex flex-col gap-4 px-4"
      >
        <UserUpsertSubform form={form} />

        {mutation.isError && (
          <Alert variant={"destructive"}>
            {"Ops..qualcosa è andato storto"}
          </Alert>
        )}

        <div className="mt-4" />
        <Button type="submit" disabled={mutation.isPending}>
          Salva
        </Button>
      </form>
    </Form>
  );
}
