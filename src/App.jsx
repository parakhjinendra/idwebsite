import React, { useState, useEffect, useRef, Component, createContext, useContext } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useParams, 
  useNavigate,
  useLocation
} from 'react-router-dom';
import { 
  ArrowUpRight, 
  ArrowLeft, 
  ArrowUp, 
  Menu, 
  X, 
  Download, 
  ExternalLink,
  Sliders,
  ImageIcon,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  Layers,
  Eye,
  CheckCircle2,
  Phone,
  Mail,
  ChevronRight,
  ChevronLeft,
  Filter,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import portfolioImages from './portfolioImages.json';

/* --- CUSTOM SOCIAL ICONS --- */
function LinkedinIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 0 0 1.53-1.53A1.53 1.53 0 0 0 6.46 5.7a1.53 1.53 0 0 0-1.53 1.53c0 .85.68 1.53 1.53 1.53m1.4 9.74v-8.37H5.06v8.37h2.8z"/>
    </svg>
  );
}

function BehanceIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-4.726 3-3.266 0-5.5-2.29-5.5-5.5 0-3.09 2.197-5.5 5.5-5.5 3.407 0 5.253 2.508 5.034 5.867h-7.791c.071 1.528 1.328 2.633 2.757 2.633 1.314 0 2.215-.658 2.551-1.5h2.175zm-7.464-4h5.275c-.104-1.353-1.144-2.133-2.6-2.133-1.503 0-2.529.83-2.675 2.133zm-11.262 7h-5v-14h5.586c3.084 0 5.014 1.547 5.014 4.09 0 1.621-.869 2.871-2.246 3.453 1.838.563 2.646 2.059 2.646 3.867 0 2.844-2.197 4.59-6 4.59zm-2.5-8.25h2.6c1.613 0 2.6-.713 2.6-1.975 0-1.229-.987-1.925-2.6-1.925h-2.6v3.9zm0 6.25h2.85c1.801 0 2.9-.844 2.9-2.281 0-1.408-1.099-2.269-2.9-2.269h-2.85v4.55z"/>
    </svg>
  );
}

/* --- LIGHTBOX CONTEXT --- */
const LightboxContext = createContext({
  openLightbox: (imgData, galleryList = []) => {},
  closeLightbox: () => {}
});

export function useLightbox() {
  return useContext(LightboxContext);
}

/* --- RESOLVE IMAGE PATH FROM MAPPING --- */
export function resolveImg(idOrPath) {
  if (!idOrPath) return '';
  const raw = String(idOrPath).trim();
  if (raw.startsWith('http://') || raw.startsWith('https://') || raw.startsWith('data:')) {
    return raw;
  }
  
  // 1. Direct match in portfolioImages
  if (portfolioImages[raw]) return portfolioImages[raw];
  
  // 2. Match without extension
  const withoutExt = raw.replace(/\.[^/.]+$/, "");
  if (portfolioImages[withoutExt]) return portfolioImages[withoutExt];
  
  // 3. Match filename only
  const filename = raw.split(/[/\\]/).pop();
  if (portfolioImages[filename]) return portfolioImages[filename];
  const fileWithoutExt = filename.replace(/\.[^/.]+$/, "");
  if (portfolioImages[fileWithoutExt]) return portfolioImages[fileWithoutExt];
  
  // 4. Normalization for web paths
  if (raw.startsWith('/portfolio')) return raw.replace(/\\/g, '/');
  if (raw.startsWith('public/portfolio')) return '/' + raw.slice(7).replace(/\\/g, '/');
  if (raw.startsWith('/assets/portfolio')) return raw.replace(/\\/g, '/');
  if (raw.startsWith('src/assets/portfolio')) return '/assets/' + raw.slice(11).replace(/\\/g, '/');
  if (raw.startsWith('src/assets/')) return '/' + raw.slice(4).replace(/\\/g, '/');
  
  return raw;
}

/* --- ZERO-LATENCY MINIMAL PRECISION CURSOR --- */
function CustomCursor() {
  const dotRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const checkHoverable = (e) => {
      const target = e.target;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('.cursor-pointer') ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', checkHoverable, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', checkHoverable);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className={`fixed top-0 left-0 pointer-events-none z-[99999] rounded-full will-change-transform transition-[width,height,margin,background-color,border] duration-150 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${
        isHovered
          ? 'w-8 h-8 -ml-4 -mt-4 bg-[#FF3B1D]/15 border border-[#FF3B1D]'
          : 'w-2 h-2 -ml-1 -mt-1 bg-[#FF3B1D]'
      }`}
    />
  );
}

/* --- SCROLL PROGRESS BAR --- */
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-[#FF3B1D] origin-left z-[100]"
      style={{ scaleX }}
    />
  );
}

/* --- ERROR BOUNDARY --- */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Portfolio caught an error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-[#f5f5f7] flex items-center justify-center p-6 font-mono text-xs">
          <div className="apple-card p-8 max-w-lg rounded-2xl shadow-2xl border border-white/10">
            <span className="bg-[#FF3B1D] text-white px-2.5 py-1 uppercase font-bold text-[10px] rounded-full">
              Notice
            </span>
            <h2 className="text-xl font-bold font-display uppercase tracking-tight text-white mt-4 mb-2">Something went wrong</h2>
            <p className="text-neutral-400 mb-6 font-mono">{this.state.error?.toString()}</p>
            <button 
              onClick={() => window.location.href = '/'}
              className="bg-white text-black hover:bg-[#FF3B1D] hover:text-white px-6 py-2.5 rounded-full uppercase font-bold tracking-wider transition-all duration-300"
            >
              Return to Works
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

/* --- SCROLL TO TOP FLOATING BUTTON --- */
function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed bottom-8 right-8 z-50 p-3.5 rounded-full bg-black text-white hover:bg-[#FF3B1D] transition-all flex items-center justify-center cursor-pointer shadow-lg"
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
}

/* --- FULLSCREEN IMAGE LIGHTBOX MODAL WITH GALLERY NAVIGATION --- */
function ImageLightboxModal({ activeItem, gallery = [], onClose, onNavigate }) {
  const [zoom, setZoom] = useState(1);

  const currentIndex = gallery && gallery.length > 0 && activeItem
    ? gallery.findIndex(item => 
        (item.src && activeItem.src && item.src === activeItem.src) ||
        (item.id && activeItem.id && item.id === activeItem.id)
      )
    : -1;

  const hasPrev = gallery && gallery.length > 1 && currentIndex > 0;
  const hasNext = gallery && gallery.length > 1 && currentIndex >= 0 && currentIndex < gallery.length - 1;

  const goToPrev = () => {
    if (hasPrev && onNavigate) {
      setZoom(1);
      onNavigate(gallery[currentIndex - 1]);
    }
  };

  const goToNext = () => {
    if (hasNext && onNavigate) {
      setZoom(1);
      onNavigate(gallery[currentIndex + 1]);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === '+' || e.key === '=') setZoom(z => Math.min(z + 0.25, 2.5));
      if (e.key === '-') setZoom(z => Math.max(z - 0.25, 0.75));
      if (e.key === '0') setZoom(1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, currentIndex, gallery, hasPrev, hasNext]);

  if (!activeItem) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100000] bg-black/94 backdrop-blur-md flex flex-col justify-between p-4 md:p-8 select-none"
        onClick={onClose}
      >
        {/* Lightbox Top Bar */}
        <div 
          className="flex items-center justify-between font-mono text-xs text-white/80 z-20 pb-3 border-b border-white/10"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#FF3B1D] rounded-full" />
            <span className="font-bold text-white tracking-widest uppercase">
              {currentIndex >= 0 ? `PLATE 0${currentIndex + 1} / 0${gallery.length}` : (activeItem.id ? `FIG. ${activeItem.id}` : 'PORTFOLIO PLATE')}
            </span>
            <span className="text-white/40 hidden sm:inline">|</span>
            <span className="text-white/80 text-[11px] truncate max-w-[280px] sm:max-w-md hidden sm:inline">
              {activeItem.title || activeItem.caption || activeItem.altText || 'Full Resolution Visual Document'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setZoom(z => Math.max(z - 0.25, 0.75))}
              className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
              title="Zoom Out (-)"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-mono text-white/60 min-w-[38px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom(z => Math.min(z + 0.25, 2.5))}
              className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
              title="Zoom In (+)"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoom(1)}
              className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors hidden sm:inline-flex"
              title="Reset Zoom (0)"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/15 hover:bg-[#FF3B1D] text-white transition-colors ml-1 sm:ml-2"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Center Canvas: 100% Unclipped Uncropped Image with Prev/Next Controls */}
        <div 
          className="relative flex-1 flex items-center justify-center overflow-auto p-2 sm:p-6 my-2"
          onClick={onClose}
        >
          {/* Previous Plate Button */}
          {hasPrev && (
            <button
              onClick={(e) => { e.stopPropagation(); goToPrev(); }}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-[#FF3B1D] text-white backdrop-blur-md transition-all shadow-xl group cursor-pointer"
              aria-label="Previous plate"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-0.5 transition-transform" />
            </button>
          )}

          {/* Next Plate Button */}
          {hasNext && (
            <button
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-[#FF3B1D] text-white backdrop-blur-md transition-all shadow-xl group cursor-pointer"
              aria-label="Next plate"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}

          <motion.img
            key={activeItem.src}
            src={activeItem.src}
            alt={activeItem.altText || activeItem.caption || "Expanded visual"}
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: zoom, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ type: "spring", damping: 26, stiffness: 220 }}
            onClick={e => e.stopPropagation()}
            className="max-h-[82vh] max-w-[92vw] w-auto h-auto object-contain select-none drop-shadow-2xl rounded-sm transition-transform duration-200"
          />
        </div>

        {/* Bottom Caption Bar */}
        <div 
          className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left font-mono text-[11px] text-white/70 pt-3 border-t border-white/10 z-20"
          onClick={e => e.stopPropagation()}
        >
          <div className="space-y-0.5 max-w-2xl">
            {activeItem.title && (
              <span className="font-bold text-white uppercase text-xs block font-display tracking-tight">
                {activeItem.title}
              </span>
            )}
            <p className="font-sans text-xs text-white/80 font-light">
              {activeItem.caption || activeItem.altText || "Jinendra Parakh Product Design Documentation 2025"}
            </p>
          </div>
          <div className="flex items-center gap-4 text-[10px] text-white/50 uppercase tracking-widest shrink-0">
            <span className="hidden md:inline">← / → to Navigate • +/- to Zoom</span>
            <span className="hidden md:inline">•</span>
            <a 
              href={activeItem.src} 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-[#FF3B1D] underline flex items-center gap-1"
            >
              <span>Raw Image</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* --- ZERO-CROPPING PROJECT IMAGE COMPONENT --- */
function ProjectImage({ 
  id, 
  altText, 
  caption = "",
  className = "", 
  imgClassName = "",
  fitMode = "object-contain", 
  withLoader = true,
  onClick = null,
  allowExpand = true,
  gallery = []
}) {
  const src = resolveImg(id);
  const [isLoaded, setIsLoaded] = useState(false);
  const { openLightbox } = useLightbox();

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
      return;
    }
    if (allowExpand && src) {
      openLightbox({ src, altText, caption: caption || altText, id }, gallery);
    }
  };

  if (!src) {
    return (
      <div className={`bg-white/[0.03] border border-white/[0.06] flex flex-col items-center justify-center text-center p-6 w-full h-full min-h-[180px] font-mono rounded-xl ${className}`}>
        <ImageIcon className="w-6 h-6 text-neutral-500 mb-2 stroke-1" />
        <span className="text-[10px] text-neutral-400 font-bold tracking-wider uppercase">
          {id ? `Fig. ${id}` : "Visual Plate"}
        </span>
      </div>
    );
  }

  return (
    <div 
      onClick={handleClick}
      className={`relative flex items-center justify-center ${allowExpand ? 'cursor-zoom-in group/img' : ''} ${className}`}
    >
      {withLoader && !isLoaded && (
        <div className="absolute inset-0 bg-[#0c0c0e] animate-pulse flex items-center justify-center rounded-xl">
          <div className="w-5 h-5 border-2 border-white/20 border-t-[#FF3B1D] rounded-full animate-spin" />
        </div>
      )}
      <img 
        src={src} 
        alt={altText || caption || "Product Design Visual"} 
        loading="lazy"
        decoding="async" 
        onLoad={() => setIsLoaded(true)}
        className={`${fitMode} max-w-full max-h-full w-auto h-auto transition-all duration-500 ease-out ${
          withLoader ? (isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-99') : 'opacity-100'
        } ${imgClassName}`} 
      />
      {allowExpand && isLoaded && (
        <div className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white/90 backdrop-blur-sm opacity-0 group-hover/img:opacity-100 transition-opacity pointer-events-none">
          <Maximize2 className="w-3.5 h-3.5" />
        </div>
      )}
    </div>
  );
}

/* --- COMPLETE AUTHENTIC JINENDRA PARAKH PORTFOLIO DATA (4 PROJECTS) --- */
const JINENDRA_PROJECTS = [
  /* =========================================================================
     01. FUEL POWERBANK
     ========================================================================= */
  {
    slug: "fuel",
    number: "01",
    indexCode: "01 // FUEL",
    title: "Fuel",
    subtitle: "Power Bank × Retro-Engineering",
    tagline: "Fuel is a wireless power bank inspired from retro engineering style. It effortlessly marries soft, flowing lines with sharp, edged contrasts, making a bold statement.",
    duration: "1 Week",
    projectType: "Individual Project",
    category: "Consumer Tech",
    badge: "Retro-Engineering / CMF",
    thumbId: "p4_2",
    heroId: "p11_4",
    metaHeader: {
      timeline: "1 Week Sprint",
      type: "Individual Project",
      focus: "Form Semantics, Retro-Engineering, Color & Material Contrast"
    },
    heroMetrics: [
      { label: "Sprint Duration", val: "1 Week" },
      { label: "Design Character", val: "Retro-Engineering" },
      { label: "Switch Mechanism", val: "Audible Click Slider" },
      { label: "Attachment", val: "Magnetic Wireless Panel" }
    ],
    problem: "Power banks often lack aesthetic appeal, clashing with the refined designs of modern smartphones. Bland bricks and disconnected design, monolithic design, clunky design.",
    brief: "Design wireless power banks that seamlessly integrate with smartphones, enhancing both functionality and aesthetics.",
    inspirationTitle: "Teenage Engineering",
    inspirationSubtitle: "Play Everywhere Philosophy",
    inspirationDesc: "Teenage Engineering (TE) is a Swedish company known for its innovative and playful approach to product design. TE's design philosophy of \"Play everywhere,\" reflects their belief that technology should be fun and easy to use.",
    inspirationImg: "p6_2",
    
    // Interactive Callouts from Page 8 of PDF
    features: [
      {
        title: "Charge Indicator",
        desc: "Digital segment LED numerical percentage indicator gives immediate precise capacity reading.",
        tag: "DIGITAL DISPLAY",
        imageId: "p8_4"
      },
      {
        title: "Power Switch",
        desc: "The tactile feedback, combined with the audible click when sliding the switch enhances the overall user experience.",
        tag: "TACTILE HAPTICS",
        imageId: "p8_6"
      },
      {
        title: "Magnetic Panel",
        desc: "Effortless attachment to your phone for a hassle-free and convenient experience.",
        tag: "MAGSAFE COMPATIBLE",
        imageId: "p8_8"
      },
      {
        title: "Woven Strap & Corner Hook",
        desc: "The strap on the power bank brings a practical and stylish touch, enabling quick pocket removal and carabiner clipping. A bold style statement that adds flair.",
        tag: "PORTABILITY & CMF",
        imageId: "p8_10"
      }
    ],

    specs: {
      "Project Type": "Individual Academic Exploration",
      "Timeline": "1 Week Design Sprint",
      "Dimensions": "79.94mm × 51.8mm × 8.5mm (Corner Radii R15 / Fillets R5.5)",
      "Materials": "Bead-Blasted Anodized Aluminum + Flame Orange Polycarbonate",
      "Tactile Switch": "Mechanical Linear Slider with Spring-Loaded Audible Detent",
      "Wireless Interface": "Magnetic Inductive Charging Backplate + 100% LED Display",
      "Corner Anchors": "Dual Cast Metal Lanyard Carabiner Loop & Woven Nylon Ribbon"
    },

    // All Plates from PDF Pages 4 to 12 strictly sequenced
    gallery: [
      { 
        id: "p4_2", 
        page: "Page 04",
        title: "Fuel Hero Overview",
        caption: "Hero render of Fuel wireless power bank showcasing the interplay between bead-blasted aluminum and vibrant orange woven strap.",
        category: "Hero Render"
      },
      { 
        id: "p5_2", 
        page: "Page 05",
        title: "Problem Space: Monolithic Bland Bricks",
        caption: "Market analysis documenting conventional powerbanks: bulky, clunky forms and bland monolithic bricks that clash with modern smartphones.",
        category: "Problem Definition"
      },
      { 
        id: "p6_2", 
        page: "Page 06",
        title: "Design Inspiration: Teenage Engineering TX-6",
        caption: "Teenage Engineering philosophy: playful, honest, tactile hardware with bold color accents and precision knurled controls.",
        category: "Inspiration Board"
      },
      { 
        id: "p7_2", 
        page: "Page 07",
        title: "Form Ideation & Concept Sketches",
        caption: "Exploratory form sketches studying thumb grip ergonomics, exposed structural sub-frames, corner loops, and morphod glass panels.",
        category: "Hand Ideation"
      },
      { 
        id: "p8_2", 
        page: "Page 08",
        title: "Functional Anatomy & Callouts",
        caption: "Interactive callouts: digital charge indicator, audible click power switch, magnetic wireless pad, woven strap, and corner loop.",
        category: "Product Architecture"
      },
      { 
        id: "p9_2", 
        page: "Page 09",
        title: "Dimensioned Technical CAD Drawing",
        caption: "Complete orthographic blueprint: 79.94mm length, 51.8mm width, 8.5mm profile, detail sections A(2:1), B(2:1), C(2:1). Title Block: Jinendra Parakh 02-11-2023.",
        category: "Technical Drawing"
      },
      { 
        id: "p10_2", 
        page: "Page 10",
        title: "Orthographic Solution Renders",
        caption: "Three-view elevation study: Front face with recessed diagonal gesture, ultra-slim 8.5mm profile with slider switch, and rear magnetic inductive ring.",
        category: "CMF Elevation"
      },
      { 
        id: "p11_2", 
        page: "Page 11",
        title: "Internal Exploded Architecture",
        caption: "Exploded engineering CAD model: wireless induction coil, lithium polymer battery core, tactile slider switch detent, and unibody chassis.",
        category: "Exploded Assembly"
      },
      { 
        id: "p11_4", 
        page: "Page 11",
        title: "A Symphony of Contrasts",
        caption: "\"A symphony of contrasts: The interplay of hard edges and soft blends. A dialogue of colour contrasts: Aluminum brilliance accented by vibrant orange.\"",
        category: "CMF Philosophy"
      },
      { 
        id: "p12_2", 
        page: "Page 12",
        title: "Corner Strap Anchor Detail",
        caption: "High-resolution macro render of the cast vermilion corner loop and precision machined lanyard slot.",
        category: "Macro Detail"
      },
      { 
        id: "p12_4", 
        page: "Page 12",
        title: "Tactile Power Switch Detent",
        caption: "Recessed linear power switch with tactile orange detent rib, calibrated to produce a crisp acoustic click upon actuation.",
        category: "Macro Detail"
      },
      { 
        id: "p12_6", 
        page: "Page 12",
        title: "Magnetic Phone Docking Pad",
        caption: "Integrated circular MagSafe-compatible magnetic backplate with subtle crosshair alignment guide.",
        category: "Macro Detail"
      }
    ]
  },

  /* =========================================================================
     02. VANTAGE WEBCAM
     ========================================================================= */
  {
    slug: "vantage",
    number: "02",
    indexCode: "02 // VANTAGE",
    title: "Vantage",
    subtitle: "Adaptive 360° Modular Streaming & Video Webcam",
    tagline: "Vantage is a versatile webcam that transforms video calls, presentations, and streaming into immersive, engaging experiences. With unmatched flexibility and precision, it enhances how you connect, communicate, and create.",
    duration: "3 Weeks",
    projectType: "Individual Project",
    category: "Hardware & IoT",
    badge: "Modular Kinematics / Workspace",
    thumbId: "p13_2",
    heroId: "p19_2",
    metaHeader: {
      timeline: "3 Weeks Studio",
      type: "Individual Project",
      focus: "Kinematics, Modular Mounting, Workspace Ethnography, DFM"
    },
    heroMetrics: [
      { label: "Studio Duration", val: "3 Weeks" },
      { label: "Kinematic Freedom", val: "360° 3-Axis Pan & Tilt" },
      { label: "Height Adjustment", val: "300mm Vertical Slide" },
      { label: "Transformation", val: "Desk Stand → Monitor Mount" }
    ],
    problem: "COVID-19 pandemic reshaped how we work, learn, and connect. Webcams lack modularity and portability, with bulky setups that take up too much space. Fixed camera angles force users to awkwardly move and fit into the frame, creating bland one-dimensional experiences, cluttered cables, and multi-device dilemmas.",
    brief: "The way we work, learn, and create is changing fast. Design an adaptive webcam that fits seamlessly into modern life with a flexible arm, integrated lighting, and dual quick-release mounts—moving the camera instead of the subject.",
    inspirationTitle: "Honest, Minimal, Adaptive, Intuitive & Modular",
    inspirationSubtitle: "Kinematic Harmony",
    inspirationDesc: "Drawing inspiration from balanced architectural task lighting, tactile camera dials, DJI Osmo gimbal articulation, and the quick-dock modularity of the Nintendo Switch.",
    inspirationImg: "p17_8",

    // Market Research Data from Page 14
    marketResearch: {
      headline: "$18.85 Billion Projected Global Webcam Market by 2029",
      cagr: "14.3% CAGR (2024 to 2029)",
      drivers: [
        { label: "Remote Work", text: "The rise of remote and hybrid work models is reshaping the modern desktop workplace." },
        { label: "Video Conferencing", text: "Exponentially growing corporate demand for professional high-quality video conferencing solutions." },
        { label: "Streaming Platforms", text: "Creators on Twitch and YouTube demanding multi-angle camera agility." },
        { label: "Online Education", text: "Virtual classrooms and educators requiring overhead whiteboard and desktop document framing." }
      ]
    },

    // Identified Problems from Page 15
    identifiedProblems: [
      { title: "Fixed Camera Angles", desc: "Users are forced to awkwardly move their bodies and adjust chairs just to fit their content into the frame.", imageId: "p15_2" },
      { title: "Bland, One-Dimensional Experience", desc: "Limited camera reach makes video calls, presentations, and streams feel flat, detached, and unengaging.", imageId: "p15_4" },
      { title: "Cluttered Workspaces", desc: "Bulky standalone mounts and tangled cables create visual and physical chaos on the desktop.", imageId: "p15_6" },
      { title: "The Multi-Device Dilemma", desc: "Users are forced to buy and manage multiple distinct devices for streaming, conferencing, and content creation.", imageId: "p15_8" },
      { title: "Lack of Modularity", desc: "Bulky rigid webcam clamps take up too much space and cannot travel easily.", imageId: "p15_10" },
      { title: "Unflattering Bad Angles", desc: "\"I don't even wanna look at that!\" — Low upward angles reduce engagement and frustrate viewers.", imageId: "p15_2" }
    ],

    // How to Use in 4 Steps from Page 21
    userSteps: [
      { step: "01", title: "Connect", desc: "Plug into your device to connect via high-speed USB-C!" },
      { step: "02", title: "Adjust", desc: "Move, pan, and tilt the articulated boom arm to find your ideal position." },
      { step: "03", title: "Set", desc: "Set the webcam into your desired height and angle effortlessly." },
      { step: "04", title: "Frame", desc: "Tilt the cylindrical camera module to achieve perfect optical framing." }
    ],

    specs: {
      "Project Timeline": "3 Weeks Intensive Studio",
      "Dimensions": "Stand Height: 400mm | Vertical Slot: 300mm | Boom Arm: 323mm | Camera Head: 70mm | Base: 15mm",
      "Articulation": "360° Horizontal Pan + 360° Axial Rotation + 300mm Vertical Travel",
      "Mounting Mechanism": "Dual-Mode: Counterweighted Base Stand + Quick-Release Monitor Clamp",
      "Coupling System": "Twist-and-Pull Magnetic Pogo Pin Electrical & Data Interface",
      "Camera Features": "Integrated Capacitive Ring Fill Light, Sliding Physical Privacy Shutter, AI Auto-Framing",
      "Materials": "Dark Anodized Aluminum Extrusions, Silicone Grips, Soft-Touch Non-Marring Rubber"
    },

    // All Plates from PDF Pages 13 to 30 strictly sequenced
    gallery: [
      { 
        id: "p13_2", 
        page: "Page 13",
        title: "Vantage Hero Profile",
        caption: "Cylindrical Vantage camera head docked in upright desktop stand, showing the clean anodized aluminum finish and integrated camera pill.",
        category: "Hero Render"
      },
      { 
        id: "p14_2", 
        page: "Page 14",
        title: "Global Market Research & Growth Drivers",
        caption: "Market research analysis: Global webcam market reaching $18.85B by 2029 (CAGR 14.3%), driven by remote work, streaming, and online education.",
        category: "Market Analysis"
      },
      { 
        id: "p15_2", 
        page: "Page 15",
        title: "Identified User Pain Points",
        caption: "Ethnographic workspace study documenting fixed camera angles, messy cables, multi-device fatigue, and unengaging webcam perspectives.",
        category: "Problem Definition"
      },
      { 
        id: "p16_2", 
        page: "Page 16",
        title: "Pain Points & Solution Tree",
        caption: "Architectural mapping matrix connecting modularity, moving the camera instead of the subject, hidden cables, and Lego-inspired building blocks.",
        category: "Systems Thinking"
      },
      { 
        id: "p17_8", 
        page: "Page 17",
        title: "Inspiration Board: Minimal & Adaptive",
        caption: "Form inspiration: architectural counterbalanced desk lamps, tactile rotary dials, gimbal cameras, and the modular docking of Nintendo Switch.",
        category: "Inspiration Board"
      },
      { 
        id: "p18_2", 
        page: "Page 18",
        title: "Ideation Sketches & Final Concept",
        caption: "Comprehensive hand sketching exploring articulated sliding booms, counterweighted bases, ball joints, and the highlighted Final Concept.",
        category: "Concept Ideation"
      },
      { 
        id: "p19_2", 
        page: "Page 19",
        title: "Introducing Vantage Stand System",
        caption: "\"In a world where connection is everything, clarity and perspective are the keys to unlocking truly immersive experiences. Introducing Vantage.\"",
        category: "Hero System"
      },
      { 
        id: "p20_4", 
        page: "Page 20",
        title: "360° Freedom of Movement & Kinematics",
        caption: "Kinematic engineering diagrams showing horizontal sliding travel, vertical track travel, 360° pan, 360° rotation, and one-tap ring light switch.",
        category: "Kinematic Diagrams"
      },
      { 
        id: "p21_8", 
        page: "Page 21",
        title: "Dimensions & 4-Step Setup Guide",
        caption: "Technical dimensions (400mm stand, 323mm boom, 70mm camera) with illustrated 4-step user guide: 01 Connect, 02 Adjust, 03 Set, 04 Frame.",
        category: "Ergonomics & Specs"
      },
      { 
        id: "p22_2", 
        page: "Page 22",
        title: "Pivoting Mount 360° & Culinary Lifestyle",
        caption: "Full 360° pivoting freedom in real-world lifestyle context: Vantage capturing an overhead kitchen culinary presentation with crisp clarity.",
        category: "Lifestyle Context"
      },
      { 
        id: "p23_2", 
        page: "Page 23",
        title: "Casual Creative Workspace Context",
        caption: "Vantage adapted for informal floor study and creative session, providing personal framing alongside laptop workspace.",
        category: "Lifestyle Context"
      },
      { 
        id: "p24_4", 
        page: "Page 24",
        title: "Modular Quick Release Transformation",
        caption: "\"With a simple press, twist, and pull, Vantage transforms from a stand-mounted camera to a compact monitor-mounted webcam via secure pogo pins.\"",
        category: "Modular Engineering"
      },
      { 
        id: "p25_2", 
        page: "Page 25",
        title: "Monitor Mount Detailing & Snap Cap",
        caption: "Monitor mount features: One-press snap / two-press record button, protective snap cap, and non-marring soft-touch silicone padding.",
        category: "Hardware Detailing"
      },
      { 
        id: "p26_4", 
        page: "Page 26",
        title: "Mechanical Privacy Shutter & 360 Pan-Tilt",
        caption: "Slide the physical privacy shutter closed for instant peace of mind. Integrated motors automatically pan and tilt to keep the presenter in frame.",
        category: "Privacy & Motion"
      },
      { 
        id: "p27_2", 
        page: "Page 27",
        title: "Macro Lock Button & Camera Array",
        caption: "Macro close-up of tactile quick-release lock button and multi-microphone optical sensor housing.",
        category: "Macro Detail"
      },
      { 
        id: "p28_2", 
        page: "Page 28",
        title: "Dynamic Auto-Framing Scenarios",
        caption: "AI auto-framing tracking a seated presenter, a standing whiteboard presentation, and an overhead tabletop sketching session.",
        category: "Use Scenarios"
      },
      { 
        id: "p29_2", 
        page: "Page 29",
        title: "Student Desktop Hybrid Session",
        caption: "Top-down reading and screen-sharing setup showing Vantage mounted directly on laptop monitor bezel.",
        category: "Lifestyle Context"
      },
      { 
        id: "p30_2", 
        page: "Page 30",
        title: "Executive Studio Display Configuration",
        caption: "Monitor-mounted Vantage providing crystal clear video on a primary desktop workspace display.",
        category: "Lifestyle Context"
      }
    ]
  },

  /* =========================================================================
     03. FRIDAY HEELS
     ========================================================================= */
  {
    slug: "friday",
    number: "03",
    indexCode: "03 // FRIDAY",
    title: "Friday Heels",
    subtitle: "Friday Heels × Louis Vuitton Men's Footwear",
    tagline: "Elevate your presence with the Friday shoe, a high heeled boot designed exclusively for men. Step into a world where style knows no bounds where our heels redefine the very essence of masculine elegance, setting you apart as the epitome of fashion-forward masculinity.",
    duration: "6 Weeks",
    projectType: "Team Project",
    collaborators: "Jinendra Parakh, Pradyumn Soni, Dhruv Joshi, Shounak Ghosh",
    category: "Luxury Footwear",
    badge: "Additive Manufacturing / Luxury CMF",
    thumbId: "p31_2",
    heroId: "p42_2",
    metaHeader: {
      timeline: "6 Weeks Studio",
      type: "Team Project",
      collaborators: "Jinendra Parakh, Pradyumn Soni, Dhruv Joshi, Shounak Ghosh",
      focus: "Footwear Anatomy, Additive Manufacturing, Dial Lacing Mechanism, 1:1 Scale Prototyping"
    },
    heroMetrics: [
      { label: "Studio Duration", val: "6 Weeks" },
      { label: "Prototype Scale", val: "1:1 Working Scale (UK 11)" },
      { label: "Lacing Technology", val: "Monogram Rotary Dial Cable" },
      { label: "Exoskeleton", val: "3D Printed Lattice Heel Shield" }
    ],
    problem: "Heels were originally worn by the men of royalty and the Kings to imply status and power, before transitioning into women's footwear over centuries. Today, masculine formal footwear has become rigid, repetitive, and devoid of daring stature.",
    brief: "Design a high heeled boot for men that seamlessly weaves together traditional masculinity and contemporary boldness, and stands as a symbol of progressive, confident fashion.",
    inspirationTitle: "FRIDAY as a Brand",
    inspirationSubtitle: "Dynamic Luxury & Historic Reclamation",
    inspirationDesc: "Friday as a day is dynamic - the work ends and now it's time to celebrate the Weekend, full of excitement and pleasure. We as a brand want to translate this feeling through our products. We blend traditional craftsmanship with modern techniques and use metals to create striking highlights. The outcome? A truly show-stopping presence that not only elevates you but also transforms your outfit into a statement of unparalleled sophistication.",
    inspirationImg: "p36_2",

    // Historical Timeline from Page 33
    historicalTimeline: [
      { epoch: "Centuries Ago", text: "Originally worn by the men of royalty and the Kings to assert supreme status and towering stature." },
      { epoch: "Aristocratic Era", text: "Later Men wore them to imply upper-class status. Heels became a direct indication of royal privilege." },
      { epoch: "Fashion Evolution", text: "Centuries later, heels became a widespread fashion trend and were worn equally by both men and women." },
      { epoch: "Modern Era", text: "Until recently, heels were worn almost exclusively by women, leaving a void for bold men's footwear." },
      { epoch: "2017 — Present", text: "Sales and searches for men's heels have surged since 2017. Brands like Celine, Christian Louboutin, and Balenciaga have entered the market." }
    ],

    // The Wearable Guide (6 Steps from Page 39)
    wearableGuide: [
      { step: "01", title: "Initiate Elegance", desc: "Gently press the Louis Vuitton monogram button." },
      { step: "02", title: "A Prelude to Opulence!", desc: "Behold, the Monogram pops out to unveil itself." },
      { step: "03", title: "Engage the Ritual", desc: "Rotate with precision to loosen up the internal cable boot lacing." },
      { step: "04", title: "Confer Regality", desc: "Place your foot within the sculpted calfskin boot with graceful assurance." },
      { step: "05", title: "Harmonize Comfort", desc: "Artfully adjust tension by turning the rotary dial, elevating every step." },
      { step: "06", title: "Culminate the Ceremony", desc: "Press, lock, and embark on your stately journey." }
    ],

    // 1:1 Scale Makerspace Physical Fabrication at Strate (from Page 41)
    makerspaceBuild: [
      { id: "p41_2", title: "CNC Foam Sole Routing", caption: "High-density polyurethane foam sole milling on 3-axis industrial CNC router." },
      { id: "p41_4", title: "SLA 3D Printed Heel Shield", caption: "Additive manufacturing of structural lattice heel shield and rear monogram chassis." },
      { id: "p41_6", title: "Upper Patterning & Lasting", caption: "Full-grain calfskin leather lasting over custom UK 11 shoe tree." },
      { id: "p41_8", title: "Rotary Cable Spool Detailing", caption: "Integrating the pop-out brass Louis Vuitton monogram release and tensioning cables." },
      { id: "p41_12", title: "Sole & Heel Assembly", caption: "Bonding and curing the CNC milled sole with the 3D printed heel shield." },
      { id: "p41_14", title: "Final 1:1 Wearable Boot (UK 11)", caption: "Completed physical wearable prototype tested for weight, comfort, and dynamic balance." }
    ],

    specs: {
      "Project Team": "Jinendra Parakh, Pradyumn Soni, Dhruv Joshi, Shounak Ghosh",
      "Prototype Size": "UK 11 (1:1 Working Wearable Physical Model)",
      "Upper Construction": "Full-Grain Calfskin Leather with Integrated Elastic Gussets",
      "Lacing Hardware": "Internal Rotary Cable Spool with Pop-Out Turned Brass Monogram Release",
      "Heel Architecture": "3D Printed Lattice Shield with Architectural Structural Ribs",
      "Outsole": "CNC Milled Polyurethane Sole with Debossed Louis Vuitton × Friday Tread",
      "Internal Comfort": "Orthotic Molded Footbed, Gel Cushioning Cups, Dynamic Arch Support"
    },

    // All Plates from PDF Pages 31 to 42 strictly sequenced
    gallery: [
      { 
        id: "p31_2", 
        page: "Page 31",
        title: "Friday Heels on Pedestal",
        caption: "Hero studio render of Friday high-heeled boot on exhibition plinth with Louis Vuitton × Friday collaboration branding.",
        category: "Hero Render"
      },
      { 
        id: "p32_4", 
        page: "Page 32",
        title: "Brand DNA & Material Sensibility",
        caption: "Friday moodboard: luxury dynamic weekend celebration, classic coachbuilt sports cars, Rolex Cellini Dual Time horology, and rich aromatics.",
        category: "Moodboard"
      },
      { 
        id: "p33_2", 
        page: "Page 33",
        title: "The Story: Re-Telling the History of Heels",
        caption: "Historical timeline: from King Louis XIV royal heels to 17th-century aristocratic prestige, to modern high-fashion runway reclamation.",
        category: "Historical Research"
      },
      { 
        id: "p35_2", 
        page: "Page 35",
        title: "Concept Feature Exploration Matrix",
        caption: "Design matrix exploring Authoritative, Dynamic, and Hulk silhouettes with dial lacing, gel cups, 3D midsoles, front peels, and snug collar cuts.",
        category: "Concept Matrix"
      },
      { 
        id: "p36_2", 
        page: "Page 36",
        title: "Silhouette Ideation & Gothic Architecture",
        caption: "Hand sketches exploring angular heel cuts, origami heel wraps, pocket watch mechanics, and tailored gothic architectural references.",
        category: "Concept Ideation"
      },
      { 
        id: "p37_2", 
        page: "Page 37",
        title: "3-D Printed Heel Shield",
        caption: "\"3-D printed Shield: The elegant protector of a king. Heel so high it raises the bar with you.\"",
        category: "CMF & Structure"
      },
      { 
        id: "p38_2", 
        page: "Page 38",
        title: "Monogram Release Dial & Outsole Bridging",
        caption: "\"The dazzling Louis Vuitton monogram — has everyone's eyes on you.\" Detailed view of pop-out rotary button and bridged heel branding.",
        category: "Hardware Detailing"
      },
      { 
        id: "p39_2", 
        page: "Page 39",
        title: "Step into the Story: The Wearable Guide",
        caption: "The 6-step ritual: 01 Initiate Elegance, 02 Prelude to Opulence, 03 Engage the Ritual, 04 Confer Regality, 05 Harmonize Comfort, 06 Culminate the Ceremony.",
        category: "User Experience Guide"
      },
      { 
        id: "p40_2", 
        page: "Page 40",
        title: "Orthographic Technical Projections",
        caption: "Dimensioned orthographic views: plan view collar opening, lateral heel profile, and rear monogram spine elevation.",
        category: "Technical Drawing"
      },
      { 
        id: "p40_4", 
        page: "Page 40",
        title: "Exploded Engineering CAD Assembly",
        caption: "Exploded view showing calfskin upper, inner lining, orthotic insole, sole chassis, 3D printed heel shield, and internal rotary lacing spool.",
        category: "Exploded Assembly"
      },
      { 
        id: "p41_2", 
        page: "Page 41",
        title: "1:1 Prototype Fabrication (UK 11 Scale)",
        caption: "Physical prototype build at Strate makerspace: 3D printing heel components, CNC foam sole milling, vacuum forming, and physical lasting.",
        category: "Makerspace Prototype"
      },
      { 
        id: "p42_2", 
        page: "Page 42",
        title: "Editorial Campaign Render",
        caption: "\"Bringing them back for the royalty. In collaboration with FRIDAY. Sold exclusively on louisvuitton.com. @ Pradyumn Soni, Louis Vuitton.\"",
        category: "Editorial Campaign"
      }
    ]
  },

  /* =========================================================================
     04. MISCELLANEOUS & VISUAL LAB
     ========================================================================= */
  {
    slug: "miscellaneous",
    number: "04",
    indexCode: "04 // MISC",
    title: "Miscellaneous",
    subtitle: "Visual Lab, Ideation Sketches & Workshop Prototypes",
    tagline: "A collection of sketches, prototypes, and creative detours. Each piece is a standalone exploration, showing different stages of thinking and making beyond my main projects.",
    duration: "Continuous",
    projectType: "Individual Project",
    category: "Ideation & Making",
    badge: "WORKSHOP / GENERATIVE AI / SKETCHES",
    thumbId: "p1_2",
    heroId: "p1_2",
    metaHeader: {
      timeline: "Continuous Explorations (2023 — 2025)",
      type: "Individual Project",
      focus: "Horological Hand Sketching, Vizcom AI Prompting, Footwear Anatomical Teardown, Makerspace Prototyping"
    },
    heroMetrics: [
      { label: "Visual Disciplines", val: "Sketches, AI, CMF, Prototyping" },
      { label: "Makerspace Facility", val: "Strate School of Design" },
      { label: "AI Generative Engine", val: "Vizcom Trials" },
      { label: "Footwear Teardown", val: "Nike Air Force 1 Anatomy" }
    ],
    problem: "Design thinking cannot live in isolation on a digital screen. True physical fluency requires constant exploratory detours—hands-on marker ideation, taking existing products apart to examine their internal anatomy, and stress-testing new AI rendering tools.",
    brief: "Curate a dedicated laboratory of independent explorations spanning chronograph watch sketching, footwear anatomical deconstructions, blown-glass acoustic vessels, Vizcom AI prompt trials, and physical workshop prototyping.",
    inspirationTitle: "Thinking Through the Hands",
    inspirationSubtitle: "From Raw Clay to Generative AI",
    inspirationDesc: "Every piece here is a standalone inquiry. Whether exploring the tension between delicate blown glass and copper wire, dissecting the stitching tolerances of a Nike sneaker, or transforming hand sketches into cosmic cyberpunk realities with Vizcom.",
    inspirationImg: "p46_2",

    specs: {
      "Disciplines": "Horological Sketching, Footwear Anatomy, AI Generative Pipelines, Workshop Fabrication",
      "Sketching Mediums": "Fineliner, Copic Markers, Digital Procreate on iPad Pro",
      "AI Pipeline": "Vizcom Prompt Manipulation & Material Specularity Tuning",
      "Footwear Analysis": "Deconstruction of Nike Air Force 1 Upper, Midsole, and Air Sole Unit",
      "Workshop Machinery": "CNC 3-Axis Foam Router, Vacuum Former, Polyurethane Casting, 3D Printers"
    },

    // All Plates from PDF strictly sequenced (Cover, Pages 44 to 52)
    gallery: [
      { 
        id: "p1_2", 
        page: "Page 01 (Cover)",
        title: "Portfolio Cover: Chronograph Watch Perspective Sketch",
        caption: "Original hand-drawn chronograph perspective sketch: precision crown, pushers, and subdials exploring technical luxury horology.",
        category: "Horology Sketch"
      },
      { 
        id: "p44_2", 
        page: "Page 44",
        title: "Acoustic Glass Hourglass Study",
        caption: "Exploration of blown glass dual spheres supported by an intertwined copper wire harness, examining acoustic resonance and liquid containment.",
        category: "Glass Vessel"
      },
      { 
        id: "p45_2", 
        page: "Page 45",
        title: "Glass Vessel Core Detailing",
        caption: "Macro view of internal central diffuser and curved copper wire cradle interface.",
        category: "Glass Vessel"
      },
      { 
        id: "p46_2", 
        page: "Page 46",
        title: "Industrial Design Sketches",
        caption: "Rapid ideation sketches exploring technical utilitarian backpacks, iconic mid-century lounge chairs, athletic sneakers, and origami faceted seating.",
        category: "Hand Sketches"
      },
      { 
        id: "p47_2", 
        page: "Page 47",
        title: "Analysis of a Sneaker: Lateral & Heel Anatomy",
        caption: "Detailed anatomical teardown: shoe tongue, tongue holder, PU rubber outsole, toe counter, foxing, toe spring, and heel counter structure.",
        category: "Footwear Teardown"
      },
      { 
        id: "p48_2", 
        page: "Page 48",
        title: "Deconstructed Sneaker Layers & Materials",
        caption: "Layered deconstruction of footwear construction: PU leather upper, soft padding, polyester tongue lining, insole, midsole, and outsole.",
        category: "Footwear Teardown"
      },
      { 
        id: "p49_2", 
        page: "Page 49",
        title: "Nike Air Force 1 Deep Dive",
        caption: "Deep dive analysis of Nike AF1: sewed branding, hole pattern 1 to 6, double stitching, AF1 metal lace medallion, breathing holes, and embossed rubber air sole.",
        category: "Footwear Teardown"
      },
      { 
        id: "p50_2", 
        page: "Page 50",
        title: "Vizcom AI Trials: Generative Transformations",
        caption: "\"I brought one of my sketches to Vizcom and experimented with various prompts, played around with reference images and how they impact the final image. Also explored different features to get the hang of using Vizcom.\"",
        category: "Vizcom AI Trials"
      },
      { 
        id: "p51_8", 
        page: "Page 51",
        title: "Physical Models and Workshop Prototypes",
        caption: "Hands-on makerspace fabrication gallery: high-gloss styling clay heels, wood lathe turning, CNC foam milling, radio foam mockups, and UK 11 shoe prototype.",
        category: "Makerspace Mockups"
      },
      { 
        id: "p52_2", 
        page: "Page 52",
        title: "Spandigit Social Digital Marketing Internship",
        caption: "Workspace photos and team collaboration during digital marketing internship (June - July 2023), gaining hands-on audience targeting and user research skills.",
        category: "Internship & Research"
      }
    ]
  }
];

/* --- APPLE GLOBAL NAVIGATION BAR (ULTRA-THIN FROSTED GLASS & SF PRO TYPOGRAPHY) --- */
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const closeMenu = () => setIsOpen(false);

  // Check if we are inside a project view
  const isProjectPage = location.pathname.startsWith('/project/');
  const currentSlug = isProjectPage ? location.pathname.split('/project/')[1] : null;
  const currentProject = isProjectPage ? JINENDRA_PROJECTS.find(p => p.slug === currentSlug) : null;

  // Listen for Escape key to close project and return to home (Apple fluid dismissal)
  useEffect(() => {
    if (!isProjectPage) return;
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
      if (e.key === 'Escape') {
        navigate('/');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isProjectPage, navigate]);

  return (
    <nav className="sticky top-0 z-50 bg-[#000000]/80 backdrop-blur-2xl transition-all border-b border-white/[0.08]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-14 sm:h-16 flex items-center justify-between">
        
        {/* Brand Logo & Project Indicator (Apple Monogram JP) */}
        <Link 
          to="/" 
          onClick={closeMenu}
          className="flex items-center gap-2.5 group"
        >
          <div className="flex items-center gap-1 font-display font-black text-xl tracking-tight text-white group-hover:opacity-80 transition-opacity">
            <span>JP</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B1D] mb-2" />
          </div>
          <div className="hidden sm:flex flex-col border-l border-white/10 pl-2.5">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold tracking-tight text-[#f5f5f7] uppercase leading-none">
                Jinendra Parakh
              </span>
              {isProjectPage && currentProject && (
                <span className="font-mono text-[11px] font-bold text-[#FF3B1D]">
                  / {currentProject.indexCode}
                </span>
              )}
            </div>
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#86868b] font-medium mt-0.5">
              {isProjectPage && currentProject 
                ? currentProject.subtitle 
                : "Industrial Design • 2025"}
            </span>
          </div>
        </Link>
        
        {/* Context-Aware Navigation Controls */}
        {isProjectPage ? (
          /* Project Mode: Apple Floating Close Action */
          <div className="flex items-center gap-3">
            <Link 
              to="/" 
              className="group flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider bg-white/[0.08] hover:bg-white text-white hover:text-black border border-white/15 px-4 py-1.5 rounded-full transition-all duration-200 shadow-sm cursor-pointer"
              title="Close Project (Esc)"
            >
              <X className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform duration-200" />
              <span>Close</span>
              <kbd className="hidden sm:inline text-[9px] px-1 py-0.2 bg-white/20 rounded font-mono text-white/80">Esc</kbd>
            </Link>
          </div>
        ) : (
          /* Standard Apple Global Nav Links */
          <div className="hidden md:flex items-center gap-7 text-xs font-medium tracking-tight text-[#86868b]">
            <Link 
              to="/" 
              className={`relative transition-colors hover:text-[#f5f5f7] py-1 ${location.pathname === '/' ? 'text-[#f5f5f7] font-semibold' : ''}`}
            >
              <span>Overview</span>
              {location.pathname === '/' && (
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#FF3B1D] rounded-full" />
              )}
            </Link>
            <a 
              href="/#inquiries" 
              className="relative transition-colors hover:text-[#f5f5f7] py-1"
            >
              <span>Inquiries</span>
            </a>
            <Link 
              to="/playground" 
              className={`relative transition-colors hover:text-[#f5f5f7] py-1 ${location.pathname === '/playground' ? 'text-[#f5f5f7] font-semibold' : ''}`}
            >
              <span>Visual Lab</span>
              {location.pathname === '/playground' && (
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#FF3B1D] rounded-full" />
              )}
            </Link>
            <Link 
              to="/about" 
              className={`relative transition-colors hover:text-[#f5f5f7] py-1 ${location.pathname === '/about' ? 'text-[#f5f5f7] font-semibold' : ''}`}
            >
              <span>About</span>
              {location.pathname === '/about' && (
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#FF3B1D] rounded-full" />
              )}
            </Link>
            <Link 
              to="/experience" 
              className={`relative transition-colors hover:text-[#f5f5f7] py-1 ${location.pathname === '/experience' ? 'text-[#f5f5f7] font-semibold' : ''}`}
            >
              <span>Experience</span>
              {location.pathname === '/experience' && (
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#FF3B1D] rounded-full" />
              )}
            </Link>
            
            {/* Apple Action Pill Controls */}
            <div className="flex items-center gap-3 pl-3 border-l border-white/10">
              <a 
                href="/Jinendra_Parakh_Resume.pdf" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-1.5 bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/10 px-3.5 py-1.5 rounded-full transition-all text-xs font-medium"
                title="Download Resume"
              >
                <Download className="w-3 h-3" />
                <span>Resume</span>
              </a>
              <a 
                href="mailto:parakhjinendra@gmail.com"
                className="flex items-center gap-1.5 bg-white text-black px-4 py-1.5 rounded-full hover:bg-neutral-200 transition-colors shadow-sm font-semibold text-xs"
              >
                <span>Connect</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B1D]" />
              </a>
            </div>
          </div>
        )}

        {/* Mobile Toggle (Only on non-project pages) */}
        {!isProjectPage && (
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation"
              className="p-2 text-[#f5f5f7] hover:text-[#FF3B1D] transition-colors cursor-pointer"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        )}
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#000000]/95 backdrop-blur-2xl px-6 pt-4 pb-8 border-b border-white/10"
          >
            <div className="flex flex-col space-y-4 font-mono text-xs font-bold uppercase tracking-wider text-white">
              <Link to="/" onClick={closeMenu} className="py-2.5 border-b border-white/10 flex justify-between">
                <span>01. Overview & Works</span>
                <span className="text-[#FF3B1D]">4 Inquiries</span>
              </Link>
              <Link to="/playground" onClick={closeMenu} className="py-2.5 border-b border-white/10 flex justify-between">
                <span>02. Visual Lab & Sketches</span>
                <span className="text-[#FF3B1D]">Playground</span>
              </Link>
              <Link to="/about" onClick={closeMenu} className="py-2.5 border-b border-white/10 flex justify-between">
                <span>03. About Jinendra</span>
                <span className="text-neutral-400">Strate School</span>
              </Link>
              <Link to="/experience" onClick={closeMenu} className="py-2.5 border-b border-white/10 flex justify-between">
                <span>04. Professional Experience</span>
                <span className="text-neutral-400">Ticket / Spandigit</span>
              </Link>
              
              <div className="grid grid-cols-2 gap-3 pt-4">
                <a 
                  href="/Jinendra_Parakh_Resume.pdf" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-center block bg-white/10 border border-white/15 text-white py-3 rounded-full hover:bg-white hover:text-black transition-colors"
                >
                  Resume (PDF)
                </a>
                <a 
                  href="/Jinendra_Parakh_Portfolio.pdf" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-center block bg-[#FF3B1D] text-white py-3 rounded-full hover:bg-white hover:text-black transition-colors"
                >
                  Full 53p Deck
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* --- APPLE PRO FOOTER (PAGE 53 LET'S CONNECT — TITANIUM MINIMALIST SYSTEM) --- */
function Footer() {
  return (
    <footer className="bg-[#000000] text-[#f5f5f7] pt-28 pb-16 px-6 md:px-12 border-t border-white/[0.08] relative">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Top Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[#FF3B1D] text-xs font-bold uppercase tracking-widest font-mono block">
              // ‘BUILDING DESIRES’ • INDUSTRIAL DESIGN
            </span>
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-tight uppercase">
              Every object has a story to tell and an experience to create.
            </h3>
            <p className="text-[#86868b] text-base md:text-lg font-sans font-light leading-relaxed max-w-xl">
              I am Jinendra Parakh, an industrial designer on a mission to change the way we look at things. B.Sc. in Product Design from Strate School of Design, Bangalore.
            </p>
            <div className="flex items-center gap-2.5 pt-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-400 font-mono uppercase text-xs tracking-wider font-semibold">
                Available for Full-Time Industrial Design Roles
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-4 font-mono text-xs">
              <span className="text-[#86868b] uppercase tracking-widest block font-bold text-[10px]">
                DIRECT INQUIRY // CONTACT
              </span>
              <a 
                href="mailto:parakhjinendra@gmail.com" 
                className="flex items-center gap-3 text-white hover:text-[#FF3B1D] transition-colors text-sm font-semibold"
              >
                <Mail className="w-4 h-4 text-[#FF3B1D]" />
                <span>parakhjinendra@gmail.com</span>
              </a>
              <a 
                href="tel:+919850889899" 
                className="flex items-center gap-3 text-[#a1a1a6] hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-[#FF3B1D]" />
                <span>+91 9850889899</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/jinendra-parakh-7b643a228" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-3 text-[#a1a1a6] hover:text-white transition-colors"
              >
                <LinkedinIcon className="w-4 h-4 text-[#FF3B1D]" />
                <span>Jinendra Parakh (LinkedIn)</span>
              </a>
              <a 
                href="https://www.behance.net/gallery/223719061/Design-Portfolio" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-3 text-[#a1a1a6] hover:text-white transition-colors"
              >
                <BehanceIcon className="w-4 h-4 text-[#FF3B1D]" />
                <span>Behance Design Portfolio</span>
              </a>
              <span className="block text-[#6e6e73] pt-1">
                Bangalore / Pune / Nashik / Jalgaon, Maharashtra
              </span>
            </div>

            <div className="flex flex-wrap gap-4 font-mono text-xs">
              <a 
                href="/Jinendra_Parakh_Resume.pdf" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 bg-white text-black px-5 py-2.5 rounded-full font-bold hover:bg-[#FF3B1D] hover:text-white transition-colors shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Resume (PDF)</span>
              </a>
              <a 
                href="/Jinendra_Parakh_Portfolio.pdf" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 bg-white/10 text-white border border-white/15 px-5 py-2.5 rounded-full font-bold hover:bg-white hover:text-black transition-colors"
              >
                <span>Full 53-Page Deck</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Legal / Metadata Line */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[#86868b] text-[11px] font-mono">
          <div>
            © {new Date().getFullYear()} JINENDRA PARAKH. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6 uppercase tracking-wider text-[10px]">
            <span>STRATE SCHOOL OF DESIGN</span>
            <span className="text-[#FF3B1D]">PRODUCT DESIGN 2025</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

/* --- SIGNATURE KINETIC STARBURST ICON (FROM REFERENCE MOODBOARDS) --- */
function StarburstIcon({ className = "w-4 h-4 text-[#FF3B1D]" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0L13.8 8.2L20.5 3.5L16.8 10.2L24 12L16.8 13.8L20.5 20.5L13.8 15.8L12 24L10.2 15.8L3.5 20.5L7.2 13.8L0 12L7.2 10.2L3.5 3.5L10.2 8.2Z" />
    </svg>
  );
}

/* --- INLINE MOTION CAPSULE (FROM REFERENCE HEADLINES) --- */
function InlineMotionCapsule({ className = "" }) {
  return (
    <span className={`inline-flex items-center justify-center align-middle mx-1.5 sm:mx-2 px-2 py-0.5 h-7 sm:h-9 md:h-10 w-14 sm:w-20 md:w-24 rounded-full bg-gradient-to-r from-[#FF3B1D] via-[#FF7A00] to-[#E02404] shadow-md shadow-orange-500/25 overflow-hidden relative shrink-0 ${className}`}>
      <span className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/70 via-transparent to-transparent animate-pulse" />
      <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#fff]" />
    </span>
  );
}

/* --- 1. HERO KINETIC SECTION (IMAGE 1 RECREATION) --- */
/* --- 1. HERO KINETIC SECTION (APPLE KEYNOTE HARDWARE REVEAL) --- */
function HeroKineticSection() {
  const [activeHotspot, setActiveHotspot] = useState(null);

  const hotspots = [
    { id: 1, x: "32%", y: "30%", title: "Tactile Power Switch", detail: "Mechanical linear slider with spring-loaded audible detent click." },
    { id: 2, x: "72%", y: "24%", title: "Segment LED Readout", detail: "Integrated digital charge percentage for instantaneous readout." },
    { id: 3, x: "48%", y: "54%", title: "Magnetic Wireless Pad", detail: "MagSafe-compatible inductive charging coil interface." },
    { id: 4, x: "20%", y: "78%", title: "Woven Nylon Ribbon", detail: "Heavy-duty nylon lanyard with cast metal carabiner loop." }
  ];

  return (
    <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 bg-[#000000]">
      {/* Volumetric Radial Rim Lighting */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FF3B1D]/15 via-[#FF7A00]/08 to-transparent blur-3xl pointer-events-none" 
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Top Context Eyebrow Line */}
        <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-widest text-[#86868b] pb-6 border-b border-white/[0.08] mb-14">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#FF3B1D] animate-pulse" />
            <span className="font-bold text-white">APPLE DESIGN PHILOSOPHY // JINENDRA PARAKH</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="hidden sm:inline text-[#6e6e73]">BANGALORE / PUNE / NASHIK</span>
            <span className="text-white font-semibold">STRATE SCHOOL OF DESIGN '25</span>
          </div>
        </div>

        {/* Hero 2-Column Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Display Typography & Keynote CTA */}
          <div className="lg:col-span-7 space-y-7">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-[#FF3B1D] uppercase tracking-widest">
              <StarburstIcon className="w-3.5 h-3.5" />
              <span>‘BUILDING DESIRES’ • HARDWARE INQUIRY</span>
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-[84px] lg:text-[96px] font-black font-display tracking-tight leading-[0.94] uppercase text-white">
              Building desires. <br />
              <span className="apple-headline-gradient font-light normal-case">Designed to be felt.</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl font-sans text-[#86868b] font-light leading-relaxed max-w-xl">
              Industrial design inquiry of Jinendra Parakh. Exploring tactile retro-engineering, kinematic mechanisms, and modular ergonomics with extreme intentionality.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 font-mono text-xs">
              <a 
                href="#inquiries" 
                className="inline-flex items-center gap-3 bg-white text-black font-bold uppercase tracking-wider py-3 px-6 rounded-full shadow-lg hover:bg-neutral-200 transition-all cursor-pointer group"
              >
                <span className="w-2 h-2 rounded-full bg-[#FF3B1D]" />
                <span>Explore Inquiries</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a 
                href="/Jinendra_Parakh_Portfolio.pdf" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-bold uppercase tracking-wider text-white hover:text-black hover:bg-white py-3 px-5 rounded-full border border-white/20 transition-all bg-white/[0.05]"
              >
                <span>53-Page Deck</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="p-3 bg-white/[0.05] border border-white/10 rounded-full flex items-center gap-2 px-4">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-emerald-400 font-bold uppercase text-[10px] tracking-wider">
                  Open for ID Roles
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Apple Squircle Card with Interactive Hotspots */}
          <div className="lg:col-span-5">
            <div className="group relative apple-card rounded-[32px] p-7 md:p-8 shadow-2xl overflow-hidden">
              
              {/* Card Header */}
              <div className="flex items-center justify-between font-mono text-xs pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B1D]" />
                  <span className="uppercase tracking-widest text-[11px] font-bold text-white/90">case 01 // FLAGSHIP HARDWARE</span>
                </div>
                <StarburstIcon className="w-4 h-4 text-[#FF3B1D] group-hover:rotate-90 transition-transform duration-500" />
              </div>

              {/* Central Cinematic Hardware Stage with Interactive Hotspots */}
              <div className="relative my-6 h-60 sm:h-72 flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-neutral-900/90 to-black p-4">
                {/* Ambient Glow */}
                <div className="absolute inset-x-0 h-20 bg-gradient-to-r from-transparent via-[#FF3B1D]/35 to-transparent blur-2xl" />
                
                <Link to="/project/fuel" className="block relative z-10 cursor-pointer">
                  <img 
                    src={resolveImg('p4_2')} 
                    alt="Fuel Power Bank" 
                    className="max-h-52 sm:max-h-60 w-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.95)] group-hover:scale-105 transition-transform duration-500 ease-out" 
                  />
                </Link>

                {/* Apple Interactive Hotspot Pins */}
                {hotspots.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => setActiveHotspot(activeHotspot === h.id ? null : h.id)}
                    style={{ left: h.x, top: h.y }}
                    aria-label={h.title}
                    className="absolute z-20 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer group/pin"
                  >
                    <span className="absolute inset-0 rounded-full bg-[#FF3B1D]/40 animate-ping" />
                    <span className="relative w-2.5 h-2.5 rounded-full bg-[#FF3B1D] border-2 border-white shadow-[0_0_8px_#FF3B1D] group-hover/pin:scale-125 transition-transform" />
                  </button>
                ))}

                {/* Hotspot Floating Detail Callout Modal */}
                <AnimatePresence>
                  {activeHotspot && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute bottom-4 inset-x-4 z-30 p-4 rounded-xl bg-black/90 backdrop-blur-xl border border-white/20 font-mono shadow-2xl text-left"
                    >
                      <div className="flex items-center justify-between pb-1 mb-1 border-b border-white/10">
                        <span className="text-[#FF3B1D] font-bold text-xs uppercase">
                          {hotspots.find(h => h.id === activeHotspot)?.title}
                        </span>
                        <button 
                          onClick={() => setActiveHotspot(null)}
                          className="text-white/60 hover:text-white text-xs font-bold"
                        >
                          ✕
                        </button>
                      </div>
                      <p className="font-sans text-xs text-neutral-300 font-light">
                        {hotspots.find(h => h.id === activeHotspot)?.detail}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Card Meta & Action */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-2xl uppercase tracking-tight text-white group-hover:text-[#FF3B1D] transition-colors">
                    Fuel Power Bank
                  </h3>
                  <Link 
                    to="/project/fuel"
                    className="text-xs font-mono font-bold text-[#FF3B1D] flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Inspect</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <p className="font-mono text-xs text-[#86868b] font-light leading-relaxed">
                  Modern & tactile retro-engineering with audible click slider and woven nylon ribbon.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Apple Bento Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-10 border-t border-white/[0.08] font-mono text-xs">
          <div className="p-5 apple-card rounded-2xl">
            <span className="text-[#86868b] uppercase text-[10px] font-bold tracking-widest block mb-1">SPRINT DURATION</span>
            <span className="text-lg font-bold text-white block">1-Week Sprint</span>
            <span className="text-[#6e6e73] text-[11px] font-light">Rapid form ideation & CAD</span>
          </div>
          <div className="p-5 apple-card rounded-2xl">
            <span className="text-[#86868b] uppercase text-[10px] font-bold tracking-widest block mb-1">PROTOTYPE SCALE</span>
            <span className="text-lg font-bold text-white block">1:1 Physical Scale</span>
            <span className="text-[#6e6e73] text-[11px] font-light">Makerspace CNC & 3D print</span>
          </div>
          <div className="p-5 apple-card rounded-2xl">
            <span className="text-[#86868b] uppercase text-[10px] font-bold tracking-widest block mb-1">SURFACE CURVATURE</span>
            <span className="text-lg font-bold text-[#FF3B1D] block">R15 / R5.5 Fillets</span>
            <span className="text-[#6e6e73] text-[11px] font-light">Continuous ergonomic radii</span>
          </div>
          <div className="p-5 apple-card rounded-2xl">
            <span className="text-[#86868b] uppercase text-[10px] font-bold tracking-widest block mb-1">PRIMARY CMF</span>
            <span className="text-lg font-bold text-white block">Bead-Blasted Al</span>
            <span className="text-[#6e6e73] text-[11px] font-light">+ Saturated Polycarbonate</span>
          </div>
        </div>

      </div>

      {/* Subtle Bottom Watermark */}
      <div className="relative overflow-hidden w-full pt-16 pb-0 select-none pointer-events-none">
        <div className="font-display font-black text-[18vw] leading-none tracking-tighter uppercase text-white/[0.04] text-center">
          kinetic
        </div>
      </div>
    </section>
  );
}

/* --- 2. STAGGERED THUMBNAILS SECTION (APPLE PRO LINEUP BENTO GRID) --- */
const STAGGERED_PROJECTS = [
  {
    slug: "fuel",
    badge: "Strategy",
    tag: "01 // Tech",
    title: "Fuel Power Bank",
    desc: "Tactile retro-engineering with audible mechanical slider switch & woven nylon ribbon.",
    pillClass: "bg-white text-black",
    starburstClass: "text-[#FF3B1D]",
    imgId: "p4_2",
    stagger: ""
  },
  {
    slug: "vantage",
    badge: "Growth",
    tag: "02 // Kinematics",
    title: "Vantage Webcam",
    desc: "Ergonomic dual-axis camera for hybrid professional workspace and privacy.",
    pillClass: "bg-white text-black",
    starburstClass: "text-[#FF3B1D]",
    imgId: "p13_2",
    stagger: "md:translate-y-16"
  },
  {
    slug: "friday",
    badge: "Creative",
    tag: "03 // Luxury",
    title: "Friday Footwear",
    desc: "Biomechanical ergonomic modular footwear engineering with swappable components.",
    pillClass: "bg-white text-black",
    starburstClass: "text-[#FF3B1D]",
    imgId: "p31_2",
    stagger: ""
  },
  {
    slug: "miscellaneous",
    badge: "Powerful",
    tag: "04 // Visual Lab",
    title: "Visual Lab & Chrono",
    desc: "Horological chronographs, sneaker ideation, and rapid foam prototypes.",
    pillClass: "bg-white text-black",
    starburstClass: "text-[#FF3B1D]",
    imgId: "p1_2",
    stagger: "md:translate-y-16"
  }
];

function StaggeredThumbnailsSection() {
  return (
    <section id="inquiries" className="max-w-[1400px] mx-auto px-6 md:px-12 py-28 border-t border-white/[0.08]">
      
      {/* Top Inquiry Tag */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/10 shadow-sm font-mono text-xs text-white mb-8">
        <StarburstIcon className="w-3.5 h-3.5 text-[#FF3B1D]" />
        <span className="font-bold uppercase tracking-wider">About inquiry • Pro Lineup</span>
      </div>

      {/* Main Display Headline with 2 Inline Motion Capsules */}
      <h2 className="text-3xl sm:text-5xl md:text-6xl font-light font-display tracking-tight text-white leading-[1.2] max-w-5xl mb-20">
        Kinetic Studio – is an ID inquiry of bold <InlineMotionCapsule /> creators that delivers the power of tactile hardware with <InlineMotionCapsule /> cutting-edge strategy
      </h2>

      {/* 4 Staggered Squircle Cards (Clicking opens that project directly) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-start pb-16">
        {STAGGERED_PROJECTS.map((card) => (
          <Link
            key={card.slug}
            to={`/project/${card.slug}`}
            className={`group relative block rounded-[32px] p-7 md:p-8 min-h-[500px] md:min-h-[550px] flex flex-col justify-between apple-card hover:-translate-y-2 cursor-pointer ${card.stagger}`}
          >
            {/* Top Badge & Tag */}
            <div className="flex items-center justify-between font-mono text-xs pb-4 border-b border-white/10">
              <span className={`font-mono text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-sm ${card.pillClass}`}>
                {card.badge}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-widest text-[#86868b] font-semibold">
                {card.tag}
              </span>
            </div>

            {/* Middle Product Render (Zero Cropped) */}
            <div className="my-auto py-6 flex items-center justify-center min-h-[220px]">
              <img 
                src={resolveImg(card.imgId)} 
                alt={card.title} 
                className="max-h-[220px] max-w-full w-auto h-auto object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500 ease-out" 
              />
            </div>

            {/* Bottom Meta & Starburst */}
            <div className="pt-4 border-t border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <StarburstIcon className={`w-4 h-4 ${card.starburstClass} group-hover:rotate-90 transition-transform duration-500`} />
                <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#FF3B1D] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Inspect</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-black font-display uppercase tracking-tight leading-tight text-white group-hover:text-[#FF3B1D] transition-colors">
                {card.title}
              </h3>
              <p className="font-sans text-xs font-light text-[#86868b] leading-relaxed line-clamp-2">
                {card.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>

    </section>
  );
}

/* --- NEW: APPLE TECH SPECS & CMF COMPARISON MATRIX --- */
function AppleTechSpecsMatrix() {
  const comparisonItems = [
    { label: "Category", fuel: "Consumer Tech", vantage: "Kinematic Cam", friday: "Modular Footwear", misc: "Visual Lab" },
    { label: "Key Mechanism", fuel: "Tactile Linear Slider", vantage: "Dual-Axis Knuckle Joint", friday: "Modular Heel Release", misc: "Horological Chrono" },
    { label: "Surface CMF", fuel: "Bead-Blasted Aluminum", vantage: "Matte Space Graphite", friday: "High-Gloss Lacquer", misc: "High-Density Foam" },
    { label: "Prototyping", fuel: "Functional 1:1 Scale", vantage: "Working Cable Knuckle", friday: "CNC Milled Sole (UK 11)", misc: "Hand Sketches & AI" },
    { label: "Sprint Duration", fuel: "1-Week Sprint", vantage: "4-Month Industry R&D", friday: "Academic Thesis", misc: "Ongoing Archives" }
  ];

  return (
    <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 border-t border-white/[0.08]">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="font-mono text-xs font-bold text-[#FF3B1D] uppercase tracking-widest block">
          // COMPARE INQUIRIES • APPLE SPECIFICATIONS
        </span>
        <h2 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-white">
          Compare Design Inquiries.
        </h2>
        <p className="font-sans text-[#86868b] text-base font-light">
          Side-by-side engineering specifications, mechanical principles, and CMF strategies across all documented portfolio projects.
        </p>
      </div>

      <div className="overflow-x-auto apple-card rounded-[28px] p-6 sm:p-10">
        <table className="w-full text-left font-mono text-xs min-w-[700px]">
          <thead>
            <tr className="border-b border-white/10 pb-4 text-[#86868b] uppercase text-[11px]">
              <th className="py-4 font-bold text-white">Specification</th>
              <th className="py-4 text-[#FF3B1D] font-bold">01 // Fuel</th>
              <th className="py-4 text-white font-bold">02 // Vantage</th>
              <th className="py-4 text-white font-bold">03 // Friday</th>
              <th className="py-4 text-white font-bold">04 // Visual Lab</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.06]">
            {comparisonItems.map((item, idx) => (
              <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                <td className="py-4 font-bold text-white uppercase text-[11px]">{item.label}</td>
                <td className="py-4 text-[#f5f5f7] font-sans font-light">{item.fuel}</td>
                <td className="py-4 text-[#f5f5f7] font-sans font-light">{item.vantage}</td>
                <td className="py-4 text-[#f5f5f7] font-sans font-light">{item.friday}</td>
                <td className="py-4 text-[#f5f5f7] font-sans font-light">{item.misc}</td>
              </tr>
            ))}
            <tr>
              <td className="py-6 font-bold text-white uppercase text-[11px]">Direct Study</td>
              <td className="py-6">
                <Link to="/project/fuel" className="text-[#FF3B1D] font-bold hover:underline flex items-center gap-1">
                  <span>Explore Fuel</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </td>
              <td className="py-6">
                <Link to="/project/vantage" className="text-white hover:text-[#FF3B1D] font-bold hover:underline flex items-center gap-1">
                  <span>Explore Vantage</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </td>
              <td className="py-6">
                <Link to="/project/friday" className="text-white hover:text-[#FF3B1D] font-bold hover:underline flex items-center gap-1">
                  <span>Explore Friday</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </td>
              <td className="py-6">
                <Link to="/project/miscellaneous" className="text-white hover:text-[#FF3B1D] font-bold hover:underline flex items-center gap-1">
                  <span>Explore Lab</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* --- 3. DARK KINETIC CAROUSEL SECTION (APPLE 3D STAGE SHOWCASE) --- */
const CAROUSEL_CARDS = [
  {
    id: "lead",
    badge: "Lead Designer",
    slug: "fuel",
    link: "/about",
    title: "Jinendra Parakh",
    role: "Lead Industrial Designer // Strate '25",
    desc: "B.Sc. in Product Design. Hardware ideation, high-fidelity surfacing, and tactile retro-engineering.",
    imgId: "p11_4",
    tag: "Design Lead"
  },
  {
    id: "fuel",
    badge: "Retro-Engineering",
    slug: "fuel",
    link: "/project/fuel",
    title: "Fuel Power Bank",
    role: "Consumer Tech // 1-Week Sprint",
    desc: "Audible click mechanical slider with MagSafe magnetic backplate and woven nylon ribbon.",
    imgId: "p4_2",
    tag: "01 // Hardware"
  },
  {
    id: "vantage",
    badge: "Kinematic Cam",
    slug: "vantage",
    link: "/project/vantage",
    title: "Vantage Webcam",
    role: "Hybrid Workspace // Form Ergonomics",
    desc: "Dual-axis rotating mount with magnetic privacy shutter and die-cast aluminum knuckle joint.",
    imgId: "p26_2",
    tag: "02 // Kinematics"
  },
  {
    id: "friday",
    badge: "Modular Footwear",
    slug: "friday",
    link: "/project/friday",
    title: "Friday Footwear",
    role: "Footwear Systems // Biomechanics",
    desc: "Ergonomic high-heel with modular swappable heel geometries and custom silicone lattice.",
    imgId: "p41_2",
    tag: "03 // Footwear"
  }
];

function DarkKineticCarouselSection() {
  const [activeIdx, setActiveIdx] = useState(0);

  const prev = () => setActiveIdx((curr) => (curr === 0 ? CAROUSEL_CARDS.length - 1 : curr - 1));
  const next = () => setActiveIdx((curr) => (curr === CAROUSEL_CARDS.length - 1 ? 0 : curr + 1));

  const activeCard = CAROUSEL_CARDS[activeIdx];

  return (
    <section className="bg-[#000000] text-white py-28 px-6 md:px-12 border-t border-white/[0.08] overflow-hidden relative">
      
      {/* Background Kinetic Flare Streak */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#FF3B1D]/15 via-[#FF7A00]/10 to-transparent blur-3xl pointer-events-none" 
      />

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Top Tag Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 font-mono text-xs text-white mb-8">
          <StarburstIcon className="w-3.5 h-3.5 text-[#FF3B1D]" />
          <span className="font-bold uppercase tracking-wider">About team & craft</span>
        </div>

        {/* Display Headline with Inline Motion Capsule */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-light font-display tracking-tight text-white leading-[1.2] max-w-5xl mb-16">
          We are the talented team and passionate experts <InlineMotionCapsule /> shaping your brand’s digital journey with tactile hardware precision
        </h2>

        {/* 3D Squircle Showcase Stage */}
        <div className="relative py-8">
          
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCard.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="apple-card rounded-[36px] border-2 border-white/85 shadow-[0_0_60px_rgba(255,59,29,0.18)] p-8 sm:p-12 relative overflow-hidden"
              >
                {/* Top Row: JP Logo & Tag */}
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-black text-2xl uppercase tracking-tighter text-white">JP</span>
                    <span className="text-[10px] font-mono font-bold text-[#FF3B1D] align-super">®</span>
                  </div>
                  <span className="font-mono text-xs font-bold uppercase tracking-widest bg-white/10 text-white px-4 py-1.5 rounded-full border border-white/15">
                    {activeCard.badge}
                  </span>
                </div>

                {/* Center Cinematic Hardware Render with Speed Trail */}
                <div className="relative my-8 h-64 sm:h-80 flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-neutral-900 to-black p-6">
                  <div className="absolute inset-x-0 h-24 bg-gradient-to-r from-transparent via-[#FF3B1D]/40 to-transparent blur-2xl animate-pulse" />
                  <img
                    src={resolveImg(activeCard.imgId)}
                    alt={activeCard.title}
                    className="relative z-10 max-h-56 sm:max-h-72 max-w-full w-auto h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
                  />
                </div>

                {/* Bottom Row: Metadata & Open Action */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-6 border-t border-white/10">
                  <div className="space-y-1">
                    <span className="font-mono text-xs text-[#FF3B1D] font-bold uppercase tracking-widest block">
                      {activeCard.tag}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-white">
                      {activeCard.title}
                    </h3>
                    <p className="font-mono text-xs text-[#86868b]">
                      {activeCard.role}
                    </p>
                    <p className="font-sans text-xs text-[#86868b] font-light max-w-lg pt-1">
                      {activeCard.desc}
                    </p>
                  </div>

                  <Link
                    to={activeCard.link}
                    className="inline-flex items-center gap-2 bg-white text-black font-mono text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-full hover:bg-[#FF3B1D] hover:text-white transition-all shadow-md shrink-0 cursor-pointer"
                  >
                    <span>Inspect Inquiry</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Controls: Circular Prev / Next Buttons */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prev}
              aria-label="Previous Kinetic Card"
              className="w-12 h-12 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Indicator Dots */}
            <div className="flex items-center gap-2 px-3">
              {CAROUSEL_CARDS.map((c, idx) => (
                <button
                  key={c.id}
                  onClick={() => setActiveIdx(idx)}
                  aria-label={`Go to ${c.title}`}
                  className={`transition-all rounded-full ${
                    activeIdx === idx 
                      ? 'w-8 h-2 bg-[#FF3B1D]' 
                      : 'w-2 h-2 bg-white/30 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next Kinetic Card"
              className="w-12 h-12 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>

    </section>
  );
}

/* --- HOME PAGE (APPLE PRO DARK TITANIUM ARCHITECTURE) --- */
function HomePage() {
  return (
    <div className="min-h-screen bg-[#000000]">
      
      {/* 1. HERO KEYNOTE REVEAL */}
      <HeroKineticSection />

      {/* 2. STAGGERED THUMBNAILS GRID */}
      <StaggeredThumbnailsSection />

      {/* 3. APPLE TECH SPECS & CMF COMPARISON MATRIX */}
      <AppleTechSpecsMatrix />

      {/* 4. DARK KINETIC CAROUSEL */}
      <DarkKineticCarouselSection />

      {/* QUICK LINKS SECTION (APPLE PRO BENTO CARDS) */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-28 border-t border-white/[0.08]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <Link 
            to="/playground"
            className="p-8 apple-card rounded-[28px] hover:-translate-y-1.5 transition-all group flex flex-col justify-between space-y-6"
          >
            <div>
              <span className="font-mono text-xs font-bold text-[#FF3B1D] uppercase tracking-widest block mb-2">
                02 // VISUAL LAB
              </span>
              <h4 className="text-2xl font-black font-display uppercase tracking-tight text-white mb-3">
                Playground & Sketches
              </h4>
              <p className="font-sans text-[#86868b] text-sm leading-relaxed font-light">
                Interactive masonry gallery of horological sketches, Nike AF1 anatomical teardown, Vizcom AI iterations, and makerspace foam prototypes.
              </p>
            </div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-white group-hover:text-[#FF3B1D] flex items-center gap-1.5">
              <span>Open Visual Lab</span>
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </Link>

          <Link 
            to="/about"
            className="p-8 apple-card rounded-[28px] hover:-translate-y-1.5 transition-all group flex flex-col justify-between space-y-6"
          >
            <div>
              <span className="font-mono text-xs font-bold text-[#FF3B1D] uppercase tracking-widest block mb-2">
                03 // BACKGROUND
              </span>
              <h4 className="text-2xl font-black font-display uppercase tracking-tight text-white mb-3">
                About Jinendra Parakh
              </h4>
              <p className="font-sans text-[#86868b] text-sm leading-relaxed font-light">
                Education at Strate School of Design, Bangalore. Prototyping hard skills, CAD tool competencies (Rhinoceros, Fusion 360, KeyShot), and 'Building Desires' philosophy.
              </p>
            </div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-white group-hover:text-[#FF3B1D] flex items-center gap-1.5">
              <span>Read Full Dossier</span>
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </Link>

          <Link 
            to="/experience"
            className="p-8 apple-card rounded-[28px] hover:-translate-y-1.5 transition-all group flex flex-col justify-between space-y-6"
          >
            <div>
              <span className="font-mono text-xs font-bold text-[#FF3B1D] uppercase tracking-widest block mb-2">
                04 // TRACK RECORD
              </span>
              <h4 className="text-2xl font-black font-display uppercase tracking-tight text-white mb-3">
                Professional Experience
              </h4>
              <p className="font-sans text-[#86868b] text-sm leading-relaxed font-light">
                Industry experience at Ticket Design, Pune (Water Dispensers, Medical DVT Devices), A&T Video Networks camera design, and Spandigit Social.
              </p>
            </div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-white group-hover:text-[#FF3B1D] flex items-center gap-1.5">
              <span>View Experience</span>
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </Link>

        </div>
      </section>

    </div>
  );
}

/* --- HORIZONTAL PROJECT SLIDER (MIRKO ROMANELLI INTERACTIVE CAROUSEL) --- */
function ProjectHorizontalSlider({ project, gallery = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const { openLightbox } = useLightbox();

  const total = gallery.length;

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex(prev => (prev + 1) % total);
  };

  const goToPrev = () => {
    setDirection(-1);
    setCurrentIndex(prev => (prev - 1 + total) % total);
  };

  const goToSlide = (idx) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  // Keyboard navigation for slider
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [total, currentIndex]);

  if (!gallery || gallery.length === 0) return null;

  const currentPlate = gallery[currentIndex];
  const imgSrc = resolveImg(currentPlate.id);

  // Framer Motion spring slide variants
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 340 : -340,
      opacity: 0,
      scale: 0.98
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 280, damping: 28 },
        opacity: { duration: 0.25 }
      }
    },
    exit: (dir) => ({
      x: dir > 0 ? -340 : 340,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: "spring", stiffness: 280, damping: 28 },
        opacity: { duration: 0.2 }
      }
    })
  };

  return (
    <div className="w-full select-none my-6">
      
      {/* Slider Top Metadata Bar */}
      <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-[#86868b] pb-3 border-b border-white/[0.08] mb-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="w-2 h-2 bg-[#FF3B1D] rounded-full inline-block animate-pulse" />
          <span className="font-bold text-white">
            PLATE 0{currentIndex + 1} / 0{total}
          </span>
          <span className="text-white/20">|</span>
          <span className="text-[#FF3B1D] font-bold">
            {currentPlate.page || `PAGE 0${currentIndex + 4}`}
          </span>
          {currentPlate.category && (
            <span className="text-[#86868b] hidden sm:inline">
              // {currentPlate.category}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden md:inline text-[11px] text-[#6e6e73]">
            DRAG / ARROWS TO SLIDE
          </span>
          <button
            onClick={() => openLightbox({ src: imgSrc, ...currentPlate }, gallery)}
            className="flex items-center gap-1.5 px-3 py-1 bg-white/[0.08] hover:bg-white text-white hover:text-black rounded-full font-mono text-[11px] font-bold transition-all border border-white/10 shadow-sm cursor-pointer ml-2"
            title="Expand Fullscreen (Zoom)"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">EXPAND (+)</span>
          </button>
        </div>
      </div>

      {/* Main Slide Presentation Stage with Drag and Spring Transition */}
      <div className="relative w-full min-h-[360px] sm:min-h-[480px] md:min-h-[580px] lg:min-h-[640px] apple-card rounded-[32px] overflow-hidden flex items-center justify-center p-4 sm:p-8 md:p-12 shadow-2xl group">
        
        {/* Previous Button */}
        <button
          onClick={goToPrev}
          aria-label="Previous slide"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/60 hover:bg-[#FF3B1D] text-white backdrop-blur-xl border border-white/15 flex items-center justify-center shadow-2xl transition-all duration-200 cursor-pointer group/btn"
        >
          <ChevronLeft className="w-6 h-6 group-hover/btn:-translate-x-0.5 transition-transform" />
        </button>

        {/* Next Button */}
        <button
          onClick={goToNext}
          aria-label="Next slide"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/60 hover:bg-[#FF3B1D] text-white backdrop-blur-xl border border-white/15 flex items-center justify-center shadow-2xl transition-all duration-200 cursor-pointer group/btn"
        >
          <ChevronRight className="w-6 h-6 group-hover/btn:translate-x-0.5 transition-transform" />
        </button>

        {/* Center Animated Slide Plate */}
        <div className="w-full h-full flex items-center justify-center relative">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = offset.x;
                if (swipe < -50 || velocity.x < -300) {
                  goToNext();
                } else if (swipe > 50 || velocity.x > 300) {
                  goToPrev();
                }
              }}
              className="w-full h-full flex flex-col items-center justify-center cursor-grab active:cursor-grabbing"
            >
              <img
                src={imgSrc}
                alt={currentPlate.title || "Project plate"}
                onClick={() => openLightbox({ src: imgSrc, ...currentPlate }, gallery)}
                className="max-h-[52vh] sm:max-h-[60vh] md:max-h-[66vh] max-w-full w-auto h-auto object-contain select-none drop-shadow-2xl mx-auto hover:scale-[1.01] transition-transform duration-300"
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Quick Zoom Pill */}
        <button
          onClick={() => openLightbox({ src: imgSrc, ...currentPlate }, gallery)}
          className="absolute bottom-4 right-4 z-20 bg-black/85 backdrop-blur-md text-white font-mono text-[11px] font-bold px-4 py-2 rounded-full uppercase tracking-wider flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg cursor-pointer hover:bg-[#FF3B1D] border border-white/10"
        >
          <Maximize2 className="w-3.5 h-3.5 text-[#FF3B1D] group-hover:text-white" />
          <span>Full Resolution</span>
        </button>
      </div>

      {/* Slide Caption & Technical Context */}
      <div className="pt-4 pb-2 border-b border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="bg-white/10 text-white px-2 py-0.5 text-[10px] font-bold uppercase rounded-sm border border-white/10">
              PLATE 0{currentIndex + 1}
            </span>
            <span className="bg-[#FF3B1D] text-white px-2 py-0.5 text-[10px] font-bold uppercase rounded-sm">
              {currentPlate.page || `Page 0${currentIndex + 4}`}
            </span>
            <h3 className="font-display font-black text-lg md:text-xl uppercase tracking-tight text-white">
              {currentPlate.title}
            </h3>
          </div>
          <p className="font-sans text-xs md:text-sm text-[#86868b] font-light max-w-3xl leading-relaxed">
            {currentPlate.caption}
          </p>
        </div>

        {/* Progress Fraction */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs font-bold text-[#86868b]">
            {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Interactive Horizontal Scrubber / Thumbnail Strip */}
      <div className="pt-4 flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
        {gallery.map((plate, pIdx) => (
          <button
            key={pIdx}
            onClick={() => goToSlide(pIdx)}
            className={`group relative shrink-0 transition-all cursor-pointer rounded-lg overflow-hidden border ${
              pIdx === currentIndex
                ? 'border-[#FF3B1D] ring-2 ring-[#FF3B1D]/40 scale-105'
                : 'border-white/10 opacity-50 hover:opacity-100'
            }`}
            title={`Slide 0${pIdx + 1}: ${plate.title}`}
          >
            <div className="w-16 h-12 sm:w-20 sm:h-14 bg-[#141416] p-1 flex items-center justify-center">
              <img
                src={resolveImg(plate.id)}
                alt={plate.title}
                className="max-h-full max-w-full object-contain"
                loading="lazy"
              />
            </div>
            <div className={`absolute bottom-0 inset-x-0 h-1 ${
              pIdx === currentIndex ? 'bg-[#FF3B1D]' : 'bg-transparent group-hover:bg-neutral-600'
            }`} />
          </button>
        ))}
      </div>

    </div>
  );
}

/* --- DOCKED FIXED BOTTOM BAR (APPLE FROSTED GLASS PROJECT NAVIGATION) --- */
function ProjectBottomBar({ project }) {
  const currentIndex = JINENDRA_PROJECTS.findIndex(p => p.slug === project.slug);
  const total = JINENDRA_PROJECTS.length;
  const prevProject = JINENDRA_PROJECTS[(currentIndex - 1 + total) % total];
  const nextProject = JINENDRA_PROJECTS[(currentIndex + 1) % total];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside 
      aria-label="Project Navigation Bar"
      className="fixed bottom-0 inset-x-0 z-40 bg-[#000000]/85 backdrop-blur-2xl border-t border-white/[0.08] py-3.5 px-6 md:px-12 shadow-2xl font-mono text-xs"
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
        
        {/* Previous Project Link */}
        <Link 
          to={`/project/${prevProject.slug}`}
          className="group flex items-center gap-2 text-[#f5f5f7] hover:text-[#FF3B1D] font-bold uppercase tracking-wider transition-colors"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="hidden sm:inline text-[#86868b] font-normal">PREV //</span>
          <span>{prevProject.title}</span>
        </Link>

        {/* Center Metadata & Back to Top */}
        <div className="hidden md:flex items-center gap-4 text-[#86868b] uppercase tracking-widest text-[11px]">
          <span className="text-[#FF3B1D] font-bold">{project.indexCode}</span>
          <span>•</span>
          <span>{project.duration}</span>
          <span>•</span>
          <span>{project.category}</span>
          <span>•</span>
          <button 
            onClick={scrollToTop} 
            className="text-white hover:text-[#FF3B1D] font-bold underline flex items-center gap-1 cursor-pointer"
          >
            <span>Top</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>

        {/* Next Project Link */}
        <Link 
          to={`/project/${nextProject.slug}`}
          className="group flex items-center gap-2 text-[#f5f5f7] hover:text-[#FF3B1D] font-bold uppercase tracking-wider transition-colors"
        >
          <span>{nextProject.title}</span>
          <span className="hidden sm:inline text-[#86868b] font-normal">// NEXT</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>

      </div>
    </aside>
  );
}

/* --- PROJECT DETAIL PAGE (100% UNCLIPPED IMAGES, EDITORIAL FLOW, INTERACTIVE PLATES) --- */
function ProjectDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const project = JINENDRA_PROJECTS.find(p => p.slug === slug);

  if (!project) {
    return (
      <div className="max-w-[1400px] mx-auto px-6 py-32 text-center font-mono">
        <h2 className="text-2xl font-black font-display uppercase mb-4">Project Not Found</h2>
        <Link to="/" className="text-xs font-bold uppercase tracking-widest text-[#FF3B1D] underline">
          ← Return to Works
        </Link>
      </div>
    );
  }

  const galleryContext = project.gallery ? project.gallery.map(g => ({ ...g, src: resolveImg(g.id) })) : [];

  return (
    <article className="min-h-screen pb-44 bg-[#000000] text-[#f5f5f7]">
      
      {/* Header */}
      <header id="overview" className="max-w-[1400px] mx-auto px-6 md:px-12 pt-16 pb-12 border-b border-white/[0.08]">
        
        <button 
          onClick={() => navigate(-1)} 
          className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#86868b] hover:text-white mb-8 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Works
        </button>
        
        <div className="flex flex-wrap items-center gap-3 mb-6 font-mono text-xs">
          <span className="bg-[#FF3B1D] text-white px-3 py-1 font-bold uppercase tracking-widest rounded-full shadow-sm">
            {project.indexCode}
          </span>
          <span className="bg-white/10 text-white border border-white/10 px-3 py-1 font-medium uppercase tracking-wider rounded-full">
            {project.duration}
          </span>
          <span className="bg-white/[0.06] text-white/80 border border-white/10 px-3 py-1 font-medium uppercase tracking-wider rounded-full">
            {project.projectType}
          </span>
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-[84px] font-black font-display uppercase tracking-tight text-white leading-none mb-4 apple-headline-gradient">
          {project.title}
        </h1>

        <p className="font-mono text-sm md:text-base font-bold text-[#86868b] uppercase tracking-wider mb-6">
          {project.subtitle}
        </p>

        <p className="font-sans text-xl md:text-2xl text-[#a1a1a6] font-light leading-relaxed max-w-3xl">
          {project.tagline}
        </p>

        {project.collaborators && (
          <div className="mt-6 pt-4 border-t border-white/10 font-mono text-xs text-[#86868b]">
            <span className="text-[#FF3B1D] font-bold uppercase tracking-widest mr-2">// COLLABORATORS:</span>
            <span>{project.collaborators}</span>
          </div>
        )}

        {project.heroMetrics && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 pt-8 border-t border-white/[0.08] font-mono text-xs">
            {project.heroMetrics.map((m, idx) => (
              <div key={idx} className="border-l-2 border-[#FF3B1D] pl-4 py-1">
                <span className="text-[#86868b] uppercase tracking-widest block text-[10px] font-bold mb-1">{m.label}</span>
                <span className="text-base font-bold text-white">{m.val}</span>
              </div>
            ))}
          </div>
        )}

      </header>

      {/* INTERACTIVE HORIZONTAL PROJECT SLIDER (MIRKO ROMANELLI STYLE CAROUSEL) */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pt-6">
        <ProjectHorizontalSlider project={project} gallery={project.gallery} />
      </section>

      {/* STICKY QUICK NAVIGATION BAR */}
      <nav className="sticky top-16 z-40 bg-[#000000]/85 backdrop-blur-2xl py-3 border-y border-white/[0.08] my-6 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between overflow-x-auto no-scrollbar gap-4 text-xs font-mono font-bold uppercase tracking-wider">
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a href="#overview" className="px-3.5 py-1.5 rounded-full hover:bg-white hover:text-black transition-colors text-[#86868b] bg-white/[0.06] border border-white/10">
              01. Overview
            </a>
            <a href="#problem" className="px-3.5 py-1.5 rounded-full hover:bg-white hover:text-black transition-colors text-[#86868b] bg-white/[0.06] border border-white/10">
              02. Brief & Problem
            </a>
            {project.inspirationTitle && (
              <a href="#inspiration" className="px-3.5 py-1.5 rounded-full hover:bg-white hover:text-black transition-colors text-[#86868b] bg-white/[0.06] border border-white/10">
                03. Inspiration
              </a>
            )}
            {(project.features || project.identifiedProblems || project.wearableGuide || project.makerspaceBuild) && (
              <a href="#anatomy" className="px-3.5 py-1.5 rounded-full hover:bg-white hover:text-black transition-colors text-[#86868b] bg-white/[0.06] border border-white/10">
                04. Anatomy & Craft
              </a>
            )}
            <a href="#plates" className="px-3.5 py-1.5 rounded-full bg-[#FF3B1D] text-white hover:bg-white hover:text-black transition-colors">
              05. Plates ({project.gallery.length})
            </a>
            {project.specs && (
              <a href="#specifications" className="px-3.5 py-1.5 rounded-full hover:bg-white hover:text-black transition-colors text-[#86868b] bg-white/[0.06] border border-white/10">
                06. Specifications
              </a>
            )}
          </div>

          <div className="hidden lg:flex items-center gap-3 shrink-0 text-[11px] text-[#86868b]">
            <span className="w-2 h-2 rounded-full bg-[#FF3B1D]" />
            <span>{project.indexCode}</span>
          </div>
        </div>
      </nav>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 space-y-24">
        
        {/* The Problem & Brief */}
        <motion.section 
          id="problem"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-8 border-t border-white/[0.08]"
        >
          <div className="md:col-span-5 space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-[#FF3B1D] font-bold block">
              // THE PROBLEM & INQUIRY
            </span>
            <h3 className="text-3xl font-black font-display uppercase tracking-tight text-white">
              Market Challenge
            </h3>
          </div>
          <div className="md:col-span-7 space-y-6">
            <p className="font-sans text-lg text-[#a1a1a6] font-normal leading-relaxed">
              {project.problem}
            </p>
            <div className="p-6 apple-card rounded-2xl border-l-4 border-[#FF3B1D]">
              <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-[#FF3B1D] block mb-1">
                DESIGN BRIEF
              </span>
              <p className="font-sans text-sm text-[#f5f5f7] font-medium leading-relaxed">
                {project.brief}
              </p>
            </div>
          </div>
        </motion.section>

        {/* Market Research (if applicable, e.g. Vantage) */}
        {project.marketResearch && (
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="pt-12 border-t border-white/[0.08] space-y-8"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#FF3B1D] font-bold block mb-1">
                  // MARKET RESEARCH
                </span>
                <h3 className="text-3xl md:text-4xl font-black font-display uppercase tracking-tight text-white">
                  {project.marketResearch.headline}
                </h3>
              </div>
              <span className="font-mono text-xs text-white font-bold uppercase tracking-wider bg-white/10 border border-white/10 px-4 py-2 rounded-full">
                {project.marketResearch.cagr}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-xs">
              {project.marketResearch.drivers.map((d, dIdx) => (
                <div key={dIdx} className="p-6 apple-card rounded-2xl space-y-2 border-l-2 border-[#FF3B1D]">
                  <span className="font-bold text-[#FF3B1D] uppercase text-xs block">{d.label}</span>
                  <p className="font-sans text-[#86868b] text-xs font-light leading-relaxed">{d.text}</p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Identified Problems Grid with Authentic Photos (e.g. Vantage) */}
        {project.identifiedProblems && (
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="pt-12 border-t border-white/[0.08] space-y-8"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#FF3B1D] font-bold block mb-1">
                  // USER FRICTION & DEFICIENCIES
                </span>
                <h3 className="text-3xl font-black font-display uppercase tracking-tight text-white">
                  Identified Problems
                </h3>
              </div>
              <span className="font-mono text-xs text-[#86868b] uppercase tracking-widest">
                Page 15 // Ethnographic Study
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-mono text-xs">
              {project.identifiedProblems.map((prob, pIdx) => (
                <div key={pIdx} className="apple-card rounded-2xl p-4 space-y-3 shadow-lg flex flex-col justify-between group">
                  {prob.imageId && (
                    <div className="w-full h-44 bg-[#141416] rounded-xl p-2 flex items-center justify-center overflow-hidden border border-white/5">
                      <ProjectImage 
                        id={prob.imageId}
                        altText={prob.title}
                        caption={prob.title}
                        className="w-full h-full flex items-center justify-center"
                        imgClassName="max-h-full max-w-full w-auto h-auto object-contain mx-auto group-hover:scale-102 transition-transform duration-500"
                        gallery={galleryContext}
                      />
                    </div>
                  )}
                  <div className="space-y-1.5">
                    <span className="font-bold text-white uppercase text-xs block font-display tracking-tight">{prob.title}</span>
                    <p className="font-sans text-[#86868b] text-xs font-light leading-relaxed">{prob.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Historical Timeline (if applicable, e.g. Friday) */}
        {project.historicalTimeline && (
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="pt-12 border-t border-white/[0.08] space-y-8"
          >
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#FF3B1D] font-bold block mb-1">
                // THE STORY & HISTORICAL RECLAMATION
              </span>
              <h3 className="text-3xl font-black font-display uppercase tracking-tight text-white">
                The Fun of Re-telling History
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 font-mono text-xs">
              {project.historicalTimeline.map((item, tIdx) => (
                <div key={tIdx} className="p-5 apple-card rounded-2xl space-y-2 border-t-2 border-[#FF3B1D]">
                  <span className="font-bold text-[#FF3B1D] text-[11px] block">{item.epoch}</span>
                  <p className="font-sans text-[#a1a1a6] text-xs font-light leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Design Inspiration & Philosophy (ZERO CROPPING) */}
        {project.inspirationTitle && (
          <motion.section 
            id="inspiration"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-12 border-t border-white/[0.08] items-center"
          >
            <div className="md:col-span-5 space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-[#FF3B1D] font-bold block">
                // DESIGN INSPIRATION
              </span>
              <h3 className="text-3xl font-black font-display uppercase tracking-tight text-white">
                {project.inspirationTitle}
              </h3>
              {project.inspirationSubtitle && (
                <p className="font-mono text-xs font-bold text-[#86868b] uppercase tracking-wider">
                  {project.inspirationSubtitle}
                </p>
              )}
              <p className="font-sans text-base text-[#a1a1a6] font-light leading-relaxed">
                {project.inspirationDesc}
              </p>
            </div>
            <div className="md:col-span-7">
              <div className="w-full min-h-[300px] md:min-h-[420px] max-h-[540px] apple-card rounded-2xl p-4 sm:p-8 flex items-center justify-center overflow-hidden">
                <ProjectImage 
                  id={project.inspirationImg} 
                  altText={project.inspirationTitle}
                  caption={`${project.inspirationTitle} Inspiration Reference`}
                  className="w-full h-full flex items-center justify-center"
                  imgClassName="max-h-[480px] max-w-full w-auto h-auto object-contain mx-auto"
                  gallery={galleryContext}
                />
              </div>
            </div>
          </motion.section>
        )}

        {/* Functional Features Callout */}
        {project.features && (
          <motion.section 
            id="anatomy"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="pt-12 border-t border-white/[0.08] space-y-8"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#FF3B1D] font-bold block mb-1">
                  // INTERACTION & TACTILITY
                </span>
                <h3 className="text-3xl font-black font-display uppercase tracking-tight text-white">
                  Functional Anatomy & Callouts
                </h3>
              </div>
              <span className="font-mono text-xs text-[#86868b] uppercase tracking-widest">
                Page 08 // Retro-Engineering Mechanics
              </span>
            </div>

            {project.slug === 'fuel' ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 apple-card rounded-2xl p-6 sm:p-10 flex items-center justify-center">
                  <ProjectImage 
                    id="p8_2"
                    altText="Fuel Functional Anatomy Overview"
                    caption="Plate: Functional Anatomy Overview of Fuel Power Bank"
                    className="w-full flex items-center justify-center"
                    imgClassName="max-h-[480px] max-w-full w-auto h-auto object-contain mx-auto drop-shadow-2xl"
                    gallery={galleryContext}
                  />
                </div>

                <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 font-mono text-xs">
                  {project.features.map((feat, fIdx) => (
                    <div 
                      key={fIdx} 
                      className="p-4 apple-card rounded-xl flex items-center gap-4 group"
                    >
                      {feat.imageId && (
                        <div className="w-16 h-16 shrink-0 bg-[#161618] border border-white/10 rounded-full overflow-hidden p-1 flex items-center justify-center group-hover:scale-105 transition-transform">
                          <ProjectImage 
                            id={feat.imageId}
                            altText={feat.title}
                            caption={feat.title}
                            className="w-full h-full flex items-center justify-center"
                            imgClassName="w-full h-full object-cover rounded-full"
                            gallery={galleryContext}
                          />
                        </div>
                      )}
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-[#FF3B1D] font-bold uppercase tracking-wider block">{feat.tag}</span>
                        <h4 className="text-sm font-bold font-display uppercase text-white">{feat.title}</h4>
                        <p className="font-sans text-[#86868b] text-xs font-light leading-relaxed">{feat.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-mono text-xs">
                {project.features.map((feat, fIdx) => (
                  <div key={fIdx} className="p-6 apple-card rounded-2xl space-y-2 border-l-2 border-[#FF3B1D]">
                    <span className="text-[10px] text-[#86868b] font-bold uppercase tracking-wider block">{feat.tag}</span>
                    <h4 className="text-base font-bold font-display uppercase text-white">{feat.title}</h4>
                    <p className="font-sans text-[#86868b] text-xs font-light leading-relaxed">{feat.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.section>
        )}

        {/* User Steps Guide (if applicable, e.g. Vantage) */}
        {project.userSteps && (
          <motion.section 
            id={!project.features ? "anatomy" : undefined}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="pt-12 border-t border-white/[0.08] space-y-8"
          >
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#FF3B1D] font-bold block mb-1">
                // ERGONOMICS & DEPLOYMENT
              </span>
              <h3 className="text-3xl font-black font-display uppercase tracking-tight text-white">
                Just Plug In, Position, and Perfect
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-xs">
              {project.userSteps.map((s, sIdx) => (
                <div key={sIdx} className="p-6 apple-card rounded-2xl space-y-3">
                  <span className="text-2xl font-black font-display text-[#FF3B1D] block">{s.step}</span>
                  <h4 className="text-base font-bold font-display uppercase text-white">{s.title}</h4>
                  <p className="font-sans text-[#86868b] text-xs font-light leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Wearable Guide (Friday) */}
        {project.wearableGuide && (
          <motion.section 
            id="anatomy"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="pt-12 border-t border-white/[0.08] space-y-8"
          >
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#FF3B1D] font-bold block mb-1">
                // USER CEREMONY
              </span>
              <h3 className="text-3xl font-black font-display uppercase tracking-tight text-white">
                Step into the Story: The Wearable Guide
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-mono text-xs">
              {project.wearableGuide.map((wg, wgIdx) => (
                <div key={wgIdx} className="p-6 apple-card rounded-2xl space-y-2 border-l-2 border-[#FF3B1D]">
                  <span className="text-[#FF3B1D] font-black font-display text-lg block">{wg.step}</span>
                  <h4 className="text-base font-bold font-display uppercase text-white">{wg.title}</h4>
                  <p className="font-sans text-[#86868b] text-xs font-light leading-relaxed">{wg.desc}</p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* 1:1 Scale Makerspace Physical Fabrication (Friday) */}
        {project.makerspaceBuild && (
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="pt-12 border-t border-white/[0.08] space-y-8"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#FF3B1D] font-bold block mb-1">
                  // PHYSICAL FABRICATION & PROTOTYPING
                </span>
                <h3 className="text-3xl md:text-4xl font-black font-display uppercase tracking-tight text-white">
                  1:1 Scale Prototype Build (UK 11)
                </h3>
              </div>
              <span className="font-mono text-xs text-white font-bold uppercase tracking-wider bg-white/10 border border-white/10 px-4 py-2 rounded-full">
                Strate Makerspace Facility
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-mono text-xs">
              {project.makerspaceBuild.map((step, sIdx) => (
                <div key={sIdx} className="apple-card rounded-2xl p-4 space-y-3 shadow-lg flex flex-col justify-between group">
                  <div className="w-full h-48 bg-[#141416] rounded-xl p-3 flex items-center justify-center overflow-hidden border border-white/5">
                    <ProjectImage 
                      id={step.id}
                      altText={step.title}
                      caption={step.caption}
                      className="w-full h-full flex items-center justify-center"
                      imgClassName="max-h-full max-w-full w-auto h-auto object-contain mx-auto group-hover:scale-102 transition-transform duration-500"
                      gallery={galleryContext}
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-[#FF3B1D] font-bold uppercase tracking-wider block">Stage 0{sIdx + 1}</span>
                    <h4 className="font-bold text-white font-display uppercase text-xs leading-snug">{step.title}</h4>
                    <p className="font-sans text-[#86868b] text-xs font-light leading-relaxed">{step.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* COMPLETE GALLERY OF ALL PLATES (ZERO CROPPING — EVERY SKETCH, CAD & RENDER 100% UNCLIPPED) */}
        <section id="plates" className="space-y-16 pt-12 border-t border-white/[0.08]">
          <div className="flex items-center justify-between font-mono text-xs pb-4 border-b border-white/[0.08]">
            <span className="font-bold text-[#FF3B1D] uppercase tracking-widest">
              // PROCESS, CAD & VISUALIZATIONS
            </span>
            <span className="text-[#86868b] uppercase">{project.gallery.length} Plates Documented</span>
          </div>

          <div className="space-y-24">
            {project.gallery.map((g, gIdx) => (
              <motion.div 
                key={gIdx} 
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4"
              >
                {/* Visual Canvas: Responsive, Generous, Centered, Never Cropped */}
                <div className="w-full min-h-[300px] md:min-h-[500px] max-h-[85vh] apple-card rounded-[28px] p-4 sm:p-8 flex items-center justify-center overflow-hidden">
                  <ProjectImage 
                    id={g.id} 
                    altText={g.title || g.caption} 
                    caption={`Plate 0${gIdx + 1}: ${g.title} — ${g.caption}`}
                    className="w-full h-full flex items-center justify-center"
                    imgClassName="max-h-[80vh] max-w-full w-auto h-auto object-contain mx-auto drop-shadow-2xl"
                    gallery={galleryContext}
                  />
                </div>

                {/* Plate Technical Metadata & Caption */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs pt-1 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="bg-white/10 text-white px-2 py-0.5 text-[10px] font-bold uppercase rounded-sm border border-white/10">
                      Plate 0{gIdx + 1}
                    </span>
                    <span className="bg-[#FF3B1D] text-white px-2 py-0.5 text-[10px] font-bold uppercase rounded-sm">
                      {g.page || `Page 0${gIdx + 1}`}
                    </span>
                    <span className="font-bold text-white uppercase tracking-wider text-xs">
                      {g.title}
                    </span>
                    {g.category && (
                      <span className="text-[#86868b] text-[10px] uppercase hidden md:inline">
                        // {g.category}
                      </span>
                    )}
                  </div>
                  <span className="text-[#86868b] text-[11px] font-sans font-light">
                    {g.caption}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Technical DFM Specifications Drawer */}
        {project.specs && (
          <motion.div 
            id="specifications"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 md:p-12 apple-card rounded-[28px] font-mono text-xs shadow-2xl"
          >
            <div className="text-[#FF3B1D] font-bold mb-6 uppercase tracking-widest text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-[#FF3B1D]" />
              <span>TECHNICAL SPECIFICATIONS & MATERIAL METRICS</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(project.specs).map(([key, val], sIdx) => (
                <div key={sIdx} className="border-l border-white/10 pl-4">
                  <span className="text-[#86868b] block mb-1 uppercase font-bold text-[10px]">{key}</span>
                  <span className="text-white font-light leading-relaxed block">{val}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Bottom Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-12 border-t border-white/[0.08] font-mono text-xs font-bold uppercase tracking-wider">
          <Link to="/" className="text-white hover:text-[#FF3B1D] flex items-center gap-2 transition-colors">
            ← Return to Works
          </Link>
          <div className="flex items-center gap-3">
            <Link 
              to="/playground"
              className="bg-white/10 border border-white/15 text-white px-5 py-2.5 rounded-full hover:bg-white hover:text-black transition-colors"
            >
              Visual Lab →
            </Link>
            <a 
              href="/Jinendra_Parakh_Portfolio.pdf" 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-2 bg-[#FF3B1D] text-white px-5 py-2.5 rounded-full hover:bg-white hover:text-black transition-colors shadow-sm"
            >
              <span>Download 53p Deck (PDF)</span>
              <Download className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>

      {/* Docked Project Bottom Bar */}
      <ProjectBottomBar project={project} />
    </article>
  );
}

/* --- PLAYGROUND & VISUAL LAB PAGE (INTERACTIVE MASONRY, ZERO CROPPING, CATEGORY FILTERS) --- */
function PlaygroundPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const items = [
    // Horology & Hand Sketches
    { id: "p1_2", category: "Hand Sketches", title: "Chronograph Watch Hand Sketch", caption: "Portfolio cover perspective study of mechanical chronograph with custom knurled pushers and subdials." },
    { id: "p46_2", category: "Hand Sketches", title: "Industrial Design Ideation Sheets", caption: "Form sketches: technical backpacks, mid-century lounge chairs, running sneakers, and origami faceted seating." },
    
    // Sneaker Teardown & Anatomy
    { id: "p47_2", category: "Footwear Teardown", title: "Sneaker Anatomical Analysis", caption: "Lateral, front, and rear teardown analyzing tongue padding, foxing, toe spring, and heel counter." },
    { id: "p48_2", category: "Footwear Teardown", title: "Deconstructed Footwear Layers", caption: "Layered deconstruction of footwear construction: PU leather upper, soft padding, insole, midsole, and outsole." },
    { id: "p49_2", category: "Footwear Teardown", title: "Nike Air Force 1 Deep Dive", caption: "Deep dive study of AF1: sewed branding, 1-to-6 hole pattern, double stitching, metal medallion, and air sole." },

    // Vizcom AI Trials
    { id: "p50_2", category: "Vizcom AI Trials", title: "Vizcom AI: Hand Sketch to Concept", caption: "Translating hand-drawn watch sketch into generative conceptual passes with prompt tuning." },
    { id: "p50_4", category: "Vizcom AI Trials", title: "Vizcom AI: Cosmic Space Environment", caption: "Material specularity and zero-gravity reflection prompt trial on watch casing." },
    { id: "p50_6", category: "Vizcom AI Trials", title: "Vizcom AI: Cyberpunk Metropolis", caption: "Futuristic neon lighting pass exploring architectural watch bezel reflections." },
    { id: "p50_8", category: "Vizcom AI Trials", title: "Vizcom AI: Studio Matte Black Finish", caption: "High-contrast minimalist studio product render exploring stealth CMF." },

    // Models & Prototypes (Strate Makerspace)
    { id: "p51_8", category: "Makerspace & Mockups", title: "High-Gloss Clay Heel Form Mockup", caption: "Physical styling clay heel mockups exploring high-gloss black and red lacquer finishes." },
    { id: "p51_10", category: "Makerspace & Mockups", title: "3D Printed Prototype Heel", caption: "White SLA 3D printed heel platform studying stability and curvature." },
    { id: "p51_12", category: "Makerspace & Mockups", title: "CNC 3-Axis Foam Sole Toolpath", caption: "High-density polyurethane foam sole milling on industrial CNC router." },
    { id: "p51_14", category: "Makerspace & Mockups", title: "Foam Lathe Turning & Radio Mockup", caption: "Turned foam acoustic horn and corrugated foam radio / powerbank mockups." },
    { id: "p51_18", category: "Makerspace & Mockups", title: "1:1 Scale UK 11 Heel Assembly", caption: "Wearable working boot prototype assembly at Strate makerspace." },

    // Glass Vessel
    { id: "p44_2", category: "Glass Vessel", title: "Acoustic Glass Sound Vessel", caption: "Blown glass double hourglass spheres suspended in an intertwined copper wire cradle." },
    { id: "p45_2", category: "Glass Vessel", title: "Glass Vessel Core Detailing", caption: "Macro view of central diffuser and copper wire cradle interface." },

    // Fuel & Vantage Highlights
    { id: "p7_2", category: "Hand Sketches", title: "Fuel Retro-Engineering Ideation", caption: "Sketches exploring tactile thumb grips, exposed sub-frames, and morphod glass panels." },
    { id: "p18_2", category: "Hand Sketches", title: "Vantage 360 Ideation Sheet", caption: "Complete sketch sheet exploring articulated boom arms, ball sockets, and the Final Concept." },
    { id: "p35_2", category: "Hand Sketches", title: "Friday Heels Matrix Sketches", caption: "Feature exploration sketches: Authoritative, Dynamic, and Hulk silhouettes." },
    { id: "p39_2", category: "Hand Sketches", title: "The Wearable Guide Illustrations", caption: "6-step illustrated user ceremony from monogram release to custom dialed fit." },
    { id: "p41_2", category: "Makerspace & Mockups", title: "Prototype Sole CNC Machining", caption: "CNC router carving sole ergonomics for physical UK 11 boot." }
  ];

  const categories = ['All', 'Hand Sketches', 'Footwear Teardown', 'Vizcom AI Trials', 'Makerspace & Mockups', 'Glass Vessel'];

  const filteredItems = activeCategory === 'All' 
    ? items 
    : items.filter(it => it.category === activeCategory);

  return (
    <div className="min-h-screen bg-black text-[#f5f5f7] pb-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-16">
        
        {/* Navigation Breadcrumb */}
        <Link to="/" className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-neutral-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Works
        </Link>

        {/* Header */}
        <div className="pb-12 border-b border-white/[0.08] mb-12">
          <span className="font-mono text-xs font-bold text-[#FF3B1D] uppercase tracking-widest block mb-2">
            // EXPERIMENTAL LAB & ARCHIVES
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display uppercase tracking-tight text-white mb-4">
            Visual Lab & Sketches
          </h1>
          <p className="font-sans text-lg sm:text-xl text-neutral-400 font-light max-w-2xl leading-relaxed">
            Continuous creative explorations spanning horological hand sketching, generative AI workflows, footwear anatomical teardowns, and physical workshop model-making.
          </p>
        </div>

        {/* Filter Pills with Layout Animation */}
        <div className="flex flex-wrap items-center gap-2 mb-12 font-mono text-xs">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-4 py-2 rounded-full uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer ${
                activeCategory === cat 
                  ? 'text-white' 
                  : 'text-neutral-400 hover:text-white bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08]'
              }`}
            >
              {activeCategory === cat && (
                <motion.span 
                  layoutId="activeFilterPill"
                  className="absolute inset-0 bg-[#FF3B1D] rounded-full -z-10 shadow-[0_0_15px_rgba(255,59,29,0.4)]"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
          <span className="ml-auto text-neutral-500 font-mono text-xs hidden sm:inline">
            {filteredItems.length} Artifacts
          </span>
        </div>

        {/* Interactive Responsive Masonry Grid (ZERO CROPPING — IMAGES EXPAND TO NATURAL HEIGHT) */}
        {(() => {
          const playgroundGallery = filteredItems.map(it => ({ ...it, src: resolveImg(it.id) }));
          return (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence>
                {filteredItems.map((item, idx) => (
                  <motion.div
                    key={item.id + idx}
                    layout
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, delay: (idx % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="group apple-card hover:border-white/30 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 shadow-xl"
                  >
                    {/* Image Container: Ample Padding, Flexible Height, 100% Unclipped */}
                    <div className="w-full min-h-[240px] max-h-[460px] p-5 bg-black/60 rounded-xl flex items-center justify-center overflow-hidden mb-4 border border-white/[0.04]">
                      <ProjectImage 
                        id={item.id} 
                        altText={item.title} 
                        caption={`${item.title} — ${item.caption}`}
                        className="w-full h-full flex items-center justify-center"
                        imgClassName="max-h-[420px] max-w-full w-auto h-auto object-contain mx-auto group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                        gallery={playgroundGallery}
                      />
                    </div>

                    <div className="space-y-2 font-mono text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-[#FF3B1D] uppercase tracking-wider">
                          {item.category}
                        </span>
                        <span className="text-[10px] text-neutral-500 uppercase">
                          {item.id}
                        </span>
                      </div>
                      <h3 className="font-bold text-white font-display uppercase text-sm leading-snug group-hover:text-white transition-colors">
                        {item.title}
                      </h3>
                      <p className="font-sans text-neutral-400 text-xs font-normal leading-relaxed">
                        {item.caption}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          );
        })()}

      </div>
    </div>
  );
}

/* --- ABOUT JINENDRA PARAKH PAGE (PAGE 2 BUILDING DESIRES + RESUME) --- */
function AboutPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-black text-[#f5f5f7] pb-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-16">
        
        <Link to="/" className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-neutral-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Works
        </Link>

        {/* Bio Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pb-16 border-b border-white/[0.08]">
          
          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono text-xs font-bold text-[#FF3B1D] uppercase tracking-widest block">
              // ‘BUILDING DESIRES’
            </span>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display uppercase tracking-tight text-white leading-tight">
              On a mission to change how we look at things.
            </h1>

            <p className="font-sans text-lg sm:text-xl text-neutral-300 font-light leading-relaxed">
              I believe every object has a story to tell and experience to create. My goal is to blend functionality with aesthetics, creating meaningful solutions that not only solve problems but also build aspirations.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 font-mono text-xs">
              <a 
                href="/Jinendra_Parakh_Resume.pdf" 
                target="_blank" 
                rel="noreferrer"
                className="bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-neutral-200 transition-all flex items-center gap-2 shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Resume (PDF)</span>
              </a>

              <a 
                href="/Jinendra_Parakh_Portfolio.pdf" 
                target="_blank" 
                rel="noreferrer"
                className="bg-[#FF3B1D] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#e03419] transition-all flex items-center gap-2 shadow-sm"
              >
                <span>View Full 53-Page Deck</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a 
                href="https://www.behance.net/gallery/223719061/Design-Portfolio" 
                target="_blank" 
                rel="noreferrer"
                className="bg-white/[0.08] border border-white/[0.12] text-white px-6 py-3 rounded-full hover:bg-white/[0.15] transition-all flex items-center gap-2 font-semibold"
              >
                <BehanceIcon className="w-3.5 h-3.5" />
                <span>Behance Portfolio</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="apple-card rounded-2xl p-6 flex items-center justify-center bg-black/60 border border-white/[0.08]">
              <ProjectImage 
                id="p1_2" 
                altText="Jinendra Parakh Chronograph Hand Sketch"
                caption="Original Chronograph Perspective Sketch by Jinendra Parakh"
                className="w-full flex items-center justify-center"
                imgClassName="max-h-[380px] max-w-full w-auto h-auto object-contain mx-auto"
              />
            </div>
            <div className="flex items-center justify-between font-mono text-[11px] text-neutral-400">
              <span className="uppercase tracking-wider">Fig. Chronograph Watch Hand Sketch</span>
              <span className="text-[#FF3B1D] font-bold">PORTFOLIO COVER 2025</span>
            </div>
          </div>

        </div>

        {/* Education & Competencies */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-16">
          
          {/* Education Milestones */}
          <div className="lg:col-span-6 space-y-6 font-mono">
            <h2 className="text-2xl font-bold font-display uppercase tracking-tight text-white pb-3 border-b border-white/[0.08]">
              Education Milestones
            </h2>

            <div className="space-y-6">
              <div className="p-6 apple-card rounded-2xl border-l-2 border-l-[#FF3B1D]">
                <span className="text-[#FF3B1D] text-xs font-bold uppercase tracking-widest block mb-1">
                  Product Design // 2021 — 2025
                </span>
                <h3 className="text-xl font-bold font-display uppercase text-white">
                  Bsc, Product Design
                </h3>
                <p className="text-xs text-neutral-400 font-semibold uppercase mt-0.5">
                  Strate School of Design, Bangalore
                </p>
                <p className="font-sans text-xs text-neutral-300 mt-2 font-light leading-relaxed">
                  Specialized in user research, physical rapid prototyping, form semantics, CMF strategy, ergonomic modeling, and manufacturing realization.
                </p>
              </div>

              <div className="p-6 apple-card rounded-2xl border-l-2 border-l-white/20">
                <span className="text-neutral-400 text-xs font-bold uppercase tracking-widest block mb-1">
                  Higher Secondary // PCM
                </span>
                <h3 className="text-xl font-bold font-display uppercase text-white">
                  12th Science, PCM
                </h3>
                <p className="text-xs text-neutral-400 font-semibold uppercase mt-0.5">
                  Matoshri Junior College, Nashik
                </p>
                <p className="font-sans text-xs text-neutral-300 mt-2 font-light leading-relaxed">
                  12th Science (Physics, Chemistry, Mathematics).
                </p>
              </div>

              <div className="p-6 apple-card rounded-2xl border-l-2 border-l-white/20">
                <span className="text-neutral-400 text-xs font-bold uppercase tracking-widest block mb-1">
                  Secondary School
                </span>
                <h3 className="text-xl font-bold font-display uppercase text-white">
                  10th, ICSE
                </h3>
                <p className="text-xs text-neutral-400 font-semibold uppercase mt-0.5">
                  Anubhuti Residential School, Jalgaon
                </p>
                <p className="font-sans text-xs text-neutral-300 mt-2 font-light leading-relaxed">
                  10th ICSE. Active in student delegation at India International Model United Nations (IIMUN).
                </p>
              </div>
            </div>
          </div>

          {/* Hard Skills, Soft Skills & Tools (Exact from Resume and Portfolio Page 2) */}
          <div className="lg:col-span-6 space-y-6 font-mono">
            <h2 className="text-2xl font-bold font-display uppercase tracking-tight text-white pb-3 border-b border-white/[0.08]">
              Skills & Competencies
            </h2>

            <div className="space-y-6">
              
              <div className="p-6 apple-card rounded-2xl">
                <span className="text-xs font-bold text-[#FF3B1D] uppercase tracking-wider block mb-3">
                  // HARD SKILLS & DOMAINS
                </span>
                <div className="flex flex-wrap gap-2 text-xs">
                  {["Sketching", "3D Modeling", "Rapid Prototyping", "3D Printing", "User Research", "CMF Strategy", "Form Semantics"].map((s, i) => (
                    <span key={i} className="bg-white/[0.08] border border-white/[0.08] text-neutral-200 px-3 py-1 font-semibold rounded-full">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 apple-card rounded-2xl">
                <span className="text-xs font-bold text-[#FF3B1D] uppercase tracking-wider block mb-3">
                  // SOFT SKILLS (PORTFOLIO PAGE 2)
                </span>
                <div className="flex flex-wrap gap-2 text-xs">
                  {["Adaptive", "Team Player", "Empathetic", "Emotional Intelligence", "Design Leadership", "Vendor Coordination"].map((s, i) => (
                    <span key={i} className="bg-white/[0.08] border border-white/[0.08] text-neutral-200 px-3 py-1 font-semibold rounded-full">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 apple-card rounded-2xl">
                <span className="text-xs font-bold text-[#FF3B1D] uppercase tracking-wider block mb-3">
                  // SOFTWARE TOOLBOX (RESUME & PORTFOLIO)
                </span>
                <div className="flex flex-wrap gap-2 text-xs">
                  {["Photoshop", "Illustrator", "Rhinoceros 3D", "Fusion 360", "Keyshot 3D", "Procreate", "Vizcom"].map((s, i) => (
                    <span key={i} className="bg-white/[0.08] border border-white/[0.08] text-neutral-200 px-3 py-1 font-semibold rounded-full">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 apple-card rounded-2xl space-y-3">
                <span className="text-xs font-bold text-[#FF3B1D] uppercase tracking-wider block">
                  // INTERESTS
                </span>
                <p className="font-sans text-xs text-neutral-300 leading-relaxed font-light">
                  Interior Design, Entrepreneurship, Marketing, Table Tennis, Business Case Studies, and Human Psychology.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

/* --- EXPERIENCE PAGE (TICKET DESIGN, A&T VIDEO NETWORKS, FREELANCE INTERIOR, SPANDIGIT) --- */
function ExperiencePage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const experiences = [
    {
      company: "Freelance Interior Design Project, Nashik",
      role: "Interior Design Project Lead",
      period: "September 2024 — March 2025",
      grade: null,
      desc: "Assisted architect in executing interior designs for a private bungalow, learning hands-on about space planning, materials, and furniture design.",
      bullets: [
        "Managed on-site coordination with labourers and vendors, resolving design conflicts, and working around the constraints.",
        "Helped selecting material and colour options while considering practicality, aesthetics, and budget.",
        "Identifying gaps between drawings and on-site builds and learnt how to address them."
      ]
    },
    {
      company: "Ticket Design, Pune",
      role: "Industrial Design Intern",
      period: "March — July 2024",
      grade: "Grade - A",
      desc: "Collaborated with Senior Designers and Engineers on global Projects including Water Dispensers, Air Fresheners, Medical devices(DVT) Keypad.",
      bullets: [
        "Involved in the whole product life-cycle from research to development and prototyping.",
        "Successfully contributed to 4 projects with 2 designs selected by clients for further development.",
        "Assisted in ADI presentations and under took side projects under mentorship."
      ]
    },
    {
      company: "A&T Video Networks",
      role: "Industry Project Designer",
      period: "Duration: 4 Months",
      grade: "Grade - O",
      desc: "Redesigned a web and PTZ camera with internal constraints. Worked with the engineers on its development and prototyping.",
      bullets: [
        "Worked on user research, market analysis, Product marketing and placement.",
        "Created a cohesive Brand Language for the company and redesigned its logo.",
        "Earned top 'O' Grade for the project."
      ]
    },
    {
      company: "Spandigit Social, Nashik",
      role: "Digital Marketing Intern",
      period: "June — July 2023",
      grade: null,
      desc: "Conducted brand and demographic research to recognize the target audience and optimize target campaigns accordingly.",
      bullets: [
        "Managed Google and Facebook Ads, increasing click through rates.",
        "Got hands-on experience on SEO and Back Linking.",
        "Successfully ran 2 campaigns for a shopping mall to increase footfalls during festive season.",
        "Strengthened understanding of consumer behavioral preferences to inform industrial design decisions."
      ]
    },
    {
      company: "India International Model United Nations (IIMUN)",
      role: "Student Delegate",
      period: "Anubhuti School, Jalgaon",
      grade: null,
      desc: "Developed critical thinking skills by understanding different perspectives and arguments during parliamentary sessions.",
      bullets: [
        "Enhanced team working skills by participating in group discussions and negotiations.",
        "Led team discussions and managed time effectively to balance multiple tasks and meet deadlines."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-[#f5f5f7] pb-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-16">
        
        <Link to="/" className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-neutral-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Works
        </Link>

        <div className="pb-12 border-b border-white/[0.08] mb-16">
          <span className="font-mono text-xs font-bold text-[#FF3B1D] uppercase tracking-widest block mb-2">
            // TRACK RECORD
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display uppercase tracking-tight text-white mb-4">
            Professional Experience
          </h1>
          <p className="font-sans text-lg sm:text-xl text-neutral-400 font-light max-w-2xl leading-relaxed">
            Hands-on work spanning global consultancy at Ticket Design, camera engineering at A&T Video Networks, bungalow spatial execution, and digital market research.
          </p>
        </div>

        <div className="space-y-12">
          {experiences.map((exp, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 md:p-12 apple-card rounded-[28px] space-y-6 shadow-2xl transition-all hover:border-white/20"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-white/[0.08] pb-5 font-mono">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl md:text-3xl font-extrabold font-display uppercase text-white">
                      {exp.company}
                    </h3>
                    {exp.grade && (
                      <span className="bg-[#FF3B1D]/20 border border-[#FF3B1D]/40 text-[#FF3B1D] px-3 py-0.5 text-[10px] font-bold uppercase rounded-full">
                        {exp.grade}
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-bold text-[#FF3B1D] uppercase mt-1 tracking-wider">
                    {exp.role}
                  </p>
                </div>
                <span className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">
                  {exp.period}
                </span>
              </div>

              <p className="font-sans text-neutral-300 text-base font-normal leading-relaxed">
                {exp.desc}
              </p>

              <ul className="space-y-3 font-sans text-sm text-neutral-400 font-light">
                {exp.bullets.map((b, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-3">
                    <span className="text-[#FF3B1D] font-bold text-base leading-none">›</span>
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}

/* --- ROOT APP WITH GLOBAL LIGHTBOX & SCROLL SYSTEM --- */
export default function App() {
  const [lightboxState, setLightboxState] = useState({
    activeItem: null,
    gallery: []
  });

  useEffect(() => {
    document.title = "Jinendra Parakh | Product Design Portfolio 2025";
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
    setLightboxState(prev => ({
      ...prev,
      activeItem: nextItem
    }));
  };

  return (
    <ErrorBoundary>
      <LightboxContext.Provider value={{ openLightbox, closeLightbox }}>
        <Router>
          <div className="min-h-screen bg-[#000000] text-[#f5f5f7] font-sans selection:bg-[#FF3B1D] selection:text-white flex flex-col">
            <ScrollProgressBar />
            <CustomCursor />
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/project/:slug" element={<ProjectDetailPage />} />
                <Route path="/playground" element={<PlaygroundPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/experience" element={<ExperiencePage />} />
              </Routes>
            </main>
            <Footer />
            <ScrollToTopButton />
            <ImageLightboxModal 
              activeItem={lightboxState.activeItem}
              gallery={lightboxState.gallery}
              onClose={closeLightbox}
              onNavigate={navigateLightbox}
            />
          </div>
        </Router>
      </LightboxContext.Provider>
    </ErrorBoundary>
  );
}