import React from 'react';

interface IsometricSceneProps {
  isDark: boolean;
  lang: 'es' | 'en';
  themeStyles: any;
}

// Steeper 45-degree classic symmetric projection
const project = (x: number, y: number, z: number = 0) => {
  const scaleX = 0.95;
  const scaleY = 0.48;
  const screenX = 250 + (x - y) * scaleX;
  const screenY = 55 + (x + y) * scaleY - z * 0.85;
  return { x: screenX, y: screenY };
};

// Calculate visual depth based on projected screenY of the center of the voxel box
const getDepth = (x: number, y: number, z: number, dx: number = 0, dy: number = 0, dz: number = 0) => {
  return project(x + dx / 2, y + dy / 2, z + dz / 2).y;
};

const IsometricVoxelBox: React.FC<{
  x: number;
  y: number;
  z: number;
  dx: number;
  dy: number;
  dz: number;
  colorTop?: string;
  colorLeft?: string;
  colorRight?: string;
  opacity?: string;
}> = ({ x, y, z, dx, dy, dz, colorTop = '#fff', colorLeft = '#ccc', colorRight = '#999', opacity = '1' }) => {
  const p1 = project(x, y, z + dz);
  const p2 = project(x + dx, y, z + dz);
  const p3 = project(x + dx, y + dy, z + dz);
  const p4 = project(x, y + dy, z + dz);

  const p5 = project(x, y + dy, z);
  const p6 = project(x + dx, y + dy, z);
  const p7 = project(x + dx, y, z);
  const p8 = project(x, y, z);

  return (
    <g opacity={opacity}>
      {/* Left Face */}
      <polygon 
        points={`${p4.x},${p4.y} ${p3.x},${p3.y} ${p6.x},${p6.y} ${p5.x},${p5.y}`} 
        fill={colorLeft} 
      />
      {/* Right Face */}
      <polygon 
        points={`${p3.x},${p3.y} ${p2.x},${p2.y} ${p7.x},${p7.y} ${p6.x},${p6.y}`} 
        fill={colorRight} 
      />
      {/* Top Face */}
      <polygon 
        points={`${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y} ${p4.x},${p4.y}`} 
        fill={colorTop} 
        stroke={colorTop}
        strokeWidth="0.3"
      />
    </g>
  );
};

// Voxel character renderer with rich texturing & dynamic 4-directional support
const renderVoxelCharacter = (
  x: number, y: number, z: number,
  isDark: boolean,
  type: 'boss-standing' | 'boss-sitting' | 'seller-standing' | 'seller-walking' | 'worker-dev' | 'worker-mkt' | 'client-walking' | 'client-sitting',
  dir: 'front-right' | 'back-left' | 'front-left' | 'back-right',
  className?: string
) => {
  const headTop = "#fed7aa"; 
  const headLeft = "#fdbb2d"; 
  const headRight = "#ca8a04"; 

  let cTop = "#475569";
  let cLeft = "#334155";
  let cRight = "#1e293b";

  let pantsTop = "#18181b";
  let pantsLeft = "#27272a";
  let pantsRight = "#09090b";

  let hairTop = "#a16207";
  let hairLeft = "#78350f";
  let hairRight = "#451a03";

  if (type.startsWith('boss')) {
    cTop = "#ca8a04";
    cLeft = "#a16207";
    cRight = "#78350f";
  } else if (type.startsWith('seller')) {
    cTop = "#2563eb";
    cLeft = "#1d4ed8";
    cRight = "#1e3a8a";
  } else if (type === 'worker-dev') {
    cTop = "#10b981";
    cLeft = "#059669";
    cRight = "#047857";
  } else if (type === 'worker-mkt') {
    cTop = "#d946ef";
    cLeft = "#c084fc";
    cRight = "#8b5cf6";
  } else if (type.startsWith('client')) {
    cTop = "#64748b";
    cLeft = "#475569";
    cRight = "#334155";
    hairTop = "#fde047";
    hairLeft = "#eab308";
    hairRight = "#ca8a04";
  }

  const isSitting = type === 'boss-sitting' || type === 'worker-dev' || type === 'worker-mkt' || type === 'client-sitting';
  const zShift = isSitting ? -3 : 0;
  const legDz = isSitting ? 5 : 9;

  const showFace = dir === 'front-right' || dir === 'front-left';

  return (
    <g className={className} key={`${type}-${dir}`}>
      {/* Legs */}
      {!isSitting ? (
        <g>
          <IsometricVoxelBox x={x+2} y={y+4} z={z} dx={3.5} dy={4} dz={legDz} colorTop={pantsTop} colorLeft={pantsLeft} colorRight={pantsRight} />
          <IsometricVoxelBox x={x+6.5} y={y+4} z={z} dx={3.5} dy={4} dz={legDz} colorTop={pantsTop} colorLeft={pantsLeft} colorRight={pantsRight} />
        </g>
      ) : (
        <g>
          {dir === 'back-left' ? (
            <g>
              <IsometricVoxelBox x={x+2} y={y-2} z={z+3} dx={3.5} dy={7} dz={3.5} colorTop={pantsTop} colorLeft={pantsLeft} colorRight={pantsRight} />
              <IsometricVoxelBox x={x+6.5} y={y-2} z={z+3} dx={3.5} dy={7} dz={3.5} colorTop={pantsTop} colorLeft={pantsLeft} colorRight={pantsRight} />
            </g>
          ) : (
            <g>
              <IsometricVoxelBox x={x+2} y={y+10} z={z+2} dx={3.5} dy={8} dz={4} colorTop={pantsTop} colorLeft={pantsLeft} colorRight={pantsRight} />
              <IsometricVoxelBox x={x+6.5} y={y+10} z={z+2} dx={3.5} dy={8} dz={4} colorTop={pantsTop} colorLeft={pantsLeft} colorRight={pantsRight} />
            </g>
          )}
        </g>
      )}

      {/* Torso */}
      <IsometricVoxelBox x={x+1} y={y+2} z={z+8+zShift} dx={10} dy={8} dz={11} colorTop={cTop} colorLeft={cLeft} colorRight={cRight} />

      {/* Neck & Tie */}
      {showFace && (
        <g>
          <IsometricVoxelBox x={x+3} y={y+10.1} z={z+11+zShift} dx={6} dy={0.1} dz={6} colorTop="#ffffff" colorLeft="#f1f5f9" colorRight="#e2e8f0" />
          {(type.startsWith('boss') || type.startsWith('seller')) && (
            <IsometricVoxelBox x={x+5} y={y+10.2} z={z+9+zShift} dx={2} dy={0.1} dz={7} colorTop="#ef4444" colorLeft="#b91c1c" colorRight="#991b1b" />
          )}
        </g>
      )}

      {/* Arms */}
      <IsometricVoxelBox x={x+11} y={y+4} z={z+9+zShift} dx={3} dy={3} dz={9} colorTop={cTop} colorLeft={cLeft} colorRight={cRight} />
      
      {type === 'boss-standing' && dir === 'front-right' ? (
        <g>
          <IsometricVoxelBox x={x-3} y={y+4} z={z+12} dx={3} dy={4} dz={6} colorTop={cTop} colorLeft={cLeft} colorRight={cRight} />
          <IsometricVoxelBox x={x-3} y={y+7} z={z+16} dx={2} dy={2} dz={2} colorTop={headLeft} colorLeft={headLeft} colorRight={headRight} />
          <IsometricVoxelBox x={x-5} y={y+8} z={z+18} dx={4} dy={4} dz={4} colorTop="#22d3ee" colorLeft="#06b6d4" colorRight="#0891b2" opacity="0.85" />
          <rect x={project(x-4, y+9, z+24).x} y={project(x-4, y+9, z+24).y} width="1.8" height="1.8" fill="#fef08a" className="animate-beacon" />
          <rect x={project(x-7, y+7, z+26).x} y={project(x-7, y+7, z+26).y} width="1.8" height="1.8" fill="#c084fc" className="animate-beacon" style={{ animationDelay: '0.4s' }} />
          <rect x={project(x-2, y+10, z+28).x} y={project(x-2, y+10, z+28).y} width="1.8" height="1.8" fill="#fb923c" className="animate-beacon" style={{ animationDelay: '0.8s' }} />
        </g>
      ) : type.startsWith('client') && dir === 'front-right' ? (
        <g>
          <IsometricVoxelBox x={x-3} y={y+4} z={z+9} dx={3} dy={3} dz={9} colorTop={cTop} colorLeft={cLeft} colorRight={cRight} />
          <IsometricVoxelBox x={x-4} y={y+2} z={z+2} dx={2} dy={6} dz={7} colorTop="#78350f" colorLeft="#451a03" colorRight="#3b1502" />
        </g>
      ) : (
        <IsometricVoxelBox x={x-3} y={y+4} z={z+9+zShift} dx={3} dy={3} dz={9} colorTop={cTop} colorLeft={cLeft} colorRight={cRight} />
      )}

      {/* Head */}
      <IsometricVoxelBox x={x+1} y={y+1} z={z+19+zShift} dx={10} dy={10} dz={10} colorTop={headTop} colorLeft={headLeft} colorRight={headRight} />
      <IsometricVoxelBox x={x} y={y} z={z+26+zShift} dx={12} dy={12} dz={4} colorTop={hairTop} colorLeft={hairLeft} colorRight={hairRight} />

      {/* Headset (Boss only) */}
      {type.startsWith('boss') && (
        <g>
          <IsometricVoxelBox x={x+5} y={y} z={z+28+zShift} dx={2} dy={12} dz={3} colorTop="#27272a" colorLeft="#27272a" colorRight="#18181b" />
          <IsometricVoxelBox x={x-1} y={y+4} z={z+22+zShift} dx={2} dy={4} dz={6} colorTop="#18181b" colorLeft="#18181b" colorRight="#09090b" />
          <IsometricVoxelBox x={x+11} y={y+4} z={z+22+zShift} dx={2} dy={4} dz={6} colorTop="#18181b" colorLeft="#18181b" colorRight="#09090b" />
          {showFace && (
            <g>
              <line x1={project(x-0.5, y+7, z+23+zShift).x} y1={project(x-0.5, y+7, z+23+zShift).y} x2={project(x+2.5, y+10.5, z+22+zShift).x} y2={project(x+2.5, y+10.5, z+22+zShift).y} stroke="#27272a" strokeWidth="1.2" />
              <circle cx={project(x+2.5, y+10.5, z+22+zShift).x} cy={project(x+2.5, y+10.5, z+22+zShift).y} r={1.2} fill="#09090b" />
            </g>
          )}
        </g>
      )}

      {/* Face details */}
      {showFace ? (
        dir === 'front-right' ? (
          <g>
            <rect x={project(x+8, y+11.1, z+23+zShift).x} y={project(x+8, y+11.1, z+23+zShift).y} width={2} height={2.2} fill="#09090b" />
            <rect x={project(x+3, y+11.1, z+23+zShift).x} y={project(x+3, y+11.1, z+23+zShift).y} width={2} height={2.2} fill="#09090b" />
            <line x1={project(x+5, y+11.1, z+21+zShift).x} y1={project(x+5, y+11.1, z+21+zShift).y} x2={project(x+7, y+11.1, z+21+zShift).x} y2={project(x+7, y+11.1, z+21+zShift).y} stroke="#09090b" strokeWidth="1.2" />
          </g>
        ) : (
          <g>
            <rect x={project(x+11.1, y+8, z+23+zShift).x} y={project(x+11.1, y+8, z+23+zShift).y} width={2} height={2.2} fill="#09090b" />
            <rect x={project(x+11.1, y+3, z+23+zShift).x} y={project(x+11.1, y+3, z+23+zShift).y} width={2} height={2.2} fill="#09090b" />
            <line x1={project(x+11.1, y+5, z+21+zShift).x} y1={project(x+11.1, y+5, z+21+zShift).y} x2={project(x+11.1, y+7, z+21+zShift).x} y2={project(x+11.1, y+7, z+21+zShift).y} stroke="#09090b" strokeWidth="1.2" />
          </g>
        )
      ) : (
        <IsometricVoxelBox x={x+1} y={y+1} z={z+20+zShift} dx={10} dy={2} dz={6} colorTop={hairTop} colorLeft={hairLeft} colorRight={hairRight} />
      )}
    </g>
  );
};

export const IsometricScene: React.FC<IsometricSceneProps> = ({ isDark, lang }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = React.useState({ width: 500, height: 300 });

  // Monitor element sizing in real time with ResizeObserver
  React.useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width, height } = entries[0].contentRect;
      setDimensions({ width: width || 500, height: height || 300 });
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Compute dynamic responsivity viewBox properties
  // Center is fixed around the Isometric diorama center (x=250, y=160)
  const aspect = dimensions.width / dimensions.height;
  
  let viewBoxWidth = 420;
  let viewBoxHeight = 250;

  if (aspect >= 1.68) {
    // Landscape/Widescreen: Keep height base and expand width
    viewBoxHeight = 250;
    viewBoxWidth = 250 * aspect;
  } else {
    // Portrait/Mobile: Keep width base and expand height
    viewBoxWidth = 420;
    viewBoxHeight = 420 / aspect;
  }

  // Adjust center offset positioning
  const viewBoxX = 250 - viewBoxWidth / 2;
  const viewBoxY = 160 - viewBoxHeight / 2;

  interface RenderItem {
    key: string;
    depth: number;
    render: () => React.ReactNode;
  }

  const items: RenderItem[] = [];

  // --- 0. BALCÓN DE ESQUINA EN CONCRETO (x = 240 a 252 / y = 240 a 252) ---
  items.push({
    key: 'balcony-floor-left',
    depth: getDepth(0, 240, 0, 240, 12, 0) - 200,
    render: () => (
      <polygon 
        key="balcony-floor-left"
        points={`
          ${project(0, 240).x},${project(0, 240).y}
          ${project(240, 240).x},${project(240, 240).y}
          ${project(240, 252).x},${project(240, 252).y}
          ${project(0, 252).x},${project(0, 252).y}
        `}
        fill={isDark ? "#1e293b" : "#475569"}
      />
    )
  });

  items.push({
    key: 'balcony-floor-right',
    depth: getDepth(240, 0, 0, 12, 240, 0) - 200,
    render: () => (
      <polygon 
        key="balcony-floor-right"
        points={`
          ${project(240, 0).x},${project(240, 0).y}
          ${project(252, 0).x},${project(252, 0).y}
          ${project(252, 240).x},${project(252, 240).y}
          ${project(240, 240).x},${project(240, 240).y}
        `}
        fill={isDark ? "#1e293b" : "#475569"}
      />
    )
  });

  items.push({
    key: 'balcony-corner-floor',
    depth: getDepth(240, 240, 0, 12, 12, 0) - 199,
    render: () => (
      <polygon 
        key="balcony-corner-floor"
        points={`
          ${project(240, 240).x},${project(240, 240).y}
          ${project(252, 240).x},${project(252, 240).y}
          ${project(252, 252).x},${project(252, 252).y}
          ${project(240, 252).x},${project(240, 252).y}
        `}
        fill={isDark ? "#0f172a" : "#334155"}
      />
    )
  });

  // Base frontal del edificio (Fachada infinita del rascacielos bajando a Z = -150)
  items.push({
    key: 'tower-facade-base',
    depth: -900,
    render: () => {
      const concreteLeft = isDark ? "#27272a" : "#475569";
      const concreteRight = isDark ? "#18181b" : "#334155";
      const windowFrameColor = isDark ? "#09090b" : "#1e293b";
      
      const pLeftTop = project(0, 252, 0);
      const pLeftBottom = project(0, 252, -150);
      const pCenterTop = project(252, 252, 0);
      const pCenterBottom = project(252, 252, -150);
      const pRightTop = project(252, 0, 0);
      const pRightBottom = project(252, 0, -150);

      const rowsZ = [-35, -75, -115];
      const winOffsets = [30, 80, 130, 180];
      const winW = 20;
      const winH = 15;

      return (
        <g key="tower-facade-base">
          <polygon points={`${pLeftTop.x},${pLeftTop.y} ${pCenterTop.x},${pCenterTop.y} ${pCenterBottom.x},${pCenterBottom.y} ${pLeftBottom.x},${pLeftBottom.y}`} fill={concreteLeft} />
          <polygon points={`${pCenterTop.x},${pCenterTop.y} ${pRightTop.x},${pRightTop.y} ${pRightBottom.x},${pRightBottom.y} ${pCenterBottom.x},${pCenterBottom.y}`} fill={concreteRight} />

          {/* LEFT WALL WINDOWS */}
          {rowsZ.map((zVal, rIdx) => 
            winOffsets.map((xVal, wIdx) => {
              const pW1 = project(xVal, 252.2, zVal);
              const pW2 = project(xVal + winW, 252.2, zVal);
              const pW3 = project(xVal + winW, 252.2, zVal - winH);
              const pW4 = project(xVal, 252.2, zVal - winH);

              const seed = (rIdx + 1) * (wIdx + 3);
              const isOn = isDark ? (seed % 3 !== 0) : true;
              const winColor = isDark ? (isOn ? (seed % 2 === 0 ? "#06b6d4" : "#fbbf24") : "#09090b") : "#ffffff";

              return (
                <g key={`win-l-${rIdx}-${wIdx}`}>
                  <polygon points={`${pW1.x - 0.5},${pW1.y - 0.5} ${pW2.x + 0.5},${pW2.y - 0.5} ${pW3.x + 0.5},${pW3.y + 0.5} ${pW4.x - 0.5},${pW4.y + 0.5}`} fill={windowFrameColor} />
                  <polygon points={`${pW1.x},${pW1.y} ${pW2.x},${pW2.y} ${pW3.x},${pW3.y} ${pW4.x},${pW4.y}`} fill={winColor} opacity={isDark ? (isOn ? 0.75 : 0.9) : 0.85} filter={isDark && isOn ? "url(#screen-glow)" : undefined} />
                </g>
              );
            })
          )}

          {/* RIGHT WALL WINDOWS */}
          {rowsZ.map((zVal, rIdx) => 
            winOffsets.map((yVal, wIdx) => {
              const pW1 = project(252.2, yVal, zVal);
              const pW2 = project(252.2, yVal + winW, zVal);
              const pW3 = project(252.2, yVal + winW, zVal - winH);
              const pW4 = project(252.2, yVal, zVal - winH);

              const seed = (rIdx + 2) * (wIdx + 5);
              const isOn = isDark ? (seed % 3 !== 0) : true;
              const winColor = isDark ? (isOn ? (seed % 2 === 0 ? "#fbbf24" : "#06b6d4") : "#09090b") : "#ffffff";

              return (
                <g key={`win-r-${rIdx}-${wIdx}`}>
                  <polygon points={`${pW1.x - 0.5},${pW1.y - 0.5} ${pW2.x + 0.5},${pW2.y - 0.5} ${pW3.x + 0.5},${pW3.y + 0.5} ${pW4.x - 0.5},${pW4.y + 0.5}`} fill={windowFrameColor} />
                  <polygon points={`${pW1.x},${pW1.y} ${pW2.x},${pW2.y} ${pW3.x},${pW3.y} ${pW4.x},${pW4.y}`} fill={winColor} opacity={isDark ? (isOn ? 0.75 : 0.9) : 0.85} filter={isDark && isOn ? "url(#screen-glow)" : undefined} />
                </g>
              );
            })
          )}
        </g>
      );
    }
  });

  // Barandas
  const leftRailingX = [0, 60, 120, 180, 240];
  leftRailingX.forEach((xPos, idx) => {
    items.push({
      key: `railing-post-l-${idx}`,
      depth: getDepth(xPos, 251, 0, 2, 2, 10),
      render: () => (
        <g key={`railing-post-l-${idx}`}>
          <IsometricVoxelBox x={xPos} y={251} z={0} dx={2} dy={2} dz={10} colorTop="#cbd5e1" colorLeft="#94a3b8" colorRight="#64748b" />
        </g>
      )
    });
  });

  const rightRailingY = [0, 60, 120, 180, 240];
  rightRailingY.forEach((yPos, idx) => {
    items.push({
      key: `railing-post-r-${idx}`,
      depth: getDepth(251, yPos, 0, 2, 2, 10),
      render: () => (
        <g key={`railing-post-r-${idx}`}>
          <IsometricVoxelBox x={251} y={yPos} z={0} dx={2} dy={2} dz={10} colorTop="#cbd5e1" colorLeft="#94a3b8" colorRight="#64748b" />
        </g>
      )
    });
  });

  items.push({
    key: 'handrail-left',
    depth: getDepth(0, 252, 10, 252, 1, 1),
    render: () => {
      const pStart = project(0, 252, 10);
      const pEnd = project(252, 252, 10);
      return (
        <line key="handrail-left" x1={pStart.x} y1={pStart.y} x2={pEnd.x} y2={pEnd.y} stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
      );
    }
  });

  items.push({
    key: 'handrail-right',
    depth: getDepth(252, 0, 10, 1, 252, 1),
    render: () => {
      const pStart = project(252, 0, 10);
      const pEnd = project(252, 252, 10);
      return (
        <line key="handrail-right" x1={pStart.x} y1={pStart.y} x2={pEnd.x} y2={pEnd.y} stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
      );
    }
  });

  // Macetas
  items.push({
    key: 'balcony-plant-1',
    depth: getDepth(30, 243, 0, 12, 8, 8),
    render: () => (
      <g key="balcony-plant-1">
        <IsometricVoxelBox x={30} y={243} z={0} dx={12} dy={8} dz={8} colorTop="#78350f" colorLeft="#451a03" colorRight="#3b1502" />
        <IsometricVoxelBox x={32} y={244} z={8} dx={8} dy={6} dz={7} colorTop="#22c55e" colorLeft="#16a34a" colorRight="#15803d" />
        <IsometricVoxelBox x={29} y={242} z={10} dx={4} dy={4} dz={4} colorTop="#4ade80" colorLeft="#22c55e" colorRight="#16a34a" />
      </g>
    )
  });

  items.push({
    key: 'balcony-plant-2',
    depth: getDepth(243, 80, 0, 8, 12, 8),
    render: () => (
      <g key="balcony-plant-2">
        <IsometricVoxelBox x={243} y={80} z={0} dx={8} dy={12} dz={8} colorTop="#78350f" colorLeft="#451a03" colorRight="#3b1502" />
        <IsometricVoxelBox x={244} y={82} z={8} dx={6} dy={8} dz={7} colorTop="#22c55e" colorLeft="#16a34a" colorRight="#15803d" />
        <circle cx={project(247, 86, 15).x} cy={project(247, 86, 15).y} r={3.5} fill="#4ade80" />
      </g>
    )
  });


  // --- 1. WALLS ---
  // Left wall
  items.push({
    key: 'wall-bl',
    depth: getDepth(0, 0, 0, 240, 4, 36) - 100,
    render: () => (
      <g key="wall-bl">
        <IsometricVoxelBox x={0} y={0} z={0} dx={240} dy={4} dz={36} 
          colorTop={isDark ? "#3f3f46" : "#fafaf9"} 
          colorLeft={isDark ? "#27272a" : "#f5f5f4"} 
          colorRight={isDark ? "#18181b" : "#e7e5e4"} 
        />
        <rect x={project(60, 4, 24).x - 7} y={project(60, 4, 24).y - 5} width={14} height={9} fill="#1e293b" rx={1} stroke="#d97706" strokeWidth="0.8" />
        <rect x={project(60, 4, 24).x - 4} y={project(60, 4, 24).y - 2} width={2.5} height={5} fill="#ef4444" />
        <rect x={project(60, 4, 24).x - 0.5} y={project(60, 4, 24).y - 4} width={2.5} height={7} fill="#3b82f6" />
        <rect x={project(60, 4, 24).x + 3} y={project(60, 4, 24).y - 1} width={2.5} height={4} fill="#10b981" />

        <rect x={project(100, 4, 24).x - 8} y={project(100, 4, 24).y - 6} width={16} height={10} fill="#f8fafc" rx={0.5} stroke="#334155" strokeWidth="0.8" />
        <rect x={project(100, 4, 24).x - 6} y={project(100, 4, 24).y - 4} width={3} height={3} fill="#fef08a" />
        <rect x={project(100, 4, 24).x - 1} y={project(100, 4, 24).y - 3} width={3} height={4} fill="#bfdbfe" />
        <rect x={project(100, 4, 24).x + 3} y={project(100, 4, 24).y - 4} width={3} height={3} fill="#bbf7d0" />

        <rect x={project(170, 4, 24).x - 7} y={project(170, 4, 24).y - 5} width={14} height={9} fill="#1d4ed8" rx={1} stroke="#d97706" strokeWidth="0.8" />
        <circle cx={project(170, 4, 24).x} cy={project(170, 4, 24).y} r={2.5} fill="#22c55e" />
        <rect x={project(170, 4, 24).x - 0.5} y={project(170, 4, 24).y + 1} width={1.5} height={2.5} fill="#78350f" />
      </g>
    )
  });

  // Right wall
  items.push({
    key: 'wall-br',
    depth: getDepth(0, 0, 0, 4, 240, 36) - 100,
    render: () => (
      <g key="wall-br">
        <IsometricVoxelBox x={0} y={0} z={0} dx={4} dy={240} dz={36} 
          colorTop={isDark ? "#3f3f46" : "#fafaf9"} 
          colorLeft={isDark ? "#27272a" : "#f5f5f4"} 
          colorRight={isDark ? "#18181b" : "#e7e5e4"} 
        />
        <polygon points={`${project(4, 90, 28).x},${project(4, 90, 28).y} ${project(4, 130, 28).x},${project(4, 130, 28).y} ${project(4, 130, 14).x},${project(4, 130, 14).y} ${project(4, 90, 14).x},${project(4, 90, 14).y}`} fill="#3b82f6" stroke="#1e293b" strokeWidth="1.2" opacity="0.8" />
        <line x1={project(4, 100, 26).x} y1={project(4, 100, 26).y} x2={project(4, 110, 16).x} y2={project(4, 110, 16).y} stroke="#ffffff" strokeWidth="1" opacity="0.6" />
        <line x1={project(4, 115, 26).x} y1={project(4, 115, 26).y} x2={project(4, 125, 16).x} y2={project(4, 125, 16).y} stroke="#ffffff" strokeWidth="1" opacity="0.6" />
      </g>
    )
  });

  // --- 2. MODULAR PARTITIONS ---
  items.push({
    key: 'partition-v-bottom-1',
    depth: getDepth(118, 120, 0, 4, 20, 14),
    render: () => (
      <IsometricVoxelBox key="partition-v-bottom-1" x={118} y={120} z={0} dx={4} dy={20} dz={14} 
        colorTop={isDark ? "#475569" : "#cbd5e1"} 
        colorLeft={isDark ? "#334155" : "#94a3b8"} 
        colorRight={isDark ? "#1e293b" : "#64748b"} 
      />
    )
  });

  items.push({
    key: 'partition-v-bottom-2',
    depth: getDepth(118, 160, 0, 4, 80, 14),
    render: () => (
      <IsometricVoxelBox key="partition-v-bottom-2" x={118} y={160} z={0} dx={4} dy={80} dz={14} 
        colorTop={isDark ? "#475569" : "#cbd5e1"} 
        colorLeft={isDark ? "#334155" : "#94a3b8"} 
        colorRight={isDark ? "#1e293b" : "#64748b"} 
      />
    )
  });

  items.push({
    key: 'partition-h-1',
    depth: getDepth(0, 118, 0, 90, 4, 14),
    render: () => (
      <IsometricVoxelBox key="partition-h-1" x={0} y={118} z={0} dx={90} dy={4} dz={14} 
        colorTop={isDark ? "#475569" : "#cbd5e1"} 
        colorLeft={isDark ? "#334155" : "#94a3b8"} 
        colorRight={isDark ? "#1e293b" : "#64748b"} 
      />
    )
  });

  items.push({
    key: 'partition-h-2',
    depth: getDepth(110, 118, 0, 40, 4, 14),
    render: () => (
      <IsometricVoxelBox key="partition-h-2" x={110} y={118} z={0} dx={40} dy={4} dz={14} 
        colorTop={isDark ? "#475569" : "#cbd5e1"} 
        colorLeft={isDark ? "#334155" : "#94a3b8"} 
        colorRight={isDark ? "#1e293b" : "#64748b"} 
      />
    )
  });

  items.push({
    key: 'partition-h-3',
    depth: getDepth(170, 118, 0, 40, 4, 14),
    render: () => (
      <IsometricVoxelBox key="partition-h-3" x={170} y={118} z={0} dx={40} dy={4} dz={14} 
        colorTop={isDark ? "#475569" : "#cbd5e1"} 
        colorLeft={isDark ? "#334155" : "#94a3b8"} 
        colorRight={isDark ? "#1e293b" : "#64748b"} 
      />
    )
  });

  // ELEVADOR
  items.push({
    key: 'elevator-cabin',
    depth: getDepth(210, 114, 0, 30, 8, 32),
    render: () => {
      const metalTop = isDark ? "#475569" : "#cbd5e1";
      const metalLeft = isDark ? "#334155" : "#94a3b8";
      const metalRight = isDark ? "#1e293b" : "#64748b";
      const doorColor = isDark ? "#71717a" : "#cbd5e1";
      const doorRightColor = isDark ? "#52525b" : "#94a3b8";
      const frameColor = isDark ? "#1e293b" : "#475569";
      const interiorColor = isDark ? "#22d3ee" : "#fef9c3";
      const pIndicator = project(225, 122, 28);

      return (
        <g key="elevator-cabin">
          <IsometricVoxelBox x={210} y={114} z={0} dx={30} dy={8} dz={32} colorTop={metalTop} colorLeft={metalLeft} colorRight={metalRight} />
          
          <IsometricVoxelBox x={210} y={121.8} z={0} dx={4} dy={0.2} dz={32} colorTop={frameColor} colorLeft={frameColor} colorRight={frameColor} />
          <IsometricVoxelBox x={236} y={121.8} z={0} dx={4} dy={0.2} dz={32} colorTop={frameColor} colorLeft={frameColor} colorRight={frameColor} />
          <IsometricVoxelBox x={210} y={121.8} z={26} dx={30} dy={0.2} dz={6} colorTop={frameColor} colorLeft={frameColor} colorRight={frameColor} />

          <polygon points={`${project(214, 116, 26).x},${project(214, 116, 26).y} ${project(236, 116, 26).x},${project(236, 116, 26).y} ${project(236, 116, 0).x},${project(236, 116, 0).y} ${project(214, 116, 0).x},${project(214, 116, 0).y}`} fill={interiorColor} opacity="0.9" filter={isDark ? "url(#screen-glow)" : undefined} />
          <polygon points={`${project(214, 116, 26).x},${project(214, 116, 26).y} ${project(236, 116, 26).x},${project(236, 116, 26).y} ${project(236, 116, 22).x},${project(236, 116, 22).y} ${project(214, 116, 22).x},${project(214, 116, 22).y}`} fill="#000000" opacity="0.25" />

          <line x1={project(214, 122, 26.5).x} y1={project(214, 122, 26.5).y} x2={project(236, 122, 26.5).x} y2={project(214, 122, 26.5).y} stroke="#09090b" strokeWidth="0.8" />
          <line x1={project(214, 122, 0.2).x} y1={project(214, 122, 0.2).y} x2={project(236, 122, 0.2).x} y2={project(214, 122, 0.2).y} stroke="#09090b" strokeWidth="0.8" />

          <g className="door-left">
            <IsometricVoxelBox x={214} y={121} z={0} dx={11} dy={1} dz={26} colorTop={doorColor} colorLeft={doorColor} colorRight={doorRightColor} />
            <line x1={project(224.5, 122.2, 0).x} y1={project(224.5, 122.2, 0).y} x2={project(224.5, 122.2, 26).x} y2={project(224.5, 122.2, 26).y} stroke="#3f3f46" strokeWidth="0.5" />
          </g>

          <g className="door-right">
            <IsometricVoxelBox x={225} y={121} z={0} dx={11} dy={1} dz={26} colorTop={doorColor} colorLeft={doorColor} colorRight={doorRightColor} />
          </g>

          <rect x={pIndicator.x - 4} y={pIndicator.y - 2} width={8} height={4} fill="#09090b" rx="0.5" />
          <polygon points={`${pIndicator.x - 2},${pIndicator.y + 1} ${pIndicator.x + 2},${pIndicator.y + 1} ${pIndicator.x},${pIndicator.y - 1}`} fill="#22c55e" className="animate-beacon" />
        </g>
      );
    }
  });

  // --- 3. FURNITURE ---
  // High Bookcase
  items.push({
    key: 'bookshelf-high-dark',
    depth: getDepth(6, 160, 0, 12, 50, 32),
    render: () => (
      <g key="bookshelf-high-dark">
        <IsometricVoxelBox x={6} y={160} z={0} dx={12} dy={50} dz={32} colorTop={isDark ? "#1f2937" : "#374151"} colorLeft={isDark ? "#111827" : "#1f2937"} colorRight={isDark ? "#030712" : "#111827"} />
        <IsometricVoxelBox x={6} y={160} z={14} dx={12} dy={50} dz={1.5} colorTop="#1f2937" colorLeft="#111827" colorRight="#030712" />
        <IsometricVoxelBox x={6} y={160} z={24} dx={12} dy={50} dz={1.5} colorTop="#1f2937" colorLeft="#111827" colorRight="#030712" />
        <IsometricVoxelBox x={7} y={170} z={15.5} dx={8} dy={6} dz={7} colorTop="#ef4444" colorLeft="#b91c1c" colorRight="#7f1d1d" />
        <IsometricVoxelBox x={7} y={178} z={15.5} dx={8} dy={8} dz={7} colorTop="#3b82f6" colorLeft="#1d4ed8" colorRight="#172554" />
        <IsometricVoxelBox x={7} y={195} z={15.5} dx={8} dy={6} dz={7} colorTop="#10b981" colorLeft="#047857" colorRight="#064e3b" />
        <IsometricVoxelBox x={7} y={166} z={25.5} dx={8} dy={6} dz={5} colorTop="#3b82f6" colorLeft="#1d4ed8" colorRight="#172554" />
        <IsometricVoxelBox x={7} y={185} z={25.5} dx={8} dy={7} dz={5} colorTop="#facc15" colorLeft="#eab308" colorRight="#854d0e" />
      </g>
    )
  });

  // Corner cabinet
  items.push({
    key: 'corner-cabinet',
    depth: getDepth(10, 125, 0, 12, 12, 24),
    render: () => (
      <g key="corner-cabinet">
        <IsometricVoxelBox x={10} y={125} z={0} dx={12} dy={12} dz={24} colorTop={isDark ? "#4b5563" : "#94a3b8"} colorLeft={isDark ? "#374151" : "#64748b"} colorRight={isDark ? "#1f2937" : "#475569"} />
        <IsometricVoxelBox x={12} y={127} z={24} dx={8} dy={8} dz={4} colorTop="#78350f" colorLeft="#451a03" colorRight="#3b1502" />
        <circle cx={project(16, 131, 28).x} cy={project(16, 131, 28).y} r={3} fill="#10b981" />
      </g>
    )
  });

  // Jefe / Manager Desk
  items.push({
    key: 'manager-desk',
    depth: getDepth(35, 140, 0, 40, 16, 20),
    render: () => (
      <g key="manager-desk">
        <IsometricVoxelBox x={35} y={140} z={0} dx={4} dy={4} dz={18} colorTop="#ca8a04" colorLeft="#a16207" colorRight="#78350f" />
        <IsometricVoxelBox x={71} y={140} z={0} dx={4} dy={4} dz={18} colorTop="#ca8a04" colorLeft="#a16207" colorRight="#78350f" />
        <IsometricVoxelBox x={35} y={152} z={0} dx={4} dy={4} dz={18} colorTop="#ca8a04" colorLeft="#a16207" colorRight="#78350f" />
        <IsometricVoxelBox x={71} y={152} z={0} dx={4} dy={4} dz={18} colorTop="#ca8a04" colorLeft="#a16207" colorRight="#78350f" />
        <IsometricVoxelBox x={35} y={140} z={18} dx={40} dy={16} dz={2} colorTop="#fef08a" colorLeft="#facc15" colorRight="#ca8a04" />
        
        {/* Jefe Screen / Monitor */}
        <IsometricVoxelBox x={45} y={142} z={20} dx={20} dy={2} dz={10} colorTop="#1e293b" colorLeft="#0f172a" colorRight="#020617" />
        <ellipse cx={project(55, 143, 25).x} cy={project(55, 143, 25).y} rx={5} ry={2.5} fill="#eab308" opacity="0.1" className="animate-boss-screen-glow" filter="url(#screen-glow)" />
        <IsometricVoxelBox x={37} y={146} z={20} dx={6} dy={6} dz={1.5} colorTop="#ffffff" colorLeft="#f1f5f9" colorRight="#cbd5e1" />
        <IsometricVoxelBox x={66} y={145} z={20} dx={6} dy={3} dz={5} colorTop="#db2777" colorLeft="#9d174d" colorRight="#4c0519" />
      </g>
    )
  });

  // Jefe Chair
  items.push({
    key: 'manager-chair',
    depth: getDepth(50, 160, 0, 10, 10, 19),
    render: () => (
      <g key="manager-chair">
        <IsometricVoxelBox x={50} y={160} z={0} dx={10} dy={10} dz={9} colorTop="#18181b" colorLeft="#27272a" colorRight="#09090b" />
        <IsometricVoxelBox x={50} y={168} z={9} dx={10} dy={2} dz={10} colorTop="#18181b" colorLeft="#27272a" colorRight="#09090b" />
      </g>
    )
  });

  // Jefe Trash Can
  items.push({
    key: 'trash-can-jefe',
    depth: getDepth(24, 142, 0, 7, 7, 9),
    render: () => (
      <IsometricVoxelBox key="trash-can-jefe" x={24} y={142} z={0} dx={7} dy={7} dz={9} colorTop="#a16207" colorLeft="#78350f" colorRight="#451a03" />
    )
  });

  // Developer Desk
  items.push({
    key: 'desk-dev',
    depth: getDepth(35, 50, 0, 40, 16, 20),
    render: () => (
      <g key="desk-dev">
        <IsometricVoxelBox x={35} y={50} z={0} dx={4} dy={4} dz={18} colorTop="#451a03" colorLeft="#3f1a04" colorRight="#1c0a00" />
        <IsometricVoxelBox x={71} y={50} z={0} dx={4} dy={4} dz={18} colorTop="#451a03" colorLeft="#3f1a04" colorRight="#1c0a00" />
        <IsometricVoxelBox x={35} y={62} z={0} dx={4} dy={4} dz={18} colorTop="#451a03" colorLeft="#3f1a04" colorRight="#1c0a00" />
        <IsometricVoxelBox x={71} y={62} z={0} dx={4} dy={4} dz={18} colorTop="#451a03" colorLeft="#3f1a04" colorRight="#1c0a00" />
        <IsometricVoxelBox x={35} y={50} z={18} dx={40} dy={16} dz={2} colorTop="#7c2d12" colorLeft="#451a03" colorRight="#3b1502" />
        
        {/* Screen */}
        <IsometricVoxelBox x={45} y={52} z={20} dx={20} dy={2} dz={10} colorTop="#1e293b" colorLeft="#0f172a" colorRight="#020617" />
        <polygon 
          points={`
            ${project(46, 53.5, 29).x},${project(46, 53.5, 29).y}
            ${project(64, 53.5, 29).x},${project(64, 53.5, 29).y}
            ${project(64, 53.5, 21).x},${project(64, 53.5, 21).y}
            ${project(46, 53.5, 21).x},${project(46, 53.5, 21).y}
          `}
          fill="#10b981"
          opacity="0.15"
          className="animate-worker-screen-glow"
          filter="url(#screen-glow)"
        />
      </g>
    )
  });

  // Developer Chair
  items.push({
    key: 'chair-dev',
    depth: getDepth(50, 70, 0, 10, 10, 19),
    render: () => (
      <g key="chair-dev">
        <IsometricVoxelBox x={50} y={70} z={0} dx={10} dy={10} dz={9} colorTop="#18181b" colorLeft="#27272a" colorRight="#09090b" />
        <IsometricVoxelBox x={50} y={78} z={9} dx={10} dy={2} dz={10} colorTop="#18181b" colorLeft="#27272a" colorRight="#09090b" />
      </g>
    )
  });

  // Desk 2 (Helper Desk)
  items.push({
    key: 'desk-helper',
    depth: getDepth(85, 50, 0, 40, 16, 20),
    render: () => (
      <g key="desk-helper">
        <IsometricVoxelBox x={85} y={50} z={0} dx={4} dy={4} dz={18} colorTop="#7c2d12" colorLeft="#451a03" colorRight="#3f1a04" />
        <IsometricVoxelBox x={121} y={50} z={0} dx={4} dy={4} dz={18} colorTop="#7c2d12" colorLeft="#451a03" colorRight="#3f1a04" />
        <IsometricVoxelBox x={85} y={62} z={0} dx={4} dy={4} dz={18} colorTop="#7c2d12" colorLeft="#451a03" colorRight="#3f1a04" />
        <IsometricVoxelBox x={121} y={62} z={0} dx={4} dy={4} dz={18} colorTop="#7c2d12" colorLeft="#451a03" colorRight="#3f1a04" />
        <IsometricVoxelBox x={85} y={50} z={18} dx={40} dy={16} dz={2} colorTop="#cbd5e1" colorLeft="#94a3b8" colorRight="#64748b" />
        <IsometricVoxelBox x={100} y={54} z={20} dx={10} dy={10} dz={6} colorTop="#78350f" colorLeft="#451a03" colorRight="#3b1502" />
        <circle cx={project(105, 59, 26).x} cy={project(105, 59, 26).y} r={4} fill="#22c55e" />
      </g>
    )
  });

  // Marketing Desk
  items.push({
    key: 'desk-mkt',
    depth: getDepth(160, 50, 0, 40, 16, 20),
    render: () => (
      <g key="desk-mkt">
        <IsometricVoxelBox x={160} y={50} z={0} dx={4} dy={4} dz={18} colorTop="#451a03" colorLeft="#3f1a04" colorRight="#1c0a00" />
        <IsometricVoxelBox x={196} y={50} z={0} dx={4} dy={4} dz={18} colorTop="#451a03" colorLeft="#3f1a04" colorRight="#1c0a00" />
        <IsometricVoxelBox x={160} y={62} z={0} dx={4} dy={4} dz={18} colorTop="#451a03" colorLeft="#3f1a04" colorRight="#1c0a00" />
        <IsometricVoxelBox x={196} y={62} z={0} dx={4} dy={4} dz={18} colorTop="#451a03" colorLeft="#3f1a04" colorRight="#1c0a00" />
        <IsometricVoxelBox x={160} y={50} z={18} dx={40} dy={16} dz={2} colorTop="#7c2d12" colorLeft="#451a03" colorRight="#3b1502" />
        
        {/* Screen */}
        <IsometricVoxelBox x={170} y={52} z={20} dx={20} dy={2} dz={10} colorTop="#1e293b" colorLeft="#0f172a" colorRight="#020617" />
        <polygon 
          points={`
            ${project(171, 53.5, 29).x},${project(171, 53.5, 29).y}
            ${project(189, 53.5, 29).x},${project(189, 53.5, 29).y}
            ${project(189, 53.5, 21).x},${project(189, 53.5, 21).y}
            ${project(171, 53.5, 21).x},${project(171, 53.5, 21).y}
          `}
          fill="#8b5cf6"
          opacity="0.15"
          className="animate-worker-screen-glow"
          filter="url(#screen-glow)"
        />
      </g>
    )
  });

  // Marketing Chair
  items.push({
    key: 'chair-mkt',
    depth: getDepth(175, 70, 0, 10, 10, 19),
    render: () => (
      <g key="chair-mkt">
        <IsometricVoxelBox x={175} y={70} z={0} dx={10} dy={10} dz={9} colorTop="#18181b" colorLeft="#27272a" colorRight="#09090b" />
        <IsometricVoxelBox x={175} y={78} z={9} dx={10} dy={2} dz={10} colorTop="#18181b" colorLeft="#27272a" colorRight="#09090b" />
      </g>
    )
  });

  // Bookcase at the back (left)
  items.push({
    key: 'bookshelf-wood-back-1',
    depth: getDepth(35, 4, 0, 50, 6, 32),
    render: () => (
      <g key="bookshelf-wood-back-1">
        <IsometricVoxelBox x={35} y={4} z={0} dx={50} dy={6} dz={32} colorTop="#a16207" colorLeft="#78350f" colorRight="#451a03" />
        <rect x={project(45, 6, 20).x - 2} y={project(45, 6, 20).y - 6} width={4} height={8} fill="#ef4444" />
        <rect x={project(55, 6, 20).x - 2} y={project(55, 6, 20).y - 6} width={3} height={8} fill="#3b82f6" />
        <rect x={project(65, 6, 20).x - 2} y={project(65, 6, 20).y - 6} width={5} height={8} fill="#10b981" />
      </g>
    )
  });

  // Bookcase at the back (right)
  items.push({
    key: 'bookshelf-wood-back-2',
    depth: getDepth(140, 4, 0, 50, 6, 32),
    render: () => (
      <g key="bookshelf-wood-back-2">
        <IsometricVoxelBox x={140} y={4} z={0} dx={50} dy={6} dz={32} colorTop="#a16207" colorLeft="#78350f" colorRight="#451a03" />
        <rect x={project(150, 6, 20).x - 2} y={project(150, 6, 20).y - 6} width={5} height={8} fill="#3b82f6" />
        <rect x={project(160, 6, 20).x - 2} y={project(160, 6, 20).y - 6} width={4} height={8} fill="#ef4444" />
        <rect x={project(170, 6, 20).x - 2} y={project(170, 6, 20).y - 6} width={4} height={8} fill="#8b5cf6" />
      </g>
    )
  });

  // White cabinet with cat
  items.push({
    key: 'kitchen-cabinet-white',
    depth: getDepth(220, 10, 0, 18, 12, 28),
    render: () => (
      <g key="kitchen-cabinet-white">
        <IsometricVoxelBox x={220} y={10} z={0} dx={18} dy={12} dz={28} colorTop={isDark ? "#71717a" : "#fafafa"} colorLeft={isDark ? "#52525b" : "#f4f4f5"} colorRight={isDark ? "#3f3f46" : "#e4e4e7"} />
        <line x1={project(226, 16, 8).x} y1={project(226, 16, 8).y} x2={project(232, 16, 8).x} y2={project(232, 16, 8).y} stroke="#18181b" strokeWidth="1.2" />
        <line x1={project(226, 16, 16).x} y1={project(226, 16, 16).y} x2={project(232, 16, 16).x} y2={project(232, 16, 16).y} stroke="#18181b" strokeWidth="1.2" />
        <line x1={project(226, 16, 24).x} y1={project(226, 16, 24).y} x2={project(232, 16, 24).x} y2={project(232, 16, 24).y} stroke="#18181b" strokeWidth="1.2" />

        <IsometricVoxelBox x={222} y={12} z={28} dx={6} dy={6} dz={4} colorTop="#78350f" colorLeft="#451a03" colorRight="#3b1502" />
        <circle cx={project(225, 15, 32).x} cy={project(225, 15, 32).y} r={3} fill="#16a34a" />

        <rect x={project(232, 14, 30).x} y={project(232, 14, 30).y - 3} width={5} height={4} fill="#6b7280" rx={0.5} />
        <rect x={project(234, 14, 33).x} y={project(234, 14, 33).y - 4} width={4} height={4} fill="#6b7280" rx={0.5} />
        <polygon points={`${project(234, 14, 37).x},${project(234, 14, 37).y} ${project(235, 14, 37).x},${project(235, 14, 37).y} ${project(234.5, 14, 38).x},${project(234.5, 14, 38).y}`} fill="#4b5563" />
        <polygon points={`${project(237, 14, 37).x},${project(237, 14, 37).y} ${project(238, 14, 37).x},${project(238, 14, 37).y} ${project(237.5, 14, 38).x},${project(237.5, 14, 38).y}`} fill="#4b5563" />
        <rect x={project(233.5, 14, 31).x} y={project(233.5, 14, 31).y - 1} width={3} height={1} fill="#ef4444" />
        <path d={`M ${project(230, 14, 29).x} ${project(230, 14, 29).y} Q ${project(228, 14, 31).x} ${project(228, 14, 31).y} ${project(229, 14, 34).x} ${project(229, 14, 34).y}`} stroke="#6b7280" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      </g>
    )
  });

  // Lobby Armchair 1
  items.push({
    key: 'lobby-chair-1',
    depth: getDepth(140, 170, 0, 16, 16, 24),
    render: () => (
      <g key="lobby-chair-1">
        <IsometricVoxelBox x={140} y={170} z={0} dx={2} dy={2} dz={4} colorTop="#d97706" colorLeft="#b45309" colorRight="#78350f" />
        <IsometricVoxelBox x={154} y={170} z={0} dx={2} dy={2} dz={4} colorTop="#d97706" colorLeft="#b45309" colorRight="#78350f" />
        <IsometricVoxelBox x={140} y={184} z={0} dx={2} dy={2} dz={4} colorTop="#d97706" colorLeft="#b45309" colorRight="#78350f" />
        <IsometricVoxelBox x={154} y={184} z={0} dx={2} dy={2} dz={4} colorTop="#d97706" colorLeft="#b45309" colorRight="#78350f" />
        <IsometricVoxelBox x={140} y={170} z={4} dx={16} dy={16} dz={7} colorTop="#1e3a8a" colorLeft="#1e40af" colorRight="#1d4ed8" />
        <IsometricVoxelBox x={140} y={170} z={11} dx={4} dy={16} dz={13} colorTop="#1e3a8a" colorLeft="#1e40af" colorRight="#1d4ed8" />
      </g>
    )
  });

  // Lobby Armchair 2
  items.push({
    key: 'lobby-chair-2',
    depth: getDepth(210, 170, 0, 16, 16, 24),
    render: () => (
      <g key="lobby-chair-2">
        <IsometricVoxelBox x={210} y={170} z={0} dx={2} dy={2} dz={4} colorTop="#d97706" colorLeft="#b45309" colorRight="#78350f" />
        <IsometricVoxelBox x={224} y={170} z={0} dx={2} dy={2} dz={4} colorTop="#d97706" colorLeft="#b45309" colorRight="#78350f" />
        <IsometricVoxelBox x={210} y={184} z={0} dx={2} dy={2} dz={4} colorTop="#d97706" colorLeft="#b45309" colorRight="#78350f" />
        <IsometricVoxelBox x={224} y={184} z={0} dx={2} dy={2} dz={4} colorTop="#d97706" colorLeft="#b45309" colorRight="#78350f" />
        <IsometricVoxelBox x={210} y={170} z={4} dx={16} dy={16} dz={7} colorTop="#1e3a8a" colorLeft="#1e40af" colorRight="#1d4ed8" />
        <IsometricVoxelBox x={222} y={170} z={11} dx={4} dy={16} dz={13} colorTop="#1e3a8a" colorLeft="#1e40af" colorRight="#1d4ed8" />
      </g>
    )
  });

  // Lobby Table
  items.push({
    key: 'lobby-table',
    depth: getDepth(166, 172, 0, 38, 12, 12),
    render: () => (
      <g key="lobby-table">
        <IsometricVoxelBox x={180} y={174} z={0} dx={10} dy={8} dz={10} colorTop="#78350f" colorLeft="#451a03" colorRight="#3b1502" />
        <IsometricVoxelBox x={166} y={172} z={10} dx={38} dy={12} dz={2} colorTop="#b45309" colorLeft="#78350f" colorRight="#451a03" />
        <IsometricVoxelBox x={178} y={176} z={12} dx={10} dy={6} dz={1} colorTop="#cbd5e1" colorLeft="#94a3b8" stroke="#64748b" strokeWidth="0.3" />
      </g>
    )
  });

  // --- 4. CHARACTERS RENDERING ---
  // A. CLIENT
  items.push({
    key: 'client-walk-fr',
    depth: getDepth(225, 200, 0, 12, 12, 28) + 3,
    render: () => renderVoxelCharacter(225, 200, 0, isDark, 'client-walking', 'front-right', 'animate-client-walk-fr')
  });

  items.push({
    key: 'client-sit-fl',
    depth: getDepth(212, 168, 0, 12, 12, 24) + 1,
    render: () => renderVoxelCharacter(212, 168, 8, isDark, 'client-sitting', 'front-left', 'animate-client-sit-fl')
  });

  items.push({
    key: 'client-walk-bl',
    depth: getDepth(225, 200, 0, 12, 12, 28) + 2,
    render: () => renderVoxelCharacter(225, 200, 0, isDark, 'client-walking', 'back-left', 'animate-client-walk-bl')
  });

  // B. SELLER
  items.push({
    key: 'seller-reception-fl',
    depth: getDepth(185, 135, 0, 12, 12, 28) + 2,
    render: () => renderVoxelCharacter(185, 135, 0, isDark, 'seller-standing', 'front-left', 'animate-seller-reception')
  });

  items.push({
    key: 'seller-walk-fr',
    depth: getDepth(185, 135, 0, 12, 12, 28) + 3,
    render: () => renderVoxelCharacter(185, 135, 0, isDark, 'seller-walking', 'front-right', 'animate-seller-walk-fr')
  });

  items.push({
    key: 'seller-walk-bl',
    depth: getDepth(185, 135, 0, 12, 12, 28) + 1,
    render: () => renderVoxelCharacter(185, 135, 0, isDark, 'seller-walking', 'back-left', 'animate-seller-walk-bl')
  });

  // C. BOSS
  items.push({
    key: 'boss-stand-fr',
    depth: getDepth(75, 185, 0, 12, 12, 28) + 2,
    render: () => renderVoxelCharacter(75, 185, 0, isDark, 'boss-standing', 'front-right', 'animate-boss-stand-fr')
  });

  items.push({
    key: 'boss-sit-bl',
    depth: getDepth(50, 154, 0, 12, 12, 24) + 1,
    render: () => renderVoxelCharacter(50, 154, 8, isDark, 'boss-sitting', 'back-left', 'animate-boss-sit-bl')
  });

  items.push({
    key: 'boss-walk-bl',
    depth: getDepth(75, 185, 0, 12, 12, 28) + 1,
    render: () => renderVoxelCharacter(75, 185, 0, isDark, 'boss-standing', 'back-left', 'animate-boss-walk-bl')
  });

  // D. WORKER DEVELOPER
  items.push({
    key: 'worker-dev-char',
    depth: getDepth(50, 68, 0, 12, 12, 24) + 1,
    render: () => renderVoxelCharacter(50, 68, 8, isDark, 'worker-dev', 'back-left', 'animate-worker-dev')
  });

  // E. WORKER MARKETING
  items.push({
    key: 'worker-mkt-char',
    depth: getDepth(175, 68, 0, 12, 12, 24) + 1,
    render: () => renderVoxelCharacter(175, 68, 8, isDark, 'worker-mkt', 'back-left', 'animate-worker-mkt')
  });

  // --- 5. FLYING EMAIL ENVELOPES & TRANSACTIONS ---
  // Jefe -> Workers (Fase 4: 43% to 57%)
  items.push({
    key: 'email-jefe-to-workers',
    depth: getDepth(90, 90, 24, 8, 8, 4),
    render: () => {
      const pEmailStart = project(55, 140, 24);
      return (
        <g className="animate-email-to-workers" key="email-jefe-to-workers">
          <g transform={`translate(${pEmailStart.x - 6}, ${pEmailStart.y - 4})`}>
            <rect x="0" y="0" width="12" height="8" fill="#fbbf24" stroke="#d97706" strokeWidth="0.8" rx="0.5" />
            <polygon points="0,0 6,4 12,0" fill="#fef08a" stroke="#d97706" strokeWidth="0.8" />
          </g>
        </g>
      );
    }
  });

  // Dev -> Jefe (Fase 5: 57% to 71%)
  items.push({
    key: 'email-dev-to-jefe',
    depth: getDepth(75, 90, 24, 8, 8, 4),
    render: () => {
      const pStart = project(50, 65, 24);
      return (
        <g className="animate-email-dev-to-jefe" key="email-dev-to-jefe">
          <g transform={`translate(${pStart.x - 6}, ${pStart.y - 4})`}>
            <rect x="0" y="0" width="11" height="7.5" fill="#10b981" stroke="#047857" strokeWidth="0.8" rx="0.5" />
            <polygon points="0,0 5.5,3.5 11,0" fill="#a7f3d0" stroke="#047857" strokeWidth="0.8" />
          </g>
        </g>
      );
    }
  });

  // Mkt -> Jefe (Fase 5: 57% to 71%)
  items.push({
    key: 'email-mkt-to-jefe',
    depth: getDepth(120, 90, 24, 8, 8, 4),
    render: () => {
      const pStart = project(180, 65, 24);
      return (
        <g className="animate-email-mkt-to-jefe" key="email-mkt-to-jefe">
          <g transform={`translate(${pStart.x - 6}, ${pStart.y - 4})`}>
            <rect x="0" y="0" width="11" height="7.5" fill="#d946ef" stroke="#86198f" strokeWidth="0.8" rx="0.5" />
            <polygon points="0,0 5.5,3.5 11,0" fill="#f5d0fe" stroke="#86198f" strokeWidth="0.8" />
          </g>
        </g>
      );
    }
  });

  // Cash sparkle transaction (Fase 6: 74% a 82%)
  items.push({
    key: 'payment-cash-spark',
    depth: getDepth(190, 170, 20, 10, 10, 10),
    render: () => {
      const pStart = project(212, 168, 20);
      return (
        <g className="animate-cash-payment" key="payment-cash-spark">
          <g transform={`translate(${pStart.x - 7}, ${pStart.y - 4})`}>
            <rect x="0" y="1" width="12" height="6" fill="#15803d" rx="0.5" />
            <rect x="0" y="0" width="12" height="6" fill="#22c55e" stroke="#16a34a" strokeWidth="0.5" rx="0.5" />
            <text x="3.5" y="5" fill="#fef08a" fontSize="6px" fontFamily="monospace" fontWeight="bold" letterSpacing="-1">$</text>
          </g>
        </g>
      );
    }
  });

  // Sorting
  items.sort((a, b) => a.depth - b.depth);

  // Background Sky Gradient
  const gradId = isDark ? "sky-grad-dark" : "sky-grad-light";

  return (
    <div ref={containerRef} className="relative flex-1 w-full h-full overflow-hidden">
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox={`${viewBoxX} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}`}>
        <defs>
          <linearGradient id="sky-grad-light" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#bae6fd" />
            <stop offset="60%" stopColor="#e0f2fe" />
            <stop offset="100%" stopColor="#f0f9ff" />
          </linearGradient>

          <linearGradient id="sky-grad-dark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#020617" />
            <stop offset="70%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e1b4b" />
          </linearGradient>

          <filter id="screen-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="neon-glow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <style>{`
            @keyframes beaconBlink {
              0%, 100% { opacity: 0.2; }
              50% { opacity: 1; }
            }
            @keyframes cloudMoveSlow {
              0% { transform: translateX(520px); }
              100% { transform: translateX(-180px); }
            }
            @keyframes cloudMoveFast {
              0% { transform: translateX(540px); }
              100% { transform: translateX(-150px); }
            }
            .animate-beacon { animation: beaconBlink 2s infinite ease-in-out; }
            .cloud-slow { animation: cloudMoveSlow 65s linear infinite; }
            .cloud-fast { animation: cloudMoveFast 45s linear infinite; }

            /* Elevator doors */
            @keyframes openDoorLeft {
              0%, 5%, 85%, 90%, 100% { transform: translate(-14px, -7px); }
              8%, 82% { transform: translate(0px, 0px); }
            }
            @keyframes openDoorRight {
              0%, 5%, 85%, 90%, 100% { transform: translate(14px, 7px); }
              8%, 82% { transform: translate(0px, 0px); }
            }
            .door-left { animation: openDoorLeft 35s infinite linear; }
            .door-right { animation: openDoorRight 35s infinite linear; }

            /* Client animations */
            @keyframes clientWalkFR_Loop {
              0% { opacity: 0; transform: translate(0px, 0px); }
              1.49% { opacity: 0; }
              1.5% { opacity: 1; transform: translate(0px, 0px); }
              5% { transform: translate(-10px, -15px); }
              10% { transform: translate(-13px, -32px); }
              11.99% { opacity: 1; transform: translate(-13px, -32px); }
              12%, 100% { opacity: 0; }
            }
            .animate-client-walk-fr { animation: clientWalkFR_Loop 35s infinite linear; }

            @keyframes clientSitFL_Loop {
              0%, 11.99% { opacity: 0; }
              12%, 83.99% { opacity: 1; }
              84%, 100% { opacity: 0; }
            }
            .animate-client-sit-fl { animation: clientSitFL_Loop 35s infinite linear; }

            @keyframes clientWalkBL_Loop {
              0%, 83.99% { opacity: 0; transform: translate(-13px, -32px); }
              84% { opacity: 1; transform: translate(-13px, -32px); }
              88% { transform: translate(-10px, -15px); }
              93% { transform: translate(0px, 0px); }
              94.49% { opacity: 1; transform: translate(0px, 0px); }
              94.5%, 100% { opacity: 0; }
            }
            .animate-client-walk-bl { animation: clientWalkBL_Loop 35s infinite linear; }

            /* Vendedor animations */
            @keyframes sellerReceptionLoop {
              0%, 12.99% { opacity: 1; transform: translate(0px, 0px); }
              13%, 49.99% { opacity: 0; }
              50%, 100% { opacity: 1; transform: translate(0px, 0px); }
            }
            .animate-seller-reception { animation: sellerReceptionLoop 35s infinite linear; }

            @keyframes sellerWalkFR_Loop {
              0%, 12.99% { opacity: 0; transform: translate(0px, 0px); }
              13% { opacity: 1; transform: translate(0px, 0px); }
              17% { transform: translate(15px, 20px); }
              25.99% { opacity: 1; transform: translate(15px, 20px); }
              26%, 100% { opacity: 0; }
            }
            .animate-seller-walk-fr { animation: sellerWalkFR_Loop 35s infinite linear; }

            @keyframes sellerWalkBL_Loop {
              0%, 26.99% { opacity: 0; transform: translate(15px, 20px); }
              27% { opacity: 1; transform: translate(15px, 20px); }
              32% { transform: translate(-70px, 5px); }
              43% { transform: translate(-70px, 5px); }
              48% { transform: translate(0px, 0px); }
              49.99% { opacity: 1; transform: translate(0px, 0px); }
              50%, 100% { opacity: 0; }
            }
            .animate-seller-walk-bl { animation: sellerWalkBL_Loop 35s infinite linear; }

            /* Boss animations */
            @keyframes bossStandFR_Loop {
              0% { opacity: 1; transform: translate(0px, 0px); }
              10% { transform: translate(5px, 15px); }
              31.99% { opacity: 1; transform: translate(-10px, -15px); }
              32%, 57.99% { opacity: 0; }
              58% { opacity: 1; transform: translate(-25px, -31px); }
              62% { transform: translate(35px, -35px); }
              66% { transform: translate(55px, -35px); }
              70% { transform: translate(110px, -20px); }
              81.99% { opacity: 1; transform: translate(110px, -20px); }
              82%, 92.99% { opacity: 0; }
              93%, 100% { opacity: 1; transform: translate(0px, 0px); }
            }
            .animate-boss-stand-fr { animation: bossStandFR_Loop 35s infinite linear; }

            @keyframes bossSitBL_Loop {
              0%, 33.99% { opacity: 0; }
              34%, 56.99% { opacity: 1; }
              37%, 42%, 48%, 54% { transform: translateY(-0.8px); }
              39%, 45%, 51%, 56% { transform: translateY(0px); }
              57%, 100% { opacity: 0; }
            }
            .animate-boss-sit-bl { animation: bossSitBL_Loop 35s infinite linear; }

            @keyframes bossWalkBL_Loop {
              0%, 31.99% { opacity: 0; transform: translate(-10px, -15px); }
              32% { opacity: 1; transform: translate(-10px, -15px); }
              33.89% { opacity: 1; transform: translate(-25px, -31px); }
              33.9%, 81.99% { opacity: 0; }
              82% { opacity: 1; transform: translate(110px, -20px); }
              86% { transform: translate(55px, -35px); }
              90% { transform: translate(35px, -35px); }
              92.89% { opacity: 1; transform: translate(0px, 0px); }
              92.9%, 100% { opacity: 0; }
            }
            .animate-boss-walk-bl { animation: bossWalkBL_Loop 35s infinite linear; }

            /* Emails */
            @keyframes emailJefeLoop {
              0%, 44% { opacity: 0; transform: translate(0px, 0px); }
              45% { opacity: 1; transform: translate(0px, 0px); }
              49% { transform: translate(10px, -45px) scale(1.1); }
              53% { opacity: 1; transform: translate(60px, -70px) scale(1); }
              54%, 100% { opacity: 0; }
            }
            .animate-email-to-workers { animation: emailJefeLoop 35s infinite ease-in-out; }

            @keyframes emailDevLoop {
              0%, 59% { opacity: 0; transform: translate(0px, 0px); }
              60% { opacity: 1; transform: translate(0px, 0px); }
              63% { transform: translate(10px, 35px) scale(1.1); }
              67% { opacity: 1; transform: translate(5px, 75px) scale(1); }
              68%, 100% { opacity: 0; }
            }
            .animate-email-dev-to-jefe { animation: emailDevLoop 35s infinite ease-in-out; }

            @keyframes emailMktLoop {
              0%, 59% { opacity: 0; transform: translate(0px, 0px); }
              60% { opacity: 1; transform: translate(0px, 0px); }
              63% { transform: translate(-50px, 35px) scale(1.1); }
              67% { opacity: 1; transform: translate(-120px, 75px) scale(1); }
              68%, 100% { opacity: 0; }
            }
            .animate-email-mkt-to-jefe { animation: emailMktLoop 35s infinite ease-in-out; }

            /* Cash */
            @keyframes cashPayLoop {
              0%, 74% { opacity: 0; transform: translate(0px, 0px); }
              75% { opacity: 1; transform: translate(0px, 0px); }
              78% { transform: translate(-15px, -18px) scale(1.2); }
              80% { opacity: 1; transform: translate(-28px, -10px) scale(1); }
              81%, 100% { opacity: 0; }
            }
            .animate-cash-payment { animation: cashPayLoop 35s infinite ease-in-out; }

            /* Typing */
            @keyframes workerTypeLoop {
              0%, 53% { transform: translateY(0px); }
              54%, 57%, 60%, 63%, 66% { transform: translateY(-0.8px); }
              55%, 58%, 61%, 64%, 67% { transform: translateY(0px); }
              68%, 100% { transform: translateY(0px); }
            }
            .animate-worker-dev, .animate-worker-mkt {
              animation: workerTypeLoop 35s infinite linear;
              transform-origin: bottom center;
            }

            /* Screen Glows */
            @keyframes bossScreenGlowLoop {
              0%, 33% { opacity: 0.1; }
              34%, 57% { opacity: 0.7; }
              58%, 100% { opacity: 0.1; }
            }
            .animate-boss-screen-glow { animation: bossScreenGlowLoop 35s infinite linear; }

            @keyframes workerScreenGlowLoop {
              0%, 53% { opacity: 0.15; }
              54%, 64% { opacity: 0.85; }
              65%, 100% { opacity: 0.15; }
            }
            .animate-worker-screen-glow { animation: workerScreenGlowLoop 35s infinite linear; }
          `}</style>
        </defs>

        {/* --- 1. RESPONSIVE SKY BACKGROUND (Extends from -600 to 1200 / -600 to 1000) --- */}
        <rect x="-600" y="-600" width="1800" height="1600" fill={`url(#${gradId})`} />

        {/* --- 2. RESPONSIVE CITYSCAPE SILHOUETTES (Relleno de lado a lado con edificios altos y ventanas) --- */}
        
        {/* Edificio Extremo Izquierdo 1 (x = -220) */}
        <g opacity={isDark ? "0.2" : "0.1"}>
          <rect x="-220" y="110" width="40" height="190" fill={isDark ? "#1e293b" : "#475569"} />
          <line x1="-200" y1="90" x2="-200" y2="110" stroke={isDark ? "#1e293b" : "#475569"} strokeWidth="1" />
          <circle cx="-200" cy="90" r="1.5" fill="#ef4444" className="animate-beacon" />
          {/* Windows */}
          <rect x="-212" y="130" width="4" height="4" fill="#fbbf24" opacity="0.35" />
          <rect x="-198" y="130" width="4" height="4" fill="#fbbf24" opacity="0.35" />
          <rect x="-212" y="150" width="4" height="4" fill="#bae6fd" opacity="0.3" />
          <rect x="-198" y="170" width="4" height="4" fill="#fbbf24" opacity="0.3" />
          <rect x="-212" y="190" width="4" height="4" fill="#bae6fd" opacity="0.35" />
        </g>

        {/* Edificio Extremo Izquierdo 2 (x = -150) */}
        <g opacity={isDark ? "0.25" : "0.15"}>
          <rect x="-150" y="90" width="55" height="210" fill={isDark ? "#0f172a" : "#334155"} />
          <line x1="-122.5" y1="70" x2="-122.5" y2="90" stroke={isDark ? "#0f172a" : "#334155"} strokeWidth="1.5" />
          <circle cx="-122.5" cy="70" r="2" fill="#ef4444" className="animate-beacon" style={{ animationDelay: '0.3s' }} />
          {/* Windows */}
          <rect x="-140" y="110" width="5" height="5" fill="#bae6fd" opacity="0.4" />
          <rect x="-125" y="110" width="5" height="5" fill="#bae6fd" opacity="0.4" />
          <rect x="-110" y="110" width="5" height="5" fill="#fbbf24" opacity="0.4" />
          <rect x="-140" y="135" width="5" height="5" fill="#fbbf24" opacity="0.4" />
          <rect x="-110" y="135" width="5" height="5" fill="#bae6fd" opacity="0.4" />
          <rect x="-125" y="160" width="5" height="5" fill="#fbbf24" opacity="0.35" />
          <rect x="-140" y="185" width="5" height="5" fill="#bae6fd" opacity="0.35" />
        </g>

        {/* Edificio Izquierdo Lejano (x = -70) */}
        <g opacity={isDark ? "0.3" : "0.18"}>
          <rect x="-70" y="70" width="50" height="230" fill={isDark ? "#1e293b" : "#475569"} />
          <line x1="-45" y1="40" x2="-45" y2="70" stroke={isDark ? "#1e293b" : "#475569"} strokeWidth="1.5" />
          <circle cx="-45" cy="40" r="2" fill="#ef4444" className="animate-beacon" style={{ animationDelay: '0.7s' }} />
          {/* Windows */}
          <rect x="-60" y="90" width="4" height="4" fill="#fbbf24" opacity="0.4" />
          <rect x="-45" y="90" width="4" height="4" fill="#fbbf24" opacity="0.4" />
          <rect x="-30" y="90" width="4" height="4" fill="#bae6fd" opacity="0.4" />
          <rect x="-60" y="115" width="4" height="4" fill="#bae6fd" opacity="0.4" />
          <rect x="-30" y="115" width="4" height="4" fill="#fbbf24" opacity="0.4" />
          <rect x="-45" y="140" width="4" height="4" fill="#fbbf24" opacity="0.35" />
          <rect x="-60" y="165" width="4" height="4" fill="#bae6fd" opacity="0.35" />
        </g>

        {/* Edificio Izquierdo Medio (x = 25) */}
        <g opacity={isDark ? "0.35" : "0.2"}>
          <rect x="25" y="80" width="45" height="220" fill={isDark ? "#1e293b" : "#475569"} />
          <rect x="35" y="70" width="25" height="10" fill={isDark ? "#1e293b" : "#475569"} />
          <line x1="47.5" y1="50" x2="47.5" y2="70" stroke={isDark ? "#1e293b" : "#475569"} strokeWidth="1.5" />
          <circle cx="47.5" cy="50" r="2" fill="#ef4444" className="animate-beacon" />
          {/* Windows */}
          <rect x="33" y="100" width="4" height="4" fill="#fbbf24" opacity="0.4" />
          <rect x="43" y="100" width="4" height="4" fill="#fbbf24" opacity="0.4" />
          <rect x="53" y="100" width="4" height="4" fill="#fbbf24" opacity="0.4" />
          <rect x="33" y="120" width="4" height="4" fill="#fbbf24" opacity="0.4" />
          <rect x="53" y="120" width="4" height="4" fill="#fbbf24" opacity="0.4" />
        </g>

        {/* Edificio Central 1 (Rascacielos Principal con Antena, x = 95) */}
        <g opacity={isDark ? "0.45" : "0.25"}>
          <rect x="95" y="30" width="60" height="270" fill={isDark ? "#0f172a" : "#334155"} />
          <rect x="110" y="20" width="30" height="10" fill={isDark ? "#0f172a" : "#334155"} />
          <line x1="125" y1="2" x2="125" y2="20" stroke={isDark ? "#0f172a" : "#334155"} strokeWidth="2" />
          <circle cx="125" cy="2" r="2.5" fill="#ef4444" className="animate-beacon" style={{ animationDelay: '0.5s' }} />
          {/* Windows */}
          <rect x="105" y="50" width="5" height="5" fill="#bae6fd" opacity="0.5" />
          <rect x="120" y="50" width="5" height="5" fill="#bae6fd" opacity="0.5" />
          <rect x="135" y="50" width="5" height="5" fill="#bae6fd" opacity="0.5" />
          <rect x="120" y="70" width="5" height="5" fill="#bae6fd" opacity="0.5" />
          <rect x="135" y="70" width="5" height="5" fill="#bae6fd" opacity="0.5" />
          <rect x="105" y="90" width="5" height="5" fill="#fbbf24" opacity="0.5" />
          <rect x="135" y="90" width="5" height="5" fill="#fbbf24" opacity="0.5" />
        </g>

        {/* Edificio Central 2 (x = 175) */}
        <g opacity={isDark ? "0.35" : "0.2"}>
          <rect x="175" y="65" width="40" height="235" fill={isDark ? "#1e293b" : "#475569"} />
          <line x1="195" y1="40" x2="195" y2="65" stroke={isDark ? "#1e293b" : "#475569"} strokeWidth="1.5" />
          <circle cx="195" cy="40" r="2" fill="#ef4444" className="animate-beacon" style={{ animationDelay: '0.9s' }} />
        </g>

        {/* Edificio Derecho (x = 230) */}
        <g opacity={isDark ? "0.4" : "0.22"}>
          <rect x="230" y="60" width="50" height="240" fill={isDark ? "#0f172a" : "#334155"} />
          <line x1="255" y1="35" x2="255" y2="60" stroke={isDark ? "#0f172a" : "#334155"} strokeWidth="1.5" />
          <circle cx="255" cy="35" r="2" fill="#ef4444" className="animate-beacon" style={{ animationDelay: '1.2s' }} />
          {/* Windows */}
          <rect x="240" y="80" width="4" height="4" fill="#fbbf24" opacity="0.4" />
          <rect x="260" y="80" width="4" height="4" fill="#fbbf24" opacity="0.4" />
          <rect x="240" y="100" width="4" height="4" fill="#bae6fd" opacity="0.4" />
          <rect x="250" y="100" width="4" height="4" fill="#bae6fd" opacity="0.4" />
        </g>

        {/* Edificio Derecho Lejano (x = 310) */}
        <g opacity={isDark ? "0.3" : "0.18"}>
          <rect x="310" y="40" width="55" height="260" fill={isDark ? "#1e293b" : "#475569"} />
          <rect x="325" y="30" width="25" height="10" fill={isDark ? "#1e293b" : "#475569"} />
          <line x1="337.5" y1="10" x2="337.5" y2="30" stroke={isDark ? "#1e293b" : "#475569"} strokeWidth="2" />
          <circle cx="337.5" cy="10" r="2.5" fill="#ef4444" className="animate-beacon" style={{ animationDelay: '0.8s' }} />
          {/* Windows */}
          <rect x="320" y="60" width="5" height="5" fill="#fbbf24" opacity="0.35" />
          <rect x="340" y="60" width="5" height="5" fill="#fbbf24" opacity="0.35" />
          <rect x="320" y="80" width="5" height="5" fill="#bae6fd" opacity="0.35" />
        </g>

        {/* Edificio Derecho Extremo 1 (x = 380) */}
        <g opacity={isDark ? "0.35" : "0.2"}>
          <rect x="380" y="55" width="50" height="245" fill={isDark ? "#0f172a" : "#334155"} />
          <line x1="405" y1="30" x2="405" y2="55" stroke={isDark ? "#0f172a" : "#334155"} strokeWidth="1.5" />
          <circle cx="405" cy="30" r="2.5" fill="#ef4444" className="animate-beacon" style={{ animationDelay: '0.1s' }} />
          {/* Windows */}
          <rect x="390" y="80" width="4" height="4" fill="#bae6fd" opacity="0.4" />
          <rect x="405" y="80" width="4" height="4" fill="#fbbf24" opacity="0.4" />
          <rect x="420" y="80" width="4" height="4" fill="#bae6fd" opacity="0.4" />
          <rect x="390" y="105" width="4" height="4" fill="#fbbf24" opacity="0.4" />
          <rect x="420" y="105" width="4" height="4" fill="#fbbf24" opacity="0.4" />
          <rect x="405" y="130" width="4" height="4" fill="#bae6fd" opacity="0.35" />
          <rect x="390" y="155" width="4" height="4" fill="#fbbf24" opacity="0.35" />
        </g>

        {/* Edificio Derecho Extremo 2 (x = 440) */}
        <g opacity={isDark ? "0.25" : "0.15"}>
          <rect x="440" y="80" width="45" height="220" fill={isDark ? "#1e293b" : "#475569"} />
          <line x1="462.5" y1="60" x2="462.5" y2="80" stroke={isDark ? "#1e293b" : "#475569"} strokeWidth="1" />
          <circle cx="462.5" cy="60" r="1.5" fill="#ef4444" className="animate-beacon" style={{ animationDelay: '0.4s' }} />
          {/* Windows */}
          <rect x="450" y="100" width="4" height="4" fill="#fbbf24" opacity="0.4" />
          <rect x="462" y="100" width="4" height="4" fill="#bae6fd" opacity="0.4" />
          <rect x="474" y="100" width="4" height="4" fill="#fbbf24" opacity="0.4" />
          <rect x="450" y="120" width="4" height="4" fill="#bae6fd" opacity="0.4" />
          <rect x="474" y="120" width="4" height="4" fill="#bae6fd" opacity="0.4" />
          <rect x="462" y="140" width="4" height="4" fill="#fbbf24" opacity="0.35" />
        </g>

        {/* Edificio Derecho Extremo 3 (x = 500) */}
        <g opacity={isDark ? "0.2" : "0.12"}>
          <rect x="500" y="100" width="60" height="200" fill={isDark ? "#0f172a" : "#334155"} />
          <line x1="530" y1="80" x2="530" y2="100" stroke={isDark ? "#0f172a" : "#334155"} strokeWidth="1" />
          <circle cx="530" cy="80" r="1.5" fill="#ef4444" className="animate-beacon" style={{ animationDelay: '0.6s' }} />
          {/* Windows */}
          <rect x="510" y="120" width="5" height="5" fill="#bae6fd" opacity="0.4" />
          <rect x="525" y="120" width="5" height="5" fill="#fbbf24" opacity="0.4" />
          <rect x="540" y="120" width="5" height="5" fill="#bae6fd" opacity="0.4" />
          <rect x="510" y="145" width="5" height="5" fill="#fbbf24" opacity="0.4" />
          <rect x="540" y="145" width="5" height="5" fill="#fbbf24" opacity="0.4" />
          <rect x="525" y="170" width="5" height="5" fill="#bae6fd" opacity="0.35" />
        </g>

        {/* Edificio Derecho Extremo 4 (x = 580) */}
        <g opacity={isDark ? "0.15" : "0.08"}>
          <rect x="580" y="120" width="50" height="180" fill={isDark ? "#1e293b" : "#475569"} />
          <circle cx="605" cy="105" r="1" fill="#ef4444" className="animate-beacon" />
          {/* Windows */}
          <rect x="590" y="140" width="4" height="4" fill="#fbbf24" opacity="0.35" />
          <rect x="605" y="140" width="4" height="4" fill="#bae6fd" opacity="0.35" />
          <rect x="620" y="140" width="4" height="4" fill="#fbbf24" opacity="0.35" />
          <rect x="590" y="160" width="4" height="4" fill="#bae6fd" opacity="0.3" />
          <rect x="605" y="180" width="4" height="4" fill="#fbbf24" opacity="0.3" />
        </g>


        {/* --- 2.5 ASTROS --- */}
        {!isDark ? (
          <g key="sky-sun">
            <circle cx="410" cy="45" r="9" fill="#f59e0b" stroke="#d97706" strokeWidth="0.8" />
            <circle cx="410" cy="45" r="6" fill="#facc15" />
            <rect x="408" y="27" width="4" height="4" fill="#fbbf24" />
            <rect x="408" y="59" width="4" height="4" fill="#fbbf24" />
            <rect x="392" y="43" width="4" height="4" fill="#fbbf24" />
            <rect x="424" y="43" width="4" height="4" fill="#fbbf24" />
            <rect x="397" y="32" width="3" height="3" fill="#f97316" />
            <rect x="420" y="32" width="3" height="3" fill="#f97316" />
            <rect x="397" y="55" width="3" height="3" fill="#f97316" />
            <rect x="420" y="55" width="3" height="3" fill="#f97316" />
          </g>
        ) : (
          <g key="sky-moon">
            <path d="M 390 35 Q 410 61 430 35 Q 410 52 390 35 Z" fill="#fef08a" filter="url(#neon-glow)" transform="rotate(-18, 410, 48)" />
          </g>
        )}

        {/* --- 2.8 STAR DECORATIONS --- */}
        {isDark && (
          <g opacity="0.5">
            <rect x="80" y="30" width="1.5" height="1.5" fill="#fff" />
            <rect x="200" y="20" width="1.5" height="1.5" fill="#fff" />
            <rect x="300" y="25" width="1.5" height="1.5" fill="#fff" />
            <rect x="470" y="35" width="1.5" height="1.5" fill="#fff" />
            <rect x="-100" y="45" width="1.5" height="1.5" fill="#fff" />
            <rect x="580" y="25" width="1.5" height="1.5" fill="#fff" />
          </g>
        )}

        {/* --- 3. CLOUDS --- */}
        <g className="cloud-slow" opacity={isDark ? "0.1" : "0.5"}>
          <rect x="-80" y="15" width="40" height="8" fill="#fff" rx="4" />
          <rect x="-65" y="10" width="25" height="10" fill="#fff" rx="5" />
        </g>
        <g className="cloud-fast" opacity={isDark ? "0.15" : "0.65"}>
          <rect x="-50" y="48" width="55" height="10" fill="#fff" rx="5" />
          <rect x="-35" y="42" width="30" height="12" fill="#fff" rx="6" />
        </g>

        {/* --- 4. DIORAMA OFFICE BASE --- */}
        <g>
          {/* Floor North */}
          <polygon points={`${project(0, 0).x},${project(0, 0).y} ${project(240, 0).x},${project(240, 0).y} ${project(240, 120).x},${project(240, 120).y} ${project(0, 120).x},${project(0, 120).y}`} fill={isDark ? "#3e1c08" : "#854d0e"} />
          {Array.from({ length: 17 }).map((_, idx) => {
            const vVal = idx * 15;
            return <line key={`p-n-${idx}`} x1={project(0, vVal).x} y1={project(0, vVal).y} x2={project(240, vVal).x} y2={project(240, vVal).y} stroke={isDark ? "#291205" : "#5c330a"} strokeWidth="0.8" opacity="0.65" />;
          })}

          {/* Floor South Left (Jefe Office) */}
          <polygon points={`${project(0, 120).x},${project(0, 120).y} ${project(120, 120).x},${project(120, 120).y} ${project(120, 240).x},${project(120, 240).y} ${project(0, 240).x},${project(0, 240).y}`} fill={isDark ? "#3e1c08" : "#854d0e"} />
          {Array.from({ length: 9 }).map((_, idx) => {
            const vVal = 120 + idx * 15;
            return <line key={`p-s-${idx}`} x1={project(0, vVal).x} y1={project(0, vVal).y} x2={project(120, vVal).x} y2={project(120, vVal).y} stroke={isDark ? "#291205" : "#5c330a"} strokeWidth="0.8" opacity="0.65" />;
          })}

          {/* Carpet */}
          <polygon points={`${project(30, 140).x},${project(30, 140).y} ${project(90, 140).x},${project(90, 140).y} ${project(90, 200).x},${project(90, 200).y} ${project(30, 200).x},${project(30, 200).y}`} fill={isDark ? "#854d0e" : "#fef08a"} stroke={isDark ? "#ea580c" : "#f97316"} strokeWidth="1.2" />
          <line x1={project(30, 140).x} y1={project(30, 140).y} x2={project(90, 200).x} y2={project(90, 200).y} stroke={isDark ? "#ea580c" : "#f97316"} strokeWidth="1" strokeDasharray="2,2" />
          <line x1={project(90, 140).x} y1={project(90, 140).y} x2={project(30, 200).x} y2={project(30, 200).y} stroke={isDark ? "#ea580c" : "#f97316"} strokeWidth="1" strokeDasharray="2,2" />

          {/* Floor South Right (Lobby Tiles) */}
          <polygon points={`${project(120, 120).x},${project(120, 120).y} ${project(240, 120).x},${project(240, 120).y} ${project(240, 240).x},${project(240, 240).y} ${project(120, 240).x},${project(120, 240).y}`} fill={isDark ? "#1e293b" : "#f4f4f5"} />
          {Array.from({ length: 7 }).map((_, idx) => {
            const v = 120 + idx * 20;
            return (
              <g key={`tg-v-${idx}`} stroke={isDark ? "#0f172a" : "#cbd5e1"} strokeWidth="0.5" opacity="0.6">
                <line x1={project(v, 120).x} y1={project(v, 120).y} x2={project(v, 240).x} y2={project(v, 240).y} />
                <line x1={project(120, v).x} y1={project(120, v).y} x2={project(240, v).x} y2={project(240, v).y} />
              </g>
            );
          })}

          {/* Door Mat */}
          <polygon points={`${project(205, 235).x},${project(205, 235).y} ${project(235, 235).x},${project(235, 235).y} ${project(235, 240).x},${project(235, 240).y} ${project(205, 240).x},${project(205, 240).y}`} fill="#eab308" opacity="0.8" />

          {/* --- RENDERS --- */}
          {items.map((item) => item.render())}
        </g>
      </svg>
    </div>
  );
};
