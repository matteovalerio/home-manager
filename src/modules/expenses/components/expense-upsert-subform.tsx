"use client";

import { FInput } from "@/components/f-input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import * as fns from "date-fns";
import { CalendarIcon, Link } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { ExpenseUpsert } from "../schemas/expense-upsert-schema";
import { CategoryRead } from "@/modules/categories/schemas/category-read";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  onDone?: () => void;
  form: UseFormReturn<ExpenseUpsert>;
  categories: CategoryRead[];
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
                      <span>Pick a date</span>
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

      <FormField
        control={props.form.control}
        name="categoryId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Categoria</FormLabel>
            <Select onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona una categoria" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {props.categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
