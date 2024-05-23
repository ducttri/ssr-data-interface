"use client";

import { Box, CircularProgress, Grid, Tab, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import EnhancedTable from "@/components/Table";
import { JSONData } from "@/types/types";

export default function Health() {
  const [data, setData] = useState<JSONData[] | null>(null);

  useEffect(() => {
    const fetchDataWrapper = async () => {
      try {
        const data = new FormData();
        data.set("projection", JSON.stringify({ processed_data: 1 }));
        const res = await fetch("/api/fetch", {
          method: "POST",
          body: data,
        });
        if (!res.ok) throw new Error(await res.text());
        const returndata = await res.json();
        if (returndata) {
          let json: JSONData[] = returndata.data;
          setData(json);
        }
      } catch (error) {
        console.log("error");
      }
    };

    fetchDataWrapper();
  }, [setData]);

  return (
    <Typography variant="h3" gutterBottom>
      Health
      <Grid container columns={2}>
        {data ? (
          <EnhancedTable inputData={data}></EnhancedTable>
        ) : (
          <CircularProgress color="inherit" />
        )}
      </Grid>
    </Typography>
  );
}
