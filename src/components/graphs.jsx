import { useState, useEffect } from "react";

export function XPLineGraph({ data }) {
  if (!data.length) return <div className="text-[var(--orange-accent-color)] mx-auto my-auto">No XP data</div>;

  const [dimensions, setDimensions] = useState({ width:460, height:230 });

  useEffect(() => {
    const handleSize = () => {
      const screenWidth = window.innerWidth;
      let width = 460;
      let height = 230;

      if (screenWidth < 480) {
        width = 280;
        height = 140;
      } else if (screenWidth < 768) {
        width = 340;
        height = 170;
      } else if (screenWidth < 1024) {
        width = 400;
        height = 200;
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

export function PassFailPieChart({ passCount, failCount }) {
  const [dimensions, setDimensions] = useState({ width: 300, height: 200 });

  useEffect(() => {
    const handleSize = () => {
      const screenWidth = window.innerWidth;
      let width = 300;
      let height = 200;

      if (screenWidth < 480) {
        width = 250;
        height = 170;
      } else if (screenWidth < 768) {
        width = 280;
        height = 180;
      } else if (screenWidth < 1024) {
        width = 300;
        height = 200;
      }
      setDimensions({ width, height });
    }

    handleSize();
    window.addEventListener("resize", handleSize);
    return () => window.removeEventListener("resize", handleSize);
  }, []);

  const { width, height } = dimensions;
  const total = passCount + failCount;
  
  if (total === 0) {
    return <div className="text-[var(--orange-accent-color)] mx-auto my-auto">No data available</div>;
  }

  const centerX = width / 2;
  const centerY = height / 2 - 20; // Slightly above center for 3D effect
  const radius = Math.min(width, height) / 2.5;
  
  // Calculate angles
  const passAngle = (passCount / total) * 2 * Math.PI;
  const failAngle = (failCount / total) * 2 * Math.PI;
  
  // 3D offset for depth effect
  const depthOffset = 8;

  // Helper function to create arc path
  const createArcPath = (startAngle, endAngle, radius, centerX, centerY) => {
    const x1 = centerX + radius * Math.cos(startAngle);
    const y1 = centerY + radius * Math.sin(startAngle);
    const x2 = centerX + radius * Math.cos(endAngle);
    const y2 = centerY + radius * Math.sin(endAngle);
    
    const largeArcFlag = endAngle - startAngle <= Math.PI ? 0 : 1;
    
    return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  };

  // Create 3D pie slices
  const passPath = createArcPath(0, passAngle, radius, centerX, centerY);
  const failPath = createArcPath(passAngle, 2 * Math.PI, radius, centerX, centerY);
  
  // 3D bottom slices (shadow effect)
  const passBottomPath = createArcPath(0, passAngle, radius, centerX, centerY + depthOffset);
  const failBottomPath = createArcPath(passAngle, 2 * Math.PI, radius, centerX, centerY + depthOffset);

  // Side slices for 3D effect
  const createSidePath = (startAngle, endAngle) => {
    const x1 = centerX + radius * Math.cos(startAngle);
    const y1 = centerY + radius * Math.sin(startAngle);
    const x2 = centerX + radius * Math.cos(endAngle);
    const y2 = centerY + radius * Math.sin(endAngle);
    const x1Bottom = centerX + radius * Math.cos(startAngle);
    const y1Bottom = centerY + depthOffset + radius * Math.sin(startAngle);
    const x2Bottom = centerX + radius * Math.cos(endAngle);
    const y2Bottom = centerY + depthOffset + radius * Math.sin(endAngle);
    
    return `M ${x1} ${y1} L ${x1Bottom} ${y1Bottom} L ${x2Bottom} ${y2Bottom} L ${x2} ${y2} Z`;
  };

  const passSidePath = createSidePath(0, passAngle);
  const failSidePath = createSidePath(passAngle, 2 * Math.PI);

  return (
    <svg width={width} height={height} style={{ borderRadius: 8 }}>
      <defs>
        {/* Gradients for 3D effect */}
        <linearGradient id="passGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#049730" />
          <stop offset="100%" stopColor="#23f669" />
        </linearGradient>
        <linearGradient id="failGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff7f00" />
          <stop offset="100%" stopColor="#ffb300" />
        </linearGradient>
        <linearGradient id="passSideGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#049730" />
          <stop offset="100%" stopColor="#23f669" />
        </linearGradient>
        <linearGradient id="failSideGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ff7f00" />
          <stop offset="100%" stopColor="#ffb300" />
        </linearGradient>
      </defs>

      {/* Bottom slices (shadow) */}
      <path d={passBottomPath} fill="#16a34a" opacity="0.3" />
      <path d={failBottomPath} fill="#dc2626" opacity="0.3" />
      
      {/* Side slices for 3D effect */}
      <path d={passSidePath} fill="url(#passSideGradient)" />
      <path d={failSidePath} fill="url(#failSideGradient)" />
      
      {/* Top slices */}
      <path d={passPath} fill="url(#passGradient)" />
      <path d={failPath} fill="url(#failGradient)" />
      
      {/* Center text */}
      <text
        x={centerX}
        y={centerY + 5}
        textAnchor="middle"
        fill="white"
        fontSize="14"
        fontWeight="bold"
      >
        {total}
      </text>
      
      {/* Legend */}
      <g transform={`translate(10, ${height - 40})`}>
        <rect x="0" y="0" width="12" height="12" fill="url(#passGradient)" rx="2" />
        <text x="20" y="10" fill="white" fontSize="12">Pass: {passCount}</text>
        
        <rect x="0" y="20" width="12" height="12" fill="url(#failGradient)" rx="2" />
        <text x="20" y="30" fill="white" fontSize="12">Fail: {failCount}</text>
      </g>
    </svg>
  );
}