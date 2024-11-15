"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactElement, ReactText } from "react";

function Filter() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathName = usePathname()
    const activeFilter = searchParams.get('capacity') ?? "all"

    function handleFilter(filter: string) {
        const params = new URLSearchParams(searchParams)
        params.set('capacity', filter)
        router.replace(`${pathName}?${params.toString()}`, { scroll: false })
    }



    return (
        <div className="flex border border-primary-800">
            <Button handleFilter={handleFilter} filter="all" activeFilter={activeFilter} >All Rooms</Button>
            <Button handleFilter={handleFilter} filter="small" activeFilter={activeFilter} >1 &mdash; 2</Button>
            <Button handleFilter={handleFilter} filter="medium" activeFilter={activeFilter} >3 &mdash; 4</Button>
            <Button handleFilter={handleFilter} filter="large" activeFilter={activeFilter} >5 &mdash; 6</Button>
        </div>
    );
}

function Button({ filter, handleFilter, activeFilter, children }: { filter: string, handleFilter(filter: string): void, activeFilter: string, children: ReactElement | ReactText }) {
    return <button onClick={() => handleFilter(filter)}
        className={`px-5 py-2 hover:bg-primary-700 transition-all duration-300 ${activeFilter === filter && "bg-primary-700 text-primary-50"}`}>
        {children}</button>
}

export default Filter;
