import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import { JSONData } from "@/types/types";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const id: string = (data.get("id") as string) || "";
  const filter: JSON = JSON.parse((data.get("filter") as string) || "{}");
  const projection: JSON = JSON.parse(
    (data.get("projection") as string) || "{}"
  );

  const uri = process.env.MONGODB_URI as string;
  const client = new MongoClient(uri);
  try {
    const database = client.db("HealthData");
    const datacollection = database.collection("SampleHealthData");
    if (id == "") {
      const cursor = datacollection.find(filter).project(projection);
      let data: JSONData[] = [];
      for await (const doc of cursor) {
        data.push(doc as JSONData);
      }
      return NextResponse.json({ success: true, data: data });
    } else {
      const cursor = datacollection.find({ _id: new ObjectId(id) }).project(projection);
      let data: JSONData[] = [];
      for await (const doc of cursor) {
        data.push(doc as JSONData);
      }
      return NextResponse.json({ success: true, data: data });
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json({
      success: false,
      error: "Error processing file.",
    });
  } finally {
    await client.close();
  }
}
