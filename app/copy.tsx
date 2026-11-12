import type { ReactNode } from "react";

export const languages = {
  pt: { name: "Português", tag: "pt-PT" },
  en: { name: "English", tag: "en" },
} as const;

export type Locale = keyof typeof languages;
export const defaultLocale: Locale = "pt";

const english = {
  pageTitle: "UMI · Sushi & Asian Kitchen in Porto",
  footerTagline: "Sushi, warm plates, and good company in the heart of Porto.",
  language: "Language",
  skip: "Skip to content",
  navigation: { home: "Home", space: "Space", menu: "Menu", visit: "Contacts", reviews: "Reviews" },
  mainNavigation: "Main navigation",
  openNavigation: "Open navigation",
  closeNavigation: "Close navigation",
  exploreUmi: "Explore UMI",
  homeLink: "UMI home",
  booking: {
    action: "Book a Table",
    title: "Reservations at UMI",
  },
  hero: {
    cuisine: "Sushi & Asian kitchen",
    viewMenu: "View Menu",
    scroll: "Scroll to explore",
  },
  space: {
    title: "The Space",
    intro: "Step in from Rua de Cedofeita and settle in under warm pendant lights. There’s room for a quick lunch, dinner with friends, or an evening that takes its time.",
  },
  menu: {
    title: "The Menu",
    intro: "Start with a sushi platter for the table, add a round of dumplings, or order something hot from the chapa.",
    fullMenu: "View Full Menu",
    note: "Delivery menu via Glovo. Dine-in menu link pending.",
    photos: "Menu photos",
    favorites: "House Favorites",
    favoritesIntro: "Bring a few plates to the middle or make a meal of a sizzling chapa. Here’s a short selection from the UMI menu.",
    postedMenu: "posted menu",
    favoritesNote: (link: ReactNode) => <>From UMI’s {link}. Call to confirm current prices and availability.</>,
  },
  visit: {
    title: "Plan Your Visit",
    intro: "Find us on Rua de Cedofeita, in the heart of Porto. Come by for lunch or make an evening of it.",
    address: "Address",
    hours: "Opening Hours",
    hoursNote: "Call to confirm Wednesday, Thursday, and holiday hours.",
    contact: "Contact",
    social: "Social",
    delivery: "Delivery",
    orderDelivery: "Order on Glovo",
    directions: "Get Directions",
    mapTitle: "Google Maps showing UMI on Rua de Cedofeita in Porto",
  },
  reviews: {
    title: "Guest Reviews",
    link: "Read Reviews on Google",
    stars: (value: number | string) => `${value} out of 5 stars`,
    count: (count: number) => `${count} reviews`,
  },
  carousel: {
    keys: "Use the left and right arrow keys to browse",
    kitchen: "From the kitchen",
    guests: "From our guests",
    play: "Play motion",
    pause: "Pause motion",
  },
  footer: { explore: "Explore", findUs: "Find Us", credit: "Powered by Intelis" },
};

const portuguese: typeof english = {
  pageTitle: "UMI · Sushi e Cozinha Asiática no Porto",
  footerTagline: "Sushi, pratos quentes e boa companhia no coração do Porto.",
  language: "Idioma",
  skip: "Saltar para o conteúdo",
  navigation: { home: "Início", space: "Espaço", menu: "Menu", visit: "Contactos", reviews: "Avaliações" },
  mainNavigation: "Navegação principal",
  openNavigation: "Abrir navegação",
  closeNavigation: "Fechar navegação",
  exploreUmi: "Explorar o UMI",
  homeLink: "Página inicial do UMI",
  booking: {
    action: "Reservar Mesa",
    title: "Reservas no UMI",
  },
  hero: {
    cuisine: "Sushi e cozinha asiática",
    viewMenu: "Ver Menu",
    scroll: "Descer para explorar",
  },
  space: {
    title: "O Espaço",
    intro: "Entre pela Rua de Cedofeita e sente-se sob a luz quente dos candeeiros. Há lugar para um almoço rápido, um jantar entre amigos ou uma noite sem pressas.",
  },
  menu: {
    title: "O Menu",
    intro: "Comece com um combinado de sushi para partilhar, peça uns dumplings ou escolha um prato quente da chapa.",
    fullMenu: "Ver Menu Completo",
    note: "Menu de entregas disponível na Glovo. O link para o menu do restaurante ainda não está disponível.",
    photos: "Fotografias do menu",
    favorites: "Favoritos da Casa",
    favoritesIntro: "Peça alguns pratos para partilhar ou saboreie uma chapa bem quente. Aqui fica uma pequena seleção do menu do UMI.",
    postedMenu: "menu publicado",
    favoritesNote: (link) => <>Do {link} do UMI. Ligue para confirmar os preços e a disponibilidade.</>,
  },
  visit: {
    title: "Planeie a Sua Visita",
    intro: "Estamos na Rua de Cedofeita, no coração do Porto. Passe por cá para almoçar ou venha passar a noite connosco.",
    address: "Morada",
    hours: "Horário",
    hoursNote: "Ligue para confirmar o horário às quartas e quintas-feiras e nos feriados.",
    contact: "Contacto",
    social: "Redes Sociais",
    delivery: "Entregas",
    orderDelivery: "Pedir no Glovo",
    directions: "Como Chegar",
    mapTitle: "Mapa do Google com a localização do UMI na Rua de Cedofeita, no Porto",
  },
  reviews: {
    title: "Avaliações dos Clientes",
    link: "Ler Avaliações no Google",
    stars: (value) => `${value.toString().replace(".", ",")} de 5 estrelas`,
    count: (count) => `${count} avaliações`,
  },
  carousel: {
    keys: "Use as setas esquerda e direita para percorrer",
    kitchen: "Da nossa cozinha",
    guests: "Dos nossos clientes",
    play: "Retomar animação",
    pause: "Pausar animação",
  },
  footer: { explore: "Explorar", findUs: "Onde Estamos", credit: english.footer.credit },
};

export const copy = { pt: portuguese, en: english };
