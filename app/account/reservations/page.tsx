import ReservationsList from "@/app/_components/ReservationsList";
import { auth } from "@/app/_lib/auth";
import { getGuestBookings } from "@/app/_lib/data-service";
import Link from "next/link";

export const metadata = {
    title: "Reservations",
};

export default async function Page() {
    const session = await auth()
    if (!session || !session?.user) return
    const bookings = await getGuestBookings(session?.user?.guestId)

    return (
        <div >
            <h2 className="font-semibold text-2xl text-accent-400 mb-7">
                Your reservations
            </h2>

            {bookings?.length === 0 ? (
                <p className="text-lg">
                    You have no reservations yet. Check out our{" "}
                    <Link className="underline text-accent-500" href="/cabins">
                        luxury cabins &rarr;
                    </Link>
                </p>
            ) : (
                <ReservationsList bookings={bookings} />
            )}
        </div>
    );
}
