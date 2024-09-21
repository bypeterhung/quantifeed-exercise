import { FC } from "react";

import { css } from "@emotion/react";
import { Button, Select } from "antd";
import { LabeledValue } from "antd/es/select";

import { AppModal } from "../../../common/components/AppModal";
import { Account } from "../my-retirement-services";

type Props = {
  open: boolean;
  debitAccount: Account;
  currencyOptions: LabeledValue[];
  accountOptions: LabeledValue[];
  isPending: boolean;
  onAccountChange: (accountNo: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
};

export const AccountNumberModalLayout: FC<Props> = ({
  open,
  debitAccount,
  currencyOptions,
  accountOptions,
  isPending,
  onAccountChange,
  onSubmit,
  onCancel,
}) => (
  <AppModal
    title="Change Account Number"
    open={open}
    closable={false}
    footer={[
      <Button key="cancel" disabled={isPending} onClick={onCancel}>
        Cancel
      </Button>,
      <Button
        key="submit"
        type="primary"
        loading={isPending}
        onClick={onSubmit}
      >
        Determine
      </Button>,
    ]}
  >
    <p>
      <strong>Please select your debit account number:</strong>
    </p>
    <div
      css={css`
        padding-bottom: 15px;
        & > .ant-select {
          min-width: 75px;
          margin-right: 0.3rem;
        }
        & > span {
          margin-left: 0.3rem;
        }
      `}
    >
      <Select
        disabled
        options={currencyOptions}
        value={debitAccount.currencyCode}
      />
      <Select
        options={accountOptions}
        value={debitAccount.accountNo}
        onChange={onAccountChange}
      />
      <span>Account balance: {debitAccount.balance}</span>
    </div>
  </AppModal>
);
