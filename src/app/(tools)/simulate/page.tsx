"use client";

import PageContainer from "@/components/Container/PageContainer";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function Simulate() {
  const [numPackets, setNumPackets] = useState<number>(1000);
  const [outputFilename, setOutputFilename] = useState<string>("output");

  const handleDownload = async () => {
    try {
      await fetch(
        `/api/simulate?numPackets=${numPackets}&outputFilename=${outputFilename}`
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
            display: "flex",
            "& > :not(style)": { m: 1, width: "25ch" },
            pt: 2,
          }}
          display="flex"
          //   justifyContent="center"
          alignItems="center"
        >
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
          />
          <TextField
            id="output_filename"
            label="Output filename"
            value={outputFilename}
            variant="outlined"
            size="small"
            onChange={(event) => setOutputFilename(event.target.value)}
          />
          <Button variant="outlined" size="medium" onClick={handleDownload}>
            Simulate & Download
          </Button>
        </Box>
      </Paper>
    </PageContainer>
  );
}
