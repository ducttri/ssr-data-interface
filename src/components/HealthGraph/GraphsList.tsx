"use client";

import { HealthJSONData } from "@/types/types";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Grid, Tab } from "@mui/material";
import { useState } from "react";
import { LineGraph } from "../Graph/LineGraph";

type detect = "c1" | "m1" | "m5" | "x1" | "x123"

export default function GraphList({ data }: { data: HealthJSONData }) {
  const [detector, setDetector] = useState<detect>("c1");

  const utcDates: string[] = data.raw_data.timestamp.map(
    (timestamp: number) => {
      return new Date(timestamp * 1000).toISOString();
    }
  );

  const handleDetectorChange = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setDetector(newValue as detect);
  };

  return (
    <Grid>
      <Box
        sx={{
          width: "100%",
          typography: "body1",
          borderRadius: 1,
          boxShadow: 1,
        }}
      >
        <TabContext value={detector}>
          <Box>
            <TabList
              onChange={handleDetectorChange}
              aria-label="lab API tabs example"
            >
              <Tab label="C1" value="c1" />
              <Tab label="M1" value="m1" />
              <Tab label="M5" value="m5" />
              <Tab label="X1" value="x1" />
              <Tab label="X123" value="x123" />
            </TabList>
          </Box>

          {detector == "x123" ? (
            <Grid container columns={2}>
              <Grid item xs={1} id="parent-container">
                <LineGraph
                  xData={utcDates}
                  yData={data.raw_data.x123.board_temp.value}
                  xLabel={"Time"}
                  yLabel={`DP5 board temperature (${data.raw_data.x123.board_temp.unit})`}
                  title="DP5 board temperaturevs. Time"
                />
              </Grid>
              <Grid item xs={1} id="parent-container">
                <LineGraph
                  xData={utcDates}
                  yData={data.raw_data.x123.det_high_voltage.value}
                  xLabel={"Time"}
                  yLabel={`Detector high voltage (${data.raw_data.x123.det_high_voltage.unit})`}
                  title="Detector high voltage vs. Time"
                />
              </Grid>
              <Grid item xs={1} id="parent-container">
                <LineGraph
                  xData={utcDates}
                  yData={data.raw_data.x123.det_temp.value}
                  xLabel={"Time"}
                  yLabel={`Detector head temperature (${data.raw_data.x123.det_temp.unit})`}
                  title="Detector head temperature vs. Time"
                />
              </Grid>
              <Grid item xs={1} id="parent-container">
                <LineGraph
                  xData={utcDates}
                  yData={data.raw_data.x123.fast_counts.value}
                  xLabel={"Time"}
                  yLabel={`Fast sharper # of counts (${data.raw_data.x123.fast_counts.unit})`}
                  title="Fast sharper # of counts vs. Time"
                />
              </Grid>
              <Grid item xs={1} id="parent-container">
                <LineGraph
                  xData={utcDates}
                  yData={data.raw_data.x123.slow_counts.value}
                  xLabel={"Time"}
                  yLabel={`Slow sharper $ of counts (${data.raw_data.x123.slow_counts.unit})`}
                  title="Slow sharper $ of counts vs. Time"
                />
              </Grid>
              <Grid item xs={1} id="parent-container">
                <LineGraph
                  xData={utcDates}
                  yData={data.raw_data.x123.accumulation_time.value}
                  xLabel={"Time"}
                  yLabel={`Accumulation Time (${data.raw_data.x123.accumulation_time.unit})`}
                  title="Accumulation Time"
                />
              </Grid>
            </Grid>
          ) : (
            <Grid container columns={2}>
              <Grid item xs={1} id="parent-container">
                <LineGraph
                  xData={utcDates}
                  yData={data.raw_data[detector].arm_temp.value}
                  xLabel={"Time"}
                  yLabel={`ARM processor temperature (${data.raw_data[detector].arm_temp.unit})`}
                  title="ARM processor temperature vs. Time"
                />
              </Grid>
              <Grid item xs={1} id="parent-container">
                <LineGraph
                  xData={utcDates}
                  yData={data.raw_data[detector].sipm_temp.value}
                  xLabel={"Time"}
                  yLabel={`SiPM board temperature (${data.raw_data[detector].sipm_temp.unit})`}
                  title="SiPM board temperature vs. Time"
                />
              </Grid>
              <Grid item xs={1} id="parent-container">
                <LineGraph
                  xData={utcDates}
                  yData={data.raw_data[detector].sipm_operating_voltage.value}
                  xLabel="Time"
                  yLabel={`SiPM operating voltage ${data.raw_data[detector].sipm_operating_voltage.unit}`}
                  title="SiPM operating voltage vs. Time"
                />
              </Grid>
              <Grid item xs={1} id="parent-container">
                <LineGraph
                  xData={utcDates}
                  yData={data.raw_data[detector].sipm_target_voltage.value}
                  xLabel={"Time"}
                  yLabel={`SiPM target voltage (${data.raw_data[detector].sipm_target_voltage.unit})`}
                  title="SiPM target voltage vs. Time"
                />
              </Grid>
              <Grid item xs={1} id="parent-container">
                <LineGraph
                  xData={utcDates}
                  yData={data.raw_data[detector].dead_time.value}
                  xLabel={"Time"}
                  yLabel={`Dead Time (${data.raw_data[detector].dead_time.unit})`}
                  title="Dead Time vs. Time"
                />
              </Grid>
            </Grid>
          )}
        </TabContext>
      </Box>
    </Grid>
  );
}
