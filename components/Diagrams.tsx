import React from 'react';

export const ExitRampDiagram = () => (
  <div className="w-full max-w-md mx-auto bg-gray-100 rounded-lg border border-gray-300 p-4 overflow-hidden">
    <svg viewBox="0 0 300 200" className="w-full h-full">
      <defs>
        <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L9,3 z" fill="#333" />
        </marker>
      </defs>
      {/* Background/Grass */}
      <rect x="0" y="0" width="300" height="200" fill="#e5e7eb" />
      
      {/* Main Road */}
      <path d="M 0 160 L 300 160" stroke="#6b7280" strokeWidth="40" fill="none" />
      <path d="M 0 160 L 300 160" stroke="#9ca3af" strokeWidth="38" fill="none" />
      <line x1="0" y1="160" x2="300" y2="160" stroke="white" strokeWidth="2" strokeDasharray="10,10" />

      {/* Exit Ramp Curve */}
      <path d="M 200 140 Q 250 140 250 40" stroke="#6b7280" strokeWidth="30" fill="none" />
      <path d="M 200 140 Q 250 140 250 40" stroke="#9ca3af" strokeWidth="28" fill="none" />

      {/* Labels */}
      <rect x="180" y="10" width="80" height="25" fill="white" stroke="black" rx="2" />
      <text x="220" y="27" textAnchor="middle" fontSize="12" fontWeight="bold" fill="black">EXIT 25 MPH</text>
      
      {/* Cars */}
      <rect x="50" y="150" width="30" height="15" fill="blue" rx="2" />
      <text x="50" y="145" fontSize="10" fill="black">Car 2</text>
      
      <g transform="translate(235, 100) rotate(-70)">
        <rect x="0" y="0" width="30" height="15" fill="red" rx="2" />
      </g>
      <text x="260" y="90" fontSize="10" fill="black">Car 1</text>
    </svg>
    <p className="text-center text-xs text-gray-500 mt-2">Diagram: Exit Ramp</p>
  </div>
);

export const RoadLinesDiagram = () => (
  <div className="w-full max-w-md mx-auto bg-gray-700 rounded-lg border border-gray-600 p-8 overflow-hidden">
    <svg viewBox="0 0 300 100" className="w-full h-full">
      {/* Road Surface */}
      <rect x="0" y="0" width="300" height="100" fill="#4b5563" />
      
      {/* Lines */}
      <g transform="translate(0, 45)">
        {/* Solid Yellow Line */}
        <line x1="0" y1="0" x2="300" y2="0" stroke="#fbbf24" strokeWidth="4" />
        
        {/* Broken Yellow Line */}
        <line x1="0" y1="10" x2="300" y2="10" stroke="#fbbf24" strokeWidth="4" strokeDasharray="20,20" />
      </g>
    </svg>
    <p className="text-center text-xs text-gray-300 mt-2">Diagram: Road Markings</p>
  </div>
);

export const DiagramRenderer: React.FC<{ type?: string }> = ({ type }) => {
  if (type === 'exit_ramp') return <ExitRampDiagram />;
  if (type === 'road_lines') return <RoadLinesDiagram />;
  return null;
};
