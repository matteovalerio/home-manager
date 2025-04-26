"use client";

import { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Switch } from "./ui/switch";

type Props<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = {
  control: Control<TFieldValues>;
  name: TName;
  label: string;
  type?: React.HTMLInputTypeAttribute;
};

export function FSwitch<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>(props: Props<TFieldValues, TName>) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-semibold">{props.label}</FormLabel>
          <FormControl>
            <Switch
              {...field}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
