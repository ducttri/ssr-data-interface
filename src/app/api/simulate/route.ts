import * as fs from "fs";
import * as zlib from "zlib";
import { WritableStreamBuffer } from "stream-buffers";
import { NextRequest, NextResponse } from "next/server";

const rng = () => Math.random();

interface DetectorHealth {
  c1: HafxHealth;
  m1: HafxHealth;
  m5: HafxHealth;
  x1: HafxHealth;
  x123: X123Health;
  timestamp: number;
}

interface X123Health {
  board_temp: number;
  det_high_voltage: number;
  det_temp: number;
  fast_counts: number;
  slow_counts: number;
  accumulation_time: number;
  real_time: number;
}

interface HafxHealth {
  arm_temp: number;
  sipm_temp: number;
  sipm_operating_voltage: number;
  counts: number;
  dead_time: number;
  real_time: number;
}

const simulate_health = (timestamp: number): DetectorHealth => {
  return {
    c1: simulate_hafx_health(),
    m1: simulate_hafx_health(),
    m5: simulate_hafx_health(),
    x1: simulate_hafx_health(),
    x123: simulate_x123_health(),
    timestamp: timestamp,
  };
};

const simulate_x123_health = (): X123Health => {
  const fc = Math.floor(rng() * (1e6 - 1e4) + 1e4);
  const at = Math.floor(rng() * 2e6);

  return {
    board_temp: Math.floor(rng() * 100 - 50),
    det_high_voltage: Math.floor(rng() * 600 - 800),
    det_temp: Math.floor(rng() * 1000 + 1500),
    fast_counts: fc,
    slow_counts: Math.floor(rng() * (fc - 0.2 * fc) + 0.2 * fc),
    accumulation_time: at,
    real_time: Math.floor(rng() * at * 2 + at),
  };
};

const simulate_hafx_health = (): HafxHealth => {
  const dt = Math.floor(rng() * (1e9 - 1000) + 1000);

  return {
    arm_temp: Math.floor(rng() * (31000 - 26000) + 26000),
    sipm_temp: Math.floor(rng() * (33000 - 24000) + 24000),
    sipm_operating_voltage: Math.floor(rng() * (3900 - 2800) + 2800),
    counts: Math.floor(rng() * (1e5 - 10) + 10),
    dead_time: dt,
    real_time: Math.floor(rng() * dt * 1000 + dt),
  };
};

export async function GET(req: NextRequest) {
  const numPackets = Number(req.nextUrl.searchParams.get("numPackets") || "0");
  const outputFilename =
    req.nextUrl.searchParams.get("outputFilename") || "output";

  console.log(numPackets);
  console.log(outputFilename);

  // Create a WritableStreamBuffer to hold the raw binary data
  const writableStreamBuffer = new WritableStreamBuffer({
    initialSize: 100 * 1024, // Start at 100 kilobytes.
    incrementAmount: 10 * 1024, // Grow by 10 kilobytes each time buffer overflows.
  });

  let ts = Math.floor(Date.now() / 1000);

  for (let i = 0; i < numPackets; i++) {
    const healthData = simulate_health(ts);
    writableStreamBuffer.write(Buffer.from(JSON.stringify(healthData) + "\n"));
    ts += 1;
  }

  // Retrieve the binary data from the buffer
  const binaryData = writableStreamBuffer.getContents() as Buffer;
  try {
    const compressedData = await gzipPromise(binaryData);

    return new NextResponse(compressedData, {
      status: 200,
      statusText: "OK",
      headers: {
        "Content-Disposition": `attachment; filename="${outputFilename}.gz"`,
        "Content-Type": "application/octet-stream",
      },
    });
  } catch (error) {
    console.error("Compression error:", error);
    return NextResponse.json({
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}

const gzipPromise = (data: Buffer): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    zlib.gzip(data, (err, compressedData) => {
      if (err) {
        reject(err);
      } else {
        resolve(compressedData);
      }
    });
  });
};
