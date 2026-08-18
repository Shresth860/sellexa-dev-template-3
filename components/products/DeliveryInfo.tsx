import { Truck, RefreshCcw, ShieldCheck } from "lucide-react";

export default function DeliveryInfo() {
  return (
    <ul className="space-y-2.5 border-t border-black/[0.07] pt-5 text-[12.5px] text-black/70">
      <li className="flex items-center gap-2.5">
        <Truck size={15} strokeWidth={1.7} className="text-black/40" />
        Free delivery on orders above ₹499
      </li>

      <li className="flex items-center gap-2.5">
        <RefreshCcw size={15} strokeWidth={1.7} className="text-black/40" />
        7-day free returns
      </li>

      <li className="flex items-center gap-2.5">
        <ShieldCheck size={15} strokeWidth={1.7} className="text-black/40" />
        1-year manufacturer warranty
      </li>
    </ul>
  );
}
