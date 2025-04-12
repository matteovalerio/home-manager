"use client";

import { FInput } from "@/components/f-input";
import { FSelect } from "@/components/f-select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CategoryRead } from "@/modules/categories/schemas/category-read";
import * as fns from "date-fns";
import { CalendarIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { ExpenseUpsert } from "../schemas/expense-upsert-schema";
import { UserRead } from "@/modules/users/schemas/user-read";

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

      <FormField
        control={props.form.control}
        name="paidAt"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Data pagamento</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      fns.format(field.value, "dd-MM-yyyy")
                    ) : (
                      <span>Seleziona una data</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />

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
    </>
  );
}
