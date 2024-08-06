'use client'; // This is a client component

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";

export default function ClientWrapper({ children }) {
    const pathname = usePathname();
    const [isDashboardRoute, setIsDashboardRoute] = useState(false);

    useEffect(() => {
        if (pathname) {
            setIsDashboardRoute(pathname.startsWith('/dashboard'));
        }
    }, [pathname]);

    return (
        <>
            {!isDashboardRoute && <Navbar />}
            {children}
        </>
    );
}
