'use client'
import { createPortal } from "react-dom";
import { cloneElement, createContext, ReactElement, useContext, useState } from "react";
import useOutsideClick from "@/app/_hooks/useOutsideClick";
import { XMarkIcon } from '@heroicons/react/24/solid';

import { ModalContextType } from "@/types/types";


const ModalContext = createContext<ModalContextType>({
    openName: "",
    close: () => { },
    open: () => { }
});

export default function Modal({ children }: { children: ReactElement }) {
    const [openName, setOpenName] = useState("");
    const close = () => setOpenName("");
    const open = setOpenName;

    return (
        <ModalContext.Provider value={{ openName, close, open }}>
            {children}
        </ModalContext.Provider>
    );
}

function Open({ children, opens: opensWindowName }: { children: ReactElement, opens: string }) {
    const { open } = useContext(ModalContext);

    return cloneElement(children, { onClick: () => { open(opensWindowName) } });
}
function Window({ children, name }: { children: ReactElement, name: string }) {
    const { openName, close } = useContext(ModalContext);

    const ref = useOutsideClick(close);

    if (name !== openName) return null;

    return createPortal(
        <div className="fixed top-0 left-0 z-20 w-full h-full backdrop-blur-sm transition-all duration-500">
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-900 text-primary-100  shadow-lg px-8 py-10 md:px-14 md:py-16 transition-all duration-500  md:w-1/2 w-11/12 " ref={ref}>
                <button onClick={close} className="size-8 absolute top-5 right-8 transition-all duration-150 translate-x-3 p-1 hover:scale-110">
                    <XMarkIcon className="fill-gray-400 hover:fill-gray-100 transition-all duration-150" />
                </button>
                <div className="modal-content">
                    {cloneElement(children, { onCloseModal: close })}
                </div>
            </div>
        </div>,
        document.body
    );
}

Modal.Open = Open;
Modal.Window = Window;
