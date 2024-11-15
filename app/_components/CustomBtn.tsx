"use client"
import React from "react";
import SpinnerMini from "./SpinnerMini";

function CustomBtn({ type, disabled = false, onClick, children }: { type?: string, disabled?: boolean, onClick?: () => void, children: React.ReactElement | string }) {
    return type !== 'primary' ? <button onClick={onClick} disabled={disabled} className="px-8 py-4 font-semibold border-[0.5px] text-gray-2 border-gray-200 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 hover:scale-95" >
        {children}</button> : <button onClick={onClick} disabled={disabled} className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 hover:scale-95 disabled:text-gray-300" >
        {children}
    </button>

}

export default CustomBtn