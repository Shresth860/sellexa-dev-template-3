type ProductSpecificationsProps = {
  specifications?: { label: string; value: string }[];
};

export default function ProductSpecifications({
  specifications,
}: ProductSpecificationsProps) {
  if (!specifications?.length) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-black/[0.07] p-3.5 sm:p-4">
      <h2 className="text-base font-semibold tracking-[-0.02em] text-black">
        Specifications
      </h2>

      <dl className="mt-2 divide-y divide-black/[0.06]">
        {specifications.map((spec) => (
          <div
            key={spec.label}
            className="flex items-center justify-between gap-4 py-1 text-[13px] first:pt-0 last:pb-0"
          >
            <dt className="text-black/50">{spec.label}</dt>
            <dd className="text-right font-medium text-black">
              {spec.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
