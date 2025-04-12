"use client";

import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import * as fns from "date-fns";
import { useExpensesQuery } from "../queries/expenses.queries";
import { ExpenseCreate } from "./expense-create";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export function Expenses() {
  const query = useExpensesQuery();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  if (!query.data) {
    return <>Loading</>;
  }

  return (
    <>
      <div className="flex gap-4 items-center">
        <div className="text-xl font-semibold">Spese</div>
        <div className="ml-auto" />
        <Button
          variant={"outline"}
          className="shrink-0"
          onClick={() => setIsSheetOpen(true)}
        >
          <Icon icon="add" />
        </Button>
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetContent className="px-2">
            <SheetHeader>
              <SheetTitle className="text-xl">{"Spesa"}</SheetTitle>
            </SheetHeader>
            <ExpenseCreate onDone={() => setIsSheetOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Data pagamento</TableHead>
            <TableHead className="text-right">€</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {query.data.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell>{expense.name}</TableCell>
              <TableCell>
                <Badge>{expense.category.name}</Badge>
              </TableCell>
              <TableCell>
                <div>{fns.formatDate(expense.paidAt, "dd-MM-yyyy")}</div>
              </TableCell>
              <TableCell className="font-mono text-right">
                {expense.amount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
