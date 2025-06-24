export function XPLineGraph({ data, width = 600, height = 300 }) {
  if (!data.length) return <div>No XP data</div>;

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
    <svg width={width} height={height} style={{ background: "#222", borderRadius: 8 }}>
      {/* Axes */}
      <line x1={20} y1={height - 20} x2={width - 20} y2={height - 20} stroke="#888" />
      <line x1={20} y1={20} x2={20} y2={height - 20} stroke="#888" />
      {/* XP Line */}
      <polyline
        fill="none"
        stroke="#4ade80"
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
          fill="#fff"
        />
      ))}
    </svg>
  );
}