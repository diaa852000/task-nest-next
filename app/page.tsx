"use client";

import { useState } from "react";
import SignUpForm from "@/components/SignupForm";
import LoginForm from "@/components/LoginForm";

export default function Home() {
  const [isSignUp, setIsSignup] = useState<boolean>(false);

  const toggleForm = () => setIsSignup(prev => !prev);

  return (
    <div className="flex h-screen w-full justify-center bg-[rgba(0,0,0,0.01)]">
      {isSignUp ? <SignUpForm toggleForm={toggleForm}/> : <LoginForm toggleForm={toggleForm}/>}
    </div>
  );
}


