"use client";

import PageContainer from "@/components/Container/PageContainer";
import { Typography, Box } from "@mui/material";
import { Spectrogram } from "@/components/Graph/Spectrogram";
import { LineGraph } from "@/components/Graph/LineGraph";
import data from '../../../public/dump.json'


export default function Science() {
  return (
    <PageContainer title="Science" description="Science Database">
      <Typography variant="h3" gutterBottom>
        Science
      </Typography>
        <Spectrogram></Spectrogram>
        <LineGraph xData={data.reversed_bins} yData={data.spectrum} xLabel={""} yLabel={""} xUnit={""} yUnit={""}></LineGraph>
    </PageContainer>
  );
}
