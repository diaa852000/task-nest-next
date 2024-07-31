import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

interface layoutProps {
    children: ReactNode;
}


function layout({ children }: layoutProps) {
    return (
        <div className="flex flex-col justify-between gap-4">
            <Navbar />
            <div className="p-4">
                {children}
            </div>
        </div>
    );
}

export default layout;
