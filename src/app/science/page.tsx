"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";

export default function science() {
  const { getToken } = useKindeBrowserClient();
  const [csrfToken, setCsrfToken] = useState<string>("loading...");

  useEffect(() => {
    const el = document.querySelector(
      'meta[name="x-csrf-token"]'
    ) as HTMLMetaElement | null;
    if (el) setCsrfToken(el.content);
    else setCsrfToken("missing");
  }, []);

  const handleAPICall = async () => {
    try {
      const res = await fetch(`/api/upload`, {
        headers: {
          Authorization: getToken() || "",
          "X-CSRF-Token": csrfToken,
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
