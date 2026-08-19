import { Star } from "lucide-react";
import type { Product } from "@/data/products";

type ProductReviewsProps = {
  rating: number;
  reviewCount: number;
  reviews?: Product["reviews"];
  ratingBreakdown?: Product["ratingBreakdown"];
};

export default function ProductReviews({
  rating,
  reviewCount,
  reviews,
  ratingBreakdown,
}: ProductReviewsProps) {
  return (
    <section
      id="reviews"
      className="scroll-mt-24 rounded-2xl border border-black/[0.07] p-5 sm:p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-lg">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/40">
            Customer Reviews
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-black">
            Our Reviews
          </h2>
          <p className="mt-2 text-[13px] leading-5 text-black/55">
            Real feedback from verified shoppers who bought this product. See
            what customers think before you buy.
          </p>
        </div>

        <a
          href="#reviews"
          className="inline-flex items-center rounded-full bg-black px-4 py-2 text-[12px] font-semibold text-white transition hover:bg-black/85"
        >
          Leave Us Feedback
        </a>
      </div>

      <div className="mt-6 grid gap-8 border-t border-black/[0.07] pt-6 lg:grid-cols-2">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-[34px] font-semibold leading-none tracking-[-0.03em] text-black">
              {rating.toFixed(1)}
            </span>
            <span className="text-[11px] leading-none text-black/45">
              Out of
              <br />5 Stars
            </span>
          </div>

          <div className="mt-2 flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={14}
                strokeWidth={0}
                fill="currentColor"
                className={
                  index < Math.round(rating) ? "text-black" : "text-black/15"
                }
              />
            ))}
          </div>

          <p className="mt-2 text-[11.5px] text-black/45">
            Overall rating of {reviewCount.toLocaleString("en-IN")} reviews
          </p>

          {ratingBreakdown && ratingBreakdown.length > 0 && (
            <div className="mt-5 space-y-1.5">
              {ratingBreakdown.map((item) => {
                const count = Math.round(
                  (item.percentage / 100) * reviewCount
                );

                return (
                  <div key={item.stars} className="flex items-center gap-2">
                    <span className="w-11 shrink-0 text-[11px] text-black/55">
                      {item.stars} Star{item.stars !== 1 ? "s" : ""}
                    </span>

                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/[0.06]">
                      <div
                        className="h-full rounded-full bg-black"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>

                    <span className="w-6 shrink-0 text-right text-[11px] text-black/45">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {reviews && reviews.length > 0 ? (
          <div className="space-y-3 lg:border-l lg:border-black/[0.07] lg:pl-8">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="rounded-xl border border-black/[0.07] p-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        size={12}
                        strokeWidth={0}
                        fill="currentColor"
                        className={
                          index < review.rating
                            ? "text-black"
                            : "text-black/15"
                        }
                      />
                    ))}
                  </div>

                  {review.tag && (
                    <span className="rounded-full bg-black/[0.05] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.06em] text-black/50">
                      {review.tag}
                    </span>
                  )}
                </div>

                <div className="mt-3 flex items-center justify-between gap-2">
                  <p className="text-[13px] font-semibold text-black">
                    {review.author}
                  </p>
                  <p className="text-[11px] text-black/40">
                    {new Date(review.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <p className="mt-2 text-[13px] leading-5 text-black/70">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[13px] text-black/45 lg:border-l lg:border-black/[0.07] lg:pl-8">
            No written reviews yet for this product.
          </p>
        )}
      </div>
    </section>
  );
}
