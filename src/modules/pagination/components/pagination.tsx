"use client";

import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type Props = {
  onPageChange: (page: number) => void;
  page: number;
  pageSize: number;
  totalItems: number;
};

export function Pagination(props: Props) {
  const { pageSize, totalItems, onPageChange } = props;

  const [page, setPage] = useState(props.page);

  const isPrevPageDisabled = page === 0;
  const isNextPageDisabled = (page + 1) * pageSize >= totalItems;

  return (
    <div className="flex gap-4 items-center justify-end text-sm">
      {`Totale: ${props.totalItems} elementi`}
      <Button
        variant="outline"
        disabled={isPrevPageDisabled}
        onClick={() => {
          const updatedPage = page - 1;
          setPage(updatedPage);
          onPageChange(updatedPage);
        }}
      >
        <Icon icon="chevronLeft" />
      </Button>
      <div>{`Pagina ${page + 1}`}</div>
      <Button
        variant="outline"
        disabled={isNextPageDisabled}
        onClick={() => {
          const updatedPage = page + 1;
          setPage(updatedPage);
          onPageChange(updatedPage);
        }}
      >
        <Icon icon="chevronRight" />
      </Button>
    </div>
  );
}
