"use client";

import PageContainer from "@/components/Container/PageContainer";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function Simulate() {
  const [numPackets, setNumPackets] = useState<number>(1000);
  const [outputFilename, setOutputFilename] = useState<string>("output");

  const handleDownload = async () => {
    try {
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
    } catch {}
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
              >
                Simulate & Download
              </Button>
            </Grid>
            <Grid item xs={1}>
              <Button
                variant="outlined"
                size="medium"
                onClick={handleDownload}
                fullWidth
              >
                Simulate & Add
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </PageContainer>
  );
}
