const address = "R. de Cedofeita 250";
const postalAddress = "4050-174 Porto, Portugal";
const deliveryUrl = "https://glovoapp.com/pt/pt/porto/stores/umi-opo";

export const restaurant = {
  name: "UMI",
  neighborhood: "Cedofeita",
  city: "Porto",
  address,
  postalAddress,
  phone: "+351 22 099 0338",
  phoneHref: "tel:+351220990338",
  bookingUrl: "https://reserve.intelis.pt/umi-porto",
  deliveryUrl,
  menuUrl: deliveryUrl,
  mapsUrl: "https://maps.app.goo.gl/Lt8YWTLfL8oYDWm98",
  directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=41.1510154%2C-8.6172561",
  mapEmbedUrl: "https://maps.google.com/maps?q=UMI%2C%20R.%20de%20Cedofeita%20250%2C%20Porto&z=16&output=embed",
  coordinates: "41°09′ N  ·  8°37′ W",
  hours: [
    { days: { en: "Friday–Tuesday", pt: "Sexta-feira a terça-feira" }, times: "12:00–15:00 · 19:00–23:00" },
  ],
  rating: { value: "4.8", count: 41, platform: "Google Maps" } as
    { value: string; count: number; platform: string } | null,
  socialLinks: [
    { label: "Instagram", url: "https://www.instagram.com/restaurante.umi/" },
    { label: "TikTok", url: "https://www.tiktok.com/@umi.restaurante2026" },
  ],
  legalLinks: [] as { label: string; url: string }[],
};

export const spacePhotoDimensions = { width: 1448, height: 1086, mediumWidth: 960 };

export const spacePhotos = {
  room: {
    name: "space/space-01",
    alt: { en: "UMI’s dining room with two rows of set tables under pendant lights", pt: "Sala do UMI com duas filas de mesas postas sob candeeiros suspensos" },
    sizes: "(max-width: 600px) calc(100vw - 40px), (max-width: 1420px) 56vw, 770px",
  },
  bar: {
    name: "space/space-02",
    alt: { en: "The sushi counter beneath shelves of bottles and hanging glasses", pt: "Balcão de sushi sob prateleiras com garrafas e copos suspensos" },
    sizes: "(max-width: 600px) 50vw, (max-width: 1420px) 40vw, 550px",
  },
  stone: {
    name: "space/space-03",
    alt: { en: "Set tables and warm pendant lights along the exposed stone wall", pt: "Mesas postas e candeeiros de luz quente junto à parede de pedra à vista" },
    sizes: "(max-width: 600px) 50vw, (max-width: 1420px) 32vw, 440px",
  },
  sign: {
    name: "space/space-04",
    alt: { en: "Illuminated UMI wave emblem and lettering on a wood wall", pt: "Símbolo da onda e letras do UMI iluminados numa parede de madeira" },
    sizes: "(max-width: 600px) 42vw, (max-width: 1420px) 24vw, 330px",
  },
  plants: {
    name: "space/space-05",
    alt: { en: "Dining tables beside two arched niches filled with greenery", pt: "Mesas junto a dois nichos em arco repletos de vegetação" },
    sizes: "(max-width: 600px) 58vw, (max-width: 1420px) 40vw, 550px",
  },
};

export const dishes = [
  { image: "food-sushi", alt: { en: "Illustrative sushi platter with salmon nigiri and maki", pt: "Imagem ilustrativa de um combinado de sushi com nigiri de salmão e maki" }, category: { en: "Sushi", pt: "Sushi" }, name: { en: "Sushi Selection", pt: "Combinado de Sushi" } },
  { image: "food-dumplings", alt: { en: "Illustrative golden dumplings with dipping sauce", pt: "Imagem ilustrativa de dumplings dourados com molho" }, category: { en: "Small plates", pt: "Entradas" }, name: { en: "Grilled Dumplings", pt: "Dumplings Grelhados" } },
  { image: "food-temaki", alt: { en: "Illustrative crispy temaki cone filled with salmon", pt: "Imagem ilustrativa de um temaki crocante de salmão" }, category: { en: "UMI specials", pt: "Especiais UMI" }, name: { en: "Crispy Temaki", pt: "Temaki Crocante" } },
  { image: "food-chapa", alt: { en: "Illustrative breaded cutlet with rice on a sizzling plate", pt: "Imagem ilustrativa de um panado com arroz numa chapa quente" }, category: { en: "Hot plates", pt: "Pratos quentes" }, name: { en: "Crispy Cutlet Chapa", pt: "Panado Crocante na Chapa" } },
];

export const selections = [
  { label: { en: "Small plates", pt: "Entradas" }, items: [
    { name: { en: "Steamed Dumpling", pt: "Dumpling ao Vapor" }, price: "€3.25" },
    { name: { en: "Grilled Dumpling", pt: "Dumpling Grelhado" }, price: "€3.95" },
    { name: { en: "Crispy Temaki", pt: "Temaki Crocante" }, price: "€5.50" },
  ] },
  { label: { en: "From the hot plate", pt: "Da Chapa" }, items: [
    { name: { en: "Pork & Noodle Chapa", pt: "Chapa de Porco com Massa" }, price: "€10.50" },
    { name: { en: "Pork & Rice Chapa", pt: "Chapa de Porco com Arroz" }, price: "€10.50" },
    { name: { en: "Crispy Cutlet & Rice Chapa", pt: "Chapa de Panado Crocante com Arroz" }, price: "€10.50" },
  ] },
];

export const reviews: { quote: string; name: string; stars: number; language: string }[] = [
  { quote: "funcionários muito simpáticos, a comida muito boa", name: "Joana Catarinah", stars: 5, language: "pt" },
  { quote: "Japanese and Chinese food with world top quality", name: "Husse Pedraza", stars: 5, language: "en" },
  { quote: "Amei a comida", name: "Ana Mercia Barbosa Valentin", stars: 5, language: "pt" },
];

export const navigation = ["home", "space", "menu", "visit", ...(reviews.length ? ["reviews"] as const : [])] as const;
