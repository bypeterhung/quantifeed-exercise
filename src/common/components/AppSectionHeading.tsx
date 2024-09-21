import { FC, ReactNode } from "react";

import { css } from "@emotion/react";
import { Flex } from "antd";

import { appTheme } from "../../app-theme";

type Props = {
  title: string;
  actionNode?: ReactNode;
};

export const AppSectionHeading: FC<Props> = ({ title, actionNode }) => {
  return (
    <Flex
      justify="space-between"
      align="center"
      css={css`
        padding: 0 0.5rem 1rem;
        border-bottom: 1px solid ${appTheme.colorBorder};
      `}
    >
      <h2
        css={css`
          font-weight: 500;
          margin: 0;
          padding: 0;
          line-height: 1.8rem;
        `}
      >
        {title}
      </h2>
      {actionNode && <div>{actionNode}</div>}
    </Flex>
  );
};
