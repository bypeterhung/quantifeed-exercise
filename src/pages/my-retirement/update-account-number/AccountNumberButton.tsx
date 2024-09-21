import { FC, useState } from "react";

import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";

import { Account, Retirement } from "../my-retirement-services";
import { AccountNumberModal } from "./AccountNumberModal";

type Props = {
  retirement: Retirement;
  accounts: Account[];
};

export const AccountNumberButton: FC<Props> = ({ retirement, accounts }) => {
  const [modalOpen, setModalOpen] = useState(false);

  function handleClose() {
    setModalOpen(false);
  }

  function handleOpen() {
    setModalOpen(true);
  }

  return (
    <>
      <Button type="link" onClick={handleOpen}>
        <EditOutlined />
      </Button>
      <AccountNumberModal
        open={modalOpen}
        retirement={retirement}
        accounts={accounts}
        onCancel={handleClose}
      />
    </>
  );
};
