"use client";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUserUpdateMutation } from "../mutations/user.mutations";
import { UserRead } from "../schemas/user-read";
import { UserUpsert, userUpsertSchema } from "../schemas/user-upsert.schema";
import { UserUpsertSubform } from "./user-upsert-subform";

type Props = {
  onDone?: () => void;
  defaultValues: UserRead;
};

export function UserUpdate(props: Props) {
  const form = useForm<UserUpsert>({
    resolver: zodResolver(userUpsertSchema),
    defaultValues: {
      name: props.defaultValues.name,
    },
  });

  const mutation = useUserUpdateMutation();

  function onValidSubmit(data: UserUpsert) {
    const payload = {
      ...data,
      id: props.defaultValues.id,
    };

    mutation.mutate(payload, {
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
