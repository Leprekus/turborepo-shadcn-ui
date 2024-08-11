import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui/components/ui/accordion";
import { Button } from "@repo/ui/components/ui/button";
import Link from "next/link";
import React, { ReactNode } from "react";

interface SidebarProps {
  children: ReactNode;
}
export default function Sidebar({ children }: SidebarProps) {
  const website = {
    title: "Website",
    children: [
      {
        title: "Home",
        href: "/website/home",
      },
      {
        title: "About",
        href: "/website/about",
      },
    ],
  };

  const navItems = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Categories",
      href: "/categories",
    },
  ];
  return (
    <div className="flex w-screen min-h-screen max-w-7xl">
      <aside className="w-40 bg-gray-400 h-screen">
        {navItems.map((item, i) => (
          <Button
            asChild
            variant="ghost"
            className="w-full hov"
            key={`nav-item-${i}`}
          >
            <Link href={item.href}>{item.title}</Link>
          </Button>
        ))}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>{website.title}</AccordionTrigger>
            <AccordionContent className="flex flex-col">
              {website.children.map((item) => (
                <Button key={item.title} asChild variant="link">
                  <Link href={item.href} key={item.title}>
                    {item.title}
                  </Link>
                </Button>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </aside>
      {children}
    </div>
  );
}
