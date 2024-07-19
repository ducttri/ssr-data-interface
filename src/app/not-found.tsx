"use client";

import PageContainer from "@/components/Container/PageContainer";
import { Box, Typography, Divider, Paper } from "@mui/material";

export default function NotFound() {
  return (
    <PageContainer title="Not found" description="404">
      <Typography variant="h3" gutterBottom>
        Not Found
      </Typography>
      <Typography variant="body1" gutterBottom>
        Could not find requested resource
      </Typography>
    </PageContainer>
  );
}
