import Reservations from "@/app/_components/Reservations";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabinsData } from "@/app/_lib/data-service";
import Cabin from "@/app/_components/Cabin";
import { Suspense } from "react";
import Skeleton from "@/app/_components/Skeleton";

export async function generateMetadata({ params }: { params: { cabinId: string } }) {
    const { name } = await getCabin(params.cabinId)
    return { title: `Cabin ${name}` }
}

export async function generateStaticParams() {
    const cabins = await getCabinsData();
    return cabins.map(cabin => { return { cabinId: cabin._id } })
}

export default async function Page({ params }: { params: { cabinId: string } }) {
    const cabin = await getCabin(params.cabinId)

    return (
        <div className="max-w-6xl mx-auto mt-8">
            <Cabin cabin={cabin} />
            <div>
                <h2 className="text-2xl md:text-5xl font-semibold text-accent-400 text-center mb-5 md:mb-10">
                    Reserve {cabin.name} today. Pay on arrival.
                </h2>
                <Suspense fallback={<Skeleton type="cards" amount={2} />}>
                    <Reservations cabin={cabin} />
                </Suspense>
            </div>
        </div>
    );
}
