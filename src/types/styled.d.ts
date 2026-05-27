import "styled-components";

import type { ThemeMode } from "@themes/types";

declare module "styled-components" {
  export interface DefaultTheme extends ThemeMode {}
}
