import { Interpolation } from "@emotion/react";

export interface DefaultTheme {
  bgBase: string;
  bgContrast: string;
  bgDim: string;
  borderRadius: number;
  colorBorder: string;
  colorHighlight: string;
  colorLink: string;
  colorPrimary: string;
  colorText: string;
  colorTextInvert: string;
  fontWeightStrong: number;
}

declare module "react" {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    css?: Interpolation<DefaultTheme>;
  }
}
