import React from "react";
import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ onClose, isOpen, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <div className="grid place-content-center absolute top-0 z-40 backdrop-blur h-screen w-screen">
          <div className="relative m-auto z-50 min-h-[200px] min-w-[300px] bg-white p-4">
            <div className="flex justify-end p-4">
              <AiOutlineClose className="text-2xl" onClick={onClose} />
            </div>
            {children}
          </div>

          {/* <div onClick={onClose} className="absolute top-0 z-0 backdrop-blur h-screen w-screen"/> */}
        </div>
      )}
    </>,

    document.getElementById("modal-root")
  );
};

export default Modal;
