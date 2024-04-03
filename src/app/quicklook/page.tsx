"use client";

import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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
  const [fileContent, setFileContent] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          try {
            const json = JSON.parse(e.target.result as string);
            setFileContent(JSON.stringify(json, null, 2)); // Pretty print the JSON
          } catch (error) {
            console.error("Error parsing JSON:", error);
            setFileContent("Error reading the file");
          }
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <Box>
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
          accept="application/json"
        />
      </Button>
      {fileContent && (
        <Typography
          variant="body1"
          style={{ whiteSpace: "pre-wrap", marginTop: "20px" }}
        >
          {fileContent}
        </Typography>
      )}
    </Box>
  );
}
