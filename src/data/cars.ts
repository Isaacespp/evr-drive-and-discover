import suv from "@/assets/car-suv.jpg";
import hatch from "@/assets/car-hatch.jpg";
import sedan from "@/assets/hero-car.jpg";

// Número de WhatsApp da loja (formato internacional, só dígitos)
export const WHATSAPP_NUMBER = "5585999999999";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export type Car = {
  id: string;
  name: string;
  year: string;
  price: number;
  km: number;
  fuel: string;
  transmission: string;
  color: string;
  category: string;
  image: string;
  features: string[];
  description: string;
};

export const cars: Car[] = [
  {
    id: "suv-compacto-2023",
    name: "SUV Compacto Turbo",
    year: "2023/2023",
    price: 129900,
    km: 18500,
    fuel: "Flex",
    transmission: "Automático",
    color: "Branco",
    category: "SUV",
    image: suv,
    features: ["Central multimídia", "Câmera de ré", "Ar digital", "Rodas aro 17", "6 airbags"],
    description: "SUV completo, revisado na concessionária, único dono e com manual e chave reserva.",
  },
  {
    id: "hatch-premium-2022",
    name: "Hatch Premium 1.0 TSI",
    year: "2022/2022",
    price: 84900,
    km: 32000,
    fuel: "Flex",
    transmission: "Automático",
    color: "Prata",
    category: "Hatch",
    image: hatch,
    features: ["Piloto automático", "Sensor de estacionamento", "Apple CarPlay", "Faróis LED"],
    description: "Econômico e ágil para a cidade, ótimo estado de conservação e laudo cautelar aprovado.",
  },
  {
    id: "sedan-executivo-2021",
    name: "Sedan Executivo",
    year: "2021/2021",
    price: 219900,
    km: 41000,
    fuel: "Gasolina",
    transmission: "Automático",
    color: "Preto",
    category: "Sedan",
    image: sedan,
    features: ["Bancos em couro", "Teto solar", "Som premium", "Assistente de faixa", "Partida sem chave"],
    description: "Conforto e desempenho de alto padrão, com todas as revisões em dia.",
  },
];

export const formatPrice = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
export const formatKm = (v: number) => `${v.toLocaleString("pt-BR")} km`;
