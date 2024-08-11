import { drive_v3 } from "googleapis";

export interface HeroBannerPayload {
  subtitle_1: string;
  subtitle_2: string;
  title: string;
  description: string;
  link_title: string;
  link_address: string;
  banner_img: string;
}
export interface AboutPayload {
  img: string;
  description: string;
  link_title: string;
  link_address: string;
}

export interface FolderPayload {
  files: {
    mimeType: string;
    id: string;
    name: string;
  }[];
}

type ConfigFile = "home" | "about" | "contact";
type ContentPayload = HeroBannerPayload | AboutPayload;

export type UpdateFileContentFunction = ({
  file,
  content,
}: {
  file: ConfigFile;
  content: ContentPayload;
}) => Promise<void>;

export type GetFileContentFunction = ({
  file,
}: {
  file: ConfigFile;
}) => Promise<ContentPayload>;

export type SchemaFile = drive_v3.Schema$File
export type GetCategoriesFunction = () => Promise<SchemaFile[]>;
export type GetCategoryBackgroundFunction = ({  id }: {  id: string }) => Promise<FolderPayload>;
export type GetImagesFunction = ({
  category,
}: {
  category: string;
}) => Promise<SchemaFile[]>;
