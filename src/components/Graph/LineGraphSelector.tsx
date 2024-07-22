import React from "react";
import { HealthJSONData, RawHealthType } from "@/types/types";
import { LineGraph } from "./LineGraph";
import GraphList from "@/components/HealthGraph/GraphsList";
import {
  Box,
  Divider,
  Typography,
  Stack,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  ListSubheader,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";

export const Selector = ({ data }: { data: HealthJSONData }) => {
  const [xAxis, setXAxis] = useState<string>("");
  const [yAxis, setYAxis] = useState<string>("");

  const handleXAxisChange = (event: SelectChangeEvent) => {
    setXAxis(event.target.value[0] + " - " + event.target.value[1]);
  };

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ p: 2 }}
      >
        <Typography gutterBottom variant="body1" component="div">
          <b>UID: </b> {data._id}
        </Typography>
        <Typography gutterBottom variant="body1" component="div">
          <b>Begin Time: </b>
          {new Date(data.processed_data.start_time * 1000).toUTCString()}
        </Typography>
        <Typography gutterBottom variant="body1" component="div">
          <b>End Time: </b>{" "}
          {new Date(
            data.raw_data.timestamp[data.raw_data.timestamp.length - 1] * 1000
          ).toUTCString()}
        </Typography>
        <Typography gutterBottom variant="body1" component="div">
          <b>Duration</b>:{" "}
          {data.raw_data.timestamp[data.raw_data.timestamp.length - 1] -
            data.processed_data.start_time}{" "}
          s
        </Typography>
      </Stack>

      <Box sx={{ p: 2 }}>
        <Accordion>
          <AccordionSummary id="panel1-header">
            <Typography>Overview</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <GraphList data={data}></GraphList>
          </AccordionDetails>
        </Accordion>
      </Box>

      <Box sx={{ p: 2 }}>
        <Accordion>
          <AccordionSummary id="panel2-header">
            <Typography>Graphing</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ pt: 1 }}
            >
              <FormControl
                sx={{ m: 1, minWidth: 120, width: 200 }}
                size="small"
              >
                <InputLabel id="demo-select-small-label">{"X-Axis"}</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={xAxis}
                  label="X-Axis"
                  onChange={handleXAxisChange}
                >
                  <MenuItem value={["timestamp", "timestamp"]}>Time</MenuItem>
                  <ListSubheader>
                    <b>C1</b>
                  </ListSubheader>
                  <MenuItem value={["c1", "arm_temp"]}>
                    ARM processor temperature
                  </MenuItem>
                  <MenuItem value={["c1", "sipm_temp"]}>
                    SiPM board temperature
                  </MenuItem>
                  <MenuItem value={["c1", "sipm_operating_voltage"]}>
                    SiPM operating voltage
                  </MenuItem>
                  <MenuItem value={["c1", "sipm_target_voltage"]}>
                    SiPM target voltage
                  </MenuItem>
                  <MenuItem value={["c1", "counts"]}>Counts</MenuItem>
                  <MenuItem value={["c1", "dead_time"]}>Dead Time</MenuItem>
                  <MenuItem value={["c1", "real_time"]}>Real Time</MenuItem>
                  <ListSubheader>
                    <b>M1</b>
                  </ListSubheader>
                  <MenuItem value={["m1", "arm_temp"]}>
                    ARM processor temperature
                  </MenuItem>
                  <MenuItem value={["m1", "sipm_temp"]}>
                    SiPM board temperature
                  </MenuItem>
                  <MenuItem value={["m1", "sipm_operating_voltage"]}>
                    SiPM operating voltage
                  </MenuItem>
                  <MenuItem value={["m1", "sipm_target_voltage"]}>
                    SiPM target voltage
                  </MenuItem>
                  <MenuItem value={["m1", "counts"]}>Counts</MenuItem>
                  <MenuItem value={["m1", "dead_time"]}>Dead Time</MenuItem>
                  <MenuItem value={["m1", "real_time"]}>Real Time</MenuItem>
                  <ListSubheader>
                    <b>M5</b>
                  </ListSubheader>
                  <MenuItem value={["m5", "arm_temp"]}>
                    ARM processor temperature
                  </MenuItem>
                  <MenuItem value={["m5", "sipm_temp"]}>
                    SiPM board temperature
                  </MenuItem>
                  <MenuItem value={["m5", "sipm_operating_voltage"]}>
                    SiPM operating voltage
                  </MenuItem>
                  <MenuItem value={["m5", "sipm_target_voltage"]}>
                    SiPM target voltage
                  </MenuItem>
                  <MenuItem value={["m5", "counts"]}>Counts</MenuItem>
                  <MenuItem value={["m5", "dead_time"]}>Dead Time</MenuItem>
                  <MenuItem value={["m5", "real_time"]}>Real Time</MenuItem>
                  <ListSubheader>
                    <b>X1</b>
                  </ListSubheader>
                  <MenuItem value={["x1", "arm_temp"]}>
                    ARM processor temperature
                  </MenuItem>
                  <MenuItem value={["x1", "sipm_temp"]}>
                    SiPM board temperature
                  </MenuItem>
                  <MenuItem value={["x1", "sipm_operating_voltage"]}>
                    SiPM operating voltage
                  </MenuItem>
                  <MenuItem value={["x1", "sipm_target_voltage"]}>
                    SiPM target voltage
                  </MenuItem>
                  <MenuItem value={["x1", "counts"]}>Counts</MenuItem>
                  <MenuItem value={["x1", "dead_time"]}>Dead Time</MenuItem>
                  <MenuItem value={["x1", "real_time"]}>Real Time</MenuItem>
                  <ListSubheader>
                    <b>X123</b>
                  </ListSubheader>
                  <MenuItem value={["x123", "board_temp"]}>
                    DP5 board temperature
                  </MenuItem>
                  <MenuItem value={["x123", "det_high_voltage"]}>
                    Detector high voltage
                  </MenuItem>
                  <MenuItem value={["x123", "det_temp"]}>
                    Detector head temperature
                  </MenuItem>
                  <MenuItem value={["x123", "fast_counts"]}>
                    Fast sharper # of counts
                  </MenuItem>
                  <MenuItem value={["x123", "slow_counts"]}>
                    Slow sharper $ of counts
                  </MenuItem>
                  <MenuItem value={["x123", "accumulation_time"]}>
                    Accumulation Time
                  </MenuItem>
                  <MenuItem value={["x123", "real_time"]}>Real Time</MenuItem>
                </Select>
              </FormControl>
              <FormControl
                sx={{ m: 1, minWidth: 120, width: 200 }}
                size="small"
              >
                <InputLabel id="demo-select-small-label">{"Y-Axis"}</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  label="X-Axis"
                >
                  <MenuItem value={["timestamp", "timestamp"]}>Time</MenuItem>
                  <ListSubheader>
                    <b>C1</b>
                  </ListSubheader>
                  <MenuItem value={["c1", "arm_temp"]}>
                    ARM processor temperature
                  </MenuItem>
                  <MenuItem value={["c1", "sipm_temp"]}>
                    SiPM board temperature
                  </MenuItem>
                  <MenuItem value={["c1", "sipm_operating_voltage"]}>
                    SiPM operating voltage
                  </MenuItem>
                  <MenuItem value={["c1", "sipm_target_voltage"]}>
                    SiPM target voltage
                  </MenuItem>
                  <MenuItem value={["c1", "counts"]}>Counts</MenuItem>
                  <MenuItem value={["c1", "dead_time"]}>Dead Time</MenuItem>
                  <MenuItem value={["c1", "real_time"]}>Real Time</MenuItem>
                  <ListSubheader>
                    <b>M1</b>
                  </ListSubheader>
                  <MenuItem value={["m1", "arm_temp"]}>
                    ARM processor temperature
                  </MenuItem>
                  <MenuItem value={["m1", "sipm_temp"]}>
                    SiPM board temperature
                  </MenuItem>
                  <MenuItem value={["m1", "sipm_operating_voltage"]}>
                    SiPM operating voltage
                  </MenuItem>
                  <MenuItem value={["m1", "sipm_target_voltage"]}>
                    SiPM target voltage
                  </MenuItem>
                  <MenuItem value={["m1", "counts"]}>Counts</MenuItem>
                  <MenuItem value={["m1", "dead_time"]}>Dead Time</MenuItem>
                  <MenuItem value={["m1", "real_time"]}>Real Time</MenuItem>
                  <ListSubheader>
                    <b>M5</b>
                  </ListSubheader>
                  <MenuItem value={["m5", "arm_temp"]}>
                    ARM processor temperature
                  </MenuItem>
                  <MenuItem value={["m5", "sipm_temp"]}>
                    SiPM board temperature
                  </MenuItem>
                  <MenuItem value={["m5", "sipm_operating_voltage"]}>
                    SiPM operating voltage
                  </MenuItem>
                  <MenuItem value={["m5", "sipm_target_voltage"]}>
                    SiPM target voltage
                  </MenuItem>
                  <MenuItem value={["m5", "counts"]}>Counts</MenuItem>
                  <MenuItem value={["m5", "dead_time"]}>Dead Time</MenuItem>
                  <MenuItem value={["m5", "real_time"]}>Real Time</MenuItem>
                  <ListSubheader>
                    <b>X1</b>
                  </ListSubheader>
                  <MenuItem value={["x1", "arm_temp"]}>
                    ARM processor temperature
                  </MenuItem>
                  <MenuItem value={["x1", "sipm_temp"]}>
                    SiPM board temperature
                  </MenuItem>
                  <MenuItem value={["x1", "sipm_operating_voltage"]}>
                    SiPM operating voltage
                  </MenuItem>
                  <MenuItem value={["x1", "sipm_target_voltage"]}>
                    SiPM target voltage
                  </MenuItem>
                  <MenuItem value={["x1", "counts"]}>Counts</MenuItem>
                  <MenuItem value={["x1", "dead_time"]}>Dead Time</MenuItem>
                  <MenuItem value={["x1", "real_time"]}>Real Time</MenuItem>
                  <ListSubheader>
                    <b>X123</b>
                  </ListSubheader>
                  <MenuItem value={["x123", "board_temp"]}>
                    DP5 board temperature
                  </MenuItem>
                  <MenuItem value={["x123", "det_high_voltage"]}>
                    Detector high voltage
                  </MenuItem>
                  <MenuItem value={["x123", "det_temp"]}>
                    Detector head temperature
                  </MenuItem>
                  <MenuItem value={["x123", "fast_counts"]}>
                    Fast sharper # of counts
                  </MenuItem>
                  <MenuItem value={["x123", "slow_counts"]}>
                    Slow sharper $ of counts
                  </MenuItem>
                  <MenuItem value={["x123", "accumulation_time"]}>
                    Accumulation Time
                  </MenuItem>
                  <MenuItem value={["x123", "real_time"]}>Real Time</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};
