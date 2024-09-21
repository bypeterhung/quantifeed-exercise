import { ApiError } from "./api-error";
import { hasValue } from "./has-value";
import { mockFetch } from "./mock-fetch";

function reviveJsonDate(_: unknown, value: unknown) {
  if (typeof value === "string") {
    const isDate = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/.test(
      value
    );
    if (isDate) {
      return new Date(value);
    }
  }
  return value;
}

export async function apiRequest<TResult>(
  url: string,
  userToken?: string,
  options?: RequestInit
) {
  try {
    // const response = await fetch(url, ......
    const response = await mockFetch(
      url,
      hasValue(userToken)
        ? {
            ...options,
            headers: {
              Authorization: `Bearer ${userToken}`,
              ...options?.headers,
            },
          }
        : options
    );

    if (!response.ok) {
      // read response body in case backend provide error details
      let responseErrorBody: unknown;
      try {
        responseErrorBody = await response.json();
      } catch {
        // nothing to do
      }

      throw new ApiError({
        message: `API response not ok`,
        requestUrl: url,
        requestOptions: options,
        statusCode: response.status,
        statusText: response.statusText,
        responseErrorBody,
      });
    }

    const responseText = await response.text();
    const result: TResult = JSON.parse(responseText, reviveJsonDate);

    return result;
  } catch (e) {
    if (e instanceof ApiError) {
      throw e;
    }
    throw new ApiError({
      message: "Api Error",
      requestUrl: url,
      requestOptions: options,
      cause: e as Error,
    });
  }
}
