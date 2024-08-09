import * as path from "path";
import { exec } from "child_process";

export function simulate_science_hafx(
  outputFilename: string,
  numFiles: number,
  secondsPerFile: number,
  time: number
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const scriptPath = path.resolve(
      __dirname,
      "../../../../../../lib/umn-detector-code/python/umndet/tools/simulate_slices.py"
    );
    exec(
      `python3 ${scriptPath} ${outputFilename} ${numFiles} ${secondsPerFile} ${time}`,
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
