"use server"

import { revalidatePath } from "next/cache"
import { auth, signIn, signOut } from "./auth"
import { serverURL } from "@/config/config"
import { getBooking, getGuestBookings } from "./data-service"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { bookingData } from "@/types/types"

export async function updateGuest(formData: FormData) {
    const email = formData?.get("email")
    const session = await auth()
    const nationalityInfo = formData?.get("nationality")
    const nationalId = formData?.get("nationalID")
    if (typeof nationalId !== 'string' || typeof nationalityInfo !== 'string') throw new Error("Error, nationality type unknown.")
    if (!nationalityInfo) throw new Error("Please Select Country.")
    const nationalIdRegex = /^[a-zA-Z0-9]\d{6,12}$/.test(nationalId)
    if (!nationalIdRegex) throw new Error('ID is not valid, length should be between 6-12.')
    const [nationality, flag] = nationalityInfo.split('%')

    const res = await fetch(`${serverURL}/guests/${session?.user?.guestId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ flag, nationality, nationalId, email })
    })
    if (!res.ok) throw new Error('Failed to update guest information.')
    revalidatePath('/account/profile')
}

export async function updateBooking(formData: FormData) {
    const session = await auth()
    const numGuests = formData.get('numGuests')
    let observations = formData.get('observations')
    const bookingId = formData.get('bookingId')
    if (!session || !session?.user) throw new Error('Failed to get user data, therefore prevented delete.')
    if (!numGuests || !bookingId || typeof bookingId !== 'string' || typeof observations !== 'string') throw new Error('Missing number of guests or booking id.')
    const { booking } = await getBooking(bookingId)
    if (booking.guestID !== session?.user.guestId) throw new Error('User is not allowed to perform this action.')

    const res = await fetch(`${serverURL}/bookings/update/${bookingId}`,
        {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ numGuests, observations: observations?.slice(0, 1000) })
        })
    if (!res.ok) throw new Error("Failed to update booking, please try again or contant our support team")
    revalidatePath('/account/reservations')
    revalidatePath(`/account/reservations/edit/${bookingId}`)
    redirect('/account/reservations')

}



export async function deleteBooking(id: string) {
    //handle refound
    const session = await auth()
    if (!session || !session.user) throw new Error('Failed to get user data, therefore prevented delete.')
    const bookings = await getGuestBookings(session.user.guestId!)
    const correctUser = bookings.find(booking => booking._id === id)
    if (!correctUser) throw new Error('User is not allowed to perform this action.')
    const res = await fetch(`${serverURL}/guests/bookings/delete/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Failed to delete, please try again later')
    revalidatePath('/account/reservations')
    revalidatePath(`/cabins/${id}`)
}


export async function signInAction(redirectTo: string = '/account') {
    await signIn('google', { redirectTo })
}

export async function signOutAction() {
    await signOut({ redirectTo: '/' })
}

export async function createBooking() {
    const stripeSID = cookies().get('sId')?.value
    const session = await auth()
    if (!session?.user.guestId) throw new Error('User must auth first!')
    const BookingCookieData = cookies().get('bookingData')?.value
    if (!BookingCookieData) return
    const data = { ...JSON.parse(BookingCookieData), sId: stripeSID, guestID: session.user.guestId }

    const res = await fetch(`${serverURL}/bookings/new`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
    if (!res.ok) {
        const { error }: { error: string } = await res.json()
        throw new Error(error)
    }
    const { message, status }: { message: string, status: boolean } = await res.json()

    revalidatePath(`/cabins/${data.cabinID}`)
    revalidatePath(`/account/reservations`)
    return status

}

export async function payment(id: string, quantity: number, data: bookingData) {
    const res = await fetch(`${serverURL}/guests/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, quantity })
    })
    if (!res.ok) {
        const { error }: { error: string } = await res.json()
        throw new Error(error)
    }

    const session = await res.json()

    // cookies().set('sId', session.id, { secure: true, httpOnly: true, maxAge: 120 })
    // cookies().set('bookingData', JSON.stringify(data), { secure: true, httpOnly: true, maxAge: 120 })
    redirect(session.url)

}
