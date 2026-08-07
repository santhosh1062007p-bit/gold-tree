'use client';

import React from 'react';

export interface GoldenLeafProps {
  size?: number;
  glow?: boolean;
  opacity?: number;
  className?: string;
  onClick?: () => void;
  guestName?: string;
  variant?: 'gold' | 'green'; // 'green' for Student, 'gold' for Faculty & Guest
  phase?: 'outline' | 'veins' | 'surface' | 'sheen' | 'complete';
  sheenPosition?: number;
}

export const GoldenLeaf: React.FC<GoldenLeafProps> = ({
  size = 48,
  glow = true,
  opacity = 1,
  className = '',
  onClick,
  guestName,
  variant = 'gold',
}) => {
  const isGreen = variant === 'green';
  const imageSrc = isGreen ? '/green-leaf.png' : '/gold-leaf.png';

  return (
    <div
      onClick={onClick}
      className={`relative group inline-block cursor-pointer transition-all duration-300 hover:scale-125 ${className}`}
      style={{ opacity, width: size, height: size }}
      title={guestName ? `${isGreen ? 'Student' : 'Legacy'} Leaf: ${guestName}` : 'Legacy Leaf'}
    >
      {/* Ambient Pulsing Glow Aura */}
      {glow && (
        <div
          className={`absolute inset-0 rounded-full blur-md animate-pulse pointer-events-none ${
            isGreen ? 'bg-emerald-400/40' : 'bg-amber-400/40'
          }`}
        />
      )}

      {/* Realistic 3D Leaf Image provided by User */}
      <img
        src={imageSrc}
        alt={isGreen ? 'Green Leaf' : 'Gold Leaf'}
        style={{ width: `${size}px`, height: `${size}px` }}
        className={`object-contain relative z-10 select-none pointer-events-none transition-transform duration-300 ${
          isGreen
            ? 'filter drop-shadow-[0_2px_8px_rgba(16,185,129,0.8)]'
            : 'filter drop-shadow-[0_2px_8px_rgba(212,175,55,0.8)]'
        }`}
      />

      {/* Guest Name Hover Badge */}
      {guestName && (
        <div
          className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-30 pointer-events-none whitespace-nowrap px-3 py-1.5 rounded-full text-xs shadow-lg backdrop-blur-md border ${
            isGreen
              ? 'bg-[#062419]/90 border-emerald-400/60 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
              : 'bg-[#0F1420]/90 border-amber-400/60 text-amber-200 shadow-[0_0_15px_rgba(212,175,55,0.4)]'
          }`}
        >
          {guestName}
        </div>
      )}
    </div>
  );
};
