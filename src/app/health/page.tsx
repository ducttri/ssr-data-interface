"use client";

import { Box, Grid, Tab, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import EnhancedTable from "@/components/Table";
import { ObjectId } from "mongodb";

export default function health() {
  const [data, setData] = useState<
    [{ _id: string; timestamp: number[] }] | null
  >(null);

  useEffect(() => {
    const fetchDataWrapper = async () => {
      try {
        const data = new FormData();
        data.set("projection", JSON.stringify({ timestamp: 1 }));
        const res = await fetch("/api/fetch", {
          method: "POST",
          body: data,
        });
        if (!res.ok) throw new Error(await res.text());
        const returndata = await res.json();
        if (returndata) {
          let json: [{ _id: string; timestamp: number[] }] = returndata.data;
          setData(json);
        }
      } catch (error) {
        console.log("error");
      }
    };

    fetchDataWrapper();
  }, []);

  return (
    <Typography variant="h3" gutterBottom>
      Health
      <Grid container columns={2}>
        {data && <EnhancedTable inputData={data}></EnhancedTable>}
      </Grid>
    </Typography>
  );
}
