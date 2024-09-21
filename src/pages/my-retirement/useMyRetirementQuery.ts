import { useContext } from "react";

import { useQuery } from "@tanstack/react-query";

import { AppContext } from "../../app/AppContext";
import { hasValue } from "../../common/utils/has-value";
import { getMyRetirement } from "./my-retirement-services";

export const QUERY_KEY_MY_RETIREMENT = "QUERY_KEY_MY_RETIREMENT";

export const useMyRetirementQuery = () => {
  const { activeUser } = useContext(AppContext);

  return useQuery({
    queryKey: [QUERY_KEY_MY_RETIREMENT],
    queryFn: () => {
      return getMyRetirement(
        // checked not empty with enabled property below
        activeUser!.token
      );
    },
    enabled: hasValue(activeUser?.token),
    meta: {
      taskDescription: "My retirement query",
    },
  });
};
