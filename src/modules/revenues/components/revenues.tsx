"use client";

import { Icon } from "@/components/icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
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
import { Pagination } from "@/modules/pagination/components/pagination";
import { paginationUtils } from "@/modules/pagination/utils/pagination.utils";
import * as fns from "date-fns";
import { useState } from "react";
import { useRevenuesPaginatedQuery } from "../queries/revenues.queries";
import { RevenueRead } from "../schemas/revenue-read";
import { RevenueCreate } from "./revenue-create";
import { RevenueUpdate } from "./revenue-update";

export function Revenues() {
  const [page, setPage] = useState(paginationUtils.default.page);
  const [pageSize, setPageSize] = useState(paginationUtils.default.pageSize);
  const query = useRevenuesPaginatedQuery({
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
            <TableHead>Guadagnato da</TableHead>
            <TableHead>Data</TableHead>
            <TableHead className="text-right">Importo</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {query.data.items.map((revenue) => (
            <TableRow key={revenue.id}>
              <TableCell>
                <Badge>{revenue.category.name}</Badge>
              </TableCell>
              <TableCell>{revenue.name}</TableCell>
              <TableCell>
                <Badge className="mr-2" variant={"outline"}>
                  {revenue.receiver.name}
                </Badge>
              </TableCell>

              <TableCell>
                <div>{fns.formatDate(revenue.receivedAt, "dd-MM-yyyy")}</div>
              </TableCell>
              <TableCell className="font-mono text-right">
                {`${revenue.amount} €`}
              </TableCell>
              <TableCell className="text-right">
                <InternalUpdateButton revenue={revenue} />
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

function InternalHeader() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <div className="flex gap-4 items-center">
      <div className="text-xl font-semibold">Guadagni</div>
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
            <SheetTitle className="text-xl">{"Guadagno"}</SheetTitle>
            <SheetDescription />
          </SheetHeader>
          <RevenueCreate onDone={() => setIsSheetOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  );
}

function InternalUpdateButton(props: { revenue: RevenueRead }) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button variant={"secondary"} size={"icon"}>
          <Icon icon="edit" />
        </Button>
      </SheetTrigger>
      <SheetContent className="px-2">
        <SheetHeader>
          <SheetTitle className="text-xl">{"Guadagno"}</SheetTitle>
        </SheetHeader>
        <RevenueUpdate
          id={props.revenue.id}
          onDone={() => setIsSheetOpen(false)}
        />
      </SheetContent>
    </Sheet>
  );
}
