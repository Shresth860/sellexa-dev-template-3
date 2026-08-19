import { Truck, ShieldCheck } from "lucide-react";

export default function DeliveryInfo() {
  return (
    <div className="space-y-2 rounded-xl bg-[#f5f5f3] p-4 text-[12px] text-black/65">
      <p className="flex items-center gap-2">
        <Truck size={14} strokeWidth={1.7} className="text-black/40" />
        Free delivery on orders above ₹999
      </p>

      <p className="flex items-center gap-2">
        <ShieldCheck size={14} strokeWidth={1.7} className="text-black/40" />
        Secure checkout and 30-day easy returns
      </p>
    </div>
  );
}
