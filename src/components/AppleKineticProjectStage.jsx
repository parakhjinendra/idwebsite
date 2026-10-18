import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Volume2, VolumeX, ArrowUpRight } from 'lucide-react';
import portfolioImages from '../portfolioImages.json';

function resolveImg(idOrPath) {
  if (!idOrPath) return '';
  const raw = String(idOrPath).trim();
  if (raw.startsWith('http://') || raw.startsWith('https://') || raw.startsWith('data:')) return raw;
  if (portfolioImages[raw]) return portfolioImages[raw];
  const withoutExt = raw.replace(/\.[^/.]+$/, "");
  if (portfolioImages[withoutExt]) return portfolioImages[withoutExt];
  const filename = raw.split(/[/\\]/).pop();
  if (portfolioImages[filename]) return portfolioImages[filename];
  const fileWithoutExt = filename.replace(/\.[^/.]+$/, "");
  if (portfolioImages[fileWithoutExt]) return portfolioImages[fileWithoutExt];
  return raw;
}

export default function AppleKineticProjectStage() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [effectMode, setEffectMode] = useState('stretch'); // 'stretch' | 'bulge' | 'drum'
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const stageRef = useRef(null);
  const dragStartX = useRef(0);
  const lastWheelTime = useRef(0);

  const KINETIC_PROJECTS = [
    {
      id: 'vantage',
      num: '01',
      title: 'Vantage 360°',
      subtitle: 'Modular Webcam Architecture',
      category: 'Hardware & Ergonomics',
      imgId: 'p2_2',
      specs: ['4K Sony Sensor', '360° Articulation', 'Magnetic Pogo-Pin'],
      link: '/project/vantage',
      tagline: 'Articulated dual-axis webcam with instant magnetic decoupling.'
    },
    {
      id: 'fuel',
      num: '02',
      title: 'Fuel Handheld',
      subtitle: 'Retro-Engineered Power Bank',
      category: 'Consumer Electronics',
      imgId: 'p18_2',
      specs: ['MagSafe Interface', 'Tactile Click Switch', 'Segment LED Display'],
      link: '/project/fuel',
      tagline: 'Golden-era Game Boy nostalgia engineered with modern MagSafe wireless power.'
    },
    {
      id: 'friday',
      num: '03',
      title: 'Friday Boot',
      subtitle: 'Biomechanical Workwear Heel',
      category: 'Footwear & Ergonomics',
      imgId: 'p30_2',
      specs: ['UK 11 Ergo', '3-Axis CNC Milled Sole', 'Monogram Lacing'],
      link: '/project/friday',
      tagline: 'Authoritative footwear engineered for trans women and drag queens.'
    },
    {
      id: 'glass-vessel',
      num: '04',
      title: 'Glass Vessel',
      subtitle: 'Acoustic Borosilicate Instrument',
      category: 'Harmonic Physics',
      imgId: 'p44_2',
      specs: ['Hand-Blown Glass', 'Copper Wire Suspension', 'Dual Resonant Spheres'],
      link: '/project/glass-vessel',
      tagline: 'Fragile borosilicate hourglass suspended in woven copper wire.'
    },
    {
      id: 'studio-craft',
      num: '05',
      title: 'Studio Craft',
      subtitle: 'CNC Machining & Teardowns',
      category: 'Physical Prototyping',
      imgId: 'p51_12',
      specs: ['High-Density PU Foam', '1:1 Toolpaths', 'Physical Mockups'],
      link: '/#studio-craft',
      tagline: 'Makerspace CNC 3-axis polyurethane sole routing and prototype carving.'
    },
    {
      id: 'visual-lab',
      num: '06',
      title: 'Visual Lab',
      subtitle: 'Analog Sketches & AI Surfacing',
      category: 'Concept Ideation',
      imgId: 'p47_2',
      specs: ['AF1 Deconstruction', 'Vizcom AI Trials', 'Horology Ideation'],
      link: '/playground',
      tagline: 'Raw ideation sketches, Nike sneaker teardowns, and generative AI iterations.'
    }
  ];

  const total = KINETIC_PROJECTS.length;

  const playDetentTick = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.012);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.012);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.015);
    } catch (e) {}
  }, [soundEnabled]);

  const goTo = useCallback((idx) => {
    const clamped = Math.max(0, Math.min(total - 1, idx));
    if (clamped !== activeIndex) {
      setActiveIndex(clamped);
      playDetentTick();
    }
  }, [activeIndex, total, playDetentTick]);

  const prev = () => goTo(activeIndex - 1);
  const next = () => goTo(activeIndex + 1);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const handleWheel = (e) => {
      const now = Date.now();
      if (now - lastWheelTime.current < 260) return;
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) > 35) {
        lastWheelTime.current = now;
        if (delta > 0) goTo(activeIndex + 1);
        else goTo(activeIndex - 1);
      }
    };

    stage.addEventListener('wheel', handleWheel, { passive: true });
    return () => stage.removeEventListener('wheel', handleWheel);
  }, [activeIndex, goTo]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
      if (e.key === 'ArrowRight') goTo(activeIndex + 1);
      else if (e.key === 'ArrowLeft') goTo(activeIndex - 1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, goTo]);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    dragStartX.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    setDragOffset(0);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const delta = clientX - dragStartX.current;
    setDragOffset(delta);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = 60;
    if (dragOffset < -threshold) goTo(activeIndex + 1);
    else if (dragOffset > threshold) goTo(activeIndex - 1);
    setDragOffset(0);
  };

  const effectiveOffset = (i) => {
    const cardStep = 380;
    const rawOffset = i - activeIndex;
    const dragFraction = isDragging ? dragOffset / cardStep : 0;
    return rawOffset - dragFraction;
  };

  const getCardStyle = (i) => {
    const off = effectiveOffset(i);
    const dist = Math.abs(off);

    if (dist > 3.2) return { display: 'none' };

    const isCenter = dist < 0.35;
    let transform = '';
    let opacity = Math.max(1 - dist * 0.32, 0.22);
    let zIndex = Math.round(100 - dist * 10);

    if (effectMode === 'stretch') {
      const x = off * 370;
      const scaleX = 1 + Math.min(dist * 0.16, 0.42);
      const scaleY = Math.max(1 - dist * 0.12, 0.74);
      const skewX = -Math.sign(off) * Math.min(dist * 4.5, 9);
      const scale = 1 - Math.min(dist * 0.06, 0.18);
      transform = `translate3d(${x}px, 0, 0) scale(${scale}) scaleX(${scaleX}) scaleY(${scaleY}) skewX(${skewX}deg)`;
    } else if (effectMode === 'bulge') {
      const x = off * 380;
      const scale = Math.max(1.15 - dist * 0.28, 0.74);
      const z = Math.max((1 - dist * 0.6) * 110, -80);
      transform = `translate3d(${x}px, 0, ${z}px) scale(${scale})`;
    } else if (effectMode === 'drum') {
      const angle = off * 26;
      const R = 640;
      const x = Math.sin(angle * Math.PI / 180) * R;
      const z = (Math.cos(angle * Math.PI / 180) - 1) * R;
      const scale = Math.max(1 - dist * 0.05, 0.86);
      transform = `translate3d(${x}px, 0, ${z}px) rotateY(${angle}deg) scale(${scale})`;
    }

    return {
      transform,
      opacity,
      zIndex,
      cursor: isCenter ? 'pointer' : 'grab',
      transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease'
    };
  };

  const handleCardClick = (i, project) => {
    if (Math.abs(effectiveOffset(i)) > 0.4) {
      goTo(i);
    } else {
      if (project.link.startsWith('/#')) {
        const id = project.link.slice(2);
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate(project.link);
      }
    }
  };

  return (
    <section 
      id="kinetic-stage" 
      ref={stageRef}
      className="relative overflow-hidden py-24 bg-[#ffffff] border-y border-black/[0.06] select-none scroll-mt-16"
      onMouseDown={handlePointerDown}
      onMouseMove={handlePointerMove}
      onMouseUp={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
    >
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[550px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FF3B1D]/06 via-neutral-100/40 to-transparent blur-3xl pointer-events-none" 
      />

      <div className="max-w-[1840px] w-full mx-auto px-6 sm:px-10 md:px-14 lg:px-20 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-[#FF3B1D] uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-[#FF3B1D] animate-pulse" />
              <span>KINETIC EXHIBITION STAGE // SCROLL • DRAG • FLICK</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight uppercase text-black leading-[0.98]">
              The Hardware Carousel.
            </h2>
            <p className="font-sans text-base sm:text-lg text-neutral-600 font-light leading-relaxed">
              Drag horizontally, scroll with trackpad, or use arrow keys to navigate projects. Toggle physics modes below.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest hidden sm:inline">
              SELECT CENTER CARD TO OPEN
            </span>
            <div className="waterglass-pill px-4 py-1.5 rounded-full font-mono text-xs font-bold text-black flex items-center gap-1.5 shadow-xs">
              <span className="text-[#FF3B1D]">{String(activeIndex + 1).padStart(2, '0')}</span>
              <span className="text-neutral-400">/</span>
              <span>{String(total).padStart(2, '0')}</span>
            </div>
          </div>
        </div>

        <div className="relative h-[560px] sm:h-[600px] w-full flex items-center justify-center perspective-stage overflow-hidden">
          {KINETIC_PROJECTS.map((proj, idx) => {
            const style = getCardStyle(idx);
            const isCenter = Math.abs(effectiveOffset(idx)) < 0.35;

            return (
              <div
                key={proj.id}
                onClick={() => handleCardClick(idx, proj)}
                style={style}
                className={`absolute w-[300px] sm:w-[360px] md:w-[380px] h-[500px] sm:h-[530px] rounded-[30px] p-6 flex flex-col justify-between preserve-3d will-change-transform group transition-shadow duration-300 ${
                  isCenter 
                    ? 'waterglass-card shadow-2xl border-white ring-2 ring-[#FF3B1D]/20 bg-white/95' 
                    : 'waterglass-card shadow-md bg-white/75 hover:bg-white/90'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black text-[#FF3B1D]">{proj.num}</span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 font-bold">
                        {proj.category}
                      </span>
                    </div>
                    {isCenter && (
                      <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Center Detent</span>
                      </span>
                    )}
                  </div>

                  <div className="h-[230px] sm:h-[260px] w-full flex items-center justify-center relative my-3 p-3 bg-gradient-to-b from-[#f8f8fa] to-[#f2f2f5] rounded-2xl border border-neutral-200/70 overflow-hidden">
                    <div 
                      aria-hidden="true" 
                      className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent opacity-80 pointer-events-none" 
                    />
                    <img
                      src={resolveImg(proj.imgId)}
                      alt={proj.title}
                      className="max-h-full max-w-full object-contain drop-shadow-xl select-none pointer-events-none transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      draggable="false"
                    />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xl sm:text-2xl font-black font-display uppercase tracking-tight text-black leading-tight group-hover:text-[#FF3B1D] transition-colors">
                      {proj.title}
                    </h3>
                    <p className="font-sans text-xs text-neutral-600 font-light line-clamp-1">
                      {proj.subtitle}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.specs.map((s, sIdx) => (
                      <span 
                        key={sIdx}
                        className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/[0.04] text-neutral-600 font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between">
                    <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
                      ODD HOURS // 2025
                    </span>
                    <span className={`inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full transition-all ${
                      isCenter 
                        ? 'apple-fluid-glass-primary text-white shadow-xs' 
                        : 'apple-fluid-glass-btn text-black'
                    }`}>
                      <span>{proj.link.startsWith('/#') ? 'Inspect' : 'Open Case Study'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 relative z-30">
          <div className="waterglass-dock p-1.5 rounded-full flex items-center gap-1 shadow-lg border border-white/90">
            <span className="font-mono text-[10px] uppercase font-bold text-neutral-400 px-3 hidden md:inline">
              Physics Mode:
            </span>
            {[
              { id: 'stretch', label: '✦ Stretch', desc: 'Fluid Elasticity' },
              { id: 'bulge', label: '◉ Bulge', desc: 'Fisheye Lens' },
              { id: 'drum', label: '◓ 3D Drum', desc: 'Revolving Cylinder' }
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => { setEffectMode(m.id); playDetentTick(); }}
                className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                  effectMode === m.id
                    ? 'apple-fluid-glass-primary text-white shadow-sm font-bold scale-102'
                    : 'text-neutral-600 hover:text-black hover:bg-black/5'
                }`}
                title={m.desc}
              >
                {m.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="waterglass-dock p-1 rounded-full flex items-center gap-1 shadow-sm">
              <button
                onClick={prev}
                disabled={activeIndex === 0}
                className="waterglass-pill p-2 rounded-full text-black hover:text-[#FF3B1D] disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                title="Previous Project (←)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="font-mono text-xs font-bold px-3 text-neutral-800">
                {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>

              <button
                onClick={next}
                disabled={activeIndex === total - 1}
                className="waterglass-pill p-2 rounded-full text-black hover:text-[#FF3B1D] disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                title="Next Project (→)"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => { setSoundEnabled(!soundEnabled); if (!soundEnabled) playDetentTick(); }}
              className={`waterglass-pill px-3 py-2 rounded-full font-mono text-xs flex items-center gap-1.5 cursor-pointer shadow-xs ${
                soundEnabled ? 'text-black font-semibold' : 'text-neutral-400'
              }`}
              title={soundEnabled ? 'Detent Sound FX: ON' : 'Detent Sound FX: MUTED'}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#FF3B1D]" /> : <VolumeX className="w-3.5 h-3.5 text-neutral-400" />}
              <span className="hidden sm:inline text-[11px] uppercase tracking-wider">
                {soundEnabled ? 'Sound ON' : 'Muted'}
              </span>
            </button>
          </div>

        </div>

        <div className="flex items-center justify-center gap-2 mt-6">
          {KINETIC_PROJECTS.map((proj, idx) => (
            <button
              key={proj.id}
              onClick={() => goTo(idx)}
              className={`transition-all rounded-full cursor-pointer ${
                activeIndex === idx 
                  ? 'w-7 h-2 bg-[#FF3B1D] shadow-xs' 
                  : 'w-2 h-2 bg-neutral-300 hover:bg-neutral-500'
              }`}
              title={`Jump to ${proj.title}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
