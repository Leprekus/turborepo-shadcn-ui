"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { createContext, ReactNode, useContext, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { HeroBannerPayload, SchemaFile } from "../../../../../../packages/ui/src/types";

const formSchema = z.object({
  subtitle_1: z.string().optional(),
  subtitle_2: z.string().optional(),
  title: z.string(),
  description: z.string(),
  link_title: z.string(),
  link_address: z.string(),
  banner_img: z.string(),
});
export type ZodFormHome = z.infer<typeof formSchema>;

const FormHomeContext = createContext<{
  form: UseFormReturn<ZodFormHome>;
  categories: SchemaFile[]

} | null>(null);

export const useFormHomeContext = () => {
  const context = useContext(FormHomeContext);
  if (!context) {
    throw new Error(
      "useFormHomeContext must be used within a FormHomeProvider",
    );
  }
  return context;
};

interface FormHomeProviderProps {
  children: ReactNode;
  categories: SchemaFile[]
  formHome: ZodFormHome
}
export const FormHomeProvider = ({ children, categories, formHome }: FormHomeProviderProps) => {
  const form = useForm<ZodFormHome>({
    resolver: zodResolver(formSchema),
    defaultValues: formHome ? formHome : {
      subtitle_1: "",
      subtitle_2: "",
      title: "",
      description: "",
      link_title: "",
      link_address: "",
      banner_img: "https://images3.alphacoders.com/133/1332803.png",
    },
  });
  const value = {
    form,
    categories
  }

  return (
    <FormHomeContext.Provider value={value}>
      {children}
    </FormHomeContext.Provider>
  );
};
