import React from "react";
import { HealthJSONData } from "@/types/types";
import { LineGraph } from "./LineGraphNewer";
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
} from "@mui/material";
import { IconCloudDownload } from "@tabler/icons-react";

export const Selector = ({ data }: { data: HealthJSONData }) => {
  return (
    <Box sx={{ p: 2 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ pb: 1 }}
      >
        <Typography gutterBottom variant="body1" component="div">
          <b>UID: </b> Something
        </Typography>
        <Typography gutterBottom variant="body1" component="div">
          <b>Begin Time: </b> 00:00:00
        </Typography>
        <Typography gutterBottom variant="body1" component="div">
          <b>End Time: </b> 00:00:00
        </Typography>
        <Typography gutterBottom variant="body1" component="div">
          <b>Duration</b>: 0
        </Typography>
      </Stack>

      <Divider />
      <GraphList data={data}></GraphList>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ pt: 1 }}
      >
        <FormControl sx={{ m: 1, minWidth: 120, width: 200 }} size="small">
          <InputLabel id="demo-select-small-label">{"X-Axis"}</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            label="X-Axis"
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
        <FormControl sx={{ m: 1, minWidth: 120, width: 200 }} size="small">
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
    </Box>
  );
};
