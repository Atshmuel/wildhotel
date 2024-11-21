"use client"
import { Cabins, Settings } from "@/types/types";
import { differenceInDays, isWithinInterval } from "date-fns";

import { DayPicker, DateRange, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "./ReservationContext";
import { useCallback } from "react";

function isAlreadyBooked(range: DateRange, datesArr: Date[]) {
  return (
    range?.from && range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from as Date, end: range.to as Date })
    )
  );
}

function DateSelector({ settings, bookedDates, cabin }: { settings: Settings, bookedDates: Date[], cabin: Cabins }) {

  const defaultClassNames = getDefaultClassNames();
  const { range, setRange, resetRange } = useReservation()
  const { regularPrice, discount } = cabin
  const { minBookingLen, maxBookingLen } = settings
  const cabinPrice = regularPrice - discount;
  const numNights = differenceInDays(range?.to || "", range?.from || "")
  const handleReset = useCallback(() => {
    resetRange()
  }, [resetRange])
  const displayRange = isAlreadyBooked(range, bookedDates)
  if (displayRange) {
    setRange({ from: undefined, to: undefined })
  }

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-12 place-self-center"
        mode="range"
        min={minBookingLen + 1}
        max={maxBookingLen}
        onSelect={setRange}
        disabled={[...bookedDates, { before: new Date() }]}
        defaultMonth={new Date()}
        captionLayout="dropdown"
        numberOfMonths={1}
        selected={range}
        required
        classNames={{ root: `${defaultClassNames.root} text-primary-200 pt-4`, chevron: `fill-amber-300`, today: `text-primary-200`, range_start: "bg-amber-300", range_end: "bg-amber-300", selected: `text-primary-900 bg-amber-300` }}
      />
      <div className="flex items-center justify-between px-3 md:px-8 bg-accent-500 text-primary-800 h-14 md:h-[72px]">
        <div className="flex items-center md:items-baseline gap-2 md:gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-xl lg:text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-base lg:text-2xl">${regularPrice}</span>
            )}
            <span className="text-xs lg:text-base">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-2 lg:px-3 py-2 text-sm lg:text-2xl">
                <span>&times;</span><span>{numNights}</span>
              </p>
              <p>
                <span className="text-sm lg:text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-sm lg:text-2xl font-semibold">${cabinPrice * numNights}</span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            className="text-xs py-1 px-2 border border-primary-800 lg:py-2 lg:px-4 lg:text-sm font-semibold"
            onClick={handleReset}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div >
  );
}

export default DateSelector;
