"use server";

import { z } from "zod";
import config from "./config";
import { Schema_File } from "./types/schema";
import gdrive from "./utils/gdriveInstance";
import { decryptData, encryptData } from "./utils/encryptionHelper";
import {
  ContentPayload,
  FolderPayload,
  GetCategoriesFunction,
  GetCategoryBackgroundFunction,
  GetFileContentFunction,
  GetImagesFunction,
  HeroBannerPayload,
  SchemaFile,
  UpdateFileContentFunction,
} from "../../packages/ui/src/types";
import { gDriveApi } from './utils/api';
export async function GetFiles({
  id,
  pageToken,
}: {
  id?: string;
  pageToken?: string;
}): Promise<{
  files: z.infer<typeof Schema_File>[];
  nextPageToken?: string;
}> {
  try {
    let decryptedSharedDrive;
    if (config.apiConfig.isTeamDrive && config.apiConfig.sharedDrive) {
      decryptedSharedDrive = await decryptData(config.apiConfig.sharedDrive);
    }

    const filterName = config.apiConfig.hiddenFiles
      .map((item) => `not name = '${item}'`)
      .join(" and ");
    const query: string = [
      ...config.apiConfig.defaultQuery,
      `'${ id ?? process.env.ROOT_FOLDER_ID}' in parents`,
      `${filterName}`,
    ].join(" and ");

    const data = await gdrive.files.list({
      q: query,
      fields: `files(${config.apiConfig.defaultField}), nextPageToken`,
      orderBy: config.apiConfig.defaultOrder,
      pageSize: config.apiConfig.itemsPerPage,
      pageToken: pageToken,
      ...(decryptedSharedDrive && {
        supportsAllDrives: true,
        includeItemsFromAllDrives: true,
        driveId: decryptedSharedDrive,
        corpora: "drive",
      }),
    });

    const encryptedData: z.infer<typeof Schema_File>[] = [];
    if (!data.data.files?.length)
      return { files: [], nextPageToken: undefined };
    for (const file of data.data.files) {
      encryptedData.push({
        mimeType: file.mimeType as string,
        encryptedId: await encryptData(file.id as string),
        name: file.name as string,
        trashed: (file.trashed as boolean) ?? false,
        modifiedTime: new Date(
          file.modifiedTime as string,
        ).toLocaleDateString(),
        fileExtension: file.fileExtension || undefined,
        encryptedWebContentLink: file.webContentLink
          ? await encryptData(file.webContentLink)
          : undefined,
        size: file.size ? Number(file.size) : undefined,
        thumbnailLink: file.thumbnailLink || undefined,
        imageMediaMetadata: file.imageMediaMetadata
          ? {
              width: Number(file.imageMediaMetadata.width),
              height: Number(file.imageMediaMetadata.height),
              rotation: Number(file.imageMediaMetadata.rotation || 0),
            }
          : undefined,
        videoMediaMetadata: file.videoMediaMetadata
          ? {
              width: Number(file.videoMediaMetadata.width),
              height: Number(file.videoMediaMetadata.height),
              durationMillis: Number(file.videoMediaMetadata.durationMillis),
            }
          : undefined,
      });
    }
    const parsedContent = Schema_File.array().parse(encryptedData);

    return {
      files: parsedContent,
      nextPageToken: data.data.nextPageToken ?? undefined,
    };
  } catch (error) {
    const e = error as Error;
    console.log(`[GET-FILES] error ${e.message}`);
    throw new Error(e.message);
  }
}

export async function GetFile(encryptedId: string): Promise<z.infer<typeof Schema_File>> {
  try {
    const decryptedId = await decryptData(encryptedId);

    console.log('querying [GET-README]')
    console.log({
      fileId: decryptedId,
      fields: config.apiConfig.defaultField,
      supportsAllDrives: config.apiConfig.isTeamDrive,
    })
    const { data: file } = await gdrive.files.get({
      fileId: decryptedId,
      fields: config.apiConfig.defaultField,
      supportsAllDrives: config.apiConfig.isTeamDrive,
    });
    const payload: z.infer<typeof Schema_File> = {
      encryptedId,
      mimeType: file.mimeType as string,
      name: file.name as string,
      trashed: (file.trashed as boolean) ?? false,
      modifiedTime: new Date(file.modifiedTime as string).toLocaleDateString(),
      fileExtension: file.fileExtension || undefined,
      encryptedWebContentLink: file.webContentLink ? await encryptData(file.webContentLink) : undefined,
      size: file.size ? Number(file.size) : undefined,
      thumbnailLink: file.thumbnailLink || undefined,
      imageMediaMetadata: file.imageMediaMetadata
        ? {
            width: Number(file.imageMediaMetadata.width),
            height: Number(file.imageMediaMetadata.height),
            rotation: Number(file.imageMediaMetadata.rotation || 0),
          }
        : undefined,
      videoMediaMetadata: file.videoMediaMetadata
        ? {
            width: Number(file.videoMediaMetadata.width),
            height: Number(file.videoMediaMetadata.height),
            durationMillis: Number(file.videoMediaMetadata.durationMillis),
          }
        : undefined,
    };
    const parsedContent = Schema_File.parse(payload);

    return parsedContent;
  } catch (error) {
    const e = error as Error;
    console.error(e.message);
    throw new Error(e.message);
  }
}
export const UpdateFileContent: UpdateFileContentFunction = async ({
  file,
  content,
}) => {
  let fileId;
  switch (file) {
    case "home":
      fileId = process.env.HOME_CONFIG!;
      break;

    case "about":
      fileId = process.env.ABOUT_CONFIG!;
      break;
    case "contact":
      fileId = process.env.CONTACT_CONFIG!;
      break;
  }
  try {
    const response = await gdrive.files.update({
      fileId,
      media: {
        mimeType: "application/json",
        body: JSON.stringify(content),
      },
    });
    console.log("File updated successfully", response.data);
  } catch (error) {
    const e = error as Error;
    console.error(`[UPDATE-FILE] error ${e.message}`);
    throw new Error(e.message);
  }
};

export const GetFileContent: GetFileContentFunction = async ({ file }) => {
  let fileId;
  switch (file) {
    case "home":
      fileId = process.env.HOME_CONFIG!;
      break;
    case "about":
      fileId = process.env.ABOUT_CONFIG!;
      break;
    case "contact":
      fileId = process.env.CONTACT_CONFIG!;
      break;
    default:
      throw new Error("Invalid file type");
  }

  try {
    const response = await gdrive.files.get({
      fileId,
      alt: "media",
    });

    if (response.data) return response.data as ContentPayload;

    throw new Error("No content found");
  } catch (error) {
    const e = error as Error;
    console.error(`[GET-FILE] error ${e.message}`);
    throw new Error(e.message);
  }
};

export const GetCategories: GetCategoriesFunction = async () => {
  try {
    const { files } = await gDriveApi.getDirectoryList(process.env.CATEGORIES_FOLDER_ID!)

    if (files) {
      return files;
    }

    throw new Error("No content found");
  } catch (error) {
    const e = error as Error;
    console.error(`[GET-CATEGORIES] error ${e.message}`);
    throw new Error(e.message);
  }
};

export const GetCategoryBackground: GetCategoryBackgroundFunction = async ({ id }) => {
  try {
    console.log('running running \n\n\n\n\n\n')
    const listResponse = await gdrive.files.list({
      q: `'${id}' in parents and name = 'background' and mimeType = 'application/vnd.google-apps.folder'`,
      fields: 'files(id, name)',
    });

    const { files: [ bgDir ] } = listResponse.data as FolderPayload

    const bgFile = await gdrive.files.list({
      q: `'${ bgDir?.id }' in parents`,
      fields: 'files(id, name, mimeType)',
    });

    if (bgFile.data) {

      return bgFile.data as FolderPayload;
    }

    throw new Error("No content found");
  } catch (error) {
    const e = error as Error;
    console.error(`[GET-CATEGORY-BACKGROUND] error ${e.message}`);
    throw new Error(e.message);
  }
};

export const GetImages: GetImagesFunction = async ({ category }) => {
  try {
    const { files: folders } = await gDriveApi.getDirectoryList(process.env.CATEGORIES_FOLDER_ID!)
    if(!folders) return []
    const [ folder ]: SchemaFile = folders.filter(file => file.name === category)
    const { files } = await GetFiles({ id: folder.id })
    const images = files.filter(image => image.mimeType?.includes('image'))
    if (!images) return []
    return images
  } catch (error) {
    const e = error as Error;
    console.error(`[GET-CATEGORIES] error ${e.message}`);
    throw new Error(e.message);
  }
};
