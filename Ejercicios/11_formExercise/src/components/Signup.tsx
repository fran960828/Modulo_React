import { useState, type FormEvent } from "react";

export function Signup() {
  const [passwordAreNotEqual, setPasswordsAreNotEqual] =
    useState<boolean>(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const fd = new FormData(event.currentTarget);

    const data = {
      email: fd.get("email") as string,
      password: fd.get("password") as string,
      confirmPassword: fd.get("confirm-password") as string,
      name: fd.get("name") as string,
      lastname: fd.get("lastname") as string,
      role: fd.get("rol") as string,
      acquisition: fd.getAll("acquisition") as string[],
      condition: fd.get("condition") === "on",
    };

    if (data.password !== data.confirmPassword) {
      setPasswordsAreNotEqual(true);
      return;
    }

    console.log(data);
  }

  return (
    <form
      className="w-9/10 max-w-2xl my-12 p-8 bg-linear-to-b from-[#253c3c] to-[#1d4949] shadow-[0_0_16px_1px_rgba(0_0_0_0.5)] mx-auto"
      onSubmit={handleSubmit}
    >
      <h3 className="font-bold text-2xl text-white mb-4">Welcome on Board</h3>
      <p className="font-normal text-xl text-white mb-4">
        We just need a little bit of data from you to get you started 🚀
      </p>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm mb-1 text-[#9bafaf] uppercase font-bold"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="block w-full max-w-60 p-2 text-lg rounded-sm bg-[#869999] border border-[#869999] text-[#142020]"
        />
      </div>
      <div className="mb-4 flex gap-8">
        <div>
          <label
            htmlFor="password"
            className="block text-sm mb-1 text-[#9bafaf] uppercase font-bold"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="block w-full max-w-60 p-2 text-lg rounded-sm bg-[#869999] border border-[#869999] text-[#142020]"
          />
          {passwordAreNotEqual && (
            <p className="text-red-400 text-sm mt-2">Passwords do not match</p>
          )}
        </div>
        <div>
          <label
            htmlFor="confirm-password"
            className="block text-sm mb-1 text-[#9bafaf] uppercase font-bold"
          >
            Confirm Password
          </label>
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            className="block w-full max-w-60 p-2 text-lg rounded-sm bg-[#869999] border border-[#869999] text-[#142020]"
          />
          {passwordAreNotEqual && (
            <p className="text-red-400 text-sm mt-2">Passwords do not match</p>
          )}
        </div>
      </div>
      <div className="mb-4 flex gap-8">
        <div>
          <label
            htmlFor="name"
            className="block text-sm mb-1 text-[#9bafaf] uppercase font-bold"
          >
            First Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="block w-full max-w-60 p-2 text-lg rounded-sm bg-[#869999] border border-[#869999] text-[#142020]"
          />
        </div>
        <div>
          <label
            htmlFor="lastname"
            className="block text-sm mb-1 text-[#9bafaf] uppercase font-bold"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            className="block w-full max-w-60 p-2 text-lg rounded-sm bg-[#869999] border border-[#869999] text-[#142020]"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="rol"
          className="block text-sm mb-1 text-[#9bafaf] uppercase font-bold"
        >
          What best describe your rol?
        </label>
        <select
          name="rol"
          id="rol"
          className="block w-full max-w-60 p-2 text-lg rounded-sm bg-[#869999] border border-[#869999] text-[#142020] mb-2"
        >
          <option value="">-</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="profesional">Profesional</option>
          <option value="other">Other</option>
        </select>
      </div>
      <fieldset className="flex flex-col items-start gap-0.5 p-4 border-2 rounded-sm mb-4 border-[#869999]">
        <legend className="block text-sm mb-1 text-[#9bafaf] uppercase font-bold">
          How did you find us?
        </legend>
        <div className="flex flex-row items-center justify-center gap-2">
          <input
            type="checkbox"
            id="google"
            value="google"
            name="adquisition"
            className="block w-full max-w-60 p-2 text-lg rounded-sm bg-[#869999] border border-[#869999] text-[#142020]"
          />
          <label
            htmlFor="google"
            className="block text-sm mb-1 text-[#9bafaf] uppercase font-bold"
          >
            Google
          </label>
        </div>
        <div className="flex flex-row items-center justify-start gap-2">
          <input
            type="checkbox"
            id="friend"
            value="friend"
            name="adquisition"
            className="block w-full max-w-60 p-2 text-lg rounded-sm bg-[#869999] border border-[#869999] text-[#142020]"
          />
          <label
            htmlFor="friend"
            className="block text-sm mb-1 text-[#9bafaf] uppercase font-bold"
          >
            Friend
          </label>
        </div>
        <div className="flex flex-row items-center justify-center gap-2">
          <input type="checkbox" id="other" value="other" name="adquisition" />
          <label
            htmlFor="other"
            className="block text-sm mb-1 text-[#9bafaf] uppercase font-bold"
          >
            Other
          </label>
        </div>
      </fieldset>
      <div className="flex flex-1 justify-start items-center">
        <label className="flex items-center gap-2 text-sm text-[#9bafaf] uppercase font-bold">
          <input
            type="checkbox"
            id="condition"
            name="condition"
            required
            className="h-4 w-4 accent-[#147b73]"
          />
          I agree with the terms and conditions
        </label>
      </div>
      <p className="flex justify-end gap-4">
        <button
          type="reset"
          className="py-2 px-4 text-[1rem] border-none rounded-sm bg-transparent text-[#9cbaba] cursor-pointer"
        >
          Reset
        </button>
        <button
          type="submit"
          className="py-2 px-4 text-[1rem] border-none rounded-sm bg-[#147b73] text-[#d9e2f1]"
        >
          Login
        </button>
      </p>
    </form>
  );
}
