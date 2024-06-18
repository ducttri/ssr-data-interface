import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import { JSONData } from "@/types/types";

export async function GET(req: NextRequest) {
  const query = JSON.parse(req.nextUrl.searchParams.get("query") || "{}");
  const options = JSON.parse(req.nextUrl.searchParams.get("options") || "{}");

  const uri = process.env.MONGODB_URI as string;
  const client = new MongoClient(uri);
  try {
    const database = client.db("HealthData");
    const datacollection = database.collection("SampleHealthData");
    const cursor = datacollection.find(query, options);
    let data: JSONData[] = [];
    for await (const doc of cursor) {
      data.push(doc as JSONData);
    }
    return NextResponse.json({ status: 200, statusText: "OK", data: data });
  } catch (e) {
    console.error(e);
    return NextResponse.json({
      status: 500,
      statusText: "Internal Server Error",
      error: "Error processing file.",
    });
  } finally {
    await client.close();
  }
}
