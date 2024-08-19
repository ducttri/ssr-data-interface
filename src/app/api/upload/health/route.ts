import { decode_health } from "@/utils/helpers/healthDecoder";
import { uploadData, verifyAccess } from "@/utils/helpers/mongodbUpload";
import { NextRequest, NextResponse } from "next/server";
import fs, { writeFileSync } from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  const token = request.headers.get("authorization") || "";
  const valid = true;

  if (valid) {
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
      const compressedData = await decode_health([file]);
      const jsonData = JSON.parse(compressedData.toString());
      const status = await uploadData(jsonData);

      if (status.success) {
        const filePath =
          process.env.WORKINGDIR + `/database/health/${status.id}.bin.gz`;
        writeFileSync(filePath, fileBuffer, {
          flag: "w",
        });
        return NextResponse.json({
          status: 200,
          statusText: "Succesfully upload data",
        });
      }
    } catch (e) {
      console.error("Failed to parse data: " + e);
      return NextResponse.json({
        success: false,
        status: 400,
        statusText: "Error processing file.",
        error: "Error processing file.",
      });
    }
  } else {
    return NextResponse.json({
      status: 503,
      statusText: "User doesn't have permission",
    });
  }
  return NextResponse.json({
    status: 503,
    statusText: "User doesn't have permission",
  });
}
