"use client"
import React, { createContext, useContext, useState } from "react";
import type { DateRange } from 'react-day-picker';

const initState: DateRange = { from: undefined, to: undefined }
const ReservationContext = createContext<{ range: DateRange, setRange: React.Dispatch<React.SetStateAction<DateRange>>, resetRange: () => void } | undefined>(undefined)

function ReservationProvider({ children }: { children: React.ReactNode }) {
    const [range, setRange] = useState(initState)
    const resetRange = () => setRange(initState)

    return <ReservationContext.Provider value={{ range, setRange, resetRange }}>{children}</ReservationContext.Provider>
}

function useReservation() {
    const context = useContext(ReservationContext)
    if (context === undefined) throw new Error("context was used outside a provider")
    return context
}


export { ReservationProvider, useReservation }