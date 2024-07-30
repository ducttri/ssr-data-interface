import { NextRequest, NextResponse } from "next/server";
import * as path from "path";
import { exec } from "child_process";

function decode_buffer(
  file: Buffer,
): Promise<Buffer> {
  return new Promise(async (resolve, reject) => {
    const scriptPath = path.resolve(
      __dirname,
      "../../../../../../lib/umn-detector-code/python/umndet/tools/decode_health.py"
    );
    const pythonProcess = exec(
      `python ${scriptPath}`,
      { encoding: "buffer" },
      (error, stdout, stderr) => {
        if (error) {
          reject(`Error executing Python script: ${error}`);
          return;
        }
        if (stderr.length > 0) {
          reject(`Python script error: ${stderr.toString()}`);
          return;
        }
        resolve(stdout);
      }
    );

    pythonProcess.stdin?.write(file);
    pythonProcess.stdin?.end();
  });
}


export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false });
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);
    const compressedData = await decode_buffer(fileBuffer);

    const jsonData = JSON.parse(compressedData.toString());

    return NextResponse.json({ success: true, data: jsonData });
  } catch (e) {
    console.error("Failed to parse data: " + e);
    return NextResponse.json({
      success: false,
      error: "Error processing file.",
    });
  }
}
