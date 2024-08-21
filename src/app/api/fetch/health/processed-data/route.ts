import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { HealthJSON } from "@/types/types";

export async function GET() {
  const uri = process.env.MONGODB_URI as string;
  const dbName = process.env.MONGODB_DATABASE as string;
  const dbCollection = process.env.MONGODB_HEALTH as string;
  const client = new MongoClient(uri);

  try {
    const database = client.db(dbName);
    const datacollection = database.collection(dbCollection);
    const data = (await datacollection
      .find({}, { projection: { processed_data: 1 } })
      .toArray()) as unknown as HealthJSON[];

    if (data === undefined || data.length == 0) {
      return NextResponse.json({
        status: 404,
        statusText: "NOT OK",
      });
    }

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
