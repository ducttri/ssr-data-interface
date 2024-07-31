"use client";

import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Grid,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import GraphList from "@/components/HealthGraph/GraphsList";
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

export default function QuickLook() {
  const [data, setData] = useState<HealthJSON | null>(null);
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(true);

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
      <Grid container columns={16}>
        <Grid item xs={16}>
          <Typography variant="h3" gutterBottom>
            Decoder / Quick Look
          </Typography>
        </Grid>
        <Grid item xs={3}>
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
              accept="application/json,application/gzip"
            />
          </Button>
        </Grid>
        <Grid container columns={2}>
          <Box sx={{ pt: 2 }}>
            {data && <GraphList data={data}></GraphList>}
          </Box>
        </Grid>
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
      </Grid>
    </PageContainer>
  );
}
