export const site = {
  name: 'Voltaro',
  tagline: 'Electric bikes built for everyday riding.',
  phone: '+1 (415) 258-9632',
  phoneHref: 'tel:+14152589632',
  email: 'hello@voltaro.com',
  address: '218 Harbor Works, San Francisco, CA 94107',
  hours: 'Mon–Sat, 9:00–18:00',
}

export interface NavItem {
  label: string
  to: string
}

export const navItems: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Services', to: '/services' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

export interface Feature {
  icon: string
  title: string
  text: string
}

export const features: Feature[] = [
  {
    icon: 'ShieldCheck',
    title: 'UL 2849 Certified',
    text: 'Every battery and drive system is independently certified for safety.',
  },
  {
    icon: 'Droplets',
    title: 'Water-Ready',
    text: 'IPX6 sealed electronics rated for rain, puddles and the everyday wash.',
  },
  {
    icon: 'BadgeCheck',
    title: '2-Year Warranty',
    text: 'Comprehensive cover on the motor, battery, controller and frame.',
  },
  {
    icon: 'Wrench',
    title: 'Local Service',
    text: 'Nationwide partner workshops and at-home mobile servicing.',
  },
  {
    icon: 'BatteryCharging',
    title: 'Battery Care',
    text: 'Free annual battery health checks for the life of your bike.',
  },
  {
    icon: 'Truck',
    title: 'Free Shipping',
    text: 'Delivered 95% assembled, with tools and a ride-ready checklist.',
  },
]

export interface Service {
  title: string
  text: string
  points: string[]
  image: string
}

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=${w}`

export const services: Service[] = [
  {
    title: 'Test Rides & Fitting',
    text: 'Book a free 30-minute ride. We size the frame, set your cockpit and let you feel the assist before you commit.',
    points: ['Free 30-minute session', 'Frame sizing & cockpit setup', 'No obligation to buy'],
    image: u('photo-1778574171671-fbe178537535'),
  },
  {
    title: 'E-Bike Service & Repair',
    text: 'Factory-trained technicians for brakes, drivetrains, motors and controllers — with genuine parts in stock.',
    points: ['Factory-trained technicians', 'Genuine spare parts', '48-hour turnaround'],
    image: u('photo-1621394445346-c7b502f07206'),
  },
  {
    title: 'Battery Health & Care',
    text: 'Capacity testing, cell balancing and safe storage guidance so your battery lasts its full 1,000-cycle life.',
    points: ['Capacity & health report', 'Cell balancing service', 'Safe storage guidance'],
    image: u('photo-1618987688327-dc0b28888fe4'),
  },
  {
    title: 'Custom Builds',
    text: 'Racks, panniers, child seats, lighting and tires — configured to your route and assembled by our team.',
    points: ['Accessory consultation', 'In-house assembly', 'Handover walkthrough'],
    image: u('photo-1624243519828-52a0f2c88af3'),
  },
  {
    title: 'Fleet & Corporate',
    text: 'Volume pricing, priority servicing and staged delivery for teams, campuses and hospitality groups.',
    points: ['Volume pricing', 'Priority service slots', 'Staged delivery'],
    image: u('photo-1635816048695-51dc43a7b24c'),
  },
  {
    title: 'Trade-In & Upgrade',
    text: 'Value your current bike in minutes and put it toward your next one, with instant credit on the spot.',
    points: ['Instant valuation', 'Credit toward a new bike', 'We handle the resale'],
    image: u('photo-1759252307155-e1117e8d2fe7'),
  },
]

export interface TeamMember {
  name: string
  role: string
  image: string
}

export const team: TeamMember[] = [
  {
    name: 'Daniel Morgan',
    role: 'Founder & CEO',
    image: u('photo-1560250097-0b93528c311a', 900),
  },
  {
    name: 'Olivia Carter',
    role: 'Head of Product',
    image: u('photo-1573496359142-b8d87734a5a2', 900),
  },
  {
    name: 'James Wilson',
    role: 'Lead Service Technician',
    image: u('photo-1629425733761-caae3b5f2e50', 900),
  },
  {
    name: 'Sophia Bennett',
    role: 'Customer Experience Lead',
    image: u('photo-1627161683077-e34782c24d81', 900),
  },
]

export interface Testimonial {
  quote: string
  name: string
  role: string
  rating: number
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'Absolutely love this bike. The ride is smooth, the assist kicks in exactly when I need it, and I have not touched my car in three months. The team fitted it to me in about twenty minutes.',
    name: 'Fergus Doyle',
    role: 'Commuter Pro 500 owner',
    rating: 5,
  },
  {
    quote:
      'We replaced our second car with the Cargo Plus and it has been flawless. Two kids, a week of groceries, and it still climbs the hill home without breaking a sweat.',
    name: 'Amara Reyes',
    role: 'Cargo Plus 750 owner',
    rating: 5,
  },
  {
    quote:
      'The Trail MTB is the first e-bike that still feels like a mountain bike. Balanced, quiet, and the battery genuinely lasts a full day of riding.',
    name: 'Thomas Lindqvist',
    role: 'Trail MTB 700 owner',
    rating: 5,
  },
]

export interface Faq {
  q: string
  a: string
}

export const faqs: Faq[] = [
  {
    q: 'What is the range of a Voltaro e-bike?',
    a: 'Depending on the model, rider weight and assist level, expect between 30 and 70 miles on a single charge. Our range calculator above gives you a personalised estimate in seconds.',
  },
  {
    q: 'How long does it take to charge the battery?',
    a: 'Most packs charge from empty to full in three to five hours with the included charger. Batteries are removable on every model, so you can charge indoors at your desk or in your apartment.',
  },
  {
    q: 'Is an e-bike suitable for a beginner?',
    a: 'Absolutely. Every Voltaro bike ships 95% assembled with a ride-ready checklist, and assist levels let you dial the power up gradually. If you are unsure, book a free test ride and we will walk you through it.',
  },
  {
    q: 'Can I ride a Voltaro e-bike in the rain?',
    a: 'Yes. The electronics are IPX6 sealed and every battery is UL 2849 certified. We still recommend storing the bike under cover and wiping it down after wet rides.',
  },
  {
    q: 'How do I maintain my e-bike?',
    a: 'Keep the drivetrain clean and lubricated, check tire pressure monthly, and book a free annual battery health check. Our local service network handles everything else.',
  },
  {
    q: 'What does the warranty cover?',
    a: 'Every bike carries a 2-year comprehensive warranty covering the motor, battery, controller and frame, plus a 3-year warranty on carbon frames. Wear items such as brake pads and tires are excluded.',
  },
]

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  image: string
  body: string[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'choosing-your-first-ebike',
    title: 'How to choose your first e-bike in 2026',
    excerpt:
      'Motor type, battery size and frame geometry explained in plain language — plus the three questions to ask before you buy.',
    category: 'Buying Guide',
    date: 'Feb 12, 2026',
    readTime: '6 min read',
    image: u('photo-1618987688327-dc0b28888fe4'),
    body: [
      'The first decision is not brand or price — it is how and where you will actually ride. A flat six-mile commute needs a very different bike from a twenty-mile round trip with 800 feet of climbing, and matching the bike to the route is what makes an e-bike feel effortless rather than heavy.',
      'Next, look at the motor. Hub motors are simple, quiet and great value on flat, stop-start routes. Mid-drive motors cost more but put the weight low and centre, which transforms climbing and technical riding. If your route has real hills, mid-drive is usually worth the premium.',
      'Finally, size the battery to the trip, not to the biggest number on the page. A 500–600Wh pack covers most commutes with charge to spare, and you can add a range extender later. Book a test ride and ride your real route if you can — thirty minutes in the saddle answers more than any spec sheet.',
    ],
  },
  {
    slug: 'battery-longevity',
    title: 'Make your battery last 1,000 cycles',
    excerpt:
      'Charge windows, storage temperature and the habits that quietly shorten pack life — and how to avoid them.',
    category: 'Maintenance',
    date: 'Jan 28, 2026',
    readTime: '4 min read',
    image: u('photo-1621394445346-c7b502f07206'),
    body: [
      'Modern lithium packs are rated for roughly 1,000 full charge cycles, but how you treat them in between matters more than the number itself. The single biggest factor is heat: charging a hot pack straight after a long climb accelerates the chemical wear that quietly reduces capacity.',
      'Charge between 20% and 80% for everyday riding and only fill to 100% the night before a long trip. Store the bike at around 50–60% if you will not ride for a month or more, and keep it out of freezing garages and baking cars.',
      'Every Voltaro bike comes with a free annual battery health check. We measure real capacity, balance the cells when needed and tell you honestly how much life is left — so you are never guessing about range.',
    ],
  },
  {
    slug: 'cargo-bike-city',
    title: 'Replacing a car with a cargo bike',
    excerpt:
      'One family, ninety days, no second vehicle. What we learned about groceries, school runs and rainy Tuesdays.',
    category: 'Stories',
    date: 'Jan 9, 2026',
    readTime: '8 min read',
    image: u('photo-1635816048695-51dc43a7b24c'),
    body: [
      'Ninety days ago we handed a family a Cargo Plus 750 and asked them to leave the second car on the driveway. What came back was a spreadsheet of school runs, grocery trips and one memorable rainy Tuesday.',
      'The pattern was clear within a fortnight: short trips under four miles disappeared from the car entirely, and the cargo bike absorbed them without anyone thinking about it. Kickstand-rated loading and walk-assist mode mattered far more than the headline range.',
      'The honest caveat is weather and storage. A covered place to park and a decent set of panniers turned out to be the difference between a novelty and a genuine car replacement. Plan for both before you buy, and the maths works.',
    ],
  },
  {
    slug: 'trail-etiquette',
    title: 'E-bike trail etiquette every rider should know',
    excerpt:
      'Class 1 access, passing safely and protecting singletrack so everyone keeps their welcome on the trails.',
    category: 'Riding',
    date: 'Dec 18, 2025',
    readTime: '5 min read',
    image: u('photo-1760462433741-724d574b1889'),
    body: [
      'Class 1 e-bikes — pedal-assist only, no throttle, cutting out at 20 mph — are welcome on the vast majority of singletrack. Class 2 and 3 machines are a different story, so check local rules before you load the rack.',
      'On shared trails the golden rule is simple: you are the heavier, faster rider, so you yield first and yield early. Announce your pass, slow to a walking pace near horses and hikers, and never ride wet trails that will rut.',
      'Good etiquette is not about restrictions — it is what keeps access open for everyone. Ride softly, stay on the trail, and the welcome you get on two wheels will keep growing.',
    ],
  },
]

export interface CompareRow {
  label: string
  key: keyof import('./bikes').Bike
}

export const compareRows: { label: string; key: string }[] = [
  { label: 'Class', key: 'bikeClass' },
  { label: 'Top Speed', key: 'topSpeed' },
  { label: 'Range', key: 'range' },
  { label: 'Battery', key: 'battery' },
  { label: 'Motor', key: 'motor' },
  { label: 'Torque', key: 'torque' },
  { label: 'Sensor', key: 'sensor' },
  { label: 'Weight', key: 'weight' },
  { label: 'Warranty', key: 'warranty' },
]

export const whyChoose: { title: string; text: string }[] = [
  {
    title: 'Certified safety, not just claims',
    text: 'Every battery pack is UL 2849 certified and every frame is fatigue-tested beyond the industry standard.',
  },
  {
    title: 'Fitted to you, not the shelf',
    text: 'We size the frame and tune the cockpit at handover, so the bike feels right from the first pedal stroke.',
  },
  {
    title: 'Support that stays with the bike',
    text: 'Free annual battery health checks and a nationwide service network for as long as you ride with us.',
  },
  {
    title: 'Thirty-day ride guarantee',
    text: 'Ride it for a month. If it is not the right bike for you, return it for a full refund, no questions asked.',
  },
]
