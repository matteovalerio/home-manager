import { Icon } from "@/components/icon";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { QueryProvider } from "@/providers/query-provider";
import { routes } from "@/routes/routes";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

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
                  <NavigationMenuLink href={routes.settings}>
                    Impostazioni
                  </NavigationMenuLink>
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
