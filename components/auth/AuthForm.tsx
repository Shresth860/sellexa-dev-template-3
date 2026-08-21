"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
interface AuthFormProps {
  initialMode?: "login" | "signup";
}

export default function AuthForm({
  initialMode = "login",
}: AuthFormProps) {
  const pathname = usePathname();

  const [mode, setMode] = useState<"login" | "signup">(
    pathname?.includes("/signup") ? "signup" : initialMode
  );

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
const [showPassword, setShowPassword] = useState(false);
  const isLogin = mode === "login";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const switchMode = (nextMode: "login" | "signup") => {
    setMode(nextMode);
    setIdentifier("");
    setPassword("");
    setName("");
  };

  return (
    <main className="min-h-[100dvh] bg-[#f7f7f5]">
      <div
        className="
          mx-auto
          grid
          min-h-[100dvh]
          w-full
          max-w-7xl
          overflow-hidden
          bg-[#f7f7f5]

          md:grid-cols-[44%_56%]

          lg:my-6
          lg:h-[calc(100dvh-48px)]
          lg:min-h-[650px]
          lg:max-h-[820px]
          lg:grid-cols-[40%_60%]
          lg:rounded-[30px]
          lg:shadow-[0_25px_80px_-30px_rgba(0,0,0,0.20)]
        "
      >
        {/* =========================================================
            LEFT — AUTH
        ========================================================= */}
        <section
          className="
            relative
            z-30
            flex
            min-h-[100dvh]
            w-full
            items-center
            justify-center
            bg-[#f7f7f5]
            px-5
            py-8

            sm:px-8
            md:min-h-0
            md:px-10

            lg:px-12
            xl:px-16
          "
        >
          <div className="w-full max-w-[460px]">
            {/* Branding */}
            <div className="mb-7 flex items-center justify-center lg:mb-8">
              <Link
                href="/"
                className="flex items-center gap-2.5"
              >
                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-[10px]
                    bg-[#080d1e]
                    text-sm
                    font-bold
                    text-white
                  "
                >
                  S
                </div>

                <span
                  className="
                    text-[22px]
                    font-semibold
                    tracking-[-0.055em]
                    text-[#080d1e]
                    lg:text-[24px]
                  "
                >
                  sellexa
                </span>
              </Link>
            </div>

            {/* Auth heading */}
            <div className="mb-6 text-center lg:mb-7">
              <h1
                className="
                  text-[25px]
                  font-semibold
                  tracking-[-0.035em]
                  text-zinc-900

                  lg:text-[29px]
                "
              >
                {isLogin
                  ? "Welcome back"
                  : "Create your account"}
              </h1>

              <p
                className="
                  mt-1.5
                  text-[13px]
                  text-zinc-500
                  lg:text-[14px]
                "
              >
                {isLogin
                  ? "Sign in to continue shopping with Sellexa."
                  : "Create your Sellexa account and start shopping."}
              </p>
            </div>

            {/* Social Login */}
            <div className="space-y-2.5">
              {/* Google */}
              <button
                type="button"
                className="
                  flex
                  h-11
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  border
                  border-zinc-200
                  bg-white
                  px-4
                  text-[13px]
                  font-medium
                  text-zinc-800
                  shadow-[0_2px_8px_rgba(0,0,0,0.03)]
                  transition
                  hover:bg-zinc-50
                  active:scale-[0.99]

                  lg:h-12
                  lg:text-[14px]
                "
              >
                <svg
                  className="h-[18px] w-[18px] shrink-0"
                  viewBox="0 0 24 24"
                >
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

              {/* Apple */}
              <button
                type="button"
                className="
                  flex
                  h-11
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  border
                  border-zinc-200
                  bg-white
                  px-4
                  text-[13px]
                  font-medium
                  text-zinc-800
                  shadow-[0_2px_8px_rgba(0,0,0,0.03)]
                  transition
                  hover:bg-zinc-50
                  active:scale-[0.99]

                  lg:h-12
                  lg:text-[14px]
                "
              >
                <svg
                  className="h-[18px] w-[18px] shrink-0 fill-current text-black"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8.92-2.85-.9.04-1.99.6-2.64 1.36-.58.67-1.08 1.74-.94 2.78 1.01.08 2.03-.54 2.66-1.29z" />
                </svg>

                <span>Continue with Apple</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-4 flex items-center lg:my-5">
              <div className="w-full border-t border-zinc-200" />

              <span
                className="
                  absolute
                  left-1/2
                  -translate-x-1/2
                  bg-[#f7f7f5]
                  px-3
                  text-[11px]
                  text-zinc-400

                  lg:text-[12px]
                "
              >
                or
              </span>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-3"
            >
              {/* Signup Name */}
              {!isLogin && (
                <div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    placeholder="Full name"
                    className="
                      h-11
                      w-full
                      rounded-2xl
                      border
                      border-zinc-200
                      bg-white
                      px-4
                      text-[13px]
                      text-zinc-900
                      outline-none
                      placeholder:text-zinc-400
                      transition
                      focus:border-zinc-400
                      focus:ring-2
                      focus:ring-zinc-900/10

                      lg:h-12
                      lg:text-[14px]
                    "
                  />
                </div>
              )}

              {/* Email / Username */}
              <div>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) =>
                    setIdentifier(e.target.value)
                  }
                  placeholder="Enter email or username"
                  className="
                    h-11
                    w-full
                    rounded-2xl
                    border
                    border-zinc-200
                    bg-white
                    px-4
                    text-[13px]
                    text-zinc-900
                    outline-none
                    placeholder:text-zinc-400
                    transition
                    focus:border-zinc-400
                    focus:ring-2
                    focus:ring-zinc-900/10

                    lg:h-12
                    lg:text-[14px]
                  "
                />
              </div>

              {/* Password */}
<div className="relative">
  <input
    type={showPassword ? "text" : "password"}
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Password"
    className="
      h-11
      w-full
      rounded-2xl
      border
      border-zinc-200
      bg-white
      px-4
      pr-11
      text-[13px]
      text-zinc-900
      outline-none
      placeholder:text-zinc-400
      transition
      focus:border-zinc-400
      focus:ring-2
      focus:ring-zinc-900/10

      lg:h-12
      lg:text-[14px]
    "
  />

  <button
    type="button"
    onClick={() => setShowPassword((prev) => !prev)}
    className="
      absolute
      right-3
      top-1/2
      flex
      h-7
      w-7
      -translate-y-1/2
      items-center
      justify-center
      rounded-full
      text-zinc-400
      transition
      hover:bg-zinc-100
      hover:text-zinc-700
      focus:outline-none
    "
    aria-label={
      showPassword
        ? "Hide password"
        : "Show password"
    }
  >
    {showPassword ? (
      <EyeOff size={16} strokeWidth={1.7} />
    ) : (
      <Eye size={16} strokeWidth={1.7} />
    )}
  </button>
</div>

              {isLogin && (
                <div className="flex justify-end">
                  <Link
                    href="/auth/forgot-password"
                    className="
                      text-[11px]
                      font-medium
                      text-zinc-500
                      hover:text-zinc-900
                      hover:underline

                      lg:text-[12px]
                    "
                  >
                    Forgot password?
                  </Link>
                </div>
              )}

              <button
                type="submit"
                className="
                  h-11
                  w-full
                  rounded-full
                  bg-[#080d1e]
                  text-[13px]
                  font-medium
                  text-white
                  shadow-[0_5px_16px_rgba(8,13,30,0.20)]
                  transition
                  hover:bg-[#111933]
                  active:scale-[0.99]

                  lg:h-12
                  lg:text-[14px]
                "
              >
                {isLogin
                  ? "Continue"
                  : "Create account"}
              </button>
            </form>

            {/* Terms */}
            <p
              className="
                mt-4
                text-center
                text-[10.5px]
                leading-[1.5]
                text-zinc-400

                lg:mt-5
                lg:text-[11.5px]
              "
            >
              By continuing, you agree to our{" "}
              <a
                href="#"
                className="text-zinc-500 underline"
              >
                Terms
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-zinc-500 underline"
              >
                Privacy Policy
              </a>
              .
            </p>

            {/* Switch Login / Signup */}
            <div
              className="
                mt-4
                text-center
                text-[12px]
                text-zinc-500

                lg:mt-5
                lg:text-[13px]
              "
            >
              {isLogin ? (
                <>
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={() =>
                      switchMode("signup")
                    }
                    className="
                      font-medium
                      text-zinc-900
                      hover:underline
                    "
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() =>
                      switchMode("login")
                    }
                    className="
                      font-medium
                      text-zinc-900
                      hover:underline
                    "
                  >
                    Log In
                  </button>
                </>
              )}
            </div>
          </div>
        </section>

        {/* =========================================================
            RIGHT — ECOMMERCE IMAGE
        ========================================================= */}
        <section
          className="
            relative
            hidden
            overflow-hidden
            bg-[#080d1e]
            bg-cover
            bg-center
            bg-no-repeat

            md:block
          "
          style={{
            backgroundImage:
              "url('/AuthSection.png')",
          }}
        >
          {/* Image overlay */}
          <div className="absolute inset-0 bg-black/[0.03]" />

          {/* LEFT SIDE FADE
              Image softly blends into the auth form */}
          <div
            className="
              absolute
              inset-y-0
              left-0
              z-20
              w-32
              bg-gradient-to-r
              from-[#f7f7f5]
              via-[#f7f7f5]/65
              to-transparent

              md:w-40
              lg:w-56
              xl:w-72
            "
          />

          {/* Top image fade */}
          <div
            className="
              absolute
              inset-x-0
              top-0
              z-10
              h-40
              bg-gradient-to-b
              from-black/30
              via-black/10
              to-transparent
            "
          />

          {/* Sellexa branding on image */}
          <div
            className="
              absolute
              right-0
              top-0
              z-30
              flex
              items-center
              px-8
              py-7

              lg:px-10
              xl:px-12
            "
          >

          </div>
        </section>
      </div>
    </main>
  );
}