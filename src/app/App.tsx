import { FC } from "react";

import { ConfigProvider as AntdConfigProvider } from "antd";

import { appTheme } from "../app-theme";
import { AppContext } from "./AppContext";
import { AppLayout } from "./AppLayout";
import { AppQueryClientProvider } from "./AppQueryClientProvider";

export const App: FC = () => {
  return (
    <AppContext.Provider
      value={{
        // mock context data, which are normally retrieved through API call
        activeUser: {
          id: "dummy-id",
          name: "Peter Hung",
          email: "email@gmail.com",
          locale: {
            number: "en-US",
            datePattern: "YYYY-MM-DD",
          },
          token: "dummy-token",
        },
        currencies: ["HKD", "USD", "TWD"],
      }}
    >
      <AntdConfigProvider
        theme={{
          token: {
            colorPrimary: appTheme.colorPrimary,
            borderRadius: appTheme.borderRadius,
            colorLink: appTheme.colorLink,
            colorHighlight: appTheme.colorHighlight,
            colorText: appTheme.colorText,
            colorBgBase: appTheme.bgBase,
          },
        }}
      >
        <AppQueryClientProvider>
          <AppLayout />
        </AppQueryClientProvider>
      </AntdConfigProvider>
    </AppContext.Provider>
  );
};
