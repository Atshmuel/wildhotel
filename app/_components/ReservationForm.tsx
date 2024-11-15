"use client"
import { Cabins } from "@/types/types";
import { useReservation } from "./ReservationContext";
import { User } from "next-auth";
import Image from "next/image";
import { differenceInDays } from "date-fns";
import { createBooking } from "../_lib/actions";
import SubmitBtn from "./SubmitBtn";
import { toUTCDate } from "../_lib/data-service";

function ReservationForm({ cabin, user }: { cabin: Cabins, user: User }) {
  const { range, resetRange } = useReservation()

  const { maxCapacity, regularPrice, discount, _id: id } = cabin
  const startDate = range?.from
  const endDate = range?.to

  const numNights = Math.abs(differenceInDays(startDate || "", endDate || ""))

  const cabinPrice = numNights * (regularPrice - discount)

  const bookingData = {
    startDate: toUTCDate(startDate!),
    endDate: toUTCDate(endDate!),
    numNights,
    cabinPrice,
    cabinID: id
  }

  const bindBookingData = createBooking.bind(null, bookingData)
  const handleSubmit = async (formData: FormData) => {
    await bindBookingData(formData)
    resetRange()
  }

  return (
    <div className='scale-[1]'>
      <div className='bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center'>
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

      <form action={handleSubmit} className='bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col'>
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

        <div className='space-y-2'>
          <label htmlFor='observations'>
            Anything we should know about your stay?
          </label>
          <textarea
            name='observations'
            id='observations'
            className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
            placeholder='Any pets, allergies, special requirements, etc.?'
          />
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