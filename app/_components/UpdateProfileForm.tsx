"use client"
import { ReactElement } from "react";
import { updateGuest } from "../_lib/actions";
import { Guest } from "@/types/types";
import SubmitBtn from '@/app/_components/SubmitBtn'
function UpdateProfileForm({ guest, children }: { guest: Guest | undefined, children: ReactElement }) {

    return <form action={updateGuest} className="bg-primary-900 py-4 px-4 md:py-8 md:px-12 text-base md:text-lg flex gap-4 md:gap-6 flex-col">
        <div className="space-y-2">
            <label>Full name</label>
            <input
                disabled
                defaultValue={guest?.fullName}
                name="fullName"
                className="md:px-5 px-2 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
            />
        </div>

        <div className="space-y-2">
            <label>Email address</label>
            <input
                disabled
                defaultValue={guest?.email}
                className="md:px-5 px-2 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
            />
        </div>

        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <label htmlFor="nationality">Where are you from?</label>
                <img
                    src={guest?.countryFlag}
                    alt="Country flag"
                    className="h-5 rounded-sm"
                />
            </div>
            {children}
        </div>

        <div className="space-y-2">
            <label htmlFor="nationalID">National ID number</label>
            <input
                name="nationalID"
                defaultValue={guest?.nationalID}
                className="md:px-5 px-2 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            />
        </div>

        <div className="flex justify-end items-center">
            <SubmitBtn>Update profile</SubmitBtn>
        </div>
    </form>
}

export default UpdateProfileForm