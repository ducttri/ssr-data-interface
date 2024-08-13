import { decode_health } from "@/utils/helpers/healthDecoder";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json({
      success: false,
      status: 400,
      statusText: "Didn't include a file.",
    });
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);
    const compressedData = await decode_health(fileBuffer);
    const jsonData = JSON.parse(compressedData.toString());

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
