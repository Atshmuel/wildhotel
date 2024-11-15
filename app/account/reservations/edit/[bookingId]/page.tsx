
import SubmitBtn from "@/app/_components/SubmitBtn";
import { updateBooking } from "@/app/_lib/actions";
import { getBooking, getBookings, getGuestBookings } from "@/app/_lib/data-service";

export async function generateMetadata() {
  return { title: `Edit Your Reservation` }
}

export async function generateStaticParams() {
  const bookings = await getBookings();
  return bookings.map(booking => { return { bookingId: booking._id } })
}

export default async function Page({ params }: { params: { bookingId: string } }) {
  const { bookingId } = params
  const { cabin: { maxCapacity }, guest: { fullName }, booking: { observations, numGuests } } = await getBooking(bookingId)

  const fName = fullName.split(' ').at(0)
  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{bookingId}
      </h2>

      <form action={updateBooking} className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col">
        <input type="text" name="bookingId" value={bookingId} hidden />
        <div className="space-y-2">
          <label htmlFor="numGuests">{fName}, how many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            defaultValue={numGuests}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>

            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay {fName}?
          </label>
          <textarea
            name="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            defaultValue={observations}
            maxLength={1000}
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <SubmitBtn>Update reservation</SubmitBtn>

        </div>
      </form>
    </div>
  );
}
