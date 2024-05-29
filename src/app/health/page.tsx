"use client";

import { Box, CircularProgress, Grid, Tab, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import EnhancedTable from "@/components/HealthTable/EnhancedTable";
import { JSONData } from "@/types/types";

export default function Health() {
  return (
    <>
      <Typography variant="h3" gutterBottom>
        Health
      </Typography>
      <EnhancedTable></EnhancedTable>
    </>
  );
}
