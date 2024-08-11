import gdrive from "./gdriveInstance";
import { Schema_File } from "../types/schema";
import { GaxiosResponse, GaxiosPromise } from "googleapis-common";
import { drive_v3 } from "googleapis";

type ApiListResponse = GaxiosPromise<drive_v3.Schema$FileList>;
type ApiResponse = drive_v3.Schema$File;
const api = () => {
  // const config = {
  //   rootFolder: process.env.ROOT_FOLDER_ID,
  //   categoriesFolder: process.env.CATEGORIES_FOLDER_ID,
  //   homeFile: process.env.HOME_CONFIG,
  //   aboutFile: process.env.ABOUT_CONFIG,
  //   contactFile: process.env.CONTACT_CONFIG,
  // };

  // async function tryCatch<T>(
  //   callBack: (args: { [key: string]: string }) => Promise<T>,
  //   errMessage: string,
  //   args: { [key: string]: string }
  // ) {
  //   try {
  //     const payload = await callBack(args);
  //     if (!payload.data) throw new Error("No content found");
  //     return payload.data;
  //   } catch (error) {
  //     const e = error as Error;
  //     console.log(`[${errMessage}] `, e.message);
  //   }
  // }

  async function getDirectoryList(parentId: string) {
    const listResponse = await gdrive.files.list({
      q: `'${parentId}' in parents`,
      fields: "files(id, name, mimeType)",
    })

    return listResponse.data;
  }
  async function getFileList(parentId: string) {
  }

  return {
    getDirectoryList,
    getFileList
  };
};

export const gDriveApi = api()
