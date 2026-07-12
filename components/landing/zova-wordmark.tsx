export function ZovaText({
  children,
  height = 12,
  className = "inline-block align-[-0.1em] mx-1",
}: {
  children: string;
  height?: number;
  className?: string;
}) {
  const parts = children.split(/(ZOVA)/g);
  return (
    <>
      {parts.map((part, i) =>
        part === "ZOVA" ? (
          <ZovaWordmark key={i} height={height} className={className} />
        ) : (
          part
        )
      )}
    </>
  );
}

interface ZovaWordmarkProps {
  height?: number;
  className?: string;
  color?: string;
}

export function ZovaWordmark({
  height = 20,
  className,
  color = "currentColor",
}: ZovaWordmarkProps) {
  return (
    <svg
      viewBox="0 0 856 216"
      height={height}
      width={(height * 856) / 216}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="ZOVA"
      role="img"
      className={className}
    >
      <g
        fill="none"
        stroke={color}
        strokeWidth={16}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M53 74 H154 L53 174 H156" />
        <ellipse cx="298" cy="124" rx="65" ry="52" />
        <path d="M438 73 L500 175 L564 72" />
        <path d="M620 176 L684 72 L748 176" />
      </g>
    </svg>
  );
}
