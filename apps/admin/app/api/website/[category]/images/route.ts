import { GetImages } from '../../../../../actions';

export async function GET(request: Request, {
  params,
}: {
  params: { category: string };
},) {
  if (request.method !== "GET")
    return Response.json({ message: "Method not allowed" }, { status: 405 });

  try {
    //fetch folders
    const { category } = params
    const images = await GetImages({ category });
    return Response.json({
      data: images
    }, { status: 200 });
  } catch (error) {
    const e = error as Error;
    return Response.json({ message: e.message }, { status: 500 });
  }
}
