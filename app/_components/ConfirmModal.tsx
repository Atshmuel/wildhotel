"use client"
import { XMarkIcon } from '@heroicons/react/24/solid';
import CustomBtn from './CustomBtn';
import { useTransition } from 'react';
import SpinnerMini from './SpinnerMini';

function ConfirmModal({
    resourceName,
    onConfirm,
    disabled,
    onCloseModal,
    warning = false
}: {
    resourceName: string
    onConfirm: () => void
    disabled: boolean
    onCloseModal?: () => void
    warning?: boolean
}) {
    const [isPending, startTransition] = useTransition()


    function handleSubmit() {
        startTransition(() => onConfirm())
    }
    return <div className='w-full flex flex-col gap-5'>
        <h3 className=' text-xl md:text-3xl font-semibold'>Delete {resourceName} </h3>
        <p className={`text-gray-300 ${warning ? "mb-1" : "mb-5"}  text-base md:text-xl`}>
            Are you sure you want to delete this reservation permanently? <br />
            This action cannot be undone.
        </p>
        {warning ? <p className='text-red-600 font-semibold mb-5 text-sm md:text-base'>
            Note! Your reservation is within less than 5 days; therefore, full amount will be charged.</p> : null}

        <div className='flex justify-end gap-3'>
            <CustomBtn onClick={() => onCloseModal?.()} disabled={isPending || disabled} >Cancel</CustomBtn>
            <CustomBtn type='primary' onClick={handleSubmit} disabled={isPending || disabled} >{isPending ? <SpinnerMini /> : "Delete"}</CustomBtn>
        </div>
    </div>


}

export default ConfirmModal;




