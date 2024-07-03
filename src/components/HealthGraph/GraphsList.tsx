"use client";

import { HealthJSONData } from "@/types/types";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Grid, Tab } from "@mui/material";
import { useState } from "react";
import PlotlyGraph from "./PlotlyGraph";

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
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
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
                <PlotlyGraph
                  xData={utcDates}
                  yData={data.raw_data.x123.board_temp.value}
                  xLabel={"Time"}
                  yLabel={"DP5 board temperature"}
                  xUnit={"UTC"}
                  yUnit={data.raw_data.x123.board_temp.unit}
                />
              </Grid>
              <Grid item xs={1} id="parent-container">
                <PlotlyGraph
                  xData={utcDates}
                  yData={data.raw_data.x123.det_high_voltage.value}
                  xLabel={"Time"}
                  yLabel={"Detector high voltage"}
                  xUnit={"UTC"}
                  yUnit={data.raw_data.x123.det_high_voltage.unit}
                />
              </Grid>
              <Grid item xs={1} id="parent-container">
                <PlotlyGraph
                  xData={utcDates}
                  yData={data.raw_data.x123.det_temp.value}
                  xLabel={"Time"}
                  yLabel={"Detector head temperature"}
                  xUnit={"UTC"}
                  yUnit={data.raw_data.x123.det_temp.unit}
                />
              </Grid>
              <Grid item xs={1} id="parent-container">
                <PlotlyGraph
                  xData={utcDates}
                  yData={data.raw_data.x123.fast_counts.value}
                  xLabel={"Time"}
                  yLabel={"Fast sharper # of counts"}
                  xUnit={"UTC"}
                  yUnit={data.raw_data.x123.fast_counts.unit}
                />
              </Grid>
              <Grid item xs={1} id="parent-container">
                <PlotlyGraph
                  xData={utcDates}
                  yData={data.raw_data.x123.slow_counts.value}
                  xLabel={"Time"}
                  yLabel={"Slow sharper $ of counts"}
                  xUnit={"UTC"}
                  yUnit={data.raw_data.x123.slow_counts.unit}
                />
              </Grid>
              <Grid item xs={1} id="parent-container">
                <PlotlyGraph
                  xData={utcDates}
                  yData={data.raw_data.x123.accumulation_time.value}
                  xLabel={"Time"}
                  yLabel={"Accumulation Time"}
                  xUnit={"UTC"}
                  yUnit={data.raw_data.x123.accumulation_time.unit}
                />
              </Grid>
              <Grid item xs={1} id="parent-container">
                <PlotlyGraph
                  xData={utcDates}
                  yData={data.raw_data.x123.real_time.value}
                  xLabel={"Time"}
                  yLabel={"Real Time"}
                  xUnit={"UTC"}
                  yUnit={data.raw_data.x123.real_time.unit}
                />
              </Grid>
            </Grid>
          ) : (
            <Grid container columns={2}>
              <Grid item xs={1} id="parent-container">
                <PlotlyGraph
                  xData={utcDates}
                  yData={data.raw_data[detector].arm_temp.value}
                  xLabel={"Time"}
                  yLabel={"ARM processor temperature"}
                  xUnit={"UTC"}
                  yUnit={data.raw_data[detector].arm_temp.unit}
                />
              </Grid>
              <Grid item xs={1} id="parent-container">
                <PlotlyGraph
                  xData={utcDates}
                  yData={data.raw_data[detector].sipm_temp.value}
                  xLabel={"Time"}
                  yLabel={"SiPM board temperature"}
                  xUnit={"UTC"}
                  yUnit={data.raw_data[detector].sipm_temp.unit}
                />
              </Grid>
              <Grid item xs={1} id="parent-container">
                <PlotlyGraph
                  xData={utcDates}
                  yData={data.raw_data[detector].sipm_operating_voltage.value}
                  xLabel={"Time"}
                  yLabel={"SiPM operating voltage"}
                  xUnit={"UTC"}
                  yUnit={data.raw_data[detector].sipm_operating_voltage.unit}
                />
              </Grid>
              <Grid item xs={1} id="parent-container">
                <PlotlyGraph
                  xData={utcDates}
                  yData={data.raw_data[detector].sipm_target_voltage.value}
                  xLabel={"Time"}
                  yLabel={"SiPM target voltage"}
                  xUnit={"UTC"}
                  yUnit={data.raw_data[detector].sipm_target_voltage.unit}
                />
              </Grid>
              <Grid item xs={1} id="parent-container">
                <PlotlyGraph
                  xData={utcDates}
                  yData={data.raw_data[detector].counts.value}
                  xLabel={"Time"}
                  yLabel={"Counts"}
                  xUnit={"UTC"}
                  yUnit={data.raw_data[detector].counts.unit}
                />
              </Grid>
              <Grid item xs={1} id="parent-container">
                <PlotlyGraph
                  xData={utcDates}
                  yData={data.raw_data[detector].dead_time.value}
                  xLabel={"Time"}
                  yLabel={"Dead Time"}
                  xUnit={"UTC"}
                  yUnit={data.raw_data[detector].dead_time.unit}
                />
              </Grid>
              <Grid item xs={1} id="parent-container">
                <PlotlyGraph
                  xData={utcDates}
                  yData={data.raw_data[detector].real_time.value}
                  xLabel={"Time"}
                  yLabel={"Real Time"}
                  xUnit={"UTC"}
                  yUnit={data.raw_data[detector].real_time.unit}
                />
              </Grid>
            </Grid>
          )}

          {/* <TabPanel value="1">
            <Grid container columns={2}>
              <Grid item xs={1} id="parent-container">
                <PlotlyGraph
                  xData={utcDates}
                  yData={data.raw_data.c1.arm_temp.value}
                  xLabel={"Time"}
                  yLabel={"ARM processor temperature"}
                  xUnit={"UTC"}
                  yUnit={data.raw_data.c1.arm_temp.unit}
                />
              </Grid>
              <Grid item xs={1} id="parent-container">
                <PlotlyGraph
                  xData={utcDates}
                  yData={data.raw_data.c1.sipm_temp.value}
                  xLabel={"Time"}
                  yLabel={"SiPM board temperature"}
                  xUnit={"UTC"}
                  yUnit={data.raw_data.c1.sipm_temp.unit}
                />
              </Grid>
              <Grid item xs={1} id="parent-container">
                <PlotlyGraph
                  xData={utcDates}
                  yData={data.raw_data.c1.sipm_operating_voltage.value}
                  xLabel={"Time"}
                  yLabel={"SiPM operating voltage"}
                  xUnit={"UTC"}
                  yUnit={data.raw_data.c1.sipm_operating_voltage.unit}
                />
              </Grid>
              <Grid item xs={1} id="parent-container">
                <PlotlyGraph
                  xData={utcDates}
                  yData={data.raw_data.c1.sipm_target_voltage.value}
                  xLabel={"Time"}
                  yLabel={"SiPM target voltage"}
                  xUnit={"UTC"}
                  yUnit={data.raw_data.c1.sipm_target_voltage.unit}
                />
              </Grid>
              <Grid item xs={1} id="parent-container">
                <PlotlyGraph
                  xData={utcDates}
                  yData={data.raw_data.c1.counts.value}
                  xLabel={"Time"}
                  yLabel={"Counts"}
                  xUnit={"UTC"}
                  yUnit={data.raw_data.c1.counts.unit}
                />
              </Grid>
              <Grid item xs={1} id="parent-container">
                <PlotlyGraph
                  xData={utcDates}
                  yData={data.raw_data.c1.dead_time.value}
                  xLabel={"Time"}
                  yLabel={"Dead Time"}
                  xUnit={"UTC"}
                  yUnit={data.raw_data.c1.dead_time.unit}
                />
              </Grid>
              <Grid item xs={1} id="parent-container">
                <PlotlyGraph
                  xData={utcDates}
                  yData={data.raw_data.c1.real_time.value}
                  xLabel={"Time"}
                  yLabel={"Real Time"}
                  xUnit={"UTC"}
                  yUnit={data.raw_data.c1.real_time.unit}
                />
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value="2">
            <Grid container columns={2}>
              <Grid item xs={1} id="parent-container">
                <PlotlyGraph
                  xData={utcDates}
                  yData={data.raw_data.m1.arm_temp.value}
                  xLabel={"Time"}
                  yLabel={"ARM processor temperature"}
                  xUnit={"UTC"}
                  yUnit={data.raw_data.m1.arm_temp.unit}
                />
              </Grid>
              <Grid item xs={1} id="parent-container">
                <PlotlyGraph
                  xData={utcDates}
                  yData={data.raw_data.m1.sipm_temp.value}
                  xLabel={"Time"}
                  yLabel={"SiPM board temperature"}
                  xUnit={"UTC"}
                  yUnit={data.raw_data.m1.sipm_temp.unit}
                />
              </Grid>
              <Grid item xs={1} id="parent-container">
                <PlotlyGraph
                  xData={utcDates}
                  yData={data.raw_data.m1.sipm_operating_voltage.value}
                  xLabel={"Time"}
                  yLabel={"SiPM operating voltage"}
                  xUnit={"UTC"}
                  yUnit={data.raw_data.m1.sipm_operating_voltage.unit}
                />
              </Grid>
              <Grid item xs={1} id="parent-container">
                <PlotlyGraph
                  xData={utcDates}
                  yData={data.raw_data.m1.sipm_target_voltage.value}
                  xLabel={"Time"}
                  yLabel={"SiPM target voltage"}
                  xUnit={"UTC"}
                  yUnit={data.raw_data.m1.sipm_target_voltage.unit}
                />
              </Grid>
              <Grid item xs={1} id="parent-container">
                <PlotlyGraph
                  xData={utcDates}
                  yData={data.raw_data.m1.counts.value}
                  xLabel={"Time"}
                  yLabel={"Counts"}
                  xUnit={"UTC"}
                  yUnit={data.raw_data.m1.counts.unit}
                />
              </Grid>
              <Grid item xs={1} id="parent-container">
                <PlotlyGraph
                  xData={utcDates}
                  yData={data.raw_data.m1.dead_time.value}
                  xLabel={"Time"}
                  yLabel={"Dead Time"}
                  xUnit={"UTC"}
                  yUnit={data.raw_data.m1.dead_time.unit}
                />
              </Grid>
              <Grid item xs={1} id="parent-container">
                <PlotlyGraph
                  xData={utcDates}
                  yData={data.raw_data.m1.real_time.value}
                  xLabel={"Time"}
                  yLabel={"Real Time"}
                  xUnit={"UTC"}
                  yUnit={data.raw_data.m1.real_time.unit}
                />
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value="3">
            <Grid container columns={2}>
              <Grid item xs={1} id="parent-container">
                <PlotlyGraph
                  xData={utcDates}
                  yData={data.raw_data.m5.arm_temp.value}
                  xLabel={"Time"}
                  yLabel={"ARM processor temperature"}
                  xUnit={"UTC"}
                  yUnit={data.raw_data.m5.arm_temp.unit}
                />
              </Grid>
              <Grid item xs={1} id="parent-container">
                <PlotlyGraph
                  xData={utcDates}
                  yData={data.raw_data.m5.sipm_temp.value}
                  xLabel={"Time"}
                  yLabel={"SiPM board temperature"}
                  xUnit={"UTC"}
                  yUnit={data.raw_data.m5.sipm_temp.unit}
                />
              </Grid>
              <Grid item xs={1} id="parent-container">
                <PlotlyGraph
                  xData={utcDates}
                  yData={data.raw_data.m5.sipm_operating_voltage.value}
                  xLabel={"Time"}
                  yLabel={"SiPM operating voltage"}
                  xUnit={"UTC"}
                  yUnit={data.raw_data.m5.sipm_operating_voltage.unit}
                />
              </Grid>
              <Grid item xs={1} id="parent-container">
                <PlotlyGraph
                  xData={utcDates}
                  yData={data.raw_data.m5.sipm_target_voltage.value}
                  xLabel={"Time"}
                  yLabel={"SiPM target voltage"}
                  xUnit={"UTC"}
                  yUnit={data.raw_data.m5.sipm_target_voltage.unit}
                />
              </Grid>
              <Grid item xs={1} id="parent-container">
                <PlotlyGraph
                  xData={utcDates}
                  yData={data.raw_data.m5.counts.value}
                  xLabel={"Time"}
                  yLabel={"Counts"}
                  xUnit={"UTC"}
                  yUnit={data.raw_data.m5.counts.unit}
                />
              </Grid>
              <Grid item xs={1} id="parent-container">
                <PlotlyGraph
                  xData={utcDates}
                  yData={data.raw_data.m5.dead_time.value}
                  xLabel={"Time"}
                  yLabel={"Dead Time"}
                  xUnit={"UTC"}
                  yUnit={data.raw_data.m5.dead_time.unit}
                />
              </Grid>
              <Grid item xs={1} id="parent-container">
                <PlotlyGraph
                  xData={utcDates}
                  yData={data.raw_data.m5.real_time.value}
                  xLabel={"Time"}
                  yLabel={"Real Time"}
                  xUnit={"UTC"}
                  yUnit={data.raw_data.m5.real_time.unit}
                />
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value="4">
            <Grid container columns={2}>
              <Grid item xs={1} id="parent-container">
                <PlotlyGraph
                  xData={utcDates}
                  yData={data.raw_data.x1.arm_temp.value}
                  xLabel={"Time"}
                  yLabel={"ARM processor temperature"}
                  xUnit={"UTC"}
                  yUnit={data.raw_data.x1.arm_temp.unit}
                />
              </Grid>
              <Grid item xs={1} id="parent-container">
                <PlotlyGraph
                  xData={utcDates}
                  yData={data.raw_data.x1.sipm_temp.value}
                  xLabel={"Time"}
                  yLabel={"SiPM board temperature"}
                  xUnit={"UTC"}
                  yUnit={data.raw_data.x1.sipm_temp.unit}
                />
              </Grid>
              <Grid item xs={1} id="parent-container">
                <PlotlyGraph
                  xData={utcDates}
                  yData={data.raw_data.x1.sipm_operating_voltage.value}
                  xLabel={"Time"}
                  yLabel={"SiPM operating voltage"}
                  xUnit={"UTC"}
                  yUnit={data.raw_data.x1.sipm_operating_voltage.unit}
                />
              </Grid>
              <Grid item xs={1} id="parent-container">
                <PlotlyGraph
                  xData={utcDates}
                  yData={data.raw_data.x1.sipm_target_voltage.value}
                  xLabel={"Time"}
                  yLabel={"SiPM target voltage"}
                  xUnit={"UTC"}
                  yUnit={data.raw_data.x1.sipm_target_voltage.unit}
                />
              </Grid>
              <Grid item xs={1} id="parent-container">
                <PlotlyGraph
                  xData={utcDates}
                  yData={data.raw_data.x1.counts.value}
                  xLabel={"Time"}
                  yLabel={"Counts"}
                  xUnit={"UTC"}
                  yUnit={data.raw_data.x1.counts.unit}
                />
              </Grid>
              <Grid item xs={1} id="parent-container">
                <PlotlyGraph
                  xData={utcDates}
                  yData={data.raw_data.x1.dead_time.value}
                  xLabel={"Time"}
                  yLabel={"Dead Time"}
                  xUnit={"UTC"}
                  yUnit={data.raw_data.x1.dead_time.unit}
                />
              </Grid>
              <Grid item xs={1} id="parent-container">
                <PlotlyGraph
                  xData={utcDates}
                  yData={data.raw_data.x1.real_time.value}
                  xLabel={"Time"}
                  yLabel={"Real Time"}
                  xUnit={"UTC"}
                  yUnit={data.raw_data.x1.real_time.unit}
                />
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value="5">
            <Grid container columns={2}>
              <Grid item xs={1} id="parent-container">
                <PlotlyGraph
                  xData={utcDates}
                  yData={data.raw_data.x123.board_temp.value}
                  xLabel={"Time"}
                  yLabel={"DP5 board temperature"}
                  xUnit={"UTC"}
                  yUnit={data.raw_data.x123.board_temp.unit}
                />
              </Grid>
              <Grid item xs={1} id="parent-container">
                <PlotlyGraph
                  xData={utcDates}
                  yData={data.raw_data.x123.det_high_voltage.value}
                  xLabel={"Time"}
                  yLabel={"Detector high voltage"}
                  xUnit={"UTC"}
                  yUnit={data.raw_data.x123.det_high_voltage.unit}
                />
              </Grid>
              <Grid item xs={1} id="parent-container">
                <PlotlyGraph
                  xData={utcDates}
                  yData={data.raw_data.x123.det_temp.value}
                  xLabel={"Time"}
                  yLabel={"Detector head temperature"}
                  xUnit={"UTC"}
                  yUnit={data.raw_data.x123.det_temp.unit}
                />
              </Grid>
              <Grid item xs={1} id="parent-container">
                <PlotlyGraph
                  xData={utcDates}
                  yData={data.raw_data.x123.fast_counts.value}
                  xLabel={"Time"}
                  yLabel={"Fast sharper # of counts"}
                  xUnit={"UTC"}
                  yUnit={data.raw_data.x123.fast_counts.unit}
                />
              </Grid>
              <Grid item xs={1} id="parent-container">
                <PlotlyGraph
                  xData={utcDates}
                  yData={data.raw_data.x123.slow_counts.value}
                  xLabel={"Time"}
                  yLabel={"Slow sharper $ of counts"}
                  xUnit={"UTC"}
                  yUnit={data.raw_data.x123.slow_counts.unit}
                />
              </Grid>
              <Grid item xs={1} id="parent-container">
                <PlotlyGraph
                  xData={utcDates}
                  yData={data.raw_data.x123.accumulation_time.value}
                  xLabel={"Time"}
                  yLabel={"Accumulation Time"}
                  xUnit={"UTC"}
                  yUnit={data.raw_data.x123.accumulation_time.unit}
                />
              </Grid>
              <Grid item xs={1} id="parent-container">
                <PlotlyGraph
                  xData={utcDates}
                  yData={data.raw_data.x123.real_time.value}
                  xLabel={"Time"}
                  yLabel={"Real Time"}
                  xUnit={"UTC"}
                  yUnit={data.raw_data.x123.real_time.unit}
                />
              </Grid>
            </Grid>
          </TabPanel> */}
        </TabContext>
      </Box>
    </Grid>
  );
}
