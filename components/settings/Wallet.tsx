"use client";

import { useEffect, useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Plus,
  Wallet as WalletIcon,
} from "lucide-react";
import Swal from "sweetalert2";

type Transaction = {
  id: string;
  title: string;
  date: string;
  amount: number;
  type: "credit" | "debit";
};

const INITIAL_BALANCE = 2450;

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: "t1",
    title: "Wallet Top-up",
    date: "18 Aug 2026",
    amount: 1000,
    type: "credit",
  },
  {
    id: "t2",
    title: "Order #SLX-4821",
    date: "16 Aug 2026",
    amount: 349,
    type: "debit",
  },
  {
    id: "t3",
    title: "Refund - Order #SLX-4790",
    date: "12 Aug 2026",
    amount: 599,
    type: "credit",
  },
  {
    id: "t4",
    title: "Order #SLX-4756",
    date: "05 Aug 2026",
    amount: 799,
    type: "debit",
  },
];

const WALLET_STORAGE_KEY = "sellexa-wallet";

export default function Wallet() {
  const [balance, setBalance] = useState(INITIAL_BALANCE);
  const [transactions, setTransactions] = useState<Transaction[]>(
    INITIAL_TRANSACTIONS
  );
  const [mounted, setMounted] = useState(false);

  // Load saved wallet state
  useEffect(() => {
    try {
      const saved = localStorage.getItem(WALLET_STORAGE_KEY);

      if (saved) {
        const parsed = JSON.parse(saved);

        if (parsed && typeof parsed === "object") {
          if (typeof parsed.balance === "number") {
            setBalance(parsed.balance);
          }
          if (Array.isArray(parsed.transactions)) {
            setTransactions(parsed.transactions);
          }
        }
      }
    } catch (error) {
      console.error("Failed to load wallet:", error);
    }

    setMounted(true);
  }, []);

  // Persist wallet state
  useEffect(() => {
    if (!mounted) return;

    localStorage.setItem(
      WALLET_STORAGE_KEY,
      JSON.stringify({ balance, transactions })
    );
  }, [balance, transactions, mounted]);

  const handleAddMoney = async () => {
    const result = await Swal.fire({
      title: "Add Money to Wallet",
      input: "number",
      inputLabel: "Amount (₹)",
      inputPlaceholder: "Enter amount",
      showCancelButton: true,
      confirmButtonText: "Add",
      confirmButtonColor: "#000",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value || Number(value) <= 0) {
          return "Enter a valid amount";
        }
        return undefined;
      },
    });

    if (result.isConfirmed) {
      const amount = Number(result.value);

      setBalance((previous) => previous + amount);
      setTransactions((previous) => [
        {
          id: crypto.randomUUID(),
          title: "Wallet Top-up",
          date: new Date().toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          amount,
          type: "credit",
        },
        ...previous,
      ]);
    }
  };

  return (
    <div
      id="wallet"
      className="flex-1 scroll-mt-24 rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-[15px] font-semibold">Wallet</h2>
          <p className="mt-0.5 text-[13px] text-zinc-500">
            Manage your balance and view transaction history.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddMoney}
          className="flex shrink-0 items-center gap-1.5 rounded-full bg-black px-4 py-2 text-[12px] font-semibold text-white transition hover:bg-black/85"
        >
          <Plus size={14} strokeWidth={2.2} />
          Add Money
        </button>
      </div>

      <div className="mt-5 flex items-center gap-4 rounded-xl border border-zinc-100 bg-zinc-50 p-4">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-black">
          <WalletIcon size={18} strokeWidth={1.8} className="text-white" />
        </div>

        <div>
          <p className="text-[11px] font-medium text-zinc-400">
            Available Balance
          </p>
          <p className="text-xl font-semibold tracking-[-0.02em] text-zinc-900">
            ₹{balance.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      <p className="mt-5 text-[13px] font-semibold text-zinc-900">
        Recent Transactions
      </p>

      <div className="mt-2 divide-y divide-zinc-100">
        {transactions.map(({ id, title, date, amount, type }) => (
          <div
            key={id}
            className="flex items-center gap-3 py-3.5 first:pt-0 last:pb-0"
          >
            <div
              className={`flex size-9 shrink-0 items-center justify-center rounded-full ${
                type === "credit" ? "bg-emerald-50" : "bg-red-50"
              }`}
            >
              {type === "credit" ? (
                <ArrowDownLeft
                  size={15}
                  strokeWidth={1.8}
                  className="text-emerald-600"
                />
              ) : (
                <ArrowUpRight
                  size={15}
                  strokeWidth={1.8}
                  className="text-red-500"
                />
              )}
            </div>

            <div className="flex-1">
              <p className="text-sm font-semibold text-zinc-900">{title}</p>
              <p className="mt-0.5 text-[12.5px] text-zinc-500">{date}</p>
            </div>

            <p
              className={`shrink-0 text-sm font-semibold ${
                type === "credit" ? "text-emerald-600" : "text-red-500"
              }`}
            >
              {type === "credit" ? "+" : "-"}₹{amount.toLocaleString("en-IN")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
