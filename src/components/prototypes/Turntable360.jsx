import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause } from 'lucide-react';
import { ChevronLeft, ChevronRight } from '../ui/ChevronIcon';

// Interactive 360° turntable viewer.
// - Drag with the mouse or swipe left/right on touch to rotate
// - Play/pause auto-rotation
// - Step one frame at a time with the arrow buttons
// Frames are drawn to a <canvas> (not an <img>) so rapid frame changes never flicker.
const FRAME_COUNT = 60;
const DRAG_SENSITIVITY = 6; // px of drag per frame step
const framePath = (i) =>
  `${process.env.PUBLIC_URL}/natura-turntable/frame_${String(i).padStart(2, '0')}.webp`;

const mod = (n, m) => ((n % m) + m) % m;

const Turntable360 = () => {
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [loadedCount, setLoadedCount] = useState(0);
  const [ready, setReady] = useState(false);
  const drag = useRef({ active: false, lastX: 0 });
  const rafRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);

  // Preload every frame as a decoded Image so drawing is instant.
  useEffect(() => {
    let cancelled = false;
    let count = 0;
    const onDone = () => {
      if (cancelled) return;
      count += 1;
      setLoadedCount(count);
      if (count === FRAME_COUNT) setReady(true);
    };
    const imgs = [];
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.onload = onDone;
      img.onerror = onDone;
      img.src = framePath(i);
      imgs[i] = img;
    }
    imagesRef.current = imgs;
    return () => { cancelled = true; };
  }, []);

  // Draw the current frame to the canvas (object-contain, dpr-aware).
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[frame];
    if (!canvas || !img || !img.complete || !img.naturalWidth) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const w = Math.round(rect.width * dpr);
    const h = Math.round(rect.height * dpr);
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
    ctx.clearRect(0, 0, w, h);
    const ir = img.naturalWidth / img.naturalHeight;
    const cr = w / h;
    let dw;
    let dh;
    if (ir > cr) { dw = w; dh = w / ir; } else { dh = h; dw = h * ir; }
    ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
  }, [frame]);

  useEffect(() => { draw(); }, [draw, ready]);

  // Redraw on container resize.
  useEffect(() => {
    const onResize = () => draw();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [draw]);

  // Auto-rotate while playing.
  useEffect(() => {
    if (!playing || !ready) return undefined;
    let last = 0;
    const FRAME_MS = 1000 / 24; // ~24 fps spin
    const tick = (t) => {
      if (!last) last = t;
      if (t - last >= FRAME_MS) {
        last = t;
        setFrame((f) => mod(f + 1, FRAME_COUNT));
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing, ready]);

  const onPointerDown = useCallback((e) => {
    setPlaying(false);
    drag.current = { active: true, lastX: e.clientX };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.lastX;
    if (Math.abs(dx) >= DRAG_SENSITIVITY) {
      const steps = Math.trunc(dx / DRAG_SENSITIVITY);
      // Drag right → object turns toward you (previous frame); feels like grabbing it.
      setFrame((f) => mod(f - steps, FRAME_COUNT));
      drag.current.lastX = e.clientX;
    }
  }, []);

  const endDrag = useCallback((e) => {
    drag.current.active = false;
    e.currentTarget.releasePointerCapture?.(e.pointerId);
  }, []);

  const step = (dir) => { setPlaying(false); setFrame((f) => mod(f + dir, FRAME_COUNT)); };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
    else if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); setPlaying((p) => !p); }
  };

  const pct = Math.round((loadedCount / FRAME_COUNT) * 100);

  return (
    <div className="w-full">
      <div
        className="relative w-full aspect-square max-w-[560px] mx-auto rounded-xl bg-surface border border-main overflow-hidden select-none cursor-grab active:cursor-grabbing"
        style={{ touchAction: 'pan-y' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={onKeyDown}
        role="slider"
        tabIndex={0}
        aria-label="360 degree view of the Natura Kingdom bear. Drag left or right to rotate."
        aria-valuemin={0}
        aria-valuemax={FRAME_COUNT - 1}
        aria-valuenow={frame}
      >
        {/* Loading overlay */}
        {!ready && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface z-10">
            <div className="w-10 h-10 rounded-full border-2 border-main border-t-heading animate-spin mb-3" />
            <p className="text-faint text-sm">Loading 360° view… {pct}%</p>
          </div>
        )}

        <canvas
          ref={canvasRef}
          className="w-full h-full block pointer-events-none"
          aria-hidden
        />

        {/* Drag hint */}
        {ready && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-base/70 backdrop-blur-sm pointer-events-none">
            <span className="text-faint text-xs whitespace-nowrap">Drag to rotate • 360°</span>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <button
          onClick={() => step(-1)}
          className="p-2 rounded-full hover:bg-surface transition-colors"
          aria-label="Previous frame"
        >
          <ChevronLeft className="w-6 h-6 text-muted" />
        </button>
        <button
          onClick={() => setPlaying((p) => !p)}
          className="flex items-center gap-2 px-5 py-2 rounded-full border border-tag text-body hover:border-heading hover:text-heading transition-colors"
          aria-label={playing ? 'Pause rotation' : 'Play rotation'}
        >
          {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span className="text-sm font-light tracking-wide">{playing ? 'Pause' : 'Play'}</span>
        </button>
        <button
          onClick={() => step(1)}
          className="p-2 rounded-full hover:bg-surface transition-colors"
          aria-label="Next frame"
        >
          <ChevronRight className="w-6 h-6 text-muted" />
        </button>
      </div>
    </div>
  );
};

export default Turntable360;
