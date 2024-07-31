"use client";

import { logout } from "@/lib/redux/features/auth/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store/store";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Suspense } from "react";


const UserDetails = dynamic(() => import('@/app/dashboard/user-details'), {ssr: false})


function Navbar() {
  const auth = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout())
    router.push('/');
  }


  return (
    <header className="relative flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-3 border-b">
      <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center justify-between">
          <a className="flex-none text-xl font-semibold  focus:outline-none focus:opacity-80" href="#" aria-label="Brand">
            <span className="text-xl font-semibold text-white bg-indigo-500 p-2 rounded-md shadow">
              TD
            </span>
          </a>
        </div>
        <div id="hs-navbar-example" className="hidden hs-collapse overflow-hidden transition-all duration-300 basis-full grow sm:block" aria-labelledby="hs-navbar-example-collapse">
          <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
          <Suspense fallback={<div>loading</div>}>
            <UserDetails/>
          </Suspense>
            <button 
              type="button"
              onClick={handleLogout}
              className="font-medium hover:text-gray-100 focus:outline-none focus:text-gray-400 border rounded-md p-2 bg-indigo-500 text-white"
            >
              logout
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
export default Navbar;
