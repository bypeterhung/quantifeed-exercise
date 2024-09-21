import { apiRequest } from "../../common/utils/api-request";

export type Account = {
  accountNo: string;
  currencyCode: string;
  balance: number;
};

export const getMyAccounts = (userToken: string) => {
  return apiRequest<Account[]>("/api/my-accounts", userToken);
};

export enum RetirementStatus {
  Pending = "PENDING",
  MonthlyCharge = "MONTHLY_CHARGE",
  YearlyCharge = "ANNUALLY_CHARGE",
  Suspended = "SUSPENDED",
}

export type Retirement = {
  id: string;
  debitAccount: Account;
  currencyCode: string;
  investmentAmt: number;
  accumulatedInvestmentAmt: number;
  currentMarketValue: number;
  status: RetirementStatus;
  chargeDate: number;
  createDate: Date;
};

export const getMyRetirement = (userToken: string) => {
  return apiRequest<Retirement>("/api/my-retirement", userToken);
};

export type UpdateRetirementPayload = Partial<
  Omit<Retirement, "id" | "debitAccount"> & { debitAccountNo: string }
>;

export const updateMyRetirement = (
  payload: UpdateRetirementPayload,
  userToken: string
) => {
  return apiRequest<Retirement>("/api/my-retirement", userToken, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
};
