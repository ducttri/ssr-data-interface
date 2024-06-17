import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AppRouterCacheProvider>
  );
}
