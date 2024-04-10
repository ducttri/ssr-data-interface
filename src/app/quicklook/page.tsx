"use client";

import { Box, Button, Grid, Tab, Typography } from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import Plot from "react-plotly.js";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import dynamic from "next/dynamic";
import PlotlyGraph from "@/components/PlotlyGraph";
import { CircularProgress } from "@mui/material";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const JSONDataLabel: string[][][] = [
  [
    ["DP5 board temperature", "1", " ºC"],
    ["Detector high voltage", "0.5", "V"],
    ["Detector head temperature", "0.1", "K"],
    ["Fast shaper # of counts", "1", "Counts"],
    ["Slow shaper # of counts", "1", "Counts"],
    ["Accumulation Time", "1", "ms"],
    ["Real time", "1", "ms"],
  ],
  [
    ["ARM processor temperature", "0.01", "K"],
    ["SiPM board temperature", "0.01", "K"],
    ["SiPM operating voltage", "0.01", "V"],
    ["SiPM target voltage", "0.01", "V"],
    ["Counts", "1", "Counts"],
    ["Dead time", "0.000000025", "s"],
    ["Real time", "0.000000025", "s"],
  ],
  [
    ["ARM processor temperature", "0.01", "K"],
    ["SiPM board temperature", "0.01", "K"],
    ["SiPM operating voltage", "0.01", "V"],
    ["SiPM target voltage", "0.01", "V"],
    ["Counts", "1", "Counts"],
    ["Dead time", "0.000000025", "s"],
    ["Real time", "0.000000025", "s"],
  ],
  [
    ["ARM processor temperature", "0.01", "K"],
    ["SiPM board temperature", "0.01", "K"],
    ["SiPM operating voltage", "0.01", "V"],
    ["SiPM target voltage", "0.01", "V"],
    ["Counts", "1", "Counts"],
    ["Dead time", "0.000000025", "s"],
    ["Real time", "0.000000025", "s"],
  ],
  [
    ["ARM processor temperature", "0.01", "K"],
    ["SiPM board temperature", "0.01", "K"],
    ["SiPM operating voltage", "0.01", "V"],
    ["SiPM target voltage", "0.01", "V"],
    ["Counts", "1", "Counts"],
    ["Dead time", "0.000000025", "s"],
    ["Real time", "0.000000025", "s"],
  ],
];

interface JSONData {
  timestamp: number;
  x123: {
    accumulation_time: number;
    board_temp: number;
    det_high_voltage: number;
    det_temp: number;
    fast_counts: number;
    real_time: number;
    slow_counts: number;
  };
  x1: {
    arm_temp: number;
    counts: number;
    dead_time: number;
    real_time: number;
    sipm_operating_voltage: number;
    sipm_target_voltage: number;
    sipm_temp: number;
  };
  c1: {
    arm_temp: number;
    counts: number;
    dead_time: number;
    real_time: number;
    sipm_operating_voltage: number;
    sipm_target_voltage: number;
    sipm_temp: number;
  };
  m1: {
    arm_temp: number;
    counts: number;
    dead_time: number;
    real_time: number;
    sipm_operating_voltage: number;
    sipm_target_voltage: number;
    sipm_temp: number;
  };
  m5: {
    arm_temp: number;
    counts: number;
    dead_time: number;
    real_time: number;
    sipm_operating_voltage: number;
    sipm_target_voltage: number;
    sipm_temp: number;
  };
}

export default function QuickLook() {
  const [isLoading, setIsLoading] = useState(false);
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [detector, setDetector] = useState("1");
  const [data, setData] = useState<{
    time_stamp: number[];
    x123: number[][];
    x1: number[][];
    c1: number[][];
    m1: number[][];
    m5: number[][];
  }>();
  let currentDate: Date;

  function insertionSort(x: number[], y: number[][][]): void {
    for (let i: number = 1; i < x.length; i++) {
      let key: number = x[i];
      let key2: number[][] = [];

      // Initialize key2 with appropriate dimensions
      for (let n = 0; n < y.length; n++) {
        key2[n] = [];
        for (let m = 0; m < y[0].length; m++) {
          key2[n][m] = y[n][m][i];
        }
      }

      let j: number = i - 1;
      while (j >= 0 && x[j] > key) {
        x[j + 1] = x[j];
        for (let n = 0; n < y.length; n++) {
          for (let m = 0; m < y[0].length; m++) {
            y[n][m][j + 1] = y[n][m][j];
          }
        }
        j--;
      }
      x[j + 1] = key;
      for (let n = 0; n < y.length; n++) {
        for (let m = 0; m < y[0].length; m++) {
          y[n][m][j + 1] = key2[n][m];
        }
      }
    }
  }

  function quickSort(
    x: number[],
    y: number[][][],
    left: number = 0,
    right: number = x.length - 1
  ): void {
    if (left < right) {
      const pivot = partition(x, y, left, right);
      quickSort(x, y, left, pivot - 1);
      quickSort(x, y, pivot + 1, right);
    }
  }

  function partition(
    x: number[],
    y: number[][][],
    left: number,
    right: number
  ): number {
    const pivot = x[Math.floor((left + right) / 2)];
    let i = left;
    let j = right;

    while (i <= j) {
      while (x[i] < pivot) {
        i++;
      }
      while (x[j] > pivot) {
        j--;
      }
      if (i <= j) {
        [x[i], x[j]] = [x[j], x[i]];
        for (let n = 0; n < y.length; n++) {
          [y[n][i], y[n][j]] = [y[n][j], y[n][i]];
        }
        i++;
        j--;
      }
    }
    return i;
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      setIsLoading(true); // start loading

      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          try {
            const json: JSONData[] = JSON.parse(e.target.result as string);

            let xData = json.map((item) => item.timestamp);

            let x123Data: number[][] = [];
            x123Data[0] = json.map((item) => item.x123.board_temp);
            x123Data[1] = json.map((item) => item.x123.det_high_voltage);
            x123Data[2] = json.map((item) => item.x123.det_temp);
            x123Data[3] = json.map((item) => item.x123.fast_counts);
            x123Data[4] = json.map((item) => item.x123.slow_counts);
            x123Data[5] = json.map((item) => item.x123.accumulation_time);
            x123Data[6] = json.map((item) => item.x123.real_time);

            let x1Data: number[][] = [];
            x1Data[0] = json.map((item) => item.x1.arm_temp);
            x1Data[1] = json.map((item) => item.x1.sipm_temp);
            x1Data[2] = json.map((item) => item.x1.sipm_operating_voltage);
            x1Data[3] = json.map((item) => item.x1.sipm_target_voltage);
            x1Data[4] = json.map((item) => item.x1.counts);
            x1Data[5] = json.map((item) => item.x1.dead_time);
            x1Data[6] = json.map((item) => item.x1.real_time);

            let c1Data: number[][] = [];
            c1Data[0] = json.map((item) => item.c1.arm_temp);
            c1Data[1] = json.map((item) => item.c1.sipm_temp);
            c1Data[2] = json.map((item) => item.c1.sipm_operating_voltage);
            c1Data[3] = json.map((item) => item.c1.sipm_target_voltage);
            c1Data[4] = json.map((item) => item.c1.counts);
            c1Data[5] = json.map((item) => item.c1.dead_time);
            c1Data[6] = json.map((item) => item.c1.real_time);

            let m1Data: number[][] = [];
            m1Data[0] = json.map((item) => item.m1.arm_temp);
            m1Data[1] = json.map((item) => item.m1.sipm_temp);
            m1Data[2] = json.map((item) => item.m1.sipm_operating_voltage);
            m1Data[3] = json.map((item) => item.m1.sipm_target_voltage);
            m1Data[4] = json.map((item) => item.m1.counts);
            m1Data[5] = json.map((item) => item.m1.dead_time);
            m1Data[6] = json.map((item) => item.m1.real_time);

            let m5Data: number[][] = [];
            m5Data[0] = json.map((item) => item.m5.arm_temp);
            m5Data[1] = json.map((item) => item.m5.sipm_temp);
            m5Data[2] = json.map((item) => item.m5.sipm_operating_voltage);
            m5Data[3] = json.map((item) => item.m5.sipm_target_voltage);
            m5Data[4] = json.map((item) => item.m5.counts);
            m5Data[5] = json.map((item) => item.m5.dead_time);
            m5Data[6] = json.map((item) => item.m5.real_time);

            insertionSort(xData, [x123Data, x1Data, c1Data, m1Data, m5Data]);
            // quickSort(xData, [x123Data, x1Data, c1Data, m1Data, m5Data]);
            const starttime = xData[0];
            xData = xData.map((item) => item - starttime);
            currentDate = new Date(starttime * 1000);
            for (let i = 0; i < x123Data[0].length; i++) {
              for (let j = 0; j < x123Data.length; j++) {
                x123Data[j][i] =
                  x123Data[j][i] * parseInt(JSONDataLabel[0][j][1]);
              }
            }

            setData({
              time_stamp: xData,
              x123: x123Data,
              x1: x1Data,
              c1: c1Data,
              m1: m1Data,
              m5: m5Data,
            });
            setFileContent(currentDate.toLocaleString());

            // setFileContent(JSON.stringify(json[0].timestamp, null, 2)); // Pretty print the JSON
          } catch (error) {
            console.error("Error parsing JSON:", error);
            setFileContent("Error reading the file");
          } finally {
            setIsLoading(false); // Stop loading
          }
        }
      };
      reader.readAsText(file);
    }
  };

  const handleDetectorChange = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setDetector(newValue);
  };

  return (
    <Grid container columns={16}>
      <Grid item xs={3}>
        <Typography variant="h3" gutterBottom>
          Quick Look
        </Typography>
        <Button
          color="primary"
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          Upload file
          <VisuallyHiddenInput
            type="file"
            onChange={handleFileChange}
            accept="application/json"
          />
        </Button>
        {fileContent && (
          <Typography
            variant="body1"
            style={{ whiteSpace: "pre-wrap", marginTop: "20px" }}
          >
            Data Time: {fileContent}
          </Typography>
        )}
      </Grid>
      {fileContent && (
        <Grid item xs={16}>
          <Box sx={{ width: "100%", typography: "body1" }}>
            {/* LOADING ICON */}
            {/* {isLoading ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="400px"
              >
                <CircularProgress />
              </Box>
            ) : ( */}
            <TabContext value={detector}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleDetectorChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="X123" value="1" />
                  <Tab label="X1" value="2" />
                  <Tab label="C1" value="3" />
                  <Tab label="M1" value="4" />
                  <Tab label="M5" value="5" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Grid container columns={2}>
                  {data?.x123.map((item, index) => (
                    <Grid item xs={1} key={index} id="parent-container">
                      <PlotlyGraph
                        xData={data?.time_stamp}
                        yData={item}
                        xLabel={"Time"}
                        yLabel={JSONDataLabel[0][index][0]}
                        xUnit={"s"}
                        yUnit={JSONDataLabel[0][index][2]}
                      />
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>
              <TabPanel value="2">
                <Grid container columns={2}>
                  {data?.x1.map((item, index) => (
                    <Grid item xs={1} key={index} id="parent-container">
                      <PlotlyGraph
                        xData={data?.time_stamp}
                        yData={item}
                        xLabel={"Time"}
                        yLabel={JSONDataLabel[1][index][0]}
                        xUnit={"s"}
                        yUnit={JSONDataLabel[1][index][2]}
                      />
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>
              <TabPanel value="3">
                <Grid container columns={2}>
                  {data?.c1.map((item, index) => (
                    <Grid item xs={1} key={index} id="parent-container">
                      <PlotlyGraph
                        xData={data?.time_stamp}
                        yData={item}
                        xLabel={"Time"}
                        yLabel={JSONDataLabel[2][index][0]}
                        xUnit={"s"}
                        yUnit={JSONDataLabel[2][index][2]}
                      />
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>
              <TabPanel value="4">
                <Grid container columns={2}>
                  {data?.m1.map((item, index) => (
                    <Grid item xs={1} key={index} id="parent-container">
                      <PlotlyGraph
                        xData={data?.time_stamp}
                        yData={item}
                        xLabel={"Time"}
                        yLabel={JSONDataLabel[3][index][0]}
                        xUnit={"s"}
                        yUnit={JSONDataLabel[3][index][2]}
                      />
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>
              <TabPanel value="5">
                <Grid container columns={2}>
                  {data?.m5.map((item, index) => (
                    <Grid item xs={1} key={index} id="parent-container">
                      <PlotlyGraph
                        xData={data?.time_stamp}
                        yData={item}
                        xLabel={"Time"}
                        yLabel={JSONDataLabel[4][index][0]}
                        xUnit={"s"}
                        yUnit={JSONDataLabel[4][index][2]}
                      />
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
      )}
    </Grid>
  );
}
