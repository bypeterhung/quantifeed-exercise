import { useContext } from "react";

import { useQuery } from "@tanstack/react-query";

import { AppContext } from "../../app/AppContext";
import { hasValue } from "../../common/utils/has-value";
import { getMyAccounts } from "./my-retirement-services";

export const QUERY_KEY_MY_ACCOUNTS = "QUERY_KEY_MY_ACCOUNTS";

export const useMyAccountsQuery = () => {
  const { activeUser } = useContext(AppContext);

  return useQuery({
    queryKey: [QUERY_KEY_MY_ACCOUNTS],
    queryFn: () => {
      return getMyAccounts(
        // checked not empty with enabled property below
        activeUser!.token
      );
    },
    enabled: hasValue(activeUser?.token),
    meta: {
      taskDescription: "My accounts query",
    },
  });
};
