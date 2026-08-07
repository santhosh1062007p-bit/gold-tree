/**
 * Procedural Web Audio API Sound Synthesizer for Innovation Legacy Tree
 * Provides cinematic sound effects for key interaction beats:
 * - Crisp Metallic / Crystal Button Clicks & Taps
 * - Signature Drawing Stroke Audio Feedback
 * - Particle Vortex Energy Disintegration
 * - Multi-stage Golden/Emerald Legacy Creation Chime
 * - Tree Branch Attachment Sparkle Bell
 * - Ceremonial Illumination Fanfare
 */

class SoundSystem {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private strokeOsc: OscillatorNode | null = null;
  private strokeGain: GainNode | null = null;

  constructor() {
    // Lazy-initialized on first user interaction
    if (typeof window !== 'undefined') {
      const unlockAudio = () => {
        this.initCtx();
        window.removeEventListener('pointerdown', unlockAudio);
        window.removeEventListener('keydown', unlockAudio);
      };
      window.addEventListener('pointerdown', unlockAudio);
      window.addEventListener('keydown', unlockAudio);
    }
  }

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // 1. Crisp Metallic / Crystal Button Click Sound
  public playClick(variant: 'primary' | 'secondary' | 'tab' | 'delete' = 'primary') {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    if (variant === 'delete') {
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(320, now);
      osc1.frequency.exponentialRampToValueAtTime(140, now + 0.12);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc1.connect(gain);
    } else if (variant === 'tab') {
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(659.25, now); // E5
      osc1.frequency.exponentialRampToValueAtTime(880, now + 0.08); // A5

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc1.connect(gain);
    } else {
      // High-grade golden chime click
      osc1.type = 'sine';
      osc2.type = 'triangle';

      osc1.frequency.setValueAtTime(783.99, now); // G5
      osc1.frequency.exponentialRampToValueAtTime(1174.66, now + 0.1); // D6

      osc2.frequency.setValueAtTime(1567.98, now); // G6
      osc2.frequency.exponentialRampToValueAtTime(2093.00, now + 0.1); // C7

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc1.connect(gain);
      osc2.connect(gain);
    }

    gain.connect(this.ctx.destination);

    osc1.start(now);
    if (variant === 'primary') osc2.start(now);

    osc1.stop(now + 0.12);
    if (variant === 'primary') osc2.stop(now + 0.12);
  }

  // 2. Signature Drawing Soft Shimmer Brush Sound
  public playStrokeStart() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      this.strokeOsc = this.ctx.createOscillator();
      this.strokeGain = this.ctx.createGain();

      this.strokeOsc.type = 'sine';
      this.strokeOsc.frequency.setValueAtTime(440, now);
      this.strokeOsc.frequency.exponentialRampToValueAtTime(880, now + 0.15);

      this.strokeGain.gain.setValueAtTime(0.001, now);
      this.strokeGain.gain.linearRampToValueAtTime(0.04, now + 0.05);

      this.strokeOsc.connect(this.strokeGain);
      this.strokeGain.connect(this.ctx.destination);
      this.strokeOsc.start(now);
    } catch {
      // Audio safety fallback
    }
  }

  public playStrokeEnd() {
    if (!this.strokeOsc || !this.strokeGain || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      this.strokeGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
      this.strokeOsc.stop(now + 0.08);
    } catch {
      // Ignore
    } finally {
      this.strokeOsc = null;
      this.strokeGain = null;
    }
  }

  // 3. Signature Glow & Disintegration Vortex Effect
  public playVortex() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(750, now + 1.8);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(300, now);
    filter.frequency.exponentialRampToValueAtTime(3200, now + 1.8);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.22, now + 1.0);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 2.0);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 2.0);
  }

  // 4. Golden / Emerald Legacy Creation Resonant Chime
  public playLeafFormation(isGreen: boolean = false) {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Golden Major Arpeggio vs Emerald Nature Synth Chord
    const frequencies = isGreen
      ? [440.00, 554.37, 659.25, 880.00, 1108.73] // A4, C#5, E5, A5, C#6
      : [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6

    frequencies.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.09);

      gain.gain.setValueAtTime(0.001, now + idx * 0.09);
      gain.gain.linearRampToValueAtTime(0.14, now + idx * 0.09 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.09 + 1.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.09);
      osc.stop(now + idx * 0.09 + 1.6);
    });
  }

  // 5. Dedicated Legacy Created Sparkle Cascade
  public playLegacyCreated() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [659.25, 783.99, 987.77, 1174.66, 1318.51, 1567.98, 1975.53]; // Magical shimmer scale

    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);

      gain.gain.setValueAtTime(0.15, now + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.7);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.7);
    });
  }

  // 6. Leaf Attachment Sparkle Bell
  public playLeafAttachment() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [1318.51, 1567.98, 1975.53, 2637.02]; // E6, G6, B6, E7

    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);

      gain.gain.setValueAtTime(0.2, now + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.8);
    });
  }

  // 7. Ceremonial Fanfare (Thank You Reveal)
  public playSuccessFanfare() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const chord = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; // Warm C major orchestral chord

    chord.forEach((freq) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.35);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 2.8);
    });
  }
}

export const soundSystem = new SoundSystem();

