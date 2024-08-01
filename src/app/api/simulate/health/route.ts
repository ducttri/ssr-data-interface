import { NextRequest, NextResponse } from "next/server";
import { simulate_health } from "@/utils/helpers/healthSimulate";

export async function GET(req: NextRequest) {
  const numPackets = Number(req.nextUrl.searchParams.get("numPackets") || "0");
  const outputFilename =
    req.nextUrl.searchParams.get("outputFilename") || "output";
    
  try {
    const stdout = await simulate_health(numPackets, outputFilename);

    return new NextResponse(stdout, {
      status: 200,
      statusText: "OK",
      headers: {
        "Content-Disposition": `attachment; filename="${outputFilename}.bin.gz"`,
        "Content-Type": "application/octet-stream",
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
