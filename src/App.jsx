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
  ChevronLeft
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

/* --- LIGHTBOX CONTEXT --- */
const LightboxContext = createContext({
  openLightbox: (imgData, galleryList = []) => {},
  closeLightbox: () => {}
});

export function useLightbox() {
  return useContext(LightboxContext);
}

/* --- APPLE FLUID CUSTOM CURSOR (DOT -> GLASS 'VIEW' BUBBLE) --- */
function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState('default'); // 'default' | 'view' | 'pointer'
  const [isVisible, setIsVisible] = useState(false);

  // Smooth spring physics for fluid Apple cursor motion
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
          className="w-16 h-16 rounded-full bg-white/85 text-black font-mono text-[10px] font-black uppercase tracking-widest flex items-center justify-center shadow-2xl backdrop-blur-xl border border-white/60"
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
      className="fixed inset-0 z-50 bg-black/92 backdrop-blur-3xl flex flex-col justify-between p-4 sm:p-6 select-none"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="flex items-center justify-between text-white font-mono text-xs z-10">
        <div className="flex items-center gap-3">
          <span className="text-[#FF3B1D] font-black">ODD HOURS</span>
          <span className="text-white/40">•</span>
          <span className="uppercase text-white/90 font-bold tracking-wider">{activeItem.title || "Hardware Plate"}</span>
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

        {gallery.length > 1 && (
          <>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onNavigate(gallery[(currentIdx - 1 + gallery.length) % gallery.length]);
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-[#FF3B1D] text-white transition-colors cursor-pointer shadow-xl backdrop-blur-md"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onNavigate(gallery[(currentIdx + 1) % gallery.length]);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-[#FF3B1D] text-white transition-colors cursor-pointer shadow-xl backdrop-blur-md"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      <div className="text-center font-mono text-xs text-white/70 max-w-2xl mx-auto z-10">
        <p>{activeItem.cmf || activeItem.caption || activeItem.desc}</p>
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
          className="pointer-events-auto flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/75 backdrop-blur-xl border border-white/60 shadow-lg hover:bg-white transition-all cursor-pointer group"
        >
          <div className="w-5 h-5 rounded bg-black text-white flex items-center justify-center font-display font-black text-[10px] tracking-tighter">
            OH
          </div>
          <span className="font-display font-black text-xs sm:text-sm tracking-tight text-black uppercase leading-none">
            ODD HOURS
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B1D]" />
        </a>

        {/* Action Capsules */}
        <div className="pointer-events-auto flex items-center gap-2 font-mono text-xs">
          <button 
            onClick={() => scrollTo('bento')}
            className="hidden sm:inline-flex px-4 py-2 rounded-full bg-white/75 backdrop-blur-xl border border-white/60 text-neutral-700 hover:text-black font-semibold shadow-xs transition-all cursor-pointer"
          >
            Hardware
          </button>
          
          <a 
            href="/Jinendra_Parakh_Resume.pdf" 
            target="_blank" 
            rel="noreferrer"
            className="px-4 py-2 rounded-full bg-white/75 backdrop-blur-xl border border-white/60 text-neutral-800 hover:text-black font-semibold shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
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

  // Scroll-linked animation: scale down from full-bleed to rounded card as user scrolls
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
      className="relative min-h-[140vh] bg-[#ffffff] flex flex-col items-center"
    >
      {/* Sticky Full-Bleed to Floating Card Stage */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden p-0 sm:p-4 md:p-6">
        <motion.div 
          style={{ 
            scale, 
            borderRadius,
            opacity
          }}
          className="relative w-full h-full overflow-hidden bg-[#0d0d0f] shadow-2xl flex items-center justify-center will-change-transform"
        >
          {/* Edge-to-Edge High-Resolution 3D Hardware Centerpiece */}
          <img 
            src={resolveImg("p2_2")} 
            alt="Vantage 360° Hardware Architecture"
            className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
            priority="true"
          />

          {/* Cinematic Vignette & Specular Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/60 pointer-events-none" />

          {/* Ultra-Minimal High-Contrast Headline (Zero Paragraphs) */}
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
              ODD HOURS // INDUSTRIAL DESIGN
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
              <span>Scroll to Explore Hardware</span>
              <ArrowDown className="w-3.5 h-3.5 text-[#FF3B1D] animate-bounce" />
            </motion.div>
          </motion.div>

          {/* Micro Corner Spec Pill */}
          <div className="absolute bottom-8 left-8 sm:bottom-10 sm:left-10 z-10 font-mono text-[10px] text-white/50 uppercase tracking-widest hidden sm:block">
            FIG 01. VANTAGE 360° // DUAL-AXIS ARCHITECTURE
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* --- 3. THE "BENTO BOX" GRID LAYOUT (ASYMMETRICAL APPLE HARDWARE TILES) --- */
function BentoGrid() {
  const { openLightbox } = useLightbox();

  // Curated hardware portfolio items with exact micro-copy (Name, CMF, Year)
  const bentoProjects = [
    {
      id: "p2_2",
      name: "Vantage 360°",
      cmf: "Anodized 6061 Aluminum • Sandblasted 120# • Optical Glass",
      year: "2025",
      span: "col-span-12 lg:col-span-8",
      aspect: "aspect-[16/10] sm:aspect-[16/9]",
      gallery: [
        { id: "p2_2", title: "Vantage 360° Centerpiece", cmf: "Anodized 6061 Aluminum • Sandblasted 120# • Optical Glass" },
        { id: "p3_2", title: "Mechanical Exploded Assembly", cmf: "Dual-Axis Hinge • Magnetic Pogo-Pin Detent" },
        { id: "p11_4", title: "Form Semantics & Blueprint", cmf: "323mm Boom Arm • Counterweighted Monitor Clamp" }
      ]
    },
    {
      id: "p18_2",
      name: "Fuel Handheld",
      cmf: "Matte Polycarbonate • VDI 3400 • MagSafe Coil",
      year: "2024",
      span: "col-span-12 lg:col-span-4",
      aspect: "aspect-[4/3] lg:aspect-auto lg:h-full",
      gallery: [
        { id: "p18_2", title: "Fuel Handheld Hero", cmf: "Matte Polycarbonate • VDI 3400 • CNC Aluminum Rim" },
        { id: "p24_2", title: "Fuel Exploded Internals", cmf: "Mechanical Linear Switch • Segment LED Display" }
      ]
    },
    {
      id: "p30_2",
      name: "Friday Boot",
      cmf: "Milled High-Density PU • High-Gloss Lacquer",
      year: "2025",
      span: "col-span-12 sm:col-span-6 lg:col-span-4",
      aspect: "aspect-[4/3] sm:aspect-square",
      gallery: [
        { id: "p30_2", title: "Friday Boot Silhouette", cmf: "UK 11 Biomechanical Ergonomics • Sculptural Collar" },
        { id: "p37_2", title: "Sole Toolpath CAD", cmf: "3-Axis CNC Milled Polyurethane Platform" }
      ]
    },
    {
      id: "p44_2",
      name: "Glass Vessel",
      cmf: "Hand-Blown Borosilicate • Twisted Copper Wire",
      year: "2024",
      span: "col-span-12 sm:col-span-6 lg:col-span-4",
      aspect: "aspect-[4/3] sm:aspect-square",
      gallery: [
        { id: "p44_2", title: "Acoustic Glass Vessel", cmf: "Resonant Double Hourglass • Vibration-Isolating Cradle" }
      ]
    },
    {
      id: "p51_12",
      name: "CNC Sole Tooling",
      cmf: "High-Density PU Foam • 1:1 Toolpath Routing",
      year: "2025",
      span: "col-span-12 lg:col-span-4",
      aspect: "aspect-[4/3] sm:aspect-square",
      gallery: [
        { id: "p51_12", title: "Makerspace 3-Axis CNC Routing", cmf: "Polyurethane Foam Sole Tooling" },
        { id: "p47_2", title: "AF1 Sneaker Deconstruction", cmf: "Reverse Engineering Strobel Board & Air Unit" }
      ]
    },
    {
      id: "p1_2",
      name: "Chronograph 01",
      cmf: "Knurled Steel Pushers • Sapphire Crystal",
      year: "2024",
      span: "col-span-12",
      aspect: "aspect-[21/9] sm:aspect-[24/9]",
      gallery: [
        { id: "p1_2", title: "Mechanical Chronograph Sketch", cmf: "Original Perspective Study by Jinendra Parakh" }
      ]
    }
  ];

  return (
    <section id="bento" className="py-24 sm:py-32 bg-[#ffffff] text-[#1d1d1f]">
      <div className="max-w-[1440px] w-full mx-auto px-6 sm:px-10">
        
        {/* Section Header */}
        <div className="flex items-center justify-between pb-8 mb-10 border-b border-black/[0.06] font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[#FF3B1D] font-bold">01 //</span>
            <span className="text-black font-bold uppercase tracking-widest">SELECTED HARDWARE</span>
          </div>
          <span className="text-neutral-400 uppercase tracking-widest hidden sm:inline">
            ASYMMETRICAL BENTO BOX • HOVER TO VIEW
          </span>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-12 gap-6 sm:gap-8">
          {bentoProjects.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              data-cursor="view"
              onClick={() => openLightbox({ src: resolveImg(item.id), title: item.name, cmf: item.cmf, ...item }, item.gallery)}
              className={`${item.span} relative rounded-3xl overflow-hidden bg-white/70 backdrop-blur-md border border-black/[0.08] shadow-sm hover:shadow-2xl transition-all duration-500 ease-out group cursor-pointer hover:scale-[1.015] active:scale-[0.99]`}
            >
              {/* Image Container with Restrained Zoom */}
              <div className={`w-full ${item.aspect} overflow-hidden bg-neutral-100 relative`}>
                <img 
                  src={resolveImg(item.id)} 
                  alt={item.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out select-none"
                  loading="lazy"
                />

                {/* Ambient Subtle Gradient Rim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Ultra-Minimal Micro-Copy (Name, CMF, Year) in Bottom Corner */}
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white pointer-events-none z-10">
                  <div className="space-y-1">
                    <h3 className="text-xl sm:text-2xl font-black font-display uppercase tracking-tight text-white leading-tight drop-shadow-md">
                      {item.name}
                    </h3>
                    <p className="font-mono text-xs text-white/80 font-light tracking-wide drop-shadow-sm line-clamp-1">
                      {item.cmf}
                    </p>
                  </div>
                  
                  <span className="font-mono text-xs text-white/70 font-bold tracking-widest pl-4 shrink-0">
                    {item.year}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* --- 4. ULTRA-MINIMAL CONTACT SIGN-OFF (ZERO PHILOSOPHICAL WALLS OF TEXT) --- */
function ContactSection() {
  return (
    <footer id="contact" className="py-20 sm:py-28 bg-[#fafafa] border-t border-black/[0.06] text-[#1d1d1f]">
      <div className="max-w-[1440px] w-full mx-auto px-6 sm:px-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-16 border-b border-black/[0.08]">
          <div className="space-y-3">
            <span className="font-mono text-xs font-bold text-[#FF3B1D] uppercase tracking-widest block">
              // ODD HOURS STUDIO
            </span>
            <h2 className="text-4xl sm:text-6xl font-black font-display uppercase tracking-tight text-black leading-none">
              oddhours.co.in
            </h2>
            <p className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
              Jinendra Parakh • Industrial Design • Bangalore / Pune
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
              href="/Jinendra_Parakh_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-full bg-white hover:bg-neutral-100 border border-black/10 text-neutral-800 font-semibold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-neutral-500" />
              <span>Resume (PDF)</span>
            </a>
          </div>
        </div>

        {/* Legal Micro Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-neutral-400 text-[11px] font-mono">
          <div>
            © {new Date().getFullYear()} ODD HOURS // JINENDRA PARAKH. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-4 uppercase tracking-wider text-[10px]">
            <span>STRATE SCHOOL OF DESIGN '25</span>
            <span className="text-[#FF3B1D] font-bold">ODDHOURS.CO.IN</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

/* --- 5. MAIN ROOT APP --- */
export default function App() {
  const [lightboxState, setLightboxState] = useState({
    activeItem: null,
    gallery: []
  });

  useEffect(() => {
    document.title = "ODD HOURS — Industrial Design (oddhours.co.in)";
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
          {/* Subtle Apple Custom Cursor */}
          <CustomCursor />
          
          {/* Floating Minimal Glass Navbar */}
          <Navbar />
          
          <main className="flex-grow">
            <Routes>
              <Route path="*" element={
                <>
                  {/* The Hero: Edge-to-Edge with Scroll-Linked Scale & Radius Fidget */}
                  <TheHero />

                  {/* The Bento Box: Asymmetrical Glassmorphic Hardware Grid */}
                  <BentoGrid />

                  {/* Ultra-Minimal Contact */}
                  <ContactSection />
                </>
              } />
            </Routes>
          </main>

          {/* Precision Lightbox Inspection */}
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