import React, { useState, useEffect, useRef, Component } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useParams, 
  useNavigate 
} from 'react-router-dom';
import { 
  ArrowUpRight, 
  ArrowLeft, 
  Lock, 
  ImageIcon, 
  ArrowUp, 
  Menu, 
  X, 
  Sparkles, 
  Layers, 
  EyeOff, 
  Quote, 
  Compass,
  Lightbulb,
  Workflow,
  Camera,
  BatteryCharging,
  Maximize2
} from 'lucide-react';

/* --- ZERO-LATENCY IDEO PRECISION CURSOR --- */
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
          ? 'w-7 h-7 -ml-3.5 -mt-3.5 bg-neutral-900/10 border border-neutral-900'
          : 'w-2 h-2 -ml-1 -mt-1 bg-neutral-900 border-none'
      }`}
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
        <div style={{ padding: '60px 24px', fontFamily: 'serif', maxWidth: '640px', margin: '40px auto' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '400', marginBottom: '12px' }}>Something went wrong.</h2>
          <p style={{ color: '#666', fontSize: '15px', lineHeight: '1.6', marginBottom: '24px' }}>
            {this.state.error?.toString()}
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            style={{ padding: '10px 24px', background: '#111', color: '#fff', borderRadius: '40px', border: 'none', cursor: 'pointer', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
          >
            Return to Studio Home
          </button>
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
      className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-neutral-900 text-white shadow-xl hover:bg-neutral-800 border border-neutral-700 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
}

/* --- RECURSIVE ASSET REGISTRY --- */
const assetFiles = import.meta.glob('./assets/**/*.{png,webp}', { eager: true });

function getAssetUrl(id) {
  if (!id) return null;
  const searchId = String(id).trim().toLowerCase();
  const matchKey = Object.keys(assetFiles).find(key => {
    const filename = key.split('/').pop().replace(/\.(png|webp)$/i, '').trim().toLowerCase();
    return filename === searchId;
  });
  return matchKey ? assetFiles[matchKey].default : null;
}

function ProjectImage({ id, altText, className = "", fitMode = "object-cover", withLoader = false }) {
  const src = getAssetUrl(id);
  const [isLoaded, setIsLoaded] = useState(false);

  if (!src) {
    return (
      <div className={`bg-neutral-100/70 flex flex-col items-center justify-center text-center p-8 w-full h-full min-h-[180px] border border-neutral-200 ${className}`}>
        <ImageIcon className="w-6 h-6 text-neutral-300 mb-2 stroke-1" />
        <span className="font-mono text-[11px] text-neutral-400 font-semibold uppercase tracking-wider">
          {id ? `Fig. ${id}` : "Visual Study"}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {withLoader && !isLoaded && (
        <div className="absolute inset-0 bg-neutral-200/40 animate-pulse flex items-center justify-center">
          <div className="w-5 h-5 rounded-full border-2 border-neutral-300 border-t-neutral-800 animate-spin" />
        </div>
      )}
      <img 
        src={src} 
        alt={altText} 
        decoding="async" 
        onLoad={() => setIsLoaded(true)}
        className={`${fitMode} w-full h-full transition-all duration-700 ease-out ${
          withLoader ? (isLoaded ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-xs scale-102') : 'opacity-100'
        }`} 
      />
    </div>
  );
}

/* --- JINENDRA PARAKH PORTFOLIO DATA REPOSITORY --- */
const JINENDRA_PROJECTS = [
  /* 01. FUEL POWERBANK */
  {
    slug: "fuel",
    number: "01",
    title: "Fuel",
    subtitle: "Power Bank × Retro-Engineering",
    tagline: "Effortlessly marrying soft, flowing lines with sharp, edged contrasts to create an expressive tech accessory.",
    timeline: "1 Week",
    type: "Individual Concept Project",
    category: "Consumer Tech",
    badge: "RETRO-ENGINEERING / CMF",
    thumbId: "26",
    heroId: "27",
    metaHeader: {
      timeline: "1 Week Sprint",
      client: "Individual Concept Study",
      focus: "Form Semantics, Retro-Engineering, Color & Material Contrast"
    },
    deckBlocks: [
      {
        type: "quote_and_insights",
        tag: "THE PROBLEM & INQUIRY",
        quote: "Power banks often lack aesthetic appeal, clashing with the refined designs of modern smartphones. Most options on the market are clunky, monolithic bricks and disconnected from the user's personal style.",
        quoteAuthor: "Project Problem Statement",
        insights: [
          { label: "Bland Bricks", text: "Monolithic designs lack character and fail to complement flagship devices." },
          { label: "Tactile Reassurance", text: "Power switches need audible, mechanical feedback for confidence." },
          { label: "Conversation Starter", text: "Bold accents and utility straps transform a battery into personal gear." },
          { label: "Magnetic Flow", text: "Seamless alignment with phone backplates for convenient cordless charging." }
        ]
      },
      {
        type: "brand_manifesto",
        tag: "DESIGN INSPIRATION",
        title: "Inspired by Teenage Engineering: Play Everywhere",
        desc: "Drawing inspiration from Teenage Engineering's Swedish philosophy that technology should be fun, honest, and tactile. Fuel rejects boring minimalism in favor of exposed mechanical accents, playful graphic typography, and calibrated contrast.",
        imageId: "61",
        caption: "Inspiration study: technical knurling, mechanical switches, and utilitarian accent blocking",
        aspectClass: "aspect-[4/3] md:aspect-[16/10]",
        fitMode: "object-cover"
      },
      {
        type: "text_top_image_bottom",
        tag: "FORM IDEATION",
        title: "From Rough Blocking to Expressive Silhouette",
        desc: "Iterated dozens of thumbnail concepts investigating morphing glass pockets, angled corner chamfers, and strap lanyard hooks to create a distinct hand silhouette.",
        imageId: "62",
        caption: "Ideation sheets exploring mechanical switches, exposed form ribs, and corner strap geometry",
        aspectClass: "aspect-[16/7]",
        fitMode: "object-contain bg-white"
      },
      {
        type: "thin_horizontal_strip",
        tag: "ANATOMY OF INTERACTION",
        title: "Tactile Power Switch, Numeric Display & Carry Strap",
        desc: "Key touchpoints: 1. Sliding mechanical switch with an audible click. 2. Recessed numeric LED charge indicator (0-100%). 3. Integrated nylon corner strap for agile portability. 4. Flush magnetic alignment coil.",
        imageId: "64",
        caption: "Interaction map detailing tactile feedback switch, magnetic phone mating, and strap hook",
        aspectClass: "aspect-[21/8] md:aspect-[24/8]",
        fitMode: "object-contain bg-white"
      },
      {
        type: "text_top_image_bottom",
        tag: "PRECISION ARCHITECTURE",
        title: "Technical Elevation Dimensions & Profile Draft",
        desc: "Calibrated 8.5mm thinness with 51.8mm magnetic pad positioning to clear modern camera bumps without obstruction.",
        imageId: "65",
        caption: "Orthographic technical drawing: R15 corner blends, 50.8mm internal coil, and strap anchor draft",
        aspectClass: "aspect-[16/9]",
        fitMode: "object-contain bg-white"
      },
      {
        type: "pure_render_spread",
        imageId: "75",
        caption: "A symphony of contrasts: aluminum brilliance accented by vibrant orange details",
        aspectClass: "aspect-[16/9] md:aspect-[21/9]",
        fitMode: "object-cover"
      },
      {
        type: "pure_render_spread",
        imageId: "76",
        caption: "Front, side, and rear orthographic views highlighting graphic placement and magnetic pad",
        aspectClass: "aspect-[16/9]",
        fitMode: "object-cover"
      },
      {
        type: "pure_render_spread",
        imageId: "77",
        caption: "Perspective still showing soft-touch phone interface pad and durable anodized chassis",
        aspectClass: "aspect-[16/9]",
        fitMode: "object-cover"
      }
    ],
    specs: {
      philosophy: "Retro-Engineering & Playful Utility",
      material: "Matte Bead-Blasted Aluminum, High-Density Polycarbonate, Woven Nylon Strap",
      interface: "Audible Click Slide Switch, Hidden Dot-Matrix Numeric LED",
      methodology: "Rapid Sketching, Rhinoceros 3D, KeyShot 3D, Adobe Illustrator"
    }
  },

  /* 02. VANTAGE WEBCAM */
  {
    slug: "vantage",
    number: "02",
    title: "Vantage",
    subtitle: "Adaptive Modular Streaming & Video Ecosystem",
    tagline: "Transforming presentations, teaching, and streaming through unconstrained 360° freedom of movement and dual mounts.",
    timeline: "3 Weeks",
    type: "Individual Project (A&T Video Networks Context)",
    category: "Workplace & Streaming",
    badge: "MODULAR HARDWARE / BEHAVIORAL UX",
    thumbId: "4",
    heroId: "8",
    metaHeader: {
      timeline: "3 Weeks Intensive",
      client: "Hardware Exploration with Industry Context",
      focus: "Workplace Ethnography, 360° Kinematic Freedom, Pogo-Pin Detachability"
    },
    deckBlocks: [
      {
        type: "quote_and_insights",
        tag: "IDENTIFIED USER PAIN POINTS",
        quote: "Fixed camera angles force users to awkwardly move physical documents or contort themselves into the frame. Cable clutter and bulky desk mounts turn work from home into visual chaos.",
        quoteAuthor: "Remote Worker & Educator Interviews",
        insights: [
          { label: "Awkward Angles", text: "Laptops looking up noses reduce viewer engagement and cause discomfort." },
          { label: "Multi-Device Dilemma", text: "Users buy separate cameras for document sharing, conference calls, and streaming." },
          { label: "Physical Clutter", text: "Tangled cables and heavy tripods occupy valuable tabletop space." },
          { label: "Modularity Need", text: "A single camera head should fluidly move between monitor mount and desk arm." }
        ]
      },
      {
        type: "text_top_image_bottom",
        tag: "MARKET CONTEXT",
        title: "The Rapidly Evolving Video Landscape",
        desc: "With the global webcam market expanding rapidly driven by hybrid work, remote learning, and creator streaming, users demand tools that adapt to their environment—not the other way around.",
        imageId: "48",
        caption: "Market research identifying remote work, hybrid collaboration, and creator growth drivers",
        aspectClass: "aspect-[16/9] md:aspect-[21/9]",
        fitMode: "object-contain bg-white"
      },
      {
        type: "text_left_image_right",
        tag: "SYSTEM MAP",
        title: "Brainstorming Solutions Across Pain Points",
        desc: "Mapped out opportunities across four pillars: modularity, fluid camera articulation, decluttered magnetic cables, and seamless software presets.",
        imageId: "32",
        caption: "Pain point solution matrix connecting Lego-inspired building blocks to magnetic mounting",
        aspectClass: "aspect-[4/3]",
        fitMode: "object-contain bg-white"
      },
      {
        type: "thin_horizontal_strip",
        tag: "FORM IDEATION",
        title: "Inspiration Board & Ideation Sketches",
        desc: "Balanced minimal architectural lighting silhouettes with friendly consumer electronics affordances, exploring sliding counterweights and magnetic ball joints.",
        imageId: "34",
        caption: "Ideation sheets exploring sliding rails, articulated arm linkages, and magnetic clip pods",
        aspectClass: "aspect-[16/9] md:aspect-[21/9]",
        fitMode: "object-cover"
      },
      {
        type: "text_top_image_bottom",
        tag: "360° FREEDOM",
        title: "Full Rotational Range & Integrated Desk Lighting",
        desc: "Features 360° pan, vertical arm slide, horizontal extension, and an integrated diffuse fill light activated by a single tap.",
        imageId: "36",
        caption: "Kinematic range diagram showing vertical slide, 360° rotation, and horizontal offset",
        aspectClass: "aspect-[16/9]",
        fitMode: "object-contain bg-neutral-900"
      },
      {
        type: "text_top_image_bottom",
        tag: "ONE CAMERA, ENDLESS POSSIBILITIES",
        title: "From Desktop Stand to Monitor Clip in Seconds",
        desc: "With a quick press, twist, and pull, Vantage detaches from its desk stand via magnetic pogo pins and snaps into an ultra-compact monitor mount with a physical privacy shutter.",
        imageId: "38",
        caption: "Step-by-step modular conversion from desk overhead drafting view to monitor conference mode",
        aspectClass: "aspect-[16/9] md:aspect-[21/9]",
        fitMode: "object-contain bg-white"
      },
      {
        type: "pure_render_spread",
        imageId: "35",
        caption: "Monitor mount configuration with soft-touch scratch-free silicone padding",
        aspectClass: "aspect-[16/9]",
        fitMode: "object-cover"
      },
      {
        type: "pure_render_spread",
        imageId: "37",
        caption: "Physical privacy shutter: slide closed for absolute peace of mind",
        aspectClass: "aspect-[16/9]",
        fitMode: "object-cover"
      },
      {
        type: "pure_render_spread",
        imageId: "41",
        caption: "Vantage in an active creative studio environment supporting hands-on physical sketching reviews",
        aspectClass: "aspect-[16/9]",
        fitMode: "object-cover"
      }
    ],
    specs: {
      philosophy: "Adaptive Flexibility & Behavioral Empathy",
      material: "Satin Anodized Aluminum Upright, Soft-Touch Grippy Polymer, Diffuse Silicone Light",
      interface: "Capacitive Light Key, Mechanical Privacy Slider, Pogo-Pin Magnetic Latch",
      methodology: "Ethnography, Workspace Journey, Rhinoceros 3D, KeyShot 3D, Prototyping"
    }
  },

  /* 03. FRIDAY HEELS */
  {
    slug: "friday",
    number: "03",
    title: "Friday Heels",
    subtitle: "Friday × Louis Vuitton",
    tagline: "Redefining the essence of masculine elegance through a high-heeled boot designed exclusively for men.",
    timeline: "6 Weeks",
    type: "Collaborative Team Project (Strate School of Design)",
    category: "Footwear & Luxury",
    badge: "LUXURY CMF / 3D PRINTED STRUCTURE",
    thumbId: "21",
    heroId: "22",
    metaHeader: {
      timeline: "6 Weeks Studio",
      client: "Luxury Footwear Brand Translation",
      focus: "Historical Reinterpretation, Boa Dial Lacing, 1:1 CNC Prototyping (Credits: Pradyumn, Dhruv, Shounak)"
    },
    deckBlocks: [
      {
        type: "brand_manifesto",
        tag: "THE CONCEPT & STORY",
        title: "Bringing Them Back for Royalty",
        desc: "Historically, high heels were invented for and worn by royal men and kings to assert authority and stature before becoming feminine centuries later. Friday reclaims heels as an unapologetic statement of masculine confidence, blending traditional leather craftsmanship with avant-garde mechanical hardware.",
        imageId: "42",
        caption: "Historical moodboard contrasting French royal attire with contemporary architectural footwear",
        aspectClass: "aspect-[4/3] md:aspect-[16/10]",
        fitMode: "object-cover"
      },
      {
        type: "text_top_image_bottom",
        tag: "BRAND ESSENCE",
        title: "The Spirit of Friday: Liberation & Opulence",
        desc: "Friday marks the dynamic shift from work to celebratory freedom. We translated this energy through bold faceted soles, lustrous full-grain leather, and polished chrome hardware accents.",
        imageId: "43",
        caption: "Brand matrix pairing Swiss horology watch detailing with luxury fashion silhouettes",
        aspectClass: "aspect-[16/8]",
        fitMode: "object-contain bg-white"
      },
      {
        type: "thin_horizontal_strip",
        tag: "FORM ITERATION",
        title: "Authoritative, Dynamic & Chunky Soles",
        desc: "Explored silhouettes across three aesthetic lenses: Sleek Minimal, Architectural Dynamic, and Chunky Authoritative. Selected an angled heel with an integrated 3D printed protective shield.",
        imageId: "44",
        caption: "Ideation sketches exploring BOA dial lacing, collar cuts, and decoupled sole geometry",
        aspectClass: "aspect-[21/8] md:aspect-[24/8]",
        fitMode: "object-contain bg-white"
      },
      {
        type: "text_top_image_bottom",
        tag: "THE WEARABLE RITUAL",
        title: "Pop-Out Monogram Dial Lacing Mechanism",
        desc: "1. Gently press the Louis Vuitton monogram medallion. 2. The dial pops out mechanically. 3. Turn precision dial to loosen cable lace tension. 4. Step in, press dial flush, and rotate to micro-adjust snugness.",
        imageId: "45",
        caption: "Step-into-the-story: the mechanical dial ritual transforming donning shoes into a ceremonial event",
        aspectClass: "aspect-[16/9]",
        fitMode: "object-cover"
      },
      {
        type: "thin_horizontal_strip",
        tag: "PHYSICAL PROTOTYPE",
        title: "1:1 Scale Prototyping: UK 11 Build",
        desc: "Crafted physical prototypes using CNC high-density tooling foam, vacuum forming, and 3D printing in the Strate workshop to evaluate balance, heel pitch, and walk comfort.",
        imageId: "46",
        caption: "Workshop photos: 3D printing heel shields, CNC milling foam uppers, and hand assembling the UK 11 shoe",
        aspectClass: "aspect-[21/8] md:aspect-[24/8]",
        fitMode: "object-cover"
      },
      {
        type: "pure_render_spread",
        imageId: "50",
        caption: "Final studio render: high block heel and architectural 3D shield elevating masculine poise",
        aspectClass: "aspect-[16/9] md:aspect-[21/9]",
        fitMode: "object-cover"
      },
      {
        type: "pure_render_spread",
        imageId: "51",
        caption: "Monogram cable lacing dial detail crafted with polished chrome and matte contrast",
        aspectClass: "aspect-[16/9]",
        fitMode: "object-cover"
      },
      {
        type: "pure_render_spread",
        imageId: "52",
        caption: "Sole arch branding: Louis Vuitton × Friday collaboration mark debossed into matte rubber tread",
        aspectClass: "aspect-[16/9]",
        fitMode: "object-cover"
      }
    ],
    specs: {
      philosophy: "Progressive Luxury & Gender-Fluid Poise",
      material: "Full-Grain Italian Calfskin, 3D Printed Polyamide Heel Shield, Chrome Hardware",
      interface: "Concealed Pop-Out Mechanical Cable Dial Lacing",
      methodology: "Historical Ethnography, 1:1 CNC Workshop Prototyping, Rhino 3D, KeyShot 3D"
    }
  },

  /* 04. MISCELLANEOUS LABS */
  {
    slug: "miscellaneous",
    number: "04",
    title: "Miscellaneous Labs",
    subtitle: "Sketches, Detours & Generative Experiments",
    tagline: "A collection of sketches, sneaker deconstructions, Vizcom AI trials, and tangible workshop models.",
    timeline: "Ongoing",
    type: "Personal Explorations",
    category: "Visual Lab",
    badge: "FORM EXPERIMENTS / GENERATIVE",
    thumbId: "3",
    heroId: "7",
    metaHeader: {
      timeline: "Ongoing Creative Practice",
      client: "Self-Initiated Studies",
      focus: "Form Detours, Sneaker Teardowns, Vizcom AI Prototyping, Glass Optics"
    },
    deckBlocks: [
      {
        type: "text_top_image_bottom",
        tag: "SCULPTURAL OPTICS",
        title: "Dual-Chamber Hourglass Study",
        desc: "Explored optical glass refraction and metallic cage geometry to create a kinetic meditation artifact for contemplative desks.",
        imageId: "11",
        caption: "Blender Cycles caustics exploring hand-blown spherical glass vessels suspended in wire cages",
        aspectClass: "aspect-[16/9]",
        fitMode: "object-cover"
      },
      {
        type: "text_top_image_bottom",
        tag: "ANATOMY OF FOOTWEAR",
        title: "Sneaker Deconstruction & Stitching Analysis",
        desc: "Detailed technical hand sketches deconstructing the Nike Air Force 1: heel counters, single vs. double stitches, toe spring ergonomics, and PU leather layering.",
        imageId: "13",
        caption: "Exploded footwear anatomy breaking down foxing, toe counter stiffness, and outsole bonding",
        aspectClass: "aspect-[16/10]",
        fitMode: "object-contain bg-white"
      },
      {
        type: "thin_horizontal_strip",
        tag: "GENERATIVE AI EXPEDITION",
        title: "Vizcom Spatial AI Chronograph Trials",
        desc: "Tested AI sketch rendering engines to translate hand-drawn analog watch chronographs into futuristic cosmic and cyber-architecture environments.",
        imageId: "15",
        caption: "Vizcom trials: prompting textural materiality and dramatic rim lighting from raw ballpoint sketches",
        aspectClass: "aspect-[16/9] md:aspect-[21/9]",
        fitMode: "object-contain bg-white"
      },
      {
        type: "thin_horizontal_strip",
        tag: "WORKSHOP ARTIFACTS",
        title: "Physical Foam, Clay & 3D Printed Rigs",
        desc: "A behind-the-scenes archive of foam sanding, high heel shoe lasts, webcam arm prototypes, and tactile radio knobs.",
        imageId: "16",
        caption: "Workshop documentation showing hands-on model making across foam, wood, and resin",
        aspectClass: "aspect-[16/9] md:aspect-[21/9]",
        fitMode: "object-cover"
      }
    ],
    specs: {
      philosophy: "Unconstrained Curiosity & Rapid Learning",
      material: "High-Density Foam, Hand-Blown Glass, Procreate Digital Inking",
      interface: "Analog Sketching, Vizcom AI, KeyShot 3D, Physical Hand Craft",
      methodology: "Teardowns, Generative Rendering, Material Testing"
    }
  }
];

/* --- NAVIGATION (IDEO EDITORIAL NAVBAR) --- */
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#faf9f6]/90 backdrop-blur-md border-b border-neutral-200/60">
      <div className="max-w-[1360px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        <Link 
          to="/" 
          onClick={closeMenu}
          className="text-lg md:text-xl font-editorial tracking-tight text-neutral-900 hover:opacity-70 transition-opacity"
        >
          <span className="font-semibold">Jinendra Parakh</span>
          <span className="italic font-light text-neutral-500 ml-2">/ Product Design</span>
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-8 text-[12px] font-medium tracking-[0.14em] uppercase text-neutral-500">
            <Link to="/" className="hover:text-neutral-900 transition-colors">Projects</Link>
            <Link to="/commercial" className="hover:text-neutral-900 transition-colors">Client Work</Link>
            <Link to="/playground" className="hover:text-neutral-900 transition-colors">Visual Lab</Link>
            <Link to="/about" className="hover:text-neutral-900 transition-colors">About</Link>
          </div>

          <a 
            href="mailto:parakhjinendra@gmail.com" 
            className="text-[12px] font-medium tracking-[0.08em] uppercase bg-neutral-900 text-white px-5 py-2.5 rounded-full hover:bg-neutral-800 active:scale-95 transition-all"
          >
            Let's Connect
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="p-2 text-neutral-800 hover:text-black focus:outline-none"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-[#faf9f6] border-b border-neutral-200 px-6 pt-6 pb-8 shadow-lg">
          <div className="flex flex-col space-y-4 text-xs tracking-widest uppercase text-neutral-700">
            <Link to="/" onClick={closeMenu} className="py-2 border-b border-neutral-100 hover:text-black">01. Selected Projects</Link>
            <Link to="/commercial" onClick={closeMenu} className="py-2 border-b border-neutral-100 hover:text-black">02. Client & Industry Work</Link>
            <Link to="/playground" onClick={closeMenu} className="py-2 border-b border-neutral-100 hover:text-black">03. Visual Lab & Sketches</Link>
            <Link to="/about" onClick={closeMenu} className="py-2 border-b border-neutral-100 hover:text-black">04. About & Experience</Link>
            <div className="pt-3">
              <a 
                href="mailto:parakhjinendra@gmail.com" 
                onClick={closeMenu}
                className="w-full text-center block text-xs uppercase font-medium bg-neutral-900 text-white px-5 py-3 rounded-full"
              >
                Let's Connect
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

/* --- FOOTER --- */
function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-300 py-24 px-6 md:px-12 border-t border-neutral-900">
      <div className="max-w-[1360px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
          <div className="max-w-lg">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400 block mb-4">
              // BUILDING DESIRES
            </span>
            <h3 className="text-3xl md:text-4xl font-editorial text-white mb-6 leading-tight">
              Every object has a story to tell and an experience to create.
            </h3>
            <p className="text-neutral-400 text-base leading-relaxed font-light">
              Product Designer blending functionality with aesthetics to build meaningful solutions that not only solve everyday human problems but also inspire aspirations.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-12 md:gap-20">
            <div>
              <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-[0.2em] mb-6">Contact</p>
              <div className="flex flex-col gap-3 text-neutral-200 text-sm">
                <a href="mailto:parakhjinendra@gmail.com" className="hover:text-white transition-colors">parakhjinendra@gmail.com</a>
                <a href="tel:+919850889899" className="hover:text-white transition-colors">+91 9850889899</a>
                <span className="text-neutral-400">Bangalore / Nashik / Pune</span>
              </div>
            </div>
            <div>
              <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-[0.2em] mb-6">Profiles</p>
              <div className="flex flex-col gap-3 text-neutral-200 text-sm">
                <Link to="/" className="hover:text-white transition-colors">All Projects</Link>
                <Link to="/commercial" className="hover:text-white transition-colors">Client Projects</Link>
                <Link to="/about" className="hover:text-white transition-colors">About Jinendra</Link>
                <a href="https://www.behance.net/gallery/223719061/Design-Portfolio" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Behance Portfolio</a>
                <a href="https://linkedin.com/in/jinendra-parakh" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn Profile</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-12 border-t border-neutral-800 flex flex-col md:flex-row justify-between gap-4 text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} Jinendra Parakh. Product Design Portfolio.</p>
          <div className="flex gap-6 uppercase tracking-widest text-[10px] text-neutral-400">
            <span>Strate School of Design</span>
            <span>IDEO Inspired Layout</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* --- PAGE 1: HOME (IDEO EDITORIAL FEED) --- */
function HomePage() {
  return (
    <div>
      {/* Hero Header */}
      <section className="max-w-[1360px] mx-auto px-6 md:px-12 pt-24 pb-24 border-b border-neutral-200/70">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-3 mb-8">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse"></span>
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-600">
              Product Design // 2025
            </span>
          </div>
          
          <h1 className="text-5xl md:text-[80px] font-editorial font-normal leading-[1.08] tracking-tight text-neutral-900 mb-8">
            Building desires through thoughtful products, <br />
            <span className="italic text-neutral-500">meaningful stories & human experience.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-neutral-600 max-w-3xl leading-relaxed font-light">
            I'm Jinendra, a product designer on a mission to change the way we look at things. I blend deep user empathy, physical prototyping, and bold aesthetics to build solutions that solve genuine problems while elevating everyday living.
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            <a 
              href="#projects" 
              className="text-xs uppercase font-mono tracking-widest bg-neutral-900 text-white px-6 py-3.5 rounded-full hover:bg-neutral-800 transition-colors"
            >
              Explore 04 Selected Inquiries ↓
            </a>
            <Link 
              to="/about" 
              className="text-xs uppercase font-mono tracking-widest border border-neutral-300 text-neutral-700 px-6 py-3.5 rounded-full hover:border-neutral-900 transition-colors"
            >
              About Mindset & Skills
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION: 04 FEATURED CASE INQUIRIES */}
      <section id="projects" className="max-w-[1360px] mx-auto px-6 md:px-12 py-24">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-16 pb-4 border-b border-neutral-200">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 bg-neutral-900 text-white font-mono text-[10px] uppercase tracking-wider rounded">
              INDEX
            </span>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-900">
              Selected Inquiries
            </h2>
          </div>
          <span className="text-xs font-mono text-neutral-500">
            04 Curated Projects
          </span>
        </div>

        <div className="space-y-32">
          {JINENDRA_PROJECTS.map((proj, idx) => (
            <div key={proj.slug} className="group grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className={`lg:col-span-7 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                <Link to={`/project/${proj.slug}`} className="block overflow-hidden rounded-3xl border border-neutral-200 shadow-xs">
                  <div className="w-full aspect-[16/10] bg-neutral-100 overflow-hidden">
                    <ProjectImage 
                      id={proj.thumbId} 
                      altText={proj.title}
                      withLoader={true}
                      className="group-hover:scale-103 transition-transform duration-700 ease-out" 
                    />
                  </div>
                </Link>
              </div>

              <div className={`lg:col-span-5 space-y-6 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="flex items-center gap-3 font-mono text-xs text-neutral-500">
                  <span className="text-sm font-bold text-neutral-900">/{proj.number}</span>
                  <span>—</span>
                  <span className="uppercase tracking-widest">{proj.category}</span>
                  <span>•</span>
                  <span>{proj.timeline}</span>
                </div>

                <h3 className="text-4xl md:text-5xl font-editorial text-neutral-900 leading-tight">
                  <Link to={`/project/${proj.slug}`} className="hover:text-neutral-600 transition-colors">
                    {proj.title}
                  </Link>
                </h3>

                <h4 className="text-lg text-neutral-500 font-editorial italic">
                  {proj.subtitle}
                </h4>

                <p className="text-neutral-600 text-base leading-relaxed font-light">
                  {proj.tagline}
                </p>

                <div className="pt-2">
                  <Link 
                    to={`/project/${proj.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest font-semibold text-neutral-900 border-b border-neutral-900 pb-1 hover:text-neutral-500 hover:border-neutral-500 transition-colors"
                  >
                    Read Inquiry <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: IDEO-STYLE EDITORIAL CALLOUTS */}
      <section className="max-w-[1360px] mx-auto px-6 md:px-12 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link 
            to="/commercial" 
            className="group block bg-white border border-neutral-200 rounded-3xl p-8 hover:border-neutral-900 transition-all duration-300 shadow-2xs"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <Workflow className="w-4 h-4 text-neutral-900" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-900">Experience</span>
            </div>
            <h4 className="text-2xl font-editorial text-neutral-900 mb-2">Ticket Design & A&T</h4>
            <p className="text-neutral-600 text-xs leading-relaxed mb-6 font-light">
              Collaborated on water dispensers, global medical DVT keypads, air fresheners, and PTZ conference camera ecosystems.
            </p>
            <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-neutral-900">
              Read Client Projects <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          <Link 
            to="/playground" 
            className="group block bg-white border border-neutral-200 rounded-3xl p-8 hover:border-neutral-900 transition-all duration-300 shadow-2xs"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-neutral-900" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-900">Creative Detours</span>
            </div>
            <h4 className="text-2xl font-editorial text-neutral-900 mb-2">Visual Lab & Sketches</h4>
            <p className="text-neutral-600 text-xs leading-relaxed mb-6 font-light">
              A collection of raw hand sketching, sneaker teardown studies, Vizcom generative AI watch trials, and physical workshop builds.
            </p>
            <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-neutral-900">
              Explore Visual Lab <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          <Link 
            to="/about" 
            className="group block bg-neutral-950 border border-neutral-900 rounded-3xl p-8 hover:border-neutral-700 transition-all duration-300 shadow-2xs"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">Design Biography</span>
            </div>
            <h4 className="text-2xl font-editorial text-white mb-2">About Jinendra</h4>
            <p className="text-neutral-400 text-xs leading-relaxed mb-6 font-light">
              Strate School of Design alumnus. Passionate about human psychology, interior architecture, and market strategy.
            </p>
            <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-white">
              Read Profile & Resume <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}

/* --- PAGE 2: CASE STUDY DETAIL VIEW --- */
function ProjectDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const project = JINENDRA_PROJECTS.find(p => p.slug === slug);

  if (!project) {
    return (
      <div className="max-w-[1360px] mx-auto px-6 py-32 text-center">
        <h2 className="text-3xl font-editorial text-neutral-900 mb-4">Inquiry Not Found</h2>
        <Link to="/" className="text-xs uppercase font-mono tracking-widest underline text-neutral-600 hover:text-neutral-900">
          Return to Overview
        </Link>
      </div>
    );
  }

  return (
    <article className="pb-32">
      <header className="max-w-[1360px] mx-auto px-6 md:px-12 pt-20 pb-16">
        <div className="max-w-4xl">
          <button 
            onClick={() => navigate(-1)} 
            className="group inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] text-neutral-400 hover:text-neutral-900 mb-12 transition-colors uppercase cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Inquiries
          </button>
          
          <div className="mb-6 flex flex-wrap gap-3 font-mono text-xs">
            <span className="px-3 py-1 bg-neutral-200/80 text-neutral-800 text-[10px] font-bold uppercase tracking-widest rounded-full">
              /{project.number} {project.category}
            </span>
            <span className="px-3 py-1 bg-neutral-200/80 text-neutral-800 text-[10px] font-bold uppercase tracking-widest rounded-full">
              {project.timeline} // {project.type}
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-editorial font-normal tracking-tight text-neutral-900 mb-3 leading-tight">
            {project.title}
          </h1>
          <p className="text-xl md:text-2xl text-neutral-500 font-editorial italic mb-6">
            {project.subtitle}
          </p>
          <p className="text-xl text-neutral-600 leading-relaxed max-w-3xl font-light">
            {project.tagline}
          </p>

          {project.metaHeader && (
            <div className="mt-10 pt-6 border-t border-neutral-200 grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs text-neutral-600">
              <div><span className="text-neutral-400 block text-[10px] font-bold uppercase">Timeline:</span> {project.metaHeader.timeline}</div>
              <div><span className="text-neutral-400 block text-[10px] font-bold uppercase">Context:</span> {project.metaHeader.client}</div>
              <div><span className="text-neutral-400 block text-[10px] font-bold uppercase">Focus:</span> {project.metaHeader.focus}</div>
            </div>
          )}
        </div>
      </header>

      {/* Main Hero Visual */}
      <div className="max-w-[1360px] mx-auto px-6 md:px-12 mb-28">
        <div className="w-full aspect-[21/9] bg-neutral-100 rounded-3xl overflow-hidden border border-neutral-200 shadow-sm">
          <ProjectImage 
            id={project.heroId} 
            altText={`${project.title} Hero Banner`} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Narrative Deck Engine */}
      <div className="max-w-[1360px] mx-auto px-6 md:px-12 space-y-28">
        {project.deckBlocks && project.deckBlocks.map((block, idx) => {
          
          if (block.type === 'quote_and_insights') {
            return (
              <section key={idx} className="border-t border-neutral-200 pt-16">
                <div className="p-8 md:p-14 bg-neutral-100/70 rounded-3xl border border-neutral-200/90 mb-12">
                  <Quote className="w-8 h-8 text-neutral-400 mb-4" />
                  <p className="text-2xl md:text-3xl text-neutral-900 font-editorial italic leading-relaxed mb-4">
                    "{block.quote}"
                  </p>
                  <span className="font-mono text-xs text-neutral-500 block">— {block.quoteAuthor}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {block.insights.map((ins, inIdx) => (
                    <div key={inIdx} className="p-6 bg-white rounded-2xl border border-neutral-200 shadow-xs">
                      <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest block mb-2">0{inIdx + 1} / HUMAN FINDING</span>
                      <h4 className="text-base font-semibold text-neutral-900 mb-2">{ins.label}</h4>
                      <p className="text-neutral-500 text-xs font-light leading-relaxed">{ins.text}</p>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          if (block.type === 'brand_manifesto') {
            return (
              <section key={idx} className="border-t border-neutral-200 pt-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-5 space-y-4">
                    <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 block">// {block.tag}</span>
                    <h3 className="text-3xl md:text-4xl font-editorial text-neutral-900 leading-snug">{block.title}</h3>
                    <p className="text-base text-neutral-600 font-light leading-relaxed">{block.desc}</p>
                  </div>
                  <div className="lg:col-span-7">
                    <div className={`w-full ${block.aspectClass || 'aspect-[16/10]'} bg-neutral-100 rounded-2xl overflow-hidden border border-neutral-200`}>
                      <ProjectImage id={block.imageId} altText={block.caption} fitMode={block.fitMode || "object-cover"} className="w-full h-full" />
                    </div>
                    <span className="font-mono text-[11px] text-neutral-400 tracking-wider block mt-2">fig.{idx + 1} — {block.caption}</span>
                  </div>
                </div>
              </section>
            );
          }

          if (block.type === 'thin_horizontal_strip') {
            return (
              <section key={idx} className="border-t border-neutral-200 pt-16">
                <div className="max-w-3xl mb-8">
                  <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 block mb-2">// {block.tag}</span>
                  <h3 className="text-3xl font-editorial text-neutral-900 mb-3">{block.title}</h3>
                  {block.desc && <p className="text-base text-neutral-600 font-light leading-relaxed">{block.desc}</p>}
                </div>
                <div className={`w-full ${block.aspectClass || 'aspect-[21/8]'} rounded-2xl overflow-hidden border border-neutral-200 bg-white p-2 shadow-xs`}>
                  <ProjectImage 
                    id={block.imageId} 
                    altText={block.caption} 
                    fitMode={block.fitMode || "object-contain"} 
                    className="w-full h-full"
                  />
                </div>
                <span className="font-mono text-[11px] text-neutral-400 tracking-wider block mt-2.5">fig.{idx + 1} — {block.caption}</span>
              </section>
            );
          }

          if (block.type === 'text_top_image_bottom') {
            return (
              <section key={idx} className="border-t border-neutral-200 pt-16">
                <div className="max-w-3xl mb-8">
                  <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 block mb-2">// {block.tag}</span>
                  <h3 className="text-3xl font-editorial text-neutral-900 mb-3">{block.title}</h3>
                  <p className="text-base text-neutral-600 font-light leading-relaxed">{block.desc}</p>
                </div>
                <div className={`w-full ${block.aspectClass || 'aspect-[16/10]'} bg-neutral-100 rounded-2xl overflow-hidden border border-neutral-200`}>
                  <ProjectImage id={block.imageId} altText={block.caption} fitMode={block.fitMode || "object-cover"} className="w-full h-full" />
                </div>
                <span className="font-mono text-[11px] text-neutral-400 tracking-wider block mt-2.5">fig.{idx + 1} — {block.caption}</span>
              </section>
            );
          }

          if (block.type === 'text_left_image_right') {
            return (
              <section key={idx} className="border-t border-neutral-200 pt-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-5 space-y-4">
                    <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 block">// {block.tag}</span>
                    <h3 className="text-3xl font-editorial text-neutral-900 leading-snug">{block.title}</h3>
                    <p className="text-base text-neutral-600 font-light leading-relaxed">{block.desc}</p>
                  </div>
                  <div className="lg:col-span-7">
                    <div className={`w-full ${block.aspectClass || 'aspect-[16/10]'} bg-neutral-100 rounded-2xl overflow-hidden border border-neutral-200`}>
                      <ProjectImage id={block.imageId} altText={block.caption} fitMode={block.fitMode || "object-cover"} className="w-full h-full" />
                    </div>
                    <span className="font-mono text-[11px] text-neutral-400 tracking-wider block mt-2">fig.{idx + 1} — {block.caption}</span>
                  </div>
                </div>
              </section>
            );
          }

          if (block.type === 'pure_render_spread') {
            return (
              <section key={idx} className="border-t border-neutral-200 pt-12">
                <div className={`w-full ${block.aspectClass || 'aspect-[16/9] md:aspect-[21/9]'} bg-neutral-100 rounded-3xl overflow-hidden border border-neutral-200 shadow-sm`}>
                  <ProjectImage id={block.imageId} altText={block.caption} fitMode={block.fitMode || "object-cover"} className="w-full h-full" />
                </div>
                {block.caption && (
                  <span className="font-mono text-[11px] text-neutral-400 tracking-wider block mt-3 text-center">
                    {block.caption}
                  </span>
                )}
              </section>
            );
          }

          return null;
        })}

        {/* Project Meta Drawer */}
        {project.specs && (
          <div className="p-8 md:p-12 bg-neutral-950 text-white rounded-3xl border border-neutral-800 font-mono text-xs">
            <div className="text-neutral-400 font-semibold mb-6 flex items-center gap-2">
              <Compass className="w-4 h-4 text-orange-400" />
              <span>PROJECT SPECIFICATION & DISCIPLINE SUMMARY</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <span className="text-neutral-500 block mb-1">DESIGN PHILOSOPHY:</span>
                <span className="text-neutral-200 font-medium leading-relaxed block">{project.specs.philosophy}</span>
              </div>
              <div>
                <span className="text-neutral-500 block mb-1">MATERIAL & CMF:</span>
                <span className="text-neutral-200 font-medium leading-relaxed block">{project.specs.material}</span>
              </div>
              <div>
                <span className="text-neutral-500 block mb-1">TOUCHPOINTS & UX:</span>
                <span className="text-neutral-200 font-medium leading-relaxed block">{project.specs.interface}</span>
              </div>
              <div>
                <span className="text-neutral-500 block mb-1">DESIGN METHODOLOGY:</span>
                <span className="text-neutral-200 font-medium leading-relaxed block">{project.specs.methodology}</span>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Nav */}
        <div className="flex justify-between items-center pt-8 border-t border-neutral-200 font-mono text-xs">
          <Link to="/" className="text-neutral-500 hover:text-neutral-900 underline">
            ← Return to Selected Inquiries
          </Link>
          <a 
            href="https://www.behance.net/gallery/223719061/Design-Portfolio" 
            target="_blank" 
            rel="noreferrer" 
            className="flex items-center gap-1.5 text-neutral-900 font-bold hover:underline"
          >
            Full Case Boards on Behance <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </article>
  );
}

/* --- PAGE 3: CLIENT & STRATEGIC DOSSIER --- */
function CommercialPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const clientPrograms = [
    {
      category: "Global Appliance & Medical Systems",
      badge: "Ticket Design, Pune (Internship)",
      desc: "Contributed across the product life-cycle on global projects under senior mentorship. 2 designs selected by clients for mass production.",
      items: [
        {
          title: "Medical DVT Therapy Keypad & Device Enclosure",
          tag: "Healthcare Usability & Tactile Reassurance",
          desc: "Researched deep vein thrombosis (DVT) caregiver interactions in hospital settings. Developed intuitive, wipeable membrane keypads with clear tactile confirmation for clinical staff.",
          imageId: "29",
          specs: ["Hospital Clinical Sanitization", "Ergonomic Keypad Spacing", "Client Selected Design"]
        },
        {
          title: "Next-Generation Domestic Water Dispenser Architecture",
          tag: "Countertop Fluid Usability & CMF",
          desc: "Designed modern purification water dispensers balancing compact residential footprints with intuitive vessel reach envelopes and spill-free ergonomics.",
          imageId: "30",
          specs: ["Multi-Vessel Clearance", "Rapid Physical Prototyping", "ADI Presentation Contribution"]
        }
      ]
    },
    {
      category: "Enterprise Camera & Hardware Ecosystems",
      badge: "A&T Video Networks (Industry Grade-O Project)",
      desc: "Redesigned professional web and PTZ cameras within strict electronic packaging constraints. Earned an 'O' Grade for holistic research and brand language.",
      items: [
        {
          title: "Enterprise PTZ & Conference Camera Redesign",
          tag: "Thermal Dissipation & Cohesive Brand Language",
          desc: "Conducted user research across conference setups, redesigned the physical camera enclosure to optimize internal airflow, and developed a cohesive brand language and identity for the product line.",
          imageId: "31",
          specs: ["PTZ Mechanism Clearance", "Cohesive Brand Language", "User & Market Placement"]
        }
      ]
    },
    {
      category: "Digital Growth & Consumer Research",
      badge: "Spandigit Social, Nashik",
      desc: "Conducted demographic and brand research to understand user behavior, running campaigns that drove festive footfalls for regional lifestyle centers.",
      items: [
        {
          title: "User Behavior & Audience Targeting Studies",
          tag: "Digital Strategy Influencing Physical Design",
          desc: "Analyzed audience engagement patterns to optimize campaigns, enhancing my ability as a product designer to align consumer psychology and marketing with physical product desires.",
          imageId: "48",
          specs: ["Demographic Insights", "Brand Psychology", "Consumer Touchpoint Mapping"]
        }
      ]
    }
  ];

  return (
    <div className="max-w-[1360px] mx-auto px-6 md:px-12 pt-20 pb-32">
      <Link to="/" className="group inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] text-neutral-400 hover:text-neutral-900 mb-12 transition-colors uppercase">
        <ArrowLeft className="w-3.5 h-3.5" /> Return to Home
      </Link>
      
      <div className="max-w-4xl mb-20">
        <div className="inline-flex items-center gap-2 mb-6 text-[10px] font-bold text-white bg-neutral-900 px-3 py-1 rounded-full uppercase tracking-widest">
          <Workflow className="w-3 h-3 text-orange-400" /> Industry Experience & Client Studies
        </div>
        <h1 className="text-5xl md:text-7xl font-editorial font-normal tracking-tight text-neutral-900 mb-8 leading-tight">
          Client Projects & <br /> Industry Collaborations
        </h1>
        <p className="text-2xl text-neutral-600 leading-relaxed font-light">
          A showcase of industry projects developed with Ticket Design, A&T Video Networks, and freelance architectural clients—spanning medical devices, workplace video equipment, and digital user research.
        </p>
      </div>

      <div className="space-y-24">
        {clientPrograms.map((prog, pIdx) => (
          <div key={pIdx} className="border-t border-neutral-200 pt-12">
            <div className="mb-8">
              <span className="text-xs font-mono text-orange-600 font-bold uppercase tracking-wider">{prog.badge}</span>
              <h2 className="text-3xl font-editorial text-neutral-900 mt-1 mb-2">{prog.category}</h2>
              <p className="text-neutral-500 text-sm font-light max-w-2xl">{prog.desc}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {prog.items.map((item, itemIdx) => (
                <div 
                  key={itemIdx} 
                  className="bg-white rounded-3xl border border-neutral-200 overflow-hidden flex flex-col justify-between hover:border-neutral-400 transition-colors duration-300 shadow-2xs"
                >
                  <div className="w-full h-56 bg-neutral-100 relative overflow-hidden border-b border-neutral-200">
                    <ProjectImage 
                      id={item.imageId} 
                      altText={`${item.title} Study`} 
                      className="w-full h-full object-cover filter blur-[4px] scale-105 opacity-80"
                    />
                    <div className="absolute inset-0 bg-neutral-950/20 backdrop-blur-[2px] flex flex-col items-center justify-center text-center p-4">
                      <div className="bg-black/80 border border-neutral-700 text-white px-3.5 py-1.5 rounded-full flex items-center gap-2 font-mono text-[10px] tracking-wider uppercase mb-1">
                        <Lock className="w-3 h-3 text-orange-400" />
                        <span>Client Case Study</span>
                      </div>
                      <span className="font-mono text-[9px] text-neutral-200">
                        Sanitized Portfolio Documentation
                      </span>
                    </div>
                  </div>

                  <div className="p-8 md:p-10 flex-grow flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-2">{item.tag}</span>
                      <h3 className="text-2xl font-editorial text-neutral-900 mb-3">{item.title}</h3>
                      <p className="text-neutral-600 text-sm leading-relaxed mb-6 font-light">{item.desc}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-neutral-100">
                      {item.specs.map((s, i) => (
                        <span key={i} className="text-[10px] font-bold uppercase tracking-wider bg-neutral-100 px-2.5 py-1 rounded text-neutral-700">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-28 p-12 bg-neutral-950 rounded-3xl text-center flex flex-col items-center text-white">
        <h3 className="text-3xl font-editorial mb-4">Interested in a walkthrough?</h3>
        <p className="text-neutral-400 text-base mb-8 max-w-xl font-light">
          Available for portfolio presentations and discussions on product design opportunities.
        </p>
        <a 
          href="mailto:parakhjinendra@gmail.com?subject=Portfolio%20Inquiry%20-%20Jinendra%20Parakh" 
          className="bg-white text-neutral-950 px-8 py-3.5 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-neutral-100 active:scale-95 transition-all duration-200"
        >
          Contact Jinendra Parakh
        </a>
      </div>
    </div>
  );
}

/* --- PAGE 4: PLAYGROUND / VISUAL LAB --- */
function PlaygroundPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const visualLabRenders = [
    { id: "59", alt: "Physical Clay and Foam Prototyping Last" },
    { id: "60", alt: "Hourglass Glass Caustic Reflection" },
    { id: "63", alt: "Spatial Watch Chronograph Sketch" },
    { id: "66", alt: "High-Gloss CMF Study" },
    { id: "69", alt: "Kinematic Detent Joint Exploration" },
    { id: "70", alt: "Exploded Mechanism Packaging Study" },
    { id: "71", alt: "Continuous Additive Toolpath Iteration" },
    { id: "72", alt: "Sneaker Outsole Layering Diagram" },
    { id: "73", alt: "Subdivision Hard Surface CAD Study" },
    { id: "79", alt: "Tactile Texture CMF Palette" },
    { id: "80", alt: "Curved Parting Section Exploration" },
    { id: "81", alt: "Tactile Button Affordance & Travel Clearance" },
    { id: "82", alt: "Thermal Fin Simulation" },
    { id: "83", alt: "Dual-Durometer Texture Sample" },
    { id: "84", alt: "Minimalist Ambient Lighting Render" },
    { id: "85", alt: "Workshop Prototyping Assembly Still" },
    { id: "86", alt: "Ergonomic Handheld Exploration" },
    { id: "87", alt: "Sub-D Surface Continuity Study" },
    { id: "88", alt: "Algorithmic Generative Texture" },
    { id: "89", alt: "Anodized Aluminum CMF Specularity" },
    { id: "90", alt: "Snap-Fit Latch Deflection CAD" },
    { id: "91", alt: "Exploded Chassis Fastener Architecture" },
    { id: "92", alt: "Spiral Vase Additive Toolpath" },
    { id: "93", alt: "Progressive Sheet Nesting" },
    { id: "94", alt: "Cycles Physical Lighting Study" },
    { id: "95", alt: "Analog Dial Mechanical Detent Study" },
    { id: "96", alt: "Thermal Convection Heat Fin Analysis" },
    { id: "97", alt: "Dual-Tone Co-Molding Interface" }
  ];

  return (
    <div className="max-w-[1360px] mx-auto px-6 md:px-12 pt-20 pb-32">
      <Link to="/" className="group inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] text-neutral-400 hover:text-neutral-900 mb-12 transition-colors uppercase">
        <ArrowLeft className="w-3.5 h-3.5" /> Return to Home
      </Link>
      
      <div className="max-w-3xl mb-14">
        <div className="inline-flex items-center gap-2 mb-6 text-[10px] font-bold text-neutral-900 bg-neutral-200/70 border border-neutral-300 px-3 py-1 rounded-full uppercase tracking-widest">
          <Sparkles className="w-3 h-3 text-orange-500" /> Visual Lab & Sketches
        </div>
        <h1 className="text-5xl md:text-7xl font-editorial font-normal tracking-tight text-neutral-900 mb-6 leading-tight">
          Visual Artifacts, Sketches <br />& Creative Detours
        </h1>
        <p className="text-xl text-neutral-600 leading-relaxed font-light">
          A living archive of standalone explorations: Vizcom AI generative watch experiments, sneaker construction teardowns, kinetic hourglasses, and workshop prototyping.
        </p>
      </div>

      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {visualLabRenders.map((item, idx) => (
          <div 
            key={idx} 
            className="break-inside-avoid rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-100 shadow-xs hover:border-neutral-400 transition-all duration-300 group min-h-[140px]"
          >
            <ProjectImage 
              id={item.id} 
              altText={item.alt} 
              fitMode="object-cover"
              withLoader={true}
              className="w-full h-auto transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* --- PAGE 5: ABOUT (RESUME & MINDSET) --- */
function AboutPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div>
      <header className="max-w-[1360px] mx-auto px-6 md:px-12 pt-16 md:pt-20 pb-20">
        <Link to="/" className="group inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] text-neutral-400 hover:text-neutral-900 mb-12 transition-colors uppercase">
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Home
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2.5 mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
              <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                Product Designer // Strate School of Design
              </p>
            </div>
            <h1 className="text-5xl md:text-7xl font-editorial font-normal tracking-tight text-neutral-900 mb-8 leading-[1.08]">
              Building Desires. <br />
              <span className="italic text-neutral-500">Creating Meaningful Stories.</span>
            </h1>
            <p className="text-xl md:text-2xl text-neutral-600 leading-relaxed font-light">
              I believe every object has a story to tell and an experience to create. My goal is to blend functionality with aesthetics, creating meaningful solutions that not only solve everyday problems but also build aspirations.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="w-full aspect-[4/3] lg:aspect-[16/13] rounded-3xl overflow-hidden shadow-sm border border-neutral-200 bg-neutral-100">
              <ProjectImage 
                id="1"
                altText="Jinendra Parakh Product Design Studio" 
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Experience, Education & Skills */}
      <section className="bg-neutral-950 py-32 text-white">
        <div className="max-w-[1360px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            <div className="lg:col-span-5 space-y-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-editorial text-white mb-6">Design Philosophy</h2>
                <p className="text-neutral-400 text-lg font-light leading-relaxed mb-6">
                  Good design balances human empathy, business logic, and tactile form. With a background spanning product design, interior execution, and digital marketing, I approach hardware from both the user's emotions and the market's realities.
                </p>
                <div className="flex flex-wrap gap-2.5">
                  <span className="px-3.5 py-1.5 border border-neutral-700 bg-neutral-800/60 rounded-full text-xs text-white font-mono">B.Sc. Product Design</span>
                  <span className="px-3.5 py-1.5 border border-neutral-700 rounded-full text-xs text-neutral-300 font-mono">User Research</span>
                  <span className="px-3.5 py-1.5 border border-neutral-700 rounded-full text-xs text-neutral-300 font-mono">Rapid Prototyping</span>
                  <span className="px-3.5 py-1.5 border border-neutral-700 rounded-full text-xs text-neutral-300 font-mono">3D Modeling</span>
                  <span className="px-3.5 py-1.5 border border-neutral-700 rounded-full text-xs text-neutral-300 font-mono">Business Strategy</span>
                  <span className="px-3.5 py-1.5 border border-neutral-700 rounded-full text-xs text-neutral-300 font-mono">Emotional Intelligence</span>
                </div>
              </div>

              {/* Education Box */}
              <div className="p-8 bg-neutral-900/60 rounded-3xl border border-neutral-800 space-y-6">
                <div className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest">
                  <Lightbulb className="w-4 h-4 text-orange-400" /> Education
                </div>
                <div className="space-y-4 text-sm">
                  <div>
                    <h5 className="font-editorial text-lg text-white">B.Sc. in Product Design</h5>
                    <p className="text-neutral-400 text-xs">Strate School of Design, Bangalore</p>
                  </div>
                  <div className="border-t border-neutral-800 pt-3">
                    <h5 className="font-editorial text-lg text-white">12th Science (PCM)</h5>
                    <p className="text-neutral-400 text-xs">Matoshri Junior College, Nashik</p>
                  </div>
                  <div className="border-t border-neutral-800 pt-3">
                    <h5 className="font-editorial text-lg text-white">10th ICSE</h5>
                    <p className="text-neutral-400 text-xs">Anubhuti Residential School, Jalgaon</p>
                  </div>
                </div>
              </div>

              {/* Skills Box */}
              <div className="p-8 bg-neutral-900/60 rounded-3xl border border-neutral-800 space-y-6">
                <div className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest">
                  <Compass className="w-4 h-4 text-orange-400" /> Technical Skills & Tools
                </div>
                <div className="space-y-4 text-xs">
                  <div>
                    <span className="text-neutral-400 block mb-1">3D CAD & Visualization</span>
                    <p className="text-neutral-200 font-medium leading-relaxed">Rhinoceros 3D, Fusion 360, KeyShot 3D, Vizcom</p>
                  </div>
                  <div className="border-t border-neutral-800 pt-3">
                    <span className="text-neutral-400 block mb-1">2D Creative & Ideation</span>
                    <p className="text-neutral-200 font-medium leading-relaxed">Photoshop, Illustrator, Procreate, Rapid Hand Sketching</p>
                  </div>
                  <div className="border-t border-neutral-800 pt-3">
                    <span className="text-neutral-400 block mb-1">Making & Validation</span>
                    <p className="text-neutral-200 font-medium leading-relaxed">Rapid Prototyping, 3D Printing, Foam Sculpting, User Testing</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Experience List */}
            <div className="lg:col-span-7">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-8">Professional Experience</h3>
              <div className="space-y-8">
                {[
                  {
                    role: "Freelance Interior Design Project",
                    company: "Nashik, Maharashtra",
                    period: "Sept 2024 — March 2025",
                    duration: "7 Months",
                    desc: "Assisted architect in executing interior designs for a private bungalow. Managed hands-on space planning, vendor coordination, material/color selection, and resolved on-site conflicts between drawings and builds."
                  },
                  {
                    role: "Industrial Design Intern",
                    company: "Ticket Design, Pune (Grade A)",
                    period: "March 2024 — July 2024",
                    duration: "5 Months",
                    desc: "Collaborated with senior designers and engineers on global projects including water dispensers, air fresheners, and medical DVT therapy keypads. 2 designs selected by clients for production."
                  },
                  {
                    role: "Industry Project: Web & PTZ Camera",
                    company: "A&T Video Networks (Grade O)",
                    period: "Academic Project",
                    duration: "4 Months",
                    desc: "Redesigned a PTZ camera within internal engineering constraints. Conducted comprehensive user research, market analysis, and created a cohesive brand identity and logo language."
                  },
                  {
                    role: "Digital Marketing Intern",
                    company: "Spandigit Social, Nashik",
                    period: "June 2023 — July 2023",
                    duration: "2 Months",
                    desc: "Conducted brand and demographic research to optimize digital campaigns, managing Google/Facebook Ads and strengthening my understanding of user behavior and consumer preferences."
                  }
                ].map((item, idx) => (
                  <div 
                    key={idx} 
                    className="p-6 rounded-2xl border border-neutral-800/80 bg-neutral-900/30 hover:border-neutral-700 transition-all duration-200 flex flex-col md:flex-row justify-between gap-4"
                  >
                    <div>
                      <h4 className="text-2xl font-editorial text-white">{item.role}</h4>
                      <p className="text-orange-400 text-sm mt-1">{item.company}</p>
                    </div>
                    <div className="md:text-right flex flex-col md:items-end gap-1">
                      <span className="text-neutral-300 text-sm font-mono font-medium">{item.period}</span>
                      <span className="text-neutral-500 text-xs font-mono">{item.duration}</span>
                      <p className="text-neutral-400 text-sm max-w-sm md:text-right font-light mt-2">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

/* --- ROOT APP --- */
export default function App() {
  useEffect(() => {
    document.title = "Jinendra Parakh | Product Design Portfolio 2025";
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-[#faf9f6] text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white flex flex-col">
          <CustomCursor />
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/project/:slug" element={<ProjectDetailPage />} />
              <Route path="/commercial" element={<CommercialPage />} />
              <Route path="/commercial-nda" element={<CommercialPage />} />
              <Route path="/playground" element={<PlaygroundPage />} />
              <Route path="/personal" element={<PlaygroundPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </main>
          <Footer />
          <ScrollToTopButton />
        </div>
      </Router>
    </ErrorBoundary>
  );
}