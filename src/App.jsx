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
  Sparkles,
  Award,
  Briefcase,
  GraduationCap,
  Wrench
} from 'lucide-react';
import { 
  motion, 
  AnimatePresence 
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

/* --- THE SIGNATURE GEOMETRIC ARROW SVG --- */
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
   AUTHENTIC 53-PAGE PORTFOLIO & RESUME DATA (100% SOURCED FROM PDF & RESUME)
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
    categoryTag: "POWER BANK × RETRO-ENGINEERING",
    pagesRange: "Pages 04 — 12",
    slidesCount: 9,
    coverId: "p10_2",
    authenticSummary: "Fuel is a wireless power bank inspired by retro engineering style. It effortlessly marries soft, flowing lines with sharp, edged contrasts, making a bold statement.",
    problemStatement: "Power banks often lack aesthetic appeal, clashing with the refined designs of modern smartphones. Bland bricks, clunky and disconnected monolithic design.",
    brief: "Design wireless power banks that seamlessly integrate with smartphones, enhancing both functionality and aesthetics.",
    slides: [
      { 
        page: 4, 
        id: "p4_2", 
        title: "Fuel — Cover", 
        section: "Initiation", 
        desc: "Fuel is a wireless power bank inspired by retro engineering style. It effortlessly marries soft, flowing lines with sharp, edged contrasts, making a bold statement." 
      },
      { 
        page: 5, 
        id: "p5_2", 
        title: "The Problem & Brief", 
        section: "Initiation", 
        desc: "Power banks often lack aesthetic appeal, clashing with the refined designs of modern smartphones. Clunky design, bland bricks, and disconnected monolithic design." 
      },
      { 
        page: 6, 
        id: "p6_2", 
        title: "Teenage Engineering Inspiration", 
        section: "Concept", 
        desc: "Teenage Engineering (TE) is a Swedish company known for its innovative and playful approach to product design. TE's design philosophy of 'Play everywhere' reflects their belief that technology should be fun and easy to use." 
      },
      { 
        page: 7, 
        id: "p7_2", 
        title: "Ideation Sketches", 
        section: "Concept", 
        desc: "Concept ideation exploring form volumes, exposed mechanical structures, and tactile interface layouts." 
      },
      { 
        page: 8, 
        id: "p8_2", 
        title: "Switch, Strap & Charge Indicator", 
        section: "Concept", 
        desc: "The strap brings a practical and stylish touch. Tactile feedback combined with the audible click when sliding the switch enhances the overall experience. Magnetic panel for effortless attachment." 
      },
      { 
        page: 9, 
        id: "p9_2", 
        title: "Technical Drawing", 
        section: "Technical", 
        desc: "Complete orthographic technical drawing: 79.94mm length, 51.8mm width, 8.5mm profile, detail sections A(2:1), B(2:1), C(2:1)." 
      },
      { 
        page: 10, 
        id: "p10_2", 
        title: "Final Solution — Form Orthographics", 
        section: "Solution", 
        desc: "Front, profile, and rear renders showing woven strap, lanyard hook, audible power switch slider, and inductive circular interface." 
      },
      { 
        page: 11, 
        id: "p11_4", 
        title: "A Symphony of Contrasts & Exploded View", 
        section: "Solution", 
        desc: "Aluminum brilliance accented by vibrant orange. A dialogue of colour contrasts: the interplay of hard edges and soft blends." 
      },
      { 
        page: 12, 
        id: "p12_2", 
        title: "Details & Tactile Highlights", 
        section: "Solution", 
        desc: "Close-up detailing aluminum edges, strap hook, audible sliding switch, and precision surface finishes." 
      }
    ]
  },

  /* --- 02. VANTAGE (PAGES 13 — 30) --- */
  {
    num: "02",
    slug: "vantage",
    title: "Vantage",
    subtitle: "Adaptive 360° Webcam Architecture",
    duration: "3 Weeks / 4 Months Industry Project (A&T Video Networks)",
    projectType: "Individual Project (Grade 'O')",
    categoryTag: "ADAPTIVE WEBCAM ARCHITECTURE",
    pagesRange: "Pages 13 — 30",
    slidesCount: 18,
    coverId: "p2_2",
    authenticSummary: "Vantage is a versatile webcam that transforms video calls, presentations, and streaming into immersive, engaging experiences. With unmatched flexibility and precision, it enhances how you connect, communicate, and create.",
    problemStatement: "Fixed camera angles force users to awkwardly move. Bland, one-dimensional presentations. Cluttered workspaces with bulky mounts and tangled cables. The multi-device dilemma.",
    brief: "Redesigned a web and PTZ camera with internal constraints for A&T Video Networks. Created cohesive brand language and flexible camera mounting.",
    slides: [
      { 
        page: 13, 
        id: "p13_2", 
        title: "Vantage — Cover", 
        section: "Initiation", 
        desc: "Vantage is a versatile webcam that transforms video calls, presentations, and streaming into immersive, engaging experiences. With unmatched flexibility and precision, it enhances how you connect, communicate, and create." 
      },
      { 
        page: 14, 
        id: "p14_2", 
        title: "Market Research", 
        section: "Initiation", 
        desc: "The way we work, learn, and create is changing fast. Global webcam market projected to reach $18.85 billion by 2029 (CAGR 14.3%). Drivers: Video conferencing, remote work, streaming platforms, online education." 
      },
      { 
        page: 15, 
        id: "p15_2", 
        title: "Identified Problems", 
        section: "Initiation", 
        desc: "Fixed Camera Angles (forced to fit into frame), Bland One-Dimensional Experience, Cluttered Workspaces (bulky mounts, tangled cables), Multi-Device Dilemma (managing multiple devices)." 
      },
      { 
        page: 16, 
        id: "p16_2", 
        title: "Pain Points & Opportunities", 
        section: "Initiation", 
        desc: "Magnetic rail mounting system for easy adjustments. Detachable webcam. Auto-framing technology. Move the camera instead of the subject. Compact, foldable design." 
      },
      { 
        page: 17, 
        id: "p17_2", 
        title: "Inspiration Board", 
        section: "Concept", 
        desc: "Honest, Minimal, Adaptive, Intuitive, Modular. Tactile dial and modular building block inspiration." 
      },
      { 
        page: 18, 
        id: "p18_2", 
        title: "Ideation & Final Concept Selection", 
        section: "Concept", 
        desc: "Iterative sketch ideation exploring articulated arm counterweights, sliding rails, and magnetic head docks." 
      },
      { 
        page: 19, 
        id: "p19_2", 
        title: "Introducing Vantage", 
        section: "Solution", 
        desc: "In a world where connection is everything, clarity and perspective are the keys to unlocking truly immersive experiences. Introducing Vantage: flexible arm, integrated lighting, and dual mounts." 
      },
      { 
        page: 20, 
        id: "p20_4", 
        title: "360° Freedom of Movement", 
        section: "Solution", 
        desc: "Horizontal slide, vertical slide, 360° pan, 360° rotation. Capture every perspective with seamless movements, ensuring no moment is missed. Integrated light: on/off in a click." 
      },
      { 
        page: 21, 
        id: "p21_2", 
        title: "Dimensions & Ceremony", 
        section: "Solution", 
        desc: "323mm arm, 400mm stand, 70mm camera, 15mm base. Just plug in, position, and perfect: 01 Connect ➔ 02 Adjust ➔ 03 Set ➔ 04 Frame. Vantage adapts to you." 
      },
      { 
        page: 22, 
        id: "p22_2", 
        title: "Pivoting Mount — Kitchen Culinary Scenario", 
        section: "Solution", 
        desc: "Pivoting mount: customize your angle with full 360° rotational freedom for live demonstrations and culinary streams." 
      },
      { 
        page: 23, 
        id: "p23_2", 
        title: "Informal Desk Scenario", 
        section: "Solution", 
        desc: "Adjusting height and tilt smoothly for casual, comfortable workspace video calls." 
      },
      { 
        page: 24, 
        id: "p24_2", 
        title: "One Camera, Endless Possibilities (Magnetic Dock)", 
        section: "Solution", 
        desc: "With a simple press, twist, and pull, Vantage transforms from a stand-mounted camera to a compact monitor-mounted webcam through secure pogo pin connectivity." 
      },
      { 
        page: 25, 
        id: "p25_2", 
        title: "Monitor Mount Architecture", 
        section: "Solution", 
        desc: "Soft-Touch Padding: secure grip, no scratches. One-press snap, two-press record. Snap cap protects the rubber padding from wear and tear over time." 
      },
      { 
        page: 26, 
        id: "p26_2", 
        title: "360° Precision & Sliding Privacy Shutter", 
        section: "Solution", 
        desc: "Shutter open, ready to connect. Automatically pans and tilts to keep you in frame. Privacy first: slide the physical shutter closed." 
      },
      { 
        page: 27, 
        id: "p27_2", 
        title: "Lens Details & Lock Mechanism", 
        section: "Solution", 
        desc: "Detail render showing capacitive ring light diffuser, optical glass lens, and quick-release stand release button." 
      },
      { 
        page: 28, 
        id: "p28_2", 
        title: "Use Case Scenarios", 
        section: "Solution", 
        desc: "Whiteboard demonstrations, top-down overhead document sketching, and face-to-face video conferencing." 
      },
      { 
        page: 29, 
        id: "p29_2", 
        title: "Student Study Desk Scenario", 
        section: "Solution", 
        desc: "Compact monitor mount perched on laptop display for online classroom interaction." 
      },
      { 
        page: 30, 
        id: "p30_2", 
        title: "Executive Studio Workspace", 
        section: "Solution", 
        desc: "Professional multi-monitor studio configuration for presentations and broadcast streaming." 
      }
    ]
  },

  /* --- 03. FRIDAY (PAGES 31 — 42) --- */
  {
    num: "03",
    slug: "friday",
    title: "Friday",
    subtitle: "Friday Heels × Louis Vuitton",
    duration: "6 Weeks",
    projectType: "Team Project (Jinendra Parakh, Pradyumn Soni, Dhruv Joshi, Shounak Ghosh)",
    categoryTag: "HEELED BOOT FOR MEN × LOUIS VUITTON",
    pagesRange: "Pages 31 — 42",
    slidesCount: 12,
    coverId: "p31_2",
    authenticSummary: "Elevate your presence with the Friday shoe, a high-heeled boot designed exclusively for men. Step into a world where style knows no bounds, setting you apart as the epitome of fashion-forward masculinity.",
    problemStatement: "Heels were originally worn by men of royalty and kings as an indication of upper-class status, but today are almost exclusively worn by women.",
    brief: "Design a high heeled boot for men that seamlessly weaves together traditional masculinity and contemporary boldness, standing as a symbol of progressive, confident fashion.",
    slides: [
      { 
        page: 31, 
        id: "p31_2", 
        title: "Friday Heels × Louis Vuitton — Cover", 
        section: "Initiation", 
        desc: "Elevate your presence with the Friday shoe, a high heeled boot designed exclusively for men. Setting you apart as the epitome of fashion-forward masculine elegance." 
      },
      { 
        page: 32, 
        id: "p32_2", 
        title: "FRIDAY as a Brand", 
        section: "Initiation", 
        desc: "Friday as a day is dynamic — the work ends and now it's time to celebrate the weekend, full of excitement and pleasure. We blend traditional craftsmanship with modern techniques and use metals to create striking highlights." 
      },
      { 
        page: 33, 
        id: "p33_2", 
        title: "Historical Context & Market", 
        section: "Initiation", 
        desc: "Originally worn by men of royalty and kings. Later worn to imply upper-class status. Market revival: Celine, Christian Louboutin, Balenciaga. Heeled footwear exudes unshakable confidence." 
      },
      { 
        page: 34, 
        id: "p34_2", 
        title: "Project Brief", 
        section: "Initiation", 
        desc: "Design a high heeled boot for men that seamlessly weaves together traditional masculinity and contemporary boldness, standing as a symbol of progressive, confident fashion." 
      },
      { 
        page: 35, 
        id: "p35_2", 
        title: "Concept Directions", 
        section: "Concept", 
        desc: "Exploring Dynamic, Hulk, and Authoritative silhouettes with gel cups, dial lacing, detached base, front peel, and 3D printed midsoles." 
      },
      { 
        page: 36, 
        id: "p36_2", 
        title: "Ideation Sketches", 
        section: "Concept", 
        desc: "Form sketching exploring faceted architectural heels, collar lines, monogram placements, and mechanical dial integration." 
      },
      { 
        page: 37, 
        id: "p37_2", 
        title: "3D Printed Shield & Heel", 
        section: "Solution", 
        desc: "Heel so high it raises the bar with you. The elegant protector of a king: 3D printed protective heel shield." 
      },
      { 
        page: 38, 
        id: "p38_2", 
        title: "Monogram & Branding", 
        section: "Solution", 
        desc: "Louis Vuitton x Friday branding bridging the heel. The dazzling Louis Vuitton monogram dial has everyone's eyes on you." 
      },
      { 
        page: 39, 
        id: "p39_2", 
        title: "Step into the Story: The Wearable Guide", 
        section: "Solution", 
        desc: "01 Initiate Elegance ➔ 02 Prelude to Opulence ➔ 03 Engage the Ritual ➔ 04 Confer Regality ➔ 05 Harmonize Comfort ➔ 06 Culminate the Ceremony." 
      },
      { 
        page: 40, 
        id: "p40_2", 
        title: "Orthographic & Exploded View", 
        section: "Solution", 
        desc: "Orthographic elevations and exploded architecture: outsole, heel block, insole shank, leather upper, and 3D printed monogram shield." 
      },
      { 
        page: 41, 
        id: "p41_2", 
        title: "Physical Prototype (UK 11 / Scale 1:1)", 
        section: "Prototyping", 
        desc: "1:1 physical wearable prototype built to UK 11 sizing. High-density milled polyurethane sole, leather crafting, and clay modeling." 
      },
      { 
        page: 42, 
        id: "p42_2", 
        title: "Editorial Campaign Visual", 
        section: "Campaign", 
        desc: "Grand piano high-fashion campaign visual photographed by Pradyumn Soni." 
      }
    ]
  },

  /* --- 04. MISCELLANEOUS (PAGES 43 — 52) --- */
  {
    num: "04",
    slug: "miscellaneous",
    title: "Miscellaneous",
    subtitle: "Sketches, Prototypes & Detours",
    duration: "Ongoing",
    projectType: "Individual Project",
    categoryTag: "SKETCHES, PROTOTYPES & DETOURS",
    pagesRange: "Pages 43 — 52",
    slidesCount: 10,
    coverId: "p44_2",
    authenticSummary: "A collection of sketches, prototypes, and creative detours. Each piece is a standalone exploration, showing different stages of thinking and making beyond my main projects.",
    problemStatement: "Explorations in material, generative AI, footwear teardowns, and digital marketing insights.",
    brief: "A compilation of acoustic glass vessels, sneaker deconstruction, Vizcom AI trials, physical models, and internship learnings.",
    slides: [
      { 
        page: 43, 
        id: "p1_2", 
        title: "Miscellaneous — Cover", 
        section: "Archive", 
        desc: "A collection of sketches, prototypes, and creative detours. Each piece is a standalone exploration, showing different stages of thinking and making beyond my main projects." 
      },
      { 
        page: 44, 
        id: "p44_2", 
        title: "Acoustic Glass Vessel — Orthographics", 
        section: "Glass Vessel", 
        desc: "Orthographic technical study of double hourglass borosilicate glass spheres suspended in an intertwined copper wire cradle." 
      },
      { 
        page: 45, 
        id: "p45_2", 
        title: "Glass Vessel — Perspective & Details", 
        section: "Glass Vessel", 
        desc: "Perspective view and aperture detailing of the acoustic glass vessel." 
      },
      { 
        page: 46, 
        id: "p46_2", 
        title: "Design Sketches", 
        section: "Sketches", 
        desc: "Industrial design sketches: technical backpacks, mid-century lounge chairs, and athletic footwear." 
      },
      { 
        page: 47, 
        id: "p47_2", 
        title: "Analysis of a Sneaker", 
        section: "Footwear", 
        desc: "Anatomical analysis: shoe tongue, toe counter, foxing, PU rubber outsole, and toe spring." 
      },
      { 
        page: 48, 
        id: "p48_2", 
        title: "Layered Footwear Deconstruction", 
        section: "Footwear", 
        desc: "Layered shoe upper PU leather, tongue lining, polyester padding, and insole construction." 
      },
      { 
        page: 49, 
        id: "p49_2", 
        title: "Nike Air Force 1 Deep Dive", 
        section: "Footwear", 
        desc: "AF1 reverse engineering: medallion hole pattern, double stitching, and Nike Air sole unit." 
      },
      { 
        page: 50, 
        id: "p50_2", 
        title: "Vizcom Trial", 
        section: "Generative AI", 
        desc: "I brought one of my sketches to Vizcom and experimented with various prompts, played around with reference images to see how they impact the final image." 
      },
      { 
        page: 51, 
        id: "p51_12", 
        title: "Models and Prototypes", 
        section: "Physical Prototyping", 
        desc: "High-gloss styling clay heels, physical speaker foam mockups, and 3-axis CNC polyurethane sole toolpaths at Strate Makerspace." 
      },
      { 
        page: 52, 
        id: "p52_2", 
        title: "Spandigit Social — Digital Marketing Internship", 
        section: "Learnings", 
        desc: "Digital Marketing Intern (June - July 2023). Developed a new perspective in aligning marketing with design. Enhanced ability to create user-centric designs based on audience behavioral preferences." 
      }
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

/* --- 1. NAVBAR (AUTHENTIC JINENDRA PARAKH BRANDING) --- */
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
              JP
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-sm sm:text-base tracking-tight text-[#151F27] uppercase leading-none">
                JINENDRA PARAKH
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#151F27]/60">
                Product Design Portfolio 2025
              </span>
            </div>
          </a>

          {activeProject && (
            <button
              onClick={onBackToGrid}
              className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151F27]/5 hover:bg-[#151F27] hover:text-white text-[#151F27] font-mono text-xs font-semibold transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Projects</span>
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 font-sans text-xs font-semibold uppercase tracking-wider text-[#151F27]/80">
          <button 
            onClick={() => scrollTo('projects')}
            className="hover:text-black transition-colors cursor-pointer py-1 border-b-2 border-transparent hover:border-[#FF5500]"
          >
            Projects
          </button>
          <button 
            onClick={() => scrollTo('about')}
            className="hover:text-black transition-colors cursor-pointer py-1 border-b-2 border-transparent hover:border-[#FF5500]"
          >
            About & Skills
          </button>
          <button 
            onClick={() => scrollTo('experience')}
            className="hover:text-black transition-colors cursor-pointer py-1 border-b-2 border-transparent hover:border-[#FF5500]"
          >
            Experience
          </button>
          <button 
            onClick={() => scrollTo('contact')}
            className="hover:text-black transition-colors cursor-pointer py-1 border-b-2 border-transparent hover:border-[#FF5500]"
          >
            Let's Connect
          </button>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <a 
            href="/Jinendra_Parakh_Resume.pdf" 
            target="_blank" 
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#151F27]/20 text-[#151F27] hover:border-[#FF5500] hover:text-[#FF5500] font-mono text-xs font-semibold transition-all"
            title="Download Technical Resume"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>

          <a 
            href="mailto:parakhjinendra@gmail.com"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#151F27] text-white font-sans text-xs font-bold uppercase tracking-wider hover:bg-[#FF5500] transition-all shadow-xs"
          >
            <span>Let's Connect</span>
            <IdeoArrow className="w-3 h-3 text-white group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

      </div>
    </header>
  );
}

/* --- 2. AUTHENTIC HERO SECTION (PAGE 2 PORTFOLIO TEXT: ‘BUILDING DESIRES’) --- */
function IdeoHero({ onSelectProject }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="bg-[#FBFBFA] pt-14 sm:pt-20 pb-16 sm:pb-24 border-b border-[#151F27]/10">
      <div className="max-w-[1440px] w-full mx-auto px-6 sm:px-10 lg:px-12 space-y-12 sm:space-y-16">
        
        {/* Authentic Header Kicker */}
        <div className="space-y-4 max-w-6xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#151F27]/70 uppercase tracking-widest bg-[#151F27]/5 px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#FF5500]"></span>
            <span>PORTFOLIO PRODUCT DESIGN 2025 // JINENDRA PARAKH</span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-display tracking-tight text-[#151F27] leading-[0.95] uppercase">
            ‘ BUILDING <br />
            <span className="text-[#FF5500]">DESIRES ’</span>
          </h1>
        </div>

        {/* Authentic Statement from Page 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-14 pt-8 border-t border-[#151F27]/15">
          <div className="lg:col-span-7 space-y-5">
            <p className="text-xl sm:text-2xl md:text-3xl font-light text-[#151F27] leading-relaxed">
              "On a mission to change the way we look at things, I’m Jinendra a product designer, passionate about creating products and build unique experience. I believe every object has a story to tell and experience to create. My goal is to blend functionality with aesthetics, creating meaningful solutions that not only solve problems but also build aspirations."
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-xs text-[#151F27]/60 uppercase tracking-wider">
              <span>B.Sc. Product Design — Strate School of Design, Bangalore</span>
              <span>•</span>
              <span>Nashik / Pune / Bangalore</span>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between space-y-4 font-sans text-sm">
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-widest text-[#151F27]/50 block mb-2 font-bold">
                PORTFOLIO CONTENTS (4 PROJECTS)
              </span>
              
              {PORTFOLIO_PROJECTS.map((p) => (
                <button
                  key={p.slug}
                  onClick={() => onSelectProject(p)}
                  className="w-full group flex items-center justify-between py-2.5 border-b border-[#151F27]/10 hover:border-[#FF5500] transition-all text-left cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#FF5500]">{p.num}</span>
                    <span className="font-bold text-[#151F27] group-hover:text-[#FF5500] transition-colors">{p.title}</span>
                    <span className="text-[#151F27]/40 text-xs hidden sm:inline">— {p.subtitle}</span>
                  </div>
                  <IdeoArrow className="w-3.5 h-3.5 text-[#151F27] group-hover:text-[#FF5500] group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[#151F27]/70">
              <ArrowDown className="w-3.5 h-3.5 text-[#FF5500] animate-bounce" />
              <span>Click a project thumbnail below to view the full case study</span>
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
    <section id="projects" className="py-20 sm:py-28 bg-[#FBFBFA] text-[#151F27]">
      <div className="max-w-[1440px] w-full mx-auto px-6 sm:px-10 lg:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[#151F27]/15">
          <div className="space-y-1">
            <span className="font-mono text-xs font-bold text-[#FF5500] uppercase tracking-widest block">
              PORTFOLIO CONTENTS //
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-[#151F27]">
              Selected Projects
            </h2>
          </div>

          <p className="font-mono text-xs text-[#151F27]/60 uppercase tracking-widest">
            CLICK ANY THUMBNAIL TO OPEN THE ENTIRE PROJECT
          </p>
        </div>

        {/* 4 Project Thumbnails Grid (Exact 1-to-1 Sequence: 01 Fuel, 02 Vantage, 03 Friday, 04 Misc) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
          {PORTFOLIO_PROJECTS.map((proj) => (
            <div
              key={proj.slug}
              onClick={() => onSelectProject(proj)}
              className="group cursor-pointer flex flex-col justify-between rounded-3xl bg-white border border-[#151F27]/10 p-6 sm:p-8 hover:border-[#FF5500] hover:shadow-2xl transition-all duration-300"
            >
              {/* Top Meta */}
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-[#151F27] text-white font-bold text-[11px]">
                      {proj.num}
                    </span>
                    <span className="text-[#FF5500] font-bold uppercase tracking-wider text-[11px]">
                      {proj.subtitle}
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
                      <IdeoArrow className="w-3.5 h-3.5 text-white" />
                    </span>
                  </div>
                </div>

                {/* Typography */}
                <div className="space-y-2 pt-2">
                  <h3 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-[#151F27] group-hover:text-[#FF5500] transition-colors">
                    {proj.title} : {proj.subtitle}
                  </h3>
                  <p className="text-sm font-light text-[#151F27]/80 line-clamp-2 leading-relaxed">
                    {proj.authenticSummary}
                  </p>
                </div>
              </div>

              {/* Bottom Info Bar & CTA */}
              <div className="pt-6 mt-6 border-t border-[#151F27]/10 flex items-center justify-between text-xs font-mono">
                <span className="text-[#151F27]/60 line-clamp-1 max-w-[70%]">
                  {proj.projectType} • {proj.duration}
                </span>

                <span className="inline-flex items-center gap-1.5 font-bold text-[#151F27] group-hover:text-[#FF5500] transition-colors shrink-0">
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
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#151F27] text-white hover:bg-[#FF5500] font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Projects</span>
          </button>

          <div className="hidden sm:flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded bg-[#FF5500] text-white font-bold text-[10px]">
              PROJECT {project.num}
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
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#151F27]/20 text-[#151F27] hover:border-[#FF5500] hover:text-[#FF5500] font-bold text-xs uppercase cursor-pointer"
              title="Fullscreen Slide Deck"
            >
              <ZoomIn className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Deck Mode</span>
            </button>

            <button
              onClick={() => onSelectNext(nextProject)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#151F27]/5 hover:bg-[#FF5500] hover:text-white text-[#151F27] font-semibold text-xs transition-colors cursor-pointer"
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
              PROJECT {project.num} // {project.categoryTag}
            </span>
            <span className="text-white/60 uppercase tracking-widest font-semibold">
              {project.duration} • {project.projectType}
            </span>
            <span className="text-white/40 hidden sm:inline">•</span>
            <span className="text-[#FF5500] font-mono text-xs font-bold">
              {project.pagesRange} ({project.slidesCount} Plates)
            </span>
          </div>

          <div className="space-y-4 max-w-4xl">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-display uppercase tracking-tight text-white leading-none">
              {project.title}
            </h1>
            <p className="text-xl sm:text-2xl font-light text-white/85 leading-snug">
              {project.authenticSummary}
            </p>
          </div>

          {/* Authentic Metadata Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10 font-mono text-xs">
            <div>
              <span className="text-white/40 block text-[10px] uppercase mb-1">PROJECT TYPE</span>
              <span className="text-white font-semibold">{project.projectType}</span>
            </div>
            <div>
              <span className="text-white/40 block text-[10px] uppercase mb-1">DURATION</span>
              <span className="text-white font-semibold">{project.duration}</span>
            </div>
            <div>
              <span className="text-white/40 block text-[10px] uppercase mb-1">PORTFOLIO DECK RANGE</span>
              <span className="text-[#FF5500] font-semibold">{project.pagesRange} ({project.slidesCount} Plates)</span>
            </div>
          </div>
        </div>

        {/* Scroll Instruction Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-[#151F27]/15 font-mono text-xs">
          <div className="flex items-center gap-2 text-[#151F27]">
            <ArrowDown className="w-4 h-4 text-[#FF5500] animate-bounce" />
            <span className="font-bold uppercase tracking-wider">
              ALL {project.slidesCount} PLATES IN 1-TO-1 PORTFOLIO SEQUENCE
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
                <p className="text-[#151F27]/80 leading-relaxed max-w-4xl">
                  {slide.desc}
                </p>
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
            <span>Return to All Projects</span>
          </button>

          <button
            onClick={() => onSelectNext(nextProject)}
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#151F27] hover:bg-[#FF5500] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-lg transition-all cursor-pointer"
          >
            <span>Proceed to Next Project: {nextProject.num} // {nextProject.title}</span>
            <IdeoArrow className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </motion.section>
  );
}

/* --- 5. AUTHENTIC SKILLS, EDUCATION & INTERESTS (FROM RESUME & PAGE 2) --- */
function AuthenticAboutAndSkills() {
  const softwares = [
    "Rhinoceros 3D",
    "Fusion 360",
    "Keyshot 3D",
    "Procreate",
    "Photoshop",
    "Illustrator",
    "Vizcom"
  ];

  const hardSkills = [
    "3D Modeling",
    "Rapid Prototyping",
    "3D Printing",
    "Sketching",
    "User Research"
  ];

  const softSkills = [
    "Emotional Intelligence",
    "Empathetic",
    "Team Player",
    "Adaptive"
  ];

  const education = [
    {
      degree: "B.Sc, Product Design",
      school: "Strate School of Design",
      location: "Bangalore"
    },
    {
      degree: "12th Science, PCM",
      school: "Matoshri Junior College",
      location: "Nashik"
    },
    {
      degree: "10th, ICSE",
      school: "Anubhuti Residential School",
      location: "Jalgaon, Maharashtra"
    }
  ];

  const interests = [
    "Table Tennis",
    "Human Psychology",
    "Business Case Studies & Marketing",
    "Interior Design",
    "Entrepreneurship"
  ];

  return (
    <section id="about" className="py-20 sm:py-28 bg-[#151F27] text-white">
      <div className="max-w-[1440px] w-full mx-auto px-6 sm:px-10 lg:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div className="space-y-2 max-w-2xl">
            <span className="font-mono text-xs font-bold text-[#FF5500] uppercase tracking-widest block">
              PAGE 02 // ABOUT & CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-white leading-tight">
              Skills, Software & Education
            </h2>
          </div>

          <p className="font-sans text-sm text-white/70 max-w-md font-light">
            Sourced directly from Jinendra Parakh's authentic product design portfolio and professional resume.
          </p>
        </div>

        {/* Grid Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Softwares */}
          <div className="p-8 rounded-2xl bg-white/[0.04] border border-white/10 space-y-6">
            <div className="flex items-center gap-2 text-[#FF5500] font-mono text-xs font-bold uppercase tracking-wider">
              <Wrench className="w-4 h-4" />
              <span>SOFTWARES</span>
            </div>
            <ul className="space-y-2.5 font-mono text-xs text-white/80">
              {softwares.map((s, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500]"></span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Hard Skills & Soft Skills */}
          <div className="p-8 rounded-2xl bg-white/[0.04] border border-white/10 space-y-6">
            <div className="flex items-center gap-2 text-[#FF5500] font-mono text-xs font-bold uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>HARD & SOFT SKILLS</span>
            </div>
            <div className="space-y-4">
              <div>
                <span className="font-mono text-[10px] text-white/40 uppercase block mb-1.5">HARD SKILLS</span>
                <ul className="space-y-1.5 font-mono text-xs text-white/80">
                  {hardSkills.map((h, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-white/10">
                <span className="font-mono text-[10px] text-white/40 uppercase block mb-1.5">SOFT SKILLS</span>
                <ul className="space-y-1.5 font-mono text-xs text-white/80">
                  {softSkills.map((s, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500]"></span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="p-8 rounded-2xl bg-white/[0.04] border border-white/10 space-y-6">
            <div className="flex items-center gap-2 text-[#FF5500] font-mono text-xs font-bold uppercase tracking-wider">
              <GraduationCap className="w-4 h-4" />
              <span>EDUCATION</span>
            </div>
            <div className="space-y-4 font-mono text-xs">
              {education.map((edu, idx) => (
                <div key={idx} className="space-y-0.5">
                  <span className="text-white font-bold block">{edu.degree}</span>
                  <span className="text-white/60 block text-[11px]">{edu.school}</span>
                  <span className="text-white/40 block text-[10px]">{edu.location}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="p-8 rounded-2xl bg-white/[0.04] border border-white/10 space-y-6">
            <div className="flex items-center gap-2 text-[#FF5500] font-mono text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>INTERESTS</span>
            </div>
            <ul className="space-y-2.5 font-mono text-xs text-white/80">
              {interests.map((int, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500]"></span>
                  <span>{int}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
}

/* --- 6. AUTHENTIC EXPERIENCE SECTION (SOURCED DIRECTLY FROM RESUME) --- */
function AuthenticExperience() {
  const experiences = [
    {
      company: "Ticket Design, Pune",
      role: "Industrial Design Intern",
      period: "Mar — July 2024",
      points: [
        "Collaborated with Senior Designers and Engineers on global projects including Water Dispensers, Air Fresheners, Medical devices (DVT) Keypad.",
        "Involved in the whole product life-cycle from research to development and prototyping.",
        "Successfully contributed to 4 projects with 2 designs selected by clients for further development.",
        "Assisted in ADI presentations and undertook side projects under mentorship."
      ]
    },
    {
      company: "A&T Video Networks",
      role: "Industry Project (Grade 'O')",
      period: "Duration: 4 Months",
      points: [
        "Redesigned a web and PTZ camera with internal constraints. Worked with engineers on its development and prototyping.",
        "Worked on user research, market analysis, product marketing and placement.",
        "Created a cohesive Brand Language for the company and redesigned its logo.",
        "Earned ‘O’ Grade for the project (Vantage)."
      ]
    },
    {
      company: "Freelance Interior Design Project",
      role: "Freelance Designer (Nashik)",
      period: "September 2024 — March 2025",
      points: [
        "Assisted architect in executing interior designs for a bungalow, learning hands-on about space planning, materials, and furniture design.",
        "Managed on-site coordination with labourers and vendors, resolving design conflicts and working around constraints.",
        "Helped selecting material and colour options while considering practicality, aesthetics, and budget.",
        "Identifying gaps between drawings and on-site builds and learnt how to address them."
      ]
    },
    {
      company: "Spandigit Social, Nashik",
      role: "Digital Marketing Intern",
      period: "June — July 2023",
      points: [
        "Conducted brand and demographic research to recognize target audience and optimize target campaigns accordingly.",
        "Managed Google and Facebook Ads, increasing click through rates; gained hands-on experience on SEO and backlinking.",
        "Successfully ran 2 campaigns for a shopping mall to increase footfalls during festive season.",
        "Developed a new perspective in aligning marketing with user-centric industrial design."
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 sm:py-28 bg-[#EFEFED] border-y border-[#151F27]/10 text-[#151F27]">
      <div className="max-w-[1440px] w-full mx-auto px-6 sm:px-10 lg:px-12 space-y-16">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[#151F27]/15">
          <div className="space-y-1 max-w-2xl">
            <span className="font-mono text-xs font-bold text-[#FF5500] uppercase tracking-widest block">
              RESUME // PROFESSIONAL EXPERIENCE
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-[#151F27]">
              Work Experience
            </h2>
          </div>

          <a 
            href="/Jinendra_Parakh_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#151F27] hover:bg-[#FF5500] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Full Resume PDF</span>
          </a>
        </div>

        {/* Experience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {experiences.map((exp, idx) => (
            <div 
              key={idx}
              className="p-8 rounded-3xl bg-white border border-[#151F27]/10 flex flex-col justify-between space-y-6 shadow-xs"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="px-2.5 py-0.5 rounded bg-[#151F27] text-white font-bold text-[10px]">
                    {exp.period}
                  </span>
                  <span className="text-[#FF5500] font-bold text-[11px] uppercase">
                    {exp.role}
                  </span>
                </div>
                <h3 className="text-2xl font-black font-display uppercase tracking-tight text-[#151F27] pt-1">
                  {exp.company}
                </h3>
              </div>

              <ul className="space-y-2.5 font-sans text-xs text-[#151F27]/80 leading-relaxed font-light">
                {exp.points.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] mt-1.5 shrink-0"></span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* --- 7. AUTHENTIC CONTACT SECTION (PAGE 53 & RESUME) --- */
function IdeoContact({ onSelectProject }) {
  return (
    <footer id="contact" className="py-20 sm:py-32 bg-[#151F27] text-white">
      <div className="max-w-[1440px] w-full mx-auto px-6 sm:px-10 lg:px-12 space-y-16">
        
        {/* Top Big Callout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          <div className="lg:col-span-8 space-y-4">
            <span className="font-mono text-xs font-bold text-[#FF5500] uppercase tracking-widest block">
              PAGE 53 // LET’S CONNECT
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-display uppercase tracking-tight text-white leading-tight">
              LET’S <span className="text-[#FF5500]">CONNECT</span>
            </h2>
            <p className="text-lg sm:text-xl font-light text-white/70 max-w-xl">
              Jinendra Parakh — Product Designer, Strate School of Design, Bangalore.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end space-y-4">
            <a 
              href="mailto:parakhjinendra@gmail.com"
              className="group flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-[#FF5500] hover:text-white transition-all border border-white/10"
            >
              <div>
                <span className="font-mono text-[10px] uppercase text-white/50 group-hover:text-white/80 block">EMAIL ADDRESS</span>
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
            href="https://www.behance.net/gallery/223719061/Design-Portfolio"
            target="_blank"
            rel="noreferrer"
            className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#FF5500] transition-all flex items-center justify-between group"
          >
            <div>
              <span className="text-white font-bold block">BEHANCE PORTFOLIO</span>
              <span className="text-white/50 text-[10px]">Online Gallery</span>
            </div>
            <ExternalLink className="w-4 h-4 text-white/50 group-hover:text-white" />
          </a>

          <a 
            href="https://www.linkedin.com/in/jinendra-parakh-7b643a228"
            target="_blank"
            rel="noreferrer"
            className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#FF5500] transition-all flex items-center justify-between group"
          >
            <div>
              <span className="text-white font-bold block">LINKEDIN PROFILE</span>
              <span className="text-white/50 text-[10px]">Professional Network</span>
            </div>
            <ExternalLink className="w-4 h-4 text-white/50 group-hover:text-white" />
          </a>
        </div>

        {/* Colophon Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-[11px] text-white/40">
          <div>
            © {new Date().getFullYear()} JINENDRA PARAKH. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-3 uppercase tracking-wider">
            <span>STRATE SCHOOL OF DESIGN, BANGALORE</span>
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
    document.title = "Jinendra Parakh | Product Design Portfolio 2025 (oddhours.co.in)";

    const syncFromHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash) {
        const found = PORTFOLIO_PROJECTS.find(p => p.slug === hash || `project-${p.slug}` === hash);
        if (found) {
          setActiveProject(found);
          return;
        }
      }
      if (hash === '' || hash === 'projects' || hash === 'hero' || hash === 'about' || hash === 'experience') {
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
      const el = document.getElementById('projects');
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
          
          {/* Header */}
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
                /* --- HOMEPAGE VIEW: ONLY THUMBNAILS & AUTHENTIC PROFILE DATA --- */
                <motion.div
                  key="homepage"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Authentic Hero: 'BUILDING DESIRES' & Mission Statement from Page 2 */}
                  <IdeoHero onSelectProject={handleSelectProject} />

                  {/* 4 Selected Projects: Thumbnails Grid (Exact 1-to-1 Sequence) */}
                  <IdeoInquiriesGrid onSelectProject={handleSelectProject} />

                  {/* Authentic About, Skills & Softwares from Page 2 & Resume */}
                  <AuthenticAboutAndSkills />

                  {/* Authentic Experience from Resume */}
                  <AuthenticExperience />

                  {/* Authentic Let's Connect (Page 53) */}
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