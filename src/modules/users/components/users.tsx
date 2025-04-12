"use client";

import { Icon } from "@/components/icon";
import { useUsersQuery } from "../queries/user.queries";
import { UserRead } from "../schemas/user-read";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { UserUpdate } from "./user-update";
import { Button } from "@/components/ui/button";
import { UserCreate } from "./user-create";

export function Users() {
  const query = useUsersQuery();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  if (!query.data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <div className="text-xl font-semibold">Utenti</div>
        <div className="ml-auto" />
        <Button
          onClick={() => setIsSheetOpen(true)}
          type="button"
          variant={"outline"}
        >
          <Icon icon="add" />
        </Button>
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Utenti</SheetTitle>
            </SheetHeader>
            <UserCreate onDone={() => setIsSheetOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex flex-wrap gap-4 items-center">
        {query.data.map((user) => (
          <InternalUserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

function InternalUserCard(props: { user: UserRead }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="hover:bg-secondary w-fit hover:cursor-pointer shadow border rounded-xl p-3 flex items-center gap-2"
      >
        <Icon icon="user" />
        <span>{props.user.name}</span>
      </div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Utente</SheetTitle>
          </SheetHeader>
          <UserUpdate
            onDone={() => setIsOpen(false)}
            defaultValues={props.user}
          />
        </SheetContent>
      </Sheet>
    </>
  );
}
