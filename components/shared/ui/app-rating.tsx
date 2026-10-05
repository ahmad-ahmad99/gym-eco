import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { AppStack } from "@/components/shared/ui/app-stack";

type AppRatingProps = {
  value: number;
  count?: number;
  readOnly?: boolean;
  variant?: "default" | "product";
};

export function AppRating({
  value,
  count,
  readOnly = true,
  variant = "default",
}: AppRatingProps) {
  if (variant === "product") {
    const reviewCount = count ?? 0;

    return (
      <div className="product-rating">
        <div className="rating-list" aria-label={`${value} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, index) => (
            <i
              key={`star-${index}`}
              className={index < Math.round(value) ? "ri-star-fill" : "ri-star-line"}
              aria-hidden
            />
          ))}
        </div>
        <span className="divider">|</span>
        <a href="#reviews">{reviewCount} Review</a>
      </div>
    );
  }

  return (
    <AppStack direction="row" alignItems="center" spacing={1}>
      <Rating value={value} precision={0.5} readOnly={readOnly} size="small" />
      {typeof count === "number" ? (
        <Typography variant="body2" color="text.secondary">
          {count} Review
        </Typography>
      ) : null}
    </AppStack>
  );
}
