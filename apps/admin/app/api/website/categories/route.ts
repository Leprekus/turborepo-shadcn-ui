import { GetCategories, GetCategoryBackground, GetImages } from "../../../../actions";

export async function GET(request: Request) {
  if (request.method !== "GET")
    return Response.json({ message: "Method not allowed" }, { status: 405 });

  try {
    //fetch folders
    const { files } = await GetCategories();
    const categories = [];


    //build the response object
    for (const { name, id } of files) {
      const category = {
        name,
        background: await GetCategoryBackground({ id }),
      };
      categories.push(category)
    }

    return Response.json({
      data: categories
    }, { status: 200 });
  } catch (error) {
    const e = error as Error;
    return Response.json({ message: e.message }, { status: 500 });
  }
}
