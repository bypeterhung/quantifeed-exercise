import { FC, ReactNode } from "react";

import { css } from "@emotion/react";

type Props = {
  children: ReactNode;
};

export const AppPageHeading: FC<Props> = ({ children }) => {
  return (
    <h1
      css={css`
        font-weight: 500;
        padding: 1rem 0 3rem 0;
        margin: 0;
      `}
    >
      {children}
    </h1>
  );
};
