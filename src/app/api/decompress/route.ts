import { NextRequest, NextResponse } from "next/server";
import { createGunzip } from "zlib";
import { parse } from "json-bigint";
import { HealthJSONData } from "@/types/types";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const gunzip = createGunzip();

  let newdata = "";
  const decompressionPromise = new Promise<void>((resolve, reject) => {
    gunzip.on("data", (chunk) => {
      newdata += chunk.toString();
    });

    gunzip.on("end", () => {
      resolve();
    });

    gunzip.on("error", (error) => {
      reject(error);
    });

    gunzip.end(buffer);
  });

  try {
    await decompressionPromise;
    const jsonData = parse(newdata) as HealthJSONData;
    return NextResponse.json({ success: true, data: jsonData });
  } catch (e) {
    console.error("Failed to parse data: " + e);
    return NextResponse.json({
      success: false,
      error: "Error processing file.",
    });
  }
}
