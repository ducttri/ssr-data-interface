"use client";

import { DataJSON, HealthJSON } from "@/types/types";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Grid, Paper, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { LineGraph } from "../Graph/LineGraph";
import { ThreeDSpectrogram } from "../Graph/ThreeDSpectrogram";

const reversed_bins = [
  0, 32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, 480,
  512, 544, 576, 608, 640, 672, 704, 736, 768, 800, 832, 864, 896, 928, 960,
  992, 1024, 1056, 1088, 1120, 1152, 1184, 1216, 1248, 1280, 1312, 1344, 1376,
  1408, 1440, 1472, 1504, 1536, 1568, 1600, 1632, 1664, 1696, 1728, 1760, 1792,
  1824, 1856, 1888, 1920, 1952, 1984, 2016, 2048, 2080, 2112, 2144, 2176, 2208,
  2240, 2272, 2304, 2336, 2368, 2400, 2432, 2464, 2496, 2528, 2560, 2592, 2624,
  2656, 2688, 2720, 2752, 2784, 2816, 2848, 2880, 2912, 2944, 2976, 3008, 3040,
  3072, 3104, 3136, 3168, 3200, 3232, 3264, 3296, 3328, 3360, 3392, 3424, 3456,
  3488, 3520, 3552, 3584, 3616, 3648, 3680, 3712, 3744, 3776, 3808, 3840, 3872,
  3904, 4097,
];

export default function GraphList({ data }: { data: DataJSON }) {
  const [detector, setDetector] = useState<string>("c1");

  const utcDates: string[] =
    data.raw_data
      .find((field) => field.field == "timestamp" && field.type == "general")
      ?.value.map((timestamp: number) => {
        return new Date(timestamp).toISOString();
      }) || [];

  const handleDetectorChange = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setDetector(newValue);
  };

  return (
    <Grid>
      <Box
        sx={{
          typography: "body1",
          borderRadius: 1,
          boxShadow: 1,
        }}
      >
        <TabContext value={detector}>
          <Box sx={{ maxWidth: { xs: 320, sm: 600 } }}>
            <Tabs
              onChange={handleDetectorChange}
              aria-label="lab API tabs example"
              variant="scrollable"
              scrollButtons="auto"
              value={detector}
            >
              <Tab label="C1" value="c1" />
              <Tab label="M1" value="m1" />
              <Tab label="M5" value="m5" />
              <Tab label="X1" value="x1" />
              <Tab label="X123" value="x123" />
            </Tabs>
          </Box>

          <Grid
            container
            spacing={{ xs: 2, md: 2 }}
            columns={{ sm: 1, md: 2 }}
            sx={{ p: 2 }}
          >
            {data.raw_data
              .filter((type) => type.type == detector.toString())
              .map((item) => {
                if (item.data_type == "linear") {
                  return (
                    <Grid item xs={1} key={`${detector}_${item.field}`}>
                      <Paper>
                        <LineGraph
                          xData={utcDates}
                          yData={item.value}
                          xLabel={"Time"}
                          yLabel={`${item.field} (${item.unit})`}
                          title={`${item.field} vs. Time`}
                        />
                      </Paper>
                    </Grid>
                  );
                } else {
                  return (
                    <Grid item xs={1} key={`${detector}_${item.field}`}>
                      <Paper>
                        <ThreeDSpectrogram
                          xData={utcDates}
                          yData={reversed_bins}
                          zData={item.value}
                          xLabel={"Time (UTC)"}
                          yLabel={"Normal Bridgeport ADC bin"}
                          title={"Counts spectrogram"}
                        />
                      </Paper>
                    </Grid>
                  );
                }
              })}
          </Grid>
        </TabContext>
      </Box>
    </Grid>
  );
}
