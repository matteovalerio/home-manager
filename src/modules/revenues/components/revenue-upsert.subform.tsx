"use client";

import { FDatePicker } from "@/components/f-date-picker";
import { FInput } from "@/components/f-input";
import { FSelect } from "@/components/f-select";
import { CategoryRead } from "@/modules/categories/schemas/category-read";
import { UserRead } from "@/modules/users/schemas/user-read";
import { UseFormReturn } from "react-hook-form";
import { RevenueUpsert } from "../schemas/revenue-upsert-schema";

type Props = {
  onDone?: () => void;
  form: UseFormReturn<RevenueUpsert>;
  categories: CategoryRead[];
  users: UserRead[];
};

export function RevenueUpsertSubform(props: Props) {
  return (
    <>
      <FInput control={props.form.control} label="Nome" name="name" />
      <FInput
        control={props.form.control}
        label="Importo"
        name="amount"
        type="number"
      />

      <FDatePicker
        name="receivedAt"
        control={props.form.control}
        label="Data"
      />

      <FSelect
        name="categoryId"
        label="Categoria"
        placeholder="Seleziona una categoria"
        control={props.form.control}
        options={props.categories
          .filter((e) => !e.isKindExpense)
          .map((e) => ({
            label: e.name,
            value: e.id.toString(),
          }))}
      />

      <FSelect
        name="receiverUserId"
        label="Beneficiario"
        placeholder="Seleziona un utente"
        control={props.form.control}
        options={props.users.map((e) => ({
          label: e.name,
          value: e.id.toString(),
        }))}
      />
    </>
  );
}
