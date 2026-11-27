const Logo = ({ size = "md", className = "" }) => {
  // Dimension presets
  const sizeMap = {
    md: { icon: "w-9 h-9", text: "text-2xl sm:text-3xl", badge: "text-[10px] px-2 py-0.5" },
    lg: { icon: "w-12 h-12", text: "text-3xl sm:text-4xl", badge: "text-xs px-2.5 py-0.5" },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Flixora Glowing Vector Emblem */}
      <div className={`relative ${currentSize.icon} shrink-0 drop-shadow-[0_0_16px_rgba(229,9,20,0.55)] transition-transform duration-300 group-hover:scale-105`}>
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="flixora-grad-comp" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E50914" />
              <stop offset="50%" stopColor="#FF2A6D" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
            <linearGradient id="flixora-accent-comp" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF5252" />
              <stop offset="100%" stopColor="#FFB300" />
            </linearGradient>
          </defs>

          {/* Emblem Background Glass Badge */}
          <rect
            width="48"
            height="48"
            rx="14"
            fill="#0F0F16"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1.5"
          />

          {/* Glowing Ambient Core */}
          <circle cx="24" cy="24" r="14" fill="url(#flixora-grad-comp)" opacity="0.3" />

          {/* Geometric "F" Spine */}
          <rect x="14" y="11" width="6" height="26" rx="2" fill="url(#flixora-grad-comp)" />

          {/* Top Aerodynamic Wing */}
          <path
            d="M18 11H34C35.1 11 36 11.9 36 13V15.5C36 16.6 35.1 17.5 34 17.5H18V11Z"
            fill="url(#flixora-grad-comp)"
          />

          {/* Mid Play Bar */}
          <path
            d="M18 22H28C28.8 22 29.5 22.7 29.5 23.5V25.5C29.5 26.3 28.8 27 28 27H18V22Z"
            fill="url(#flixora-accent-comp)"
          />

          {/* Forward Cinema Spark / Chevron */}
          <polygon points="31.5,24.5 36.5,21.5 36.5,27.5" fill="#FF2A6D" />
        </svg>
      </div>

      {/* Flixora Wordmark + AI Badge */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className={`font-display font-black tracking-tighter text-white drop-shadow-md ${currentSize.text}`}>
            FLIX<span className="bg-gradient-to-r from-brand via-rose-500 to-purple-500 bg-clip-text text-transparent">ORA</span>
          </span>

          <span className={`font-extrabold uppercase tracking-widest bg-purple-950/80 text-purple-300 border border-purple-500/40 rounded-md shadow-glow-purple ${currentSize.badge}`}>
            AI
          </span>
        </div>

      </div>
    </div>
  );
};

export default Logo;
