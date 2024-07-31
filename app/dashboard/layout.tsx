import Navbar from "@/components/Navbar";
import Link from "next/link";
import { ReactNode } from "react";
import { GoPlus } from "react-icons/go";

interface layoutProps {
    children: ReactNode;
}


function layout({ children }: layoutProps) {
    return (
        <div className="flex flex-col justify-between gap-4 h-screen">
            <Navbar />
            <div className="p-4 relative flex-1">
                {children}
            </div>
        </div>
    );
}

export default layout;
