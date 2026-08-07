'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Shield } from 'lucide-react';
import { KioskStep, GuestRecord } from '@/types/guest';
import { getAllGuests, createGuest } from '@/lib/guestService';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { RegistrationForm } from '@/components/RegistrationForm';
import { SignaturePad } from '@/components/SignaturePad';
import { LegacyTree } from '@/components/LegacyTree';
import { TreeAnimation } from '@/components/TreeAnimation';
import { ThankYouScreen } from '@/components/ThankYouScreen';
import { GuestModal } from '@/components/GuestModal';
import { soundSystem } from '@/lib/soundSystem';

export default function KioskPage() {
  const router = useRouter();
  const [step, setStep] = useState<KioskStep>('WELCOME');
  const [guests, setGuests] = useState<GuestRecord[]>([]);
  const [selectedGuestModal, setSelectedGuestModal] = useState<GuestRecord | null>(null);

  // Form State
  const [guestInput, setGuestInput] = useState<{
    guestId: string;
    name: string;
    designation: string;
    organization: string;
    eventName: string;
    eventDate: string;
  } | null>(null);

  // Transformation State
  const [pendingGuest, setPendingGuest] = useState<GuestRecord | null>(null);
  const [activeSignatureUrl, setActiveSignatureUrl] = useState<string>('');

  const loadGuests = useCallback(async () => {
    const list = await getAllGuests();
    setGuests(list);
  }, []);

  useEffect(() => {
    loadGuests();
  }, [loadGuests]);

  // Step 1 → Step 2
  const handleBeginLegacy = () => {
    setStep('REGISTRATION');
  };

  // Step 2 → Step 3
  const handleRegistrationSubmit = (data: {
    guestId: string;
    name: string;
    designation: string;
    organization: string;
    eventName: string;
    eventDate: string;
  }) => {
    setGuestInput(data);
    setStep('SIGNATURE');
  };

  // Step 3 → Step 4
  const handleSignatureComplete = async (base64Signature: string) => {
    if (!guestInput) return;

    setActiveSignatureUrl(base64Signature);

    const created = await createGuest({
      ...guestInput,
      base64Signature,
    });

    setPendingGuest(created);
    setStep('TRANSFORMATION');
  };

  // Step 4 → Step 5
  const handleTransformationComplete = async () => {
    if (pendingGuest) {
      setGuests((prev) => {
        const exists = prev.some((g) => g.guestId === pendingGuest.guestId);
        return exists ? prev : [...prev, pendingGuest];
      });
    }
    setStep('THANK_YOU');
  };

  // Step 5 → Reset
  const handleFinishJourney = () => {
    setGuestInput(null);
    setPendingGuest(null);
    setActiveSignatureUrl('');
    setStep('WELCOME');
    loadGuests();
  };

  // Latest Guest for Example Card
  const latestGuest = guests.length > 0 ? guests[guests.length - 1] : null;

  return (
    // Main Unified Container matching Reference Layout Design
    <div className="fixed inset-0 bg-[#07090E] flex flex-col justify-between overflow-hidden select-none">

      {/* ── 1. TOP HEADER BANNER ── */}
      <header className="w-full h-16 md:h-20 z-40 bg-[#090D15]/90 backdrop-blur-xl border-b border-amber-500/30 px-3 md:px-8 flex items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.8)] shrink-0">
        
        {/* Left Corner: NSCET College Logo */}
        <div className="flex items-center gap-3">
          <div className="bg-white p-1 md:p-1.5 rounded-xl border border-amber-400/50 shadow-[0_0_20px_rgba(255,255,255,0.4)] flex items-center justify-center">
            <img
              src="/nscet-logo.png"
              alt="NSCET Logo"
              className="h-9 md:h-12 w-auto object-contain"
            />
          </div>

          {/* Secret Admin Portal Button */}
          <button
            onClick={() => {
              soundSystem.playClick();
              router.push('/admin');
            }}
            type="button"
            className="p-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400/70 hover:text-amber-300 hover:bg-amber-500/20 transition-all cursor-pointer shadow-md"
            title="Open Admin Portal"
          >
            <Shield className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>

        {/* Center Title: NSCET INNOVATION TREE */}
        <div className="text-center flex flex-col items-center">
          <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-wider uppercase gold-gradient-text drop-shadow-[0_0_25px_rgba(212,175,55,0.5)]">
            NSCET INNOVATION TREE
          </h1>
          <span className="text-[10px] md:text-xs font-serif italic text-amber-200/90 tracking-widest block">
            Every Signature Grows Our Legacy of Innovation
          </span>
        </div>

        {/* Right Corner Spacer to balance Header Title */}
        <div className="w-20 md:w-24"></div>
      </header>

      {/* ── 2. MAIN 2-COLUMN DASHBOARD STAGE ── */}
      <div className="flex-1 w-full flex flex-col lg:flex-row items-center justify-between px-2 md:px-6 py-4 gap-6 overflow-hidden relative">
        
        {/* ── LEFT STAGE: THE 3D GOLDEN TREE ── */}
        <div className="w-full lg:w-[60%] h-[40vh] lg:h-full relative flex items-center justify-center z-10 p-1 md:p-4">
          <LegacyTree
            guests={guests}
            onSelectGuest={(g) => setSelectedGuestModal(g)}
            highlightGuestId={pendingGuest?.guestId}
          />
        </div>

        {/* ── RIGHT SIDEBAR (Interactive Form Kiosk) ── */}
        <div className="w-full lg:w-[40%] h-auto lg:h-full flex flex-col justify-center gap-6 z-20 overflow-y-auto max-h-[45vh] lg:max-h-full">
          
          {/* INTERACTIVE KIOSK WORKFLOW PANEL */}
          <div className="glass-panel rounded-2xl p-6 border border-amber-500/40 shadow-2xl w-full flex flex-col justify-center min-h-[350px]">
            {step === 'WELCOME' && (
              <WelcomeScreen
                onBegin={handleBeginLegacy}
                guestCount={guests.length}
              />
            )}

            {step === 'REGISTRATION' && (
              <RegistrationForm
                onSubmit={handleRegistrationSubmit}
                onBack={() => setStep('WELCOME')}
                existingGuestCount={guests.length}
              />
            )}

            {step === 'SIGNATURE' && (
              <SignaturePad
                onComplete={handleSignatureComplete}
                onBack={() => setStep('REGISTRATION')}
                guestName={guestInput?.name || ''}
              />
            )}

            {step === 'TRANSFORMATION' && pendingGuest && activeSignatureUrl && (
              <TreeAnimation
                signatureUrl={activeSignatureUrl}
                targetPosition={pendingGuest.leafPosition}
                guestName={pendingGuest.name}
                role={pendingGuest.designation}
                onAnimationComplete={handleTransformationComplete}
              />
            )}

            {step === 'THANK_YOU' && pendingGuest && (
              <ThankYouScreen
                guest={pendingGuest}
                onFinish={handleFinishJourney}
              />
            )}
          </div>

          {/* INSPIRATIONAL QUOTE */}
          <div className="glass-panel rounded-2xl p-4 border border-amber-500/25 italic text-sm text-amber-200/90 font-serif leading-relaxed text-center shadow-lg mx-auto w-[90%]">
            &ldquo;The best time to plant a tree was 20 years ago. The second best time is now.&rdquo;
          </div>
        </div>
      </div>

      {/* ── 3. BOTTOM FOOTER RIBBON ── */}
      <footer className="w-full h-8 md:h-10 z-40 bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 border-t border-amber-500/40 px-4 flex items-center justify-center text-center shadow-[0_-5px_20px_rgba(0,0,0,0.8)] shrink-0">
        <div className="flex items-center gap-2 text-xs md:text-sm font-serif italic text-amber-200 tracking-wide">
          <span>🌿</span>
          <span>&ldquo;Alone we can do so little; together we can do so much.&rdquo; – Helen Keller</span>
          <span>🌿</span>
        </div>
      </footer>

      {/* Guest Leaf Detail Modal */}
      {selectedGuestModal && (
        <GuestModal
          guest={selectedGuestModal}
          onClose={() => setSelectedGuestModal(null)}
        />
      )}
    </div>
  );
}
