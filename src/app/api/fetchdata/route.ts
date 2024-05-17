import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function GET() {
  const uri = process.env.MONGODB_URI as string;
  const client = new MongoClient(uri);
  try {
    const database = client.db("HealthData");
    const datacollection = database.collection("SampleHealthData");
    const query = {};
    const data = await datacollection.findOne(query);
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
