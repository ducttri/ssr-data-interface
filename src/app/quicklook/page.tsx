"use client";

import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Tab, Tabs, Typography } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Plot from "react-plotly.js";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

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
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [detector, setDetector] = React.useState("");
  const [data, setData] = useState<{
    time_stamp: number[];
    x123: number[][];
  }>();
  let currentDate: Date;

  function insertionSort(x: number[], y: number[][]) : void {
    for (let i: number = 1; i < x.length; i ++) {
      let key: number = x[i];
      let key2: number[] = [];
      for (let n = 0; n < y.length; n++) {
        key2[n] = y[n][i];
      }
      let j: number = i - 1;
      while (j >= 0 && x[j] > key) {
        x[j + 1] = x[j];
        for (let n = 0; n < y.length; n++) {
          y[n][j + 1] = y[n][j];
        }
        j = j - 1;
      }
      x[j+1] = key;
      for (let n = 0; n < y.length; n++) {
        y[n][j + 1] = key2[n];
      }
    }
    console.log(x);
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          try {
            const json: JSONData[] = JSON.parse(e.target.result as string);

            let xData = json.map((item) => item.timestamp);
            // let x123Data = json.map((item) => item.x123);
            let x123Data: number[][] =[];
            x123Data[0] = json.map((item) => item.x123.accumulation_time);
            x123Data[1] = json.map((item) => item.x123.board_temp);
            x123Data[2] = json.map((item) => item.x123.det_high_voltage);
            x123Data[3] = json.map((item) => item.x123.det_temp);
            x123Data[4] = json.map((item) => item.x123.fast_counts);
            x123Data[5] = json.map((item) => item.x123.real_time);
            x123Data[6] = json.map((item) => item.x123.slow_counts);






            // let x1Data = json.map((item) => item.x1);
            // let c1Data = json.map((item) => item.c1);
            // let m1Data = json.map((item) => item.m1);
            // let m5Data = json.map((item) => item.m5);

            insertionSort(xData, x123Data);
            const starttime = xData[0];
            xData = xData.map((item) => item - starttime);
            currentDate = new Date(starttime*1000);
            console.log(x123Data);
            setData({ time_stamp: xData, x123: x123Data});
            setFileContent(currentDate.toLocaleString()); // Pretty print the JSON

            // setFileContent(JSON.stringify(json[0].timestamp, null, 2)); // Pretty print the JSON
          } catch (error) {
            console.error("Error parsing JSON:", error);
            setFileContent("Error reading the file");
          }
        }
      };
      reader.readAsText(file);
    }
  };

  const handleDetectorChange = (event: React.SyntheticEvent, newValue: string) => {
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
                  {data?.x123.map((item) => (
                  <Grid item xs={1}>
                    <Plot
                      data={[
                        {
                          x: data?.time_stamp,
                          y: item,
                          type: "scatter",
                        },
                      ]}
                      layout={{
                        width: self.parent.innerWidth * 0.45,
                        height: 400,
                        title: "something here",
                      }}
                    />
                  </Grid>
                  ))}
                </Grid>
              </TabPanel>
              <TabPanel value="2">X1</TabPanel>
              <TabPanel value="3">C1</TabPanel>
              <TabPanel value="4">M1</TabPanel>
              <TabPanel value="5">M5</TabPanel>
            </TabContext>
          </Box>
        </Grid>
      )}
    </Grid>
  );
}
