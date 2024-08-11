"use client";
import Link from "next/link";
import {
  AboutPayload,
} from "../../../../../../packages/ui/src/types";
import { useFormAboutContext } from "./form-about-context";
import About from "@repo/ui/components/storefront/about";
import Image from "next/image";

export default function AboutPreviewWrapper() {
  const { form } = useFormAboutContext();
  const values = form.getValues();
  //TODO: handle image selection
  return (
    <About
      payload={values as AboutPayload}
      Image={<Image src={""} fill alt="profile picture" />}
      Link={<Link href="/contact">Contact</Link>}
    />
  );
}
