"use client";

import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Plot from "react-plotly.js";

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
  const [data, setData] = useState<{ x: number[]; y: number[] }>({
    x: [],
    y: [],
  });
  let currentDate: Date;

  function insertionSort(x: number[], y: number[]) : void {
    for (let i: number = 1; i < x.length; i ++) {
      let key: number = x[i];
      let key2: number = y[i];
      let j: number = i - 1;
      while (j >= 0 && x[j] > key) {
        x[j + 1] = x[j];
        y[j + 1] = y[j];
        j = j - 1;
      }
      x[j+1] = key;
      y[j+1] = key2;
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
            let yData = json.map((item) => item.x123.board_temp);

            insertionSort(xData, yData);
            const starttime = xData[0];
            xData = xData.map((item) => item - starttime);
            currentDate = new Date(starttime*1000);

            setData({ x: xData, y: yData });
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

  return (
    <Box>
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
          {fileContent}
          <Plot
            data={[{ x: data.x, y: data.y, type: "scatter" }]}
            layout={{ width: 600, height: 400, title: "Board Temperature vs. Time" }}
          />
        </Typography>
      )}
    </Box>
  );
}
