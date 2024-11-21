import ReservationCard from "@/app/_components/ReservationCard";
import { Bookings } from "@/types/types";


function ReservationsList({ bookings }: { bookings: Bookings[] }) {
    return (
        <ul className="space-y-4 md:space-y-6">
            {bookings?.map((booking) => (
                <ReservationCard booking={booking} key={booking._id} />
            ))}
        </ul>
    );
}

export default ReservationsList