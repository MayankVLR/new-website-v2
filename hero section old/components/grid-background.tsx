export function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Deep green background */}
      <div 
        className="absolute inset-0"
        style={{ backgroundColor: "#1f5f5b" }}
      />
      
      {/* Grid pattern overlay */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            {/* Vertical line */}
            <line
              x1="40"
              y1="0"
              x2="40"
              y2="40"
              stroke="white"
              strokeWidth="0.5"
              opacity="0.15"
            />
            {/* Horizontal line */}
            <line
              x1="0"
              y1="40"
              x2="40"
              y2="40"
              stroke="white"
              strokeWidth="0.5"
              opacity="0.15"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  )
}
