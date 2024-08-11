"use client";
import React, { useEffect, useState } from "react";
import { useFormHomeContext } from "../form-home/form-home-context";
import {
  ArrowLeftIcon,
  CheckCircledIcon,
  CheckIcon,
  FileIcon,
} from "@radix-ui/react-icons";
import { GDriveFile } from "../../../../types/schema";
import Image from "next/image";
import { Toggle } from "@repo/ui/components/ui/toggle";

interface ItemsProps {
  selected: string;
  setSelected: (id: string) => void ;
}
export default function Items({ selected, setSelected }: ItemsProps) {
  const { categories } = useFormHomeContext();
  const [collection, setCollection] = useState("");
  const [images, setImages] = useState<GDriveFile[]>([]);
  const fetchImages = async () => {
    const res = await fetch(`/api/website/${collection}/images`);
    const { data: images } = await res.json();
    setImages(images);
  };
  useEffect(() => {
    if (collection === "") return;
    fetchImages();
  }, [collection]);
  if (collection !== "")
    return (
      <div className="relative">
        <Toggle className="fixed top-20" onClick={() => {setCollection(""), setSelected(''), setImages([])}}>
          <ArrowLeftIcon />
        </Toggle>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 align-center w-full gap-y-8 place-items-center min-h-[425px]">
          {images.map((image) => (
            <div
              className="col-span-1 size-52 flex flex-col items-center justify-center rounded-md cursor-pointer group"
              onClick={() => setSelected(image.encryptedId)}
            >
              <div className="relative size-52 overflow-hidden rounded-t-sm flex items-center justify-center">
                <Image
                  src={image.thumbnailLink!}
                  alt="thumbnail"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex items-center justify-end px-4 h-14 w-full border-b border-x rounded-b-md transition-all group-hover:bg-zinc-50">
                <div
                  className={` flex items-center justify-center rounded-full size-5 border ${selected === image.encryptedId && "bg-blue-500"}`}
                >
                  {image.encryptedId === selected && (
                    <CheckIcon className="size-3 text-white" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  return (
    <div className="grid gap-4 py-4">
      {categories ? (
        categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setCollection(category.name)}
            id={category.id!}
            className="flex gap-4 items-center hover:bg-zinc-100 transition-all py-2 px-4 rounded-md"
          >
            <FileIcon className="text-gray-400" />
            {category.name}
          </button>
        ))
      ) : (
        <p>No collections found.</p>
      )}
    </div>
  );
}
