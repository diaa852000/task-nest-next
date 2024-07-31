"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import Link from "next/link";
import { GoPlus } from "react-icons/go";

const UserDetails = dynamic(() => import('@/app/dashboard/user-details'), { ssr: false })


function Navbar() {
  return (
    <header className="relative flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-4 border-b">
      <nav className="max-w-[85rem] w-full mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center justify-between">
          <Link className="flex-none text-xl font-semibold  focus:outline-none focus:opacity-80" href="/dashboard" aria-label="Brand">
            <span className="text-xl font-semibold text-white bg-indigo-500 p-2 rounded-md shadow">
              TD
            </span>
          </Link>
        </div>
        <div className="flex gap-5 items-center justify-end sm:mt-0 sm:ps-5">
          <Link
            href={'/dashboard/create'}
          >
            <span className="relative block w-7 h-7">
              <span className="relative flex items-center justify-center w-full h-full border-rotate">
                <GoPlus size={20} className="relative z-10" />
              </span>
            </span>
          </Link>
          <Suspense fallback={<div>loading</div>}>
            <UserDetails />
          </Suspense>
        </div>
      </nav>
    </header>
  );
}
export default Navbar;
