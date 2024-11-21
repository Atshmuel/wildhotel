import { Suspense } from "react";
import CabinsList from "../_components/CabinsList";
import { searchParams } from "@/types/types";
import Filter from "../_components/Filter";
import ReservationReminder from "../_components/ReservationReminder";
import Skeleton from "../_components/Skeleton";


export const metadata = {
  title: "Cabins",
};

export default function Page({ searchParams }: { searchParams: searchParams }) {
  const filter = searchParams.capacity ?? "all"

  return (
    <div>
      <div
        className="flex justify-center sm:justify-end text-xs md:text-lg mb-8"
      ><Filter /></div>
      <h1 className="text-2xl sm:text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Rooms
      </h1>
      <p className="text-primary-200  sm:text-lg mb-10">
        Cozy yet luxurious rooms, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little home
        away from home. The perfect spot for a peaceful, calm vacation. Welcome
        to paradise.
      </p>

      <Suspense fallback={<Skeleton type="card" />} key={filter}>
        <CabinsList filter={filter} />
        <ReservationReminder />
      </Suspense>

    </div>
  );
}
