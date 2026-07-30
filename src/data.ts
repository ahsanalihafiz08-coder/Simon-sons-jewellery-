export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  count: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  specs: string[];
  stock: number;
  isFeatured?: boolean;
}

// Dynamically glob and import all images in the directory to ensure Vite bundles them in production
const imageModules = (import.meta as any).glob('/src/assets/images/*.{jpg,jpeg,png,webp,gif}', { eager: true }) as Record<string, { default: string }>;

export function resolveImagePath(path: string): string {
  if (!path) return '';
  if (imageModules[path]) {
    return imageModules[path].default;
  }
  return path;
}

export interface WhyChooseUsItem {
  id: string;
  title: string;
  description: string;
  iconName: 'Award' | 'ShieldCheck' | 'Sparkles' | 'Gem' | 'Coins' | 'HeartHandshake';
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  content: string;
  rating: number;
  date: string;
  verified: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const COLLECTIONS_DATA: Collection[] = [
  {
    id: 'rings',
    name: 'Rings & Solitaires',
    description: 'Breathtaking engagement bands and statements featuring hand-selected GIA certified diamonds.',
    image: '/src/assets/images/solitaire_diamond_ring_1785259040831.jpg',
    count: '240+ Pieces'
  },
  {
    id: 'necklaces',
    name: 'Colliers & Necklaces',
    description: 'Chains, pendants, and dynamic custom necklaces that trace grace and capture premium light.',
    image: '/src/assets/images/regenerated_image_1785318876302.jpg',
    count: '180+ Pieces'
  },
  {
    id: 'earrings',
    name: 'Earrings & Studs',
    description: 'From timeless brilliant studs to chandelier drops, forged in platinum and high-karat gold.',
    image: '/src/assets/images/regenerated_image_1785318890290.jpg',
    count: '150+ Pieces'
  },
  {
    id: 'bracelets',
    name: 'Bangles & Bracelets',
    description: 'Delicate tennis bracelets and bold custom cuffs that elegantly wrap your wrist in gold.',
    image: '/src/assets/images/gold_tennis_bracelet_1785258954265.jpg',
    count: '110+ Pieces'
  },
  {
    id: 'watches',
    name: 'Master Watches',
    description: 'Curated luxury timepieces, vintage classics, and bespoke watch designs representing micro-mechanics.',
    image: '/src/assets/images/regenerated_image_1785318857474.jpg',
    count: '65+ Pieces'
  },
  {
    id: 'pendants',
    name: 'Pendants & Medallions',
    description: 'Hand-sculpted icons and initial medallions set in high-grade yellow, rose, and white gold.',
    image: '/src/assets/images/sapphire_gold_pendant_1785259006658.jpg',
    count: '95+ Pieces'
  },
  {
    id: 'bridal-sets',
    name: 'Custom Bridal Sets',
    description: 'Coordinated engagement rings and matching wedding bands forged together for perfect symmetry.',
    image: '/src/assets/images/regenerated_image_1785318865289.jpg',
    count: '120+ Sets'
  },
  {
    id: 'estate-jewelry',
    name: 'Estate & Vintage Gold',
    description: 'Rare, pre-owned luxury gold pieces and certified historic watch models hand-inspected for authenticity.',
    image: '/src/assets/images/vintage_signet_ring_1785259074588.jpg',
    count: '75+ Rare Finds'
  },
  {
    id: 'anklets',
    name: 'Fine Anklets',
    description: 'Delicate high-polish chains and custom charm-linked anklets designed for luxurious comfort.',
    image: '/src/assets/images/gold_tennis_bracelet_1785258954265.jpg',
    count: '40+ Pieces'
  }
];

export const COLLECTIONS: Collection[] = COLLECTIONS_DATA.map(c => ({
  ...c,
  image: resolveImagePath(c.image)
}));

const PRODUCTS_DATA: Product[] = [
  {
    id: 'p1',
    name: 'The Imperial Solitaire Ring',
    price: 24500,
    category: 'Rings',
    description: 'A striking emerald-cut center diamond, delicately set on a solid 18k platinum micro-pave band. Captures light with supreme clarity.',
    image: '/src/assets/images/solitaire_diamond_ring_1785259040831.jpg',
    specs: ['GIA Certified 2.5 Ct', 'Color: E', 'Clarity: VVS1', 'Platinum 950'],
    stock: 3,
    isFeatured: true
  },
  {
    id: 'p2',
    name: 'The Sovereign Filigree Pearl Choker',
    price: 18900,
    category: 'Necklaces',
    description: 'An ornate gold choker-style necklace featuring intricate filigree, small brilliant-cut diamonds, and elegant dangling pearl drops.',
    image: '/src/assets/images/regenerated_image_1785318876302.jpg',
    specs: ['18k Yellow Gold', 'Hand-Crafted Filigree', '0.85 Ctw Diamonds', 'Premium Natural Pearl Drops'],
    stock: 1,
    isFeatured: true
  },
  {
    id: 'p3',
    name: 'Aurelia Milanese Tennis Bracelet',
    price: 15200,
    category: 'Bracelets',
    description: 'Continuous ribbon of custom hand-set baguette-cut diamonds in 18k warm champagne gold, representing flawless fluid architecture.',
    image: '/src/assets/images/gold_tennis_bracelet_1785258954265.jpg',
    specs: ['18k Champagne Gold', 'Total Weight: 6.2 Ctw', 'Clarity: VS1-VS2', '7-inch Flexible Band'],
    stock: 0,
    isFeatured: true
  },
  {
    id: 'p4',
    name: 'The Royal Sovereign Emerald & Ruby Choker',
    price: 8750,
    category: 'Necklaces',
    description: 'A grand traditional gold choker necklace, intricately designed with elaborate filigree work, set with diamonds, rubies, and vibrant emeralds with elegant dangling pearls.',
    image: '/src/assets/images/regenerated_image_1785318879905.jpg',
    specs: ['3.2 Ct Natural Emeralds', 'Vivid Red Rubies', 'Intricate Filigree Design', '18k Yellow Gold & Pearls'],
    stock: 2,
    isFeatured: true
  },
  {
    id: 'p5',
    name: 'The Sovereign Gold Choker & Bridal Set',
    price: 31000,
    category: 'Necklaces',
    description: 'An elaborate traditional Indian bridal jewelry set in gold filigree, featuring a broad choker necklace, pendant, earrings, bangles, and a ring set with diamonds, rubies, emeralds, and pearls.',
    image: '/src/assets/images/regenerated_image_1785318865289.jpg',
    specs: ['18k Gold Filigree Choker', 'Complete Multi-Piece Bridal Set', 'Diamonds, Rubies, Emeralds', 'Elegant Dangling Pearls'],
    stock: 5,
    isFeatured: true
  },
  {
    id: 'p6',
    name: 'Empress Engraved Emerald Ring',
    price: 22800,
    category: 'Rings',
    description: 'An exceptional vivid green Colombian emerald, bordered by fine engravings and elegant diamonds in a regal vintage gold setting.',
    image: '/src/assets/images/engraved_emerald_ring_1785259021560.jpg',
    specs: ['3.1 Ct Colombian Emerald', 'Platinum & 18k Yellow Gold', '1.6 Ctw Diamonds', 'Handmade Engraved Setting'],
    stock: 0,
    isFeatured: true
  },
  {
    id: 'p7',
    name: 'The Majestic Sapphire Gold Pendant',
    price: 5400,
    category: 'Necklaces',
    description: 'An outstanding tear-drop deep blue sapphire pendant, suspended elegantly from a polished 18k yellow gold starburst medallion chain.',
    image: '/src/assets/images/sapphire_gold_pendant_1785259006658.jpg',
    specs: ['18k Yellow Gold', 'GIA Certified 1.2 Ct Sapphire', 'Clarity: VS1 Blue Sapphire', 'Adjustable 18-inch Chain'],
    stock: 4,
    isFeatured: true
  },
  {
    id: 'p8',
    name: 'The Stella Rose Gold Fluted Watch',
    price: 2850,
    category: 'Watches',
    description: 'An elegant luxury rose gold wristwatch featuring a fluted bezel, light peach sunburst dial adorned with diamond hour markers, and matching rose gold three-link bracelet.',
    image: '/src/assets/images/regenerated_image_1785318872982.jpg',
    specs: ['Rose Gold-Toned Case', 'Fluted Bezel', 'Diamond Hour Markers', 'Three-Link Oyster Bracelet'],
    stock: 2,
    isFeatured: true
  },
  {
    id: 'p9',
    name: 'The Royal Duo Watch & Tennis Bracelet Set',
    price: 16500,
    category: 'Watches',
    description: 'A sophisticated rose gold-toned wristwatch with a fluted bezel and dark sunburst dial, accompanied by a matching delicate rose gold diamond tennis bracelet.',
    image: '/src/assets/images/regenerated_image_1785318869610.jpg',
    specs: ['Swiss Movement Watch', 'Rose Gold-Toned Metal', 'Sparkling Diamond Accents', 'Matching Tennis Bracelet'],
    stock: 1,
    isFeatured: true
  },
  {
    id: 'p10',
    name: 'The Royal Heritage Gold Choker Set',
    price: 34500,
    category: 'Necklaces',
    description: 'An elaborate traditional Indian jewelry set, masterfully crafted from gold-toned filigree and adorned with brilliant white, red, and green stones, complete with delicate pearl drops.',
    image: '/src/assets/images/regenerated_image_1785318883689.jpg',
    specs: ['Multi-Stone Accented Choker', 'Matching Traditional Earrings', 'Exquisite Gold-Toned Filigree', 'Fine Pearl Droplets'],
    stock: 2,
    isFeatured: true
  },
  {
    id: 'p11',
    name: 'Aura Rose Gold Chronometer & Tennis Duo',
    price: 4600,
    category: 'Watches',
    description: 'A luxurious rose gold-toned jewelry set featuring a precision wristwatch with a rich chocolate-brown dial and fluted bezel, alongside a matching bezel-set diamond tennis bracelet.',
    image: '/src/assets/images/regenerated_image_1785318861577.jpg',
    specs: ['Luxury Watch & Bracelet Combo', 'Fluted Bezel & Chocolate Dial', '18k Rose Gold-Toned Finish', 'Bezel-Set Brilliant Diamonds'],
    stock: 4,
    isFeatured: true
  },
  {
    id: 'p12',
    name: 'The Metropolitan Open-Heart Chronograph',
    price: 7900,
    category: 'Watches',
    description: 'An exceptional rose gold-toned chronograph watch featuring an open-heart dial showing automatic movement, rose gold accents, and a dark brown alligator-patterned leather strap.',
    image: '/src/assets/images/regenerated_image_1785318857474.jpg',
    specs: ['Open-Heart Movement Window', 'Rose Gold-Toned Bezel', 'Dark Grey Multi-Subdial Face', 'Alligator Leather Strap'],
    stock: 3,
    isFeatured: true
  },
  {
    id: 'p13',
    name: 'The Sovereign Sapphire Tennis Bracelet',
    price: 14500,
    category: 'Bracelets',
    description: 'A breathtaking alignment of deep royal blue sapphires set continuously in a shimmering 18k white gold tennis bracelet, capturing premium royal light.',
    image: '/src/assets/images/sapphire_tennis_bracelet_1785259061119.jpg',
    specs: ['Deep Royal Blue Sapphires', '18k White Gold Setting', 'Total Weight: 5.4 Ctw', 'Intricate Safety Clasp'],
    stock: 2,
    isFeatured: true
  },
  {
    id: 'p14',
    name: 'L’Amour Brilliant Diamond Studs',
    price: 9200,
    category: 'Earrings',
    description: 'A pair of classic round brilliant-cut diamond solitaire stud earrings, elegantly set in a warm 18k yellow gold four-prong mounting.',
    image: '/src/assets/images/regenerated_image_1785318887334.jpg',
    specs: ['Total 1.90 Ctw Diamonds', 'Brilliant Round Cut', 'F Color, VVS2 Clarity', '18k Yellow Gold Mounts'],
    stock: 4,
    isFeatured: true
  },
  {
    id: 'p15',
    name: 'The Florentine Gold Bangle',
    price: 6200,
    category: 'Bracelets',
    description: 'A masterfully hand-engraved solid 18k yellow gold bangle featuring delicate Renaissance-style floral patterns.',
    image: '/src/assets/images/gold_geometric_bangle_1785258973051.jpg',
    specs: ['18k Solid Yellow Gold', 'Hand-Engraved florets', 'Width: 6mm', 'Sartorial Finish'],
    stock: 3,
    isFeatured: true
  },
  {
    id: 'p16',
    name: 'Princess Pave Gold Bangle',
    price: 19500,
    category: 'Bracelets',
    description: 'An ultra-premium modern 18k gold bangle set with rows of brilliant-cut diamonds in a meticulous hand-aligned pave setting.',
    image: '/src/assets/images/pave_gold_bangle_1785258991088.jpg',
    specs: ['Total Weight: 8.4 Ctw', 'E/F Color', 'VS1-VS2 Clarity', '18k Polished Gold Setting'],
    stock: 1,
    isFeatured: true
  },
  {
    id: 'p17',
    name: 'The Duchess Diamond Halo Studs',
    price: 13800,
    category: 'Earrings',
    description: 'A classic pair of exquisite halo stud earrings, masterfully crafted from warm gold-toned metal and adorned with a brilliant cluster of micro-pavé diamonds.',
    image: '/src/assets/images/regenerated_image_1785318890290.jpg',
    specs: ['Brilliant Round Centers', 'Micro-Pavé Halo Diamond Borders', '18k Yellow Gold-Toned Mount', 'Secure Friction Backs'],
    stock: 2,
    isFeatured: true
  },
  {
    id: 'p18',
    name: 'Heritage Solitaire Diamond Studs',
    price: 28900,
    category: 'Earrings',
    description: 'A classic pair of round brilliant-cut solitaire diamond stud earrings set in high-polish four-prong yellow gold mountings against a velvet backdrop.',
    image: '/src/assets/images/regenerated_image_1785318893255.jpg',
    specs: ['Total 2.5 Ctw Diamonds', 'Brilliant Round Cut', '18k Yellow Gold', 'Threaded Safety Posts'],
    stock: 2,
    isFeatured: true
  },
  {
    id: 'p19',
    name: 'Valkyrie Diamond Halo Studs',
    price: 4800,
    category: 'Earrings',
    description: 'A stunning pair of elegant halo stud earrings featuring round brilliant-cut center stones surrounded by a delicate border of small accent diamonds set in yellow gold.',
    image: '/src/assets/images/regenerated_image_1785318896371.jpg',
    specs: ['Round Brilliant Centers', 'Diamond Halo Accents', '14k Yellow Gold', 'Perfect Daily Wear Size'],
    stock: 4,
    isFeatured: true
  },
  {
    id: 'p20',
    name: 'Celestial Sapphire Starburst Pendant',
    price: 3900,
    category: 'Necklaces',
    description: 'An elegant sapphire gemstone centered inside a high-polish 18k yellow gold starburst silhouette on a fine chain.',
    image: '/src/assets/images/sapphire_gold_pendant_1785259006658.jpg',
    specs: ['18k Yellow Gold', 'GIA Certified 1.2 Ct Sapphire', 'Star-Cut Setting', 'Adjustable 18-inch Chain'],
    stock: 5,
    isFeatured: true
  },
  {
    id: 'p21',
    name: 'The Riviera Fluted Rose Watch',
    price: 3400,
    category: 'Watches',
    description: 'An elegant rose gold wristwatch featuring a fluted bezel, light peach dial adorned with diamond hour markers, and a matching rose gold three-link bracelet.',
    image: '/src/assets/images/regenerated_image_1785318872982.jpg',
    specs: ['Luxury Rose Gold Case', 'Diamond Hour Markers', 'Precision Swiss Movement', 'Fluted Bezel Design'],
    stock: 3,
    isFeatured: true
  },
  {
    id: 'p22',
    name: 'Aurelia Sovereign Heritage Necklace',
    price: 1950,
    category: 'Necklaces',
    description: 'A grand, traditional gold choker-style necklace intricately designed with filigree work, set with diamonds, rubies, and vibrant emeralds with dangling pearls.',
    image: '/src/assets/images/regenerated_image_1785318879905.jpg',
    specs: ['Traditional Gold Choker', 'Ethically Sourced Emeralds & Rubies', 'Handcrafted Filigree', 'Fine Pearl Accents'],
    stock: 6,
    isFeatured: true
  },
  {
    id: 'p23',
    name: 'Amour Chrono & Tennis Bracelet Set',
    price: 18500,
    category: 'Watches',
    description: 'A sophisticated rose gold-toned wristwatch featuring a fluted bezel and dark sunburst dial, accompanied by a matching delicate rose gold diamond tennis bracelet.',
    image: '/src/assets/images/regenerated_image_1785318869610.jpg',
    specs: ['Duo Styling Set', 'Rose Gold fluted bezel watch', 'Diamond tennis bracelet', 'Elegant stacking display'],
    stock: 2,
    isFeatured: true
  },
  {
    id: 'p24',
    name: 'The Royal Solitaire Bridal Ring',
    price: 21000,
    category: 'Rings',
    description: 'A magnificent solitaire engagement ring showcasing a brilliant round-cut center diamond in a high-polish, multi-prong platinum setting.',
    image: '/src/assets/images/solitaire_diamond_ring_1785259040831.jpg',
    specs: ['GIA Certified 1.9 Ct Center', 'Ideal Brilliant Cut', 'Platinum 950 Mount', 'High-Polish Finish'],
    stock: 2,
    isFeatured: true
  },
  {
    id: 'p25',
    name: 'Vintage Victorian Signet Ring',
    price: 4200,
    category: 'Rings',
    description: 'An authentic late 19th-century Victorian signet ring in heavy 18k yellow gold, hand-engraved with fine family heraldic details.',
    image: '/src/assets/images/vintage_signet_ring_1785259074588.jpg',
    specs: ['Circa 1890', '18k Yellow Gold', 'Hand-Engraved Sigil', 'Excellent Condition'],
    stock: 1,
    isFeatured: true
  },
  {
    id: 'p26',
    name: 'Classic Estate Diamond Studs',
    price: 7800,
    category: 'Earrings',
    description: 'A pair of classic round brilliant-cut diamond stud earrings, elegantly set in a warm-toned yellow gold four-prong mounting.',
    image: '/src/assets/images/regenerated_image_1785318887334.jpg',
    specs: ['Circa 1930 Vintage Style', 'Round Brilliant Cut', 'Warm Yellow Gold Setting', 'Exceptional Fire & Lustre'],
    stock: 1,
    isFeatured: true
  },
  {
    id: 'p27',
    name: 'Edwardian Sapphire Filigree Pendant',
    price: 5900,
    category: 'Necklaces',
    description: 'An exquisite Edwardian era pendant showcasing a rich cornflower-blue sapphire suspended in an intricate lace-like platinum-on-gold filigree frame.',
    image: '/src/assets/images/sapphire_gold_pendant_1785259006658.jpg',
    specs: ['Circa 1910', '1.2 Ct Natural Sapphire', 'Platinum & 15k Gold', 'Intricate openwork'],
    stock: 1,
    isFeatured: true
  },
  {
    id: 'p28',
    name: 'Aura Halo Diamond Studs',
    price: 2400,
    category: 'Earrings',
    description: 'A pair of elegant halo stud earrings featuring round brilliant-cut center stones surrounded by a delicate border of small accent diamonds.',
    image: '/src/assets/images/regenerated_image_1785318896371.jpg',
    specs: ['Solitaire Brilliant Centers', 'Diamond Halo Borders', '18k Yellow Gold Mounts', 'Friction Backing Locks'],
    stock: 5,
    isFeatured: true
  },
  {
    id: 'p29',
    name: 'Vintage Chronometer & Tennis Bracelet Set',
    price: 3100,
    category: 'Watches',
    description: 'A luxurious rose gold jewelry set featuring a Swiss-movement wristwatch with a rich chocolate-brown dial and fluted bezel, alongside a matching bezel-set diamond tennis bracelet.',
    image: '/src/assets/images/regenerated_image_1785318861577.jpg',
    specs: ['Rolex Datejust Vintage Style', 'Swiss Automatic Movement', 'Rose Gold Finish', 'Bezel-Set Diamond Bracelet'],
    stock: 3,
    isFeatured: true
  },
  {
    id: 'p30',
    name: 'Florentine Diamond Solitaire Studs',
    price: 2900,
    category: 'Earrings',
    description: 'A classic pair of round brilliant-cut solitaire diamond stud earrings, set in elegant high-polish four-prong yellow gold mountings.',
    image: '/src/assets/images/regenerated_image_1785318893255.jpg',
    specs: ['Round Brilliant Diamonds', '18k Yellow Gold Prongs', 'Timeless Solitaire Style', 'Friction Clutch Backs'],
    stock: 2,
    isFeatured: true
  }
];

export const PRODUCTS: Product[] = PRODUCTS_DATA.map(p => ({
  ...p,
  image: resolveImagePath(p.image)
}));

export const WHY_CHOOSE_US: WhyChooseUsItem[] = [
  {
    id: 'w1',
    title: 'Heritage & Experience',
    description: 'Simon & Sons is a multi-generational legacy shop operating on mutual trust, unmatched local expertise, and master jewelry certification.',
    iconName: 'Award'
  },
  {
    id: 'w2',
    title: 'Certified Authenticity',
    description: 'Every diamond and high-end gemstone carries certified documentation from GIA or EGL, ensuring absolute purity, weight, and ethical sourcing.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'w3',
    title: 'Master Craftsmanship',
    description: 'Our in-house design studio blends advanced 3D CAD modeling with traditional bench techniques for bespoke, heirloom-quality creations.',
    iconName: 'Sparkles'
  },
  {
    id: 'w4',
    title: 'Fair Exchange Valuation',
    description: 'We are Rego Park’s premier exchange. Receive the highest immediate cash payouts, transparent carat-weight grading, and competitive trade-in values.',
    iconName: 'Coins'
  },
  {
    id: 'w5',
    title: 'White-Glove Service',
    description: 'Our consultants provide individualized luxury attention, absolute discretion, custom consultations, and comprehensive lifecycle care.',
    iconName: 'HeartHandshake'
  },
  {
    id: 'w6',
    title: 'Lifetime Warranty & Care',
    description: 'We stand behind our family creations. Every piece purchased comes with an absolute lifetime structural warranty and complimentary annual stone inspection.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'w7',
    title: 'Secure Vault Storage',
    description: 'All custom items in progress and raw precious materials are housed in high-security vaults equipped with multi-factor biometric safes and full Lloyds coverage.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'w8',
    title: 'Transparent Gold Trading',
    description: 'Observe weight testing and purity analysis under high-magnification video feeds. No behind-the-counter valuations; absolute transparency at all times.',
    iconName: 'Coins'
  },
  {
    id: 'w9',
    title: 'Private Lounge Viewings',
    description: 'Book a private VIP lounge viewing session with our lead gemologist to view select pieces in a calm, secure, and personalized showroom atmosphere.',
    iconName: 'Sparkles'
  },
  {
    id: 'w10',
    title: 'Insurance Assistance',
    description: 'We provide detailed, certified appraisals and direct assistance to simplify securing comprehensive coverage for your valuable heirlooms.',
    iconName: 'ShieldCheck'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Visionary Consultation',
    description: 'We sit down with you in our private showroom or via digital consultation to detail your visual concept, preference, and ideal metal/gems.'
  },
  {
    number: '02',
    title: '3D CAD Architectural Drafting',
    description: 'Our master designers render a flawless 3D model of your custom design, letting you review angles, dimensions, and proportions before forging.'
  },
  {
    number: '03',
    title: 'Master Gemstone Selection',
    description: 'We hand-pick and ethically source perfect stones from our global networks, balancing cut, color, clarity, and certified GIA carats.'
  },
  {
    number: '04',
    title: 'Traditional Hand-Forging',
    description: 'At the master jeweler’s bench, metals are meticulously melted, hand-pulled, shaped, and custom claw-set to maximize safety and reflection.'
  },
  {
    number: '05',
    title: 'Polishing & Sealed Appraisal',
    description: 'The completed treasure undergoes multi-stage hand polishing, detailed microscopical inspection, and official certified appraisal sealing.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Michael R.',
    location: 'Forest Hills, NY',
    content: 'Simon and his sons helped me design a custom engagement ring that surpassed all expectations. Their transparency, GIA certifications, and patience made the process smooth. An absolutely world-class luxury boutique right in Queens!',
    rating: 5,
    date: 'June 14, 2026',
    verified: true
  },
  {
    id: 't2',
    name: 'Sophia V.',
    location: 'Manhattan, NY',
    content: 'The exchange rate and fair pricing I got here for trading my heirloom watch and buying a diamond tennis necklace was unmatched. Honest, professional, and extremely knowledgeable jewelers. I will never go anywhere else in New York.',
    rating: 5,
    date: 'May 28, 2026',
    verified: true
  },
  {
    id: 't3',
    name: 'David K.',
    location: 'Rego Park, NY',
    content: 'Exceptional craftsmanship. They repaired and cleaned my grandmothers vintage bracelet, making it look brand new without losing any historical integrity. Courteous service and pristine attention to detail.',
    rating: 5,
    date: 'July 10, 2026',
    verified: true
  },
  {
    id: 't4',
    name: 'Elena S.',
    location: 'Brooklyn, NY',
    content: 'Highly recommend for custom jewelry! I brought a drawing of earrings I wanted, and they transformed it into stunning platinum masterworks. The 3D design phase gave me so much peace of mind.',
    rating: 5,
    date: 'April 02, 2026',
    verified: true
  },
  {
    id: 't5',
    name: 'Marcus T.',
    location: 'Astoria, NY',
    content: 'Their gold trade-in and exchange valuation is incredibly honest. Simon showed me the live gold price and weighed my old jewelry right in front of me. Got a very fair cash payout immediately. A highly reputable family business.',
    rating: 5,
    date: 'April 19, 2026',
    verified: true
  },
  {
    id: 't6',
    name: 'Rachel G.',
    location: 'Flushing, NY',
    content: 'We designed custom bridal wedding bands here, and the experience was flawless. The CAD design let us see every angle before crafting. The physical rings came out even more dazzling than the renderings. Outstanding quality and care.',
    rating: 5,
    date: 'July 04, 2026',
    verified: true
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq1',
    question: 'Are all of your diamonds GIA certified?',
    answer: 'Yes, absolutely. Every center diamond and significant precious stone at Simon & Sons is officially certified by the Gemological Institute of America (GIA) or equivalent premium labs, complete with unique microscopic laser inscriptions and paper certs.'
  },
  {
    id: 'faq2',
    question: 'How does the Jewelry Exchange/Trade-In work?',
    answer: 'We provide free, transparent, and immediate in-store valuations based on the daily live global commodity prices. We inspect metal purity using advanced non-invasive testing and evaluate precious stones under custom microscopes to offer you the highest cash payouts or premium store credit.'
  },
  {
    id: 'faq3',
    question: 'How long does a custom jewelry piece take to create?',
    answer: 'A standard custom bespoke piece takes between 2 to 4 weeks. This includes the initial consultation, drafting a 3D CAD schematic, fine gemstone sourcing, hand benchwork, polishing, and certified appraisal sealing.'
  },
  {
    id: 'faq4',
    question: 'Do you offer appraisals for insurance?',
    answer: 'Yes, we provide official certified appraisals signed by certified gemologists. These documents contain deep technical specifications, high-definition photographs, and estimated retail replacement values for insurance purposes.'
  },
  {
    id: 'faq5',
    question: 'Can I resize or custom-fit a vintage watch or ring?',
    answer: 'Absolutely. We specialize in high-end repairs, laser micro-soldering, and resizing. For watches, we service automatic movements, replace crystals, and adjust luxury metal bands to perfect size.'
  }
];

const GALLERY_IMAGES_DATA = [
  {
    id: 'g1',
    url: '/src/assets/images/regenerated_image_1785318857474.jpg',
    title: 'Open-Heart Chronograph',
    category: 'Watches'
  },
  {
    id: 'g2',
    url: '/src/assets/images/regenerated_image_1785318861577.jpg',
    title: 'Rolex & Tennis Bracelet Set',
    category: 'Watches'
  },
  {
    id: 'g3',
    url: '/src/assets/images/regenerated_image_1785318865289.jpg',
    title: 'Indian Bridal Filigree Set',
    category: 'Necklaces'
  },
  {
    id: 'g4',
    url: '/src/assets/images/regenerated_image_1785318869610.jpg',
    title: 'Rose Gold Timepiece Duo',
    category: 'Watches'
  },
  {
    id: 'g5',
    url: '/src/assets/images/regenerated_image_1785318872982.jpg',
    title: 'Stella Fluted Oyster Watch',
    category: 'Watches'
  },
  {
    id: 'g6',
    url: '/src/assets/images/regenerated_image_1785318876302.jpg',
    title: 'Empress Filigree Pearl Choker',
    category: 'Necklaces'
  },
  {
    id: 'g7',
    url: '/src/assets/images/regenerated_image_1785318879905.jpg',
    title: 'Sovereign Heritage Choker',
    category: 'Necklaces'
  },
  {
    id: 'g8',
    url: '/src/assets/images/regenerated_image_1785318883689.jpg',
    title: 'Traditional Gold Choker Set',
    category: 'Necklaces'
  },
  {
    id: 'g9',
    url: '/src/assets/images/regenerated_image_1785318887334.jpg',
    title: 'Brilliant Diamond Studs',
    category: 'Earrings'
  },
  {
    id: 'g10',
    url: '/src/assets/images/regenerated_image_1785318890290.jpg',
    title: 'Exquisite Diamond Halo Studs',
    category: 'Earrings'
  }
];

export const GALLERY_IMAGES = GALLERY_IMAGES_DATA.map(g => ({
  ...g,
  url: resolveImagePath(g.url)
}));
