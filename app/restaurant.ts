const address = "R. de Cedofeita 250";
const postalAddress = "4050-174 Porto, Portugal";

export const restaurant = {
  name: "UMI",
  cuisine: "Sushi & Asian kitchen",
  neighborhood: "Cedofeita",
  city: "Porto",
  address,
  postalAddress,
  phone: "+351 22 099 0338",
  phoneHref: "tel:+351220990338",
  bookingUrl: null as string | null,
  menuUrl: "https://glovoapp.com/pt/pt/porto/stores/umi-opo",
  menuNote: "Delivery menu via Glovo. Dine-in menu link pending.",
  mapsUrl: "https://maps.app.goo.gl/Lt8YWTLfL8oYDWm98",
  directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=41.1510154%2C-8.6172561",
  mapEmbedUrl: "https://maps.google.com/maps?q=UMI%2C%20R.%20de%20Cedofeita%20250%2C%20Porto&z=16&output=embed",
  coordinates: "41°09′ N  ·  8°37′ W",
  tagline: "Good food. Good company.",
  heroLine: "Sushi, warm plates, and good company in the heart of Porto.",
  hours: [
    { days: "Friday–Tuesday", times: "12:00–15:00 · 19:00–23:00" },
  ],
  hoursNote: "Call to confirm Wednesday, Thursday, and holiday hours.",
  rating: { value: "4.8", count: 41, platform: "Google Maps" } as
    { value: string; count: number; platform: string } | null,
  socialLinks: [
    { label: "Instagram", url: "https://www.instagram.com/restaurante.umi/" },
    { label: "TikTok", url: "https://www.tiktok.com/@umi.restaurante2026" },
  ],
  legalLinks: [] as { label: string; url: string }[],
};

export const spacePhotos = [
  { image: "space-room", alt: "Illustrative dining room with curved chairs and wooden tables", wide: true },
  { image: "space-light", alt: "Illustrative amber pendants beside arched green alcoves" },
  { image: "space-detail", alt: "Illustrative table setting with white ceramics and a rust-red napkin" },
  { image: "space-nook", alt: "Illustrative wood-paneled dining nook with leafy plants", wide: true },
];

export const dishes = [
  { image: "food-sushi", alt: "Illustrative sushi platter with salmon nigiri and maki", category: "Sushi", name: "Sushi Selection" },
  { image: "food-dumplings", alt: "Illustrative golden dumplings with dipping sauce", category: "Small plates", name: "Grilled Dumplings" },
  { image: "food-temaki", alt: "Illustrative crispy temaki cone filled with salmon", category: "UMI specials", name: "Crispy Temaki" },
  { image: "food-chapa", alt: "Illustrative breaded cutlet with rice on a sizzling plate", category: "Hot plates", name: "Crispy Cutlet Chapa" },
];

export const selections = [
  { label: "Small plates", items: [
    { name: "Steamed Dumpling", price: "€3.25" },
    { name: "Grilled Dumpling", price: "€3.95" },
    { name: "Crispy Temaki", price: "€5.50" },
  ] },
  { label: "From the hot plate", items: [
    { name: "Pork & Noodle Chapa", price: "€10.50" },
    { name: "Pork & Rice Chapa", price: "€10.50" },
    { name: "Crispy Cutlet & Rice Chapa", price: "€10.50" },
  ] },
];

export const reviews: { quote: string; name: string; stars: number; language: string }[] = [
  { quote: "funcionários muito simpáticos, a comida muito boa", name: "Joana Catarinah", stars: 5, language: "pt" },
  { quote: "Japanese and Chinese food with world top quality", name: "Husse Pedraza", stars: 5, language: "en" },
  { quote: "Amei a comida", name: "Ana Mercia Barbosa Valentin", stars: 5, language: "pt" },
];

export const navigation = [
  { id: "home", label: "Home" },
  { id: "space", label: "The Space" },
  { id: "menu", label: "Menu" },
  { id: "visit", label: "Visit" },
  ...(reviews.length ? [{ id: "reviews", label: "Reviews" }] : []),
];
