"use client";

import Modal from "@/app/_components/Modal";
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import Link from "next/link";
import ConfirmModal from "./ConfirmModal";
import { deleteBooking } from "../_lib/actions";
import { addDays, isBefore } from "date-fns";

function ReservationActions({ id, startDate }: { id: string, startDate: Date }) {
    const dateInRange = isBefore(startDate, addDays(new Date(), 5))

    return (
        <Modal>
            <div className='flex justify-end gap my-1 md:flex-col md:border-l border-primary-800 md:w-[100px]'>
                {!dateInRange ? <Link
                    href={`/account/reservations/edit/${id}`}
                    className='group flex items-center px-3 py-1 gap-2 uppercase text-xs font-bold text-primary-300 border-r md:border-b border-primary-800 md:flex-grow  hover:bg-accent-600 transition-colors hover:text-primary-900'
                >
                    <PencilSquareIcon className='h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors' />
                    <span className='mt-1'>Edit</span>
                </Link> : null

                }
                <Modal.Open opens={id}>
                    <button className='group flex items-center px-3 py-1 gap-2 uppercase text-xs font-bold text-primary-300 md:flex-grow border-l border-primary-800 md:border-none hover:bg-accent-600 transition-colors hover:text-primary-900'>
                        <TrashIcon className='h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors' />
                        <span className='mt-1'>Delete</span>
                    </button>
                </Modal.Open>

                <Modal.Window name={id}>
                    <ConfirmModal disabled={false} resourceName="booking" onConfirm={() => { deleteBooking(id) }} warning={dateInRange} />
                </Modal.Window>
            </div>
        </Modal>
    );
}

export default ReservationActions;