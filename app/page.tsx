"use client";

import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../lib/redux/store/store"
import { useDispatch, useSelector } from "react-redux";
import { loginThunk, signUpThunk } from "@/lib/redux/features/auth/auth.thunk";
import { useRouter } from "next/navigation";

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(loginThunk({ email, password }));
    router.push('/dashboard');
  };
  
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(signUpThunk({name, email, password }));
    // router.push('/dashboard');
  };


  return (
    <div>
      <h2>Login</h2>
      {auth.isLoading && <p>Loading...</p>}
      {/* <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Signup</button>
      </form> */}
      <form onSubmit={handleSignUp}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
