import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import type { Imodal } from "../../core/entities";

function Modal({ open, children, onClose }: Imodal) {
  const dialog = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (open) {
      dialog.current!.showModal();
    } else {
      dialog.current!.close();
    }
  }, [open]);

  return createPortal(
    <dialog className="modal mx-auto my-auto" ref={dialog} onClose={onClose}>
      {open ? children : null}
    </dialog>,
    document.getElementById("modal")!
  );
}

export default Modal;
