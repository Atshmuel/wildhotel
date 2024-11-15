import { Cabins } from "@/types/types"
import DateSelector from "./DateSelector"
import ReservationForm from "./ReservationForm"
import { getBookingDatesById, getSettings } from "../_lib/data-service"
import { auth } from "../_lib/auth"
import LoginMessage from "./LoginMessage"

async function Reservations({ cabin }: { cabin: Cabins }) {
    const session = await auth()

    const [bookedDates, settings] = await Promise.all([getBookingDatesById(cabin._id), getSettings()])

    return <div className="grid grid-cols-2 border border-primary-800 min-h-[400px] justify-start">
        <DateSelector settings={settings} bookedDates={bookedDates} cabin={cabin} />
        {
            session?.user ?
                <ReservationForm cabin={cabin} user={session.user} />
                :
                <LoginMessage />

        }    </div>
}

export default Reservations