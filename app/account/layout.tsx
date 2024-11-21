import React from "react";
import SideNavigation from "@/app/_components/SideNavigation";

export default function AccountsLayout({ children }: { children: React.ReactNode }) {
    return <div className="relative md:grid md:grid-cols-[16rem_1fr] h-full gap-4 md:gap-14">
        <SideNavigation />
        <div className="pt-8 pb-4 md:py-2">
            {children}
        </div>
    </div>
}