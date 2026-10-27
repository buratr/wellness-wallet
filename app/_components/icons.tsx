type IconProps = { size?: number; stroke?: number; className?: string };

function Icon({ size = 20, stroke = 2.4, className, d }: IconProps & { d: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={d} />
    </svg>
  );
}

export const ArrowRight = (p: IconProps) => <Icon {...p} d="M5 12h14M13 6l6 6-6 6" />;
export const ArrowDown = (p: IconProps) => <Icon {...p} d="M12 5v14M6 13l6 6 6-6" />;
export const Check = (p: IconProps) => <Icon {...p} d="M5 12.5l4.5 4.5L19 7.5" />;
export const Heart = (p: IconProps) => (
  <Icon {...p} d="M12 20s-7.5-4.6-7.5-10.2A4.2 4.2 0 0 1 12 7.3a4.2 4.2 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20z" />
);
export const Lock = (p: IconProps) => (
  <Icon {...p} d="M7 11V8a5 5 0 0 1 10 0v3M5.5 11h13v9.5h-13z" />
);
export const Clock = (p: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    width={p.size ?? 15}
    height={p.size ?? 15}
    aria-hidden="true"
    className={p.className}
    fill="none"
    stroke="currentColor"
    strokeWidth={p.stroke ?? 2.2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);
