"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AuthFormProps {
  initialMode?: "login" | "signup";
}

export default function AuthForm({ initialMode }: AuthFormProps) {
  const pathname = usePathname();

  const isLogin = pathname?.includes("/login")
    ? true
    : pathname?.includes("/signup")
    ? false
    : initialMode === "login";

  const [identifier, setIdentifier] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="w-full max-w-[400px] mx-auto">
      <div className="bg-white rounded-[28px] p-6 sm:p-7 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] border border-zinc-100/90 transition-all duration-300">
        <div className="flex justify-center">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#e00065] to-[#f40076] flex items-center justify-center shadow-[0_6px_20px_rgba(224,0,101,0.35)] transition-transform duration-300 hover:scale-105">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 text-white"
            >
              <circle cx="12" cy="12" r="9.5" />
              <line x1="2.5" y1="12" x2="21.5" y2="12" />
              <path d="M12 2.5a14.5 14.5 0 0 1 4.2 9.5 14.5 14.5 0 0 1-4.2 9.5 14.5 14.5 0 0 1-4.2-9.5 14.5 14.5 0 0 1 4.2-9.5z" />
              <path d="M4.2 7.2h15.6" />
              <path d="M4.2 16.8h15.6" />
            </svg>
          </div>
        </div>

        <h1 className="text-[22px] sm:text-[24px] font-bold text-zinc-900 text-center tracking-tight mt-3.5 mb-4 sm:mb-5 transition-all duration-200">
          {isLogin ? "Welcome back" : "Create your account"}
        </h1>

        <div className="space-y-2.5">
          <button
            type="button"
            className="w-full py-2.5 sm:py-3 px-4 rounded-full border border-zinc-200/90 bg-white hover:bg-zinc-50/90 active:bg-zinc-100 text-zinc-800 text-[14px] font-medium flex items-center justify-center gap-3 transition-all duration-150 cursor-pointer shadow-xs"
          >
            <svg className="w-4.5 h-4.5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <button
            type="button"
            className="w-full py-2.5 sm:py-3 px-4 rounded-full border border-zinc-200/90 bg-white hover:bg-zinc-50/90 active:bg-zinc-100 text-zinc-800 text-[14px] font-medium flex items-center justify-center gap-3 transition-all duration-150 cursor-pointer shadow-xs"
          >
            <svg className="w-4.5 h-4.5 fill-current text-black shrink-0" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.64 1.36-.58.67-1.08 1.74-.94 2.78 1.01.08 2.03-.54 2.66-1.29z" />
            </svg>
            <span>Continue with Apple</span>
          </button>
        </div>

        <div className="relative my-3.5 sm:my-4 flex items-center justify-center">
          <div className="w-full border-t border-zinc-200/80" />
          <span className="absolute bg-white px-3 text-[11.5px] text-zinc-400 font-normal">
            or
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Enter email or username"
              className="w-full px-4 py-2.5 sm:py-3 rounded-2xl border border-zinc-200 text-zinc-900 placeholder:text-zinc-400 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition-all duration-150"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 sm:py-3.5 rounded-full bg-[#080d1e] hover:bg-[#111933] active:scale-[0.99] text-white text-[14px] font-medium transition-all duration-150 cursor-pointer shadow-[0_4px_14px_rgba(8,13,30,0.25)]"
          >
            Continue
          </button>
        </form>

        <p className="text-[11.5px] text-zinc-400 text-center mt-3.5 sm:mt-4 leading-normal">
          By continuing, you agree to our{" "}
          <a href="#" className="underline text-zinc-500 hover:text-zinc-700">
            Terms
          </a>{" "}
          and{" "}
          <a href="#" className="underline text-zinc-500 hover:text-zinc-700">
            Privacy Policy
          </a>
          .
        </p>

        <div className="mt-3.5 sm:mt-4 text-center text-[13px] text-zinc-600">
          {isLogin ? (
            <span>
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/signup"
                className="font-medium text-zinc-900 hover:underline cursor-pointer ml-0.5 focus:outline-none"
              >
                Sign Up
              </Link>
            </span>
          ) : (
            <span>
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-medium text-zinc-900 hover:underline cursor-pointer ml-0.5 focus:outline-none"
              >
                Log In
              </Link>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
