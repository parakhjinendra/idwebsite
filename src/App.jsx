import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route 
} from 'react-router-dom';
import { 
  ArrowUpRight, 
  ArrowDown, 
  X, 
  Download, 
  ExternalLink,
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Mail,
  Phone,
  Globe,
  ChevronRight,
  ChevronLeft,
  Layers
} from 'lucide-react';
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useTransform, 
  useSpring 
} from 'framer-motion';
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

/* =========================================================================
   AUTHENTIC 53-PAGE PORTFOLIO DATA (EXACT SEQUENTIAL ORDER: NO SHUFFLING)
   01. Fuel (p.04-12) -> 02. Vantage (p.13-30) -> 03. Friday (p.31-42) -> 04. Miscellaneous (p.43-52)
   ========================================================================= */
export const PORTFOLIO_PROJECTS = [
  /* --- 01. FUEL (PAGES 04 — 12) --- */
  {
    num: "01",
    slug: "fuel",
    title: "Fuel",
    subtitle: "Power bank × Retro-engineering",
    duration: "1 Week",
    projectType: "Individual Project",
    cmf: "Matte Polycarbonate • VDI 3400 • CNC Aluminum Rim",
    year: "2024",
    coverId: "p10_2",
    slidesCount: 9,
    pagesRange: "p.04 — p.12",
    slides: [
      { page: 4, id: "p4_2", title: "01 Fuel — Cover", section: "Initiation", desc: "Fuel is a wireless power bank inspired from retro engineering style. It effortlessly marries soft, flowing lines with sharp, edged contrasts." },
      { page: 5, id: "p5_2", title: "The Problem & Brief", section: "Initiation", desc: "Power banks often lack aesthetic appeal, clashing with the refined designs of modern smartphones. Bland bricks and disconnected monolithic design." },
      { page: 6, id: "p6_2", title: "Teenage Engineering Inspiration", section: "Concept", desc: "Design philosophy of 'Play everywhere' — technology should be fun and easy to use, inspired by TX-6 audio ergonomics." },
      { page: 7, id: "p7_2", title: "Ideation & Form Exploration", section: "Concept", desc: "Early exploratory sketches investigating exposed frames, morphing glass, and form volume." },
      { page: 8, id: "p8_2", title: "Switch & Charge Indicator", section: "Concept", desc: "Audible click power switch, segment digital charge indicator, magnetic wireless panel, and lanyard hook." },
      { page: 9, id: "p9_2", title: "Technical Drawing & Blueprint", section: "Technical", desc: "Complete orthographic blueprint: 79.94mm length, 51.8mm width, 8.5mm profile, detail sections A(2:1), B(2:1), C(2:1)." },
      { page: 10, id: "p10_2", title: "Final Solution — Form Orthographics", section: "Solution", desc: "Front, profile, and rear renders showing vibrant orange woven lanyard and circular inductive charging interface." },
      { page: 11, id: "p11_4", title: "Exploded View & Contrasts", section: "Solution", desc: "Internal breakdown: aluminum shell, PCB assembly, lithium cell, inductive coil, and orange lanyard anchor." },
      { page: 12, id: "p12_2", title: "Tactile CMF & Details", section: "Solution", desc: "Detailed close-ups: bead-blasted aluminum chamfers, cast metal loop, and spring mechanical slider." }
    ]
  },

  /* --- 02. VANTAGE (PAGES 13 — 30) --- */
  {
    num: "02",
    slug: "vantage",
    title: "Vantage",
    subtitle: "Adaptive 360° Webcam Architecture",
    duration: "3 Weeks",
    projectType: "Individual Project",
    cmf: "Anodized 6061 Aluminum • Sandblasted 120# • Optical Glass",
    year: "2025",
    coverId: "p2_2",
    slidesCount: 18,
    pagesRange: "p.13 — p.30",
    slides: [
      { page: 13, id: "p13_2", title: "02 Vantage — Cover", section: "Initiation", desc: "Vantage is a versatile webcam that transforms video calls, presentations, and streaming into immersive experiences." },
      { page: 14, id: "p14_2", title: "Market Research", section: "Initiation", desc: "Global webcam market projected to reach $18.85B by 2029 (CAGR 14.3%). Rise of hybrid work, video conferencing, and online education." },
      { page: 15, id: "p15_2", title: "Identified Problems", section: "Initiation", desc: "Fixed camera angles, bland one-dimensional experience, cluttered workspaces, and multi-device dilemma." },
      { page: 16, id: "p16_2", title: "Pain Points Synthesis", section: "Initiation", desc: "Modularity & portability, fixed camera angles, bulky mounts, and lack of device integration." },
      { page: 17, id: "p17_2", title: "Inspiration Board", section: "Concept", desc: "Minimal, honest, adaptive, intuitive, modular (Nintendo Switch, dial ergonomics, minimal lamps)." },
      { page: 18, id: "p18_2", title: "Ideation Sketches", section: "Concept", desc: "Articulated boom arm concepts, sliding rail counterweights, magnetic docking heads." },
      { page: 19, id: "p19_2", title: "Introducing Vantage", section: "Solution", desc: "Adaptive webcam with flexible boom arm, integrated capacitive ring fill lighting, and dual mounting modes." },
      { page: 20, id: "p20_4", title: "360° Freedom of Movement", section: "Solution", desc: "Dual-axis articulation: 360° pan, 360° rotation, horizontal slide, vertical slot adjustment, and click fill light." },
      { page: 21, id: "p21_2", title: "Dimensions & Ceremony", section: "Solution", desc: "323mm boom arm, 400mm stand, 70mm camera barrel, 15mm base. 4-step ritual: Connect, Adjust, Set, Frame." },
      { page: 22, id: "p22_2", title: "Kitchen Culinary Scenario", section: "Solution", desc: "Pivoting mount providing 360° rotational freedom for live cooking demonstrations." },
      { page: 23, id: "p23_2", title: "Informal Desk Scenario", section: "Solution", desc: "Flexible vertical slide positioning for relaxed ergonomic video calls." },
      { page: 24, id: "p24_2", title: "Twist-and-Pull Magnetic Dock", section: "Solution", desc: "One press, twist, and pull transforms camera from desk stand to compact monitor mount via pogo-pin interface." },
      { page: 25, id: "p25_2", title: "Monitor Mount Architecture", section: "Solution", desc: "Soft-touch padding, snap cap rubber protector, one-press capture button." },
      { page: 26, id: "p26_2", title: "360° Precision & Privacy Shutter", section: "Solution", desc: "Mechanical physical sliding privacy shutter and motorized auto-framing tracking." },
      { page: 27, id: "p27_2", title: "Lens & Lock Mechanism", section: "Solution", desc: "Close-up detailing ring fill light diffuser, optical glass lens, and physical lock button." },
      { page: 28, id: "p28_2", title: "Use Case Scenarios", section: "Solution", desc: "Facial auto-framing, whiteboard presentations, and top-down overhead document sketching." },
      { page: 29, id: "p29_2", title: "Student Study Desk Scenario", section: "Solution", desc: "Compact monitor mount perched on laptop display for online classroom interaction." },
      { page: 30, id: "p30_2", title: "Executive Studio Workspace", section: "Solution", desc: "Dual-monitor professional studio environment with discreet high-fidelity streaming." }
    ]
  },

  /* --- 03. FRIDAY (PAGES 31 — 42) --- */
  {
    num: "03",
    slug: "friday",
    title: "Friday",
    subtitle: "Friday Heels × Louis Vuitton",
    duration: "6 Weeks",
    projectType: "Team Project",
    cmf: "Milled High-Density PU • High-Gloss Lacquer • Full-Grain Leather",
    year: "2025",
    coverId: "p31_2",
    slidesCount: 12,
    pagesRange: "p.31 — p.42",
    slides: [
      { page: 31, id: "p31_2", title: "03 Friday — Cover", section: "Initiation", desc: "Friday shoe: a high-heeled boot designed exclusively for men in collaboration with Louis Vuitton." },
      { page: 32, id: "p32_2", title: "FRIDAY as a Brand", section: "Initiation", desc: "Translating the dynamic release of the weekend through traditional craftsmanship and striking metal highlights." },
      { page: 33, id: "p33_2", title: "Historical Context & Market", section: "Initiation", desc: "Tracing heels from royalty and kings to high-fashion revival by Balenciaga and Christian Louboutin." },
      { page: 34, id: "p34_2", title: "Project Brief", section: "Initiation", desc: "Design a high-heeled boot for men that weaves together traditional masculinity and contemporary boldness." },
      { page: 35, id: "p35_2", title: "Concept Directions", section: "Concept", desc: "Exploring Authoritative, Dynamic, and Hulk silhouettes with gel cups, dial lacing, and 3D midsoles." },
      { page: 36, id: "p36_2", title: "Ideation Sketches", section: "Concept", desc: "Faceted architectural heel concepts, monogram placement studies, and collar lines." },
      { page: 37, id: "p37_2", title: "3D Printed Shield & Heel", section: "Solution", desc: "3D printed protective heel shield — the elegant protector of a king. Heel elevation raising the bar." },
      { page: 38, id: "p38_2", title: "Monogram & Branding", section: "Solution", desc: "Dazzling Louis Vuitton monogram dial and Louis Vuitton x Friday branding bridging the heel." },
      { page: 39, id: "p39_2", title: "Wearable Guide: 6-Step Ceremony", section: "Solution", desc: "Initiate Elegance ➔ Prelude to Opulence ➔ Engage the Ritual ➔ Confer Regality ➔ Harmonize Comfort ➔ Culminate the Ceremony." },
      { page: 40, id: "p40_2", title: "Orthographic & Exploded View", section: "Solution", desc: "Exploded architecture: outsole, heel block, insole shank, upper leather sleeve, and 3D printed monogram shield." },
      { page: 41, id: "p41_2", title: "Physical Prototype (UK 11 / 1:1)", section: "Prototyping", desc: "1:1 physical prototyping at Strate Makerspace: 3-axis CNC sole routing, high-density foam, and clay sculpting." },
      { page: 42, id: "p42_2", title: "Campaign Editorial Render", section: "Campaign", desc: "Dramatic high-fashion campaign visual featuring grand piano editorial aesthetic." }
    ]
  },

  /* --- 04. MISCELLANEOUS (PAGES 43 — 52) --- */
  {
    num: "04",
    slug: "miscellaneous",
    title: "Miscellaneous",
    subtitle: "Sketches, Prototypes & Detours",
    duration: "Ongoing",
    projectType: "Exploration Archive",
    cmf: "Borosilicate Glass • Copper Wire • Polyurethane • Vizcom AI",
    year: "2024–2025",
    coverId: "p44_2",
    slidesCount: 10,
    pagesRange: "p.43 — p.52",
    slides: [
      { page: 43, id: "p1_2", title: "04 Miscellaneous — Cover", section: "Archive", desc: "A collection of sketches, prototypes, and creative detours showing different stages of thinking and making." },
      { page: 44, id: "p44_2", title: "Acoustic Glass Vessel — Orthographics", section: "Glass Vessel", desc: "Hand-blown borosilicate double hourglass spheres suspended in an intertwined copper wire cradle." },
      { page: 45, id: "p45_2", title: "Glass Vessel — Perspective & Details", section: "Glass Vessel", desc: "Top aperture and wire cradle detail isolating acoustic resonance." },
      { page: 46, id: "p46_2", title: "Industrial Design Sketches", section: "Sketches", desc: "Technical backpacks, mid-century lounge chairs, and athletic sneakers." },
      { page: 47, id: "p47_2", title: "Analysis of a Sneaker", section: "Footwear", desc: "Anatomical analysis: shoe tongue, toe counter, foxing, PU rubber outsole, and toe spring." },
      { page: 48, id: "p48_2", title: "Layered Footwear Deconstruction", section: "Footwear", desc: "Shoe upper PU leather, tongue lining, polyester padding, and insole construction." },
      { page: 49, id: "p49_2", title: "Nike Air Force 1 Deep Dive", section: "Footwear", desc: "AF1 reverse engineering: medallion hole pattern, double stitching, and Nike Air sole unit." },
      { page: 50, id: "p50_2", title: "Vizcom Generative AI Trials", section: "Generative", desc: "Translating hand-drawn chronograph sketches into generative photoreal concept passes." },
      { page: 51, id: "p51_12", title: "Models & Prototypes (Makerspace)", section: "Physical Making", desc: "High-gloss styling clay heels, physical speaker foam mockups, and 3-axis CNC polyurethane sole toolpaths." },
      { page: 52, id: "p52_2", title: "Spandigit Social — Internship", section: "Industry", desc: "Digital Marketing Intern (June - July 2023): aligning audience behavioral preferences with physical design." }
    ]
  }
];

/* --- LIGHTBOX CONTEXT --- */
const LightboxContext = createContext({
  openLightbox: (imgData, galleryList = []) => {},
  closeLightbox: () => {}
});

export function useLightbox() {
  return useContext(LightboxContext);
}

/* --- APPLE FLUID CUSTOM CURSOR --- */
function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState('default'); // 'default' | 'view' | 'pointer'
  const [isVisible, setIsVisible] = useState(false);

  const springX = useSpring(mousePos.x, { stiffness: 450, damping: 32 });
  const springY = useSpring(mousePos.y, { stiffness: 450, damping: 32 });

  useEffect(() => {
    springX.set(mousePos.x);
    springY.set(mousePos.y);
  }, [mousePos, springX, springY]);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);
      setMousePos({ x: e.clientX, y: e.clientY });

      const target = e.target;
      if (target.closest('[data-cursor="view"]')) {
        setCursorType('view');
      } else if (
        target.closest('button') || 
        target.closest('a') || 
        target.closest('.cursor-pointer') ||
        target.tagName === 'BUTTON' || 
        target.tagName === 'A'
      ) {
        setCursorType('pointer');
      } else {
        setCursorType('default');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible || typeof window === 'undefined') return null;

  return (
    <motion.div
      style={{
        left: springX,
        top: springY,
        translateX: '-50%',
        translateY: '-50%'
      }}
      className="fixed pointer-events-none z-50 flex items-center justify-center transition-all duration-200"
    >
      {cursorType === 'view' ? (
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          className="w-16 h-16 rounded-full bg-white/90 text-black font-mono text-[10px] font-black uppercase tracking-widest flex items-center justify-center shadow-2xl backdrop-blur-xl border border-white/60"
        >
          VIEW
        </motion.div>
      ) : cursorType === 'pointer' ? (
        <motion.div 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1.4 }}
          className="w-5 h-5 rounded-full bg-[#FF3B1D]/20 border border-[#FF3B1D] backdrop-blur-xs"
        />
      ) : (
        <div className="w-2.5 h-2.5 rounded-full bg-[#1d1d1f]" />
      )}
    </motion.div>
  );
}

/* --- LIGHTBOX MODAL: STRICT CHRONOLOGICAL SLIDE INSPECTION --- */
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
      className="fixed inset-0 z-50 bg-black/92 backdrop-blur-3xl flex flex-col justify-between p-4 sm:p-6 select-none"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between text-white font-mono text-xs z-10">
        <div className="flex items-center gap-3">
          <span className="text-[#FF3B1D] font-black">ODD HOURS</span>
          <span className="text-white/40">•</span>
          <span className="uppercase text-white/90 font-bold tracking-wider">
            {activeItem.title || "Portfolio Slide"}
          </span>
          {activeItem.page && (
            <span className="px-2 py-0.5 rounded bg-white/10 text-[#FF3B1D] font-bold text-[10px]">
              PAGE {String(activeItem.page).padStart(2, '0')}
            </span>
          )}
          {gallery.length > 1 && currentIdx !== -1 && (
            <span className="text-white/40 font-semibold hidden sm:inline">
              (Slide {currentIdx + 1} of {gallery.length})
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
            title="Reset Zoom"
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

      {/* Center Stage */}
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
          alt={activeItem.title || "Full Resolution Portfolio Slide"}
          style={{
            transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
            transition: isPanning ? 'none' : 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          className="max-h-[80vh] max-w-[92vw] w-auto h-auto object-contain drop-shadow-2xl select-none pointer-events-none"
          draggable="false"
        />

        {/* Previous & Next Arrow Buttons */}
        {gallery.length > 1 && (
          <>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onNavigate(gallery[(currentIdx - 1 + gallery.length) % gallery.length]);
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-[#FF3B1D] text-white transition-colors cursor-pointer shadow-xl backdrop-blur-md"
              title="Previous Slide (←)"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onNavigate(gallery[(currentIdx + 1) % gallery.length]);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-[#FF3B1D] text-white transition-colors cursor-pointer shadow-xl backdrop-blur-md"
              title="Next Slide (→)"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Bottom Filmstrip Thumbnails & Slide Description */}
      <div className="z-10 space-y-3 max-w-4xl mx-auto w-full">
        {/* Caption */}
        <div className="text-center font-mono text-xs text-white/80 line-clamp-2 px-4">
          <p>{activeItem.desc || activeItem.caption || activeItem.cmf}</p>
        </div>

        {/* Filmstrip Strip in Exact Sequence */}
        {gallery.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar p-2 bg-white/5 rounded-2xl backdrop-blur-md border border-white/10 max-h-20">
            {gallery.map((slide, sIdx) => {
              const isSelected = sIdx === currentIdx;
              return (
                <button
                  key={sIdx}
                  onClick={(e) => { e.stopPropagation(); onNavigate(slide); }}
                  className={`relative shrink-0 h-14 aspect-[16/9] rounded-lg overflow-hidden border transition-all cursor-pointer ${
                    isSelected ? 'border-[#FF3B1D] ring-2 ring-[#FF3B1D]/40 scale-105' : 'border-white/20 opacity-50 hover:opacity-100'
                  }`}
                  title={`Page ${slide.page}: ${slide.title}`}
                >
                  <img 
                    src={resolveImg(slide.id)} 
                    alt={slide.title} 
                    className="w-full h-full object-cover" 
                  />
                  <span className="absolute bottom-1 right-1 text-[8px] font-mono px-1 rounded bg-black/80 text-white font-bold">
                    p.{slide.page}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/* --- 1. FLOATING MINIMAL NAVBAR --- */
function Navbar() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 inset-x-0 z-40 transition-all duration-300 pointer-events-none p-4 sm:p-6">
      <div className="max-w-[1440px] w-full mx-auto flex items-center justify-between">
        
        {/* Brand Capsule */}
        <a 
          href="#hero" 
          onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}
          className="pointer-events-auto flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 backdrop-blur-xl border border-white/60 shadow-lg hover:bg-white transition-all cursor-pointer group"
        >
          <div className="w-5 h-5 rounded bg-black text-white flex items-center justify-center font-display font-black text-[10px] tracking-tighter">
            OH
          </div>
          <span className="font-display font-black text-xs sm:text-sm tracking-tight text-black uppercase leading-none">
            ODD HOURS
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B1D]" />
        </a>

        {/* Sequential Project Tabs & Actions */}
        <div className="pointer-events-auto flex items-center gap-2 font-mono text-xs">
          <div className="hidden md:flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/80 backdrop-blur-xl border border-white/60 shadow-xs mr-2">
            {PORTFOLIO_PROJECTS.map((p) => (
              <button
                key={p.slug}
                onClick={() => scrollTo(`project-${p.slug}`)}
                className="px-3 py-1 rounded-full text-neutral-600 hover:text-black font-semibold text-[11px] transition-colors cursor-pointer"
              >
                <span className="text-[#FF3B1D] font-bold mr-1">{p.num}</span>
                <span>{p.title}</span>
              </button>
            ))}
          </div>

          <a 
            href="/Jinendra_Parakh_Resume.pdf" 
            target="_blank" 
            rel="noreferrer"
            className="px-4 py-2 rounded-full bg-white/80 backdrop-blur-xl border border-white/60 text-neutral-800 hover:text-black font-semibold shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
            title="Download Technical Resume"
          >
            <Download className="w-3 h-3 text-neutral-500" />
            <span className="hidden sm:inline">Resume</span>
          </a>

          <a 
            href="mailto:parakhjinendra@gmail.com"
            className="px-4 py-2 rounded-full bg-[#1d1d1f] hover:bg-black text-white font-bold shadow-md transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>Contact</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B1D]" />
          </a>
        </div>

      </div>
    </nav>
  );
}

/* --- 2. THE HERO: THE HOOK & FIDGET (SCROLL-LINKED SPATIAL ZOOM) --- */
function TheHero() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.75], [1, 0.9]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.75], [0, 48]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 0.95], [1, 0.9, 0.25]);
  const headlineY = useTransform(scrollYProgress, [0, 0.7], [0, 80]);

  return (
    <section 
      id="hero" 
      ref={containerRef} 
      className="relative min-h-[135vh] bg-[#ffffff] flex flex-col items-center"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden p-0 sm:p-4 md:p-6">
        <motion.div 
          style={{ scale, borderRadius, opacity }}
          className="relative w-full h-full overflow-hidden bg-[#0d0d0f] shadow-2xl flex items-center justify-center will-change-transform"
        >
          {/* Edge-to-Edge High-Resolution Render */}
          <img 
            src={resolveImg("p10_2")} 
            alt="Fuel Retro-Engineering Hardware"
            className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
            priority="true"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/60 pointer-events-none" />

          {/* Ultra-Minimal High-Contrast Headline */}
          <motion.div 
            style={{ y: headlineY }}
            className="relative z-10 max-w-5xl mx-auto px-6 sm:px-12 text-center flex flex-col items-center space-y-4"
          >
            <motion.span 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-mono text-xs uppercase tracking-[0.3em] text-[#FF3B1D] font-bold"
            >
              PORTFOLIO PRODUCT DESIGN 2025 // JINENDRA PARAKH
            </motion.span>

            <motion.h1 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25 }}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-[104px] font-black font-display tracking-[-0.04em] leading-[0.92] uppercase text-white drop-shadow-xl"
            >
              Form & <br />
              <span className="text-white/60 font-light normal-case">Physical Rigor.</span>
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="pt-8 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-white/60"
            >
              <span>Scroll to Explore 4 Inquiries</span>
              <ArrowDown className="w-3.5 h-3.5 text-[#FF3B1D] animate-bounce" />
            </motion.div>
          </motion.div>

          <div className="absolute bottom-8 left-8 sm:bottom-10 sm:left-10 z-10 font-mono text-[10px] text-white/50 uppercase tracking-widest hidden sm:block">
            01. FUEL • 02. VANTAGE • 03. FRIDAY • 04. MISCELLANEOUS
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* --- 3. THE "BENTO BOX" GRID (EXACT PDF SEQUENCE: 01 FUEL, 02 VANTAGE, 03 FRIDAY, 04 MISC) --- */
function BentoGrid() {
  const { openLightbox } = useLightbox();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Cards strictly arranged in the PDF sequence: 01 Fuel -> 02 Vantage -> 03 Friday -> 04 Misc
  const bentoProjects = [
    {
      ...PORTFOLIO_PROJECTS[0], // 01 Fuel
      span: "col-span-12 lg:col-span-7",
      aspect: "aspect-[16/10] sm:aspect-[16/9]"
    },
    {
      ...PORTFOLIO_PROJECTS[1], // 02 Vantage
      span: "col-span-12 lg:col-span-5",
      aspect: "aspect-[4/3] lg:aspect-auto lg:h-full"
    },
    {
      ...PORTFOLIO_PROJECTS[2], // 03 Friday
      span: "col-span-12 sm:col-span-6 lg:col-span-6",
      aspect: "aspect-[4/3] sm:aspect-[16/10]"
    },
    {
      ...PORTFOLIO_PROJECTS[3], // 04 Miscellaneous
      span: "col-span-12 sm:col-span-6 lg:col-span-6",
      aspect: "aspect-[4/3] sm:aspect-[16/10]"
    }
  ];

  return (
    <section id="bento" className="py-24 sm:py-32 bg-[#ffffff] text-[#1d1d1f]">
      <div className="max-w-[1440px] w-full mx-auto px-6 sm:px-10">
        
        {/* Section Header */}
        <div className="flex items-center justify-between pb-8 mb-10 border-b border-black/[0.06] font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[#FF3B1D] font-bold">CONTENTS //</span>
            <span className="text-black font-bold uppercase tracking-widest">SELECTED WORKS IN SEQUENCE</span>
          </div>
          <span className="text-neutral-400 uppercase tracking-widest hidden sm:inline">
            EXACT PDF ORDER (01 ➔ 04) • VERTICAL CASE STUDY FEED
          </span>
        </div>

        {/* Asymmetrical Apple Bento Grid in PDF Sequence */}
        <div className="grid grid-cols-12 gap-6 sm:gap-8">
          {bentoProjects.map((item, idx) => (
            <motion.div
              key={item.slug}
              id={`bento-${item.slug}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              data-cursor="view"
              onClick={() => scrollTo(`project-${item.slug}`)}
              className={`${item.span} relative rounded-3xl overflow-hidden bg-white/70 backdrop-blur-md border border-black/[0.08] shadow-sm hover:shadow-2xl transition-all duration-500 ease-out group cursor-pointer hover:scale-[1.015] active:scale-[0.99]`}
            >
              <div className={`w-full ${item.aspect} overflow-hidden bg-neutral-100 relative`}>
                <img 
                  src={resolveImg(item.coverId)} 
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out select-none"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                {/* Top Corner Index Badge */}
                <div className="absolute top-5 left-5 z-10 flex items-center gap-2 font-mono text-xs">
                  <span className="px-3 py-1 rounded-full bg-black/80 text-white font-black tracking-wider">
                    {item.num} // {item.title.toUpperCase()}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/90 text-neutral-800 font-bold text-[10px] hidden sm:inline">
                    {item.pagesRange} ({item.slidesCount} PLATES)
                  </span>
                </div>

                {/* Ultra-Minimal Micro-Copy (Name, CMF, Year) in Bottom Corner */}
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white pointer-events-none z-10">
                  <div className="space-y-1 max-w-xl">
                    <h3 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-white leading-tight drop-shadow-md">
                      {item.title}
                    </h3>
                    <p className="font-mono text-xs text-white/85 font-light tracking-wide drop-shadow-sm line-clamp-1">
                      {item.cmf}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 pl-4 shrink-0 font-mono text-xs text-white/80">
                    <span className="font-bold tracking-widest">{item.year}</span>
                    <ArrowDown className="w-4 h-4 text-[#FF3B1D] group-hover:translate-y-1 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* --- 4. SEQUENTIAL PROJECT CHAPTERS (VERTICAL SCROLL THROUGH ALL SLIDES) --- */
function SequentialProjectExhibition() {
  const { openLightbox } = useLightbox();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-16 sm:py-24 bg-[#fafafa] border-t border-black/[0.06] text-[#1d1d1f]">
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-8 lg:px-12 space-y-28 sm:space-y-36">
        
        {PORTFOLIO_PROJECTS.map((proj, pIdx) => {
          const nextProj = PORTFOLIO_PROJECTS[pIdx + 1];

          return (
            <div 
              key={proj.slug} 
              id={`project-${proj.slug}`} 
              className="scroll-mt-24 space-y-10 sm:space-y-14"
            >
              
              {/* Sticky Chapter Sub-Navigation Header */}
              <div className="sticky top-[64px] sm:top-[76px] z-30 py-3 sm:py-4 px-5 sm:px-8 rounded-2xl sm:rounded-full bg-white/85 backdrop-blur-xl border border-black/[0.08] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FF3B1D] text-white font-mono font-bold text-[11px] tracking-wider">
                    {proj.num}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black font-display uppercase tracking-tight text-black">
                    {proj.title}
                  </h3>
                  <span className="hidden sm:inline text-neutral-300 font-light">•</span>
                  <p className="font-mono text-xs text-neutral-500 uppercase tracking-wider hidden sm:inline">
                    {proj.subtitle}
                  </p>
                  <span className="px-2 py-0.5 rounded bg-black/5 text-neutral-600 font-mono text-[10px] font-bold">
                    {proj.pagesRange} ({proj.slidesCount} Plates)
                  </span>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 self-end md:self-auto font-mono text-xs">
                  {nextProj ? (
                    <button
                      onClick={() => scrollTo(`project-${nextProj.slug}`)}
                      className="px-3.5 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Next: {nextProj.num} {nextProj.title}</span>
                      <ArrowDown className="w-3 h-3 text-[#FF3B1D]" />
                    </button>
                  ) : (
                    <button
                      onClick={() => scrollTo('contact')}
                      className="px-3.5 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Contact</span>
                      <ArrowDown className="w-3 h-3 text-[#FF3B1D]" />
                    </button>
                  )}

                  <button
                    onClick={() => openLightbox(proj.slides[0], proj.slides)}
                    className="apple-fluid-glass-primary inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-white font-bold uppercase tracking-wider shadow-xs cursor-pointer"
                    title="Open Fullscreen Lightbox Inspector"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Fullscreen</span>
                  </button>
                </div>
              </div>

              {/* Vertical Slide Stream in EXACT 1-to-1 Sequence */}
              <div className="flex flex-col space-y-10 sm:space-y-16 max-w-5xl mx-auto w-full">
                {proj.slides.map((slide, sIdx) => (
                  <div
                    key={`${proj.slug}-slide-${slide.page}-${sIdx}`}
                    className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-black/[0.08] shadow-xs hover:shadow-xl transition-all duration-300"
                  >
                    {/* Top Plate Metadata Bar */}
                    <div className="px-5 py-3 sm:px-7 sm:py-4 bg-[#fbfbfd] border-b border-black/[0.05] flex items-center justify-between font-mono text-xs">
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-black text-white font-bold text-[10px] tracking-wider">
                          PAGE {String(slide.page).padStart(2, '0')}
                        </span>
                        <span className="text-[#FF3B1D] font-bold uppercase tracking-wider text-[11px]">
                          {slide.section}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-neutral-500 font-sans font-bold text-xs uppercase tracking-tight hidden md:inline">
                          {slide.title}
                        </span>
                        <button
                          onClick={() => openLightbox(slide, proj.slides)}
                          className="p-1 rounded-full text-neutral-400 hover:text-black hover:bg-black/5 transition-colors cursor-pointer"
                          title="View High-Res Fullscreen"
                        >
                          <ZoomIn className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* High-Resolution Presentation Plate */}
                    <div 
                      onClick={() => openLightbox(slide, proj.slides)}
                      className="relative w-full bg-[#f4f4f6] flex items-center justify-center p-3 sm:p-6 md:p-8 cursor-pointer overflow-hidden group/plate"
                      title="Click to inspect plate in full resolution"
                    >
                      <img
                        src={resolveImg(slide.id)}
                        alt={`${proj.title} - ${slide.title} (Page ${slide.page})`}
                        className="w-full max-h-[85vh] object-contain rounded-xl sm:rounded-2xl transition-transform duration-500 group-hover/plate:scale-[1.01] shadow-2xs"
                        loading="lazy"
                      />

                      {/* Hover Glass Badge */}
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/plate:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <div className="px-4 py-2 rounded-full bg-black/80 backdrop-blur-md text-white font-mono text-xs font-bold flex items-center gap-2 shadow-2xl">
                          <ZoomIn className="w-3.5 h-3.5 text-[#FF3B1D]" />
                          <span>Inspect Page {slide.page}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Technical Rationale & CMF Micro-Copy */}
                    <div className="px-5 py-4 sm:px-7 sm:py-4.5 bg-white border-t border-black/[0.04] flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs">
                      <p className="text-neutral-600 leading-relaxed max-w-3xl">
                        {slide.desc}
                      </p>
                      {slide.cmf && (
                        <span className="shrink-0 text-[10px] uppercase tracking-wider text-neutral-400 font-medium">
                          {slide.cmf}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* End of Project Jump Divider */}
              <div className="pt-8 pb-4 flex justify-center">
                {nextProj ? (
                  <button
                    onClick={() => scrollTo(`project-${nextProj.slug}`)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-neutral-100 border border-black/10 text-neutral-800 font-mono text-xs font-bold uppercase tracking-wider shadow-xs hover:shadow-md transition-all cursor-pointer group"
                  >
                    <span>Scroll to Project {nextProj.num} // {nextProj.title}</span>
                    <ArrowDown className="w-3.5 h-3.5 text-[#FF3B1D] group-hover:translate-y-0.5 transition-transform" />
                  </button>
                ) : (
                  <button
                    onClick={() => scrollTo('contact')}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-neutral-100 border border-black/10 text-neutral-800 font-mono text-xs font-bold uppercase tracking-wider shadow-xs hover:shadow-md transition-all cursor-pointer group"
                  >
                    <span>Proceed to Page 53 // Contact</span>
                    <ArrowDown className="w-3.5 h-3.5 text-[#FF3B1D] group-hover:translate-y-0.5 transition-transform" />
                  </button>
                )}
              </div>

            </div>
          );
        })}

      </div>
    </section>
  );
}

/* --- 5. ULTRA-MINIMAL CONTACT SIGN-OFF --- */
function ContactSection() {
  return (
    <footer id="contact" className="py-20 sm:py-28 bg-[#ffffff] border-t border-black/[0.06] text-[#1d1d1f]">
      <div className="max-w-[1440px] w-full mx-auto px-6 sm:px-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-16 border-b border-black/[0.08]">
          <div className="space-y-3">
            <span className="font-mono text-xs font-bold text-[#FF3B1D] uppercase tracking-widest block">
              PAGE 53 // LET'S CONNECT
            </span>
            <h2 className="text-4xl sm:text-6xl font-black font-display uppercase tracking-tight text-black leading-none">
              oddhours.co.in
            </h2>
            <p className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
              Jinendra Parakh • Industrial Design • Strate School of Design '25
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <a 
              href="mailto:parakhjinendra@gmail.com"
              className="px-5 py-3 rounded-full bg-[#1d1d1f] hover:bg-black text-white font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-[#FF3B1D]" />
              <span>parakhjinendra@gmail.com</span>
            </a>

            <a 
              href="tel:+919850889899"
              className="px-5 py-3 rounded-full bg-white hover:bg-neutral-100 border border-black/10 text-neutral-800 font-semibold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-neutral-500" />
              <span>+91 9850889899</span>
            </a>

            <a 
              href="https://www.linkedin.com/in/jinendra-parakh-7b643a228"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-full bg-white hover:bg-neutral-100 border border-black/10 text-neutral-800 font-semibold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-neutral-500" />
              <span>LinkedIn</span>
            </a>

            <a 
              href="/Jinendra_Parakh_Portfolio.pdf"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-full bg-white hover:bg-neutral-100 border border-black/10 text-neutral-800 font-semibold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-neutral-500" />
              <span>53p PDF Deck</span>
            </a>
          </div>
        </div>

        {/* Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-neutral-400 text-[11px] font-mono">
          <div>
            © {new Date().getFullYear()} JINENDRA PARAKH // ODD HOURS STUDIO. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-4 uppercase tracking-wider text-[10px]">
            <span>BANGALORE / PUNE / MAHARASHTRA</span>
            <span className="text-[#FF3B1D] font-bold">ODDHOURS.CO.IN</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

/* --- 6. MAIN ROOT APP --- */
export default function App() {
  const [lightboxState, setLightboxState] = useState({
    activeItem: null,
    gallery: []
  });

  useEffect(() => {
    document.title = "Jinendra Parakh | Product Design Portfolio 2025 (oddhours.co.in)";
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
        <div className="min-h-screen bg-[#ffffff] text-[#1d1d1f] font-sans selection:bg-[#FF3B1D] selection:text-white flex flex-col overflow-x-hidden">
          <CustomCursor />
          <Navbar />
          
          <main className="flex-grow">
            <Routes>
              <Route path="*" element={
                <>
                  {/* Hero: Visual Edge-to-Edge with Scroll-Linked Fidget Scale */}
                  <TheHero />

                  {/* The Bento Box in Exact PDF Sequence: 01 Fuel -> 02 Vantage -> 03 Friday -> 04 Misc */}
                  <BentoGrid />

                  {/* Sequential Project Exhibition: All 53 Slides in Exact Chronological Sequence */}
                  <SequentialProjectExhibition />

                  {/* Ultra-Minimal Contact (Page 53) */}
                  <ContactSection />
                </>
              } />
            </Routes>
          </main>

          {/* Full Resolution Slide Inspector */}
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