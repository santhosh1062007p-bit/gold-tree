'use client';

import React from 'react';

interface GoldenTreeSVGProps {
  isIlluminated?: boolean;
  activeBranchPulse?: string | null;
  className?: string;
}

export const GoldenTreeSVG: React.FC<GoldenTreeSVGProps> = ({
  isIlluminated = false,
  activeBranchPulse = null,
  className = '',
}) => {
  return (
    <svg
      viewBox="0 0 1000 700"
      preserveAspectRatio="xMidYMid meet"
      className={`w-full h-full select-none pointer-events-none filter transition-all duration-700 ${
        isIlluminated
          ? 'drop-shadow-[0_0_50px_rgba(255,215,0,0.9)] scale-[1.01]'
          : 'drop-shadow-[0_12px_35px_rgba(0,0,0,0.85)]'
      } ${className}`}
    >
      <defs>
        {/* 3D Gold Metallic Gradient for Trunk */}
        <linearGradient id="goldTrunkGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1c1404" />
          <stop offset="20%" stopColor="#4a360a" />
          <stop offset="40%" stopColor="#aa771c" />
          <stop offset="60%" stopColor="#ffd700" />
          <stop offset="75%" stopColor="#d4af37" />
          <stop offset="90%" stopColor="#8b6508" />
          <stop offset="100%" stopColor="#2c1e05" />
        </linearGradient>

        {/* 3D Gold Gradient for Primary Branches */}
        <linearGradient id="goldBranchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3d2b09" />
          <stop offset="30%" stopColor="#b8860b" />
          <stop offset="60%" stopColor="#ffd700" />
          <stop offset="85%" stopColor="#fff0b2" />
          <stop offset="100%" stopColor="#996515" />
        </linearGradient>

        {/* Highlight Shimmer for Tops of Branches */}
        <linearGradient id="goldHighlightGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
          <stop offset="50%" stopColor="rgba(255,245,178,0.9)" />
          <stop offset="100%" stopColor="rgba(255,215,0,0.2)" />
        </linearGradient>

        {/* Radial Ambient Glow Filter */}
        <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Strong Golden Light Glow */}
        <filter id="superGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="15" result="blur1" />
          <feGaussianBlur stdDeviation="5" result="blur2" />
          <feMerge>
            <feMergeNode in="blur1" />
            <feMergeNode in="blur2" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background Radial Atmosphere behind Tree Canopy */}
      <circle
        cx="500"
        cy="320"
        r="320"
        fill="url(#goldHighlightGrad)"
        opacity={isIlluminated ? "0.2" : "0.08"}
        className="transition-opacity duration-1000"
      />

      {/* ── ROOT BASE FLARES ── */}
      <g filter="url(#goldGlow)">
        {/* Left Roots */}
        <path
          d="M 500 640 Q 450 630 380 660 Q 440 620 480 590 Z"
          fill="url(#goldTrunkGrad)"
        />
        <path
          d="M 480 600 Q 420 620 330 670 Q 400 630 460 570 Z"
          fill="url(#goldTrunkGrad)"
          opacity="0.8"
        />

        {/* Right Roots */}
        <path
          d="M 500 640 Q 550 630 620 660 Q 560 620 520 590 Z"
          fill="url(#goldTrunkGrad)"
        />
        <path
          d="M 520 600 Q 580 620 670 670 Q 600 630 540 570 Z"
          fill="url(#goldTrunkGrad)"
          opacity="0.8"
        />

        {/* Central Roots Base */}
        <ellipse cx="500" cy="635" rx="70" ry="18" fill="url(#goldTrunkGrad)" />
      </g>

      {/* ── MAIN TRUNK ── */}
      <g>
        {/* Main Trunk Body */}
        <path
          d="M 445 640 C 455 540, 460 480, 465 430 C 470 380, 475 330, 480 290 L 520 290 C 525 330, 530 380, 535 430 C 540 480, 545 540, 555 640 Z"
          fill="url(#goldTrunkGrad)"
          filter="url(#goldGlow)"
        />

        {/* Trunk Texture & Metallic Ridges */}
        <path
          d="M 470 630 Q 480 520 485 430 Q 490 360 492 300"
          stroke="#ffe279"
          strokeWidth="3.5"
          fill="none"
          opacity="0.6"
          strokeLinecap="round"
        />
        <path
          d="M 530 630 Q 520 520 515 430 Q 510 360 508 300"
          stroke="#4a360a"
          strokeWidth="4"
          fill="none"
          opacity="0.7"
          strokeLinecap="round"
        />
        <path
          d="M 500 620 Q 500 500 500 310"
          stroke="#ffd700"
          strokeWidth="2"
          fill="none"
          opacity="0.8"
        />
      </g>

      {/* ── PRIMARY & SECONDARY BRANCH NETWORK ── */}
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        
        {/* === LEFT LOWER BRANCH CLUSTER === */}
        <path
          d="M 470 450 C 400 440, 310 470, 240 490"
          stroke="url(#goldBranchGrad)"
          strokeWidth="18"
          filter="url(#goldGlow)"
        />
        <path
          d="M 280 475 C 220 460, 180 440, 140 410"
          stroke="url(#goldBranchGrad)"
          strokeWidth="11"
        />
        <path
          d="M 240 490 C 200 510, 160 520, 130 520"
          stroke="url(#goldBranchGrad)"
          strokeWidth="8"
        />
        <path
          d="M 180 440 C 150 420, 130 390, 110 370"
          stroke="url(#goldBranchGrad)"
          strokeWidth="6"
        />
        <path
          d="M 310 468 C 260 430, 220 400, 180 370"
          stroke="url(#goldBranchGrad)"
          strokeWidth="9"
        />

        {/* === RIGHT LOWER BRANCH CLUSTER === */}
        <path
          d="M 530 450 C 600 440, 690 470, 760 490"
          stroke="url(#goldBranchGrad)"
          strokeWidth="18"
          filter="url(#goldGlow)"
        />
        <path
          d="M 720 475 C 780 460, 820 440, 860 410"
          stroke="url(#goldBranchGrad)"
          strokeWidth="11"
        />
        <path
          d="M 760 490 C 800 510, 840 520, 870 520"
          stroke="url(#goldBranchGrad)"
          strokeWidth="8"
        />
        <path
          d="M 820 440 C 850 420, 870 390, 890 370"
          stroke="url(#goldBranchGrad)"
          strokeWidth="6"
        />
        <path
          d="M 690 468 C 740 430, 780 400, 820 370"
          stroke="url(#goldBranchGrad)"
          strokeWidth="9"
        />

        {/* === LEFT MID BRANCH CLUSTER === */}
        <path
          d="M 475 360 C 410 340, 320 350, 240 350"
          stroke="url(#goldBranchGrad)"
          strokeWidth="15"
          filter="url(#goldGlow)"
        />
        <path
          d="M 320 350 C 260 320, 200 300, 150 280"
          stroke="url(#goldBranchGrad)"
          strokeWidth="10"
        />
        <path
          d="M 260 350 C 210 350, 170 340, 130 330"
          stroke="url(#goldBranchGrad)"
          strokeWidth="7"
        />
        <path
          d="M 200 300 C 160 280, 130 260, 110 240"
          stroke="url(#goldBranchGrad)"
          strokeWidth="5"
        />

        {/* === RIGHT MID BRANCH CLUSTER === */}
        <path
          d="M 525 360 C 590 340, 680 350, 760 350"
          stroke="url(#goldBranchGrad)"
          strokeWidth="15"
          filter="url(#goldGlow)"
        />
        <path
          d="M 680 350 C 740 320, 800 300, 850 280"
          stroke="url(#goldBranchGrad)"
          strokeWidth="10"
        />
        <path
          d="M 740 350 C 790 350, 830 340, 870 330"
          stroke="url(#goldBranchGrad)"
          strokeWidth="7"
        />
        <path
          d="M 800 300 C 840 280, 870 260, 890 240"
          stroke="url(#goldBranchGrad)"
          strokeWidth="5"
        />

        {/* === LEFT HIGH BRANCH CLUSTER === */}
        <path
          d="M 480 290 C 430 240, 350 220, 270 200"
          stroke="url(#goldBranchGrad)"
          strokeWidth="13"
          filter="url(#goldGlow)"
        />
        <path
          d="M 350 220 C 300 180, 240 150, 180 120"
          stroke="url(#goldBranchGrad)"
          strokeWidth="8"
        />
        <path
          d="M 290 205 C 240 170, 200 140, 160 100"
          stroke="url(#goldBranchGrad)"
          strokeWidth="6"
        />

        {/* === RIGHT HIGH BRANCH CLUSTER === */}
        <path
          d="M 520 290 C 570 240, 650 220, 730 200"
          stroke="url(#goldBranchGrad)"
          strokeWidth="13"
          filter="url(#goldGlow)"
        />
        <path
          d="M 650 220 C 700 180, 760 150, 820 120"
          stroke="url(#goldBranchGrad)"
          strokeWidth="8"
        />
        <path
          d="M 710 205 C 760 170, 800 140, 840 100"
          stroke="url(#goldBranchGrad)"
          strokeWidth="6"
        />

        {/* === TOP CENTER CANOPY SPIRES === */}
        <path
          d="M 500 290 L 500 200 C 500 150, 480 110, 450 70"
          stroke="url(#goldBranchGrad)"
          strokeWidth="11"
        />
        <path
          d="M 500 200 C 500 150, 520 110, 550 70"
          stroke="url(#goldBranchGrad)"
          strokeWidth="11"
        />
        <path
          d="M 500 170 L 500 40"
          stroke="url(#goldBranchGrad)"
          strokeWidth="8"
        />
        <path
          d="M 500 110 C 470 80, 440 60, 410 40"
          stroke="url(#goldBranchGrad)"
          strokeWidth="6"
        />
        <path
          d="M 500 110 C 530 80, 560 60, 590 40"
          stroke="url(#goldBranchGrad)"
          strokeWidth="6"
        />
        <path
          d="M 500 60 L 480 20"
          stroke="url(#goldBranchGrad)"
          strokeWidth="4"
        />
        <path
          d="M 500 60 L 520 20"
          stroke="url(#goldBranchGrad)"
          strokeWidth="4"
        />
      </g>

      {/* ── BRANCH HIGHLIGHT SHIMMER LINES ── */}
      <g fill="none" stroke="url(#goldHighlightGrad)" strokeLinecap="round">
        <path d="M 472 443 C 402 433, 312 463, 242 483" strokeWidth="3" opacity="0.9" />
        <path d="M 528 443 C 598 433, 688 463, 758 483" strokeWidth="3" opacity="0.9" />
        <path d="M 477 353 C 412 333, 322 343, 242 343" strokeWidth="2.5" opacity="0.9" />
        <path d="M 523 353 C 588 333, 678 343, 758 343" strokeWidth="2.5" opacity="0.9" />
        <path d="M 482 283 C 432 233, 352 213, 272 193" strokeWidth="2" opacity="0.9" />
        <path d="M 518 283 C 568 233, 648 213, 728 193" strokeWidth="2" opacity="0.9" />
        <path d="M 500 195 L 500 42" strokeWidth="2" opacity="0.9" />
      </g>

      {/* ── AMBIENT GOLDEN BRANCH NODES & CONNECTOR ORBS ── */}
      <g fill="#FFD700" filter="url(#goldGlow)">
        {/* Left Side Branch Node Orbs */}
        <circle cx="240" cy="490" r="5" className="animate-pulse" />
        <circle cx="140" cy="410" r="4" />
        <circle cx="180" cy="370" r="4.5" />
        <circle cx="240" cy="350" r="5" className="animate-pulse" />
        <circle cx="150" cy="280" r="4" />
        <circle cx="270" cy="200" r="4.5" />
        <circle cx="180" cy="120" r="3.5" />
        <circle cx="450" cy="70" r="4" />

        {/* Right Side Branch Node Orbs */}
        <circle cx="760" cy="490" r="5" className="animate-pulse" />
        <circle cx="860" cy="410" r="4" />
        <circle cx="820" cy="370" r="4.5" />
        <circle cx="760" cy="350" r="5" className="animate-pulse" />
        <circle cx="850" cy="280" r="4" />
        <circle cx="730" cy="200" r="4.5" />
        <circle cx="820" cy="120" r="3.5" />
        <circle cx="550" cy="70" r="4" />

        {/* Top Spire Orbs */}
        <circle cx="500" cy="40" r="4.5" className="animate-pulse" />
        <circle cx="480" cy="20" r="3" />
        <circle cx="520" cy="20" r="3" />
      </g>
    </svg>
  );
};
