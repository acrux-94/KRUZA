// src/data/mockData.js

export const mockUsers = [
  {
    id: "u1",
    username: "carlos_pastor",
    displayName: "Carlos M.",
    avatar:
      "https://api.dicebear.com/7.x/adventurer/svg?seed=carlos&backgroundColor=b6e3f4",
    bio: "Amante de los perros 🐕 | Criador amateur | Madrid",
    location: "Madrid",
  },
  {
    id: "u2",
    username: "laura_golden",
    displayName: "Laura G.",
    avatar:
      "https://api.dicebear.com/7.x/adventurer/svg?seed=laura&backgroundColor=ffdfbf",
    bio: "Tengo dos goldens increíbles 🐾 | Barcelona",
    location: "Barcelona",
  },
  {
    id: "u3",
    username: "miguel_husky",
    displayName: "Miguel R.",
    avatar:
      "https://api.dicebear.com/7.x/adventurer/svg?seed=miguel&backgroundColor=c0aede",
    bio: "Husky lover desde siempre ❄️ | Valencia",
    location: "Valencia",
  },
  {
    id: "u4",
    username: "ana_beagle",
    displayName: "Ana P.",
    avatar:
      "https://api.dicebear.com/7.x/adventurer/svg?seed=ana&backgroundColor=d1f4e0",
    bio: "Mis beagles son mi vida 🐶 | Sevilla",
    location: "Sevilla",
  },
  {
    id: "u5",
    username: "pedro_border",
    displayName: "Pedro S.",
    avatar:
      "https://api.dicebear.com/7.x/adventurer/svg?seed=pedro&backgroundColor=ffd5dc",
    bio: "Border Collie = amor infinito 💙 | Bilbao",
    location: "Bilbao",
  },
];

export const mockPosts = [
  {
    id: "p1",
    userId: "u1",
    dogName: "Thor",
    breed: "Pastor Alemán",
    age: "3 años",
    gender: "Macho",
    color: "Negro y Marrón",
    location: "Madrid, Centro",
    description:
      "Thor es un pastor alemán de pura raza, con pedigree. Carácter tranquilo y muy cariñoso. Buscamos hembra de raza pura o mestiza.",
    image:
      "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=600&q=80",
    likes: ["u2", "u4"],
    createdAt: "2024-01-15",
    distance: "0.5 km",
  },
  {
    id: "p2",
    userId: "u2",
    dogName: "Luna",
    breed: "Golden Retriever",
    age: "2 años",
    gender: "Hembra",
    color: "Dorado",
    location: "Barcelona, Eixample",
    description:
      "Luna es una golden preciosa, muy activa y sociable. Busca macho de su raza para cruce planificado.",
    image:
      "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=600&q=80",
    likes: ["u1", "u3", "u5"],
    createdAt: "2024-01-14",
    distance: "2.1 km",
  },
  {
    id: "p3",
    userId: "u3",
    dogName: "Niko",
    breed: "Husky Siberiano",
    age: "4 años",
    gender: "Macho",
    color: "Gris y Blanco",
    location: "Valencia, Ruzafa",
    description:
      "Niko es un husky de ojos azules impresionantes. Temperamento equilibrado, le encantan los niños.",
    image:
      "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=600&q=80",
    likes: ["u2"],
    createdAt: "2024-01-13",
    distance: "3.8 km",
  },
  {
    id: "p4",
    userId: "u4",
    dogName: "Coco",
    breed: "Beagle",
    age: "2 años",
    gender: "Hembra",
    color: "Tricolor",
    location: "Sevilla, Triana",
    description:
      "Coco es muy juguetona y tiene un olfato increíble. Buscamos cruce con beagle macho de buena salud.",
    image:
      "https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=600&q=80",
    likes: ["u1", "u5"],
    createdAt: "2024-01-12",
    distance: "5.2 km",
  },
  {
    id: "p5",
    userId: "u5",
    dogName: "Rex",
    breed: "Border Collie",
    age: "3 años",
    gender: "Macho",
    color: "Negro y Blanco",
    location: "Bilbao, Indautxu",
    description:
      "Rex es un border collie superinteligente, ganador de varios concursos de agility. ADN certificado.",
    image:
      "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?w=600&q=80",
    likes: ["u2", "u3", "u4"],
    createdAt: "2024-01-11",
    distance: "7.0 km",
  },
  {
    id: "p6",
    userId: "u1",
    dogName: "Bella",
    breed: "Labrador",
    age: "1 año",
    gender: "Hembra",
    color: "Amarillo",
    location: "Madrid, Salamanca",
    description:
      "Bella es una labrador jovencísima, muy dulce. Primera camada, buscamos macho de carácter similar.",
    image:
      "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=600&q=80",
    likes: ["u3"],
    createdAt: "2024-01-10",
    distance: "1.2 km",
  },
];

export const mockMessages = {
  conv1: {
    id: "conv1",
    participants: ["currentUser", "u2"],
    messages: [
      {
        id: "m1",
        from: "u2",
        text: "¡Hola! Vi tu publicación de Thor, me interesa para Luna 🐾",
        time: "10:30",
      },
      {
        id: "m2",
        from: "currentUser",
        text: "¡Hola Laura! Claro, estaría genial. ¿Cuándo podemos quedar?",
        time: "10:35",
      },
      {
        id: "m3",
        from: "u2",
        text: "¿El sábado por la mañana en el Retiro?",
        time: "10:36",
      },
      {
        id: "m4",
        from: "currentUser",
        text: "Perfecto, a las 11h nos viene bien 👍",
        time: "10:38",
      },
      {
        id: "m5",
        from: "u2",
        text: "¡Genial! Ahí estaremos 🐕",
        time: "10:39",
      },
    ],
  },
  conv2: {
    id: "conv2",
    participants: ["currentUser", "u3"],
    messages: [
      {
        id: "m6",
        from: "u3",
        text: "Buenos días, vi que tienes una Pastor Alemana, ¿está disponible para cruce?",
        time: "09:15",
      },
      {
        id: "m7",
        from: "currentUser",
        text: "¡Hola Miguel! Sí, Thor está disponible. ¿Qué raza tienes tú?",
        time: "09:20",
      },
      {
        id: "m8",
        from: "u3",
        text: "Tengo un Husky, sé que son razas diferentes pero buscamos mestizo 😊",
        time: "09:22",
      },
    ],
  },
};

export const dogBreeds = [
  "Labrador",
  "Golden Retriever",
  "Pastor Alemán",
  "Bulldog Francés",
  "Beagle",
  "Caniche",
  "Rottweiler",
  "Yorkshire Terrier",
  "Boxer",
  "Dachshund",
  "Husky Siberiano",
  "Doberman",
  "Border Collie",
  "Chihuahua",
  "Shih Tzu",
  "Pomerania",
  "Maltés",
  "Cocker Spaniel",
  "Schnauzer",
  "San Bernardo",
  "Mastín",
  "Setter Irlandés",
  "Dálmata",
  "Gran Danés",
  "Weimaraner",
  "Samoyedo",
  "Chow Chow",
  "Shar Pei",
  "Akita Inu",
  "Otro",
];