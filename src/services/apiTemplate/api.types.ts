export type ApiHeader = {
  key: string;
  value: string;
};

export type KeyValue<T, U> = {
  key: T;
  value: U;
};

export type ApiMethod = 'POST' | 'GET' | 'PUT' | 'DELETE';

export type ApiResult = 'success' | 'functional-failure' | 'technical-failure';

export type ApiError = {
  ErrorCode: string;
  Description: string;
};

export type ApiResponse<T> = {
  Result: ApiResult;
  Response: T;
};

// move http response to api types
export interface HttpResponse {
  ok: boolean;
  message: string;
}
