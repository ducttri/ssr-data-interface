"use client";

import PageContainer from "@/components/container/PageContainer";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import { Box, Button, Typography } from "@mui/material";


export default function Science() {
  return (
    <PageContainer title="Science" description="Science Database">
      <Typography variant="h3" gutterBottom>
        Science
      </Typography>
      <Box alignItems="center">
        <Button
          variant="contained"
          component={RegisterLink}
          disableElevation
          color="primary"
        >
          Register
        </Button>
      </Box>
    </PageContainer>
  );
}
