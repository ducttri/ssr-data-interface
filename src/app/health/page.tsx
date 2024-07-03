"use client";

import { Box, Typography } from "@mui/material";
import HealthTable from "@/components/HealthTable/HealthTable";
import PageContainer from "@/components/Container/PageContainer";

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
