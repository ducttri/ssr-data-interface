"use client";

import PageContainer from "@/components/Container/PageContainer";
import { Typography, Paper } from "@mui/material";
import { ThreeDSpectrogram } from "@/components/Graph/ThreeDSpectrogram";
import { StepGraph } from "@/components/Graph/StepGraph";
import data from '../../../public/dump.json'


export default function Science() {
  const utcDates: string[] = data.timestamp.map((timestamp: number) => {
    return new Date(timestamp * 1000).toISOString();
  });
  return (
    <PageContainer title="Science" description="Science Database">
      <Typography variant="h3" gutterBottom>
        Science
      </Typography>
      <Paper sx={{ width: "100%", mb: 2, p: 2 }}>
        <ThreeDSpectrogram
          xData={utcDates}
          yData={data.reversed_bins}
          zData={data.histogram}
          xLabel={"Time (UTC)"}
          yLabel={"Normal Bridgeport ADC bin"}
          title={"Counts spectrogram"}
        />
        <StepGraph
          xData={data.reversed_bins}
          yData={data.spectrum}
          xLabel={"Bridgeport ADC bin"}
          yLabel={"Counts"}
          title={"IMPRESS spectrum"}
        ></StepGraph>
      </Paper>
    </PageContainer>
  );
}
