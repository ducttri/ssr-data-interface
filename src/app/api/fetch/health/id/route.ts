import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import { JSONData } from "@/types/types";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id") || "";
  if (id == "") {
    return NextResponse.json({
      status: 400,
      statusText: "Bad Request",
      error: "Missing ID",
    });
  }
  const uri = process.env.MONGODB_URI as string;
  const client = new MongoClient(uri);
  try {
    const database = client.db("HealthData");
    const datacollection = database.collection("SampleHealthData");
    const queries = { _id: new ObjectId(id) };
    const data = (await datacollection.findOne(queries)) as unknown as JSONData;
    return NextResponse.json(data);
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
