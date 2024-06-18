"use client";

import { Box, CircularProgress, Grid, Tab, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import EnhancedTable from "@/components/HealthTable/EnhancedTable";
import { JSONData } from "@/types/types";
import PageContainer from "@/components/container/PageContainer";

export default function Health() {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Typography variant="h3" gutterBottom>
        Health
      </Typography>
      <EnhancedTable></EnhancedTable>
    </PageContainer>
  );
}
