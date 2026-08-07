'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { LeafPosition } from '@/types/guest';
import { GoldenLeaf } from './GoldenLeaf';
import { soundSystem } from '@/lib/soundSystem';

interface TreeAnimationProps {
  signatureUrl: string;
  targetPosition: LeafPosition;
  guestName: string;
  role?: string;
  onAnimationComplete: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  angle: number;
  speed: number;
  color: string;
}

export const TreeAnimation: React.FC<TreeAnimationProps> = ({
  signatureUrl,
  targetPosition,
  guestName,
  role,
  onAnimationComplete,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const signatureRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const leafContainerRef = useRef<HTMLDivElement | null>(null);

  // Animation Phase State (Prompts 3-14)
  const [phaseText, setPhaseText] = useState('Preserving Digital Signature...');
  const [leafPhase, setLeafPhase] = useState<'outline' | 'veins' | 'surface' | 'sheen' | 'complete'>('outline');
  const [sheenPos, setSheenPos] = useState(0);
  const [treeIlluminated, setTreeIlluminated] = useState(false);
  const [activeBranchPulse, setActiveBranchPulse] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const signature = signatureRef.current;
    const canvas = canvasRef.current;
    const leafContainer = leafContainerRef.current;
    if (!container || !signature || !canvas || !leafContainer) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animationFrameId: number;

    const centerX = width / 2;
    const centerY = height / 2;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // ── Particle Pool Setup (Prompts 4, 5, 11, 12) ──
    const particles: Particle[] = [];
    const particleCount = 240;

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * 300 + 40;
      particles.push({
        x: centerX + Math.cos(angle) * dist,
        y: centerY + Math.sin(angle) * dist,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: Math.random() * 2.8 + 0.8,
        alpha: Math.random() * 0.8 + 0.2,
        angle,
        speed: Math.random() * 0.05 + 0.02,
        color: Math.random() > 0.3 ? '#FFD700' : '#FFF2B2',
      });
    }

    let isVortexActive = false;
    let isTrailActive = false;
    let trailX = centerX;
    let trailY = centerY;

    const renderCanvas = () => {
      ctx.clearRect(0, 0, width, height);

      // Prompt 5: Golden Energy Vortex Spiral
      if (isVortexActive) {
        particles.forEach((p) => {
          p.angle += p.speed;
          const currentDist = Math.hypot(p.x - centerX, p.y - centerY);
          const nextDist = Math.max(0, currentDist - 3.0);

          p.x = centerX + Math.cos(p.angle) * nextDist;
          p.y = centerY + Math.sin(p.angle) * nextDist;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 215, 0, ${p.alpha})`;
          ctx.shadowBlur = 12;
          ctx.shadowColor = '#FFD700';
          ctx.fill();
        });
      }

      // Prompt 7: Flight Particle Trail
      if (isTrailActive) {
        for (let i = 0; i < 4; i++) {
          ctx.beginPath();
          const pX = trailX + (Math.random() - 0.5) * 30;
          const pY = trailY + (Math.random() - 0.5) * 30;
          ctx.arc(pX, pY, Math.random() * 2 + 1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 234, 167, ${Math.random() * 0.6 + 0.2})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#FFD700';
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(renderCanvas);
    };

    renderCanvas();

    // ── MASTER GSAP TIMELINE (PROMPTS 3-14) ──
    const mainTl = gsap.timeline({
      onComplete: () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', handleResize);
        onAnimationComplete();
      },
    });

    // Initial state setup
    gsap.set(signature, { opacity: 0, scale: 0.9 });
    gsap.set(leafContainer, { opacity: 0, scale: 0, x: 0, y: 0, rotation: -90 });

    // ── PROMPT 3: Handwritten Signature Golden Glow ──
    mainTl.to(signature, {
      duration: 1.0,
      opacity: 1,
      scale: 1,
      ease: 'power2.out',
      onStart: () => setPhaseText('Preserving Chief Guest Digital Signature...'),
    });

    mainTl.to(signature, {
      duration: 1.2,
      filter: 'drop-shadow(0 0 25px #FFD700) drop-shadow(0 0 50px #D4AF37)',
      scale: 1.06,
      onStart: () => {
        setPhaseText('Transforming Signature into Golden Energy...');
        soundSystem.playVortex();
        isVortexActive = true;
      },
    });

    // ── PROMPT 4: Signature Disintegration into Particles ──
    mainTl.to(signature, {
      duration: 1.0,
      opacity: 0,
      scale: 1.35,
      filter: 'blur(20px) drop-shadow(0 0 40px #FFD700)',
      ease: 'power2.in',
    });

    // ── PROMPT 6: 8-Phase Golden Leaf Formation ──
    // Phase 1 & 2: Leaf Silhouette Outline
    mainTl.to(leafContainer, {
      duration: 0.8,
      opacity: 0.6,
      scale: 1.2,
      rotation: 0,
      ease: 'power2.out',
      onStart: () => {
        setPhaseText('Phase 1: Gathering Golden Energy Silhouette...');
        soundSystem.playLeafFormation(role === 'Student');
        setLeafPhase('outline');
      },
    });

    // Phase 3 & 4: Central & Secondary Veins
    mainTl.to(leafContainer, {
      duration: 0.7,
      opacity: 0.85,
      scale: 1.4,
      onStart: () => {
        setPhaseText('Phase 2: Growing Luminous Golden Veins...');
        setLeafPhase('veins');
      },
    });

    // Phase 5 & 6: Metallic Surface Fill
    mainTl.to(leafContainer, {
      duration: 0.8,
      opacity: 1,
      scale: 1.7,
      ease: 'back.out(1.5)',
      onStart: () => {
        setPhaseText('Phase 3: Forging 3D Metallic Gold Surface...');
        setLeafPhase('surface');
      },
    });

    // Phase 7: Reflective Sheen Sweep Highlight
    mainTl.to(
      {},
      {
        duration: 0.8,
        onStart: () => {
          setPhaseText('Phase 4: Polishing Reflective Surface Highlight...');
          setLeafPhase('sheen');
        },
        onUpdate: function () {
          setSheenPos(Math.round(this.progress() * 100));
        },
      }
    );

    // Phase 8: Completed Leaf Floating
    mainTl.to(leafContainer, {
      duration: 0.6,
      scale: 1.8,
      onStart: () => {
        setPhaseText('Phase 5: Golden Heritage Leaf Fully Formed!');
        soundSystem.playLegacyCreated();
        setLeafPhase('complete');
      },
    });

    // ── PROMPT 7: Curved Bezier Flight to Branch Anchor ──
    const targetPixelX = (targetPosition.x / 100) * width;
    const targetPixelY = (targetPosition.y / 100) * height;
    const deltaX = targetPixelX - centerX;
    const deltaY = targetPixelY - centerY;

    mainTl.to(leafContainer, {
      duration: 1.8,
      x: deltaX,
      y: deltaY,
      scale: targetPosition.scale || 1,
      rotation: targetPosition.rotation || 0,
      ease: 'power3.inOut',
      onStart: () => {
        setPhaseText('Navigating Golden Leaf to Tree Branch...');
        isTrailActive = true;
      },
      onUpdate: function () {
        const prog = this.progress();
        trailX = centerX + deltaX * prog;
        trailY = centerY + deltaY * prog;
      },
    });

    // ── PROMPT 8 & 9: Leaf Attachment & Branch Energy Pulse ──
    mainTl.to(leafContainer, {
      duration: 0.4,
      scale: (targetPosition.scale || 1) * 1.5,
      filter: 'drop-shadow(0 0 40px #FFFFFF)',
      onStart: () => {
        setPhaseText('Attaching Leaf to Institutional Legacy Tree...');
        soundSystem.playLeafAttachment();
        isTrailActive = false;
        setActiveBranchPulse('branch-left-01');
      },
    });

    // ── PROMPT 10 & 13: Whole Tree Illumination Wave & Celebration Fanfare ──
    mainTl.to(leafContainer, {
      duration: 0.5,
      scale: targetPosition.scale || 1,
      filter: 'drop-shadow(0 0 15px #FFD700)',
      onStart: () => {
        setPhaseText('Legacy Inscribed! Institutional Tree Illuminated.');
        setTreeIlluminated(true);
        soundSystem.playSuccessFanfare();
      },
    });

    // Hold final celebration state briefly before completing
    mainTl.to({}, { duration: 1.2 });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      mainTl.kill();
    };
  }, [signatureUrl, targetPosition, role, onAnimationComplete]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-40 backdrop-blur-xl flex flex-col items-center justify-center select-none overflow-hidden transition-colors duration-1000 ${
        treeIlluminated ? 'bg-[#07090E]/80' : 'bg-[#07090E]/95'
      }`}
    >
      {/* Prompt 13: Radial Golden Celebration Glow */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
          treeIlluminated ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-400/20 rounded-full blur-[140px]" />
      </div>

      {/* Canvas for Particle Vortex & Trails (Prompts 4, 5, 7, 11) */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Step 1: Signature Display (Prompt 3 & 4) */}
      <div
        ref={signatureRef}
        className="relative z-10 max-w-md max-h-64 p-6 bg-[#05070C]/80 rounded-3xl border border-amber-500/40 shadow-[0_0_50px_rgba(212,175,55,0.4)]"
      >
        <img
          src={signatureUrl}
          alt="Chief Guest Signature"
          className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(255,215,0,0.9)]"
        />
      </div>

      {/* Step 2 & 3: 8-Phase Golden Leaf Formation & Flight Container (Prompts 6, 7, 8) */}
      <div
        ref={leafContainerRef}
        className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <GoldenLeaf
          size={72}
          glow={true}
          variant={role === 'Student' ? 'green' : 'gold'}
          guestName={guestName}
          phase={leafPhase}
          sheenPosition={sheenPos}
        />
      </div>

      {/* Phase Progress Badge (Prompt 14 Master Orchestration) */}
      <div className="absolute bottom-10 z-30 px-8 py-3.5 rounded-full bg-[#0F1420]/90 border border-amber-500/40 text-amber-300 text-sm md:text-base font-semibold tracking-wider uppercase shadow-[0_0_30px_rgba(212,175,55,0.35)] animate-pulse">
        {phaseText}
      </div>
    </div>
  );
};
