import { FC, PropsWithChildren, useMemo } from "react";

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import useNotification from "antd/es/notification/useNotification";

import { hasValue } from "../common/utils/has-value";

export const AppQueryClientProvider: FC<PropsWithChildren> = ({ children }) => {
  const [notify, contextHolder] = useNotification();
  const queryClient = useMemo(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error, query) => {
            // should add extra logic for logging error here...
            const task = query.meta?.taskDescription;
            if (hasValue(task)) {
              notify.error({
                message: `${task} error`,
                description: error.message,
              });
              return;
            }
            notify.error(error);
          },
        }),
        defaultOptions: {
          queries: {
            retry: 0,
          },
        },
      }),
    [notify]
  );

  return (
    <QueryClientProvider client={queryClient}>
      {contextHolder}
      {children}
    </QueryClientProvider>
  );
};
