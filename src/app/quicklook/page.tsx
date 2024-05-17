"use client";

import { Box, Button, Grid, Tab, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import dynamic from "next/dynamic";
import GraphList from "@/components/GraphsList";
import { JSONData } from "@/types/types";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function QuickLook() {
  const [data, setData] = useState<JSONData | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const iszipped: boolean = file.name.endsWith(".json.gz") ? true : false;
      let json: JSONData;
      if (!iszipped) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target?.result) {
            try {
              json = JSON.parse(e.target.result as string);
              setData(json);
            } catch (error) {
              console.error("Error parsing JSON:", error);
            }
          }
        };
        reader.readAsText(file);
      } else {
        try {
          const data = new FormData();
          data.set("file", file);
          const res = await fetch("/api/upload", {
            method: "POST",
            body: data,
          });
          if (!res.ok) throw new Error(await res.text());
          const returndata = await res.json();
          json = returndata.data;
          setData(json);
        } catch (e: any) {
          console.error(e);
        }
      }
    }
  };

  return (
    <Grid container columns={16}>
      <Grid item xs={3}>
        <Typography variant="h3" gutterBottom>
          Quick Look
        </Typography>
        <Button
          color="primary"
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          Upload file
          <VisuallyHiddenInput
            type="file"
            onChange={handleFileChange}
            accept="application/json,application/gzip"
          />
        </Button>
      </Grid>
      {data && (
        <Grid container columns={2}>
          {data && <GraphList data={data}/>}
        </Grid>
      )}
    </Grid>
  );
}
