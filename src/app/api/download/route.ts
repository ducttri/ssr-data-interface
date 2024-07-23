import { HealthJSONData } from "@/types/types";
import archiver from "archiver";
import { MongoClient, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { WritableStreamBuffer } from "stream-buffers";

export const maxDuration = 60;

export async function GET(req: NextRequest) {
  const selectedData = JSON.parse(
    req.nextUrl.searchParams.get("selectedData") || "[]"
  );
  const uri = process.env.MONGODB_URI as string;
  const client = new MongoClient(uri);
  const dbName = process.env.MONGODB_DATABASE as string;
  const dbCollection = process.env.MONGODB_HEALTH as string;
  const database = client.db(dbName);
  const datacollection = database.collection(dbCollection);
  let datas: HealthJSONData[] = [];

  try {
    await Promise.all(
      selectedData.map(async (id: string) => {
        try {
          const cursor = await datacollection.findOne({
            _id: new ObjectId(id),
          });

          if (cursor) {
            datas.push(cursor as unknown as HealthJSONData);
          }
        } catch (e) {
          console.error("Failed to fetch data: " + e);

          return NextResponse.json({
            status: 500,
            statusText: "Internal Server Error",
            error: `Error fetching document with id ${id}`,
          });
        }
      })
    );

    const archive = archiver("zip", { zlib: { level: 9 } });
    const writableStreamBuffer = new WritableStreamBuffer();

    archive.pipe(writableStreamBuffer);
    datas.forEach((jsonObject: HealthJSONData, index: number) => {
      const jsonString = JSON.stringify(jsonObject, null, 2);

      archive.append(jsonString, { name: `${selectedData[index]}.json` });
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
        "content-disposition": `attachment; filename="jsons.zip"`,
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
