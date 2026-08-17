"use client";

import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import {
  FaInstagram,
  FaFacebookF,
  FaXTwitter,
} from "react-icons/fa6";

const footerLinks = {
  shop: [
    { label: "All Products", href: "/search" },
    { label: "Best Sellers", href: "/search?sort=best-selling" },
    { label: "New Arrivals", href: "/search?sort=newest" },
    { label: "Electronics", href: "/search?category=Electronics" },
    { label: "Fashion", href: "/search?category=Fashion" },
  ],
  help: [
    { label: "Contact Us", href: "/contact" },
    { label: "Shipping", href: "/shipping" },
    { label: "Returns", href: "/returns" },
    { label: "FAQs", href: "/faq" },
  ],
};

export default function HomeFooter() {
  return (
    <footer className="w-full bg-black text-white">
      <div className="mx-auto max-w-[1780px] px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="grid gap-12 py-12 sm:py-16 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-10 lg:py-20">
          {/* Brand */}
          <div className="max-w-sm">
            <Link
              href="/"
              className="inline-block text-2xl font-semibold tracking-[-0.04em]"
            >
              Sellexa
            </Link>

            <p className="mt-5 text-sm leading-6 text-white/45">
              Discover products worth having. A thoughtfully curated shopping
              experience built around quality, simplicity and choice.
            </p>

            {/* Social */}
            <div className="mt-7 flex items-center gap-2">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/55 transition hover:border-white/25 hover:text-white"
              >
                <FaInstagram size={15} />
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/55 transition hover:border-white/25 hover:text-white"
              >
                <FaFacebookF size={14} />
              </a>

              <a
                href="#"
                aria-label="X"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/55 transition hover:border-white/25 hover:text-white"
              >
                <FaXTwitter size={14} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
              Shop
            </h2>

            <nav className="mt-5 flex flex-col gap-3">
              {footerLinks.shop.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="w-fit text-sm text-white/65 transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Help */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
              Help
            </h2>

            <nav className="mt-5 flex flex-col gap-3">
              {footerLinks.help.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="w-fit text-sm text-white/65 transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Newsletter */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
              Stay in the loop
            </h2>

            <p className="mt-5 text-sm leading-6 text-white/45">
              Get updates about new products, collections and exclusive offers.
            </p>

            <form
              onSubmit={(event) => event.preventDefault()}
              className="mt-5"
            >
              <div className="flex h-12 items-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.05] transition focus-within:border-white/25">
                <Mail
                  size={16}
                  strokeWidth={1.6}
                  className="ml-4 shrink-0 text-white/35"
                />

                <input
                  type="email"
                  placeholder="Your email address"
                  aria-label="Email address"
                  className="min-w-0 flex-1 bg-transparent px-3 text-xs text-white outline-none placeholder:text-white/30"
                />

                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="mr-1.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-black transition hover:bg-white/90 active:scale-95"
                >
                  <ArrowUpRight size={15} strokeWidth={1.8} />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] text-white/35 sm:text-xs">
            © {new Date().getFullYear()} Sellexa. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link
              href="/privacy"
              className="text-[10px] text-white/35 transition hover:text-white/65 sm:text-xs"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="text-[10px] text-white/35 transition hover:text-white/65 sm:text-xs"
            >
              Terms
            </Link>

            <Link
              href="/refund-policy"
              className="text-[10px] text-white/35 transition hover:text-white/65 sm:text-xs"
            >
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}