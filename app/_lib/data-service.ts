import { serverURL } from '@/config/config';
import { Bookings, Cabins, Country, Guest, Settings } from '@/types/types';
import { eachDayOfInterval } from 'date-fns';
import { notFound } from 'next/navigation';

export async function getCabinsData(): Promise<Cabins[]> {
  try {
    const res = await fetch(`${serverURL}/cabins`);
    const data = await res.json();
    if (!res.ok) throw Error('Could not fetch cabins at the moment')
    return data;
  } catch (error: any) {
    return error
  }
}

export async function getCabin(id: string): Promise<Cabins> {
  const res = await fetch(`${serverURL}/cabins/byID?id=${id}`);

  if (!res.ok) { notFound() }
  const data = await res.json();
  return data;
}

export async function getCountries(): Promise<Country[]> {
  try {
    const res = await fetch(
      'https://restcountries.com/v2/all?fields=name,flag'
    );
    const countries = await res.json();
    return countries;
  } catch {
    throw new Error('Could not fetch countries');
  }
}

export async function getBookingDatesById(cabinId: string): Promise<Date[]> {
  const res = await fetch(`${serverURL}/bookings/bookingByCabinId?id=${cabinId}`)
  const data: Bookings[] = await res.json()
  if (!data) {
    notFound()
  }
  const bookedDates = data.length ? data.flatMap(booking =>
    eachDayOfInterval({ start: booking.startDate, end: booking.endDate })
  ) : []
  return bookedDates
}

export async function getSettings(): Promise<Settings> {
  const res = await fetch(`${serverURL}/settings`)
  const data = await res.json()
  if (!res.ok) { notFound() }
  return data
}

export async function getGuest(email: string | null | undefined): Promise<Guest | undefined> {
  if (!email) return
  const res = await fetch(`${serverURL}/guests/guest/${email}`)
  if (!res.ok) return
  const data = await res.json()
  return data
}
export async function createGuest(newGuest: {
  fullName: string;
  email: string;
}): Promise<Guest | boolean> {
  const res = await fetch(`${serverURL}/guests`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newGuest)
    })
  if (!res.ok) return false
  const data = await res.json()
  return data
}

export async function getGuestBookings(guestId: string): Promise<Bookings[] | []> {
  const res = await fetch(`${serverURL}/guests/bookings/${guestId}`)
  const bookings: Bookings[] | [] = await res.json()
  return bookings
}

export async function getBookings(): Promise<Bookings[]> {
  const res = await fetch(`${serverURL}/bookings/all`)
  if (!res.ok) throw new Error('Failed to get Bookings information')
  const data: { bookings: Bookings[] } = await res.json()
  if (!data.bookings.length) throw new Error('Could not find any bookings.')
  return data.bookings
}

export async function getBooking(id: string): Promise<{ booking: Bookings, cabin: Cabins, guest: Guest }> {
  const res = await fetch(`${serverURL}/bookings/booking/${id}`)
  if (!res.ok) throw new Error("Couldn't find this booking.")
  const data: { booking: Bookings, cabin: Cabins, guest: Guest } = await res.json()
  return data
}


export async function delayMaker(time: number) {
  return await new Promise((res) => setTimeout(res, time * 2))
}

export function toUTCDate(date: Date) {
  if (!date) return
  const utcDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return utcDate;
}