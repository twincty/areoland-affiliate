import React from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";

import Routes from "./Routes";

const browserHistory = createBrowserHistory();

function App() {
  // const isDarkMode = useSelector((state) => state.app.theme.darkmode);
  const isDarkMode = false;

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: isDarkMode ? "dark" : "light",
          common: {
            white: "#ffffff",
            black: "#000000",
            primary: isDarkMode ? "default" : "primary",
            grey: isDarkMode ? "#555555" : "#fafafa",
          },
          primary: {
            light: "#63a4ff",
            main: "#1976d2",
            dark: "#004ba0",
          },
        },
        typography: {
          h1: {
            fontWeight: 500,
            fontSize: "35px",
            letterSpacing: "-0.24px",
            lineHeight: "40px",
          },
        },
      }),
    [isDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router history={browserHistory}>
        <Routes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
