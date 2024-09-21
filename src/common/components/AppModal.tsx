import { FC, ReactNode } from "react";

import { ClassNames } from "@emotion/react";
import { Modal, ModalProps } from "antd";

import { AppSectionHeading } from "./AppSectionHeading";

type AppModalProps = {
  title: string;
  headingActionNode?: ReactNode;
} & ModalProps;

export const AppModal: FC<AppModalProps> = ({
  title,
  headingActionNode,
  children,
  ...props
}) => {
  return (
    <ClassNames>
      {({ css }) => (
        <Modal
          className={css`
            & .ant-modal-body {
              padding-top: 20px;
            }
            & .ant-modal-footer {
              text-align: center;
              padding-bottom: 30px;
            }
          `}
          {...props}
        >
          <AppSectionHeading title={title} actionNode={headingActionNode} />
          {children}
        </Modal>
      )}
    </ClassNames>
  );
};
