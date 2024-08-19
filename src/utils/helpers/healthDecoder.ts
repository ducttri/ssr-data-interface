import * as path from "path";
import { exec } from "child_process";
import { DataJSON, ProcessedDataJSON, RawDataJSON } from "@/types/types";

export async function decode_health(files: File[]) {
  const promises = files.map(async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const compressedData = await python_decoder(buffer);
    return JSON.parse(compressedData.toString());
  });

  const decodedJson = combineDataJSON(await Promise.all(promises));

  return decodedJson;
}

function python_decoder(file: Buffer): Promise<Buffer> {
  return new Promise(async (resolve, reject) => {
    const scriptPath = path.resolve(
      __dirname,
      "../../../../../../lib/umn-detector-code/python/umndet/tools/decode_health.py"
    );
    const pythonProcess = exec(
      `python3 ${scriptPath}`,
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

    pythonProcess.stdin?.write(file);
    pythonProcess.stdin?.end();
  });
}

function combineDataJSON(dataArray: DataJSON[]) {
  const combinedData: DataJSON = {
    _id: "",
    processed_data: [],
    raw_data: [],
  };

  dataArray.forEach((data) => {
    data.raw_data.forEach((newItem) => {
      const existingItem = combinedData.raw_data.find(
        (item) => item.field === newItem.field && item.type === newItem.type
      );
      if (existingItem) {
        existingItem.value = existingItem.value.concat(newItem.value);
      } else {
        combinedData.raw_data.push({
          field: newItem.field,
          value: [...newItem.value],
          type: newItem.type,
          unit: newItem.unit,
          data_type: newItem.data_type,
        });
      }
    });
  });

  return combinedData;
}
