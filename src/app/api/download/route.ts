import { NextRequest } from "next/server";



export async function GET(req: NextRequest) {
  console.log(JSON.parse(req.nextUrl.searchParams.get("selectedData") || '[]'));
  const response = await fetch();

  return new Response(response.body, {
    headers: {
      ...response.headers, 
      "content-disposition": `attachment; filename="test.pdf"`,
    },
  });
}
