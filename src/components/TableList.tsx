import { JSONData } from "@/types/types";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Grid, Tab } from "@mui/material";
import { useState } from "react";
import PlotlyGraph from "./PlotlyGraph";
import EnhancedTable from "./Table";

export default function TableList({ data }: { data: JSONData[] }) {
  const [detector, setDetector] = useState("1");

  const handleDetectorChange = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setDetector(newValue);
  };

  return (
    <Grid>
      <Box sx={{ width: "100%", typography: "body1" }}>
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
            <EnhancedTable inputData={data} detector="c1"></EnhancedTable>
          </TabPanel>

          <TabPanel value="2">
            <EnhancedTable inputData={data} detector="m1"></EnhancedTable>
          </TabPanel>

          <TabPanel value="3">
            <EnhancedTable inputData={data} detector="m5"></EnhancedTable>
          </TabPanel>

          <TabPanel value="4">
            <EnhancedTable inputData={data} detector="x1"></EnhancedTable>
          </TabPanel>

          <TabPanel value="5">
            <Grid container columns={2}></Grid>
          </TabPanel>
        </TabContext>
      </Box>
    </Grid>
  );
}
