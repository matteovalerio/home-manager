"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Expenses } from "@/modules/expenses/components/expenses";
import { Revenues } from "@/modules/revenues/components/revenues";

type Tabs = "revenues" | "expenses";
const tabs: Tabs[] = ["revenues", "expenses"];
const defaultTab = "revenues";

export function Dashboard() {
  return (
    <>
      <Tabs defaultValue={defaultTab}>
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab} value={tab} className="text-xl font-bold">
              {tab === "revenues" ? "Guadagni" : "Spese"}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab} value={tab}>
            {tab === "revenues" ? <Revenues /> : <Expenses />}
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
}
