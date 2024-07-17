"use client";

import { Box, Grid, Paper, Typography } from "@mui/material";
import GraphList from "@/components/HealthGraph/GraphsList";
import useSWR from "swr";
import PageContainer from "@/components/Container/PageContainer";
import { NextResponse } from "next/server";
import NotFound from "@/app/not-found";

const fetcher = async (url: string | URL | Request) => {
  const res = await fetch(url);

  if (res.status != 200) {
    const error = new Error("An error occurred while fetching the data.");
    throw error;
  }

  const json = await res.json();
  return json.data;
};

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data, error, isLoading } = useSWR(
    id ? `/api/fetch/health/id?id=${id}` : null,
    fetcher
  );

  if (error) {
    return NotFound();
  }

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
