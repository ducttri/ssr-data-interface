"use client";

import { Box, CircularProgress, Grid, Typography } from "@mui/material";
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

  console.log(data);

  if (isLoading)
    return (
      <Box sx={{ width: "100%", display: "flex" }} alignContent={"center"}>
        <CircularProgress />
      </Box>
    );
  if (error) return <Box>{error}</Box>;

  return (
    <PageContainer title="Health" description="Health Database">
      <Typography variant="h3" gutterBottom>
        Health
        <Grid container columns={2}>
          {data && <GraphList data={data}></GraphList>}
        </Grid>
      </Typography>
    </PageContainer>
  );
}
