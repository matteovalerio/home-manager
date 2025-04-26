"use client";

import { FDatePicker } from "@/components/f-date-picker";
import { FInput } from "@/components/f-input";
import { FSelect } from "@/components/f-select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CategoryRead } from "@/modules/categories/schemas/category-read";
import { UserRead } from "@/modules/users/schemas/user-read";
import { UseFormReturn, useWatch } from "react-hook-form";
import { ExpenseUpsert } from "../schemas/expense-upsert-schema";
import { Checkbox } from "@/components/ui/checkbox";

type Props = {
  onDone?: () => void;
  form: UseFormReturn<ExpenseUpsert>;
  categories: CategoryRead[];
  users: UserRead[];
};

export function ExpenseUpsertSubform(props: Props) {
  return (
    <>
      <FInput control={props.form.control} label="Nome" name="name" />
      <FInput
        control={props.form.control}
        label="Importo"
        name="amount"
        type="number"
      />

      <FDatePicker name="paidAt" control={props.form.control} label="Data" />

      <FSelect
        name="categoryId"
        label="Categoria"
        placeholder="Seleziona una categoria"
        control={props.form.control}
        options={props.categories.map((e) => ({
          label: e.name,
          value: e.id.toString(),
        }))}
      />

      <FSelect
        name="payerUserId"
        label="Pagante"
        placeholder="Seleziona un utente"
        control={props.form.control}
        options={props.users.map((e) => ({
          label: e.name,
          value: e.id.toString(),
        }))}
      />

      <FormField
        control={props.form.control}
        name="chargedUserIds"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-semibold">
              Destinatari spesa
            </FormLabel>

            <FormControl>
              <div className="flex flex-col gap-2">
                {props.users.map((user) => {
                  const id = user.id;
                  const checked = field.value.includes(id);

                  return (
                    <label
                      key={id}
                      className="inline-flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        value={id}
                        checked={checked}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          if (e.target.checked) {
                            field.onChange([...field.value, val]);
                          } else {
                            field.onChange(
                              field.value.filter((x) => x !== val)
                            );
                          }
                        }}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <span>{user.name}</span>
                    </label>
                  );
                })}
              </div>
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
