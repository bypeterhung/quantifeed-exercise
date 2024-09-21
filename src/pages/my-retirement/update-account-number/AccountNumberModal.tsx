import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useQueryClient } from "@tanstack/react-query";
import useNotification from "antd/es/notification/useNotification";
import { LabeledValue } from "antd/es/select";

import { AppContext } from "../../../app/AppContext";
import { Account, Retirement } from "../my-retirement-services";
import { QUERY_KEY_MY_RETIREMENT } from "../useMyRetirementQuery";
import { useMyRetirementUpdate } from "../useMyRetirementUpdate";
import { AccountNumberModalLayout } from "./AccountNumberModalLayout";

type Props = {
  open: boolean;
  retirement: Retirement;
  accounts: Account[];
  onCancel: () => void;
};

export const AccountNumberModal: FC<Props> = ({
  open,
  accounts,
  retirement,
  onCancel,
}) => {
  const { currencies = [] } = useContext(AppContext);
  const [notify, contextHolder] = useNotification();

  const currencyOptions: LabeledValue[] = useMemo(
    () =>
      currencies.map((c) => ({
        label: c,
        value: c,
      })),
    [currencies]
  );

  const accountOptions: LabeledValue[] = useMemo(
    () =>
      accounts.map((a) => ({
        label: a.accountNo,
        value: a.accountNo,
      })),
    [accounts]
  );

  const handleAccountChange = useCallback(
    (accountNo: string) => {
      const account = accounts.find((a) => a.accountNo === accountNo);
      if (account === undefined) {
        throw Error(`No account found by number ${accountNo}`);
      }
      setDebitAccount(account);
    },
    [accounts]
  );

  useEffect(() => {
    if (open) {
      handleAccountChange(retirement.debitAccount.accountNo);
    }
  }, [handleAccountChange, open, retirement.debitAccount.accountNo]);

  const { mutateAsync, isPending } = useMyRetirementUpdate();

  const [debitAccount, setDebitAccount] = useState(retirement.debitAccount);
  const queryClient = useQueryClient();

  async function handleSubmit() {
    try {
      const retirementUpdated = await mutateAsync({
        debitAccountNo: debitAccount.accountNo,
      });
      queryClient.setQueryData([QUERY_KEY_MY_RETIREMENT], retirementUpdated);
      notify.success({ message: "Debit account updated successfully." });
      onCancel();
    } catch (e) {
      // should add extra logic for logging error here...

      const { message: description } = e as unknown as Error;
      notify.error({ message: "Retirement update error", description });
    }
  }

  return (
    <>
      {contextHolder}
      <AccountNumberModalLayout
        open={open}
        debitAccount={debitAccount}
        currencyOptions={currencyOptions}
        accountOptions={accountOptions}
        isPending={isPending}
        onAccountChange={handleAccountChange}
        onSubmit={handleSubmit}
        onCancel={onCancel}
      />
    </>
  );
};
