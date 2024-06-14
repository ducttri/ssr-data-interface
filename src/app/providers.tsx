import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { KindeProvider } from "@kinde-oss/kinde-auth-react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <KindeProvider
        clientId="b4ca6413b9f949bea5ac8ba5daf106b9"
        domain="https://ssrdatainterface.kinde.com"
        logoutUri={window.location.origin}
        redirectUri={window.location.origin}
      >
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </KindeProvider>
    </AppRouterCacheProvider>
  );
}
    