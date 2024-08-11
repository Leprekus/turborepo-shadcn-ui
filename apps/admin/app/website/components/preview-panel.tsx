import HeroBanner from "@repo/ui/components/storefront/hero-banner";
import {
  Tabs,
  TabsList,
  TabsContent,
  TabsTrigger,
} from "@repo/ui/components/ui/tabs";
import Link from "next/link";
import React, { ReactNode } from "react";

interface PreviewPanelProps {
  Form: ReactNode;
  PreviewComponent: ReactNode;
}
export default function PreviewPanel({
  Form,
  PreviewComponent,
}: PreviewPanelProps) {
  //TODO: add buttons to view in sm, md, lg, screen sizes
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Edit</TabsTrigger>
        <TabsTrigger value="password">Preview</TabsTrigger>
      </TabsList>
      <TabsContent value="account">{Form}</TabsContent>
      <TabsContent value="password">
        <div className="h-[720px] w-[1280px] overflow-scroll">
          {PreviewComponent}
        </div>
      </TabsContent>
    </Tabs>
  );
}
