import { restaurant } from "../app/restaurant";

type IconName = "arrow-up-right" | "arrow-down" | "chevron-down" | "pin" | "clock" | "phone" | "at-sign" | "menu" | "close" | "calendar";

const strokes: Record<IconName, React.ReactNode> = {
  "arrow-up-right": <><path d="M6 18 18 6M8 6h10v10" /></>,
  "arrow-down": <path d="M12 4v15m-6-6 6 6 6-6" />,
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  pin: <><path d="M19 10c0 5-7 10-7 10S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.3" /></>,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3 2" /></>,
  phone: <path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2a13 13 0 0 1-7-7l2-2-2-5Z" />,
  "at-sign": <><circle cx="12" cy="12" r="4" /><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" /></>,
  menu: <path d="M4 8h16M4 16h16" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  calendar: <><rect x="4" y="6" width="16" height="14" rx="2" /><path d="M8 4v4m8-4v4M4 11h16" /></>,
};

export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round">{strokes[name]}</svg>;
}

export function Seal() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="brand-mark" src="/images/umi-mark.webp" alt="" width={160} height={160} />
  );
}

export function Brand() {
  return (
    <span className="brand">
      <Seal />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="brand-wordmark" src="/images/umi-wordmark.webp" alt={restaurant.name} width={249} height={82} />
    </span>
  );
}

export function Photo({ name, alt, sizes, className = "", width = 760, height = 500, mediumWidth, priority = false }: {
  name: string;
  alt: string;
  sizes: string;
  className?: string;
  width?: number;
  height?: number;
  mediumWidth?: number;
  priority?: boolean;
}) {
  const source = `/images/${name}`;
  const medium = mediumWidth ? `, ${source}-medium.webp ${mediumWidth}w` : "";
  return (
    // Static responsive derivatives work on any host without an image optimizer.
    // eslint-disable-next-line @next/next/no-img-element
    <img className={`photo ${className}`} src={`${source}.webp`} srcSet={`${source}-small.webp 420w${medium}, ${source}.webp ${width}w`} sizes={sizes} alt={alt} width={width} height={height} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} decoding="async" draggable={false} />
  );
}

export function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="section-heading">{children}</h2>;
}
