'use client';

import React from 'react';
import { X, Calendar, Building2, Briefcase, Award } from 'lucide-react';
import { GuestRecord } from '@/types/guest';
import { formatDate } from '@/lib/utils';
import { soundSystem } from '@/lib/soundSystem';

interface GuestModalProps {
  guest: GuestRecord | null;
  onClose: () => void;
}

export const GuestModal: React.FC<GuestModalProps> = ({ guest, onClose }) => {
  if (!guest) return null;

  const handleClose = () => {
    soundSystem.playClick();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg glass-panel rounded-3xl p-6 md:p-8 space-y-6 border border-amber-500/40 shadow-[0_0_50px_rgba(212,175,55,0.3)]">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          type="button"
          className="absolute top-5 right-5 p-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:text-amber-100 hover:bg-amber-500/20 transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge */}
        <div className="flex items-center gap-2 text-amber-400">
          <Award className="w-5 h-5 text-amber-400" />
          <span className="text-xs uppercase tracking-widest font-semibold">Institutional Digital Legacy Record</span>
        </div>

        {/* Guest Details */}
        <div className="space-y-4">
          <div>
            <span className="text-xs font-mono text-amber-400/60 block uppercase">Reference ID: {guest.guestId}</span>
            <h3 className="text-2xl md:text-3xl font-extrabold gold-gradient-text mt-1">{guest.name}</h3>
          </div>

          <div className="space-y-3 pt-2 text-sm text-amber-100/90">
            <div className="flex items-center gap-3">
              <Briefcase className="w-4 h-4 text-amber-400/70 shrink-0" />
              <span>{guest.designation}</span>
            </div>

            <div className="flex items-center gap-3">
              <Building2 className="w-4 h-4 text-amber-400/70 shrink-0" />
              <span>{guest.organization}</span>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-amber-400/70 shrink-0" />
              <span>{guest.eventName} • {formatDate(guest.eventDate)}</span>
            </div>
          </div>
        </div>

        {/* Captured Digital Signature Preview */}
        {guest.signatureUrl && (
          <div className="space-y-2 pt-2 border-t border-amber-500/20">
            <span className="text-xs uppercase tracking-wider text-amber-300/70 font-semibold block">
              Digital Signature Signature
            </span>
            <div className="w-full h-32 bg-[#05070C] rounded-xl border border-amber-500/30 flex items-center justify-center p-3">
              <img
                src={guest.signatureUrl}
                alt={`${guest.name} Signature`}
                className="max-h-full max-w-full object-contain filter drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
