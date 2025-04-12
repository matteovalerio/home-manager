"use client";

import { UseFormReturn } from "react-hook-form";
import { UserUpsert } from "../schemas/user-upsert.schema";
import { FInput } from "@/components/f-input";

type Props = {
  form: UseFormReturn<UserUpsert>;
};

export function UserUpsertSubform(props: Props) {
  return (
    <>
      <FInput control={props.form.control} name="name" label="Nome" />
    </>
  );
}
