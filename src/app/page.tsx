"use client";

import PageContainer from "@/components/container/PageContainer";
import Typography from "@mui/material/Typography";

export default function Home() {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
        <Typography variant="h3" gutterBottom>
          Home
        </Typography>
    </PageContainer>
  );
}
