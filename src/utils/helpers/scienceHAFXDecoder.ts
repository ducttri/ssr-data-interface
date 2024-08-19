import * as path from "path";
import { exec } from "child_process";
import {
  DataJSON,
  HAFXScienceDecodedJSON,
  ProcessedDataJSON,
  RawDataJSON,
} from "@/types/types";
import { error } from "console";

type detector = "c1" | "m1" | "m5" | "x1" | "x123" | "empty";

interface hafxFieldName {
  ch: "Channel";
  num_evts: "Number of Events";
  num_triggers: "Number of triggers";
  dead_time: "Dead Time";
  anode_current: "Anode Current";
  histogram: "Histogram";
  timestamp: "Timestamp";
  buffer_number: "Buffer Number";
  missed_pps: "Missed PPS";
  datatype: "Data Type";
}

const typeName: hafxFieldName = {
  ch: "Channel",
  num_evts: "Number of Events",
  num_triggers: "Number of triggers",
  dead_time: "Dead Time",
  anode_current: "Anode Current",
  histogram: "Histogram",
  timestamp: "Timestamp",
  buffer_number: "Buffer Number",
  missed_pps: "Missed PPS",
  datatype: "Data Type",
};

const typeKey = {
  num_evts: "Number of Events",
  num_triggers: "Number of triggers",
  dead_time: "Dead Time",
  anode_current: "Anode Current",
  histogram: "Histogram",
  timestamp: "Time",
};

function identifyFile(name: string): detector {
  if (name.includes("x123")) {
    return "x123";
  } else if (name.includes("c1")) {
    return "c1";
  } else if (name.includes("m1")) {
    return "m1";
  } else if (name.includes("m5")) {
    return "m5";
  } else if (name.includes("x1")) {
    return "x1";
  } else return "empty";
}

interface detectorList {
  c1: File[];
  m1: File[];
  m5: File[];
  x1: File[];
  x123: File[];
}

export async function decode_science(files: File[]) {
  let fileList: detectorList = {
    c1: [],
    m1: [],
    m5: [],
    x1: [],
    x123: [],
  };

  files.forEach((file) => {
    const detector = identifyFile(file.name);
    if (detector != "empty") {
      fileList[detector].push(file);
    }
  });

  let finalJson;

  for (const key in fileList) {
    if (Object.prototype.hasOwnProperty.call(fileList, key)) {
      const typedKey = key as keyof detectorList;
      const fileArray: File[] = fileList[typedKey];
      if (fileArray.length != 0) {
        const promises = fileArray.map(async (file) => {
          const arrayBuffer = await file.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const compressedData = await python_decoder(buffer, file.name);
          return JSON.parse(compressedData.toString());
        });

        const decodedJson = decode(combine_json(await Promise.all(promises)));
        if (finalJson == undefined) {
          finalJson = decodedJson as DataJSON;
        } else {
          finalJson = combineDataJSON(
            finalJson as DataJSON,
            decodedJson as DataJSON
          );
        }
      }
    }
  }

  if (finalJson != undefined) {
    const data = removeDuplicateTimestamps(finalJson);
    if (areTimestampsEqual(data)) {
      return data;
    } else {
      error("Files timestamp are not consistent");
      return undefined;
    }
  }

  return finalJson;
}

function python_decoder(file: Buffer, fileName: string): Promise<Buffer> {
  return new Promise(async (resolve, reject) => {
    const scriptPath = path.resolve(
      __dirname,
      `../../../../../../lib/umn-detector-code/python/umndet/tools/decode_science_hafx.py`
    );
    const pythonProcess = exec(
      `python3 ${scriptPath} ${fileName}`,
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

function combine_json(HAFXJson: HAFXScienceDecodedJSON[]) {
  let combined: HAFXScienceDecodedJSON = {
    ch: { unit: "", value: [] },
    buffer_number: { unit: "", value: [] },
    num_evts: { unit: "", value: [] },
    num_triggers: { unit: "", value: [] },
    dead_time: { unit: "", value: [] },
    anode_current: { unit: "", value: [] },
    histogram: { unit: "", value: [] },
    missed_pps: { unit: "", value: [] },
    timestamp: { unit: "", value: [] },
    datatype: { unit: "", value: [] },
  };

  for (const item of HAFXJson) {
    for (const key in combined) {
      if (Object.prototype.hasOwnProperty.call(combined, key)) {
        const typedKey = key as keyof HAFXScienceDecodedJSON;

        combined[typedKey].value = combined[typedKey].value.concat(
          item[typedKey].value
        );
      }
    }
  }

  // combined.histogram.value.sort((a, b) => a - b);
  let output = combined.histogram.value[0].map((_: any, colIndex: number) =>
    combined.histogram.value.map((row) => row[colIndex])
  );

  combined.histogram.value = output;

  return combined;
}

function decode(HAFXJson: HAFXScienceDecodedJSON) {
  let rawdata: RawDataJSON[] = [];
  let processed_data: ProcessedDataJSON[] = [];

  for (const key in typeKey) {
    if (Object.prototype.hasOwnProperty.call(HAFXJson, key)) {
      const typedKey = key as keyof HAFXScienceDecodedJSON;

      let new_raw: RawDataJSON = {
        type: typedKey == "timestamp" ? "general" : HAFXJson.ch.value[0],
        field: typeName[typedKey],
        unit: HAFXJson[typedKey].unit,
        value: HAFXJson[typedKey].value,
        data_type: typedKey == "histogram" ? "spectrogram" : "linear",
      };

      rawdata.push(new_raw);
    }
  }

  const json = { raw_data: rawdata, processed_data: processed_data };

  return json;
}

function combineDataJSON(data1: DataJSON, data2: DataJSON) {
  const combinedProcessedData: ProcessedDataJSON[] = [
    ...data1.processed_data,
    ...data2.processed_data,
  ];

  const combinedRawData: RawDataJSON[] = [...data1.raw_data, ...data2.raw_data];

  return {
    processed_data: combinedProcessedData,
    raw_data: combinedRawData,
  };
}

function removeDuplicateTimestamps(data: { raw_data: any[] }): {
  raw_data: any[];
} {
  const seenTimestamps = new Set<string>();

  const filteredRawData = data.raw_data.filter((item) => {
    if (item.field === "Timestamp") {
      const serializedTimestamp = JSON.stringify(item.value);

      if (seenTimestamps.has(serializedTimestamp)) {
        return false;
      } else {
        seenTimestamps.add(serializedTimestamp);
        return true;
      }
    }

    return true;
  });

  return { ...data, raw_data: filteredRawData };
}

function areTimestampsEqual(data: { raw_data: any[] }): boolean {
  const timestampArrays = data.raw_data
    .filter((item) => item.field === "Timestamp")
    .map((item) => item.value);

  if (timestampArrays.length <= 1) return true;

  const firstTimestampArray = JSON.stringify(timestampArrays[0]);

  for (let i = 1; i < timestampArrays.length; i++) {
    if (JSON.stringify(timestampArrays[i]) !== firstTimestampArray) {
      return false;
    }
  }

  return true;
}
