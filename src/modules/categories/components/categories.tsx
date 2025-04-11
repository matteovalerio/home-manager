"use client"

import {useCategoriesQuery} from "@/modules/categories/queries/categories.queries";
import {Skeleton} from "@/components/ui/skeleton";
import {CategoryRead} from "@/modules/categories/schemas/category-read";
import {Icon} from "@/components/icon";
import {Button} from "@/components/ui/button";
import {Sheet, SheetContent, SheetTitle, SheetHeader, SheetDescription, SheetTrigger} from "@/components/ui/sheet";
import {CategoryUpsert} from "@/modules/categories/components/category-upsert";
import {useState} from "react";

export function Categories() {
    const query = useCategoriesQuery();

    if (query.isFetching) {
        return <InternalSkeleton/>;
    }


    return <div className="flex flex-col gap-4">
        <div className="flex gap-2 text-xl items-center">
            <Icon icon="category"/>
            <div>Categorie</div>
            <div className="ml-auto"/>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" className="shrink-0">
                        <Icon icon="add"/>
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle className="text-xl">{"Categoria"}</SheetTitle>
                        <SheetDescription></SheetDescription>
                    </SheetHeader>
                    <CategoryUpsert/>
                </SheetContent>
            </Sheet>

        </div>
        <div className="flex flex-wrap gap-4">
        {query.data?.map((category) => <InternalCategory key={category.id} category={category}/>)}
        </div>
    </div>
}

function InternalSkeleton() {
    return <Skeleton className="h-4 w-36"/>
}

function InternalCategory(props: { category: CategoryRead;}) {
    const [isOpen, setIsOpen] = useState(false);

    return <div className="border rounded-xl p-3 text-sm flex w-fit gap-2 items-center hover:bg-secondary hover:cursor-pointer shadow" onClick={() => setIsOpen(true)}>
        <span>{props.category.name}</span>
        <Sheet open={isOpen} onOpenChange={setIsOpen} >
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="text-xl">{"Categoria"}</SheetTitle>
                    <SheetDescription></SheetDescription>
                </SheetHeader>
                <CategoryUpsert defaultValues={props.category}/>
            </SheetContent>
        </Sheet>
    </div>
}