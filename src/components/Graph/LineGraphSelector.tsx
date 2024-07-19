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
import { useState } from "react";

export const Selector = ({ data }: { data: HealthJSONData }) => {
  const [xAxis, setXAxis] = useState<any[]>();
  const [yAxis, setYAxis] = useState<any[]>();


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
                  label="X-Axis"
                >
                  <MenuItem
                    value={0}
                  >
                    Time
                  </MenuItem>
                  <ListSubheader>
                    <b>C1</b>
                  </ListSubheader>
                  <MenuItem value={1}>DP5 board temperature</MenuItem>
                  <MenuItem value={2}>Detector high voltage</MenuItem>
                  <MenuItem value={3}>Detector head temperature</MenuItem>
                  <MenuItem value={4}>Fast sharper # of counts</MenuItem>
                  <MenuItem value={5}>Slow sharper $ of counts</MenuItem>
                  <MenuItem value={6}>Accumulation Time</MenuItem>
                  <MenuItem value={7}>Real Time</MenuItem>
                  <ListSubheader>
                    <b>M1</b>
                  </ListSubheader>
                  <MenuItem value={11}>DP5 board temperature</MenuItem>
                  <MenuItem value={12}>Detector high voltage</MenuItem>
                  <MenuItem value={13}>Detector head temperature</MenuItem>
                  <MenuItem value={14}>Fast sharper # of counts</MenuItem>
                  <MenuItem value={15}>Slow sharper $ of counts</MenuItem>
                  <MenuItem value={16}>Accumulation Time</MenuItem>
                  <MenuItem value={17}>Real Time</MenuItem>
                  <ListSubheader>
                    <b>M5</b>
                  </ListSubheader>
                  <MenuItem value={21}>DP5 board temperature</MenuItem>
                  <MenuItem value={22}>Detector high voltage</MenuItem>
                  <MenuItem value={23}>Detector head temperature</MenuItem>
                  <MenuItem value={24}>Fast sharper # of counts</MenuItem>
                  <MenuItem value={25}>Slow sharper $ of counts</MenuItem>
                  <MenuItem value={26}>Accumulation Time</MenuItem>
                  <MenuItem value={27}>Real Time</MenuItem>
                  <ListSubheader>
                    <b>X1</b>
                  </ListSubheader>
                  <MenuItem value={31}>DP5 board temperature</MenuItem>
                  <MenuItem value={32}>Detector high voltage</MenuItem>
                  <MenuItem value={33}>Detector head temperature</MenuItem>
                  <MenuItem value={34}>Fast sharper # of counts</MenuItem>
                  <MenuItem value={35}>Slow sharper $ of counts</MenuItem>
                  <MenuItem value={36}>Accumulation Time</MenuItem>
                  <MenuItem value={37}>Real Time</MenuItem>
                  <ListSubheader>
                    <b>X123</b>
                  </ListSubheader>
                  <MenuItem value={31}>ARM processor temperature</MenuItem>
                  <MenuItem value={32}>SiPM board temperature</MenuItem>
                  <MenuItem value={33}>SiPM operating voltage</MenuItem>
                  <MenuItem value={34}>SiPM target voltage</MenuItem>
                  <MenuItem value={35}>Counts</MenuItem>
                  <MenuItem value={36}>Dead Time</MenuItem>
                  <MenuItem value={37}>Real Time</MenuItem>
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
                  label="Y-Axis"
                >
                  <MenuItem value={0}>Time</MenuItem>
                  <ListSubheader>
                    <b>C1</b>
                  </ListSubheader>
                  <MenuItem value={1}>DP5 board temperature</MenuItem>
                  <MenuItem value={2}>Detector high voltage</MenuItem>
                  <MenuItem value={3}>Detector head temperature</MenuItem>
                  <MenuItem value={4}>Fast sharper # of counts</MenuItem>
                  <MenuItem value={5}>Slow sharper $ of counts</MenuItem>
                  <MenuItem value={6}>Accumulation Time</MenuItem>
                  <MenuItem value={7}>Real Time</MenuItem>
                  <ListSubheader>
                    <b>M1</b>
                  </ListSubheader>
                  <MenuItem value={11}>DP5 board temperature</MenuItem>
                  <MenuItem value={12}>Detector high voltage</MenuItem>
                  <MenuItem value={13}>Detector head temperature</MenuItem>
                  <MenuItem value={14}>Fast sharper # of counts</MenuItem>
                  <MenuItem value={15}>Slow sharper $ of counts</MenuItem>
                  <MenuItem value={16}>Accumulation Time</MenuItem>
                  <MenuItem value={17}>Real Time</MenuItem>
                  <ListSubheader>
                    <b>M5</b>
                  </ListSubheader>
                  <MenuItem value={21}>DP5 board temperature</MenuItem>
                  <MenuItem value={22}>Detector high voltage</MenuItem>
                  <MenuItem value={23}>Detector head temperature</MenuItem>
                  <MenuItem value={24}>Fast sharper # of counts</MenuItem>
                  <MenuItem value={25}>Slow sharper $ of counts</MenuItem>
                  <MenuItem value={26}>Accumulation Time</MenuItem>
                  <MenuItem value={27}>Real Time</MenuItem>
                  <ListSubheader>
                    <b>X1</b>
                  </ListSubheader>
                  <MenuItem value={31}>DP5 board temperature</MenuItem>
                  <MenuItem value={32}>Detector high voltage</MenuItem>
                  <MenuItem value={33}>Detector head temperature</MenuItem>
                  <MenuItem value={34}>Fast sharper # of counts</MenuItem>
                  <MenuItem value={35}>Slow sharper $ of counts</MenuItem>
                  <MenuItem value={36}>Accumulation Time</MenuItem>
                  <MenuItem value={37}>Real Time</MenuItem>
                  <ListSubheader>
                    <b>X123</b>
                  </ListSubheader>
                  <MenuItem value={31}>ARM processor temperature</MenuItem>
                  <MenuItem value={32}>SiPM board temperature</MenuItem>
                  <MenuItem value={33}>SiPM operating voltage</MenuItem>
                  <MenuItem value={34}>SiPM target voltage</MenuItem>
                  <MenuItem value={35}>Counts</MenuItem>
                  <MenuItem value={36}>Dead Time</MenuItem>
                  <MenuItem value={37}>Real Time</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};
