const MESSAGE = 'Clinical decision support is now live';
const CTA = 'Request early access →';

/**
 * Marquee-style banner. Uses a CSS keyframe animation (defined in
 * tailwind via arbitrary values) to scroll two duplicated tracks
 * seamlessly — no JS needed.
 */
export function TopBanner() {
  const items = Array.from({ length: 6 });

  return (
    <div className="overflow-hidden border-b border-lime-dark/40 bg-lime">
      <div className="flex w-max animate-[marquee_22s_linear_infinite] py-2">
        {items.map((_, i) => (
          <div key={i} className="mr-10 flex shrink-0 items-center whitespace-nowrap">
            <span className="mr-3 text-xs font-medium text-ink">{MESSAGE}</span>
            <span className="text-xs font-bold text-ink">{CTA}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopBanner;