'use client';

import React, { useEffect } from 'react';
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { GuestRecord } from '@/types/guest';
import { formatDate } from '@/lib/utils';
import { soundSystem } from '@/lib/soundSystem';

interface ThankYouScreenProps {
  guest: GuestRecord;
  onFinish: () => void;
}

export const ThankYouScreen: React.FC<ThankYouScreenProps> = ({ guest, onFinish }) => {
  useEffect(() => {
    soundSystem.playSuccessFanfare();

    // Auto return to tree after 8 seconds
    const timer = setTimeout(() => {
      onFinish();
    }, 8500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  const handleReturnNow = () => {
    soundSystem.playClick();
    onFinish();
  };

  return (
    <div className="relative z-30 w-full min-h-screen flex items-center justify-center p-6 text-center select-none animate-fade-in">
      <div className="w-full max-w-2xl glass-panel rounded-3xl p-8 md:p-12 space-y-6 shadow-[0_0_80px_rgba(212,175,55,0.4)] border border-amber-400/50">
        
        {/* Animated Success Badge */}
        <div className="flex justify-center">
          <div className="relative p-4 rounded-full bg-amber-400/10 border border-amber-400/40 text-amber-300 shadow-[0_0_30px_rgba(255,215,0,0.5)] animate-bounce">
            <CheckCircle2 className="w-12 h-12 md:w-16 md:h-16 text-amber-300" />
            <div className="absolute inset-0 rounded-full bg-amber-300/20 blur-xl animate-pulse" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <span className="text-xs md:text-sm tracking-[0.3em] text-amber-300/90 uppercase font-semibold block">
            Ceremonial Legacy Inscribed
          </span>
          <h1 className="text-3xl md:text-5xl font-black gold-gradient-text tracking-tight">
            YOUR LEGACY HAS BEEN CREATED
          </h1>
        </div>

        {/* Guest Summary Card */}
        <div className="bg-[#05070C]/80 rounded-2xl p-6 border border-amber-500/25 space-y-3 shadow-inner text-left">
          <div className="border-b border-amber-500/20 pb-3">
            <span className="text-xs font-mono text-amber-400/60 block">Reference ID: {guest.guestId}</span>
            <h2 className="text-2xl md:text-3xl font-bold text-amber-100 mt-1">{guest.name}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-amber-200/80 pt-1">
            <div>
              <span className="text-xs uppercase tracking-wider text-amber-400/60 block">Designation</span>
              <p className="font-medium text-amber-100">{guest.designation}</p>
            </div>

            <div>
              <span className="text-xs uppercase tracking-wider text-amber-400/60 block">Organization</span>
              <p className="font-medium text-amber-100">{guest.organization}</p>
            </div>

            <div className="md:col-span-2">
              <span className="text-xs uppercase tracking-wider text-amber-400/60 block">Event & Date</span>
              <p className="font-medium text-amber-100">{guest.eventName} • {formatDate(guest.eventDate)}</p>
            </div>
          </div>
        </div>

        {/* Final Message */}
        <div className="space-y-2">
          <p className="text-lg md:text-xl font-light text-amber-200/90 italic">
            &ldquo;Thank you for becoming a permanent part of our legacy.&rdquo;
          </p>
          <p className="text-xs text-amber-400/50">Your leaf is now permanently stored in the institutional tree.</p>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={handleReturnNow}
            type="button"
            className="gold-glow-btn px-8 py-4 rounded-full text-amber-100 font-bold text-base tracking-wider uppercase inline-flex items-center gap-3 cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.3)]"
          >
            <span>VIEW LIVING LEGACY TREE</span>
            <ArrowRight className="w-5 h-5 text-amber-300" />
          </button>
        </div>
      </div>
    </div>
  );
};
