'use client'

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useEffect, useState } from "react";

function ImagesGallery({ imgs, name }: { imgs: string[], name: string }) {
    const [currIndex, setCurrIndex] = useState(0)




    const handleClick = (direction: number) => {
        setCurrIndex(prev => (prev + direction) % imgs.length)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrIndex((prev) => (prev + 1) % imgs.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [imgs]);

    return (
        <div className="relative scale-[1.15] -translate-x-3 overflow-hidden">
            <span className="absolute cursor-pointer z-20 right-0 top-1/2 h-10 w-6 backdrop-blur-sm  flex items-center"> <ChevronRightIcon color="white" onClick={() => handleClick(1)} /> </span>
            <span className="absolute cursor-pointer z-20 left-0 top-1/2 h-10 w-6 backdrop-blur-sm  flex items-center "> <ChevronLeftIcon color="white" onClick={() => handleClick(-1)} /> </span>
            <div
                className="flex transition-transform duration-1000 ease-in-out h-full w-full"
                style={{
                    transform: `translateX(-${currIndex * 100}%)`,
                }}>
                {imgs?.length && imgs.map((img, i) => (
                    <Image key={i} width={500} height={100} className="object-cover w-full" src={img} alt={`${name}`} />
                ))}
            </div>
        </div >
    );
}

export default ImagesGallery;
