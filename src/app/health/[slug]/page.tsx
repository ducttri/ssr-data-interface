"use client";

import { Box, Grid, Tab, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { JSONData } from "@/types/types";
import GraphList from "@/components/GraphsList";

export default function Page({ params }: { params: { slug: string } }) {
  const [data, setData] = useState<JSONData | null>(null);

  useEffect(() => {
    const fetchDataWrapper = async () => {
      try {
        const data = new FormData();
        data.set("id", params.slug);
        const res = await fetch("/api/fetch", {
          method: "POST",
          body: data,
        });
        if (!res.ok) throw new Error(await res.text());
        const returndata = await res.json();
        let json = returndata.data[0] as JSONData;
        setData(json);
      } catch (error) {
        console.log("test");
      }
    };

    fetchDataWrapper();
  }, [params, setData]);

  return (
    <Typography variant="h3" gutterBottom>
      Health
      <Grid container columns={2}>
        {data && <GraphList data={data}></GraphList>}
      </Grid>
    </Typography>
  );
}
