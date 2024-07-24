import * as zlib from "zlib";
import { WritableStreamBuffer } from "stream-buffers";
import { NextRequest, NextResponse } from "next/server";
import archiver from "archiver";
import { simulate_health } from "@/utils/helpers/simulate_health";

export async function GET(req: NextRequest) {
  const numPackets = Number(req.nextUrl.searchParams.get("numPackets") || "0");
  const outputFilename =
    req.nextUrl.searchParams.get("outputFilename") || "output";

  const binStreamBuffer = new WritableStreamBuffer({
    initialSize: 100 * 1024,
    incrementAmount: 10 * 1024,
  });

  let ts = Math.floor(Date.now() / 1000);

  for (let i = 0; i < numPackets; i++) {
    const healthData = simulate_health(ts);
    binStreamBuffer.write(Buffer.from(JSON.stringify(healthData) + "\n"));
    ts += 1;
  }

  const binaryData = binStreamBuffer.getContents() as Buffer;

  const archiveStreamBuffer = new WritableStreamBuffer();

  const archive = archiver("zip", {
    zlib: { level: 9 }, 
  });

  archive.pipe(archiveStreamBuffer);

  archive.append(binaryData, { name: `${outputFilename}.bin` });

  await archive.finalize();

  try {
    const archiveData = archiveStreamBuffer.getContents();

    if (!archiveData) {
      throw new Error("Failed to create archive");
    }

    const compressedData = await gzipPromise(archiveData);

    return new NextResponse(compressedData, {
      status: 200,
      statusText: "OK",
      headers: {
        "Content-Disposition": `attachment; filename="${outputFilename}.gz"`,
        "Content-Type": "application/octet-stream",
      },
    });
  } catch (error) {
    console.error("Compression error:", error);
    return NextResponse.json({
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}

const gzipPromise = (data: Buffer): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    zlib.gzip(data, (err, compressedData) => {
      if (err) {
        reject(err);
      } else {
        resolve(compressedData);
      }
    });
  });
};
