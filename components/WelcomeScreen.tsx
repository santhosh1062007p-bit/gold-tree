'use client';

import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { soundSystem } from '@/lib/soundSystem';

interface WelcomeScreenProps {
  onBegin: () => void;
  guestCount: number;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onBegin, guestCount }) => {
  const handleStart = () => {
    soundSystem.playClick();
    onBegin();
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-between py-4 px-2 md:px-6 text-center select-none">
      {/* Top: Institutional Crest */}
      <div className="flex flex-col items-center gap-2 animate-fade-down">
        <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-b from-amber-400/20 to-amber-900/40 border border-amber-500/40 shadow-[0_0_30px_rgba(212,175,55,0.3)] flex items-center justify-center backdrop-blur-md">
          <svg className="w-7 h-7 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div className="absolute inset-0 rounded-full bg-amber-400/10 blur-xl animate-pulse" />
        </div>
        <span className="text-[10px] md:text-xs font-semibold tracking-[0.3em] uppercase text-amber-400/80">
          Institutional Heritage Digital Archive
        </span>
      </div>

      {/* Center: Main Hero Title */}
      <div className="max-w-xl space-y-3 py-4">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight gold-gradient-text drop-shadow-[0_10px_30px_rgba(212,175,55,0.3)] uppercase">
          NSCET INNOVATION<br />TREE
        </h1>
        <p className="text-base md:text-xl font-light text-amber-100/90 tracking-wide">
          Every Signature Becomes a Permanent Institutional Legacy.
        </p>
        {guestCount > 0 && (
          <div className="flex justify-center items-center gap-2 text-xs md:text-sm text-amber-400/70 pt-2">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
            <span>
              {`${guestCount} Distinguished ${guestCount === 1 ? 'Legacy' : 'Legacies'} Recorded`}
            </span>
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
          </div>
        )}
      </div>

      {/* Bottom: CTA Button */}
      <div className="w-full max-w-sm">
        <button
          onClick={handleStart}
          type="button"
          className="gold-glow-btn group relative w-full py-4 md:py-5 rounded-full text-amber-100 font-bold text-base md:text-lg tracking-wider uppercase flex items-center justify-center gap-3 cursor-pointer shadow-[0_0_40px_rgba(212,175,55,0.4)]"
        >
          <span>BEGIN YOUR LEGACY</span>
          <ArrowRight className="w-5 h-5 text-amber-300 group-hover:translate-x-2 transition-transform duration-300" />
        </button>
        <p className="mt-2 text-xs text-amber-300/40 tracking-wider">
          Touch screen to initiate registration
        </p>
      </div>
    </div>
  );
};
