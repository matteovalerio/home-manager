import Link from "next/link";
import {routes} from "@/routes/routes";
import {Icon} from "@/components/icon";

export default function Page() {
    return <div className="min-h-screen flex flex-col gap-4 w-full">
        <div className="text-2xl flex items-center gap-2"><Icon icon="settings"/>{"Impostazioni"}</div>
        <Link href={routes.categories}
              className="border p-3 text-lg flex w-fit items-center shadow hover:bg-secondary gap-2 rounded-xl">
            <Icon icon="category"/>
            <span>{"Categorie"}</span>
        </Link>
    </div>
}