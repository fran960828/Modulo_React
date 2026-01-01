export function FormView({
  totalAmount,
  pending,
  formAction,
  closeAll,
}: {
  totalAmount: number;
  pending: boolean;
  formAction: (payload: FormData) => void;
  closeAll: () => void;
}) {
  return (
    <form
      className="absolute z-10 top-40 left-[30%] rounded-lg max-w-2xl p-8 bg-linear-to-b from-[#253c3c] to-[#1d4949] shadow-[0_0_16px_1px_rgba(0_0_0_0.5)] mx-auto"
      action={formAction}
    >
      <h3 className="font-bold text-2xl text-white mb-4">Checkout</h3>
      <p className="font-normal text-xl text-white mb-4">
        {`Total Amount:$${totalAmount}`}
      </p>
      <div className="mb-4">
        <label
          htmlFor="fullname"
          className="block text-sm mb-1 text-[#9bafaf] uppercase font-bold"
        >
          Fullname
        </label>
        <input
          type="text"
          name="fullname"
          id="fullname"
          className="block w-full max-w-60 p-2 text-lg rounded-sm bg-[#869999] border border-[#869999] text-[#142020]"
        />
      </div>

      <div>
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

      <div>
        <label
          htmlFor="name"
          className="block text-sm mb-1 text-[#9bafaf] uppercase font-bold"
        >
          Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          className="block w-full max-w-60 p-2 text-lg rounded-sm bg-[#869999] border border-[#869999] text-[#142020]"
        />
      </div>

      <div className="flex gap-4 mb-4">
        <div>
          <label
            htmlFor="postalCode"
            className="block text-sm mb-1 text-[#9bafaf] uppercase font-bold"
          >
            postalCode
          </label>
          <input
            type="text"
            id="postasCode"
            name="postalCode"
            className="block w-full max-w-60 p-2 text-lg rounded-sm bg-[#869999] border border-[#869999] text-[#142020]"
          />
        </div>
        <div>
          <label
            htmlFor="city"
            className="block text-sm mb-1 text-[#9bafaf] uppercase font-bold"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            className="block w-full max-w-60 p-2 text-lg rounded-sm bg-[#869999] border border-[#869999] text-[#142020]"
          />
        </div>
      </div>
      <p className="flex justify-end gap-4">
        <button
          className="py-2 px-4 text-[1rem] border-none rounded-sm bg-transparent text-[#9cbaba] cursor-pointer"
          type="reset"
          onClick={closeAll}
        >
          Close
        </button>
        <button
          type="submit"
          className="py-2 px-4 text-[1rem] border-none rounded-sm bg-[#147b73] text-[#d9e2f1]"
        >
          {pending ? "Procesando..." : "Submit Order"}
        </button>
      </p>
    </form>
  );
}
