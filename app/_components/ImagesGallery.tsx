'use client'

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function ImagesGallery({ imgs, name }: { imgs: string[], name: string }) {
    const [currIndex, setCurrIndex] = useState(0)
    const [hover, setHover] = useState(false)

    const [isTouching, setIsTouching] = useState(false)
    const [startTouch, setStartTouch] = useState(0);


    const touchStart = (e: React.TouchEvent) => {
        setIsTouching(true)
        setStartTouch(e.touches[0].clientX)

    }
    const touchMove = (e: React.TouchEvent) => {
        if (!isTouching) return
        const currentPos = e.touches[0].clientX
        const diff = startTouch - currentPos

        if (Math.abs(diff) > 50) {
            handleImageChange(diff > 0 ? 1 : -1)
            setIsTouching(false)
        }


    }
    const touchEnd = () => {
        setIsTouching(false);

    }

    const handleImageChange = (direction: number) => {
        setCurrIndex(prev => (prev + direction + imgs.length) % imgs.length)
    }

    useEffect(() => {
        if (!hover || !isTouching) {
            const interval = setInterval(() => {
                setCurrIndex((prev) => (prev + 1) % imgs.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [imgs, hover, isTouching]);

    return (
        <div onTouchStart={touchStart} onTouchMove={touchMove} onTouchEnd={touchEnd} onMouseEnter={() => setHover(!hover)} onMouseLeave={() => setHover(!hover)} className="relative md:scale-[1.15] md:-translate-x-3 overflow-hidden">
            <span className="hidden absolute cursor-pointer z-20 right-0 top-1/2 h-10 w-6 backdrop-blur-sm sm:flex items-center"> <ChevronRightIcon color="white" onClick={() => handleImageChange(1)} /> </span>
            <span className="hidden absolute cursor-pointer z-20 left-0 top-1/2 h-10 w-6 backdrop-blur-sm sm:flex items-center "> <ChevronLeftIcon color="white" onClick={() => handleImageChange(-1)} /> </span>
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
