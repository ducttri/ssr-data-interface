"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";

export default function science() {
  const { getToken } = useKindeBrowserClient();

  const handleAPICall = async () => {
    const csrfResp = await fetch("/csrf-token");
    const { csrfToken } = await csrfResp.json();
    try {
      const fetchArgs = {
        method: "POST",
        headers: {},
        body: JSON.stringify({ data: 1 }),
      };
      if (csrfToken) fetchArgs.headers = { "X-CSRF-Token": csrfToken, Authorization: getToken() };
      const res = await fetch(`/api/upload`, fetchArgs);
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
