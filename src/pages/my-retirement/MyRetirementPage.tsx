import { FC, useContext } from "react";
import { Link } from "react-router-dom";

import { EditOutlined } from "@ant-design/icons";
import { css } from "@emotion/react";
import { Button, Flex } from "antd";
import dayjs from "dayjs";

import { appTheme } from "../../app-theme";
import { AppContext } from "../../app/AppContext";
import { AppFieldList } from "../../common/components/app-field-list/AppFieldList";
import AppFieldListItem from "../../common/components/app-field-list/AppFieldListItem";
import { AppCard } from "../../common/components/AppCard";
import { AppPageHeading } from "../../common/components/AppPageHeading";
import { formatDate } from "../../common/utils/format";
import { hasValue } from "../../common/utils/has-value";
import { Retirement, RetirementStatus } from "./my-retirement-services";
import { AccountNumberButton } from "./update-account-number/AccountNumberButton";
import { useMyAccountsQuery } from "./useMyAccountsQuery";
import { useMyRetirementQuery } from "./useMyRetirementQuery";

const linkStyle = css`
  background-color: ${appTheme.colorPrimary};
  color: ${appTheme.colorTextInvert};
  padding: 0.75rem 1.5rem;
  border-radius: ${appTheme.borderRadius};
  margin-top: 3rem;
  &:hover {
    color: ${appTheme.colorTextInvert};
    opacity: 0.75;
  }
`;

export const MyRetirementPage: FC = () => {
  const { data: retirement } = useMyRetirementQuery();
  const { data: accounts } = useMyAccountsQuery();
  const { activeUser } = useContext(AppContext);

  const loading = !hasValue(retirement) || !hasValue(activeUser);

  const getPaymentPeriodRemarks = (status?: RetirementStatus) => {
    let period = "";
    if (status === RetirementStatus.MonthlyCharge) {
      period = "month";
    } else if (status === RetirementStatus.YearlyCharge) {
      period = "year";
    }

    return hasValue(period) ? `(per ${period})` : undefined;
  };

  const getChargeDateLabel = (retirement: Retirement) => {
    if (retirement.status === RetirementStatus.MonthlyCharge) {
      return `${retirement.chargeDate} of the month`;
    } else if (retirement.status === RetirementStatus.YearlyCharge) {
      return `${retirement.chargeDate} of ${formatDate(
        retirement.createDate,
        "MMMM"
      )}`;
    }
    return "";
  };

  const getChargeDateRemarks = (retirement: Retirement) => {
    const head = "(Next payment date: ";
    let nextPayDate = dayjs()
      .startOf("date")
      .set("date", retirement.chargeDate);

    if (retirement.status === RetirementStatus.YearlyCharge) {
      nextPayDate = nextPayDate.set(
        "month",
        dayjs(retirement.createDate).month()
      );
    }

    if (nextPayDate < dayjs().startOf("date")) {
      if (retirement.status === RetirementStatus.MonthlyCharge) {
        nextPayDate = nextPayDate.add(1, "month");
      } else if (retirement.status === RetirementStatus.YearlyCharge) {
        nextPayDate = nextPayDate.add(1, "year");
      }
    }

    return `${head}${nextPayDate.format(activeUser?.locale.datePattern)})`;
  };

  const getStatusLabel = (status: RetirementStatus) => {
    if (status === RetirementStatus.Pending) {
      return "Pending";
    } else if (status === RetirementStatus.MonthlyCharge) {
      return "Monthly charge";
    } else if (status === RetirementStatus.YearlyCharge) {
      return "Yearly charge";
    } else if (status === RetirementStatus.Suspended) {
      return "Suspended";
    }
  };

  return (
    <>
      <AppPageHeading>My Retirement</AppPageHeading>
      <AppCard
        title="Manage"
        actionNode={<Button size="small">Enquire history</Button>}
      >
        <AppFieldList>
          <AppFieldListItem
            loading={loading}
            caption="Creation Date"
            fieldValue={retirement?.createDate}
          />
          <AppFieldListItem
            loading={loading}
            caption="Investment Amount"
            fieldValue={
              retirement && {
                currencyCode: retirement.currencyCode,
                amount: retirement.investmentAmt,
              }
            }
            remarks={getPaymentPeriodRemarks(retirement?.status)}
            actionNode={<Button size="small">Adjust Amount</Button>}
          />
          <AppFieldListItem
            loading={loading}
            caption="Account Number"
            fieldValue={retirement?.debitAccount.accountNo}
            actionNode={
              retirement &&
              accounts && (
                <AccountNumberButton
                  accounts={accounts}
                  retirement={retirement}
                />
              )
            }
          />
          <AppFieldListItem
            loading={loading}
            caption="Accumulated investment amount"
            fieldValue={
              retirement && {
                currencyCode: retirement.currencyCode,
                amount: retirement.accumulatedInvestmentAmt,
              }
            }
          />
          <AppFieldListItem
            loading={loading}
            caption="Charge date"
            fieldValue={retirement && getChargeDateLabel(retirement)}
            remarks={retirement && getChargeDateRemarks(retirement)}
            actionNode={
              <Button type="link">
                <EditOutlined />
              </Button>
            }
          />
          <AppFieldListItem
            loading={loading}
            caption="Current market value"
            fieldValue={
              retirement && {
                currencyCode: retirement.currencyCode,
                amount: retirement.currentMarketValue,
              }
            }
            actionNode={<Button size="small">Redemption</Button>}
          />
          <AppFieldListItem
            loading={loading}
            caption="Status"
            fieldValue={retirement && getStatusLabel(retirement.status)}
            actionNode={
              [
                undefined,
                RetirementStatus.Pending,
                RetirementStatus.Suspended,
              ].includes(retirement?.status) ? undefined : (
                <Button size="small">Suspension of investment</Button>
              )
            }
          />
        </AppFieldList>
      </AppCard>
      <Flex justify="center">
        <Link css={linkStyle} to="/">
          Back to Home
        </Link>
      </Flex>
    </>
  );
};
