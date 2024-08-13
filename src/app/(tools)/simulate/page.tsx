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
  const { getToken } = useKindeBrowserClient();

  const [healthNumPkts, setHealthNumPkts] = useState<number>(1000);
  const [healthOutFile, setHealthOutFile] = useState<string>("output");

  const [hafxNumFiles, setHafxNumFiles] = useState<number>(5);
  const [hafxSecFiles, setHafxSecFiles] = useState<number>(10);
  const [hafxOutFiles, setHafxOutFiles] = useState<string>("output");

  const [x123NumFiles, setX123NumFiles] = useState<number>(5);
  const [x123SecFiles, setX123SecFiles] = useState<number>(10);
  const [x123OutFiles, setX123OutFiles] = useState<string>("output");

  const [scienceNumFiles, setScienceNumFiles] = useState<number>(5);
  const [scienceSecFiles, setScienceSecFiles] = useState<number>(10);
  const [scienceOutFiles, setScienceOutFiles] = useState<string>("output");

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

  const handleHealthDownload = async () => {
    try {
      setWorking(true);

      await fetch(
        `/api/simulate/health?numPackets=${healthNumPkts}&outputHealthFilename=${healthOutFile}`
      )
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${healthOutFile}.bin.gz`;
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

  const handleHAFXDownload = async () => {
    try {
      setWorking(true);

      await fetch(
        `/api/simulate/science?numPackets=${hafxNumFiles}&outputHealthFilename=${hafxOutFiles}&secondsPerFile=${hafxSecFiles}&detector=hafx`
      )
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${hafxOutFiles}.zip`;
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

  const handleX123Download = async () => {
    try {
      setWorking(true);

      await fetch(
        `/api/simulate/science?numPackets=${x123NumFiles}&outputHealthFilename=${x123OutFiles}&secondsPerFile=${x123SecFiles}&detector=x123`
      )
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${x123OutFiles}.zip`;
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

  const handleScienceDownload = async () => {
    try {
      setWorking(true);

      await fetch(
        `/api/simulate/science?numPackets=${scienceNumFiles}&outputHealthFilename=${scienceOutFiles}&secondsPerFile=${scienceSecFiles}&detector=both`
      )
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${scienceOutFiles}.zip`;
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

  const handleHealthUpload = async () => {
    try {
      setWorking(true);
      await fetch(
        `/api/simulate/health?numPackets=${healthNumPkts}&outputHealthFilename=${healthOutFile}`
      )
        .then((response) => response.blob())
        .then((blob) => {
          const file: any = blob;
          file.lastModifiedDate = new Date();
          file.name = `${hafxOutFiles}.bin.gz`;
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
                value={healthNumPkts}
                variant="outlined"
                size="small"
                onChange={(event) =>
                  setHealthNumPkts(event.target.value as unknown as number)
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                id="output_filename"
                label="Output filename"
                value={healthOutFile}
                variant="outlined"
                size="small"
                onChange={(event) => setHealthOutFile(event.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={1}>
              <Button
                variant="outlined"
                size="medium"
                onClick={handleHealthDownload}
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
                onClick={handleHealthUpload}
                fullWidth
                disabled={isWorking}
              >
                Simulate & Add
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Paper sx={{ width: "100%", mb: 2, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          HAFX Slices Simulation
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
                id="num_files"
                label="Number of files"
                type="number"
                value={hafxNumFiles}
                variant="outlined"
                size="small"
                onChange={(event) =>
                  setHafxNumFiles(event.target.value as unknown as number)
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                id="seconds_per_file"
                label="Seconds per files"
                type="number"
                value={hafxSecFiles}
                variant="outlined"
                size="small"
                onChange={(event) =>
                  setHafxSecFiles(event.target.value as unknown as number)
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                id="data_dir"
                label="Output filename"
                value={hafxOutFiles}
                variant="outlined"
                size="small"
                onChange={(event) => setHafxOutFiles(event.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={1}>
              <Button
                variant="outlined"
                size="medium"
                onClick={handleHAFXDownload}
                fullWidth
                disabled={isWorking}
              >
                Simulate & Download
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Paper sx={{ width: "100%", mb: 2, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          X123 Slices Simulation
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
                id="num_files"
                label="Number of files"
                type="number"
                value={x123NumFiles}
                variant="outlined"
                size="small"
                onChange={(event) =>
                  setX123NumFiles(event.target.value as unknown as number)
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                id="seconds_per_file"
                label="Seconds per files"
                type="number"
                value={x123SecFiles}
                variant="outlined"
                size="small"
                onChange={(event) =>
                  setX123SecFiles(event.target.value as unknown as number)
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                id="data_dir"
                label="Output filename"
                value={x123OutFiles}
                variant="outlined"
                size="small"
                onChange={(event) => setX123OutFiles(event.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={1}>
              <Button
                variant="outlined"
                size="medium"
                onClick={handleX123Download}
                fullWidth
                disabled={isWorking}
              >
                Simulate & Download
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Paper sx={{ width: "100%", mb: 2, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Science Slices Simulation
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
                id="num_files"
                label="Number of files"
                type="number"
                value={scienceNumFiles}
                variant="outlined"
                size="small"
                onChange={(event) =>
                  setScienceNumFiles(event.target.value as unknown as number)
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                id="seconds_per_file"
                label="Seconds per files"
                type="number"
                value={scienceSecFiles}
                variant="outlined"
                size="small"
                onChange={(event) =>
                  setScienceSecFiles(event.target.value as unknown as number)
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                id="data_dir"
                label="Output filename"
                value={scienceOutFiles}
                variant="outlined"
                size="small"
                onChange={(event) => setScienceOutFiles(event.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={1}>
              <Button
                variant="outlined"
                size="medium"
                onClick={handleScienceDownload}
                fullWidth
                disabled={isWorking}
              >
                Simulate & Download
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

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
    </PageContainer>
  );
}
