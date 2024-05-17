import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { JSONId } from "@/types/types";

export async function GET() {
  const uri = process.env.MONGODB_URI as string;
  const client = new MongoClient(uri);
  try {
    const database = client.db("HealthData");
    const datacollection = database.collection("SampleHealthData");
    const projection = { timestamp: 1 };
    const cursor = datacollection.find().project(projection);
    let data: JSONId[] = [];
    for await (const doc of cursor) {
      data.push(doc as JSONId);
    }
    return NextResponse.json({ success: true, data: data });
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
