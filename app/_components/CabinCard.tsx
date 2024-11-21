import { UsersIcon } from "@heroicons/react/24/solid";
import { Cabins } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "./Skeleton";

function CabinCard({ cabin }: { cabin: Cabins }) {
  const { _id: id, name, maxCapacity, regularPrice, discount, imgsUrl: images } = cabin;

  return (
    <Link
      href={`/cabins/${id}`}
    >
      <div className="flex border-primary-800 border">
        <div className="relative flex-1">
          <Image
            src={images.at(0) || ""}
            fill
            alt={`${name}`}
            className="object-cover aspect-square border-r border-primary-800"
          />

        </div>

        <div className="flex-grow w-1/4 xl:w-auto">
          <div className="pt-3 pb-2 pl-3 pr-1 md:pt-4 md:pb-3 md:px-5  lg:pt-5 lg:pb-4 lg:px-7 bg-primary-950">
            <h3 className="text-accent-500 font-semibold md:text-lg lg:text-xl mb-1 md:mb-3">
              {name}
            </h3>

            <div className="flex gap-3 items-center mb-2">
              <UsersIcon className="size-4 md:size-5 text-primary-600" />
              <p className="text-sm lg:text-lg text-primary-200">
                For up to <span className="font-bold">{maxCapacity}</span> guests
              </p>
            </div>

            <p className="flex gap-3 text-sm lg:text-base justify-end items-baseline">
              {discount > 0 ? (
                <>
                  <span className="text-lg lg:text-3xl font-[350]">
                    ${regularPrice - discount}
                  </span>
                  <span className="line-through font-semibold text-primary-600">
                    ${regularPrice}
                  </span>
                </>
              ) : (
                <span className="lg:text-3xl font-[350]">${regularPrice}</span>
              )}
              <span className="text-primary-200">/ night</span>
            </p>
          </div>

          <div className="bg-primary-950 border-t text-sm lg:text-lg border-t-primary-800 text-right py-2 px-4">
            Details & reservation &rarr;
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CabinCard;
