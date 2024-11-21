"use client"
import React from "react";
import SpinnerMini from "./SpinnerMini";

function CustomBtn({ type, disabled = false, onClick, children }: { type?: string, disabled?: boolean, onClick?: () => void, children: React.ReactElement | string }) {
    return type !== 'primary' ? <button onClick={onClick} disabled={disabled} className="md:px-8 md:py-4 px-4 py-2 font-semibold border-[0.5px] text-gray-2 border-gray-200 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 hover:scale-95" >
        {children}</button> : <button onClick={onClick} disabled={disabled} className="bg-accent-500 md:px-8 md:py-4 px-4 py-2 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 hover:scale-95 disabled:text-gray-300" >
        {children}
    </button>

}

export default CustomBtn