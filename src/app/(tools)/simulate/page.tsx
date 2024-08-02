"use client";

import PageContainer from "@/components/Container/PageContainer";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Grid,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function Simulate() {
  const [numPackets, setNumPackets] = useState<number>(1000);
  const [outputFilename, setOutputFilename] = useState<string>("output");
  const { isAuthenticated, getToken, getPermission } = useKindeBrowserClient();
  const [openError, setOpenError] = useState(false);
  const [success, setSuccess] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isWorking, setWorking] = useState<boolean>(false);

  const handleAPICall = async (file: File) => {
    const csrfResp = await fetch("/csrf-token");
    const { csrfToken } = await csrfResp.json();
    try {
      const dataForm = new FormData();
      dataForm.set("file", file);
      const fetchArgs = {
        method: "POST",
        headers: {},
        body: dataForm,
      };
      if (csrfToken)
        fetchArgs.headers = {
          "X-CSRF-Token": csrfToken,
          Authorization: getToken(),
        };
      const res = await fetch(`/api/upload/health`, fetchArgs);
      const data = await res.json();
      if (data.status == 200) {
        setErrorMessage("Succesfully upload data.");
        setSuccess(true);
        setOpenError(true);
      } else {
        setErrorMessage("Failed to upload.");
        setSuccess(false);
        setOpenError(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDownload = async () => {
    try {
      setWorking(true);

      await fetch(
        `/api/simulate/health?numPackets=${numPackets}&outputFilename=${outputFilename}`
      )
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${outputFilename}.bin.gz`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        });
      setWorking(false);
    } catch {
      setWorking(false);
    }
  };

  const handleUpload = async () => {
    try {
      setWorking(true);
      await fetch(
        `/api/simulate/health?numPackets=${numPackets}&outputFilename=${outputFilename}`
      )
        .then((response) => response.blob())
        .then((blob) => {
          const file: any = blob;
          file.lastModifiedDate = new Date();
          file.name = `${outputFilename}.bin.gz`;
          handleAPICall(file);
        });
      setWorking(false);
    } catch {
      setWorking(false);
    }
  };

  const handleErrorClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenError(false);
  };

  return (
    <PageContainer title="Simulate" description="Simulate">
      <Typography variant="h3" gutterBottom>
        Simulate
      </Typography>
      <Paper sx={{ width: "100%", mb: 2, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Health Packet Simulation
        </Typography>
        <Box
          component="form"
          sx={{
            pt: 2,
          }}
          flex="true"
          alignItems="center"
        >
          <Grid
            container
            spacing={{ xs: 1, md: 3 }}
            columns={{ xs: 1, sm: 2, md: 4 }}
            flex="true"
          >
            <Grid item xs={1}>
              <TextField
                id="num_packets"
                label="Number of packets"
                type="number"
                value={numPackets}
                variant="outlined"
                size="small"
                onChange={(event) =>
                  setNumPackets(event.target.value as unknown as number)
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                id="output_filename"
                label="Output filename"
                value={outputFilename}
                variant="outlined"
                size="small"
                onChange={(event) => setOutputFilename(event.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={1}>
              <Button
                variant="outlined"
                size="medium"
                onClick={handleDownload}
                fullWidth
                disabled={isWorking}
              >
                Simulate & Download
              </Button>
            </Grid>
            <Grid item xs={1}>
              <Button
                variant="outlined"
                size="medium"
                onClick={handleUpload}
                fullWidth
                disabled={isWorking}
              >
                Simulate & Add
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Snackbar
          open={openError}
          autoHideDuration={6000}
          onClose={handleErrorClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          {success ? (
            <Alert
              onClose={handleErrorClose}
              severity="success"
              variant="filled"
              sx={{ width: "100%" }}
            >
              <AlertTitle>Success</AlertTitle>
              {errorMessage}
            </Alert>
          ) : (
            <Alert
              onClose={handleErrorClose}
              severity="error"
              variant="filled"
              sx={{ width: "100%" }}
            >
              <AlertTitle>Error</AlertTitle>
              {errorMessage}
            </Alert>
          )}
        </Snackbar>
      </Paper>
    </PageContainer>
  );
}
