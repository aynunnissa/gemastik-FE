import PropTypes from "prop-types";
import { useMemo } from "react";

// material
import { CssBaseline } from "@mui/material";
import {
  ThemeProvider,
  createTheme,
  StyledEngineProvider,
} from "@mui/material/styles";

// style
import breakpoints from "./breakpoints";

ThemeConfig.propTypes = {
  children: PropTypes.node,
};

export default function ThemeConfig({ children }) {
  const themeOptions = useMemo(
    () => ({
      breakpoints,
      spacing: [0, 4, 8, 16, 24, 48, 96],
    }),
    []
  );

  const theme = createTheme(themeOptions);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
