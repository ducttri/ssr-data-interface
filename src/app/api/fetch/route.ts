// import { NextRequest, NextResponse } from "next/server";
// import { MongoClient, ObjectId } from "mongodb";
// import { JSONData } from "@/types/types";

// export async function GET(req: NextRequest) {
//   const query = JSON.parse(req.nextUrl.searchParams.get("query") || "{}");
//   const options = JSON.parse(req.nextUrl.searchParams.get("options") || "{}");
//   const id = req.nextUrl.searchParams.get("ids") || "";

//   const uri = process.env.MONGODB_URI as string;
//   const client = new MongoClient(uri);
//   try {
//     const database = client.db("HealthData");
//     const datacollection = database.collection("SampleHealthData");
//     if (id == "") {
//       const data = (await datacollection.find(query, options).toArray()) as unknown as JSONData[];
//       return NextResponse.json({ status: 200, statusText: "OK", data: data });
//     } else {
//       const queries = { _id: new ObjectId(id) };
//       const data = (await datacollection.findOne(queries, options)) as unknown as JSONData
//       return NextResponse.json({ status: 200, statusText: "OK", data: data });
//     }
//   } catch (e) {
//     console.error(e);
//     return NextResponse.json({
//       status: 500,
//       statusText: "Internal Server Error",
//       error: "Error fetching data.",
//     });
//   } finally {
//     await client.close();
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import { JSONData } from "@/types/types";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export async function GET() {
  const uri = process.env.MONGODB_URI as string;
  const client = new MongoClient(uri);
  try {
    const database = client.db("HealthData");
    const datacollection = database.collection("SampleHealthData");
    const data = (await datacollection
      .find({}, { projection: { processed_data: 1 } })
      .toArray()) as unknown as JSONData[];
    return NextResponse.json({
      status: 200,
      statusText: "OK",
      data: data,
      time: dayjs(),
    });
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
