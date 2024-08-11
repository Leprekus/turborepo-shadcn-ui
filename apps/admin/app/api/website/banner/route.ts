import { NextRequest } from 'next/server';
import { GetFile, GetFileContent, UpdateFileContent } from '../../../../actions';
import gdrive from '../../../../utils/gdriveInstance';
import { decryptData } from '../../../../utils/encryptionHelper';

export async function PATCH(request: NextRequest) {
  try {
    let config = await GetFileContent({ file: 'home' })


    const decryptedId = await decryptData(await request.text())
    config = {
      ...config,
      banner_img: `https://drive.google.com/thumbnail?id=${decryptedId}&sz=w${1080}`
    }


    await UpdateFileContent({ file: 'home', content: config })

    return Response.json( { data: config },{ status: 200 });
  } catch (error) {
    const e = error as Error;
    return Response.json({ message: e.message }, { status: 500 });
  }
}
