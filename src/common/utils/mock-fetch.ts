import {
  Account,
  Retirement,
  RetirementStatus,
  UpdateRetirementPayload,
} from "../../pages/my-retirement/my-retirement-services";
import { hasValue } from "./has-value";

export const dummyAccounts: Account[] = [
  {
    accountNo: "0010234567888",
    currencyCode: "TWD",
    balance: 1218655555,
  },
  {
    accountNo: "0010234567999",
    currencyCode: "HKD",
    balance: 321065666,
  },
  {
    accountNo: "0010234568000",
    currencyCode: "USD",
    balance: 6550000,
  },
];

export const dummyRetirement: Retirement = {
  id: "dummy-id",
  debitAccount: dummyAccounts[0],
  currencyCode: "TWD",
  investmentAmt: 50000,
  accumulatedInvestmentAmt: 50000,
  currentMarketValue: 50011,
  status: "MONTHLY_CHARGE" as RetirementStatus,
  chargeDate: 1,
  createDate: new Date("2024-08-23T18:25:43.511Z"),
};

export const mockFetch: typeof fetch = (url, options) => {
  let response: Response | undefined = undefined;
  if (url === "/api/my-accounts") {
    response = {
      ok: true,
      status: 200,
      text: async () => JSON.stringify(dummyAccounts),
    } as Response;
  } else if (url === "/api/my-retirement" && options?.method === "PATCH") {
    const requestBody = options.body;
    if (!hasValue(requestBody)) {
      throw Error("options body undefined");
    }
    response = {
      ok: true,
      status: 200,
      text: async () =>
        JSON.stringify({
          ...dummyRetirement,
          debitAccount: dummyAccounts.find(
            (a) =>
              a.accountNo ===
              (JSON.parse(requestBody.toString()) as UpdateRetirementPayload)
                .debitAccountNo
          ),
        }),
    } as Response;
  } else if (url === "/api/my-retirement") {
    response = {
      ok: true,
      status: 200,
      text: async () => JSON.stringify(dummyRetirement),
    } as Response;
  }

  if (response === undefined) {
    return Promise.reject(
      `Missing mock for URL -${
        hasValue(options?.method) ? ` ${options?.method} -` : ""
      } ${url}`
    );
  }

  return new Promise((resolve) => setTimeout(() => resolve(response), 3000));
};
