import { Star } from "lucide-react";
import type { Product } from "@/data/products";

type ProductReviewsProps = {
  rating: number;
  reviewCount: number;
  ratingBreakdown?: Product["ratingBreakdown"];
  reviews?: Product["reviews"];
};

export default function ProductReviews({
  rating,
  reviewCount,
  ratingBreakdown,
  reviews,
}: ProductReviewsProps) {
  return (
    <section
      id="reviews"
      className="scroll-mt-24 rounded-2xl border border-black/[0.07] p-5 sm:p-6"
    >
      <h2 className="text-lg font-semibold tracking-[-0.02em] text-black sm:text-xl">
        Customer Reviews
      </h2>

      <div className="mt-5 flex flex-col gap-8 sm:flex-row sm:gap-12">
        {/* Summary */}
        <div className="flex shrink-0 flex-col items-start gap-2 sm:w-48">
          <div className="flex items-baseline gap-1.5">
            <span className="text-4xl font-semibold text-black">
              {rating.toFixed(1)}
            </span>
            <span className="text-sm text-black/40">/ 5</span>
          </div>

          <div className="flex items-center gap-0.5">
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

          <p className="text-xs text-black/45">
            Based on {reviewCount.toLocaleString("en-IN")} ratings
          </p>

          {ratingBreakdown && ratingBreakdown.length > 0 && (
            <div className="mt-2 w-full space-y-1.5">
              {ratingBreakdown.map((row) => (
                <div
                  key={row.stars}
                  className="flex items-center gap-2 text-[11px] text-black/50"
                >
                  <span className="w-2.5">{row.stars}</span>

                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/[0.07]">
                    <div
                      className="h-full rounded-full bg-black"
                      style={{ width: `${row.percentage}%` }}
                    />
                  </div>

                  <span className="w-7 text-right">{row.percentage}%</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Review list */}
        <div className="flex-1 space-y-5">
          {reviews && reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review.id}
                className="border-b border-black/[0.06] pb-5 last:border-0 last:pb-0"
              >
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

                <p className="mt-2 text-[13px] leading-5 text-black/75">
                  {review.comment}
                </p>

                <p className="mt-2 text-[11px] text-black/40">
                  {review.author} ·{" "}
                  {new Date(review.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            ))
          ) : (
            <p className="text-[13px] text-black/45">
              No written reviews yet for this product.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
