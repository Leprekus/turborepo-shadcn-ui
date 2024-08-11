"use client";
import { Button } from "@repo/ui/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { toast } from "sonner";
import {
  HeroBannerPayload,
  UpdateFileContentFunction,
} from "../../../../../../packages/ui/src/types";
import ImageGallery from "../image-gallery/image-gallery-modal";
import { useFormHomeContext } from "./form-home-context";
interface FormHomeProps {
  updateFileContent: UpdateFileContentFunction;
}
export default function FormHome({ updateFileContent }: FormHomeProps) {
  const { form } = useFormHomeContext();

  const onSubmit = async () => {
    try {
      await updateFileContent({
        file: "home",
        content: form.getValues() as HeroBannerPayload,
      });
      toast("Site updated successfully");
    } catch (error) {
      toast("Failed to update site");
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="subtitle_1"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Subtitle One" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subtitle_2"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Subtitle Two" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

        <FormField
          control={form.control}
          name="link_title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Link Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="link_address"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Link Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormControl>
            <Input placeholder="Banner Image Link"/>
          </FormControl>
          <ImageGallery />
          <FormMessage />
        </FormItem>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
