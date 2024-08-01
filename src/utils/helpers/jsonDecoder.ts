import * as path from "path";
import { exec } from "child_process";

export function decode_buffer(file: Buffer): Promise<Buffer> {
  return new Promise(async (resolve, reject) => {
    const scriptPath = path.resolve(
      __dirname,
      "../../../../../../lib/umn-detector-code/python/umndet/tools/decode_health.py"
    );
    const pythonProcess = exec(
      `python ${scriptPath}`,
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

