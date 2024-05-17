"use client";

import { Box, Grid, Tab, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { JSONData } from "@/types/types";
import GraphList from "@/components/GraphsList";

export default function health() {
  const [data, setData] = useState<JSONData | null>(null);

  useEffect(() => {
    const fetchDataWrapper = async () => {
      try {
        const res = await fetch("/api/fetchdata");
        if (!res.ok) throw new Error(await res.text());
        const returndata = await res.json();
        let json = returndata.data as JSONData;
        setData(json);
      } catch (error) {
        console.log("test");
      }
    };

    fetchDataWrapper();
  }, []);
  
  return (
    <Typography variant="h3" gutterBottom>
      Health
      <Grid container columns={2}>
        {data && (
          <GraphList data={data}></GraphList>
        )}
      </Grid>
    </Typography>
  );
}
