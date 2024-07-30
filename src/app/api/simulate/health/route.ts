import { NextRequest, NextResponse } from "next/server";
import * as path from "path";
import { exec } from "child_process";

function simulate_health(
  numPackets: number,
  outputFilename: string
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const scriptPath = path.resolve(
      __dirname,
      "../../../../../../lib/umn-detector-code/python/umndet/tools/simulate_health.py"
    );
    exec(
      `python ${scriptPath} ${numPackets} ${outputFilename}`,
      { encoding: "buffer" },
      (error, stdout, stderr) => {
        if (error) {
          reject(`Error executing Python script: ${error}`);
          return;
        }
        if (stderr.length > 0) {
          reject(`Python script error: ${stderr.toString()}`);
          return;
        }
        resolve(stdout);
      }
    );
  });
}

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
