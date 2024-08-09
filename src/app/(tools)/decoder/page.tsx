"use client";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  AlertTitle,
  Box,
  Button,
  Grid,
  Paper,
  Snackbar,
  Step,
  StepLabel,
  Stepper,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import GraphList from "@/components/HealthGraph/GraphsList";
import { GraphsWrapper } from "@/components/HealthGraph/GraphsWrapper";
import { HealthJSON, HealthJSONData } from "@/types/types";
import { jsonValidator } from "@/utils/helpers/jsonValidator";
import { IconUpload } from "@tabler/icons-react";
import PageContainer from "@/components/Container/PageContainer";
import { HealthJSONDataSchema, HealthJSONSchema } from "@/types/jsonSchema";
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

function Step1() {
  const [alignment, setAlignment] = useState("web");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="health">Health</ToggleButton>
      <ToggleButton value="science">Science</ToggleButton>
    </ToggleButtonGroup>
  );
}

export default function QuickLook() {
  const [data, setData] = useState<HealthJSON | null>(null);
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Select Data Type", "Upload Files", "Label Files"];
  const [alignment, setAlignment] = useState("health");
  
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
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

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const csrfResp = await fetch("/csrf-token");
      const { csrfToken } = await csrfResp.json();
      let json: JSON;

      try {
        const data = new FormData();
        data.set("file", file);
        const fetchArgs = {
          method: "POST",
          headers: {},
          body: data,
        };
        if (csrfToken)
          fetchArgs.headers = {
            "X-CSRF-Token": csrfToken,
          };
        const res = await fetch("/api/decode/health", fetchArgs);
        if (!res.ok) throw new Error(await res.text());
        const returndata = await res.json();
        json = returndata.data;
        const valid = await jsonValidator(
          json,
          HealthJSONSchema as JSONSchemaType<any>
        );

        if (valid) {
          setData(json as unknown as HealthJSON);
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
          {steps.map((label, index) => {
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
              All steps completed - you&apos;re finished
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
                onChange={handleChange}
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
              <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
              >
                <ToggleButton value="health">Health</ToggleButton>
                <ToggleButton value="science">Science</ToggleButton>
              </ToggleButtonGroup>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
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
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
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
