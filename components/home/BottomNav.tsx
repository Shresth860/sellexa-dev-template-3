"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Search,
  Heart,
  ShoppingBag,
  Package,
  UserRound,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

interface BottomNavProps {
  hideCart?: boolean;
  hideWishlist?: boolean;
}

export default function BottomNav({
  hideCart = false,
  hideWishlist = false,
}: BottomNavProps = {}) {
  const pathname = usePathname();
  const { cartCount, wishlistCount } = useCart();

  const navItems = [
    {
      label: "Home",
      href: "/",
      icon: Home,
      show: true,
    },
    {
      label: "Search",
      href: "/search",
      icon: Search,
      show: true,
    },
    {
      label: "Wishlist",
      href: "/wishlist",
      icon: Heart,
      show: !hideWishlist,
      count: wishlistCount,
    },
    {
    label: "Orders",
    href: "/orders",
    icon: Package,
    show: true,
    },
    {
      label: "Profile",
      href: "/account",
      icon: UserRound,
      show: true,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-black/10 bg-white/95 backdrop-blur-xl lg:hidden">
      <div className="mx-auto flex h-[68px] max-w-md items-center justify-around px-2 pb-[env(safe-area-inset-bottom)]">

        {navItems
          .filter((item) => item.show)
          .map((item) => {
            const Icon = item.icon;

            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.label}
                href={item.href}
                aria-label={item.label}
                className={`relative flex min-w-[56px] flex-col items-center justify-center gap-1 py-2 transition ${
                  isActive
                    ? "text-black"
                    : "text-black/45 hover:text-black"
                }`}
              >
                <div className="relative">
                  <Icon
                    size={20}
                    strokeWidth={isActive ? 2 : 1.7}
                  />

                  {item.count !== undefined && item.count > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-black px-1 text-[9px] font-semibold leading-none text-white">
                      {item.count > 99 ? "99+" : item.count}
                    </span>
                  )}
                </div>

                <span
                  className={`text-[10px] ${
                    isActive ? "font-semibold" : "font-medium"
                  }`}
                >
                  {item.label}
                </span>

                {isActive && (
                  <span className="absolute bottom-0 h-[2px] w-5 rounded-full bg-black" />
                )}
              </Link>
            );
          })}
      </div>
    </nav>
  );
}