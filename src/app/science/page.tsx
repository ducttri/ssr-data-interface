"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Button, Typography } from "@mui/material";

export default function science() {
  const { getToken } = useKindeBrowserClient();

  const handleAPICall = async () => {    
    try {
      const res = await fetch(`/api/upload`, {
        headers: {
          Authorization: (getToken() || ""),
        },
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Typography variant="h3" gutterBottom>
      <Button onClick={handleAPICall}>Check API</Button>
    </Typography>
  );
}
