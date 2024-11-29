"use client"
import { Cabins } from "@/types/types";
import { useReservation } from "./ReservationContext";
import { User } from "next-auth";
import { differenceInDays } from "date-fns";
import { payment, createBooking } from "../_lib/actions";
import SubmitBtn from "./SubmitBtn";
import { toUTCDate } from "../_lib/data-service";
import { useState } from "react";

function ReservationForm({ cabin, user }: { cabin: Cabins, user: User }) {
  const { range, resetRange } = useReservation()
  const [lettersCnt, setLettersCnt] = useState(0)

  const handlePress = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLettersCnt(() => e.target.value.length)
  }


  const { maxCapacity, regularPrice, discount, _id: id } = cabin
  const startDate = range?.from
  const endDate = range?.to

  const numNights = Math.abs(differenceInDays(startDate || "", endDate || ""))

  const totalPrice = numNights * (regularPrice - discount)

  const bookingData = {
    startDate: toUTCDate(startDate!),
    endDate: toUTCDate(endDate!),
    numNights,
    totalPrice,
    cabinID: id,
    cabinPrice:regularPrice,
    extrasPrice:0,
    hasBreakfast:false,
    isPaid:false,
    status:'unconfirmed'
  }

  // const bindBookingData = createBooking.bind(null, bookingData)
  const handleSubmit = async (formData: FormData) => {
    const data = {...bookingData, 
      numGuests: Number(formData.get('numGuests')), 
      observations: formData.get('observations')?.slice(0, 1000)
    }

    await payment(cabin._id, numNights,data)

    resetRange()
  }



  return (
    <div className='scale-[1]'>
      <div className='bg-primary-800 text-primary-300 px-5 text-sm md:text-base lg:px-16 py-2 flex justify-between items-center'>
        <p>Logged in as</p>
        <div className='flex gap-4 items-center'>
          <img
            referrerPolicy='no-referrer'
            className='h-8 rounded-full'
            src={user.image || ""}
            alt={user.name || "userImage"}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form action={handleSubmit} className='bg-primary-900 py-4 px-6 md:py-10 md:px-16 text-base md:text-lg flex gap-5 flex-col'>
        <div className='space-y-2'>
          <label htmlFor='numGuests'>How many guests?</label>
          <select
            name='numGuests'
            id='numGuests'
            className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
            required
          >
            <option value='' key=''>
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? 'guest' : 'guests'}
              </option>
            ))}
          </select>
        </div>

        <div className='space-y-2 relative'>
          <label htmlFor='observations'>
            Anything we should know about your stay?
          </label>
          <textarea
            onChange={handlePress}
            maxLength={1000}
            name='observations'
            id='observations'
            className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
            placeholder='Any pets, allergies, special requirements, etc.?'
          />
          <div className="absolute bottom-2 text-primary-950 right-1 text-sm md:text-base">
            <span>{1000 - lettersCnt} </span>
          </div>
        </div>

        <div className='flex justify-end items-center'>
          {!range?.from || !range?.to ?
            <p className={`${range?.from && range?.to ? 'text-gray-600' : 'text-amber-400'} font-semibold text-base`}>Start by selecting dates</p>
            :
            <SubmitBtn>Reserve now</SubmitBtn>
          }

        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
