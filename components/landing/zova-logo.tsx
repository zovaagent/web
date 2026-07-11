interface ZovaLogoProps {
  size?: number;
  /** Unique prefix for SVG gradient IDs — must differ per page instance to prevent collisions. */
  idPrefix?: string;
}

export function ZovaLogo({ size = 28, idPrefix = "zova" }: ZovaLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={`${idPrefix}-grad`}
          x1="8" y1="10" x2="94" y2="86"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="45%" stopColor="#7c5cff" />
          <stop offset="100%" stopColor="#3ed8ff" />
        </linearGradient>
        <linearGradient
          id={`${idPrefix}-shine`}
          x1="20" y1="18" x2="60" y2="60"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M50 6
           C 55 6 60 9 63 14
           L 89 60
           C 92 65 92 71 89 76
           C 86 81 81 84 75 84
           L 25 84
           C 19 84 14 81 11 76
           C 8 71 8 65 11 60
           L 37 14
           C 40 9 45 6 50 6 Z
           M50 34
           C 48 34 46 35 45 37
           L 32 60
           C 31 62 31 64 32 66
           C 33 68 35 69 37 69
           L 63 69
           C 65 69 67 68 68 66
           C 69 64 69 62 68 60
           L 55 37
           C 54 35 52 34 50 34 Z"
        fill={`url(#${idPrefix}-grad)`}
      />
      <path
        d="M50 6
           C 55 6 60 9 63 14
           L 78 40
           C 72 32 62 26 50 26
           C 46 26 43 27 40 28
           L 37 14
           C 40 9 45 6 50 6 Z"
        fill={`url(#${idPrefix}-shine)`}
      />
    </svg>
  );
}
