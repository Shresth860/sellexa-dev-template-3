"use client";

import { Star, ShieldCheck, Truck, RotateCcw } from "lucide-react";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Secure & Safe",
    description: "Your data is protected",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Quick & reliable shipping",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "Hassle-free returns",
  },
];

export default function CustomerRating() {
  return (
    <section className="w-full bg-[#f7f7f5]">
      <div className="mx-auto max-w-[1780px] px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
        <div className="grid gap-4 lg:grid-cols-[1.05fr_1.95fr]">
          {/* Rating */}
          <div className="rounded-2xl bg-black p-6 text-white sm:rounded-3xl sm:p-8 lg:p-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45 sm:text-xs">
              Customer love
            </p>

            <div className="mt-6 flex items-center gap-2">
              <span className="text-5xl font-semibold tracking-[-0.06em] sm:text-6xl">
                4.8
              </span>

              <span className="text-sm text-white/40">/ 5</span>
            </div>

            <div className="mt-4 flex gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  size={16}
                  fill="currentColor"
                  strokeWidth={0}
                />
              ))}
            </div>

            <p className="mt-5 max-w-sm text-sm leading-6 text-white/50">
              Loved by customers for quality products, simple shopping and a
              reliable experience.
            </p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  className="flex min-h-[170px] flex-col justify-between rounded-2xl border border-black/[0.07] bg-white p-5 sm:min-h-[190px] sm:rounded-3xl sm:p-6"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5f5f3] text-black sm:h-11 sm:w-11">
                    <Icon size={19} strokeWidth={1.6} />
                  </div>

                  <div className="mt-8">
                    <h3 className="text-sm font-semibold text-black sm:text-[15px]">
                      {benefit.title}
                    </h3>

                    <p className="mt-1.5 text-xs leading-5 text-black/45">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}