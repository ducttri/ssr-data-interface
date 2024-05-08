"use client";

import { Box, Button, Grid, Tab, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
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
  timestamp: number[];
  x123: {
    accumulation_time: {
      unit: string;
      value: number[];
    };
    board_temp: {
      unit: string;
      value: number[];
    };
    det_high_voltage: {
      unit: string;
      value: number[];
    };
    det_temp: {
      unit: string;
      value: number[];
    };
    fast_counts: {
      unit: string;
      value: number[];
    };
    real_time: {
      unit: string;
      value: number[];
    };
    slow_counts: {
      unit: string;
      value: number[];
    };
  };
  x1: {
    arm_temp: {
      unit: string;
      value: number[];
    };
    counts: {
      unit: string;
      value: number[];
    };
    dead_time: {
      unit: string;
      value: number[];
    };
    real_time: {
      unit: string;
      value: number[];
    };
    sipm_operating_voltage: {
      unit: string;
      value: number[];
    };
    sipm_target_voltage: {
      unit: string;
      value: number[];
    };
    sipm_temp: {
      unit: string;
      value: number[];
    };
  };
  c1: {
    arm_temp: {
      unit: string;
      value: number[];
    };
    counts: {
      unit: string;
      value: number[];
    };
    dead_time: {
      unit: string;
      value: number[];
    };
    real_time: {
      unit: string;
      value: number[];
    };
    sipm_operating_voltage: {
      unit: string;
      value: number[];
    };
    sipm_target_voltage: {
      unit: string;
      value: number[];
    };
    sipm_temp: {
      unit: string;
      value: number[];
    };
  };
  m1: {
    arm_temp: {
      unit: string;
      value: number[];
    };
    counts: {
      unit: string;
      value: number[];
    };
    dead_time: {
      unit: string;
      value: number[];
    };
    real_time: {
      unit: string;
      value: number[];
    };
    sipm_operating_voltage: {
      unit: string;
      value: number[];
    };
    sipm_target_voltage: {
      unit: string;
      value: number[];
    };
    sipm_temp: {
      unit: string;
      value: number[];
    };
  };
  m5: {
    arm_temp: {
      unit: string;
      value: number[];
    };
    counts: {
      unit: string;
      value: number[];
    };
    dead_time: {
      unit: string;
      value: number[];
    };
    real_time: {
      unit: string;
      value: number[];
    };
    sipm_operating_voltage: {
      unit: string;
      value: number[];
    };
    sipm_target_voltage: {
      unit: string;
      value: number[];
    };
    sipm_temp: {
      unit: string;
      value: number[];
    };
  };
}

export default function QuickLook() {
  const [isLoading, setIsLoading] = useState(false);
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [detector, setDetector] = useState("1");
  const [data, setData] = useState<{
    time_stamp: string[];
    x123: number[][];
    x1: number[][];
    c1: number[][];
    m1: number[][];
    m5: number[][];
  }>();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const iszipped: boolean = file.name.endsWith(".json.gz") ? true : false;
      let json: JSONData;
      if (!iszipped) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target?.result) {
            try {
              json = JSON.parse(e.target.result as string);
              let x123Data: number[][] = [];
              x123Data[0] = json.x123.accumulation_time.value;
              x123Data[1] = json.x123.det_high_voltage.value;
              x123Data[2] = json.x123.det_temp.value;
              x123Data[3] = json.x123.fast_counts.value;
              x123Data[4] = json.x123.slow_counts.value;
              x123Data[5] = json.x123.accumulation_time.value;
              x123Data[6] = json.x123.real_time.value;

              let x1Data: number[][] = [];
              x1Data[0] = json.x1.arm_temp.value;
              x1Data[1] = json.x1.sipm_temp.value;
              x1Data[2] = json.x1.sipm_operating_voltage.value;
              x1Data[3] = json.x1.sipm_target_voltage.value;
              x1Data[4] = json.x1.counts.value;
              x1Data[5] = json.x1.dead_time.value;
              x1Data[6] = json.x1.real_time.value;

              let c1Data: number[][] = [];
              c1Data[0] = json.c1.arm_temp.value;
              c1Data[1] = json.c1.sipm_temp.value;
              c1Data[2] = json.c1.sipm_operating_voltage.value;
              c1Data[3] = json.c1.sipm_target_voltage.value;
              c1Data[4] = json.c1.counts.value;
              c1Data[5] = json.c1.dead_time.value;
              c1Data[6] = json.c1.real_time.value;

              let m1Data: number[][] = [];
              m1Data[0] = json.m1.arm_temp.value;
              m1Data[1] = json.m1.sipm_temp.value;
              m1Data[2] = json.m1.sipm_operating_voltage.value;
              m1Data[3] = json.m1.sipm_target_voltage.value;
              m1Data[4] = json.m1.counts.value;
              m1Data[5] = json.m1.dead_time.value;
              m1Data[6] = json.m1.real_time.value;

              let m5Data: number[][] = [];
              m5Data[0] = json.m5.arm_temp.value;
              m5Data[1] = json.m5.sipm_temp.value;
              m5Data[2] = json.m5.sipm_operating_voltage.value;
              m5Data[3] = json.m5.sipm_target_voltage.value;
              m5Data[4] = json.m5.counts.value;
              m5Data[5] = json.m5.dead_time.value;
              m5Data[6] = json.m5.real_time.value;

              const utcDates: string[] = json["timestamp"].map((timestamp) => {
                return new Date(timestamp * 1000).toISOString();
              });

              setData({
                time_stamp: utcDates,
                x123: x123Data,
                x1: x1Data,
                c1: c1Data,
                m1: m1Data,
                m5: m5Data,
              });
            } catch (error) {
              console.error("Error parsing JSON:", error);
            }
          }
        };
        reader.readAsText(file);
      } else {
        try {
          const data = new FormData();
          data.set("file", file);
          const res = await fetch("/api/upload", {
            method: "POST",
            body: data,
          });
          if (!res.ok) throw new Error(await res.text());
          const returndata = await res.json();
          json = returndata.data;
          let x123Data: number[][] = [];
          x123Data[0] = json.x123.accumulation_time.value;
          x123Data[1] = json.x123.det_high_voltage.value;
          x123Data[2] = json.x123.det_temp.value;
          x123Data[3] = json.x123.fast_counts.value;
          x123Data[4] = json.x123.slow_counts.value;
          x123Data[5] = json.x123.accumulation_time.value;
          x123Data[6] = json.x123.real_time.value;

          let x1Data: number[][] = [];
          x1Data[0] = json.x1.arm_temp.value;
          x1Data[1] = json.x1.sipm_temp.value;
          x1Data[2] = json.x1.sipm_operating_voltage.value;
          x1Data[3] = json.x1.sipm_target_voltage.value;
          x1Data[4] = json.x1.counts.value;
          x1Data[5] = json.x1.dead_time.value;
          x1Data[6] = json.x1.real_time.value;

          let c1Data: number[][] = [];
          c1Data[0] = json.c1.arm_temp.value;
          c1Data[1] = json.c1.sipm_temp.value;
          c1Data[2] = json.c1.sipm_operating_voltage.value;
          c1Data[3] = json.c1.sipm_target_voltage.value;
          c1Data[4] = json.c1.counts.value;
          c1Data[5] = json.c1.dead_time.value;
          c1Data[6] = json.c1.real_time.value;

          let m1Data: number[][] = [];
          m1Data[0] = json.m1.arm_temp.value;
          m1Data[1] = json.m1.sipm_temp.value;
          m1Data[2] = json.m1.sipm_operating_voltage.value;
          m1Data[3] = json.m1.sipm_target_voltage.value;
          m1Data[4] = json.m1.counts.value;
          m1Data[5] = json.m1.dead_time.value;
          m1Data[6] = json.m1.real_time.value;

          let m5Data: number[][] = [];
          m5Data[0] = json.m5.arm_temp.value;
          m5Data[1] = json.m5.sipm_temp.value;
          m5Data[2] = json.m5.sipm_operating_voltage.value;
          m5Data[3] = json.m5.sipm_target_voltage.value;
          m5Data[4] = json.m5.counts.value;
          m5Data[5] = json.m5.dead_time.value;
          m5Data[6] = json.m5.real_time.value;

          const utcDates: string[] = json["timestamp"].map((timestamp) => {
            return new Date(timestamp * 1000).toISOString();
          });

          setData({
            time_stamp: utcDates,
            x123: x123Data,
            x1: x1Data,
            c1: c1Data,
            m1: m1Data,
            m5: m5Data,
          });
        } catch (e: any) {
          console.error(e);
        }
      }
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
            accept="application/json,application/gzip"
          />
        </Button>
      </Grid>
      {data && (
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
                  <Tab label="C1" value="1" />
                  <Tab label="M1" value="2" />
                  <Tab label="M5" value="3" />
                  <Tab label="X1" value="4" />
                  <Tab label="X123" value="5" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Grid container columns={2}>
                  {data?.c1.map((item, index) => (
                    <Grid item xs={1} id="parent-container" key={index}>
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
              <TabPanel value="2">
                <Grid container columns={2}>
                  {data?.m1.map((item, index) => (
                    <Grid item xs={1} id="parent-container" key={index}>
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
                  {data?.m5.map((item, index) => (
                    <Grid item xs={1} id="parent-container" key={index}>
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
                  {data?.x1.map((item, index) => (
                    <Grid item xs={1} id="parent-container" key={index}>
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
                  {data?.x123.map((item, index) => (
                    <Grid item xs={1} id="parent-container" key={index}>
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
            </TabContext>
          </Box>
        </Grid>
      )}
    </Grid>
  );
}
