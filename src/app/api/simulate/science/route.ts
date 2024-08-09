import { NextRequest, NextResponse } from "next/server";
import { simulate_science_hafx } from "@/utils/helpers/scienceHAFXSimulate";
import { WritableStreamBuffer } from "stream-buffers";
import archiver from "archiver";
import { simulate_science_x123 } from "@/utils/helpers/scienceX123Simulate";

export async function GET(req: NextRequest) {
  const numPackets = Number(req.nextUrl.searchParams.get("numPackets") || "0");
  const outputFilename =
    req.nextUrl.searchParams.get("outputFilename") || "output";
  const secondsPerFile = Number(
    req.nextUrl.searchParams.get("secondsPerFile") || "0"
  );
  const detector = req.nextUrl.searchParams.get("detector") || "hafx";
  let time = Math.floor(new Date().getTime() / 1000);

  try {
    const archive = archiver("zip", { zlib: { level: 9 } });
    const writableStreamBuffer = new WritableStreamBuffer();
    archive.pipe(writableStreamBuffer);

    for (let i = 0; i <= numPackets; i++) {
      if (detector == "x123") {
        const stdout = await simulate_science_x123(
          outputFilename,
          numPackets,
          secondsPerFile,
          time + secondsPerFile * i
        );
        archive.append(stdout, { name: `sim-x123-hist_${time}_0.bin.gz` });
      } else if (detector == "hafx") {
        const stdout = await simulate_science_hafx(
          outputFilename,
          numPackets,
          secondsPerFile,
          time + secondsPerFile * i
        );
        archive.append(stdout, { name: `sim-hafx-c1-hist_${time}_0.bin.gz` });
      } else {
        let stdout = await simulate_science_hafx(
          outputFilename,
          numPackets,
          secondsPerFile,
          time + secondsPerFile * i
        );
        archive.append(stdout, {
          name: `sim-hafx-c1-hist_${time}_0.bin.gz`,
        });

        stdout = await simulate_science_hafx(
          outputFilename,
          numPackets,
          secondsPerFile,
          time + secondsPerFile * i
        );
        archive.append(stdout, {
          name: `sim-hafx-m1-hist_${time}_0.bin.gz`,
        });

        stdout = await simulate_science_hafx(
          outputFilename,
          numPackets,
          secondsPerFile,
          time + secondsPerFile * i
        );
        archive.append(stdout, {
          name: `sim-hafx-m5-hist_${time}_0.bin.gz`,
        });

        stdout = await simulate_science_hafx(
          outputFilename,
          numPackets,
          secondsPerFile,
          time + secondsPerFile * i
        );
        archive.append(stdout, {
          name: `sim-hafx-x1-hist_${time}_0.bin.gz`,
        });

        stdout = await simulate_science_x123(
          outputFilename,
          numPackets,
          secondsPerFile,
          time + secondsPerFile * i
        );
        archive.append(stdout, { name: `sim-x123-hist_${time}_0.bin.gz` });
      }
      time += secondsPerFile * i;
    }

    await new Promise<void>((resolve, reject) => {
      archive.on("end", resolve);
      archive.on("error", reject);
      archive.finalize();
    });

    return new NextResponse(writableStreamBuffer.getContents() as Buffer, {
      status: 200,
      statusText: "OK",
      headers: {
        "content-disposition": `attachment; filename="jsons.zip"`,
        "content-type": "application/zip",
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
