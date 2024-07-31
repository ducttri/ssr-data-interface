"use client";

import { HealthJSON } from "@/types/types";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Grid, Tab } from "@mui/material";
import { useState } from "react";
import { LineGraph } from "../Graph/LineGraph";

type detect = "c1" | "m1" | "m5" | "x1" | "x123";

export default function GraphList({ data }: { data: HealthJSON }) {
  const [detector, setDetector] = useState<detect>("c1");

  const utcDates: string[] =
    data.raw_data
      .find((field) => field.field == "Time stamp")
      ?.value.map((timestamp: number) => {
        return new Date(timestamp * 1000).toISOString();
      }) || [];

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

          <Grid container spacing={{ xs: 2, md: 3 }} columns={{sm: 1, md: 2}}>
            {data.raw_data
              .filter((type) => type.type == detector.toString())
              .map((item) => {
                return (
                  <Grid item xs={1} key={`${detector}_${item.field}`}>
                    <LineGraph
                      xData={utcDates}
                      yData={item.value}
                      xLabel={"Time"}
                      yLabel={`${item.field} (${item.unit})`}
                      title={`${item.field} vs. Time`}
                    />
                  </Grid>
                );
              })}
          </Grid>
        </TabContext>
      </Box>
    </Grid>
  );
}
