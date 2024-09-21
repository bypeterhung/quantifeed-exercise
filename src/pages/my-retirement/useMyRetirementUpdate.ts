import { useContext } from "react";

import { DefaultError, useMutation } from "@tanstack/react-query";

import { AppContext } from "../../app/AppContext";
import {
  Retirement,
  updateMyRetirement,
  UpdateRetirementPayload,
} from "./my-retirement-services";

export function useMyRetirementUpdate() {
  const { activeUser } = useContext(AppContext);

  return useMutation<Retirement, DefaultError, UpdateRetirementPayload>({
    mutationFn: (updateRetirementPayload: UpdateRetirementPayload) =>
      updateMyRetirement(updateRetirementPayload, activeUser!.token),
    meta: {
      taskDescription: "My retirement update",
    },
  });
}
