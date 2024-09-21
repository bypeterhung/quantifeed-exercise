type ApiErrorParams = {
  message: string;
  requestUrl: string;
  requestOptions?: RequestInit;
  statusCode?: number;
  statusText?: string;
  responseErrorBody?: unknown;
  cause?: Error;
};

export class ApiError extends Error {
  public requestUrl: string;
  public requestOptions?: RequestInit;
  public statusCode?: number;
  public statusText?: string;
  public responseErrorBody?: unknown;
  public cause?: Error;

  constructor(params: ApiErrorParams) {
    super(params.message);
    this.requestUrl = params.requestUrl;
    this.requestOptions = params.requestOptions;
    this.statusCode = params.statusCode;
    this.statusText = params.statusText;
    this.responseErrorBody = params.responseErrorBody;
    //developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause#rethrowing_an_error_with_a_cause
    this.cause = params.cause;
    this.name = "ApiError";

    // Maintains proper stack trace for where our error was thrown (only available on V8), https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#custom_error_types
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}
