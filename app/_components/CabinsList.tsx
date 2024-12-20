import CabinCard from "@/app/_components/CabinCard";
import { getCabinsData } from "@/app/_lib/data-service";
import Skeleton from "./Skeleton";



async function CabinsList({ filter }: { filter: string }) {
    const cabins = await getCabinsData();
    let displayedRooms = cabins
    if (filter === 'small') {
        displayedRooms = cabins.filter(cabin => cabin.maxCapacity <= 2)

    }
    if (filter === 'medium') {
        displayedRooms = cabins.filter(cabin => cabin.maxCapacity >= 3 && cabin.maxCapacity <= 4)

    }
    if (filter === 'large') {
        displayedRooms = cabins.filter(cabin => cabin.maxCapacity >= 5)
    }
    if (!displayedRooms.length) return <Skeleton type="card" amount={6} />
    return <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
        {displayedRooms.map((cabin) => (
            <CabinCard cabin={cabin} key={cabin._id} />
        ))}
    </div>


}

export default CabinsList;
