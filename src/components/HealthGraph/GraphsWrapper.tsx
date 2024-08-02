import React from "react";
import { HealthJSON } from "@/types/types";
import { LineGraph } from "../Graph/LineGraph";
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
  Grid,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import { timeStamp } from "console";

export const GraphsWrapper = ({ data }: { data: HealthJSON }) => {
  const [xAxis, setXAxis] = useState<string[]>(["Time stamp", "general"]);
  const [yAxis, setYAxis] = useState<string[]>(["Time stamp", "general"]);
  const timestamp: number[] =
    data.raw_data.find((field) => field.field == "Time stamp")?.value || [];

  const handleXAxisChange = (event: SelectChangeEvent) => {
    setXAxis(event.target.value.split("_"));
  };

  const handleYAxisChange = (event: SelectChangeEvent) => {
    setYAxis(event.target.value.split("_"));
  };

  return (
    <Box flex={"true"}>
      <Grid
        container
        spacing={{ xs: 2, md: 2 }}
        columns={{ xs: 1, sm: 2, md: 4 }}
        flex="true"
      >
        <Grid item xs={1}>
          <Typography gutterBottom variant="body1" component="div">
            <b>UID: </b> {data._id ? data._id : "Not on the database"}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography gutterBottom variant="body1" component="div">
            <b>Begin Time: </b>
            {new Date(data.processed_data.start_time * 1000).toUTCString()}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography gutterBottom variant="body1" component="div">
            <b>End Time: </b>{" "}
            {new Date(timestamp[timestamp.length - 1] * 1000).toUTCString()}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography gutterBottom variant="body1" component="div">
            <b>Duration</b>:{" "}
            {timestamp[timestamp.length - 1] -
              data.processed_data.start_time +
              1}{" "}
            s
          </Typography>
        </Grid>
      </Grid>

      <Accordion defaultExpanded>
        <AccordionSummary id="panel1-header">
          <Typography>Overview</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <GraphList data={data}></GraphList>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary id="panel2-header">
          <Typography>Graphing</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid
            container
            spacing={{ xs: 2, md: 2 }}
            columns={{ xs: 1, sm: 2, md: 2 }}
            flex="true"
          >
            <Grid item xs={1}>
              <FormControl size="small" fullWidth>
                <InputLabel id="demo-select-small-label">{"X-Axis"}</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={xAxis[0] + "_" + xAxis[1]}
                  label="X-Axis"
                  onChange={handleXAxisChange}
                >
                  <ListSubheader>
                    <b>General</b>
                  </ListSubheader>
                  {data.raw_data
                    .filter((field) => field.type == "general")
                    .map((field) => {
                      return (
                        <MenuItem
                          value={`${field.field}_${field.type}`}
                          key={`${field.field}_${field.type}`}
                        >
                          {field.field}
                        </MenuItem>
                      );
                    })}
                  <ListSubheader>
                    <b>C1</b>
                  </ListSubheader>
                  {data.raw_data
                    .filter((field) => field.type == "c1")
                    .map((field) => {
                      return (
                        <MenuItem
                          value={`${field.field}_${field.type}`}
                          key={`${field.field}_${field.type}`}
                        >
                          {field.field}
                        </MenuItem>
                      );
                    })}
                  <ListSubheader>
                    <b>M1</b>
                  </ListSubheader>
                  {data.raw_data
                    .filter((field) => field.type == "m1")
                    .map((field) => {
                      return (
                        <MenuItem
                          value={`${field.field}_${field.type}`}
                          key={`${field.field}_${field.type}`}
                        >
                          {field.field}
                        </MenuItem>
                      );
                    })}
                  <ListSubheader>
                    <b>M5</b>
                  </ListSubheader>
                  {data.raw_data
                    .filter((field) => field.type == "m5")
                    .map((field) => {
                      return (
                        <MenuItem
                          value={`${field.field}_${field.type}`}
                          key={`${field.field}_${field.type}`}
                        >
                          {field.field}
                        </MenuItem>
                      );
                    })}
                  <ListSubheader>
                    <b>X1</b>
                  </ListSubheader>
                  {data.raw_data
                    .filter((field) => field.type == "x1")
                    .map((field) => {
                      return (
                        <MenuItem
                          value={`${field.field}_${field.type}`}
                          key={`${field.field}_${field.type}`}
                        >
                          {field.field}
                        </MenuItem>
                      );
                    })}
                  <ListSubheader>
                    <b>X123</b>
                  </ListSubheader>
                  {data.raw_data
                    .filter((field) => field.type == "x123")
                    .map((field) => {
                      return (
                        <MenuItem
                          value={`${field.field}_${field.type}`}
                          key={`${field.field}_${field.type}`}
                        >
                          {field.field}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={1}>
              <FormControl size="small" fullWidth>
                <InputLabel id="demo-select-small-label">{"Y-Axis"}</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={yAxis[0] + "_" + yAxis[1]}
                  label="Y-Axis"
                  onChange={handleYAxisChange}
                >
                  <ListSubheader>
                    <b>General</b>
                  </ListSubheader>
                  {data.raw_data
                    .filter((field) => field.type == "general")
                    .map((field) => {
                      return (
                        <MenuItem
                          value={`${field.field}_${field.type}`}
                          key={`${field.field}_${field.type}`}
                        >
                          {field.field}
                        </MenuItem>
                      );
                    })}
                  <ListSubheader>
                    <b>C1</b>
                  </ListSubheader>
                  {data.raw_data
                    .filter((field) => field.type == "c1")
                    .map((field) => {
                      return (
                        <MenuItem
                          value={`${field.field}_${field.type}`}
                          key={`${field.field}_${field.type}`}
                        >
                          {field.field}
                        </MenuItem>
                      );
                    })}
                  <ListSubheader>
                    <b>M1</b>
                  </ListSubheader>
                  {data.raw_data
                    .filter((field) => field.type == "m1")
                    .map((field) => {
                      return (
                        <MenuItem
                          value={`${field.field}_${field.type}`}
                          key={`${field.field}_${field.type}`}
                        >
                          {field.field}
                        </MenuItem>
                      );
                    })}
                  <ListSubheader>
                    <b>M5</b>
                  </ListSubheader>
                  {data.raw_data
                    .filter((field) => field.type == "m5")
                    .map((field) => {
                      return (
                        <MenuItem
                          value={`${field.field}_${field.type}`}
                          key={`${field.field}_${field.type}`}
                        >
                          {field.field}
                        </MenuItem>
                      );
                    })}
                  <ListSubheader>
                    <b>X1</b>
                  </ListSubheader>
                  {data.raw_data
                    .filter((field) => field.type == "x1")
                    .map((field) => {
                      return (
                        <MenuItem
                          value={`${field.field}_${field.type}`}
                          key={`${field.field}_${field.type}`}
                        >
                          {field.field}
                        </MenuItem>
                      );
                    })}
                  <ListSubheader>
                    <b>X123</b>
                  </ListSubheader>
                  {data.raw_data
                    .filter((field) => field.type == "x123")
                    .map((field) => {
                      return (
                        <MenuItem
                          value={`${field.field}_${field.type}`}
                          key={`${field.field}_${field.type}`}
                        >
                          {field.field}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <LineGraph
            xData={
              xAxis[0] == "Timestamp"
                ? data.raw_data.find(
                    (field) => field.field == xAxis[0] && field.type == xAxis[1]
                  )?.value || []
                : data.raw_data.find(
                    (field) => field.field == xAxis[0] && field.type == xAxis[1]
                  )?.value || []
            }
            yData={
              data.raw_data.find(
                (field) => field.field == yAxis[0] && field.type == yAxis[1]
              )?.value || []
            }
            xLabel={`${
              data.raw_data.find(
                (field) => field.field == xAxis[0] && field.type == xAxis[1]
              )?.field || ""
            } (${
              data.raw_data.find(
                (field) => field.field == xAxis[0] && field.type == xAxis[1]
              )?.unit || ""
            })`}
            yLabel={`${
              data.raw_data.find(
                (field) => field.field == yAxis[0] && field.type == yAxis[1]
              )?.field || ""
            } (${
              data.raw_data.find(
                (field) => field.field == yAxis[0] && field.type == yAxis[1]
              )?.unit || ""
            })`}
            title={`${
              data.raw_data.find(
                (field) => field.field == xAxis[0] && field.type == xAxis[1]
              )?.field || ""
            } vs. ${
              data.raw_data.find(
                (field) => field.field == yAxis[0] && field.type == yAxis[1]
              )?.field || ""
            }`}
          />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
