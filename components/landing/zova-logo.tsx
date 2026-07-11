interface ZovaLogoProps {
  size?: number;
  /** @deprecated kept for backward compat with existing call sites — unused with raster logos. */
  idPrefix?: string;
  /** Force a specific variant. Omit to auto-swap via prefers-color-scheme. */
  variant?: "light" | "dark";
  className?: string;
}

export function ZovaLogo({ size = 28, variant, className }: ZovaLogoProps) {
  const style: React.CSSProperties = {
    width: size,
    height: size,
    display: "inline-block",
    position: "relative",
    flexShrink: 0,
  };

  const imgClass =
    "absolute inset-0 h-full w-full object-contain object-center select-none pointer-events-none";

  if (variant === "light") {
    return (
      <span style={style} className={className} aria-hidden="true">
        <img src="/zova-mark-light.jpeg" alt="" className={imgClass} draggable={false} />
      </span>
    );
  }
  if (variant === "dark") {
    return (
      <span style={style} className={className} aria-hidden="true">
        <img src="/zova-mark-dark.jpeg" alt="" className={imgClass} draggable={false} />
      </span>
    );
  }

  return (
    <span style={style} className={className} aria-hidden="true">
      <img
        src="/zova-mark-light.jpeg"
        alt=""
        className={`${imgClass} zova-mark-light`}
        draggable={false}
      />
      <img
        src="/zova-mark-dark.jpeg"
        alt=""
        className={`${imgClass} zova-mark-dark`}
        draggable={false}
      />
    </span>
  );
}
