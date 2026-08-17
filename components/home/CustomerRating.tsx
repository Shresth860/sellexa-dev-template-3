"use client";

import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Secure & Safe",
    description:
      "Your personal information and payments are protected with secure checkout .",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Get your orders delivered quickly with reliable shipping and real-time order updates.",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description:
      "Changed your mind? Enjoy a simple and hassle-free return experience on eligible products.",
  },
];

export default function CustomerRating() {
  return (
    <section className="w-full bg-[#f7f7f5]">
      <div className="mx-auto max-w-[1780px] px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
        <div className="grid gap-4 lg:grid-cols-[1.05fr_1.95fr]">
          {/* Customer rating */}
          <div className="flex min-h-[300px] flex-col justify-between rounded-2xl bg-black p-6 text-white sm:rounded-3xl sm:p-8 lg:min-h-[310px] lg:p-10">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45 sm:text-xs">
                Customer love
              </p>

              <div className="mt-6 flex items-end gap-2">
                <span className="text-5xl font-semibold tracking-[-0.06em] sm:text-6xl">
                  4.8
                </span>

                <span className="mb-2 text-sm text-white/40">
                  / 5
                </span>
              </div>

              <div className="mt-4 flex gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    size={17}
                    fill="currentColor"
                    strokeWidth={0}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="max-w-md text-sm leading-6 text-white/55">
                Loved by customers for quality products, simple
                shopping and a reliable experience from discovery
                to delivery.
              </p>

              <div className="mt-5 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />

                <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/40">
                  Trusted by our customers
                </span>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  className="
                    group
                    flex
                    min-h-[300px]
                    flex-col
                    rounded-2xl
                    border
                    border-black/[0.07]
                    bg-white
                    p-5
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-black/[0.12]
                    hover:shadow-[0_16px_35px_rgba(0,0,0,0.06)]
                    sm:min-h-[310px]
                    sm:rounded-3xl
                    sm:p-6
                  "
                >
                  {/* Icon */}
                  <div
                    className="
                      flex
                      h-16
                      w-16
                      shrink-0
                      items-center
                      justify-center
                      rounded-2xl
                      bg-[#f5f5f3]
                      text-black
                      transition-transform
                      duration-300
                      group-hover:scale-105
                    "
                  >
                    <Icon
                      size={29}
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Content */}
                  <div className="mt-0 pt-10">
                    <h3 className="text-[24px] font-semibold tracking-[-0.02em] text-black">
                      {benefit.title}
                    </h3>

                    <p className="mt-2.5 text-[14px] leading-[1.65] text-black/45">
                      {benefit.description}
                    </p>
                  </div>

                  {/* Bottom accent */}
                <div className="mt-10 flex items-center gap-2 pb-1">
                  <span className="h-px w-8 bg-black/15 transition-all duration-300 group-hover:w-12 group-hover:bg-black/40" />

                  <span className="text-[9px] font-medium uppercase tracking-[0.12em] text-black/30">
                    Sellexa
                  </span>
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