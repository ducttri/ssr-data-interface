"use client";

import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Grid,
  Snackbar,
  Tab,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import dynamic from "next/dynamic";
import GraphList from "@/components/healthGraph/GraphsList";
import { JSONData } from "@/types/types";
import { jsonValidator } from "@/utils/helpers/jsonValidator";
import { IconUpload } from "@tabler/icons-react";

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
  const [data, setData] = useState<JSONData | null>(null);
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
      const iszipped: boolean = file.name.endsWith(".json.gz") ? true : false;
      let json: JSON;
      if (!iszipped) {
        const reader = new FileReader();
        reader.onload = async (e: ProgressEvent<FileReader>) => {
          if (e.target?.result) {
            try {
              json = JSON.parse(e.target.result as string);
              const valid = await jsonValidator(json);
              if (valid) {
                setData(json as unknown as JSONData);
                setSuccess(true);
                setOpen(true);
              } else {
                setSuccess(false);
                setOpen(true);
              }
              console.log(valid);
            } catch (error) {
              console.error("Error parsing JSON:", error);
            }
          }
        };
        reader.readAsText(file);
      } else {
        try {
          const data = new FormData();
          data.set("file", file);
          const res = await fetch("/api/decompress", {
            method: "POST",
            body: data,
          });
          if (!res.ok) throw new Error(await res.text());
          const returndata = await res.json();
          json = returndata.data;
          setData(json as unknown as JSONData);
        } catch (e: any) {
          console.error(e);
        }
      }
    }
  };

  return (
    <Grid container columns={16}>
      <Grid item xs={3}>
        <Typography variant="h3" gutterBottom>
          Quick Look
        </Typography>
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
        <Box sx={{ pt: 2 }}>{data && <GraphList data={data}></GraphList>}</Box>
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
  );
}
