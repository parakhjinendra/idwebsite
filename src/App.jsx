import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route 
} from 'react-router-dom';
import { 
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
  ChevronDown,
  ArrowDown,
  ArrowLeft,
  Layers,
  Sparkles
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

/* --- THE SIGNATURE IDEO GEOMETRIC ARROW SVG --- */
export function IdeoArrow({ className = "w-4 h-4", color = "currentColor" }) {
  return (
    <svg className={className} viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M7.805 2.5C7.685 2.38 7.725 2.26 7.905 2.26H9.425C9.525 2.26 9.605 2.3 9.665 2.36L14.505 7.2C14.585 7.28 14.585 7.4 14.505 7.48L9.68501 12.32C9.62501 12.38 9.545 12.42 9.445 12.42H7.905C7.725 12.42 7.685 12.3 7.805 12.18L11.825 8.18H0.845299C0.725299 8.18 0.645302 8.1 0.645302 7.98V6.76C0.645302 6.64 0.725299 6.56 0.845299 6.56H11.865L7.805 2.5Z" 
        fill={color}
      />
    </svg>
  );
}

/* =========================================================================
   AUTHENTIC 53-PAGE PORTFOLIO DATA (STRICT SEQUENTIAL ORDER: NO SHUFFLING)
   01. Fuel (p.04-12) -> 02. Vantage (p.13-30) -> 03. Friday (p.31-42) -> 04. Miscellaneous (p.43-52)
   ========================================================================= */
export const PORTFOLIO_PROJECTS = [
  /* --- 01. FUEL (PAGES 04 — 12) --- */
  {
    num: "01",
    slug: "fuel",
    title: "Fuel",
    headline: "Engineering tactile thermodynamic mobility for the everyday commuter.",
    subtitle: "Power bank × Retro-engineering",
    duration: "1 Week Sprint",
    projectType: "Individual Hardware Inquiry",
    clientOrContext: "Autonomous Concept Study",
    categoryTag: "HARDWARE ARCHITECTURE",
    cmf: "Matte Polycarbonate • VDI 3400 • CNC Aluminum Rim",
    year: "2024",
    coverId: "p10_2",
    slidesCount: 9,
    pagesRange: "p.04 — p.12",
    slides: [
      { page: 4, id: "p4_2", title: "01 Fuel — Cover", section: "Initiation", desc: "Fuel is a wireless power bank inspired by retro engineering style. It effortlessly marries soft, flowing lines with sharp, edged contrasts." },
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
    headline: "Adaptive 360° kinematic webcam architecture for hybrid collaboration.",
    subtitle: "Adaptive 360° Webcam Architecture",
    duration: "3 Weeks Sprint",
    projectType: "Spatial Interaction Design",
    clientOrContext: "Hybrid Workspace Systems",
    categoryTag: "SPATIAL INTERACTION",
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
    headline: "Deconstructing masculine footwear rituals in collaboration with Louis Vuitton.",
    subtitle: "Friday Heels × Louis Vuitton",
    duration: "6 Weeks Sprint",
    projectType: "Wearable Architecture & CMF",
    clientOrContext: "Louis Vuitton Collaborative Brief",
    categoryTag: "WEARABLE ARCHITECTURE",
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
    headline: "An exploratory archive of physical prototypes, acoustic glass, and creative detours.",
    subtitle: "Sketches, Prototypes & Detours",
    duration: "Continuous Practice",
    projectType: "Material & Prototyping Archive",
    clientOrContext: "Makerspace Inquiries",
    categoryTag: "MATERIAL EXPERIMENTATION",
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

/* --- LIGHTBOX MODAL --- */
function ImageLightboxModal({ activeItem, gallery, onClose, onNavigate }) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const containerRef = useRef(null);

  useEffect(() => {
    setZoomLevel(1);
  }, [activeItem]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!activeItem) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && gallery.length > 1) {
        const idx = gallery.findIndex(g => g.id === activeItem.id);
        const next = gallery[(idx + 1) % gallery.length];
        onNavigate(next);
      }
      if (e.key === 'ArrowLeft' && gallery.length > 1) {
        const idx = gallery.findIndex(g => g.id === activeItem.id);
        const prev = gallery[(idx - 1 + gallery.length) % gallery.length];
        onNavigate(prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeItem, gallery, onClose, onNavigate]);

  if (!activeItem) return null;

  const currentIdx = gallery.findIndex(g => g.id === activeItem.id);
  const imgUrl = resolveImg(activeItem.id || activeItem.coverId);

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#0E151A]/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-6 select-none animate-fadeIn"
      onClick={onClose}
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between text-white z-10 w-full max-w-7xl mx-auto pb-4 border-b border-white/10" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded bg-[#FF5500] text-white font-mono font-bold text-[10px] tracking-wider">
            PAGE {String(activeItem.page || 1).padStart(2, '0')}
          </span>
          <span className="text-white/60 font-mono text-xs uppercase tracking-wider hidden sm:inline">
            {activeItem.section || "PORTFOLIO PLATE"}
          </span>
          <span className="text-white font-sans font-bold text-sm tracking-tight">
            {activeItem.title}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center bg-white/10 rounded-full px-2 py-1 font-mono text-xs">
            <button 
              onClick={() => setZoomLevel(prev => Math.min(prev + 0.25, 2.5))}
              className="p-1 hover:text-[#FF5500] transition-colors" 
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 text-white/50">{Math.round(zoomLevel * 100)}%</span>
            <button 
              onClick={() => setZoomLevel(prev => Math.max(prev - 0.25, 0.75))}
              className="p-1 hover:text-[#FF5500] transition-colors" 
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => setZoomLevel(1)}
              className="p-1 hover:text-[#FF5500] transition-colors ml-1" 
              title="Reset"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-[#FF5500] hover:text-white text-white transition-all cursor-pointer"
            title="Close (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Image Viewport */}
      <div 
        ref={containerRef}
        className="flex-grow flex items-center justify-center relative overflow-hidden py-4 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <img 
          src={imgUrl} 
          alt={activeItem.title}
          style={{ transform: `scale(${zoomLevel})` }}
          className="max-h-[80vh] max-w-full object-contain rounded-lg transition-transform duration-200 select-none shadow-2xl"
          draggable="false"
        />

        {gallery.length > 1 && (
          <>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onNavigate(gallery[(currentIdx - 1 + gallery.length) % gallery.length]);
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-[#FF5500] hover:text-white text-white transition-colors cursor-pointer shadow-xl backdrop-blur-md"
              title="Previous Plate (←)"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onNavigate(gallery[(currentIdx + 1) % gallery.length]);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-[#FF5500] hover:text-white text-white transition-colors cursor-pointer shadow-xl backdrop-blur-md"
              title="Next Plate (→)"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Caption & Indicator */}
      <div className="z-10 text-center max-w-3xl mx-auto w-full pt-3 border-t border-white/10" onClick={(e) => e.stopPropagation()}>
        <p className="font-mono text-xs text-white/80 line-clamp-2">
          {activeItem.desc || activeItem.caption || activeItem.cmf}
        </p>
        <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-1 block">
          Plate {currentIdx + 1} of {gallery.length} // Use Arrow Keys ← → to Browse
        </span>
      </div>
    </div>
  );
}

/* --- 1. IDEO-INSPIRED EDITORIAL NAVBAR --- */
function IdeoNavbar({ activeProject, onBackToGrid }) {
  const scrollTo = (id) => {
    if (activeProject) {
      onBackToGrid();
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FBFBFA]/90 backdrop-blur-md border-b border-[#151F27]/10 transition-all">
      <div className="max-w-[1440px] w-full mx-auto px-6 sm:px-10 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Brand Block */}
        <div className="flex items-center gap-4">
          <a 
            href="#hero" 
            onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-[#151F27] text-white flex items-center justify-center font-display font-black text-xs sm:text-sm tracking-tight group-hover:bg-[#FF5500] group-hover:text-white transition-colors">
              OH
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-sm sm:text-base tracking-tight text-[#151F27] uppercase leading-none">
                ODD HOURS
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#151F27]/60">
                oddhours.co.in
              </span>
            </div>
          </a>

          {activeProject && (
            <button
              onClick={onBackToGrid}
              className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151F27]/5 hover:bg-[#151F27] hover:text-white text-[#151F27] font-mono text-xs font-semibold transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Inquiries</span>
            </button>
          )}
        </div>

        {/* Editorial Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 font-sans text-xs font-semibold uppercase tracking-wider text-[#151F27]/80">
          <button 
            onClick={() => scrollTo('inquiries')}
            className="hover:text-black transition-colors cursor-pointer py-1 border-b-2 border-transparent hover:border-[#151F27]"
          >
            Inquiries
          </button>
          <button 
            onClick={() => scrollTo('practice')}
            className="hover:text-black transition-colors cursor-pointer py-1 border-b-2 border-transparent hover:border-[#151F27]"
          >
            Capabilities
          </button>
          <button 
            onClick={() => scrollTo('perspectives')}
            className="hover:text-black transition-colors cursor-pointer py-1 border-b-2 border-transparent hover:border-[#151F27]"
          >
            Perspectives
          </button>
          <button 
            onClick={() => scrollTo('contact')}
            className="hover:text-black transition-colors cursor-pointer py-1 border-b-2 border-transparent hover:border-[#151F27]"
          >
            Contact
          </button>
        </nav>

        {/* Action Button: The Signature IDEO "Say hello" */}
        <div className="flex items-center gap-3">
          <a 
            href="/Jinendra_Parakh_Resume.pdf" 
            target="_blank" 
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#151F27]/20 text-[#151F27] hover:border-[#151F27] font-mono text-xs font-semibold transition-all"
            title="Download Technical Resume"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>

          <a 
            href="mailto:parakhjinendra@gmail.com"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#151F27] text-white font-sans text-xs font-bold uppercase tracking-wider hover:bg-[#0E151A] transition-all shadow-xs"
          >
            <span>Say hello</span>
            <IdeoArrow className="w-3 h-3 text-[#FF5500] group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

      </div>
    </header>
  );
}

/* --- 2. IDEO HERO SECTION (KINETIC HEADLINE & MULTI-COLUMN STATEMENT) --- */
function IdeoHero({ onSelectProject }) {
  const cyclingWords = [
    "design",
    "physical engineering",
    "tactile rigor",
    "breakthrough products",
    "behavioral ergonomics",
    "tangible futures",
    "rapid prototyping"
  ];

  const [currentWordIdx, setCurrentWordIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentWordIdx((prev) => (prev + 1) % cyclingWords.length);
    }, 2400);
    return () => clearInterval(timer);
  }, [cyclingWords.length]);

  return (
    <section id="hero" className="bg-[#FBFBFA] pt-14 sm:pt-20 pb-16 sm:pb-24 border-b border-[#151F27]/10">
      <div className="max-w-[1440px] w-full mx-auto px-6 sm:px-10 lg:px-12 space-y-12 sm:space-y-16">
        
        {/* Kinetic Statement Title */}
        <div className="space-y-4 max-w-6xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#151F27]/70 uppercase tracking-widest bg-[#151F27]/5 px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#FF5500] border border-[#151F27]"></span>
            <span>PORTFOLIO PRODUCT DESIGN 2025 // JINENDRA PARAKH</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display tracking-tight text-[#151F27] leading-[0.98]">
            Human-centered <br />
            <span className="inline-block relative">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWordIdx}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -25 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="inline-block text-[#151F27] underline decoration-[#FF5500] decoration-4 sm:decoration-8 decoration-wavy"
                >
                  {cyclingWords[currentWordIdx]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>
        </div>

        {/* Multi-Column Statement Grid (IDEO Architecture) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-14 pt-8 border-t border-[#151F27]/15">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-xl sm:text-2xl md:text-3xl font-light text-[#151F27] leading-relaxed">
              Industrial design at the intersection of behavioral psychology and physical engineering. From rapid prototyping and CMF exploration to understanding the systemic structures of how people use everyday objects.
            </p>
            <p className="font-mono text-xs text-[#151F27]/60 uppercase tracking-widest pt-2">
              Based in Bangalore & Pune • Strate School of Design '25 • oddhours.co.in
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between space-y-3 font-sans text-sm">
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-widest text-[#151F27]/50 block mb-2">
                CLICK A THUMBNAIL TO OPEN THE ENTIRE PROJECT
              </span>
              
              {PORTFOLIO_PROJECTS.map((p) => (
                <button
                  key={p.slug}
                  onClick={() => onSelectProject(p)}
                  className="w-full group flex items-center justify-between py-2.5 border-b border-[#151F27]/10 hover:border-[#151F27] transition-all text-left cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#FF5500]">{p.num}</span>
                    <span className="font-bold text-[#151F27] group-hover:text-white">{p.title}</span>
                    <span className="text-[#151F27]/40 text-xs hidden sm:inline">— {p.subtitle}</span>
                  </div>
                  <IdeoArrow className="w-3.5 h-3.5 text-[#151F27] group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-2 text-xs font-mono text-[#151F27]/70">
              <ArrowDown className="w-3.5 h-3.5 text-[#FF5500] animate-bounce" />
              <span>Scroll down to explore the 4 inquiry thumbnails</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* --- 3. THE THUMBNAILS GRID (MAIN HOMEPAGE VIEW: ONLY THUMBNAILS SHOWN) --- */
function IdeoInquiriesGrid({ onSelectProject }) {
  return (
    <section id="inquiries" className="py-20 sm:py-28 bg-[#FBFBFA] text-[#151F27]">
      <div className="max-w-[1440px] w-full mx-auto px-6 sm:px-10 lg:px-12 space-y-16">
        
        {/* Exhibition Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[#151F27]/15">
          <div className="space-y-1">
            <span className="font-mono text-xs font-bold text-[#FF5500] uppercase tracking-widest block">
              SELECTED WORK // 4 MASTER INQUIRIES
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-[#151F27]">
              Case Studies & Inquiries
            </h2>
          </div>

          <p className="font-mono text-xs text-[#151F27]/60 uppercase tracking-widest">
            CLICK ANY THUMBNAIL TO OPEN THE ENTIRE CASE STUDY
          </p>
        </div>

        {/* 4 Project Thumbnails Grid (Exact 1-to-1 Sequence: 01 Fuel, 02 Vantage, 03 Friday, 04 Misc) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
          {PORTFOLIO_PROJECTS.map((proj, idx) => (
            <div
              key={proj.slug}
              onClick={() => onSelectProject(proj)}
              className="group cursor-pointer flex flex-col justify-between rounded-3xl bg-white border border-[#151F27]/10 p-6 sm:p-8 hover:border-[#151F27] hover:shadow-2xl transition-all duration-300"
            >
              {/* Top Meta */}
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-[#151F27] text-white font-bold text-[11px]">
                      {proj.num}
                    </span>
                    <span className="text-[#FF5500] font-bold uppercase tracking-wider text-[11px]">
                      {proj.categoryTag}
                    </span>
                  </div>
                  <span className="text-[#151F27]/50 font-bold">
                    {proj.slidesCount} PLATES ({proj.pagesRange})
                  </span>
                </div>

                {/* Thumbnail Image Container */}
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#EFEFED] border border-[#151F27]/10">
                  <img
                    src={resolveImg(proj.coverId)}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151F27]/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF5500] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-lg">
                      <span>Open Whole Project</span>
                      <IdeoArrow className="w-3.5 h-3.5 text-black" />
                    </span>
                  </div>
                </div>

                {/* Typography */}
                <div className="space-y-2 pt-2">
                  <h3 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-[#151F27] group-hover:text-white">
                    {proj.title} : {proj.subtitle}
                  </h3>
                  <p className="text-sm font-light text-[#151F27]/80 line-clamp-2 leading-relaxed">
                    {proj.headline}
                  </p>
                </div>
              </div>

              {/* Bottom CMF Bar & CTA */}
              <div className="pt-6 mt-6 border-t border-[#151F27]/10 flex items-center justify-between text-xs font-mono">
                <span className="text-[#151F27]/60 line-clamp-1 max-w-[70%]">
                  {proj.cmf}
                </span>

                <span className="inline-flex items-center gap-1.5 font-bold text-[#151F27] group-hover:text-white shrink-0">
                  <span>View Project</span>
                  <IdeoArrow className="w-3.5 h-3.5 text-[#FF5500] group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* --- 4. THE WHOLE PROJECT CASE STUDY VIEW (REVEALED ONLY ON THUMBNAIL CLICK) --- */
function IdeoProjectCaseStudyView({ project, onBackToGrid, onSelectNext }) {
  const { openLightbox } = useLightbox();

  // Scroll to top of case study when opened
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [project.slug]);

  // Escape key closes project
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onBackToGrid();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBackToGrid]);

  const currentIdx = PORTFOLIO_PROJECTS.findIndex(p => p.slug === project.slug);
  const nextProject = PORTFOLIO_PROJECTS[(currentIdx + 1) % PORTFOLIO_PROJECTS.length];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.35 }}
      className="bg-[#FBFBFA] min-h-screen pb-32"
    >
      {/* Sticky Project Sub-Bar */}
      <div className="sticky top-16 sm:top-20 z-30 bg-[#FBFBFA]/95 backdrop-blur-xl border-b border-[#151F27]/10 py-3.5 px-6 sm:px-10">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4 font-mono text-xs">
          
          <button
            onClick={onBackToGrid}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#151F27] text-white hover:bg-black font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Inquiries</span>
          </button>

          <div className="hidden sm:flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded bg-[#FF5500] text-white font-bold text-[10px]">
              INQUIRY {project.num}
            </span>
            <span className="font-bold text-[#151F27] uppercase tracking-wide">
              {project.title}
            </span>
            <span className="text-[#151F27]/40">•</span>
            <span className="text-[#151F27]/70 text-[11px]">
              {project.slidesCount} Plates Vertical Feed
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => openLightbox(project.slides[0], project.slides)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#151F27]/20 text-[#151F27] hover:border-[#151F27] font-bold text-xs uppercase cursor-pointer"
              title="Fullscreen Slide Deck"
            >
              <ZoomIn className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Deck Mode</span>
            </button>

            <button
              onClick={() => onSelectNext(nextProject)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#151F27]/5 hover:bg-[#151F27]/10 text-[#151F27] font-semibold text-xs transition-colors cursor-pointer"
            >
              <span className="hidden sm:inline">Next:</span>
              <span>{nextProject.num} {nextProject.title}</span>
              <IdeoArrow className="w-3 h-3 text-[#FF5500]" />
            </button>
          </div>

        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 pt-12 space-y-16">
        
        {/* Project Header Hero */}
        <div className="p-8 sm:p-14 rounded-3xl bg-[#151F27] text-white shadow-2xl space-y-8">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <span className="px-3 py-1 rounded bg-[#FF5500] text-white font-bold tracking-wider">
              INQUIRY {project.num} // {project.categoryTag}
            </span>
            <span className="text-white/60 uppercase tracking-widest font-semibold">
              {project.duration} • {project.projectType}
            </span>
            <span className="text-white/40 hidden sm:inline">•</span>
            <span className="text-[#FF5500] font-mono text-xs">
              {project.pagesRange} ({project.slidesCount} Plates)
            </span>
          </div>

          <div className="space-y-4 max-w-4xl">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-display uppercase tracking-tight text-white leading-none">
              {project.title}
            </h1>
            <p className="text-xl sm:text-2xl font-light text-white/85 leading-snug">
              {project.headline}
            </p>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-white/10 font-mono text-xs">
            <div>
              <span className="text-white/40 block text-[10px] uppercase mb-1">CLIENT / CONTEXT</span>
              <span className="text-white font-semibold">{project.clientOrContext}</span>
            </div>
            <div>
              <span className="text-white/40 block text-[10px] uppercase mb-1">TIMELINE</span>
              <span className="text-white font-semibold">{project.duration} ({project.year})</span>
            </div>
            <div>
              <span className="text-white/40 block text-[10px] uppercase mb-1">PAGES / PLATES</span>
              <span className="text-[#FF5500] font-semibold">{project.pagesRange} ({project.slidesCount} Plates)</span>
            </div>
            <div>
              <span className="text-white/40 block text-[10px] uppercase mb-1">CMF SPECIFICATION</span>
              <span className="text-white/90 font-semibold line-clamp-1">{project.cmf}</span>
            </div>
          </div>
        </div>

        {/* Scroll Instruction Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-[#151F27]/15 font-mono text-xs">
          <div className="flex items-center gap-2 text-[#151F27]">
            <ArrowDown className="w-4 h-4 text-[#FF5500] animate-bounce" />
            <span className="font-bold uppercase tracking-wider">
              CONTINUOUS VERTICAL CASE STUDY FEED ({project.slidesCount} PLATES IN 1-TO-1 SEQUENCE)
            </span>
          </div>
          <span className="text-[#151F27]/50 hidden sm:inline uppercase">
            CLICK ANY PLATE FOR RETINA ZOOM INSPECTOR
          </span>
        </div>

        {/* All Slides of this Project in Pure Vertical Scroll */}
        <div className="flex flex-col space-y-12 sm:space-y-16 max-w-5xl mx-auto w-full">
          {project.slides.map((slide, sIdx) => (
            <div
              key={`${project.slug}-plate-${slide.page}-${sIdx}`}
              className="group relative rounded-3xl overflow-hidden bg-white border border-[#151F27]/10 shadow-sm hover:shadow-2xl transition-all duration-300"
            >
              {/* Top Plate Metadata Bar */}
              <div className="px-6 py-4 bg-[#F7F7F6] border-b border-[#151F27]/10 flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded bg-[#151F27] text-white font-bold text-[10px] tracking-wider">
                    PAGE {String(slide.page).padStart(2, '0')}
                  </span>
                  <span className="text-[#FF5500] font-bold uppercase tracking-wider text-[11px]">
                    {slide.section}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-[#151F27] font-sans font-bold text-xs uppercase tracking-tight hidden md:inline">
                    {slide.title}
                  </span>
                  <button
                    onClick={() => openLightbox(slide, project.slides)}
                    className="p-1.5 rounded-full text-[#151F27]/60 hover:text-black hover:bg-black/5 transition-colors cursor-pointer"
                    title="View High-Res Fullscreen"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Presentation Plate Viewport */}
              <div 
                onClick={() => openLightbox(slide, project.slides)}
                className="relative w-full bg-[#EFEFED] flex items-center justify-center p-4 sm:p-8 md:p-10 cursor-pointer overflow-hidden group/plate"
                title="Click to inspect plate in full resolution"
              >
                <img
                  src={resolveImg(slide.id)}
                  alt={`${project.title} - ${slide.title} (Page ${slide.page})`}
                  className="w-full max-h-[85vh] object-contain rounded-xl transition-transform duration-500 group-hover/plate:scale-[1.01] shadow-xs"
                  loading="lazy"
                />

                {/* Hover Pill */}
                <div className="absolute inset-0 bg-[#151F27]/15 opacity-0 group-hover/plate:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <div className="px-5 py-2.5 rounded-full bg-[#151F27] text-white font-mono text-xs font-bold flex items-center gap-2 shadow-2xl">
                    <ZoomIn className="w-3.5 h-3.5 text-[#FF5500]" />
                    <span>Inspect Plate {slide.page}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Technical Description */}
              <div className="px-6 py-5 bg-white border-t border-[#151F27]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
                <p className="text-[#151F27]/80 leading-relaxed max-w-3xl">
                  {slide.desc}
                </p>
                {slide.cmf && (
                  <span className="shrink-0 text-[10px] uppercase tracking-wider text-[#151F27]/40 font-medium">
                    {slide.cmf}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* End of Project Navigation Footer */}
        <div className="pt-12 pb-6 border-t border-[#151F27]/15 flex flex-col sm:flex-row items-center justify-between gap-6">
          <button
            onClick={onBackToGrid}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#151F27]/20 text-[#151F27] hover:border-[#151F27] font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to All Inquiries</span>
          </button>

          <button
            onClick={() => onSelectNext(nextProject)}
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#151F27] hover:bg-black text-white font-mono text-xs font-bold uppercase tracking-wider shadow-lg transition-all cursor-pointer"
          >
            <span>Proceed to Next Inquiry: {nextProject.num} // {nextProject.title}</span>
            <IdeoArrow className="w-4 h-4 text-[#FF5500] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </motion.section>
  );
}

/* --- 5. IDEO CAPABILITIES / THE PRACTICE SECTION --- */
function IdeoPractice() {
  const capabilities = [
    {
      num: "01",
      title: "Behavioral Psychology & Field Ergonomics",
      desc: "Observing real-world routines, physical grip architectures, and tactile muscle memory to uncover latent friction before drawing a single line."
    },
    {
      num: "02",
      title: "Kinematic Architecture & Surfacing",
      desc: "3D CAD modeling across SolidWorks and Rhino, designing multi-axis pan/tilt linkages, detent torque hinges, and internal PCB component nesting."
    },
    {
      num: "03",
      title: "Physical Prototyping & CNC Making",
      desc: "Validating concepts through 1:1 CNC foam routing, styling clay sculpting, SLA resin test rigs, and wearable tolerance fittings at makerspace scale."
    },
    {
      num: "04",
      title: "CMF Engineering & Production Rigor",
      desc: "Designing with tooling feasibility in mind: VDI 3400 spark erosion textures, anodized aluminum alloys, draft angles, and injection parting lines."
    }
  ];

  return (
    <section id="practice" className="py-20 sm:py-28 bg-[#151F27] text-white">
      <div className="max-w-[1440px] w-full mx-auto px-6 sm:px-10 lg:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div className="space-y-2 max-w-2xl">
            <span className="font-mono text-xs font-bold text-[#FF5500] uppercase tracking-widest block">
              CAPABILITIES // THE ODD HOURS PRACTICE
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-white leading-tight">
              Making is how we think. <br />
              <span className="text-white/60 font-light normal-case">Prototyping is how we learn.</span>
            </h2>
          </div>

          <p className="font-sans text-sm text-white/70 max-w-md font-light">
            Every inquiry bridges rigorous human observation with physical manufacturing constraints. We don't just render objects; we build the conditions for them to exist.
          </p>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {capabilities.map((cap) => (
            <div 
              key={cap.num}
              className="p-8 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col justify-between space-y-8 hover:bg-white/[0.07] hover:border-[#FF5500]/40 transition-all group"
            >
              <div className="space-y-4">
                <span className="font-mono text-xs font-bold text-[#FF5500] tracking-widest block">
                  [{cap.num}]
                </span>
                <h4 className="text-lg font-display font-bold uppercase tracking-tight text-white group-hover:text-[#FF5500] transition-colors">
                  {cap.title}
                </h4>
              </div>

              <p className="font-sans text-xs text-white/70 leading-relaxed font-light">
                {cap.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* --- 6. IDEO PERSPECTIVES (EDITORIAL ACCORDION SYSTEM) --- */
function IdeoPerspectives() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: "What makes the Odd Hours design practice distinct?",
      a: "Odd Hours does not separate aesthetic styling from mechanical engineering. Rather than treating design as cosmetic exterior casing, every inquiry starts from the inside out: internal kinematics, thermal dissipation pathways, ergonomic pressure points, and physical manufacturing rigor."
    },
    {
      q: "How do behavioral psychology and physical engineering intersect in everyday products?",
      a: "Humans interact with hardware through habitual rituals, acoustic feedback, and tactile detents. By understanding behavioral psychology, we design products that invite physical engagement (such as the 6-step wearing ceremony in Friday, or the audible click switch in Fuel) while meeting strict DFM (Design for Manufacturing) tolerances."
    },
    {
      q: "Why is 1:1 physical prototyping in makerspaces essential to your process?",
      a: "A 3D CAD render can easily mislead the designer regarding weight distribution and hand feel. By taking models to the CNC router and sculpting styling clay at 1:1 scale (e.g. Friday's UK 11 wearable prototype), we confront physical gravity and human ergonomics before committing to tooling."
    },
    {
      q: "How is CMF (Color, Material, Finish) determined?",
      a: "CMF is not an afterthought; it is structural. We pair tactile bead-blasted 6061 anodized aluminum with warm soft-touch VDI 3400 spark-eroded polymers to communicate interface hierarchy, temperature, and longevity."
    }
  ];

  return (
    <section id="perspectives" className="py-20 sm:py-28 bg-[#EFEFED] border-y border-[#151F27]/10 text-[#151F27]">
      <div className="max-w-[1440px] w-full mx-auto px-6 sm:px-10 lg:px-12 space-y-12">
        
        {/* Header */}
        <div className="space-y-2 max-w-2xl">
          <span className="font-mono text-xs font-bold text-[#FF5500] uppercase tracking-widest block">
            PERSPECTIVES // THE ODD HOURS MINDSET
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-[#151F27]">
            How we approach design.
          </h2>
        </div>

        {/* Accordion List */}
        <div className="divide-y divide-[#151F27]/15 border-y border-[#151F27]/15">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="py-6 sm:py-8">
                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  className="w-full flex items-center justify-between text-left gap-6 group cursor-pointer"
                >
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-[#151F27] group-hover:text-[#FF5500] transition-colors">
                    {faq.q}
                  </h3>
                  <div className={`w-8 h-8 rounded-full border border-[#151F27]/20 flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#151F27] text-white' : 'bg-transparent text-[#151F27]'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 font-sans text-base sm:text-lg text-[#151F27]/80 max-w-4xl leading-relaxed font-light">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

/* --- 7. IDEO-INSPIRED FOOTER (PAGE 53 / CONTACT SIGN-OFF) --- */
function IdeoContact({ onSelectProject }) {
  return (
    <footer id="contact" className="py-20 sm:py-32 bg-[#151F27] text-white">
      <div className="max-w-[1440px] w-full mx-auto px-6 sm:px-10 lg:px-12 space-y-16">
        
        {/* Top Big Callout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          <div className="lg:col-span-8 space-y-4">
            <span className="font-mono text-xs font-bold text-[#FF5500] uppercase tracking-widest block">
              PAGE 53 // SAY HELLO
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-display uppercase tracking-tight text-white leading-tight">
              Want to design <br />
              <span className="text-[#FF5500]">what's next?</span>
            </h2>
            <p className="text-lg sm:text-xl font-light text-white/70 max-w-xl">
              Currently open for full-time industrial design roles, hardware engineering collaborations, and consulting inquiries worldwide.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end space-y-4">
            <a 
              href="mailto:parakhjinendra@gmail.com"
              className="group flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-[#FF5500] hover:text-white transition-all border border-white/10"
            >
              <div>
                <span className="font-mono text-[10px] uppercase text-white/50 group-hover:text-white/80 block">DIRECT INQUIRY</span>
                <span className="font-mono text-sm font-bold text-white group-hover:text-white">parakhjinendra@gmail.com</span>
              </div>
              <IdeoArrow className="w-4 h-4 text-[#FF5500] group-hover:text-white group-hover:translate-x-1 transition-all" />
            </a>

            <a 
              href="tel:+919850889899"
              className="group flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/10"
            >
              <div>
                <span className="font-mono text-[10px] uppercase text-white/50 block">PHONE / WHATSAPP</span>
                <span className="font-mono text-sm font-bold text-white">+91 9850889899</span>
              </div>
              <Phone className="w-4 h-4 text-white/40 group-hover:text-white" />
            </a>
          </div>
        </div>

        {/* Resources & PDF Downloads */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-xs">
          <a 
            href="/Jinendra_Parakh_Portfolio.pdf"
            target="_blank"
            rel="noreferrer"
            className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#FF5500] transition-all flex items-center justify-between group"
          >
            <div>
              <span className="text-[#FF5500] font-bold block">53P PORTFOLIO DECK</span>
              <span className="text-white/50 text-[10px]">High-Res PDF Download</span>
            </div>
            <Download className="w-4 h-4 text-white/50 group-hover:text-[#FF5500]" />
          </a>

          <a 
            href="/Jinendra_Parakh_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#FF5500] transition-all flex items-center justify-between group"
          >
            <div>
              <span className="text-[#FF5500] font-bold block">TECHNICAL RESUME</span>
              <span className="text-white/50 text-[10px]">Curriculum Vitae</span>
            </div>
            <Download className="w-4 h-4 text-white/50 group-hover:text-[#FF5500]" />
          </a>

          <a 
            href="https://www.linkedin.com/in/jinendra-parakh-7b643a228"
            target="_blank"
            rel="noreferrer"
            className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#FF5500] transition-all flex items-center justify-between group"
          >
            <div>
              <span className="text-white font-bold block">LINKEDIN</span>
              <span className="text-white/50 text-[10px]">Professional Network</span>
            </div>
            <ExternalLink className="w-4 h-4 text-white/50 group-hover:text-white" />
          </a>

          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col justify-between">
            <span className="text-white font-bold block">LOCATION & TIMEZONE</span>
            <span className="text-white/50 text-[10px]">Bangalore / Pune, India (IST +5:30)</span>
          </div>
        </div>

        {/* Colophon Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-[11px] text-white/40">
          <div>
            © {new Date().getFullYear()} JINENDRA PARAKH // ODD HOURS STUDIO. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-3 uppercase tracking-wider">
            <span>PIONEERING HUMAN-CENTERED PHYSICAL ENGINEERING</span>
            <span className="text-[#FF5500] font-bold">ODDHOURS.CO.IN</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

/* --- 8. MAIN ROOT APP --- */
export default function App() {
  const [activeProject, setActiveProject] = useState(null);
  const [lightboxState, setLightboxState] = useState({
    activeItem: null,
    gallery: []
  });

  // Check URL hash on load
  useEffect(() => {
    document.title = "ODD HOURS — Jinendra Parakh | Human-Centered Industrial Design (oddhours.co.in)";

    const syncFromHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash) {
        const found = PORTFOLIO_PROJECTS.find(p => p.slug === hash || `project-${p.slug}` === hash);
        if (found) {
          setActiveProject(found);
          return;
        }
      }
      if (hash === '' || hash === 'inquiries' || hash === 'hero' || hash === 'practice') {
        setActiveProject(null);
      }
    };

    syncFromHash();
    window.addEventListener('popstate', syncFromHash);
    return () => window.removeEventListener('popstate', syncFromHash);
  }, []);

  const handleSelectProject = (project) => {
    setActiveProject(project);
    window.history.pushState(null, '', `#${project.slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToGrid = () => {
    setActiveProject(null);
    window.history.pushState(null, '', window.location.pathname);
    setTimeout(() => {
      const el = document.getElementById('inquiries');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

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
        <div className="min-h-screen bg-[#FBFBFA] text-[#151F27] font-sans selection:bg-[#FF5500] selection:text-white flex flex-col overflow-x-hidden">
          
          {/* IDEO Signature Top Header */}
          <IdeoNavbar 
            activeProject={activeProject} 
            onBackToGrid={handleBackToGrid} 
          />
          
          <main className="flex-grow">
            <AnimatePresence mode="wait">
              {activeProject ? (
                /* --- THE WHOLE PROJECT VIEW (REVEALED ONLY ON THUMBNAIL CLICK) --- */
                <IdeoProjectCaseStudyView 
                  key={activeProject.slug}
                  project={activeProject}
                  onBackToGrid={handleBackToGrid}
                  onSelectNext={handleSelectProject}
                />
              ) : (
                /* --- HOMEPAGE VIEW: ONLY THUMBNAILS SHOWN --- */
                <motion.div
                  key="homepage"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Hero: Kinetic Word Cycling Headline & Multi-Column Statement */}
                  <IdeoHero onSelectProject={handleSelectProject} />

                  {/* Capabilities: The 4-Pillar Practice (IDEO Design Services Style) */}
                  <IdeoPractice />

                  {/* Selected Inquiries: 4 Thumbnail Cards in Exact PDF Order */}
                  <IdeoInquiriesGrid onSelectProject={handleSelectProject} />

                  {/* Perspectives: Interactive Editorial Accordion */}
                  <IdeoPerspectives />

                  {/* Sign-Off / Contact: Page 53 */}
                  <IdeoContact onSelectProject={handleSelectProject} />
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          {/* Retina Plate Inspector Modal */}
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