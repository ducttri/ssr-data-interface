import { Card, Box, Typography } from "@mui/material";
import * as React from "react";

export default function Home() {
  return (
    <Box width={"100%"} height={"100%"}>
      <Card>
        <Typography variant="h1" component="h2">
          h1. Heading
        </Typography>
      </Card>
    </Box>
  );
}
