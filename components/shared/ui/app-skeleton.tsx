import Skeleton, { type SkeletonProps } from "@mui/material/Skeleton";

export function AppSkeleton(props: SkeletonProps) {
  return <Skeleton animation="wave" {...props} />;
}
