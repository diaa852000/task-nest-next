'use client'

import { loginThunk } from "@/lib/redux/features/auth/auth.thunk";
import { AppDispatch } from "@/lib/redux/store/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(loginThunk({ email, password }));
    router.push('/dashboard');
  };

  return (
    <div className="flex h-screen w-full items-center sm:justify-center bg-[rgba(0,0,0,0.01)]">
      <div className='w-full h-full sm:h-auto'>
        <div className="pt-44 sm:pt-2 rounded border sm:max-w-[26rem] h-full md:h-auto mx-auto flex-grow py-2 px-5 md:px-10 bg-white">
          <h1 className='text-center text-2xl sm:text-3xl font-medium rounded capitalize mt-4 mb-8'>Login</h1>
          <form className='flex flex-col max-w-[500px] mx-auto gap-3' onSubmit={handleLogin}>
            <div className='flex flex-col'>
              <label htmlFor="email" className='text-slate-500 mb-px ml-0.5'>Email</label>
              <input
                type="email"
                placeholder='email address'
                value={email}
                onChange={e => setEmail(e.target.value)}
                className='placeholder:capitalize border-gray-300 rounded-md p-2.5 outline-none'
              />
            </div>

            <div className='flex flex-col'>
              <label htmlFor="password" className='text-slate-500 mb-px ml-0.5'>Password</label>
              <input
                type="password"
                placeholder='Password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                className='placeholder:capitalize border-gray-300 rounded-md p-2.5 outline-none'
              />
            </div>

            <button
              type="submit"
              className='bg-blue-500 text-white py-2 rounded-md capitalize text-lg hover:bg-blue-400 transition-all ease-in-out duration-300 mt-5'
            >
              login
            </button>
            <hr className='border-t-slate-300 my-3' />
            <div className='mt-2 mb-6 flex justify-center items-center gap-1'>
              <p>Don not have an account?</p>
              <Link href={'/signup'} className="underline">Signup</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
