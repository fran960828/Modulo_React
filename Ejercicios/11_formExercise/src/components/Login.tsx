import { Input } from "./Input";

import { useValidInput } from "../hooks/hooks";
import type { FormEvent } from "react";
import { isEmail, minLength } from "../utils/validations";

export function Login() {
  const {
    value: enteredEmail,
    isInvalid: isInvalidEmail,
    handleChange: handleChangeEmail,
    handleBlur: handleBlurEmail,
  } = useValidInput(isEmail);
  const {
    value: enteredPassword,
    isInvalid: isInvalidPassword,
    handleChange: handleChangePassword,
    handleBlur: handleBlurPassword,
  } = useValidInput(minLength(8));
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    console.log(enteredEmail);
    console.log(enteredPassword);
  }

  return (
    <form
      className="w-9/10 max-w-2xl my-12 p-8 bg-linear-to-b from-[#253c3c] to-[#1d4949] shadow-[0_0_16px_1px_rgba(0_0_0_0.5)] mx-auto"
      onSubmit={handleSubmit}
    >
      <h3 className="font-bold text-2xl text-white mb-4">Login</h3>
      <div className="flex flex-row flex-start flex-wrap gap-4 mb-4">
        <Input
          id="email"
          label="Email"
          name="email"
          type="email"
          error={isInvalidEmail}
          onChange={(event) => handleChangeEmail(event.target.value)}
          onBlur={handleBlurEmail}
        />
        <Input
          id="password"
          label="Password"
          name="password"
          type="password"
          error={isInvalidPassword}
          onChange={(event) => handleChangePassword(event.target.value)}
          onBlur={handleBlurPassword}
        />
      </div>
      <p className="flex justify-end gap-4">
        <button
          type="reset"
          className="py-2 px-4 text-[1rem] border-none rounded-sm bg-transparent text-[#9cbaba] cursor-pointer"
        >
          Reset
        </button>
        <button className="py-2 px-4 text-[1rem] border-none rounded-sm bg-[#147b73] text-[#d9e2f1]">
          Login
        </button>
      </p>
    </form>
  );
}
