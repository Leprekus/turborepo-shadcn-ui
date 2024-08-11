import { GetFileContent } from "../../../../../actions";
import { configFiles } from "../../../../../../../packages/ui/src/components/constants";
import { ConfigFile, ContentPayload } from '../../../../../../../packages/ui/src/types';

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { route: string };
  },
) {
  if (request.method !== "GET") {
    return Response.json({ message: "Method not allowed" }, { status: 405 });
  }

  try {
    const { route } = params;
    const [ sanitizedRoute ] = configFiles.filter((file) => file === route)
    if (!sanitizedRoute)
      throw Error("no route found");
    const data: ContentPayload = await GetFileContent({ file: sanitizedRoute });
    return Response.json(
      { data },
      { status: 200 },
    );
  } catch (error) {
    const e = error as Error;
    return Response.json({ message: e.message }, { status: 500 });
  }
}
