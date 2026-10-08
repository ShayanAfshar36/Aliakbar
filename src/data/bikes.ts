export type BikeCategory = 'Commuter' | 'Cargo' | 'Mountain' | 'City' | 'Road' | 'Cruiser'

export interface BikeColor {
  name: string
  hex: string
}

export interface Bike {
  id: string
  slug: string
  name: string
  tagline: string
  category: BikeCategory
  price: number
  compareAt?: number
  rating: number
  reviews: number
  badge?: string
  /** miles */
  range: number
  /** watt-hours */
  battery: number
  /** mph */
  topSpeed: number
  motor: string
  /** newton-metres */
  torque: number
  sensor: string
  /** lbs */
  weight: number
  /** lbs */
  maxLoad: number
  warranty: string
  bikeClass: string
  /** comfortable rider height range, inches */
  riderHeight: [number, number]
  colors: BikeColor[]
  features: string[]
  highlights: string[]
  description: string
  images: string[]
  inStock: boolean
}

const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=${w}`

export const bikeImage = unsplash

export const bikes: Bike[] = [
  {
    id: 'commuter-pro-500',
    slug: 'commuter-pro-500',
    name: 'Commuter Pro 500',
    tagline: 'The everyday ride that replaces the car.',
    category: 'Commuter',
    price: 1899,
    compareAt: 2199,
    rating: 4.9,
    reviews: 412,
    badge: 'Most Popular',
    range: 45,
    battery: 720,
    topSpeed: 25,
    motor: '500W brushless rear hub',
    torque: 60,
    sensor: 'Torque sensor',
    weight: 54,
    maxLoad: 300,
    warranty: '2-year comprehensive',
    bikeClass: 'Class 3',
    riderHeight: [62, 76],
    colors: [
      { name: 'Midnight Black', hex: '#111114' },
      { name: 'Slate Grey', hex: '#6b7280' },
      { name: 'Signal Orange', hex: '#ff7a00' },
    ],
    features: [
      'UL 2849 certified battery',
      'Integrated front & rear lighting',
      'Puncture-resistant 700c tires',
      'Removable 720Wh battery',
      'Rear rack & fender ready',
    ],
    highlights: [
      'Full fenders and rear rack included',
      'Hydraulic disc brakes front and rear',
      'Backlit LCD with USB charging',
    ],
    description:
      'Built for the daily grind and everything after it. The Commuter Pro 500 pairs a torquey 500W hub motor with a torque sensor so assistance arrives exactly when you push — smooth on the flat, confident on the climb. A 720Wh removable battery and integrated lighting make it a genuine car replacement.',
    images: [
      unsplash('photo-1618987688327-dc0b28888fe4'),
      unsplash('photo-1621576912675-f62566f2ebc5'),
      unsplash('photo-1620802051782-725fa33db067'),
      unsplash('photo-1621394445346-c7b502f07206'),
    ],
    inStock: true,
  },
  {
    id: 'cargo-plus-750',
    slug: 'cargo-plus-750',
    name: 'Cargo Plus 750',
    tagline: 'Carry the week, not the car keys.',
    category: 'Cargo',
    price: 2749,
    rating: 4.8,
    reviews: 186,
    range: 60,
    battery: 960,
    topSpeed: 20,
    motor: '750W brushless rear hub',
    torque: 80,
    sensor: 'Cadence + torque blend',
    weight: 72,
    maxLoad: 440,
    warranty: '2-year comprehensive',
    bikeClass: 'Class 2',
    riderHeight: [64, 78],
    colors: [
      { name: 'Midnight Black', hex: '#111114' },
      { name: 'Arctic White', hex: '#f4f4f5' },
    ],
    features: [
      '440 lb total payload',
      'Thru-axle reinforced frame',
      'Dual-battery compatible',
      'Front & rear cargo mounts',
      'Kickstand rated to 100 lb',
    ],
    highlights: [
      'Fits two child seats or a full week of groceries',
      'Low step-through option available',
      'Walk-assist mode for loading',
    ],
    description:
      'A long-tail cargo platform engineered to haul. The Cargo Plus 750 carries up to 440 lbs across a reinforced frame, with a 960Wh battery that keeps a fully loaded bike moving all day. Swap in a second battery for range that outlasts your to-do list.',
    images: [
      unsplash('photo-1558981403-c5f9899a28bc'),
      unsplash('photo-1635816048695-51dc43a7b24c'),
      unsplash('photo-1778574171671-fbe178537535'),
      unsplash('photo-1624243519828-52a0f2c88af3'),
    ],
    inStock: true,
  },
  {
    id: 'trail-mtb-700',
    slug: 'trail-mtb-700',
    name: 'Trail MTB 700',
    tagline: 'Electric torque for real singletrack.',
    category: 'Mountain',
    price: 3299,
    rating: 4.9,
    reviews: 238,
    range: 50,
    battery: 840,
    topSpeed: 28,
    motor: '700W mid-drive',
    torque: 95,
    sensor: 'Torque sensor',
    weight: 58,
    maxLoad: 300,
    warranty: '2-year comprehensive',
    bikeClass: 'Class 1',
    riderHeight: [65, 79],
    colors: [
      { name: 'Trail Black', hex: '#111114' },
      { name: 'Moss Green', hex: '#4b5d3a' },
      { name: 'Sunset Orange', hex: '#ff7a00' },
    ],
    features: [
      '120mm air fork',
      'Mid-drive motor, low centre of gravity',
      'Boost thru-axle wheelset',
      'Dropper post ready',
      'Sealed bearings throughout',
    ],
    highlights: [
      'Four-piston hydraulic brakes',
      'Tubeless-ready rims and tires',
      'Integrated frame battery, removable',
    ],
    description:
      'A trail bike first, an e-bike second. The Trail MTB 700 puts a 700W mid-drive motor at the bottom bracket for balanced weight and instant torque, so technical climbs feel effortless without dulling the ride. Slack geometry and 120mm of travel keep it planted when the trail points down.',
    images: [
      unsplash('photo-1624243519828-52a0f2c88af3'),
      unsplash('photo-1534146789009-76ed5060ec70'),
      unsplash('photo-1760462433741-724d574b1889'),
      unsplash('photo-1779474675065-d6ac88aa4588'),
    ],
    inStock: true,
  },
  {
    id: 'urban-glide-350',
    slug: 'urban-glide-350',
    name: 'Urban Glide 350',
    tagline: 'Light, nimble, endlessly practical.',
    category: 'City',
    price: 1449,
    rating: 4.7,
    reviews: 301,
    range: 38,
    battery: 540,
    topSpeed: 20,
    motor: '350W brushless rear hub',
    torque: 45,
    sensor: 'Cadence sensor',
    weight: 48,
    maxLoad: 265,
    warranty: '2-year comprehensive',
    bikeClass: 'Class 2',
    riderHeight: [60, 74],
    colors: [
      { name: 'Sand', hex: '#e6d3a3' },
      { name: 'Midnight Black', hex: '#111114' },
      { name: 'Sky Blue', hex: '#7fb2d9' },
    ],
    features: [
      'Step-through frame',
      'Integrated battery in downtube',
      'Fenders front & rear',
      'Front basket compatible',
      'Auto-on ambient lighting',
    ],
    highlights: [
      'One of the lightest frames in its class',
      'Quick-release battery for charging indoors',
      'Ships 95% assembled',
    ],
    description:
      'The Urban Glide 350 is the friendly way into electric riding. A step-through frame, a whisper-quiet 350W motor and an integrated battery keep it light and easy to live with — perfect for the café run, the commute, or the weekend loop.',
    images: [
      unsplash('photo-1786441113553-43414b842378'),
      unsplash('photo-1778574171631-ed9578da400b'),
      unsplash('photo-1621394445346-c7b502f07206'),
    ],
    inStock: true,
  },
  {
    id: 'aero-road-900',
    slug: 'aero-road-900',
    name: 'Aero Road 900',
    tagline: 'Road-race geometry, electric assist.',
    category: 'Road',
    price: 4150,
    rating: 4.8,
    reviews: 96,
    range: 70,
    battery: 720,
    topSpeed: 28,
    motor: '500W mid-drive',
    torque: 85,
    sensor: 'Torque sensor',
    weight: 42,
    maxLoad: 240,
    warranty: '3-year frame',
    bikeClass: 'Class 3',
    riderHeight: [64, 78],
    colors: [
      { name: 'Carbon Black', hex: '#111114' },
      { name: 'Racing Orange', hex: '#ff7a00' },
    ],
    features: [
      'Carbon fibre frame',
      'Hidden in-frame battery',
      'Aero carbon wheelset',
      'Electronic shifting compatible',
      'Slim bar-mounted display',
    ],
    highlights: [
      'Just 42 lbs — lightest in the range',
      'Three assist modes, tuned for cadence',
      'Range extender bottle available',
    ],
    description:
      'For riders who still want to feel the road. The Aero Road 900 hides its motor and battery inside a carbon frame, keeping the silhouette clean and the weight down. Assist fades in smoothly so long climbs and headwinds stop dictating the route.',
    images: [
      unsplash('photo-1601391721091-4646369e0bb5'),
      unsplash('photo-1511994298241-608e28f14fde'),
      unsplash('photo-1563990308267-cd6d3cc09318'),
    ],
    inStock: true,
  },
  {
    id: 'vista-cruiser-600',
    slug: 'vista-cruiser-600',
    name: 'Vista Cruiser 600',
    tagline: 'Upright comfort for long, easy miles.',
    category: 'Cruiser',
    price: 2150,
    rating: 4.7,
    reviews: 142,
    range: 42,
    battery: 672,
    topSpeed: 20,
    motor: '500W brushless rear hub',
    torque: 55,
    sensor: 'Cadence sensor',
    weight: 62,
    maxLoad: 300,
    warranty: '2-year comprehensive',
    bikeClass: 'Class 2',
    riderHeight: [63, 77],
    colors: [
      { name: 'Cream', hex: '#efe7d6' },
      { name: 'Brick Red', hex: '#a3402f' },
      { name: 'Midnight Black', hex: '#111114' },
    ],
    features: [
      'Swept-back comfort bars',
      'Gel saddle with springs',
      'Wide 2.4" balloon tires',
      'Integrated rear rack',
      'Thumb-throttle on demand',
    ],
    highlights: [
      'Upright, back-friendly riding position',
      'Front & rear lights wired to the battery',
      'Perfect for boardwalks and greenways',
    ],
    description:
      'The Vista Cruiser 600 is built around comfort. Swept-back bars and a sprung gel saddle put you upright, while wide balloon tires smooth out rough pavement. It is the bike you reach for when the ride matters more than the destination.',
    images: [
      unsplash('photo-1563990308267-cd6d3cc09318'),
      unsplash('photo-1759252307155-e1117e8d2fe7'),
      unsplash('photo-1620802051782-725fa33db067'),
    ],
    inStock: true,
  },
  {
    id: 'summit-explorer-800',
    slug: 'summit-explorer-800',
    name: 'Summit Explorer 800',
    tagline: 'Go further than the map ends.',
    category: 'Mountain',
    price: 3850,
    rating: 4.9,
    reviews: 74,
    badge: 'New',
    range: 65,
    battery: 1008,
    topSpeed: 28,
    motor: '750W mid-drive',
    torque: 105,
    sensor: 'Torque sensor',
    weight: 64,
    maxLoad: 330,
    warranty: '2-year comprehensive',
    bikeClass: 'Class 1',
    riderHeight: [66, 80],
    colors: [
      { name: 'Summit Black', hex: '#111114' },
      { name: 'Desert Sand', hex: '#d8c39a' },
    ],
    features: [
      '1008Wh dual-density battery',
      '150mm travel air fork',
      'Rack & pannier mounts',
      'USB-C accessory power',
      'All-terrain 2.6" tires',
    ],
    highlights: [
      'Longest range in the range',
      'Built for bikepacking and backroads',
      'Dual-battery ready out of the box',
    ],
    description:
      'The Summit Explorer 800 is our long-haul machine. A 1008Wh battery and 105Nm of mid-drive torque carry loaded panniers up fire roads and over passes, while 150mm of travel keeps the descents composed. Point it somewhere new.',
    images: [
      unsplash('photo-1575548393466-0df1618ba410'),
      unsplash('photo-1506316940527-4d1c138978a0'),
      unsplash('photo-1534146789009-76ed5060ec70'),
    ],
    inStock: true,
  },
  {
    id: 'metro-lite-250',
    slug: 'metro-lite-250',
    name: 'Metro Lite 250',
    tagline: 'The lightest way to electrify your commute.',
    category: 'City',
    price: 1199,
    compareAt: 1349,
    rating: 4.6,
    reviews: 264,
    badge: 'Best Value',
    range: 30,
    battery: 360,
    topSpeed: 18,
    motor: '250W brushless rear hub',
    torque: 35,
    sensor: 'Cadence sensor',
    weight: 38,
    maxLoad: 220,
    warranty: '2-year comprehensive',
    bikeClass: 'Class 1',
    riderHeight: [58, 72],
    colors: [
      { name: 'Chalk White', hex: '#f4f4f5' },
      { name: 'Graphite', hex: '#3f3f46' },
      { name: 'Signal Orange', hex: '#ff7a00' },
    ],
    features: [
      'Only 38 lbs',
      'Folding handlebar stem',
      'Removable 360Wh battery',
      'Single-speed, low maintenance',
      'Integrated rear light',
    ],
    highlights: [
      'Carries up stairs one-handed',
      'Charges to full in under 3 hours',
      'Fits most apartment storage',
    ],
    description:
      'The Metro Lite 250 proves an e-bike does not have to be heavy. At 38 lbs with a removable battery, it is light enough to carry up a flight of stairs and simple enough to maintain yourself. The easiest first e-bike there is.',
    images: [
      unsplash('photo-1621394445346-c7b502f07206'),
      unsplash('photo-1778574171631-ed9578da400b'),
      unsplash('photo-1618987688327-dc0b28888fe4'),
    ],
    inStock: true,
  },
]

export const categories: BikeCategory[] = [
  'Commuter',
  'Cargo',
  'Mountain',
  'City',
  'Road',
  'Cruiser',
]

export function getBikeBySlug(slug: string): Bike | undefined {
  return bikes.find((bike) => bike.slug === slug)
}

export function getBikeById(id: string): Bike | undefined {
  return bikes.find((bike) => bike.id === id)
}

export function similarBikes(bike: Bike, count = 3): Bike[] {
  const sameCategory = bikes.filter((b) => b.id !== bike.id && b.category === bike.category)
  const others = bikes.filter((b) => b.id !== bike.id && b.category !== bike.category)
  return [...sameCategory, ...others].slice(0, count)
}
