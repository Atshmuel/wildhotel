"use client"
import { useFormStatus } from "react-dom";
import SpinnerMini from "./SpinnerMini";

function SubmitBtn({ children }: { children: string }) {
    const { pending } = useFormStatus()

    return <button className="bg-accent-500 md:px-8 md:py-4 px-4 py-2 text-base text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300" disabled={pending}>
        {pending ? <SpinnerMini /> : children}
    </button>
}

export default SubmitBtn