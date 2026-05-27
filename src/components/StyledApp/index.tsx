import { ThemeProvider } from "styled-components";

import Simulation from "@pages/Simulation";
import { ThemeModes } from "@themes/enums";
import { GlobalStyle } from "@themes/styles/GlobalStyle";
import theme from "@themes/theme";

const StyledApp = () => {
  return (
    <ThemeProvider theme={theme[ThemeModes.light]}>
      <GlobalStyle />
      <Simulation />
    </ThemeProvider>
  );
};

export default StyledApp;
