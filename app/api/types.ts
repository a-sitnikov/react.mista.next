export type IOKResponse<T> = {
  ok: true;
  data: T;
  headers?: Headers;
};

export type IErrorResponse = {
  ok: false;
  error: string;
  text: string;
  headers?: Headers;
};

export type IResponse<T> = IOKResponse<T> | IErrorResponse;
