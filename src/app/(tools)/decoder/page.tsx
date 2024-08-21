"use client";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  AlertTitle,
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Skeleton,
  Snackbar,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { GraphsWrapper } from "@/components/GraphWrapper/GraphsWrapper";
import { DataJSON, HealthJSON } from "@/types/types";
import { jsonValidator } from "@/utils/helpers/jsonValidator";
import { IconUpload, IconTrash, IconPlus } from "@tabler/icons-react";
import PageContainer from "@/components/Container/PageContainer";
import { DataJSONSchema } from "@/types/jsonSchema";
import { JSONSchemaType } from "ajv";

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

function nameValidity(name: string): boolean {
  const nameArgs = name.split("_");

  if (
    nameArgs[0].includes("x123") ||
    nameArgs[0].includes("c1") ||
    nameArgs[0].includes("m1") ||
    nameArgs[0].includes("m5") ||
    nameArgs[0].includes("x1")
  ) {
    return true;
  }

  return false; 
}

interface FileData {
  name: string;
  size: number;
  lastmodified: number;
  valid: boolean;
}

function createFileData(
  name: string,
  size: number,
  lastmodified: number,
  isHealth: boolean
): FileData {
  const valid = nameValidity(name) || isHealth;
  return { name, size, lastmodified, valid };
}

export default function QuickLook() {
  const [data, setData] = useState<DataJSON | null>(null);
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Select Data Type", "Upload Files", "Label Files"];
  const [alignment, setAlignment] = useState("health");
  const [files, setFiles] = useState<File[]>([]);
  const [rows, setRows] = useState<FileData[]>();

  const handleDecoderTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      setFiles([]);
      setRows([]);
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setFiles([]);
    setRows([]);
    setData(null);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleDeletion = (index: number) => {
    setRows((prevRows) => {
      if (prevRows) {
        const newRows = prevRows.slice();
        newRows.splice(index, 1);
        return newRows;
      }
    });
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFiles((oldFiles) => {
      if (event.target.files) {
        const newFiles = Array.from(event.target.files);
        return oldFiles.concat(newFiles);
      } else {
        return oldFiles;
      }
    });
    if (event.target.files != null) {
      let rows: FileData[] = [];
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
        rows.push(
          createFileData(
            file.name,
            file.size,
            file.lastModified,
            alignment == "health"
          )
        );
      }

      setRows((prevrows) => {
        if (prevrows) {
          return prevrows.concat(rows);
        } else {
          return rows;
        }
      });
    }
  };

  const handleGenerate = async () => {
    if (files && files.length > 0 && rows) {
      const csrfResp = await fetch("/csrf-token");
      const { csrfToken } = await csrfResp.json();
      let json: JSON;

      try {
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
          data.append("files", files[i]);
        }

        const fetchArgs = {
          method: "POST",
          headers: {},
          body: data,
        };
        if (csrfToken)
          fetchArgs.headers = {
            "X-CSRF-Token": csrfToken,
          };
        const res =
          alignment == "health"
            ? await fetch("/api/decode/health", fetchArgs)
            : await fetch("/api/decode/science", fetchArgs);
        if (!res.ok) throw new Error(await res.text());
        const returndata = await res.json();
        json = returndata.data;
        console.log(json);
        const valid = await jsonValidator(
          json,
          DataJSONSchema as JSONSchemaType<any>
        );

        if (valid) {
          setData(json as unknown as DataJSON);
          setSuccess(true);
          setOpen(true);
        } else {
          setSuccess(false);
          setOpen(true);
        }
      } catch (e: any) {
        console.error(e);
      }
    }
  };

  return (
    <PageContainer
      title="Decoder / Quick Look"
      description="Decoder / Quick Look"
    >
      <Typography variant="h3" gutterBottom>
        Decoder / Quick Look
      </Typography>
      <Box sx={{ p: 2 }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => {
            const stepProps: { completed?: boolean } = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              {data ? (
                <GraphsWrapper data={data}></GraphsWrapper>
              ) : (
                <Skeleton variant="rectangular" width="100%" height={600} />
              )}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : activeStep === 0 ? (
          <React.Fragment>
            <Box sx={{ p: 2 }}>
              <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleDecoderTypeChange}
                aria-label="Platform"
              >
                <ToggleButton value="health">Health</ToggleButton>
                <ToggleButton value="science">Science</ToggleButton>
              </ToggleButtonGroup>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        ) : activeStep === 1 ? (
          <React.Fragment>
            <Box sx={{ p: 2 }}>
              <Button
                color="primary"
                component="label"
                variant="contained"
                startIcon={<IconUpload />}
              >
                Upload file
                <VisuallyHiddenInput
                  type="file"
                  onChange={handleFileChange}
                  accept="application/gzip"
                  multiple
                />
              </Button>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Size</TableCell>
                    <TableCell align="right">Last Modified</TableCell>
                    <TableCell align="right">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows &&
                    rows.map((row, index) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{`${(row.size / 1000).toFixed(
                          1
                        )} KB`}</TableCell>
                        <TableCell align="right">
                          {new Date(row.lastmodified).toUTCString()}
                        </TableCell>
                        <TableCell align="right">
                          <Tooltip title="Delete File">
                            <IconButton
                              aria-controls={open ? "basic-menu" : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? "true" : undefined}
                              key={index}
                              size="small"
                              onClick={() => {
                                handleDeletion(index);
                              }}
                            >
                              <IconTrash />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext} disabled={files.length == 0}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        ) : activeStep === 2 ? (
          <React.Fragment>
            <Box sx={{ p: 2 }}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Valid File Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows &&
                    rows.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">
                          {row.valid == true ? (
                            <Chip label="Valid" color="success" />
                          ) : (
                            <Chip label="Invalid" color="error" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button
                onClick={() => {
                  handleNext();
                  handleGenerate();
                }}
                disabled={rows && !rows.every((row) => row.valid == true)}
              >
                {activeStep === steps.length - 1 ? "Decode" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Decode" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        {success ? (
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            <AlertTitle>Success</AlertTitle>
            JSON parsed.
          </Alert>
        ) : (
          <Alert
            onClose={handleClose}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            <AlertTitle>Error</AlertTitle>
            Invalid JSON Format.
          </Alert>
        )}
      </Snackbar>
    </PageContainer>
  );
}
