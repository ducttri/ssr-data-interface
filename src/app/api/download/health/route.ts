import archiver from "archiver";
import { MongoClient, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { WritableStreamBuffer } from "stream-buffers";
import fs from "fs";

export const maxDuration = 60;

export async function GET(req: NextRequest) {
  const selectedData = JSON.parse(
    req.nextUrl.searchParams.get("selectedData") || "[]"
  );

  try {
    const archive = archiver("zip", { zlib: { level: 9 } });
    const writableStreamBuffer = new WritableStreamBuffer();

    archive.pipe(writableStreamBuffer);
    selectedData.map((id: string) => {
      const filePath = process.env.WORKINGDIR + `/database/health/${id}.bin.gz`;
      if (fs.existsSync(filePath)) {
        archive.append(fs.createReadStream(filePath), {
          name: `${id}.bin.gz`,
        });
      }
    });

    await new Promise<void>((resolve, reject) => {
      archive.on("end", resolve);
      archive.on("error", reject);
      archive.finalize();
    });

    return new NextResponse(writableStreamBuffer.getContents() as Buffer, {
      status: 200,
      statusText: "OK",
      headers: {
        "content-disposition": `attachment; filename="data.zip"`,
        "content-type": "application/zip",
      },
    });
  } catch (e) {
    console.error("Failed to compress data: " + e);

    return NextResponse.json({
      status: 500,
      statusText: "Internal Server Error",
      error: "Failed to compress data",
    });
  }
}
