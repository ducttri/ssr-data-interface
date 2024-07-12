"use client";

import { Box, CircularProgress, Grid, Paper, Typography } from "@mui/material";
import GraphList from "@/components/HealthGraph/GraphsList";
import useSWR from "swr";
import PageContainer from "@/components/Container/PageContainer";

const fetcher = (url: string | URL | Request) =>
  fetch(url).then((res) => res.json());

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data, error, isLoading } = useSWR(
    id ? `/api/fetch/health/id?id=${id}` : null,
    fetcher
  );

  if (error) return <Box>{error}</Box>;

  return (
    <PageContainer title="Health" description="Health Database">
      <Typography variant="h3" gutterBottom>
        Health
      </Typography>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <Grid container columns={2}>
            {data && <GraphList data={data}></GraphList>}
          </Grid>
        </Paper>
      </Box>
    </PageContainer>
  );
}
