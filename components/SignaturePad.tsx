'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Eraser, Sparkles, ArrowLeft } from 'lucide-react';
import { soundSystem } from '@/lib/soundSystem';

interface SignaturePadProps {
  onComplete: (base64Signature: string) => void;
  onBack: () => void;
  guestName: string;
}

interface Point {
  x: number;
  y: number;
}

export const SignaturePad: React.FC<SignaturePadProps> = ({
  onComplete,
  onBack,
  guestName,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pointsRef = useRef<Point[]>([]);
  const strokesCountRef = useRef<number>(0);

  // High-DPI canvas setup
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    ctx.scale(dpr, dpr);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 3.5;
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#D4AF37';

    ctx.clearRect(0, 0, rect.width, rect.height);
  }, []);

  useEffect(() => {
    initCanvas();
    window.addEventListener('resize', initCanvas);
    return () => window.removeEventListener('resize', initCanvas);
  }, [initCanvas]);

  const getCanvasPoint = (e: React.PointerEvent<HTMLCanvasElement> | React.MouseEvent<HTMLCanvasElement>): Point | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const getTouchPoint = (e: React.TouchEvent<HTMLCanvasElement>): Point | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    if (!touch) return null;
    return {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isSubmitting) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    const point = getCanvasPoint(e);
    if (!point) return;

    setIsDrawing(true);
    soundSystem.playStrokeStart();
    pointsRef.current = [point];
    strokesCountRef.current += 1;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(point.x, point.y);
    ctx.arc(point.x, point.y, 1.5, 0, Math.PI * 2);
    ctx.fillStyle = '#FFD700';
    ctx.fill();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || isSubmitting) return;
    const point = getCanvasPoint(e);
    if (!point) return;

    const points = pointsRef.current;
    points.push(point);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (points.length >= 2) {
      const p1 = points[points.length - 2];
      const p2 = points[points.length - 1];
      const midPoint = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };

      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
      ctx.stroke();
    }

    if (!hasSignature && strokesCountRef.current > 0) {
      setHasSignature(true);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement> | React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    soundSystem.playStrokeEnd();
    try {
      if ('pointerId' in e) {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      }
    } catch {
      // Ignore
    }
    setIsDrawing(false);
  };

  // --- NATIVE TOUCH HANDLERS (Fallback for specific Touch/iPad devices) ---
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (isSubmitting) return;
    const point = getTouchPoint(e);
    if (!point) return;

    setIsDrawing(true);
    soundSystem.playStrokeStart();
    pointsRef.current = [point];
    strokesCountRef.current += 1;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(point.x, point.y);
    ctx.arc(point.x, point.y, 1.5, 0, Math.PI * 2);
    ctx.fillStyle = '#FFD700';
    ctx.fill();
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || isSubmitting) return;
    const point = getTouchPoint(e);
    if (!point) return;

    const points = pointsRef.current;
    points.push(point);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (points.length >= 2) {
      const p1 = points[points.length - 2];
      const p2 = points[points.length - 1];
      const midPoint = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };

      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
      ctx.stroke();
    }

    if (!hasSignature && strokesCountRef.current > 0) {
      setHasSignature(true);
    }
  };

  const handleTouchEnd = () => {
    if (!isDrawing) return;
    soundSystem.playStrokeEnd();
    setIsDrawing(false);
  };

  const handleClear = () => {
    if (isSubmitting) return;
    soundSystem.playClick('delete');
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
    pointsRef.current = [];
    strokesCountRef.current = 0;
    setHasSignature(false);
  };

  const handleSubmit = () => {
    if (!hasSignature || isSubmitting) return;
    soundSystem.playClick();
    setIsSubmitting(true);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL('image/png');
    onComplete(dataUrl);
  };

  return (
    <div className="w-full h-full flex flex-col select-none max-w-xl mx-auto">
        {/* Fixed Header */}
        <div className="flex items-center justify-between border-b border-amber-500/20 pb-4 mb-4 flex-shrink-0">
          <button
            onClick={() => {
              if (!isSubmitting) {
                soundSystem.playClick();
                onBack();
              }
            }}
            disabled={isSubmitting}
            type="button"
            className="flex items-center gap-2 text-amber-300/80 hover:text-amber-200 text-sm font-medium transition-colors cursor-pointer disabled:opacity-50"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <span className="text-xs uppercase tracking-widest text-amber-400/80 font-semibold truncate max-w-[200px]">
            {guestName}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 min-h-0 gap-4">
          {/* Title */}
          <div className="text-center flex-shrink-0">
            <h2 className="text-2xl md:text-3xl font-extrabold gold-gradient-text">LEAVE YOUR SIGNATURE</h2>
            <p className="text-xs md:text-sm text-amber-200/80 mt-1">
              Your signature will become a permanent golden leaf on our Innovation Legacy Tree.
            </p>
          </div>

          {/* Canvas — flex-1 so it fills available space */}
          <div className="relative flex-1 min-h-[180px] bg-[#05070C]/90 rounded-2xl border-2 border-amber-500/40 shadow-[inset_0_0_30px_rgba(212,175,55,0.1)] overflow-hidden touch-none">
            <canvas
              ref={canvasRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchEnd}
              onMouseDown={handlePointerDown as any}
              onMouseMove={handlePointerMove as any}
              onMouseUp={handlePointerUp as any}
              onMouseLeave={handlePointerUp as any}
              style={{ touchAction: 'none' }}
              className="w-full h-full cursor-crosshair touch-none"
            />

            {!hasSignature && (
              <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-amber-400/30 space-y-2">
                <Sparkles className="w-7 h-7 animate-pulse" />
                <p className="text-xs tracking-wider uppercase">Sign here using finger, stylus, or mouse</p>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between gap-4 flex-shrink-0 pb-2">
            <button
              onClick={handleClear}
              disabled={!hasSignature || isSubmitting}
              type="button"
              className="px-5 py-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 font-semibold text-sm hover:bg-red-900/60 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Eraser className="w-4 h-4" />
              <span>CLEAR</span>
            </button>

            <button
              onClick={handleSubmit}
              disabled={!hasSignature || isSubmitting}
              type="button"
              className="gold-glow-btn flex-1 py-4 rounded-xl text-amber-100 font-extrabold text-base tracking-wider uppercase flex items-center justify-center gap-3 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(212,175,55,0.4)]"
            >
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>{isSubmitting ? 'FORGING LEGACY...' : 'CREATE MY LEGACY'}</span>
            </button>
          </div>
        </div>
    </div>
  );
};
