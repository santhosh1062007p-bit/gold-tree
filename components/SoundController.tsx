'use client';

import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundSystem } from '@/lib/soundSystem';

export const SoundController: React.FC = () => {
  const [isMuted, setIsMuted] = useState(soundSystem.getMuted());

  const toggleSound = () => {
    const nextMuted = !isMuted;
    soundSystem.setMuted(nextMuted);
    setIsMuted(nextMuted);
    if (!nextMuted) {
      soundSystem.playClick();
    }
  };

  return (
    <button
      onClick={toggleSound}
      type="button"
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-[#121624]/80 backdrop-blur-md border border-amber-500/30 text-amber-300 hover:text-amber-100 hover:bg-[#1a2035] transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)] focus:outline-none cursor-pointer"
      title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
    >
      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
    </button>
  );
};
