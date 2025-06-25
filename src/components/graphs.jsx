import { useState, useEffect } from "react";

export function XPLineGraph({ data }) {
  if (!data.length) return <div className="text-[var(--orange-accent-color)] mx-auto my-auto">No XP data</div>;

  const [dimensions, setDimensions] = useState({ width:460, height:230 });

  useEffect(() => {
    const handleSize = () => {
      const screenWidth = window.innerWidth;
      let width = 460;
      let height = 230;

      if (screenWidth < 768) {
        width = 340;
        height = 170;
      }
      setDimensions({ width, height });
    }

    handleSize();
    window.addEventListener("resize", handleSize);
    return () => window.removeEventListener("resize", handleSize);
  }, [])

  const { width, height } = dimensions;
  const minDate = data[0].date;
  const maxDate = data[data.length - 1].date;
  const minXP = 0;
  const maxXP = Math.max(...data.map(d => d.xp));

  // Scale functions
  const getX = date =>
    ((date - minDate) / (maxDate - minDate || 1)) * (width - 40) + 20;
  const getY = xp =>
    height - 20 - ((xp - minXP) / (maxXP - minXP || 1)) * (height - 40);

  const points = data.map(d => `${getX(d.date)},${getY(d.xp)}`).join(" ");

  return (
    <svg width={width} height={height} style={{ borderRadius: 8 }}>
      {/* Axes */}
      <line x1={20} y1={height - 20} x2={width - 20} y2={height - 20} stroke="#23f669" />
      <line x1={20} y1={20} x2={20} y2={height - 20} stroke="#23f669" />
      {/* XP Line */}
      <polyline
        fill="none"
        stroke="#ff7f00"
        strokeWidth="3"
        points={points}
      />
      {/* Optionally, add dots for each point */}
      {data.map((d, i) => (
        <circle
          key={i}
          cx={getX(d.date)}
          cy={getY(d.xp)}
          r={2}
          fill="#ffb300"
        />
      ))}
    </svg>
  );
}