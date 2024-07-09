import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { HealthJSONData } from "@/types/types";

export async function GET() {
  const uri = process.env.MONGODB_URI as string;
  const client = new MongoClient(uri);
  try {
    const database = client.db("HealthData");
    const datacollection = database.collection("SampleHealthData");
    const data = (await datacollection
      .find({}, { projection: { processed_data: 1 } })
      .toArray()) as unknown as HealthJSONData[];
    return NextResponse.json({
      status: 200,
      statusText: "OK",
      data: data,
    });
  } catch (e) {
    console.error("Failed to fetch data: " + e);
    return NextResponse.json({
      status: 500,
      statusText: "Internal Server Error",
      error: "Error processing file.",
    });
  } finally {
    await client.close();
  }
}
