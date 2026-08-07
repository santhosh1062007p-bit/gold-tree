'use client';

import React, { useState } from 'react';
import { User, GraduationCap, School, UserCheck, Calendar, FileText, ArrowRight, ArrowLeft } from 'lucide-react';
import { validateRegistrationForm, RegistrationFormErrors } from '@/lib/validation';
import { generateGuestId, getCurrentDateISO } from '@/lib/utils';
import { soundSystem } from '@/lib/soundSystem';

interface RegistrationFormProps {
  onSubmit: (formData: {
    guestId: string;
    name: string;
    designation: string;
    organization: string;
    eventName: string;
    eventDate: string;
  }) => void;
  onBack: () => void;
  existingGuestCount: number;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onSubmit,
  onBack,
  existingGuestCount,
}) => {
  const [guestId] = useState<string>(() => generateGuestId(existingGuestCount));
  const [eventDate] = useState<string>(() => getCurrentDateISO());
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState<'Student' | 'Faculty' | 'Guest' | ''>('');
  const [eventName, setEventName] = useState('EEE Association Function');
  const [errors, setErrors] = useState<RegistrationFormErrors>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundSystem.playClick();

    const validation = validateRegistrationForm({ name, designation, eventName });
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    onSubmit({
      guestId,
      name: name.trim(),
      designation,
      organization: `${designation} Legacy`,
      eventName: eventName.trim(),
      eventDate,
    });
  };

  return (
    <div className="w-full h-full flex flex-col select-none max-w-xl mx-auto">
        {/* Fixed Header */}
        <div className="flex items-center justify-between border-b border-amber-500/20 pb-4 mb-4 flex-shrink-0">
          <button
            onClick={() => { soundSystem.playClick(); onBack(); }}
            type="button"
            className="flex items-center gap-2 text-amber-300/80 hover:text-amber-200 text-sm font-medium transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <div className="text-right">
            <span className="text-xs uppercase tracking-widest text-amber-400/60 block">Reference ID</span>
            <span className="text-sm font-mono font-bold text-amber-300">{guestId}</span>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1" style={{ WebkitOverflowScrolling: 'touch' }}>
          <div className="mb-4">
            <h2 className="text-2xl font-bold gold-gradient-text">Legacy Registration</h2>
            <p className="text-xs text-amber-200/70 mt-1">
              Select your role and enter your details to etch your signature into the 3D Golden Tree.
            </p>
          </div>

          <form onSubmit={handleSubmit} id="registration-form" className="space-y-4">
            
            {/* 1. Full Name */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/90">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400/60" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name..."
                  autoComplete="off"
                  className={`w-full bg-[#0A0E17]/90 text-amber-100 placeholder-amber-400/30 pl-10 pr-4 py-3 rounded-xl border ${
                    errors.name ? 'border-red-500 focus:ring-red-500' : 'border-amber-500/30 focus:border-amber-400'
                  } text-base focus:outline-none focus:ring-2 focus:ring-amber-400/40 transition-all`}
                />
              </div>
              {errors.name && <p className="text-xs text-red-400 font-medium pl-1">{errors.name}</p>}
            </div>

            {/* 2. Designation (THREE OPTIONS: Student, Faculty, or Guest) */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/90">
                Designation (Role) *
              </label>
              <div className="grid grid-cols-3 gap-2 md:gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => { soundSystem.playClick('tab'); setDesignation('Student'); setErrors(prev => ({ ...prev, designation: undefined })); }}
                  className={`py-3 px-2 rounded-xl border text-xs md:text-sm font-bold flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 ${
                    designation === 'Student'
                      ? 'bg-amber-500/25 border-amber-400 text-amber-100 shadow-[0_0_20px_rgba(212,175,55,0.35)] scale-[1.03]'
                      : 'bg-[#0A0E17]/90 border-amber-500/20 text-amber-300/70 hover:border-amber-500/40 hover:text-amber-200'
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Student</span>
                </button>

                <button
                  type="button"
                  onClick={() => { soundSystem.playClick('tab'); setDesignation('Faculty'); setErrors(prev => ({ ...prev, designation: undefined })); }}
                  className={`py-3 px-2 rounded-xl border text-xs md:text-sm font-bold flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 ${
                    designation === 'Faculty'
                      ? 'bg-amber-500/25 border-amber-400 text-amber-100 shadow-[0_0_20px_rgba(212,175,55,0.35)] scale-[1.03]'
                      : 'bg-[#0A0E17]/90 border-amber-500/20 text-amber-300/70 hover:border-amber-500/40 hover:text-amber-200'
                  }`}
                >
                  <School className="w-4 h-4" />
                  <span>Faculty</span>
                </button>

                <button
                  type="button"
                  onClick={() => { soundSystem.playClick('tab'); setDesignation('Guest'); setErrors(prev => ({ ...prev, designation: undefined })); }}
                  className={`py-3 px-2 rounded-xl border text-xs md:text-sm font-bold flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 ${
                    designation === 'Guest'
                      ? 'bg-amber-500/25 border-amber-400 text-amber-100 shadow-[0_0_20px_rgba(212,175,55,0.35)] scale-[1.03]'
                      : 'bg-[#0A0E17]/90 border-amber-500/20 text-amber-300/70 hover:border-amber-500/40 hover:text-amber-200'
                  }`}
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Guest</span>
                </button>
              </div>
              {errors.designation && <p className="text-xs text-red-400 font-medium pl-1 pt-1">{errors.designation}</p>}
            </div>

            {/* 3. Event Name & 4. Date */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="space-y-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/90">
                  Event Name *
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400/60" />
                  <input
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    className={`w-full bg-[#0A0E17]/90 text-amber-100 placeholder-amber-400/30 pl-10 pr-3 py-3 rounded-xl border ${
                      errors.eventName ? 'border-red-500 focus:ring-red-500' : 'border-amber-500/30 focus:border-amber-400'
                    } text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/40 transition-all`}
                  />
                </div>
                {errors.eventName && <p className="text-xs text-red-400 font-medium pl-1">{errors.eventName}</p>}
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/90">
                  Date (Auto Generated)
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400/60" />
                  <input
                    type="text"
                    value={eventDate}
                    readOnly
                    className="w-full bg-[#0A0E17]/50 text-amber-300/70 cursor-not-allowed pl-10 pr-3 py-3 rounded-xl border border-amber-500/20 text-sm font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-3 pb-2">
              <button
                type="submit"
                className="gold-glow-btn w-full py-4 rounded-xl text-amber-100 font-bold text-base tracking-wider uppercase flex items-center justify-center gap-3 cursor-pointer shadow-[0_0_30px_rgba(212,175,55,0.3)]"
              >
                <span>PROCEED TO SIGNATURE</span>
                <ArrowRight className="w-5 h-5 text-amber-300" />
              </button>
            </div>
          </form>
        </div>
    </div>
  );
};
