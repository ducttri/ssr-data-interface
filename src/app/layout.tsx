import { Box } from "@mui/material";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Box color={"primary"} height={"100vh"} maxHeight={"100%"}>
            {children}
          </Box>
        </Providers>
      </body>
    </html>
  );
}
