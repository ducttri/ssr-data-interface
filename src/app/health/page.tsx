"use client";

import { Box, CircularProgress, Grid, Tab, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import HealthTable from "@/components/healthTable/HealthTable";
import { HealthJSONData } from "@/types/types";
import PageContainer from "@/components/container/PageContainer";

export default function Health() {
  return (
    <PageContainer title="Health" description="Health Database">
      <Typography variant="h3" gutterBottom>
        Health
      </Typography>

      <Box width={"100%"}>
        <HealthTable />
      </Box>
    </PageContainer>
  );
}
