// svaret fra alle repository- og service-funksjoner

// 400 ugyldig input, 403 ikke lov, 404 finnes ikke, 500 lagringsfeil
export type ErrorCode = 400 | 403 | 404 | 500;

export type Success<T> = {
  success: true;
  data: T;
};

export type Failure = {
  success: false;
  error: string;
  code?: ErrorCode;
  // feil per felt fra zod, til skjemaene
  fieldErrors?: Record<string, string[] | undefined>;
};

export type Result<T> = Success<T> | Failure;

export function success<T>(data: T): Success<T> {
  return { success: true, data };
}

export function failure(error: string, code?: ErrorCode, fieldErrors?: Failure["fieldErrors"]): Failure {
  const result: Failure = { success: false, error };
  if (code) result.code = code;
  if (fieldErrors) result.fieldErrors = fieldErrors;
  return result;
}
