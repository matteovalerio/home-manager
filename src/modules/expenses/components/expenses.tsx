"use client";

import { Icon } from "@/components/icon";
import { Badge } from "@/components/ui/badge";
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
import { useState } from "react";
import {
  useExpensesPaginatedQuery,
  useExpensesQuery,
} from "../queries/expenses.queries";
import { ExpenseCreate } from "./expense-create";
import { paginationUtils } from "@/modules/pagination/utils/pagination.utils";
import { Pagination } from "@/modules/pagination/components/pagination";
import { Calendar } from "@/components/ui/calendar";
import { ExpenseUpdate } from "./expense-update";

export function Expenses() {
  const [page, setPage] = useState(paginationUtils.default.page);
  const [pageSize, setPageSize] = useState(paginationUtils.default.pageSize);
  const query = useExpensesPaginatedQuery({
    page,
    pageSize,
  });

  if (!query.data) {
    return <>Loading</>;
  }

  return (
    <div className="flex flex-col gap-4">
      <InternalHeader />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Categoria</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Pagato da</TableHead>
            <TableHead>Destinatari</TableHead>
            <TableHead>Data pagamento</TableHead>
            <TableHead className="text-right">Importo</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {query.data.items.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell>
                <Badge>{expense.category.name}</Badge>
              </TableCell>
              <TableCell>{expense.name}</TableCell>
              <TableCell>
                <Badge className="mr-2" variant={"outline"}>
                  {expense.payer.name}
                </Badge>
              </TableCell>
              <TableCell>
                {expense.chargedUsers.map((user) => (
                  <Badge key={user.id} className="mr-2" variant={"outline"}>
                    {user.name}
                  </Badge>
                ))}
              </TableCell>
              <TableCell>
                <div>{fns.formatDate(expense.paidAt, "dd-MM-yyyy")}</div>
              </TableCell>
              <TableCell className="font-mono text-right">
                {`${expense.amount} €`}
              </TableCell>
              <TableCell className="text-right">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant={"secondary"} size={"icon"}>
                      <Icon icon="edit" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="px-2">
                    <SheetHeader>
                      <SheetTitle className="text-xl">{"Spesa"}</SheetTitle>
                    </SheetHeader>
                    <ExpenseUpdate id={expense.id} />
                  </SheetContent>
                </Sheet>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        onPageChange={setPage}
        page={page}
        pageSize={pageSize}
        totalItems={query.data.totalItems}
      />
    </div>
  );
}

function InternalHeader(props: {}) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <div className="flex gap-4 items-center">
      <div className="text-xl font-semibold">Spese</div>
      <div className="ml-auto" />
      <Button
        variant={"outline"}
        className="shrink-0"
        type="button"
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
  );
}
