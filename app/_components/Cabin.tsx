
import TextExpander from "@/app/_components/TextExpander";
import { Cabins } from "@/types/types";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import ImagesGallery from "./ImagesGallery";

function Cabin({ cabin }: { cabin: Cabins }) {

    const { name, imgsUrl: images, description, maxCapacity } = cabin
    return <div className="grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24">
        <ImagesGallery imgs={images} name={name} />

        <div>
            <h3 className="text-accent-100 font-black text-7xl mb-5 translate-x-[-254px] bg-primary-950 p-6 pb-1 w-[150%]">
                {name}
            </h3>

            <p className="text-lg text-primary-300 mb-10">
                <TextExpander>
                    {description}
                </TextExpander>
            </p>

            <ul className="flex flex-col gap-4 mb-7">
                <li className="flex gap-3 items-center">
                    <UsersIcon className="h-5 w-5 text-primary-600" />
                    <span className="text-lg">
                        Up to <span className="font-bold">{maxCapacity}</span>{" "}
                        guests
                    </span>
                </li>
                <li className="flex gap-3 items-center">
                    <MapPinIcon className="h-5 w-5 text-primary-600" />
                    <span className="text-lg">
                        Located in the heart of the{" "}
                        <span className="font-bold">Odem forst</span> (Isreal)
                    </span>
                </li>
                <li className="flex gap-3 items-center">
                    <EyeSlashIcon className="h-5 w-5 text-primary-600" />
                    <span className="text-lg">
                        Privacy <span className="font-bold">100%</span> guaranteed
                    </span>
                </li>
            </ul>
        </div>
    </div>
}

export default Cabin