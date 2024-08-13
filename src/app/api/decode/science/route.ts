import { decode_science_hafx } from "@/utils/helpers/scienceHAFXDecoder";
import { NextRequest, NextResponse } from "next/server";

type detector = "health" | "c1" | "m1" | "m5" | "x1" | "x123" | "empty";

interface FileData {
  name: string;
  size: number;
  lastmodified: number;
  type: detector;
}

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const files: File[] | null = Array.from(data.get("files") as unknown as File[]);
  const filesData: FileData[] =
    JSON.parse(data.get("filesData") as string) || [];

  console.log(filesData);

  if (!files) {
    return NextResponse.json({
      success: false,
      status: 400,
      statusText: "Didn't include a file.",
    });
  }

    console.log("pass 1");


  const c1BuffersPromises = files.map(async (file, index) => {
    if (filesData && filesData[index].type == "c1") {
      const arrayBuffer = await file.arrayBuffer();
      return Buffer.from(arrayBuffer);
    }
  });

    console.log("pass 2");


  const c1Buffers = (await Promise.all(c1BuffersPromises)).filter(
    (item): item is Buffer => item !== undefined
  );

    console.log("pass 3");


  const c1Names = filesData?.map((file) => {
    return file.name;
  });

    console.log("pass 4");

  console.log(c1Buffers)

  if (c1Buffers) {
    console.log("pass 5");
    const compressedData = await decode_science_hafx(c1Buffers, c1Names);
    const jsonData = JSON.parse(compressedData.toString());
    console.log(jsonData);
  }

    console.log("pass 6");


  try {
    const c1BuffersPromises = files.map(async (file, index) => {
      if (filesData && filesData[index].type == "c1") {
        const arrayBuffer = await file.arrayBuffer();
        return Buffer.from(arrayBuffer);
      }
    });

    const c1Buffers = (await Promise.all(c1BuffersPromises)).filter(
      (item): item is Buffer => item !== undefined
    );

    const c1Names = filesData?.map((file) => {
      return file.name;
    });

    if (c1Buffers && c1Buffers.length > 0) {
      console.log("pass");
      const compressedData = await decode_science_hafx(c1Buffers, c1Names);
      const jsonData = JSON.parse(compressedData.toString());
      console.log(jsonData);
    }

    return NextResponse.json({
      success: true,
      status: 200,
      statusText: "Successfully decoded",
      //   data: jsonData,
    });
  } catch (e) {
    console.error("Failed to parse data: " + e);
    return NextResponse.json({
      success: false,
      status: 400,
      statusText: "Error processing file.",
      error: "Error processing file.",
    });
  }
}
``;
