import Link from "next/link";
import { routes } from "@/routes/routes";
import { Icon } from "@/components/icon";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col gap-4 w-full">
      <div className="text-2xl flex items-center gap-2">
        <Icon icon="settings" />
        {"Impostazioni"}
      </div>
      <div className="flex flex-wrap gap-4 items-center">
        <Link
          href={routes.categories}
          className="border p-3 text-lg flex w-fit items-center shadow hover:bg-secondary gap-2 rounded-xl"
        >
          <Icon icon="category" />
          <span>{"Categorie"}</span>
        </Link>
        <Link
          href={routes.users}
          className="border p-3 text-lg flex w-fit items-center shadow hover:bg-secondary gap-2 rounded-xl"
        >
          <Icon icon="user" />
          <span>{"Utenti"}</span>
        </Link>
      </div>
    </div>
  );
}
