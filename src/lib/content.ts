export type ServiceId =
  | "sites"
  | "trafego"
  | "sistemas"
  | "automacoes"
  | "branding"
  | "consultoria";

type ImageMedia = {
  kind: "image";
  src: string;
  alt: string;
  width: number;
  height: number;
};

type VideoMedia = {
  kind: "video";
  src: string;
  poster: string;
  alt: string;
};

export type ServiceContent = {
  id: ServiceId;
  title: string;
  description: string;
  railMedia: Omit<ImageMedia, "kind"> & { treatment: string };
  showcaseMedia: ImageMedia | VideoMedia;
};

export const services: ServiceContent[] = [
  {
    id: "sites",
    title: "Sites e landing pages",
    description: "Páginas claras, rápidas e preparadas para transformar o interesse em contato.",
    railMedia: {
      src: "/assets/production/site/services/sites-landing-pages-thalles-v02.webp",
      alt: "Portfólio digital exibido em uma composição orbital com planeta e trajetórias visíveis.",
      width: 1800,
      height: 1500,
      treatment: "sites",
    },
    showcaseMedia: {
      kind: "image",
      src: "/assets/production/site/services/sites-landing-pages-thalles-v02.webp",
      alt: "Hero real do portfólio de Thalles Leal em uma composição orbital conceitual.",
      width: 1800,
      height: 1500,
    },
  },
  {
    id: "trafego",
    title: "Tráfego pago",
    description: "Campanhas definidas, acompanhadas e ajustadas conforme o objetivo do negócio.",
    railMedia: {
      src: "/assets/production/site/hero-rail/03-trafego-cartao.webp",
      alt: "Cartão de visita conceitual da Sifego fotografado em detalhe sobre uma superfície mineral.",
      width: 960,
      height: 356,
      treatment: "traffic",
    },
    showcaseMedia: {
      kind: "image",
      src: "/assets/production/site/services/trafego-idlepoke-reuniao-v05.webp",
      alt: "Dashboard real do IdlePoke apresentado em uma sala de análise conceitual.",
      width: 1800,
      height: 1500,
    },
  },
  {
    id: "sistemas",
    title: "Aplicativos personalizados",
    description: "Aplicativos sob medida para organizar informações, processos e decisões.",
    railMedia: {
      src: "/assets/production/site/hero-rail/04-sistemas-papelaria.webp",
      alt: "Papelaria conceitual da Sifego organizada sobre uma superfície mineral.",
      width: 960,
      height: 540,
      treatment: "systems",
    },
    showcaseMedia: {
      kind: "image",
      src: "/assets/production/site/services/sistemas-workflow-arco-v01.webp",
      alt: "Tela real da demonstração do Workflow em uma ambientação arquitetônica conceitual.",
      width: 1800,
      height: 1500,
    },
  },
  {
    id: "automacoes",
    title: "Automações e integrações",
    description: "Conexões que reduzem tarefas manuais e fazem suas ferramentas trabalharem juntas.",
    railMedia: {
      src: "/assets/production/site/hero-rail/05-automacoes-vidro.webp",
      alt: "Aplicação conceitual da marca Sifego em uma porta de vidro de arquitetura contemporânea.",
      width: 960,
      height: 540,
      treatment: "automation",
    },
    showcaseMedia: {
      kind: "image",
      src: "/assets/production/site/services/automacoes-integracoes-workstation-v03.webp",
      alt: "Estação de trabalho conceitual com código Python e um fluxo em construção no ManyChat.",
      width: 1000,
      height: 800,
    },
  },
  {
    id: "branding",
    title: "Branding",
    description:
      "Identidades visuais e sistemas de marca coerentes com o posicionamento e a realidade de cada negócio.",
    railMedia: {
      src: "/assets/production/site/hero-rail/06-evolucao-metro.webp",
      alt: "Aplicação conceitual da identidade Sifego em um display dentro de um vagão de metrô.",
      width: 960,
      height: 540,
      treatment: "evolution",
    },
    showcaseMedia: {
      kind: "video",
      src: "/assets/production/site/services/branding-sifego-system-v04.webm",
      poster: "/assets/production/site/services/branding-sifego-system-v04-poster.webp",
      alt: "Filme do sistema de identidade visual da própria Sifego.",
    },
  },
  {
    id: "consultoria",
    title: "Consultoria",
    description:
      "Análise de necessidades e prioridades para orientar decisões digitais com um próximo passo mais claro.",
    railMedia: {
      src: "/assets/production/site/hero-rail/07-consultoria-caderno.webp",
      alt: "Caderno conceitual da Sifego ao lado de um lápis, usado como imagem de análise e planejamento.",
      width: 960,
      height: 562,
      treatment: "consulting",
    },
    showcaseMedia: {
      kind: "image",
      src: "/assets/production/site/services/consultoria-decisoes-v01.webp",
      alt: "Mesa conceitual com os cartões Objetivo, Prioridade e Próximo passo.",
      width: 1000,
      height: 800,
    },
  },
];

export const projectNavigation = [
  { id: "workflow", label: "Workflow" },
  { id: "nitido", label: "Nítido" },
  { id: "idlepoke", label: "IdlePoke" },
  { id: "voe-alto", label: "Clínica Voe Alto" },
] as const;
