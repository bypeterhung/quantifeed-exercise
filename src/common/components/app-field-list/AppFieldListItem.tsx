import { FC, ReactNode } from "react";

import { css } from "@emotion/react";
import { Skeleton } from "antd";

import { appTheme } from "../../../app-theme";
import { useActiveLocale } from "../../hooks/useActiveLocale";
import { formatDate, formatNumber } from "../../utils/format";
import { hasValue } from "../../utils/has-value";

const outerStyles = css`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  & span:first-child {
    font-weight: 500;
  }
  & span {
    font-size: 0.8rem;
    margin-right: 0.15rem;
  }
  & strong {
    font-size: 1.2rem;
    margin-right: 0.15rem;
    color: ${appTheme.colorHighlight};
  }
  & small {
    font-size: 0.65rem;
  }
`;

const remarksStyles = css`
  margin-left: 0.15rem;
`;

const actionStyles = css`
  margin-left: auto;
`;

type CurrencyValue = {
  currencyCode: string;
  amount: number;
};

type Props = {
  loading?: boolean;
  caption?: string;
  fieldValue?: string | Date | CurrencyValue;
  actionNode?: ReactNode;
  remarks?: string;
};

const AppFieldListItem: FC<Props> = ({
  loading = false,
  caption,
  fieldValue,
  remarks,
  actionNode,
}) => {
  const locale = useActiveLocale();

  const displayFieldValue = (value: Props["fieldValue"]) => {
    if (!hasValue(value)) {
      return undefined;
    }
    if (typeof value === "string") {
      return <strong>{value}</strong>;
    } else if (value instanceof Date) {
      return <strong>{formatDate(value, locale.datePattern)}</strong>;
    } else {
      return (
        <>
          <span>{value.currencyCode}</span>{" "}
          <strong>{formatNumber(value.amount, locale.number)}</strong>
        </>
      );
    }
  };

  return (
    <div css={outerStyles}>
      {loading ? (
        <Skeleton.Input active block />
      ) : (
        <>
          <span>{caption}:</span>
          {displayFieldValue(fieldValue)}
          {hasValue(remarks, ["disallow-whitespace"]) && (
            <small css={remarksStyles}>{remarks}</small>
          )}
          <div css={actionStyles}>{actionNode}</div>
        </>
      )}
    </div>
  );
};

export default AppFieldListItem;
