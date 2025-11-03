import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router";

export default function Layout() {
  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        light: "#5BB09F",
        main: "#5BB09F",
        dark: "#478578ff",
        contrastText: "#000000",
      },
      background: {
        default: "#f6f6f6",
        paper: "#ffffff",
      },
      text: {
        primary: "#111111",
        secondary: "#666666",
      }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {

          },
          contained: {
            color: "#FFFFFF",
            fontWeight: 'bold',
            '&:hover': {
              background: '#5BB09F',
            color: "#FFFFFF",
            }
          },
          outlined: {
            fontWeight: 'bold'
          }
        }
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Outlet />
    </ThemeProvider>
  );
}
