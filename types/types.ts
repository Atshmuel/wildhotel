import { DefaultSession, Session, User } from "next-auth";

export type Cabins = {
    _id: string;
    createdAt: string;
    name: string;
    maxCapacity: number;
    regularPrice: number;
    discount: number;
    description: string;
    imgsUrl: string[];
    lastUpdate?: Date;
}
export type Guest = {
    _id: string;
    fullName: string;
    email: string;
    nationalID: number;
    nationality: string;
    countryFlag: string;
}

export type Country = {
    name: string,
    flag: string,
    independent: boolean
}

export type searchParams = {
    name?: string,
    capacity?: string,
    cost?: string,

}

export type Bookings = {
    _id: string
    createdAt: Date;
    startDate: Date;
    endDate: Date;
    numNights: number;
    numGuests: number;
    cabinPrice: number;
    extrasPrice: number;
    totalPrice: number;
    hasBreakfast: boolean;
    isPaid: boolean;
    observations: string;
    status: string;
    cabinID: string
    guestID: string
    cabinImg?: string,
    cabinName?: string
}

export type Settings = {
    createdAt: Date;
    minBookingLen: number;
    maxBookingLen: number;
    maxGuests: number;
    breakfastPrice: number;
}


export interface CustomSession extends DefaultSession {
    user?: User & { guestId: string }
}

export interface ModalContextType {
    openName: string;
    close: () => void;
    open: (name: string) => void;
}