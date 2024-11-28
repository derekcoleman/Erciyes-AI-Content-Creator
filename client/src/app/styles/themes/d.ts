import { PaletteOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    customColors: {
      innerCard: string;
    };
  }
  interface PaletteOptions {
    customColors?: {
      innerCard: string;
    };
  }
}
