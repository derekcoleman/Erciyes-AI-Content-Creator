import { PaletteOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    customColors: {
      innerCard: string;
      inncerCardBorder: string;
      settingsModalColor: string;
    };
  }
  interface PaletteOptions {
    customColors?: {
      innerCard: string;
      inncerCardBorder: string;
      settingsModalColor: string;
    };
  }
}
