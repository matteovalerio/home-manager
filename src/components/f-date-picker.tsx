"use client";

import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { Button } from "./ui/button";
import { FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type FDatePickerProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = {
  control: Control<TFieldValues>;
  name: TName;
  label: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
};

export function FDatePicker<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>(props: FDatePickerProps<TFieldValues, TName>) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-semibold">{props.label}</FormLabel>
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
                    format(field.value, "dd-MM-yyyy")
                  ) : (
                    <span>Seleziona una data</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                autoFocus
              />
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  );
}
