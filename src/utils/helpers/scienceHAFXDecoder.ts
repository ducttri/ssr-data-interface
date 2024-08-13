import * as path from "path";
import { exec } from "child_process";

type detector = "health" | "c1" | "m1" | "m5" | "x1" | "x123" | "empty";

export function decode_science_hafx(
  fileList: Buffer[],
  fileName: string[]
): Promise<Buffer> {
  return new Promise(async (resolve, reject) => {
    const fileLength = fileList.map((file) => {
      return file.byteLength;
    });
    const sizeInput = fileLength.join("_");
    const names = fileName.join(" ");

    console.log(
      `../../../../../../lib/umn-detector-code/python/umndet/tools/decode_science_hafx.py ${names} ${sizeInput}`
    );

    const scriptPath = path.resolve(
      __dirname,
      `../../../../../../lib/umn-detector-code/python/umndet/tools/decode_science_hafx.py ${names} ${sizeInput}`
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
    fileList.forEach((file) => {
      pythonProcess.stdin?.write(file);
    });
    pythonProcess.stdin?.end();
  });
}
