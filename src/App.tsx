import { useState, useEffect, useRef, MouseEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Award,
  ShieldCheck,
  Sparkles,
  Coins,
  HeartHandshake,
  Star,
  Phone,
  MapPin,
  Clock,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  ArrowRight,
  Check,
  Send,
  ExternalLink,
  Mail,
  Compass,
  Eye,
  Info,
  Sparkle,
  Youtube,
  Instagram,
  Facebook,
  Twitter,
  MessageCircle,
  Heart,
  Trash2
} from 'lucide-react';
import {
  COLLECTIONS,
  PRODUCTS,
  WHY_CHOOSE_US,
  PROCESS_STEPS,
  TESTIMONIALS,
  FAQS,
  GALLERY_IMAGES,
  Product,
  Collection,
  FAQItem,
  resolveImagePath
} from './data';

const IconMap = {
  Award,
  ShieldCheck,
  Sparkles,
  Coins,
  HeartHandshake
};

export default function App() {
  // Navigation & UI States
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Custom Filters & Detail Modals
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeFAQ, setActiveFAQ] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [selectedMasterpiece, setSelectedMasterpiece] = useState<any | null>(null);

  // Carousel State for Master Jewelers Section
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [masterpieceIndex, setMasterpieceIndex] = useState(8);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  const rawCarouselImages = [
    {
      url: '/src/assets/images/gold_tennis_bracelet_1785258954265.jpg',
      alt: 'The Empress Yellow Gold Diamond Tennis Bracelet',
      title: 'The Empress Yellow Gold Diamond Tennis Bracelet',
      category: 'High-Karat Bracelets',
      description: 'A masterfully articulated yellow gold bracelet featuring a solid line of hand-selected round brilliant diamonds of exceptional fire and brilliance.',
      specs: [
        'Diamonds: 12.5 Ctw Round Brilliant Cut',
        'Color Grade: F (Rare Colorless)',
        'Clarity Grade: VVS2 (Exceptional Clarity)',
        'Metal: 18k Yellow Gold (750 Purity)',
        'Setting Style: Hand-crafted 4-prong claw mounting'
      ],
      appraisal: {
        certNumber: 'GIA-2210894567',
        estimatedValue: 38500,
        registeredOwner: 'Simon & Sons Private Vault'
      }
    },
    {
      url: '/src/assets/images/gold_geometric_bangle_1785258973051.jpg',
      alt: 'The Deco Pavé Diamond Bangle',
      title: 'The Deco Pavé Diamond Bangle',
      category: 'Art Deco Bangles',
      description: 'A wide, heavy solid yellow gold bangle featuring stunning modern geometric patterns of microscopic pavé diamonds set with seamless precision.',
      specs: [
        'Diamonds: 8.4 Ctw Calibrated Pavé-set Brilliant Cut',
        'Color Grade: E-F (Colorless)',
        'Clarity Grade: VS1-VS2 (High Clarity)',
        'Metal: Heavy 18k Solid Yellow Gold (750 Purity)',
        'Setting Style: Micro-pavé honeycomb geometry'
      ],
      appraisal: {
        certNumber: 'GIA-6510349281',
        estimatedValue: 45000,
        registeredOwner: 'Simon & Sons Private Vault'
      }
    },
    {
      url: '/src/assets/images/pave_gold_bangle_1785258991088.jpg',
      alt: 'The Elite Pavé Gold Bangle',
      title: 'The Elite Pavé Gold Bangle',
      category: 'High-Karat Bangles',
      description: 'An exquisite, thick solid yellow gold bangle featuring a solid band of pavé diamonds across its entire face, reflecting light from every conceivable angle.',
      specs: [
        'Diamonds: 10.2 Ctw Round Brilliant Diamonds',
        'Color Grade: F-G (Rare White)',
        'Clarity Grade: VS1 (Exceptional Cut)',
        'Metal: Solid 18k Yellow Gold (750 Purity)',
        'Locking Mechanism: Hidden push-clasp with dual safety latches'
      ],
      appraisal: {
        certNumber: 'GIA-72018491',
        estimatedValue: 32500,
        registeredOwner: 'Simon & Sons Private Vault'
      }
    },
    {
      url: '/src/assets/images/sapphire_gold_pendant_1785259006658.jpg',
      alt: 'The Royal Blue Sapphire Halo Pendant',
      title: 'The Royal Blue Sapphire Halo Pendant',
      category: 'Bespoke Pendants',
      description: 'An exceptional pear-cut royal blue Ceylon sapphire, meticulously framed by a sparkling double halo of brilliant white diamonds on a delicate solid gold chain.',
      specs: [
        'Center Stone: 4.2 Carat Pear-Cut Ceylon Sapphire',
        'Accent Diamonds: 1.8 Ctw Round Brilliant Halo',
        'Metal: 18k Yellow & White Gold Duo-Tone',
        'Chain Style: 18-inch signature gold cable chain'
      ],
      appraisal: {
        certNumber: 'GIA-891043128',
        estimatedValue: 52000,
        registeredOwner: 'Simon & Sons Private Vault'
      }
    },
    {
      url: '/src/assets/images/engraved_emerald_ring_1785259021560.jpg',
      alt: 'The Sovereign Emerald Intaglio Ring',
      title: 'The Sovereign Emerald Intaglio Ring',
      category: 'Bespoke Rings',
      description: 'A majestic, cushion-cut vivid green Colombian emerald set inside a heavy, hand-engraved yellow gold mount featuring exquisite antique texturing.',
      specs: [
        'Center Stone: 3.5 Carat Colombian Cushion-Cut Emerald',
        'Metal: Heavy 22k Yellow Gold (Hand-Chiseled)',
        'Engraving: Bespoke Victorian floral filigree borders',
        'Purity Certification: certified natural minor oil treatment'
      ],
      appraisal: {
        certNumber: 'GIA-1049283',
        estimatedValue: 58000,
        registeredOwner: 'Simon & Sons Private Vault'
      }
    },
    {
      url: '/src/assets/images/solitaire_diamond_ring_1785259040831.jpg',
      alt: 'The Grand Cathedral Solitaire Diamond Ring',
      title: 'The Grand Cathedral Solitaire Diamond Ring',
      category: 'Bridal High Jewelry',
      description: 'A stunning round brilliant-cut solitaire diamond centerpiece, paired with a matching hand-engraved solid gold companion band, presented on a dark velvet cushion.',
      specs: [
        'Center Stone: 2.8 Carat Round Brilliant Diamond',
        'Color/Clarity: E Color, VVS1 Clarity',
        'Cut/Polish/Symmetry: Excellent / Excellent / Excellent',
        'Metal: 18k Yellow Gold Hand-Engraved shank'
      ],
      appraisal: {
        certNumber: 'GIA-2210894568',
        estimatedValue: 64500,
        registeredOwner: 'Simon & Sons Private Vault'
      }
    },
    {
      url: '/src/assets/images/sapphire_tennis_bracelet_1785259061119.jpg',
      alt: 'The Royal Sapphire & Gold Duo Set',
      title: 'The Royal Sapphire & Gold Duo Set',
      category: 'Master Cuffs',
      description: 'A magnificent deep blue sapphire and diamond tennis bracelet resting beautifully alongside a matching wide gold geometric bangle.',
      specs: [
        'Sapphires: 8.5 Ctw Calibrated Natural Sapphires',
        'Diamonds: 4.8 Ctw Round Brilliant Accents',
        'Metal: 18k Solid Yellow Gold (High-Polish)',
        'Width: Dual stacking luxury presentation'
      ],
      appraisal: {
        certNumber: 'GIA-4109284',
        estimatedValue: 39500,
        registeredOwner: 'Simon & Sons Private Vault'
      }
    },
    {
      url: '/src/assets/images/vintage_signet_ring_1785259074588.jpg',
      alt: 'The Antique Signet & Filigree Set',
      title: 'The Antique Signet & Filigree Set',
      category: 'Estate Gold',
      description: 'A rare late-Victorian hand-engraved solid gold signet ring paired with a masterfully detailed vintage platinum filigree brooch.',
      specs: [
        'Ring Metal: 18k Solid Yellow Gold (750 Purity)',
        'Brooch Metal: Solid Platinum 950 with micro-filigree',
        'Era: Circa 1895 (Late Victorian Estate)',
        'Weight: 14.2g gold, 8.5g platinum'
      ],
      appraisal: {
        certNumber: 'GIA-3409122',
        estimatedValue: 22500,
        registeredOwner: 'Simon & Sons Private Vault'
      }
    }
  ];

  const carouselImages = rawCarouselImages.map(img => ({
    ...img,
    url: resolveImagePath(img.url)
  }));

  // Hero BG Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex(prev => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  // Masterpieces Auto-Slide Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setMasterpieceIndex(prev => prev + 1);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Masterpieces Infinite Loop Edge Detection
  useEffect(() => {
    if (masterpieceIndex >= 16) {
      const timeout = setTimeout(() => {
        setTransitionEnabled(false);
        setMasterpieceIndex(8);
      }, 650);
      return () => clearTimeout(timeout);
    } else if (masterpieceIndex < 8) {
      const timeout = setTimeout(() => {
        setTransitionEnabled(false);
        setMasterpieceIndex(masterpieceIndex + 8);
      }, 650);
      return () => clearTimeout(timeout);
    }
  }, [masterpieceIndex]);

  // Masterpieces Instant Position Reset Reapinter
  useEffect(() => {
    if (!transitionEnabled) {
      const raf = requestAnimationFrame(() => {
        setTransitionEnabled(true);
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [transitionEnabled]);
  
  // Form submission states
  const [enquirySuccess, setEnquirySuccess] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Bespoke Custom Design',
    message: ''
  });
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  // Action Feedback & AI Chat state
  const [clickedProducts, setClickedProducts] = useState<Record<string, boolean>>({});
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string }>>([
    { sender: 'assistant', text: 'Welcome to Simon & Sons Jewelry Exchange. I am your AI Luxury Assistant. How may I guide you through our vaults or gold valuation process today?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Auto Scroll Chat to Bottom
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isTyping, aiChatOpen]);

  // Wishlist/Combined Enquiry state
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [combinedEnquirySuccess, setCombinedEnquirySuccess] = useState(false);
  const [combinedEnquiryForm, setCombinedEnquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const toggleWishlist = (product: Product) => {
    if (wishlist.some(item => item.id === product.id)) {
      setWishlist(prev => prev.filter(item => item.id !== product.id));
    } else {
      setWishlist(prev => [...prev, product]);
    }
  };

  const isInWishlist = (id: string) => wishlist.some(item => item.id === id);

  const handleCombinedEnquirySubmit = (e: FormEvent) => {
    e.preventDefault();
    setCombinedEnquirySuccess(true);
    setTimeout(() => {
      setWishlist([]);
      setIsWishlistOpen(false);
      setCombinedEnquirySuccess(false);
      setCombinedEnquiryForm({ name: '', email: '', phone: '', message: '' });
    }, 4000);
  };

  const handleEnquireClick = (product: Product) => {
    triggerEnquiry(product);
    setClickedProducts(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setClickedProducts(prev => ({ ...prev, [product.id]: false }));
    }, 3000);
  };

  const sendChatMessage = (text: string) => {
    setChatMessages(prev => [...prev, { sender: 'user', text }]);
    setIsTyping(true);

    setTimeout(() => {
      let reply = "Thank you for reaching out to Simon & Sons Jewelry Exchange. A senior family appraiser has been notified of your inquiry. You can also call us directly at +1 (347) 680-0568, visit our Rego Park boutique showroom, or submit an appointment booking form below!";
      const lower = text.toLowerCase();
      
      if (lower.includes('hour') || lower.includes('open') || lower.includes('time') || lower.includes('close') || lower.includes('sunday')) {
        reply = "Our luxury boutique showroom hours are:\n• Monday - Thursday: 10:00 AM - 6:00 PM\n• Friday: 10:00 AM - 4:00 PM\n• Sunday: 11:00 AM - 5:00 PM\n• Saturday: Closed in observance of the Jewish Sabbath.";
      } else if (lower.includes('location') || lower.includes('address') || lower.includes('where') || lower.includes('find') || lower.includes('directions') || lower.includes('map') || lower.includes('rego') || lower.includes('queens')) {
        reply = "Our boutique showroom is located at 94-15 63rd Dr, Rego Park, NY 11374. We are situated in the heart of Queens, NY. For your convenience and peace of mind, we offer secure private client parking and are easily accessible via the M and R subways (63rd Dr - Rego Park station) and local bus routes.";
      } else if (lower.includes('service') || lower.includes('offer') || lower.includes('repair') || lower.includes('resize') || lower.includes('watch') || lower.includes('solder') || lower.includes('craft') || lower.includes('micro')) {
        reply = "Simon & Sons offers a comprehensive suite of premium jewelry services:\n1. Custom 3D CAD Design: Co-create your custom wedding bands or statement pieces with our master artisans.\n2. Master Repairs: Laser micro-soldering, delicate ring resizing, professional gemstone and diamond resetting, and claw/prong rebuilds.\n3. Fine Horology: Complete mechanical and automatic watch servicing, Swiss movement calibrations, crystal replacements, and band refitting.\n4. GIA Appraisals & Evaluations: Official visual certifications and detailed, high-magnification stone mapping.";
      } else if (lower.includes('appointment') || lower.includes('book') || lower.includes('schedule') || lower.includes('view') || lower.includes('consult')) {
        reply = "Our custom viewing appointment process is simple and secure:\n1. Browse our Featured Creations and click 'Save' on any items of interest.\n2. Open your private wishlist docket (via the Heart icon in the upper-right) and submit your contact details and preferred dates.\n3. A senior gemologist will contact you to coordinate a private, secure VIP viewing session in our Rego Park showroom. For immediate same-day bookings, call us at +1 (347) 680-0568!";
      } else if (lower.includes('gia') || lower.includes('certif') || lower.includes('grade') || lower.includes('standard') || lower.includes('quality') || lower.includes('diamond')) {
        reply = "Quality and trust are our highest priorities. All center-stone diamonds and primary precious gemstones above 0.5 carats at Simon & Sons are certified by the Gemological Institute of America (GIA). Each piece comes with its official lab grading report, unique laser-inscribed serial number, and a full, lifetime authenticity guarantee.";
      } else if (lower.includes('category') || lower.includes('collection') || lower.includes('product') || lower.includes('ring') || lower.includes('necklace') || lower.includes('earring') || lower.includes('bracelet') || lower.includes('pendant') || lower.includes('anklet') || lower.includes('watch') || lower.includes('bridal') || lower.includes('gold')) {
        reply = "We offer nine beautifully curated luxury categories:\n• Rings & Solitaires\n• Colliers & Necklaces\n• Earrings & Studs\n• Bangles & Bracelets\n• Master Watches\n• Pendants & Medallions\n• Fine Anklets\n• Custom Bridal Sets\n• Estate & Vintage Gold\nYou can browse and filter these on our interactive Showcase section above!";
      } else if (lower.includes('sell') || lower.includes('buy') || lower.includes('trade') || lower.includes('exchange') || lower.includes('cash') || lower.includes('payout') || lower.includes('value')) {
        reply = "As Queens' premier fine metal exchange, we offer the region's highest cash valuations for your gold, platinum, loose diamonds, and estate jewelry based on live, up-to-the-minute global commodity prices. Inspections are done directly in front of you with 100% transparency under high-magnification loupes, with absolute security.";
      }

      setChatMessages(prev => [...prev, { sender: 'assistant', text: reply }]);
      setIsTyping(false);
    }, 1000);
  };

  const SUGGESTIONS = [
    'What are your showroom hours?',
    'Where are you located in Rego Park?',
    'How do I sell my gold or jewelry?',
    'How do I custom design a ring?'
  ];

  const handleSendSuggested = (text: string) => {
    sendChatMessage(text);
  };

  const handleChatSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    sendChatMessage(chatInput.trim());
    setChatInput('');
  };

  // Track scroll for sticky header styling
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(prev => {
        if (prev !== scrolled) return scrolled;
        return prev;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter products by active category
  const filteredProducts = selectedCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === selectedCategory);

  // Categories list
  const categories = ['All', 'Rings', 'Necklaces', 'Bracelets', 'Earrings', 'Watches'];

  // Handle Lightbox Navigation
  const handlePrevImage = (e: MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(prev => (prev !== null && prev > 0 ? prev - 1 : GALLERY_IMAGES.length - 1));
    }
  };

  const handleNextImage = (e: MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(prev => (prev !== null && prev < GALLERY_IMAGES.length - 1 ? prev + 1 : 0));
    }
  };

  // Pre-fill and open Enquiry Modal for specific product
  const triggerEnquiry = (product: Product) => {
    setSelectedProduct(product);
    setEnquiryForm(prev => ({
      ...prev,
      message: `I would like to request more details and a private viewing for the beautiful "${product.name}" (${product.specs[0] || ''}).`
    }));
    setEnquirySuccess(false);
  };

  const handleEnquirySubmit = (e: FormEvent) => {
    e.preventDefault();
    setEnquirySuccess(true);
    // In production, this would send an email/API request.
    setTimeout(() => {
      setSelectedProduct(null);
      setEnquiryForm({ name: '', email: '', phone: '', service: 'Bespoke Custom Design', message: '' });
      setEnquirySuccess(false);
    }, 4000);
  };

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    setContactSuccess(true);
    setTimeout(() => {
      setContactSuccess(false);
      setContactForm({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
    }, 4000);
  };

  const toggleFAQ = (id: string) => {
    if (activeFAQ === id) {
      setActiveFAQ(null);
    } else {
      setActiveFAQ(id);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0c0c0c] text-[#faf9f6] selection:bg-gold-500 selection:text-neutral-900 overflow-x-hidden font-sans">
      
      {/* ----------------- HEADER / NAVIGATION ----------------- */}
      <header
        id="navbar-header"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#0f0f0f]/95 backdrop-blur-md py-3 md:py-4 border-b border-neutral-900 shadow-xl'
            : 'bg-transparent py-5 md:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 flex items-center justify-between">
          
          {/* Logo Brand */}
          <a href="#" className="flex flex-col group focus:outline-none pl-1 sm:pl-0">
            <span className="text-base sm:text-lg md:text-2xl font-serif tracking-[0.2em] sm:tracking-[0.25em] text-[#faf9f6] group-hover:text-gold-400 transition-colors duration-300">
              SIMON &amp; SONS
            </span>
            <span className="text-[7.5px] sm:text-[9px] md:text-[10px] tracking-[0.35em] sm:tracking-[0.4em] text-gold-400 font-sans uppercase">
              Jewelry Exchange
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs font-medium tracking-[0.2em] uppercase text-neutral-300">
            <a href="#about" className="hover:text-gold-400 transition-colors duration-300">About</a>
            <a href="#collections" className="hover:text-gold-400 transition-colors duration-300">Collections</a>
            <a href="#why-choose-us" className="hover:text-gold-400 transition-colors duration-300">Heritage</a>
            <a href="#products" className="hover:text-gold-400 transition-colors duration-300">Showcase</a>
            <a href="#process" className="hover:text-gold-400 transition-colors duration-300">The Craft</a>
            <a href="#gallery" className="hover:text-gold-400 transition-colors duration-300">Gallery</a>
            <a href="#contact" className="hover:text-gold-400 transition-colors duration-300">Contact</a>
          </nav>

          {/* Action elements grouped together closer to the right edge */}
          <div className="flex items-center space-x-1 sm:space-x-2.5">
            {/* Call Button (Mobile/Tablet/Desktop) */}
            <a
              href="tel:+13476800568"
              className="flex items-center space-x-1 text-[10px] sm:text-[11px] font-semibold tracking-wider text-gold-400 hover:text-white transition-colors duration-300 bg-neutral-900/60 px-2 py-2 sm:px-3 sm:py-2 rounded border border-neutral-800 hover:border-gold-500"
            >
              <Phone className="w-3 h-3 text-gold-400 animate-pulse" />
              <span className="hidden xs:inline sm:inline">+1 (347) 680-0568</span>
              <span className="inline xs:hidden text-[9px]">Call</span>
            </a>
            
            {/* Book Viewing Button */}
            <a
              href="#contact"
              className="bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-neutral-950 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest px-2.5 py-2 sm:px-3 sm:py-2 rounded shadow-lg shadow-gold-900/20 hover:shadow-gold-500/30 transform hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap animate-fade-in"
            >
              Book Viewing
            </a>

            {/* Wishlist Indicator Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative bg-neutral-900/80 border border-neutral-800 hover:border-gold-500/50 p-2 rounded transition-all duration-300 flex items-center justify-center text-neutral-400 hover:text-gold-400 focus:outline-none"
              title="Saved Jewelry Items"
            >
              <Heart className={`w-3.5 h-3.5 ${wishlist.length > 0 ? 'fill-gold-400 text-gold-400' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-500 text-neutral-950 text-[8px] sm:text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center shadow">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle (only on lg/mobile) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-[#faf9f6] focus:outline-none w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center shrink-0 hover:text-gold-400 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#0f0f0f] z-40 pt-24 px-8 pb-12 flex flex-col justify-between overflow-y-auto"
          >
            <div className="flex flex-col space-y-6 text-center">
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-serif tracking-widest hover:text-gold-400 transition-colors"
              >
                About Heritage
              </a>
              <a
                href="#collections"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-serif tracking-widest hover:text-gold-400 transition-colors"
              >
                Bespoke Collections
              </a>
              <a
                href="#why-choose-us"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-serif tracking-widest hover:text-gold-400 transition-colors"
              >
                Why Simon &amp; Sons
              </a>
              <a
                href="#products"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-serif tracking-widest hover:text-gold-400 transition-colors"
              >
                Featured Showcase
              </a>
              <a
                href="#process"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-serif tracking-widest hover:text-gold-400 transition-colors"
              >
                The Craftsmanship
              </a>
              <a
                href="#gallery"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-serif tracking-widest hover:text-gold-400 transition-colors"
              >
                Boutique Gallery
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-serif tracking-widest hover:text-gold-400 transition-colors"
              >
                Get In Touch
              </a>
            </div>

            <div className="flex flex-col space-y-4 items-center">
              <a
                href="tel:+13476800568"
                className="flex items-center space-x-2 text-sm text-gold-400 hover:text-white"
              >
                <Phone className="w-4 h-4" />
                <span>+1 (347) 680-0568</span>
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center bg-gradient-to-r from-gold-600 to-gold-500 text-neutral-950 font-bold text-xs uppercase tracking-widest py-3.5 rounded"
              >
                Schedule Consultation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* ----------------- 1. HERO SECTION ----------------- */}
      <section id="hero" className="relative min-h-[720px] sm:min-h-[600px] md:min-h-[650px] py-20 sm:py-24 md:py-32 flex items-center justify-center overflow-hidden">
        {/* Background Zooming Asset */}
        <div className="absolute inset-0 z-0 bg-neutral-950">
          {carouselImages.map((img, idx) => (
            <img
              key={idx}
              src={img.url}
              alt={img.alt}
              referrerPolicy="no-referrer"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity ease-in-out ${
                idx === carouselIndex ? 'opacity-100 scale-105' : 'opacity-0 pointer-events-none'
              }`}
              style={{ transitionDuration: '300ms' }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-black/80 z-0"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-16 md:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            {/* Elegant eyebrow */}
            <span className="inline-block text-xs md:text-sm font-semibold tracking-[0.4em] uppercase text-gold-400">
              Queens&apos; Premier Fine Jeweler Since 1989
            </span>

            {/* Giant display heading */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-[#faf9f6] leading-[1.1] font-light">
              Timeless Jewelry <br />
              <span className="italic font-normal text-gold-200">Crafted to Perfection</span>
            </h1>

            {/* Premium descriptive sub */}
            <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-neutral-300 font-sans leading-relaxed tracking-wide font-light">
              We specialize in GIA certified bridal diamonds, custom luxury bands, and fair-value jewelry exchanges in Rego Park, NY. Bring your custom dreams into high-definition gold and platinum.
            </p>

            {/* Premium Luxury Call-to-actions */}
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4.5 sm:gap-6 w-full max-w-md mx-auto sm:max-w-none">
              <a
                href="#collections"
                className="w-full sm:w-auto bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 hover:from-gold-500 hover:via-gold-400 hover:to-gold-500 text-neutral-950 px-8 py-4 text-xs font-bold uppercase tracking-widest rounded-sm shadow-xl hover:shadow-gold-500/20 transform hover:-translate-y-0.5 transition-all duration-300 text-center block"
              >
                Explore Collections
              </a>
              <a
                href="#contact"
                className="w-full sm:w-auto bg-transparent hover:bg-gold-500/5 text-gold-400 border border-gold-600/40 hover:border-gold-500 px-8 py-4 text-xs font-bold uppercase tracking-widest rounded-sm transition-all duration-300 text-center block"
              >
                Custom Consultation
              </a>
            </div>
          </motion.div>
        </div>

        {/* Animated Scroll Down Indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center space-y-2 pointer-events-none">
          <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-500">Scroll Down</span>
          <div className="w-5 h-8 border border-neutral-700 rounded-full p-1 flex justify-center">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-1 h-2 bg-gold-400 rounded-full"
            />
          </div>
        </div>
      </section>


      {/* ----------------- 2. ABOUT Heritage SECTION ----------------- */}
      <section id="about" className="py-24 bg-[#0f0f0f] border-t border-b border-neutral-900 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Visual showcase column - Horizontal Auto-Sliding Card Carousel */}
            <div className="lg:col-span-5 relative w-full overflow-hidden pb-8 lg:pb-0">
              <div className="relative z-10 w-full overflow-hidden bg-neutral-950/40 py-6 px-4 rounded-xl border border-neutral-900/60 shadow-2xl">
                <div className="text-[10px] tracking-[0.2em] uppercase font-bold text-neutral-400 mb-4 flex items-center justify-between">
                  <span>Our Masterpieces</span>
                  <div className="flex space-x-1.5 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-ping"></span>
                    <span className="text-gold-400 text-[8px]">Live Vault Stream</span>
                  </div>
                </div>

                <div className="w-full overflow-hidden relative">
                  <div className="animate-marquee gap-4 py-4">
                    {/* Render original cards + duplicate set for seamless infinite scrolling */}
                    {[...carouselImages, ...carouselImages].map((image, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedMasterpiece(image)}
                        className="inline-block shrink-0 aspect-[4/5] rounded overflow-hidden border border-neutral-900 bg-neutral-950/80 hover:border-gold-400/50 cursor-pointer transition-all duration-300"
                        style={{
                          width: 'var(--card-width)',
                        }}
                        title={`Click to view appraisal for ${image.title}`}
                      >
                        {/* Card Image Area */}
                        <div className="relative w-full h-full">
                          <img
                            src={image.url}
                            alt={image.alt}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover object-center"
                            loading="lazy"
                            decoding="async"
                          />
                          {/* Card Narrative Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/35 to-transparent flex flex-col justify-end p-3.5 whitespace-normal">
                            <span className="text-[8px] tracking-widest text-gold-400 uppercase font-bold block mb-1">
                              {image.category}
                            </span>
                            <h4 className="text-[10px] sm:text-[11px] font-serif text-white leading-tight font-medium line-clamp-2">
                              {image.title}
                            </h4>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Graphic background borders */}
              <div className="absolute -top-3 -left-3 w-[calc(100%+24px)] h-[calc(100%+24px)] border border-gold-600/5 -z-10 rounded-xl"></div>
            </div>

            {/* Narrative text column */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-gold-400">Our Story &amp; Values</span>
              
              <h2 className="text-3xl md:text-5xl font-serif text-[#faf9f6] font-light leading-snug">
                The Master Jewelers of <br />
                <span className="italic text-gold-300">Simon &amp; Sons Jewelry Exchange</span>
              </h2>
              
              <div className="h-[1px] w-20 bg-gold-500"></div>

              <div className="space-y-4 text-neutral-300 text-sm md:text-base font-light leading-relaxed">
                <p>
                  Established in the heart of Rego Park, NY, <strong>Simon &amp; Sons Jewelry Exchange</strong> has proudly served New York families and jewelry enthusiasts with premium quality for decades. What started as a small artisan workshop has grown into Queens’ most trusted boutique for certified luxury goods, custom design, and fine metal trading.
                </p>
                <p>
                  We operate on simple, unbreakable principles: uncompromising craftsmanship, absolute honesty in valuation, and white-glove customer care. Whether you are looking for the perfect certified diamond to propose, custom designing an heirloom band, or seeking maximum immediate cash valuation for pre-owned jewelry, our family welcomes you with discretion and integrity.
                </p>
                <p>
                  Every piece we offer or create goes through meticulous microscopic evaluation, rigorous metal purity certification, and authentic GIA grading. We believe jewelry is not just an asset, but a story to pass down through generations.
                </p>
              </div>

              {/* Badges/Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-neutral-900">
                <div className="space-y-1">
                  <span className="block text-2xl md:text-3xl font-serif text-gold-400 font-bold">4.6 ★</span>
                  <span className="block text-[10px] tracking-wider text-neutral-400 uppercase font-medium">Google Rating</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-2xl md:text-3xl font-serif text-gold-400 font-bold">50+</span>
                  <span className="block text-[10px] tracking-wider text-neutral-400 uppercase font-medium">5-Star Reviews</span>
                </div>
                <div className="space-y-1 col-span-2 sm:col-span-1">
                  <span className="block text-2xl md:text-3xl font-serif text-gold-400 font-bold">GIA</span>
                  <span className="block text-[10px] tracking-wider text-neutral-400 uppercase font-medium">Certified Standard</span>
                </div>
              </div>

              {/* CTA link */}
              <div className="pt-4">
                <a
                  href="#why-choose-us"
                  className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest text-gold-400 hover:text-white uppercase group transition-colors duration-300"
                >
                  <span>Learn about our gold valuation</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>


      {/* ----------------- 3. FEATURED JEWELRY COLLECTIONS ----------------- */}
      <section id="collections" className="py-24 bg-[#0c0c0c]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-gold-400">Bespoke Categories</span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#faf9f6] font-light">Featured Jewelry Collections</h2>
            <div className="h-[1px] w-16 bg-gold-500 mx-auto mt-4"></div>
            <p className="max-w-lg mx-auto text-xs md:text-sm text-neutral-400 leading-relaxed font-light">
              Explore our diverse, hand-finished vaults encompassing vintage elegance and sleek modern architectural contours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {COLLECTIONS.map((col) => (
              <a
                key={col.id}
                href="#products"
                onClick={() => {
                  const categoryMap: Record<string, string> = {
                    rings: 'Rings',
                    necklaces: 'Necklaces',
                    earrings: 'Earrings',
                    bracelets: 'Bracelets',
                    watches: 'Watches',
                    pendants: 'Pendants',
                    'bridal-sets': 'Bridal Sets',
                    'estate-jewelry': 'Estate Gold',
                    anklets: 'Bracelets',
                    cufflinks: 'Estate Gold'
                  };
                  setSelectedCategory(categoryMap[col.id] || 'All');
                }}
                className="group relative h-64 sm:h-72 rounded overflow-hidden border border-neutral-900 shadow-xl flex flex-col justify-end p-4 sm:p-6 transition-all duration-500 hover:border-gold-500/50"
              >
                {/* Background image */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={col.image}
                    alt={col.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out transform-gpu will-change-transform"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/70 to-transparent"></div>
                </div>

                {/* Info block */}
                <div className="relative z-10 space-y-1 sm:space-y-2">
                  <span className="text-[9px] sm:text-[10px] tracking-widest text-gold-400 uppercase font-semibold">
                    {col.count}
                  </span>
                  <h3 className="text-base sm:text-lg md:text-xl font-serif text-white group-hover:text-gold-200 transition-colors duration-300">
                    {col.name}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-neutral-400 line-clamp-2 font-light leading-relaxed group-hover:text-neutral-300 transition-colors hidden sm:block">
                    {col.description}
                  </p>
                  
                  {/* Small gold arrow link */}
                  <div className="pt-1 flex items-center space-x-1 text-[10px] sm:text-xs text-gold-400 font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </a>
            ))}
          </div>

        </div>
      </section>


      {/* ----------------- 4. WHY CHOOSE US ----------------- */}
      <section id="why-choose-us" className="py-24 bg-[#0f0f0f] border-t border-b border-neutral-900 relative">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute -top-1/4 right-0 w-96 h-96 bg-gold-600/5 blur-[120px] rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-6 space-y-3">
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-gold-400">An Unbroken Standard</span>
              <h2 className="text-3xl md:text-5xl font-serif text-[#faf9f6] font-light">Why Choose Simon &amp; Sons?</h2>
              <div className="h-[1px] w-20 bg-gold-500 mt-4"></div>
            </div>
            <div className="lg:col-span-6">
              <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light">
                For over three decades, we have remained Rego Park’s standard-bearer for trustworthy jewelry services. We bridge the precision of master gemological evaluation with absolute transparency, offering unmatched payouts, lifetime cleanings, and premium design security.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {WHY_CHOOSE_US.map((item) => {
              const IconComponent = IconMap[item.iconName as keyof typeof IconMap] || Award;
              return (
                <div
                  key={item.id}
                  className="bg-[#141414] border border-neutral-900 rounded p-6 hover:border-neutral-800 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-neutral-950/60 rounded flex items-center justify-center border border-neutral-800">
                      <IconComponent className="w-5 h-5 text-gold-400" />
                    </div>
                    <h3 className="text-lg md:text-xl font-serif text-white">{item.title}</h3>
                    <p className="text-xs text-neutral-400 leading-relaxed font-light">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* ----------------- 5. FEATURED PRODUCTS SHOWCASE ----------------- */}
      <section id="products" className="py-24 bg-[#0c0c0c]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-3">
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-gold-400">Curated Vault</span>
              <h2 className="text-3xl md:text-5xl font-serif text-[#faf9f6] font-light">Featured Creations</h2>
              <div className="h-[1px] w-16 bg-gold-500 mt-4"></div>
            </div>

            {/* Premium Interactive Category Filter */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-[10px] md:text-xs tracking-widest uppercase font-bold px-4 py-2 rounded transition-all duration-300 border ${
                    selectedCategory === cat
                      ? 'bg-gold-500 text-neutral-950 border-gold-500 shadow-md shadow-gold-500/10'
                      : 'bg-neutral-900/40 text-neutral-400 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {filteredProducts.map((p) => {
              const isSaved = isInWishlist(p.id);
              const isOutOfStock = p.stock === 0;
              return (
                <div
                  key={p.id}
                  className="bg-[#111111] border border-neutral-900 rounded overflow-hidden flex flex-col justify-between group hover:border-neutral-800 transition-all duration-300 h-full max-w-full"
                >
                  <div>
                    {/* Photo area */}
                    <div className="relative aspect-square overflow-hidden bg-neutral-900 border-b border-neutral-900">
                      <img
                        src={p.image}
                        alt={p.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out transform-gpu will-change-transform"
                        loading="lazy"
                        decoding="async"
                      />
                      {/* Category Label Overlay */}
                      <span className="absolute top-4 left-4 bg-neutral-950/90 text-gold-400 text-[9px] tracking-widest uppercase font-bold px-2.5 py-1.5 rounded border border-neutral-800">
                        {p.category}
                      </span>

                      {/* Out of Stock Label Overlay */}
                      {isOutOfStock && (
                        <span className="absolute top-4 right-4 bg-red-950/95 text-red-400 text-[9px] tracking-widest uppercase font-bold px-2.5 py-1.5 rounded border border-red-800/60 shadow-lg">
                          Sold Out
                        </span>
                      )}
                    </div>

                    {/* Body Info */}
                    <div className="p-4 sm:p-5 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-base sm:text-lg font-serif text-white group-hover:text-gold-300 transition-colors duration-300 line-clamp-1">
                          {p.name}
                        </h3>
                        <span className="text-base sm:text-lg font-mono text-gold-400 font-semibold shrink-0">
                          ${p.price.toLocaleString()}
                        </span>
                      </div>
                      
                      <p className="text-xs text-neutral-400 leading-relaxed font-light line-clamp-2 h-8">
                        {p.description}
                      </p>

                      {/* Specifications List */}
                      <div className="flex flex-wrap gap-1 pt-1 h-14 overflow-hidden content-start">
                        {p.specs.map((spec, i) => (
                          <span key={i} className="text-[8px] sm:text-[9px] tracking-wider uppercase font-semibold text-neutral-500 bg-neutral-950 px-2 py-0.5 rounded">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Button actions */}
                  <div className="p-4 sm:p-5 pt-0">
                    {isOutOfStock ? (
                      <button
                        disabled
                        className="w-full bg-neutral-900 text-neutral-500 border border-neutral-950 text-[10px] sm:text-xs font-bold uppercase tracking-widest py-2.5 sm:py-3 rounded cursor-not-allowed text-center"
                      >
                        Out of Stock
                      </button>
                    ) : (
                      <div className="flex gap-1.5">
                        {/* Save Button */}
                        <button
                          onClick={() => toggleWishlist(p)}
                          className={`flex-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest py-2.5 sm:py-3 px-1 sm:px-3 rounded border transition-all duration-300 flex items-center justify-center space-x-1.5 whitespace-nowrap ${
                            isSaved
                              ? 'bg-gold-500/10 text-gold-400 border-gold-500/40 hover:bg-gold-500/20'
                              : 'bg-transparent text-neutral-400 border-neutral-800 hover:border-neutral-700 hover:text-white'
                          }`}
                        >
                          <Heart className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isSaved ? 'fill-gold-400 text-gold-400' : ''}`} />
                          <span>{isSaved ? 'Saved' : 'Save'}</span>
                        </button>
                        
                        {/* Enquire Button */}
                        <button
                          disabled={clickedProducts[p.id]}
                          onClick={() => handleEnquireClick(p)}
                          className={`flex-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest py-2.5 sm:py-3 px-1 sm:px-3 rounded border transition-all duration-300 whitespace-nowrap ${
                            clickedProducts[p.id]
                              ? 'bg-gold-500 text-neutral-950 border-gold-500 cursor-not-allowed opacity-95'
                              : 'bg-[#171717] hover:bg-gold-500 hover:text-neutral-950 text-white border-neutral-800 hover:border-gold-500'
                          }`}
                        >
                          {clickedProducts[p.id] ? 'Sent ✓' : 'Enquire'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* ----------------- 6. CRAFTSMANSHIP PROCESS (Timeline) ----------------- */}
      <section id="process" className="py-24 bg-[#0f0f0f] border-t border-b border-neutral-900 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center space-y-3 mb-20">
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-gold-400">Masterful Lifecycle</span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#faf9f6] font-light">The Custom Design Journey</h2>
            <div className="h-[1px] w-16 bg-gold-500 mx-auto mt-4"></div>
            <p className="max-w-lg mx-auto text-xs md:text-sm text-neutral-400 leading-relaxed font-light">
              We translate abstract personal statements into brilliant physical existence. Observe our rigorous bench timeline.
            </p>
          </div>

          {/* Timeline Structure */}
          <div className="relative border-l border-neutral-800 max-w-3xl mx-auto pl-6 sm:pl-12 space-y-12">
            {PROCESS_STEPS.map((step, idx) => (
              <div key={idx} className="relative group">
                
                {/* Diamond bullet point */}
                <div className="absolute -left-[31px] sm:-left-[55px] top-1.5 w-4 h-4 bg-gold-500 border-4 border-[#0f0f0f] rotate-45 group-hover:bg-white group-hover:scale-110 transition-all duration-300"></div>
                
                <div className="space-y-2 bg-[#141414] border border-neutral-900 rounded p-6 group-hover:border-neutral-800 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-gold-400">{step.number}</span>
                    <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Stage</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-serif text-white group-hover:text-gold-200 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ----------------- 7. TESTIMONIALS ----------------- */}
      <section className="py-24 bg-[#0c0c0c]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            
            {/* Left intro & Aggregate score */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-gold-400">Local Validation</span>
              <h2 className="text-3xl md:text-5xl font-serif text-[#faf9f6] font-light">
                What Our Clients Say <br />
                <span className="italic text-gold-300">In Queens &amp; Beyond</span>
              </h2>
              <div className="h-[1px] w-16 bg-gold-500"></div>
              
              <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light">
                Simon &amp; Sons is built on decades of mutual confidence. Review our verified customer feedback and discover the difference of expert care.
              </p>

              {/* Rating Card */}
              <div className="bg-[#111111] border border-neutral-900 rounded p-6 flex items-center space-x-4 max-w-xs">
                <div className="text-4xl font-serif text-gold-400 font-bold">4.6</div>
                <div className="space-y-1">
                  <div className="flex space-x-1 text-gold-400">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <span className="block text-[10px] tracking-wider text-neutral-500 uppercase font-bold">
                    50 Reviews on Google
                  </span>
                </div>
              </div>
            </div>

            {/* Testimonials List */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {TESTIMONIALS.map((t) => (
                <div
                  key={t.id}
                  className="bg-[#111111] border border-neutral-900 rounded p-6 flex flex-col justify-between hover:border-neutral-800 transition-all duration-300"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-0.5 text-gold-400">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                      <span className="text-[10px] text-neutral-500">{t.date}</span>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed italic font-light">
                      &ldquo;{t.content}&rdquo;
                    </p>
                  </div>
                  <div className="pt-6 border-t border-neutral-900 flex items-center justify-between">
                    <div>
                      <span className="block text-xs font-bold text-white">{t.name}</span>
                      <span className="block text-[9px] text-neutral-500 tracking-wider uppercase font-medium">{t.location}</span>
                    </div>
                    {t.verified && (
                      <span className="text-[9px] tracking-widest uppercase text-gold-400 bg-gold-400/5 px-2 py-0.5 rounded border border-gold-400/20 font-bold">
                        Verified Client
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>


      {/* ----------------- 8. LUXURY GALLERY (Masonry + Lightbox) ----------------- */}
      <section id="gallery" className="py-24 bg-[#0f0f0f] border-t border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-gold-400">Visual Treasury</span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#faf9f6] font-light">Bespoke Workshop Gallery</h2>
            <div className="h-[1px] w-16 bg-gold-500 mx-auto mt-4"></div>
            <p className="max-w-lg mx-auto text-xs md:text-sm text-neutral-400 leading-relaxed font-light">
              Get an insider view of our in-house master benches, design rooms, and diamond setups. Click on any picture to view full-resolution.
            </p>
          </div>

          {/* Symmetrical Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {GALLERY_IMAGES.map((img, index) => (
              <div
                key={img.id}
                onClick={() => setLightboxIndex(index)}
                className="group relative aspect-[4/3] rounded overflow-hidden border border-neutral-900 cursor-pointer shadow-lg hover:border-gold-500/50 transition-all duration-500"
              >
                <img
                  src={img.url}
                  alt={img.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out transform-gpu will-change-transform"
                  loading="lazy"
                  decoding="async"
                />
                
                {/* Hover mask */}
                <div className="absolute inset-0 bg-neutral-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="space-y-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-[9px] tracking-widest text-gold-400 uppercase font-bold">
                      {img.category}
                    </span>
                    <h4 className="text-lg font-serif text-white">{img.title}</h4>
                    <div className="pt-2 flex items-center space-x-1.5 text-[10px] text-white tracking-widest uppercase font-semibold">
                      <Eye className="w-3.5 h-3.5 text-gold-400" />
                      <span>Zoom View</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ----------------- 9. STORE INFORMATION & TIMINGS ----------------- */}
      <section id="store-timings" className="py-24 bg-[#0c0c0c]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Hours and phone */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <span className="text-xs font-bold tracking-[0.3em] uppercase text-gold-400">Our Boutique</span>
                <h2 className="text-3xl md:text-5xl font-serif text-[#faf9f6] font-light">
                  Visit Simon &amp; Sons <br />
                  <span className="italic text-gold-300">In Rego Park, NY</span>
                </h2>
                <div className="h-[1px] w-20 bg-gold-500"></div>
                <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light">
                  We welcome drop-ins as well as secure private appointments. Visit us for immediate appraisals, customized design discussions, or luxury shopping.
                </p>
              </div>

              {/* Information Cards */}
              <div className="space-y-4">
                
                <div className="flex items-start space-x-4 p-4 bg-[#111111] border border-neutral-900 rounded">
                  <MapPin className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="block text-xs uppercase tracking-wider text-neutral-400 font-bold">Address</span>
                    <p className="text-sm text-neutral-200">
                      94-15 63rd Dr, Rego Park, NY 11374, United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-[#111111] border border-neutral-900 rounded">
                  <Phone className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="block text-xs uppercase tracking-wider text-neutral-400 font-bold">Immediate Phone</span>
                    <p className="text-sm text-neutral-200 font-mono">
                      +1 (347) 680-0568
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-[#111111] border border-neutral-900 rounded">
                  <Clock className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="block text-xs uppercase tracking-wider text-neutral-400 font-bold">Business Hours</span>
                    <ul className="text-xs text-neutral-400 space-y-1 font-light">
                      <li className="flex justify-between w-64"><span>Mon - Thu:</span> <span className="text-neutral-200">10:00 AM - 6:00 PM</span></li>
                      <li className="flex justify-between w-64"><span>Friday:</span> <span className="text-neutral-200">10:00 AM - 4:00 PM</span></li>
                      <li className="flex justify-between w-64"><span>Saturday:</span> <span className="text-neutral-500">Closed (Sabbath)</span></li>
                      <li className="flex justify-between w-64"><span>Sunday:</span> <span className="text-neutral-200">11:00 AM - 5:00 PM</span></li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>

            {/* Interactive Live Google Map block */}
            <div className="lg:col-span-7 rounded overflow-hidden border border-neutral-900 bg-[#111111] relative min-h-[350px]">
              <iframe
                title="Simon &amp; Sons Jewelry Exchange Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.630097127926!2d-73.86477168459461!3d40.72615497933013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25e24c65337b5%3A0xc07a8cb404c0df29!2s94-15%2063rd%20Dr%2C%20Rego%20Park%2C%20NY%2011374!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
                className="absolute inset-0 w-full h-full border-0 filter grayscale contrast-125 opacity-80"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

          </div>
        </div>
      </section>


      {/* ----------------- 10. FAQ SECTION (Accordion) ----------------- */}
      <section className="py-24 bg-[#0f0f0f] border-t border-b border-neutral-900">
        <div className="max-w-4xl mx-auto px-6">
          
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-gold-400">Clear Clarity</span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#faf9f6] font-light">Frequently Asked Questions</h2>
            <div className="h-[1px] w-16 bg-gold-500 mx-auto mt-4"></div>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq) => {
              const isOpen = activeFAQ === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-[#141414] border border-neutral-900 rounded overflow-hidden transition-colors duration-300"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full text-left p-6 flex items-center justify-between text-white hover:text-gold-400 transition-colors focus:outline-none"
                  >
                    <span className="font-serif text-lg md:text-xl font-light pr-4">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-gold-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-neutral-500 shrink-0" />
                    )}
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 text-xs md:text-sm text-neutral-400 leading-relaxed font-light border-t border-neutral-900/60 pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* ----------------- 11. CONTACT & INQUIRY FORM ----------------- */}
      <section id="contact" className="py-24 bg-[#0c0c0c] relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Brief block left */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-gold-400">Reserve Consultation</span>
              <h2 className="text-3xl md:text-5xl font-serif text-[#faf9f6] font-light">
                Secure Private <br />
                <span className="italic text-gold-300">Appointment</span>
              </h2>
              <div className="h-[1px] w-20 bg-gold-500"></div>
              
              <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light">
                Schedule a complimentary 1-on-1 consultation inside our secure Queens showroom. Our master jewelers will walk you through customized sizing, certified diamond parameters, and budget choices with complete discretion.
              </p>

              <div className="space-y-4 pt-6">
                <div className="flex items-center space-x-3 text-neutral-300">
                  <Phone className="w-4 h-4 text-gold-400" />
                  <span className="text-xs md:text-sm">+1 (347) 680-0568</span>
                </div>
                <div className="flex items-center space-x-3 text-neutral-300">
                  <Mail className="w-4 h-4 text-gold-400" />
                  <span className="text-xs md:text-sm">appointments@simonandsonsjewelry.com</span>
                </div>
                <div className="flex items-center space-x-3 text-neutral-300">
                  <MapPin className="w-4 h-4 text-gold-400" />
                  <span className="text-xs md:text-sm">94-15 63rd Dr, Rego Park, NY 11374</span>
                </div>
              </div>

              {/* Secure message badge */}
              <div className="flex items-center space-x-2 bg-[#111111] p-4 rounded border border-neutral-900/60">
                <ShieldCheck className="w-5 h-5 text-gold-400 shrink-0" />
                <p className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold">
                  All consultations are completely confidential, private, and secure.
                </p>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-7 bg-[#111111] border border-neutral-900 rounded p-8 md:p-10 shadow-2xl relative">
              <AnimatePresence mode="wait">
                {!contactSuccess ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleContactSubmit}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-[10px] uppercase tracking-widest text-neutral-400 font-bold">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          placeholder="e.g. Michael Thompson"
                          className="w-full bg-[#0c0c0c] border border-neutral-900 focus:border-gold-500 rounded px-4 py-3.5 text-xs text-[#faf9f6] focus:outline-none placeholder-neutral-600 transition-colors"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-[10px] uppercase tracking-widest text-neutral-400 font-bold">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          placeholder="e.g. michael@example.com"
                          className="w-full bg-[#0c0c0c] border border-neutral-900 focus:border-gold-500 rounded px-4 py-3.5 text-xs text-[#faf9f6] focus:outline-none placeholder-neutral-600 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-[10px] uppercase tracking-widest text-neutral-400 font-bold">
                          Phone Number (Optional)
                        </label>
                        <input
                          type="tel"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          placeholder="e.g. +1 (555) 000-0000"
                          className="w-full bg-[#0c0c0c] border border-neutral-900 focus:border-gold-500 rounded px-4 py-3.5 text-xs text-[#faf9f6] focus:outline-none placeholder-neutral-600 transition-colors"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-[10px] uppercase tracking-widest text-neutral-400 font-bold">
                          Preferred Service Category
                        </label>
                        <select
                          value={contactForm.subject}
                          onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                          className="w-full bg-[#0c0c0c] border border-neutral-900 focus:border-gold-500 rounded px-4 py-3.5 text-xs text-neutral-300 focus:outline-none transition-colors"
                        >
                          <option value="Bespoke Custom Design">Bespoke Custom Design</option>
                          <option value="Certified Jewelry Appraisal">Certified Jewelry Appraisal</option>
                          <option value="Gold & Diamond Trading">Gold &amp; Diamond Trading</option>
                          <option value="Watch Service / Repairs">Watch Service / Repairs</option>
                          <option value="General Inquiry">General Inquiry</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[10px] uppercase tracking-widest text-neutral-400 font-bold">
                        Detailed Message / Project Idea *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="Please describe your dream piece, desired gemstone shape, carat-weight, or sizing inquiries..."
                        className="w-full bg-[#0c0c0c] border border-neutral-900 focus:border-gold-500 rounded px-4 py-3.5 text-xs text-[#faf9f6] focus:outline-none placeholder-neutral-600 transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full max-w-full sm:max-w-md md:max-w-lg mx-auto bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-neutral-950 font-bold text-[10px] sm:text-xs uppercase tracking-widest py-3.5 sm:py-4 px-4 sm:px-6 rounded-sm shadow-xl hover:shadow-gold-500/20 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 text-center"
                    >
                      <Send className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">Submit Secure Appointment Request</span>
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-12 space-y-4"
                  >
                    <div className="w-16 h-16 bg-gold-400/10 border border-gold-400/30 rounded-full flex items-center justify-center">
                      <Check className="w-8 h-8 text-gold-400" />
                    </div>
                    <h3 className="text-2xl font-serif text-white">Inquiry Received Successfully</h3>
                    <p className="text-neutral-400 text-xs md:text-sm max-w-md leading-relaxed font-light">
                      Thank you, {contactForm.name}. One of our senior master appraisers will personally review your request and get in touch with you within the next 24 business hours to lock in your private consultation slot.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>


      {/* ----------------- 12. CALL TO ACTION ----------------- */}
      <section className="py-24 bg-gradient-to-b from-[#0c0c0c] to-[#080808] relative border-t border-neutral-900">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-8 relative z-10">
          <span className="inline-flex items-center space-x-1 text-xs font-bold tracking-[0.3em] uppercase text-gold-400">
            <Sparkle className="w-3 h-3 text-gold-400" />
            <span>Own An Heirloom Masterpiece</span>
          </span>
          
          <h2 className="text-3xl md:text-6xl font-serif text-[#faf9f6] font-light leading-tight">
            Let&apos;s Design Your Dream Piece Together
          </h2>
          
          <p className="max-w-2xl mx-auto text-neutral-400 text-xs md:text-sm leading-relaxed font-light">
            Bring any reference photo, sketch, or vague inspiration. Our veteran CAD engineers and gold-forgers will manufacture it to premium international specifications, completely customized to your preference and gemstone certification.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="w-full sm:w-auto bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 text-neutral-950 px-8 py-4 text-xs font-bold uppercase tracking-widest rounded shadow-xl hover:shadow-gold-500/20 transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Start Custom Sketch
            </a>
            <a
              href="tel:+13476800568"
              className="w-full sm:w-auto bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-800 px-8 py-4 text-xs font-bold uppercase tracking-widest rounded transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Phone className="w-3.5 h-3.5 text-gold-400" />
              <span>Call Senior Appraiser</span>
            </a>
          </div>
        </div>
      </section>


      {/* ----------------- 13. FOOTER ----------------- */}
      <footer className="bg-[#080808] text-neutral-400 text-xs py-16 border-t border-neutral-950">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-neutral-900/40">
          
          {/* Col 1 Brand */}
          <div className="lg:col-span-5 space-y-4">
            <a href="#" className="flex flex-col group">
              <span className="text-lg md:text-xl font-serif tracking-[0.25em] text-[#faf9f6] group-hover:text-gold-400 transition-colors">
                SIMON &amp; SONS
              </span>
              <span className="text-[8px] tracking-[0.4em] text-gold-400 font-sans uppercase">
                Jewelry Exchange
              </span>
            </a>
            <p className="max-w-sm text-neutral-500 leading-relaxed font-light pt-2">
              Bespoke master jewelry, bridal bands, premium watch repair services, and the highest transparent gold valuations in Queens, NY since 1989.
            </p>
            {/* Social Media Brand Icons */}
            <div className="flex items-center space-x-3 pt-3 lg:hidden">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center text-white shadow-md hover:scale-110 transition-transform duration-300"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#1877F2] flex items-center justify-center text-white shadow-md hover:scale-110 transition-transform duration-300"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M14 13.5h2.5l1-3.5H14V7.8c0-.9.3-1.5 1.5-1.5H17V3.1c-.3-.04-.9-.1-1.8-.1-2.7 0-4.2 1.6-4.2 4.7v2.3H8v3.5h3V21h3v-7.5z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#FF0000] flex items-center justify-center text-white shadow-md hover:scale-110 transition-transform duration-300"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-black border border-neutral-800 flex items-center justify-center text-white shadow-md hover:scale-110 transition-transform duration-300"
                aria-label="Twitter/X"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>

            {/* Desktop Brand-Colored Icons */}
            <div className="hidden lg:flex items-center space-x-3 pt-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center text-white shadow-md hover:scale-110 transition-transform duration-300"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#1877F2] flex items-center justify-center text-white shadow-md hover:scale-110 transition-transform duration-300"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M14 13.5h2.5l1-3.5H14V7.8c0-.9.3-1.5 1.5-1.5H17V3.1c-.3-.04-.9-.1-1.8-.1-2.7 0-4.2 1.6-4.2 4.7v2.3H8v3.5h3V21h3v-7.5z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#FF0000] flex items-center justify-center text-white shadow-md hover:scale-110 transition-transform duration-300"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-black border border-neutral-800 flex items-center justify-center text-white shadow-md hover:scale-110 transition-transform duration-300"
                aria-label="Twitter/X"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2 Quick links */}
          <div className="lg:col-span-3 space-y-4">
            <span className="block text-[10px] uppercase tracking-widest text-neutral-300 font-bold">
              Services &amp; Vault
            </span>
            <ul className="space-y-2.5 font-light">
              <li><a href="#collections" className="hover:text-gold-400 transition-colors">Bridal Engagement Bands</a></li>
              <li><a href="#collections" className="hover:text-gold-400 transition-colors">Gold &amp; Diamond Cuffs</a></li>
              <li><a href="#why-choose-us" className="hover:text-gold-400 transition-colors">Jewelry Exchange &amp; Selling</a></li>
              <li><a href="#collections" className="hover:text-gold-400 transition-colors">Certified Appraisals</a></li>
              <li><a href="#collections" className="hover:text-gold-400 transition-colors">Master Watch Repairs</a></li>
            </ul>
          </div>

          {/* Col 3 Timings info */}
          <div className="lg:col-span-4 space-y-4">
            <span className="block text-[10px] uppercase tracking-widest text-neutral-300 font-bold">
              Boutique Location
            </span>
            <div className="space-y-3 font-light text-neutral-500">
              <p className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-neutral-600 shrink-0 mt-0.5" />
                <span>94-15 63rd Dr, Rego Park, NY 11374</span>
              </p>
              <p className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-neutral-600 shrink-0" />
                <span>+1 (347) 680-0568</span>
              </p>
              <p className="flex items-start space-x-2">
                <Clock className="w-4 h-4 text-neutral-600 shrink-0 mt-0.5" />
                <span>
                  Mon - Thu: 10:00 AM - 6:00 PM<br />
                  Fri: 10:00 AM - 4:00 PM (Sat Closed) <br />
                  Sun: 11:00 AM - 5:00 PM
                </span>
              </p>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-600 text-[10px]">
          <p>© {new Date().getFullYear()} Simon &amp; Sons Jewelry Exchange. All Rights Reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-gold-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gold-400 transition-colors">GIA Guidelines</a>
          </div>
        </div>
      </footer>


      {/* ----------------- LIGHTBOX GALLERY MODAL ----------------- */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 bg-neutral-950/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm cursor-zoom-out"
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 text-white hover:text-gold-400 focus:outline-none p-2 bg-[#171717]/80 rounded-full border border-neutral-800"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev arrow */}
            <button
              onClick={handlePrevImage}
              className="absolute left-6 text-white hover:text-gold-400 focus:outline-none p-3 bg-[#171717]/80 rounded-full border border-neutral-800 hover:border-gold-400 transition-colors"
              aria-label="Previous Image"
            >
              <ChevronDown className="w-6 h-6 rotate-90" />
            </button>

            {/* Next arrow */}
            <button
              onClick={handleNextImage}
              className="absolute right-6 text-white hover:text-gold-400 focus:outline-none p-3 bg-[#171717]/80 rounded-full border border-neutral-800 hover:border-gold-400 transition-colors"
              aria-label="Next Image"
            >
              <ChevronDown className="w-6 h-6 -rotate-90" />
            </button>

            {/* Central content card */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full bg-[#111111] border border-neutral-900 rounded overflow-hidden shadow-2xl cursor-default"
            >
              <div className="grid grid-cols-1 md:grid-cols-12">
                
                {/* Photo space */}
                <div className="md:col-span-8 aspect-video md:aspect-auto md:h-[500px] bg-black">
                  <img
                    src={GALLERY_IMAGES[lightboxIndex].url}
                    alt={GALLERY_IMAGES[lightboxIndex].title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Description details */}
                <div className="md:col-span-4 p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <span className="text-[10px] tracking-widest text-gold-400 uppercase font-bold">
                      {GALLERY_IMAGES[lightboxIndex].category}
                    </span>
                    <h3 className="text-2xl font-serif text-white leading-snug">
                      {GALLERY_IMAGES[lightboxIndex].title}
                    </h3>
                    <div className="h-[1px] w-12 bg-gold-500"></div>
                    <p className="text-xs text-neutral-400 leading-relaxed font-light">
                      Captured directly from our Rego Park design benches. Every element is set and hand-checked under complex optical microscopes for maximum light refraction.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setLightboxIndex(null);
                      const contactSection = document.getElementById('contact');
                      if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full bg-gradient-to-r from-gold-600 to-gold-500 text-neutral-950 font-bold text-xs uppercase tracking-widest py-3.5 rounded text-center"
                  >
                    Discuss Bespoke Project
                  </button>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* ----------------- PRODUCT ENQUIRY MODAL ----------------- */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-950/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full bg-[#111111] border border-neutral-900 rounded overflow-hidden shadow-2xl p-6 md:p-8 space-y-6 relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-white focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-4 pb-4 border-b border-neutral-900">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 object-cover rounded border border-neutral-800"
                />
                <div>
                  <span className="text-[10px] text-gold-400 uppercase tracking-widest font-bold">
                    {selectedProduct.category} Enquiry
                  </span>
                  <h3 className="text-xl font-serif text-white">{selectedProduct.name}</h3>
                  <p className="text-xs text-neutral-400 font-mono font-semibold pt-0.5">
                    Est. Value: ${selectedProduct.price.toLocaleString()}
                  </p>
                </div>
              </div>

              {!enquirySuccess ? (
                <form onSubmit={handleEnquirySubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[9px] uppercase tracking-widest text-neutral-400 font-bold">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={enquiryForm.name}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                        placeholder="e.g. Eleanor Vance"
                        className="w-full bg-[#0c0c0c] border border-neutral-900 focus:border-gold-500 rounded px-3 py-2.5 text-xs text-[#faf9f6] focus:outline-none placeholder-neutral-700 transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[9px] uppercase tracking-widest text-neutral-400 font-bold">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={enquiryForm.email}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                        placeholder="eleanor@example.com"
                        className="w-full bg-[#0c0c0c] border border-neutral-900 focus:border-gold-500 rounded px-3 py-2.5 text-xs text-[#faf9f6] focus:outline-none placeholder-neutral-700 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[9px] uppercase tracking-widest text-neutral-400 font-bold">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={enquiryForm.phone}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                      placeholder="+1 (555) 123-4567"
                      className="w-full bg-[#0c0c0c] border border-neutral-900 focus:border-gold-500 rounded px-3 py-2.5 text-xs text-[#faf9f6] focus:outline-none placeholder-neutral-700 transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[9px] uppercase tracking-widest text-neutral-400 font-bold">
                      Personal Message &amp; Diamond Preferences
                    </label>
                    <textarea
                      rows={3}
                      value={enquiryForm.message}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                      className="w-full bg-[#0c0c0c] border border-neutral-900 focus:border-gold-500 rounded px-3 py-2.5 text-xs text-[#faf9f6] focus:outline-none transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-gold-600 to-gold-500 text-neutral-950 font-bold text-xs uppercase tracking-widest py-3.5 rounded shadow-xl hover:shadow-gold-500/20 transform hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Submit Private Enquiry
                  </button>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-6 space-y-3">
                  <div className="w-12 h-12 bg-gold-400/10 border border-gold-400/30 rounded-full flex items-center justify-center">
                    <Check className="w-6 h-6 text-gold-400" />
                  </div>
                  <h4 className="text-xl font-serif text-white font-medium">Enquiry Successfully Logged</h4>
                  <p className="text-neutral-400 text-xs max-w-sm leading-relaxed font-light">
                    Thank you. A master jeweler from Simon &amp; Sons will prepare the technical dossiers, GIA cert sheets, and private viewing slots for the &ldquo;{selectedProduct.name}&rdquo; and email you shortly.
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ----------------- MASTERPIECE GIA APPRAISAL MODAL ----------------- */}
      <AnimatePresence>
        {selectedMasterpiece && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMasterpiece(null)}
            className="fixed inset-0 bg-neutral-950/95 z-50 flex items-center justify-center p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl w-full bg-[#111111] border border-neutral-900 rounded overflow-hidden shadow-2xl relative flex flex-col md:flex-row h-[90vh] md:h-auto max-h-[800px]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMasterpiece(null)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-white focus:outline-none z-30 bg-neutral-950/80 p-1.5 rounded-full border border-neutral-800"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Side: High-Resolution Media Area */}
              <div className="w-full md:w-1/2 relative bg-neutral-950 flex flex-col justify-between h-[280px] md:h-auto">
                <img
                  src={selectedMasterpiece.url}
                  alt={selectedMasterpiece.alt}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/40 z-10"></div>
                
                {/* Visual tags */}
                <div className="relative z-20 p-6 flex flex-col justify-between h-full">
                  <span className="self-start bg-neutral-950/90 text-gold-400 text-[9px] tracking-widest uppercase font-bold px-3 py-1.5 rounded-sm border border-gold-500/20 backdrop-blur-md">
                    {selectedMasterpiece.category}
                  </span>
                  <div>
                    <h3 className="text-2xl font-serif text-white leading-tight font-light drop-shadow-md">
                      {selectedMasterpiece.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Right Side: Specifications and Certified Appraisal */}
              <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto space-y-6 bg-[#111111]">
                <div className="space-y-6">
                  {/* Narrative description */}
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-widest text-gold-400 font-bold block">Artisan Provenance</span>
                    <p className="text-neutral-300 text-xs leading-relaxed font-light font-sans">
                      {selectedMasterpiece.description}
                    </p>
                  </div>

                  {/* Certified Specifications list */}
                  <div className="space-y-3">
                    <span className="text-[10px] uppercase tracking-widest text-gold-400 font-bold block">Certified Specifications</span>
                    <ul className="space-y-2 text-[11px] text-neutral-400 font-sans">
                      {selectedMasterpiece.specs.map((spec: string, sIdx: number) => (
                        <li key={sIdx} className="flex items-start space-x-2">
                          <Check className="w-3.5 h-3.5 text-gold-500 shrink-0 mt-0.5" />
                          <span className="leading-tight">{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* GIA Certified Appraisal Docket */}
                  <div className="bg-[#0a0a0a] border border-gold-500/10 rounded p-4 space-y-3 relative overflow-hidden">
                    {/* Background seal watermarked */}
                    <div className="absolute -right-6 -bottom-6 w-24 h-24 text-gold-500/5 pointer-events-none">
                      <Award className="w-full h-full" />
                    </div>
                    <div className="flex items-center space-x-2 pb-2 border-b border-neutral-900">
                      <ShieldCheck className="w-4 h-4 text-gold-400" />
                      <span className="text-[10px] tracking-widest text-[#faf9f6] uppercase font-bold">GIA Certified Valuation Docket</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-left pt-1">
                      <div>
                        <span className="block text-[8px] uppercase tracking-wider text-neutral-500 font-medium">Registry Number</span>
                        <span className="text-[11px] text-[#faf9f6] font-mono font-bold">{selectedMasterpiece.appraisal.certNumber}</span>
                      </div>
                      <div>
                        <span className="block text-[8px] uppercase tracking-wider text-neutral-500 font-medium">Certified Valuation</span>
                        <span className="text-[11px] text-gold-400 font-mono font-bold">${selectedMasterpiece.appraisal.estimatedValue.toLocaleString()} USD</span>
                      </div>
                      <div className="col-span-2">
                        <span className="block text-[8px] uppercase tracking-wider text-neutral-500 font-medium">Registered Custodian</span>
                        <span className="text-[10px] text-neutral-300 font-sans font-light">{selectedMasterpiece.appraisal.registeredOwner}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Private Appointment Call to Action */}
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSelectedProduct({
                        id: selectedMasterpiece.title,
                        name: selectedMasterpiece.title,
                        category: selectedMasterpiece.category,
                        price: selectedMasterpiece.appraisal.estimatedValue,
                        image: selectedMasterpiece.url,
                        description: selectedMasterpiece.description,
                        specs: selectedMasterpiece.specs,
                        stock: 1,
                        rating: 5,
                        reviews: 12
                      });
                      setSelectedMasterpiece(null);
                    }}
                    className="w-full bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-neutral-950 font-bold text-xs uppercase tracking-widest py-3.5 rounded-sm shadow-xl hover:shadow-gold-500/10 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-neutral-950 animate-pulse" />
                    <span>Book Showroom Viewing</span>
                  </button>
                  <p className="text-center text-[9px] text-neutral-500 pt-2 font-light">
                    *Requires 24-hour advanced scheduling for secure showroom transit from vaults.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ----------------- PRIVATE ENQUIRY WISHLIST SLIDE-OVER DRAWER ----------------- */}
      <AnimatePresence>
        {isWishlistOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsWishlistOpen(false)}
              className="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs"
            />

            {/* Slider Container */}
            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10 z-50">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-screen max-w-md bg-[#111111] border-l border-neutral-800 shadow-2xl flex flex-col h-full overflow-hidden"
              >
                {/* Header */}
                <div className="p-6 border-b border-neutral-900 flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <Heart className="w-5 h-5 text-gold-400 fill-gold-400 animate-pulse" />
                    <div>
                      <h4 className="text-lg font-serif text-white">Saved Vault Items</h4>
                      <p className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold leading-none mt-1">
                        {wishlist.length} {wishlist.length === 1 ? 'Piece' : 'Pieces'} In Reserve
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsWishlistOpen(false)}
                    className="text-neutral-400 hover:text-white focus:outline-none p-1.5 bg-neutral-950 rounded border border-neutral-800 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Items List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {wishlist.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center h-full py-12 space-y-4">
                      <div className="w-16 h-16 bg-neutral-950 rounded-full flex items-center justify-center border border-neutral-900 text-neutral-600">
                        <Heart className="w-6 h-6" />
                      </div>
                      <div>
                        <h5 className="text-white font-serif font-medium">Your Reserve is Empty</h5>
                        <p className="text-neutral-500 text-xs max-w-xs mt-1.5 leading-relaxed font-light">
                          Browse our master collections and click &ldquo;Save&rdquo; on any solitaire, timepiece, or custom bridal piece to build a coordinated private viewing inquiry.
                        </p>
                      </div>
                      <button
                        onClick={() => setIsWishlistOpen(false)}
                        className="text-xs bg-[#171717] hover:bg-gold-500 hover:text-neutral-950 border border-neutral-800 text-gold-400 px-5 py-2.5 rounded font-bold uppercase tracking-widest transition-all cursor-pointer"
                      >
                        Explore Collections
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-xs text-neutral-400 leading-relaxed font-light">
                        Review your saved selections. You can submit a single, consolidated enquiry for all items below to schedule a private viewing.
                      </p>
                      
                      {wishlist.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4 bg-neutral-950 p-3 rounded border border-neutral-900 justify-between">
                          <div className="flex items-center space-x-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              referrerPolicy="no-referrer"
                              className="w-12 h-12 object-cover rounded border border-neutral-800"
                            />
                            <div>
                              <h5 className="text-xs font-serif text-white font-medium line-clamp-1">{item.name}</h5>
                              <p className="text-[10px] text-gold-400 font-mono font-medium mt-0.5">${item.price.toLocaleString()}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => toggleWishlist(item)}
                            className="text-neutral-500 hover:text-red-400 p-1.5 bg-[#111111] hover:bg-neutral-900 border border-neutral-900 hover:border-neutral-800 rounded transition-colors cursor-pointer"
                            title="Remove from Reserve"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Combined Enquiry Form footer (only if items present) */}
                {wishlist.length > 0 && (
                  <div className="p-6 border-t border-neutral-900 bg-[#0d0d0d]">
                    {!combinedEnquirySuccess ? (
                      <form onSubmit={handleCombinedEnquirySubmit} className="space-y-3.5">
                        <h5 className="text-xs font-bold uppercase tracking-widest text-gold-400">Request Coordinated Viewing</h5>
                        
                        <div className="space-y-1.5">
                          <input
                            type="text"
                            required
                            placeholder="Your Name *"
                            value={combinedEnquiryForm.name}
                            onChange={(e) => setCombinedEnquiryForm({ ...combinedEnquiryForm, name: e.target.value })}
                            className="w-full bg-[#070707] border border-neutral-900 focus:border-gold-500 rounded px-3 py-2 text-xs text-white focus:outline-none placeholder-neutral-700 transition-colors"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <input
                            type="email"
                            required
                            placeholder="Email Address *"
                            value={combinedEnquiryForm.email}
                            onChange={(e) => setCombinedEnquiryForm({ ...combinedEnquiryForm, email: e.target.value })}
                            className="w-full bg-[#070707] border border-neutral-900 focus:border-gold-500 rounded px-3 py-2 text-xs text-white focus:outline-none placeholder-neutral-700 transition-colors"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <input
                            type="tel"
                            placeholder="Phone Number (Optional)"
                            value={combinedEnquiryForm.phone}
                            onChange={(e) => setCombinedEnquiryForm({ ...combinedEnquiryForm, phone: e.target.value })}
                            className="w-full bg-[#070707] border border-neutral-900 focus:border-gold-500 rounded px-3 py-2 text-xs text-white focus:outline-none placeholder-neutral-700 transition-colors"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <textarea
                            rows={2}
                            placeholder="Specific notes or scheduling preferences..."
                            value={combinedEnquiryForm.message}
                            onChange={(e) => setCombinedEnquiryForm({ ...combinedEnquiryForm, message: e.target.value })}
                            className="w-full bg-[#070707] border border-neutral-900 focus:border-gold-500 rounded px-3 py-2 text-xs text-white focus:outline-none placeholder-neutral-700 transition-colors resize-none"
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-neutral-950 font-bold text-xs uppercase tracking-widest py-3 rounded shadow-lg shadow-gold-500/10 hover:shadow-gold-500/25 transition-all cursor-pointer"
                        >
                          Request Multi-Item Viewing ({wishlist.length})
                        </button>
                      </form>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center py-4 space-y-2.5">
                        <div className="w-10 h-10 bg-gold-400/10 border border-gold-400/30 rounded-full flex items-center justify-center">
                          <Check className="w-5 h-5 text-gold-400" />
                        </div>
                        <h5 className="text-sm font-serif text-white font-medium">Coordinated Enquiry Submitted</h5>
                        <p className="text-neutral-400 text-[11px] leading-relaxed font-light">
                          Your reservation docket containing all {wishlist.length} selected items has been sent to our lead gemologist. We will schedule a VIP viewing and contact you.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* ----------------- FLOATING CONTACT WIDGET ----------------- */}
      <div className="fixed right-4 bottom-6 sm:right-6 sm:bottom-8 z-40 flex flex-col space-y-2.5">
        {/* Phone Widget */}
        <a
          href="tel:+13476800568"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-2xl border border-blue-400/25 hover:scale-105 active:scale-95 transition-all duration-300"
          title="Call Showroom"
        >
          <Phone className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
        </a>

        {/* WhatsApp Widget */}
        <a
          href="https://wa.me/13476800568"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-2xl border border-green-400/25 hover:scale-105 active:scale-95 transition-all duration-300"
          title="WhatsApp Chat"
        >
          <svg
            className="w-4.5 h-4.5 sm:w-5 sm:h-5 fill-current text-white"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.528 2.017 14.077.99 11.45.99c-5.438 0-9.863 4.371-9.867 9.801-.001 1.774.475 3.5 1.378 5.01L1.93 22.07l6.47-1.697c1.513.824 3.123 1.258 4.757 1.259zM17.433 14.3c-.322-.16-.1.192.1-.118-.322-.16-1.9-.937-2.193-1.042-.294-.105-.508-.158-.722.158-.215.316-.831 1.042-1.018 1.252-.187.21-.375.236-.697.078-.322-.16-1.36-.5-2.59-1.6c-.958-.854-1.604-1.91-1.792-2.226-.188-.316-.02-.486.139-.643.143-.142.321-.375.482-.562.16-.187.214-.316.321-.527.108-.21.054-.395-.027-.553-.08-.158-.722-1.737-.99-2.382-.261-.628-.528-.543-.722-.553-.187-.009-.402-.01-.617-.01-.215 0-.564.08-.86.411-.295.316-1.127 1.101-1.127 2.685 0 1.584 1.153 3.114 1.313 3.325.16.21 2.27 3.476 5.5 4.876.768.332 1.368.531 1.833.678.772.245 1.474.21 2.029.128.619-.092 1.9-.776 2.167-1.49.267-.711.267-1.319.187-1.449-.08-.13-.294-.21-.616-.37z" />
          </svg>
        </a>

        {/* AI Luxury Chat Assistant Toggle */}
        <button
          onClick={() => setAiChatOpen(true)}
          className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 text-neutral-950 flex items-center justify-center shadow-2xl border border-gold-400/20 hover:border-gold-300 hover:scale-110 active:scale-95 hover:shadow-gold-500/20 transition-all duration-500 group"
          title="AI Luxury Assistant"
        >
          {/* Subtle slow-pulse background ring */}
          <span className="absolute inset-0 rounded-full bg-gold-400/20 animate-ping pointer-events-none" style={{ animationDuration: '3s' }}></span>
          <Sparkles className="w-4.5 h-4.5 sm:w-5 sm:h-5 transform group-hover:rotate-12 transition-transform duration-500" />
        </button>
      </div>

      {/* ----------------- AI LUXURY CHAT ASSISTANT MODAL ----------------- */}
      <AnimatePresence>
        {aiChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed right-4 bottom-24 sm:right-6 sm:bottom-28 z-50 w-[calc(100vw-32px)] sm:w-[365px] h-[480px] bg-[#111111]/95 backdrop-blur-md border border-neutral-800/80 rounded-xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-neutral-900 to-[#141414] border-b border-neutral-800 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-gold-400/10 border border-gold-400/30 flex items-center justify-center text-gold-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-serif text-white font-medium">Simon &amp; Sons AI</h4>
                  <span className="text-[9px] tracking-widest uppercase text-gold-400 font-semibold block leading-none">Luxury Guide</span>
                </div>
              </div>
              <button
                onClick={() => setAiChatOpen(false)}
                className="text-neutral-400 hover:text-white focus:outline-none p-1 bg-neutral-950 rounded-full border border-neutral-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0a0a0a]">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded px-3.5 py-2.5 text-xs leading-relaxed font-light ${
                      msg.sender === 'user'
                        ? 'bg-gold-500 text-neutral-950 font-medium rounded-tr-none'
                        : 'bg-neutral-900 text-neutral-300 rounded-tl-none border border-neutral-800/40'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-neutral-900 border border-neutral-800/40 rounded rounded-tl-none px-4 py-3 text-xs text-neutral-500 italic">
                    AI Guide is typing...
                  </div>
                </div>
              )}
              {/* Invisible scroll anchor */}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Suggestions list */}
            <div className="bg-[#0c0c0c] border-t border-neutral-900 px-3 py-2 flex flex-wrap gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none">
              {SUGGESTIONS.map((sug) => (
                <button
                  key={sug}
                  onClick={() => handleSendSuggested(sug)}
                  className="text-[10px] bg-neutral-950 hover:bg-neutral-850 text-neutral-300 border border-neutral-800 rounded px-2.5 py-1.5 transition-colors focus:outline-none shrink-0"
                >
                  {sug}
                </button>
              ))}
            </div>

            {/* Form Input */}
            <form onSubmit={handleChatSubmit} className="p-3 bg-[#111111] border-t border-neutral-900 flex space-x-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about diamonds, gold trades..."
                className="flex-1 bg-[#0c0c0c] border border-neutral-800 focus:border-gold-500 rounded px-3 py-2 text-xs text-[#faf9f6] focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="bg-gold-500 hover:bg-gold-400 text-neutral-950 p-2.5 rounded transition-colors focus:outline-none flex items-center justify-center shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
