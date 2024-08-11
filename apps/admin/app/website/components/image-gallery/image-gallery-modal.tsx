import { Button } from "@repo/ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/components/ui/dialog";
import Items from "./items";
import { useState } from "react";
import { toast } from 'sonner';
import { useFormHomeContext } from '../form-home/form-home-context';

export default function ImageGalleryModal() {
  const [selected, setSelected] = useState("");
  const { form } = useFormHomeContext();
  const saveChanges= async () => {
    try {
      if(selected === '') {
      toast.error("No selected image found")
      return
    }
    const res = await fetch('/api/website/banner', {
      method: 'PATCH',
      body: selected

    })
    const { data: config } = await res.json()
    console.log({ config })
    form.setValue('banner_img', config.banner_img)
    toast('Changes saved successfully')
  } catch(e) {
    toast.error('Failed to save changes')
  }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Browse gallery</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Select Collection</DialogTitle>
          <DialogDescription>
            Browse images from your collections.
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-scroll max-h-96 scrollbar">
          <Items selected={selected} setSelected={setSelected} />
        </div>
        <DialogFooter>
          <Button type="submit" disabled={selected === '' } onClick={saveChanges}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
