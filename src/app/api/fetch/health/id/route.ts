import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import { HealthJSONData } from "@/types/types";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id") || "";
  if (id == "") {
    return NextResponse.json({
      status: 400,
      statusText: "Bad Request",
      error: "Missing ID",
    });
  } else if (!ObjectId.isValid(id)) {
    return NextResponse.json({
      status: 400,
      statusText: "Bad Request",
      error: "Invalid ID",
    });
  }
  const uri = process.env.MONGODB_URI as string;
  const client = new MongoClient(uri);
  try {
    const database = client.db("HealthData");
    const datacollection = database.collection("SampleHealthData");
    const data = await datacollection.findOne({
      _id: new ObjectId(id),
    });
    return NextResponse.json(data);
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
