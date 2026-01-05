import type { INotification } from "../../core/domain/models";

const Notification = ({ title, message, status }: INotification) => {
  let classNotification =
    "w-full h-12 bg-[#1a8ed1] flex justify-between py-2 px-[10%] items-center text-white";

  if (status === "error") {
    classNotification += " bg-[#690000]";
  }
  if (status === "success") {
    classNotification += " bg-[#1ad1b9]";
  }

  return (
    <section className={classNotification}>
      <h2 className="text-xl m-0">{title}</h2>
      <p className="text-lg m-0">{message}</p>
    </section>
  );
};

export default Notification;
