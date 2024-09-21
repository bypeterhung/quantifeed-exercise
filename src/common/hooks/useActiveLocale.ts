import { useContext } from "react";

import { AppContext } from "../../app/AppContext";
import { hasValue } from "../utils/has-value";

export const useActiveLocale = () => {
  const { activeUser } = useContext(AppContext);
  if (hasValue(activeUser?.locale)) {
    return activeUser.locale;
  }
  // default fallback
  return {
    number: "en-US",
    datePattern: "YYYY-MM-DD",
  };
};
