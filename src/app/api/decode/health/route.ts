import { decode_health } from "@/utils/helpers/healthDecoder";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const files: File[] = data.getAll("files") as File[];

  if (!files) {
    return NextResponse.json({
      success: false,
      status: 400,
      statusText: "Didn't include a file.",
    });
  }

  try {
    files.sort((a, b) => a.name.localeCompare(b.name));
    const jsonData = await decode_health(files);

    return NextResponse.json({
      success: true,
      status: 200,
      statusText: "Successfully decoded",
      data: jsonData,
    });
  } catch (e) {
    console.error("Failed to parse data: " + e);
    return NextResponse.json({
      success: false,
      status: 400,
      statusText: "Error processing file.",
      error: "Error processing file.",
    });
  }
}
