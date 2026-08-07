'use client';

import React from 'react';
import { GuestRecord } from '@/types/guest';
import { GoldenLeaf } from './GoldenLeaf';
import { soundSystem } from '@/lib/soundSystem';

interface LegacyTreeProps {
  guests: GuestRecord[];
  onSelectGuest?: (guest: GuestRecord) => void;
  highlightGuestId?: string | null;
  className?: string;
  isIlluminated?: boolean;
  activeBranchPulse?: string | null;
}

export const LegacyTree: React.FC<LegacyTreeProps> = ({
  guests,
  onSelectGuest,
  highlightGuestId,
  className = '',
  isIlluminated = false,
}) => {
  return (
    <div className={`relative w-full h-full flex items-center justify-center overflow-hidden select-none ${className}`}>
      
      {/* Dynamic Golden Ambient Aura Behind Tree */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-[85%] h-[85%] max-w-[550px] max-h-[550px] rounded-full bg-gradient-to-r from-amber-500/15 via-yellow-500/25 to-amber-600/15 blur-[90px] tree-glow-aura" />
      </div>

      {/* Container for 3D Tree Display */}
      <div className="relative z-10 w-full h-full max-h-full flex items-center justify-center p-2">
        
        {/* 3D Tree Image with Dynamic Breathing & Sway Animation */}
        <img
          src="/golden-tree.png"
          alt="3D Warm Brownish Metallic Tree"
          className={`w-full h-full object-contain filter transition-all duration-700 select-none pointer-events-none brightness-[0.85] sepia-[0.4] hue-rotate-[-16deg] contrast-[1.12] tree-active-sway ${
            isIlluminated
              ? 'drop-shadow-[0_0_60px_rgba(212,175,55,0.95)] scale-[1.03] brightness-[0.98]'
              : 'drop-shadow-[0_15px_45px_rgba(0,0,0,0.85)]'
          }`}
        />

        {/* Dynamic Golden & Green Leaves Rendered at Anchor Coordinates */}
        <div className="absolute inset-0 pointer-events-none">
          {guests.map((guest, index) => {
            const pos = guest.leafPosition;
            if (!pos) return null;

            const isHighlighted = highlightGuestId === guest.guestId;
            const leafSize = Math.round(50 * (pos.scale || 1));

            return (
              <div
                key={guest.guestId}
                className="absolute pointer-events-auto transition-transform duration-500 ease-out leaf-active-float"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: `translate(-50%, -50%) rotate(${pos.rotation}deg) scale(${
                    isIlluminated ? 1.25 : isHighlighted ? 1.4 : 1
                  })`,
                  animationDelay: `${(index % 5) * 0.6}s`,
                  zIndex: isHighlighted ? 40 : 20,
                }}
              >
                <GoldenLeaf
                  size={leafSize}
                  glow={true}
                  variant={guest.designation === 'Student' ? 'green' : 'gold'}
                  guestName={guest.name}
                  onClick={() => {
                    soundSystem.playClick('tab');
                    if (onSelectGuest) onSelectGuest(guest);
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Tree Base Inspirational Plaque (Matching Reference Design) */}
        <div className="absolute bottom-1 md:bottom-2 left-1/2 -translate-x-1/2 z-30 px-5 md:px-7 py-2 rounded-xl bg-gradient-to-b from-[#3a2712] via-[#241709] to-[#170e05] border-2 border-amber-500/60 shadow-[0_10px_30px_rgba(0,0,0,0.95)] text-center pointer-events-none">
          <div className="text-[9px] md:text-xs font-extrabold text-amber-200 uppercase tracking-widest leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            TO INSPIRE INNOVATORS<br />
            <span className="text-amber-400 font-black">TO CREATE IMPACT</span><br />
            TO BUILD A BETTER FUTURE
          </div>
        </div>
      </div>
    </div>
  );
};

