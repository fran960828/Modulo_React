import type { ValidatorFn } from "../hooks/hooks";

export const isEmail: ValidatorFn = (value) => value.includes("@");

export const minLength =
  (length: number): ValidatorFn =>
  (value) =>
    value.length >= length;
