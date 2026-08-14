"use client";

export default function AshokaChakra({
  size = 120,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const spokes = 24;
  const cx = size / 2;
  const cy = size / 2;
  const outerR = size / 2 - 2;
  const innerR = outerR * 0.3;
  const spokeLength = outerR * 0.85;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      aria-label="Ashoka Chakra"
    >
      {/* Outer circle */}
      <circle
        cx={cx}
        cy={cy}
        r={outerR}
        fill="none"
        stroke="#000080"
        strokeWidth={2}
        opacity={0.7}
      />
      {/* Inner circle */}
      <circle
        cx={cx}
        cy={cy}
        r={innerR}
        fill="#000080"
        opacity={0.6}
      />
      {/* Spokes */}
      {Array.from({ length: spokes }, (_, i) => {
        const angle = (i * 360) / spokes - 90;
        const rad = (angle * Math.PI) / 180;
        const x2 = cx + spokeLength * Math.cos(rad);
        const y2 = cy + spokeLength * Math.sin(rad);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={x2}
            y2={y2}
            stroke="#000080"
            strokeWidth={1.5}
            opacity={0.6}
          />
        );
      })}
      {/* Small dots between spokes */}
      {Array.from({ length: spokes }, (_, i) => {
        const angle = ((i + 0.5) * 360) / spokes - 90;
        const rad = (angle * Math.PI) / 180;
        const dotR = outerR * 0.78;
        const dx = cx + dotR * Math.cos(rad);
        const dy = cy + dotR * Math.sin(rad);
        return (
          <circle
            key={`dot-${i}`}
            cx={dx}
            cy={dy}
            r={2}
            fill="#000080"
            opacity={0.4}
          />
        );
      })}
    </svg>
  );
}
