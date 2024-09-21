import { FC, PropsWithChildren } from "react";

import { css } from "@emotion/react";

const styles = css`
  margin: 1.2rem 0.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 8%;
`;

export const AppFieldList: FC<PropsWithChildren> = ({ children }) => {
  return <div css={styles}>{children}</div>;
};
