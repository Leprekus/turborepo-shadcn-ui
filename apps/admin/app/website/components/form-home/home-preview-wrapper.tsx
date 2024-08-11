"use client";
import React from "react";
import { useFormHomeContext } from "./form-home-context";
import HeroBanner from "@repo/ui/components/storefront/hero-banner";
import Link from "next/link";
import { HeroBannerPayload } from "../../../../../../packages/ui/src/types";

export default function HomePreviewWrapper() {
  const { form } = useFormHomeContext();
  let values = form.getValues();
  return (
    <HeroBanner
      banner=""
      Link={<Link href={values.link_address}>{values.link_title}</Link>}
      payload={values as HeroBannerPayload}
    />
  );
}
