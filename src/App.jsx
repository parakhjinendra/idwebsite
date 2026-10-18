import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  useLocation
} from 'react-router-dom';
import { 
  ArrowUpRight, 
  ArrowDown, 
  ArrowUp, 
  X, 
  Download, 
  ExternalLink,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Mail,
  Phone,
  Globe,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import portfolioImages from './portfolioImages.json';

/* --- RESOLVE IMAGE PATH FROM MAPPING --- */
export function resolveImg(idOrPath) {
  if (!idOrPath) return '';
  const raw = String(idOrPath).trim();
  if (raw.startsWith('http://') || raw.startsWith('https://') || raw.startsWith('data:')) {
    return raw;
  }
  if (portfolioImages[raw]) return portfolioImages[raw];
  const withoutExt = raw.replace(/\.[^/.]+$/, "");
  if (portfolioImages[withoutExt]) return portfolioImages[withoutExt];
  const filename = raw.split(/[/\\]/).pop();
  if (portfolioImages[filename]) return portfolioImages[filename];
  const fileWithoutExt = filename.replace(/\.[^/.]+$/, "");
  if (portfolioImages[fileWithoutExt]) return portfolioImages[fileWithoutExt];
  return raw;
}

/* --- LIGHTBOX CONTEXT --- */
const LightboxContext = createContext({
  openLightbox: (imgData, galleryList = []) => {},
  closeLightbox: () => {}
});

export function useLightbox() {
  return useContext(LightboxContext);
}

/* --- LIGHTBOX MODAL --- */
function ImageLightboxModal({ activeItem, gallery = [], onClose, onNavigate }) {
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const startPan = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setScale(1);
    setPos({ x: 0, y: 0 });
  }, [activeItem]);

  useEffect(() => {
    if (!activeItem) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNavigate && gallery.length > 1) {
        const curIdx = gallery.findIndex(item => item.id === activeItem.id || item.src === activeItem.src);
        if (curIdx !== -1) onNavigate(gallery[(curIdx + 1) % gallery.length]);
      }
      if (e.key === 'ArrowLeft' && onNavigate && gallery.length > 1) {
        const curIdx = gallery.findIndex(item => item.id === activeItem.id || item.src === activeItem.src);
        if (curIdx !== -1) onNavigate(gallery[(curIdx - 1 + gallery.length) % gallery.length]);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeItem, gallery, onClose, onNavigate]);

  if (!activeItem) return null;

  const currentIdx = gallery.findIndex(item => item.id === activeItem.id || item.src === activeItem.src);
  const imgSrc = activeItem.src || resolveImg(activeItem.id);

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-6 select-none"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between text-white font-mono text-xs z-10">
        <div className="flex items-center gap-3">
          <span className="text-[#FF3B1D] font-bold">ODD HOURS</span>
          <span className="text-white/40">•</span>
          <span className="uppercase text-white/80">{activeItem.title || "Project Plate"}</span>
          {gallery.length > 1 && currentIdx !== -1 && (
            <span className="text-white/40 font-semibold">
              ({currentIdx + 1} / {gallery.length})
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setScale(s => Math.min(s + 0.3, 3))}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setScale(s => Math.max(s - 0.3, 0.7))}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button 
            onClick={() => { setScale(1); setPos({ x: 0, y: 0 }); }}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-[#FF3B1D] text-white transition-colors cursor-pointer"
            title="Close (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Stage */}
      <div 
        className="relative flex-1 flex items-center justify-center overflow-hidden my-4 cursor-grab active:cursor-grabbing"
        onMouseDown={(e) => {
          setIsPanning(true);
          startPan.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
        }}
        onMouseMove={(e) => {
          if (!isPanning) return;
          setPos({ x: e.clientX - startPan.current.x, y: e.clientY - startPan.current.y });
        }}
        onMouseUp={() => setIsPanning(false)}
        onMouseLeave={() => setIsPanning(false)}
      >
        <img 
          src={imgSrc} 
          alt={activeItem.title || "Full Resolution Plate"}
          style={{
            transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
            transition: isPanning ? 'none' : 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          className="max-h-[82vh] max-w-[92vw] w-auto h-auto object-contain drop-shadow-2xl select-none pointer-events-none"
          draggable="false"
        />

        {/* Prev / Next Chevrons */}
        {gallery.length > 1 && (
          <>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onNavigate(gallery[(currentIdx - 1 + gallery.length) % gallery.length]);
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-[#FF3B1D] text-white transition-colors cursor-pointer shadow-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onNavigate(gallery[(currentIdx + 1) % gallery.length]);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-[#FF3B1D] text-white transition-colors cursor-pointer shadow-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Caption Footer */}
      <div className="text-center font-mono text-xs text-white/70 max-w-2xl mx-auto z-10">
        <p>{activeItem.caption || activeItem.desc || activeItem.snippet}</p>
      </div>
    </div>
  );
}

/* --- 1. NAVBAR COMPONENT --- */
function Navbar() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-40 backdrop-blur-2xl transition-all duration-300 bg-white/80 border-b border-black/[0.06] text-[#1d1d1f]">
      <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Studio Identity */}
        <a 
          href="#hero" 
          onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-[#1d1d1f] text-white flex items-center justify-center font-display font-black text-xs tracking-tighter group-hover:scale-105 transition-transform shadow-xs shrink-0">
            <span>OH</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 font-display font-black text-base sm:text-lg tracking-tight text-[#1d1d1f] uppercase leading-none group-hover:opacity-80 transition-opacity">
              <span>ODD HOURS</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B1D]" />
            </div>
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-neutral-400 font-semibold mt-0.5">
              oddhours.co.in • Jinendra Parakh
            </span>
          </div>
        </a>

        {/* Smooth Scroll Navigation Links */}
        <div className="flex items-center gap-6 sm:gap-8 font-mono text-xs">
          <button 
            onClick={() => scrollTo('flagship')}
            className="text-neutral-500 hover:text-black transition-colors uppercase tracking-wider font-semibold cursor-pointer hidden sm:inline"
          >
            Works
          </button>
          <button 
            onClick={() => scrollTo('mindset')}
            className="text-neutral-500 hover:text-black transition-colors uppercase tracking-wider font-semibold cursor-pointer hidden sm:inline"
          >
            Mindset
          </button>
          
          <a 
            href="/Jinendra_Parakh_Resume.pdf" 
            target="_blank" 
            rel="noreferrer"
            className="apple-fluid-glass-btn flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer shadow-xs"
            title="Download Technical Resume"
          >
            <Download className="w-3 h-3 text-neutral-500" />
            <span>Resume</span>
          </a>

          <a 
            href="mailto:parakhjinendra@gmail.com"
            className="apple-fluid-glass-primary flex items-center gap-1.5 px-4 py-1.5 rounded-full font-bold text-xs cursor-pointer shadow-sm text-white"
          >
            <span>Contact</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white shadow-xs" />
          </a>
        </div>

      </div>
    </nav>
  );
}

/* --- 2. HERO COMPONENT (TECHNICAL ETHOS & EXACT REQUESTED COPY) --- */
function Hero() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="pt-20 sm:pt-28 pb-16 bg-white text-[#1d1d1f] border-b border-black/[0.06]">
      <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-10">
        
        {/* Top Eyebrow Status */}
        <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs uppercase tracking-widest text-neutral-500 pb-6 border-b border-black/[0.08] mb-12">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#FF3B1D] animate-pulse" />
            <span className="font-bold text-black">ODD HOURS STUDIO // ODDHOURS.CO.IN</span>
            <span className="text-neutral-300 hidden sm:inline">•</span>
            <span className="hidden sm:inline text-neutral-500">JINENDRA PARAKH • STRATE '25</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-emerald-600 font-bold text-[10px] tracking-wider uppercase">
              Available for Industrial Design Roles
            </span>
          </div>
        </div>

        {/* Main Hero Statement */}
        <div className="max-w-5xl space-y-8">
          <div className="inline-block font-mono text-[11px] font-bold text-[#FF3B1D] uppercase tracking-[0.2em]">
            // TECHNICAL FOCUS & INDUSTRIAL DESIGN PRACTICE
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[64px] font-black font-display tracking-tight leading-[1.08] text-black">
            Industrial design at the intersection of behavioral psychology and physical engineering. From rapid prototyping and CMF exploration to understanding the systemic structures of how people use everyday objects.
          </h1>

          <div className="pt-4 flex flex-wrap items-center gap-4 font-mono text-xs">
            <button 
              onClick={() => scrollTo('flagship')}
              className="apple-fluid-glass-primary inline-flex items-center gap-2.5 font-bold uppercase tracking-wider py-3.5 px-6 rounded-full shadow-sm cursor-pointer group text-white"
            >
              <span>Explore Selected Works</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>

            <button 
              onClick={() => scrollTo('mindset')}
              className="apple-fluid-glass-btn inline-flex items-center gap-2 font-bold uppercase tracking-wider text-neutral-700 hover:text-black py-3.5 px-6 rounded-full cursor-pointer shadow-xs"
            >
              <span>The Mindset</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

/* --- 3. THE FLAGSHIP (STANDOUT FULL-WIDTH PROJECT) --- */
function TheFlagship() {
  const { openLightbox } = useLightbox();

  const flagshipProject = {
    id: "p2_2",
    num: "01",
    tag: "FLAGSHIP INQUIRY",
    title: "Vantage 360°",
    subtitle: "Modular Dual-Axis Webcam Architecture",
    snippet: "Eliminating workspace clutter and video angle fatigue through an articulated 360° dual-axis boom arm, capacitive ring fill lighting, and an instant twist-and-pull magnetic pogo-pin dock between desk plinth and monitor clamp.",
    specs: ["360° Dual-Axis Articulation", "Magnetic Pogo-Pin Dock", "Sony 4K Sensor", "Sliding Privacy Shutter"],
    gallery: [
      { id: "p2_2", title: "Vantage 360° Hero Plinth Render", caption: "Vantage 360° centerpiece on CNC aluminum plinth." },
      { id: "p3_2", title: "Vantage Exploded Assembly", caption: "Full mechanical breakdown: camera module, articulated hinge, and magnetic dock." },
      { id: "p11_4", title: "Vantage Form Semantics", caption: "Orthographic perspectives detailing silicone grip rings and counterweights." }
    ]
  };

  return (
    <section id="flagship" className="py-20 sm:py-24 bg-white text-[#1d1d1f] border-b border-black/[0.06] scroll-mt-16">
      <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-10">
        
        {/* Section Header */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-black/[0.06] font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[#FF3B1D] font-bold">01 //</span>
            <span className="text-black font-bold uppercase tracking-widest">THE FLAGSHIP</span>
          </div>
          <span className="text-neutral-400 uppercase tracking-widest hidden sm:inline">
            HOVER FOR ENGINEERING PROBLEM // CLICK TO INSPECT
          </span>
        </div>

        {/* Flagship Card: Full Container Width with Strict Aspect Ratio */}
        <div 
          onClick={() => openLightbox({ src: resolveImg(flagshipProject.id), ...flagshipProject }, flagshipProject.gallery)}
          className="w-full aspect-video sm:aspect-[21/9] overflow-hidden bg-gray-100 rounded-3xl relative group cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 border border-black/[0.08]"
        >
          {/* Strict Aspect Ratio Image */}
          <img 
            src={resolveImg(flagshipProject.id)} 
            alt={flagshipProject.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Persistent Micro Badge (Top Left) */}
          <div className="absolute top-6 left-6 z-10 flex items-center gap-2 font-mono text-xs">
            <span className="px-3 py-1 rounded-full bg-black/80 text-white font-bold backdrop-blur-md">
              01 // VANTAGE 360°
            </span>
            <span className="px-3 py-1 rounded-full bg-white/90 text-neutral-800 font-semibold backdrop-blur-md hidden sm:inline">
              Hardware Architecture
            </span>
          </div>

          {/* Semi-Transparent Hover Overlay */}
          <div className="absolute inset-0 bg-black/65 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 sm:p-10 text-white">
            <div className="max-w-3xl space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs text-[#FF3B1D] uppercase font-bold tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B1D] animate-pulse" />
                <span>CORE BEHAVIORAL & ENGINEERING PROBLEM SOLVED</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-black font-display uppercase tracking-tight text-white leading-tight">
                {flagshipProject.title}
              </h3>
              <p className="font-sans text-sm sm:text-base text-neutral-200 font-light leading-relaxed">
                {flagshipProject.snippet}
              </p>
              <div className="flex flex-wrap gap-2 pt-2 font-mono text-[10px]">
                {flagshipProject.specs.map((spec, sIdx) => (
                  <span key={sIdx} className="px-2.5 py-1 rounded-full bg-white/15 text-neutral-200">
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* --- 4. THE GRID (CLEAN 2x2 GRID BELOW FLAGSHIP) --- */
function TheGrid() {
  const { openLightbox } = useLightbox();

  const gridProjects = [
    {
      id: "p18_2",
      num: "02",
      title: "Fuel Handheld",
      subtitle: "Retro-Engineered Power Architecture",
      snippet: "Transforming passive wireless charging into an active tactile ceremony through mechanical spring-loaded switch detents, digital segment status readouts, and Game Boy form ergonomics.",
      specs: ["Tactile Linear Detent Switch", "Segment LED Readout", "MagSafe Inductive Coil"],
      gallery: [
        { id: "p18_2", title: "Fuel Handheld Front View", caption: "Hero render of Fuel wireless power bank with mechanical click switch." },
        { id: "p24_2", title: "Fuel Exploded Internals", caption: "Battery architecture, inductive coil, and PCB layout." }
      ]
    },
    {
      id: "p30_2",
      num: "03",
      title: "Friday Workwear Boot",
      subtitle: "Biomechanical Adaptive Footwear",
      snippet: "Solving balance instability, ankle fatigue, and high-heel stress for larger skeletal frames (UK 11 / EU 45) through custom 3-axis CNC machined polyurethane sole geometry and a 6-step tension release lacing ceremony.",
      specs: ["UK 11 Skeletal Geometry", "3-Axis CNC Polyurethane Sole", "Monogram Release Lacing"],
      gallery: [
        { id: "p30_2", title: "Friday Boot Sculptural Silhouette", caption: "High-heel workwear boot engineered for drag performers and trans women." },
        { id: "p37_2", title: "Ergonomic Sole Toolpath", caption: "CNC polyurethane sole CAD detailing arch support." }
      ]
    },
    {
      id: "p44_2",
      num: "04",
      title: "Acoustic Glass Vessel",
      subtitle: "Harmonic Sound Instrument",
      snippet: "Exploring harmonic mid-frequency dispersion and material fragility using hand-blown borosilicate double hourglass spheres suspended in an intertwined copper wire cradle that isolates mechanical vibration.",
      specs: ["Borosilicate Double Spheres", "Intertwined Copper Suspension", "Omnidirectional Acoustic Chamber"],
      gallery: [
        { id: "p44_2", title: "Glass Vessel Studio Prototype", caption: "Hand-blown double hourglass spheres suspended in woven copper wire." }
      ]
    },
    {
      id: "p51_12",
      num: "05",
      title: "Makerspace Craft & Teardowns",
      subtitle: "Reverse Engineering & CNC Tooling",
      snippet: "Bridging digital CAD surfacing with physical tooling reality: deconstructing sneaker construction layers down to the strobel board and routing 1:1 polyurethane sole tooling on an industrial 3-axis CNC.",
      specs: ["3-Axis Industrial CNC Router", "Nike AF1 Anatomical Teardown", "High-Density Polyurethane Foam"],
      gallery: [
        { id: "p51_12", title: "CNC Sole Toolpath Routing", caption: "Milling polyurethane foam sole prototype at Strate Makerspace." },
        { id: "p47_2", title: "Footwear Anatomical Deconstruction", caption: "Deconstruction study analyzing sneaker layers and strobel stitch." }
      ]
    }
  ];

  return (
    <section id="grid" className="py-20 sm:py-24 bg-white text-[#1d1d1f] border-b border-black/[0.06] scroll-mt-16">
      <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-10">
        
        {/* Section Header */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-black/[0.06] font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[#FF3B1D] font-bold">02 //</span>
            <span className="text-black font-bold uppercase tracking-widest">SELECTED WORKS (2×2 GRID)</span>
          </div>
          <span className="text-neutral-400 uppercase tracking-widest hidden sm:inline">
            ZERO GENERIC BUTTONS // HOVER FOR BEHAVIORAL PROBLEM
          </span>
        </div>

        {/* Clean 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {gridProjects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => openLightbox({ src: resolveImg(proj.id), ...proj }, proj.gallery)}
              className="w-full aspect-[4/3] overflow-hidden bg-gray-100 rounded-2xl relative group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 border border-black/[0.06]"
            >
              {/* Strict Aspect Ratio Image with Smooth Hover Scale */}
              <img 
                src={resolveImg(proj.id)} 
                alt={proj.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />

              {/* Persistent Corner Identifier */}
              <div className="absolute top-4 left-4 z-10 font-mono text-[11px] px-3 py-1 rounded-full bg-black/75 text-white font-bold backdrop-blur-md">
                {proj.num} // {proj.title}
              </div>

              {/* Semi-Transparent Hover Overlay With Problem Snippet */}
              <div className="absolute inset-0 bg-black/70 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 sm:p-8 text-white">
                <div className="space-y-2.5">
                  <span className="font-mono text-[10px] text-[#FF3B1D] font-bold uppercase tracking-widest block">
                    // CORE BEHAVIORAL & MECHANICAL PROBLEM
                  </span>
                  <h4 className="text-xl sm:text-2xl font-black font-display uppercase tracking-tight text-white leading-tight">
                    {proj.title}
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-neutral-200 font-light leading-relaxed">
                    {proj.snippet}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1.5 font-mono text-[9px]">
                    {proj.specs.map((s, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-full bg-white/15 text-neutral-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* --- 5. THE MINDSET (PROCESS, BEHAVIORAL PSYCHOLOGY & CMF RIGOR) --- */
function TheMindset() {
  return (
    <section id="mindset" className="py-24 sm:py-28 bg-[#fafafa] text-[#1d1d1f] border-b border-black/[0.06] scroll-mt-16">
      <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-5 space-y-4">
            <span className="font-mono text-xs font-bold text-[#FF3B1D] uppercase tracking-widest block">
              03 // THE MINDSET
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-black leading-tight">
              Physical Process & Behavioral Rigor.
            </h2>
            <p className="font-sans text-base text-neutral-600 font-light leading-relaxed">
              Industrial design is not surface styling. It is understanding how physical mass, tactile friction, and human cognitive habits converge into an object people instinctively trust.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 font-sans">
            <div className="space-y-2 p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
              <span className="font-mono text-xs font-bold text-[#FF3B1D] block">01 / BEHAVIORAL PSYCHOLOGY</span>
              <h4 className="font-display font-bold text-lg uppercase text-black">Cognitive Friction & Habits</h4>
              <p className="text-xs text-neutral-600 font-light leading-relaxed">
                Examining the micro-rituals of everyday use—how hands grip a power tool, the audible feedback expected when toggling a switch, and the sub-conscious cues that signal safety and authority.
              </p>
            </div>

            <div className="space-y-2 p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
              <span className="font-mono text-xs font-bold text-[#FF3B1D] block">02 / PROTOTYPING & CNC TOOLING</span>
              <h4 className="font-display font-bold text-lg uppercase text-black">Makerspace Realization</h4>
              <p className="text-xs text-neutral-600 font-light leading-relaxed">
                Validating concepts through 1:1 physical models: 3-axis CNC polyurethane sole routing, high-density foam sculpting, and SLA resin iterations before committing to production tooling.
              </p>
            </div>

            <div className="space-y-2 p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
              <span className="font-mono text-xs font-bold text-[#FF3B1D] block">03 / CMF & SURFACE PHYSICS</span>
              <h4 className="font-display font-bold text-lg uppercase text-black">Tactile Material Contrast</h4>
              <p className="text-xs text-neutral-600 font-light leading-relaxed">
                Pairing bead-blasted anodized aluminum with satin-finish polycarbonates and vulcanized elastomers to create intentional tactile boundaries that guide the user's fingertips naturally.
              </p>
            </div>

            <div className="space-y-2 p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
              <span className="font-mono text-xs font-bold text-[#FF3B1D] block">04 / DFM SYSTEM RIGOR</span>
              <h4 className="font-display font-bold text-lg uppercase text-black">Tooling Feasibility</h4>
              <p className="text-xs text-neutral-600 font-light leading-relaxed">
                Engineering for high-yield manufacturing from day one: uniform wall thicknesses, parting line management, zero-undercut draft angles, and robust mechanical snap detents.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

/* --- 6. FOOTER / CONTACT COMPONENT --- */
function Footer() {
  return (
    <footer id="contact" className="py-20 sm:py-24 bg-white text-[#1d1d1f]">
      <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-black/[0.08]">
          <div className="md:col-span-7 space-y-6">
            <span className="font-mono text-xs font-bold text-[#FF3B1D] uppercase tracking-widest block">
              // ODD HOURS STUDIO • DIRECT INQUIRIES
            </span>
            <h3 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-black leading-tight">
              Let's build physical hardware that endures.
            </h3>
            <p className="font-sans text-base text-neutral-600 font-light leading-relaxed max-w-xl">
              ODD HOURS is the independent industrial design practice of Jinendra Parakh. Available for full-time industrial design roles, mechanical ergonomics consulting, and hardware prototyping sprints.
            </p>
          </div>

          <div className="md:col-span-5 flex flex-col justify-between space-y-6 font-mono text-xs">
            <div className="space-y-3">
              <span className="text-neutral-400 uppercase tracking-widest font-bold text-[10px] block">
                DIRECT CONTACT CHANNELS
              </span>
              <a 
                href="mailto:parakhjinendra@gmail.com"
                className="flex items-center gap-3 text-black hover:text-[#FF3B1D] transition-colors font-semibold text-sm"
              >
                <Mail className="w-4 h-4 text-[#FF3B1D]" />
                <span>parakhjinendra@gmail.com</span>
              </a>
              <a 
                href="https://oddhours.co.in"
                className="flex items-center gap-3 text-neutral-600 hover:text-black transition-colors"
              >
                <Globe className="w-4 h-4 text-[#FF3B1D]" />
                <span>oddhours.co.in</span>
              </a>
              <a 
                href="tel:+919850889899"
                className="flex items-center gap-3 text-neutral-600 hover:text-black transition-colors"
              >
                <Phone className="w-4 h-4 text-[#FF3B1D]" />
                <span>+91 9850889899</span>
              </a>
              <span className="block text-neutral-400 pt-1 text-[11px]">
                Bangalore / Pune / Maharashtra, India
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              <a 
                href="/Jinendra_Parakh_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="apple-fluid-glass-btn inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full font-bold shadow-xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Resume (PDF)</span>
              </a>
              <a 
                href="/Jinendra_Parakh_Portfolio.pdf"
                target="_blank"
                rel="noreferrer"
                className="apple-fluid-glass-primary inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full font-bold shadow-sm cursor-pointer text-white"
              >
                <span>Full 53p Deck</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Legal / Copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-neutral-400 text-[11px] font-mono">
          <div>
            © {new Date().getFullYear()} ODD HOURS STUDIO // JINENDRA PARAKH (ODDHOURS.CO.IN). ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-4 uppercase tracking-wider text-[10px]">
            <span>STRATE SCHOOL OF DESIGN</span>
            <span className="text-[#FF3B1D] font-bold">ODDHOURS.CO.IN • 2025</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

/* --- 7. MAIN SINGLE-PAGE APP --- */
export default function App() {
  const [lightboxState, setLightboxState] = useState({
    activeItem: null,
    gallery: []
  });

  useEffect(() => {
    document.title = "ODD HOURS — Jinendra Parakh | Industrial Design (oddhours.co.in)";
  }, []);

  const openLightbox = (imgData, galleryList = []) => {
    setLightboxState({
      activeItem: imgData,
      gallery: galleryList && galleryList.length ? galleryList : [imgData]
    });
  };

  const closeLightbox = () => {
    setLightboxState({ activeItem: null, gallery: [] });
  };

  const navigateLightbox = (nextItem) => {
    setLightboxState(prev => ({ ...prev, activeItem: nextItem }));
  };

  return (
    <LightboxContext.Provider value={{ openLightbox, closeLightbox }}>
      <Router>
        <div className="min-h-screen bg-[#ffffff] text-[#1d1d1f] font-sans selection:bg-[#FF3B1D] selection:text-white flex flex-col">
          <Navbar />
          
          <main className="flex-grow">
            <Routes>
              {/* Single Homepage Flow */}
              <Route path="*" element={
                <>
                  <Hero />
                  <TheFlagship />
                  <TheGrid />
                  <TheMindset />
                </>
              } />
            </Routes>
          </main>

          <Footer />

          {/* Lightbox for High-Resolution Plate Inspection */}
          <ImageLightboxModal 
            activeItem={lightboxState.activeItem}
            gallery={lightboxState.gallery}
            onClose={closeLightbox}
            onNavigate={navigateLightbox}
          />
        </div>
      </Router>
    </LightboxContext.Provider>
  );
}