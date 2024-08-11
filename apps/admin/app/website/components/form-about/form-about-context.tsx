"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { createContext, ReactNode, useContext } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  description: z.string(),
});
type ZodFormAbout = z.infer<typeof formSchema>;

const FormAboutContext = createContext<{
  form: UseFormReturn<ZodFormAbout>;
} | null>(null);

export const useFormAboutContext = () => {
  const context = useContext(FormAboutContext);
  if (!context) {
    throw new Error(
      "useFormAboutContext must be used within a FormAboutProvider",
    );
  }
  return context;
};

interface FormAboutProviderProps {
  children: ReactNode;
}
export const FormAboutProvider = ({ children }: FormAboutProviderProps) => {
  const form = useForm<ZodFormAbout>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
    },
  });

  return (
    <FormAboutContext.Provider value={{ form }}>
      {children}
    </FormAboutContext.Provider>
  );
};
