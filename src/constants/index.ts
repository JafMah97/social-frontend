export const LANG_COOKIE = "lang";
export const maxSizeMB = 2;
export const maxChars = 1000;

// constants/error-codes.ts
export const ERROR_CODES = {
  UNKNOWN: "unknownError",
  NETWORK: "networkError",
  UNAUTHORIZED: "unauthorized",
  VALIDATION: "validationError",
  TIMEOUT: "timeoutError",
  SERVER: "serverError",
} as const;

// Type union of all error codes
export type ErrorCode = typeof ERROR_CODES[keyof typeof ERROR_CODES];
