import { FC } from "react";

import {
  CaretDownFilled,
  GlobalOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { css, Global as GlobalCss } from "@emotion/react";
import { Button, Dropdown } from "antd";

import { appTheme } from "../app-theme";
import { AppRouter } from "./AppRouter";

const globalStyles = css`
  body {
    margin: 0;
    background-color: ${appTheme.bgDim};
    color: ${appTheme.colorText};
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: "antialiased";
    -moz-osx-font-smoothing: "grayscale";
  }
  h1 {
    font-size: 1.8rem;
    font-weight: ${appTheme.fontWeightStrong};
  }
  h2 {
    font-size: 1.3rem;
    font-weight: ${appTheme.fontWeightStrong};
  }
  h3 {
    font-size: 1.15rem;
    font-weight: ${appTheme.fontWeightStrong};
  }
  strong {
    font-weight: ${appTheme.fontWeightStrong};
  }
`;

const headerStyles = css`
  background: ${appTheme.bgContrast};
  padding-right: 15px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: right;
  gap: 6px;
  & > button.ant-btn.ant-btn-text {
    color: ${appTheme.colorTextInvert};
    padding: 6px;
    gap: 0;
    &:hover {
      color: ${appTheme.colorTextInvert};
    }
    & .anticon-caret-down {
      font-size: 0.7rem;
      margin: 8px 0 0 3px;
    }
  }
`;

const mainStyles = css`
  max-width: 1200px;
  min-width: 1000px;
  padding: 30px;
  margin: auto;
`;

const menuItems = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.google.com/search?q=1"
      >
        1st menu item
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.google.com/search?q=2"
      >
        2nd menu item
      </a>
    ),
  },
];

export const AppLayout: FC = () => {
  return (
    <>
      <GlobalCss styles={globalStyles} />
      <header css={headerStyles}>
        <Dropdown menu={{ items: menuItems }}>
          <Button type="text">
            <UserOutlined alt="User Menu" />
            <CaretDownFilled />
          </Button>
        </Dropdown>
        <Dropdown menu={{ items: menuItems }}>
          <Button type="text">
            <GlobalOutlined alt="Localization Menu" />
            <CaretDownFilled />
          </Button>
        </Dropdown>
      </header>
      <main css={mainStyles}>
        <AppRouter />
      </main>
    </>
  );
};
