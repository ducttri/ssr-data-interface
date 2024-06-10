import { JSONData } from "@/types/types";
import archiver from "archiver";
import { MongoClient, ObjectId } from "mongodb";
import { NextRequest } from "next/server";
import { WritableStreamBuffer } from "stream-buffers";

export async function GET(req: NextRequest) {
  const selectedData = JSON.parse(
    req.nextUrl.searchParams.get("selectedData") || "[]"
  );

  const uri = process.env.MONGODB_URI as string;
  const client = new MongoClient(uri);

  console.log(selectedData);

  let datas: JSONData[] = [];

  const database = client.db("HealthData");
  const datacollection = database.collection("SampleHealthData");
  datas = selectedData.map(async (id: string) => {
    const cursor = await datacollection.findOne({ _id: new ObjectId(id) });
    if (cursor) {
      datas.push(cursor as JSONData);
    }
  });

  console.log(datas);
  try {
    const archive = archiver("zip", { zlib: { level: 9 } });
    const writableStreamBuffer = new WritableStreamBuffer();
    archive.pipe(writableStreamBuffer);
    datas.forEach((jsonObject: JSONData, index: number) => {
      const jsonString = JSON.stringify(jsonObject, null, 2);
      archive.append(jsonString, { name: `file${index + 1}.json` });
    });

    await new Promise<void>((resolve, reject) => {
      archive.on("end", resolve);
      archive.on("error", reject);
      archive.finalize();
    });

    return new Response(writableStreamBuffer.getContents() as Buffer, {
      headers: {
        "content-disposition": `attachment; filename="jsons.zip"`,
        "content-type": "application/zip",
      },
    });
  } catch {}
}
