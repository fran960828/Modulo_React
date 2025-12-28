import { useState } from "react";

export type ValidatorFn = (value: string) => boolean;
export type Validators = ValidatorFn | ValidatorFn[];

export function useValidInput(validators: Validators) {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);

  const normalizedValidators = Array.isArray(validators)
    ? validators
    : [validators];

  function handleChange(newValue: string) {
    setValue(newValue);
    setTouched(false);
  }

  function handleBlur() {
    setTouched(true);
  }

  const isValid = normalizedValidators.every((fn) => fn(value));
  const isInvalid = touched && !isValid;

  return {
    value,
    isInvalid,
    handleChange,
    handleBlur,
  };
}
