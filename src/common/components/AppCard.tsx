import { FC, ReactNode } from "react";

import { css } from "@emotion/react";

import { appTheme } from "../../app-theme";
import { AppSectionHeading } from "./AppSectionHeading";

const styles = css`
  background-color: ${appTheme.bgBase};
  padding: 2.5rem 2rem;
`;

type Props = {
  title: string;
  actionNode?: ReactNode;
  children: ReactNode;
};

export const AppCard: FC<Props> = ({ title, actionNode, children }) => {
  return (
    <div css={styles}>
      <AppSectionHeading title={title} actionNode={actionNode} />
      {children}
    </div>
  );
};
