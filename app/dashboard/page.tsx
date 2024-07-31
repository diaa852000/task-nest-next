import dynamic from "next/dynamic";
import { Suspense } from "react";

const Todos = dynamic(() => import('./TodoList'), {ssr: false})

export function Dashboard() {

    return (
        <div>
            <Suspense fallback={<div>Loading</div>}>
                <Todos/>
            </Suspense>
        </div>
    );
}


export default Dashboard;
