import dynamic from "next/dynamic";
import { Suspense } from "react";
import TodoList from "./TodoList";

const DynamicUser = dynamic(() => import('./user-details'), { ssr: false })

export function Dashboard() {

    return (
        <div>
            {/* <Suspense fallback={<div>Loading...</div>}>
                <DynamicUser />
            </Suspense> */}
            <TodoList/>
        </div>
    );
}


export default Dashboard;
