"use client";
import { Button } from "@repo/ui/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { useFormAboutContext } from "./form-about-context";
import { AboutPayload, UpdateFileContentFunction } from '../../../../../../packages/ui/src/types';
import { toast } from 'sonner';

interface FormAboutProps {
  updateFileContent: UpdateFileContentFunction
}
export default function FormAbout({ updateFileContent }: FormAboutProps) {
  const { form } = useFormAboutContext();

  const onSubmit = async () => {
    try {

      await updateFileContent({
        file: 'about',
        content: form.getValues() as AboutPayload
      })
      toast("Site updated successfully")

    } catch(error) {

        toast("Failed to update site")
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
