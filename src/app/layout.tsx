import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { routes } from "@/routes/routes";
import { QueryProvider } from "@/providers/query-provider";
import Link from "next/link";
import { Icon } from "@/components/icon";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home manager",
  description: "With <3 by BeardCode",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <div className="border-b flex gap-4 items-center  px-4">
            <Link
              href={routes.home}
              className="text-2xl flex items-center gap-2"
            >
              <Icon icon="home" />
              <span>{"Home manager"}</span>
            </Link>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Settings</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink href={routes.settings}>
                      Impostazioni
                    </NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="px-4 pt-8">{children}</div>
        </QueryProvider>
      </body>
    </html>
  );
}
