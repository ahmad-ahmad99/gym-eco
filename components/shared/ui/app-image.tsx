import Image, { type ImageProps } from "next/image";
import Box from "@mui/material/Box";

type AppImageProps = Omit<ImageProps, "alt"> & {
  alt: string;
  ratio?: string;
  rounded?: number | string;
  fit?: React.CSSProperties["objectFit"];
  quality?: number;
};

export function AppImage({
  alt,
  ratio,
  rounded = 0,
  fill,
  fit = "cover",
  style,
  sizes,
  src,
  quality = 90,
  priority = false,
  loading,
  onLoad,
  ...props
}: AppImageProps) {
  const hasSrc =
    typeof src === "string" ? src.trim().length > 0 : src !== undefined && src !== null;

  if (!hasSrc) {
    return null;
  }

  const isSvg = typeof src === "string" && src.endsWith(".svg");
  const image = (
    <Image
      alt={alt}
      src={src}
      fill={fill || Boolean(ratio)}
      sizes={sizes ?? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
      quality={quality}
      priority={priority}
      loading={loading ?? (priority ? "eager" : "lazy")}
      onLoad={onLoad}
      unoptimized={isSvg}
      style={{
        objectFit: fit,
        objectPosition: "center center",
        ...style,
      }}
      {...props}
    />
  );

  if (ratio) {
    return (
      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: ratio,
          overflow: "hidden",
          borderRadius: rounded,
          bgcolor: "#f5f5f5",
        }}
      >
        {image}
      </Box>
    );
  }

  return image;
}
