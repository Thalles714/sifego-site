import Image from "next/image";
import type { CSSProperties } from "react";

type ProjectMedia =
  | {
      kind: "image";
      src: string;
      alt: string;
      width: number;
      height: number;
      focal: string;
      fallback: string;
    }
  | {
      kind: "video";
      sources: { src: string; type: string }[];
      poster: string;
      alt: string;
      focal: string;
      fallback: string;
    };

type Project = {
  id: string;
  name: string;
  type: string;
  summary: string;
  mediaLabel: string;
  logo: {
    src: string;
    mutedSrc: string;
    width: number;
    height: number;
    className?: string;
  };
  links: { href: string; label: string; ariaLabel: string }[];
  media: ProjectMedia[];
};

const projects: Project[] = [
  {
    id: "workflow",
    name: "Workflow",
    type: "Sistema web",
    summary: "Um sistema para pequenas agências organizarem entregas antes que o trabalho vire urgência.",
    mediaLabel: "Três ambientações conceituais com telas reais da demonstração do Workflow",
    logo: {
      src: "/assets/production/site/projects/workflow-logo-mark-color.svg",
      mutedSrc: "/assets/production/site/projects/workflow-logo-mark.svg",
      width: 64,
      height: 64,
      className: "project-row__logo--workflow",
    },
    links: [
      {
        href: "https://workflow-app-lac.vercel.app",
        label: "Explorar demonstração",
        ariaLabel: "Explorar a demonstração do Workflow, abre outro site em nova aba",
      },
    ],
    media: [
      {
        kind: "image",
        src: "/assets/production/site/projects/workflow-mockup-01-estacao-cromatica-v1.webp",
        alt: "Estação de trabalho conceitual com a tela real da operação do Workflow.",
        width: 1536,
        height: 1024,
        focal: "54% 48%",
        fallback: "Imagem da operação indisponível.",
      },
      {
        kind: "image",
        src: "/assets/production/site/projects/workflow-mockup-02-tablet-lounge-v1.webp",
        alt: "Pessoa em uma composição conceitual revisando a tela real de projeto do Workflow em um tablet.",
        width: 1536,
        height: 1024,
        focal: "54% 47%",
        fallback: "Imagem do projeto indisponível.",
      },
      {
        kind: "image",
        src: "/assets/production/site/projects/workflow-mockup-03-sala-decisao-v1.webp",
        alt: "Sala de decisão conceitual com a tela real de tarefa bloqueada do Workflow.",
        width: 1536,
        height: 1024,
        focal: "55% 46%",
        fallback: "Imagem da tarefa indisponível.",
      },
    ],
  },
  {
    id: "nitido",
    name: "Nítido",
    type: "PWA financeira",
    summary:
      "Extratos CSV e OFX organizados em uma leitura compreensível no próprio aparelho, sem enviar o arquivo bruto.",
    mediaLabel: "Três ambientações conceituais com telas reais do modo de demonstração do Nítido",
    logo: {
      src: "/assets/production/site/projects/nitido-logo-mark-color.svg",
      mutedSrc: "/assets/production/site/projects/nitido-logo-mark.svg",
      width: 64,
      height: 64,
    },
    links: [
      {
        href: "https://nitido.thallestleal.workers.dev/",
        label: "Explorar demonstração",
        ariaLabel: "Explorar a demonstração do Nítido, abre outro site em nova aba",
      },
    ],
    media: [
      {
        kind: "image",
        src: "/assets/production/site/projects/nitido-mockup-01-monitor-categorias-v2.webp",
        alt: "Tela real de categorias do Nítido em um monitor numa composição conceitual.",
        width: 1536,
        height: 1024,
        focal: "50% 48%",
        fallback: "Imagem de uso indisponível.",
      },
      {
        kind: "image",
        src: "/assets/production/site/projects/nitido-mockup-02-cartao-celular-v2.webp",
        alt: "Tela inicial real do Nítido em um celular com um cartão neutro, numa composição conceitual.",
        width: 1536,
        height: 1024,
        focal: "50% 50%",
        fallback: "Resumo indisponível.",
      },
      {
        kind: "image",
        src: "/assets/production/site/projects/nitido-mockup-03-pessoa-tablet-v2.webp",
        alt: "Pessoa em uma composição conceitual usando a tela real de resumo do Nítido em um tablet.",
        width: 1536,
        height: 1024,
        focal: "49% 50%",
        fallback: "Categorias indisponíveis.",
      },
    ],
  },
  {
    id: "idlepoke",
    name: "IdlePoke",
    type: "Aquisição digital e dashboard",
    summary:
      "Aquisição digital acompanhada do anúncio ao jogador iniciado, com criativos e dados organizados para decidir.",
    mediaLabel: "Gameplay real e dashboard da operação de aquisição do IdlePoke",
    logo: {
      src: "/assets/production/site/project-logos/idlepoke-logo.png",
      mutedSrc: "/assets/production/site/project-logos/idlepoke-logo.png",
      width: 512,
      height: 149,
      className: "project-row__logo--idlepoke",
    },
    links: [
      {
        href: "https://idlepoke.com/",
        label: "Conhecer o produto",
        ariaLabel: "Conhecer o IdlePoke, abre outro site em nova aba",
      },
      {
        href: "https://idlepoke-meta-ads-dashboard.vercel.app",
        label: "Abrir dashboard",
        ariaLabel: "Abrir o dashboard público do IdlePoke, abre outro site em nova aba",
      },
    ],
    media: [
      {
        kind: "video",
        poster: "/assets/production/site/projects/idlepoke-01-mundo.webp",
        alt: "Gameplay real do IdlePoke com o personagem caminhando pela cidade.",
        focal: "51% 48%",
        fallback: "Gameplay indisponível.",
        sources: [
          {
            src: "/assets/production/site/projects/idlepoke-gameplay-mundo-v01.webm",
            type: "video/webm",
          },
          {
            src: "/assets/production/site/projects/idlepoke-gameplay-mundo-v01.mp4",
            type: "video/mp4",
          },
        ],
      },
      {
        kind: "video",
        poster: "/assets/production/site/projects/idlepoke-02-impacto.webp",
        alt: "Gameplay real do IdlePoke durante um combate contra um chefe.",
        focal: "52% 48%",
        fallback: "Combate indisponível.",
        sources: [
          {
            src: "/assets/production/site/projects/idlepoke-gameplay-dungeon-v01.webm",
            type: "video/webm",
          },
          {
            src: "/assets/production/site/projects/idlepoke-gameplay-dungeon-v01.mp4",
            type: "video/mp4",
          },
        ],
      },
      {
        kind: "image",
        src: "/assets/production/site/projects/idlepoke-03-dashboard-user-20260825.png",
        alt: "Dashboard público do IdlePoke com o funil de aquisição e a evolução diária de jogadores iniciados.",
        width: 1600,
        height: 900,
        focal: "50% 48%",
        fallback: "Dashboard indisponível.",
      },
    ],
  },
  {
    id: "voe-alto",
    name: "Clínica Voe Alto",
    type: "Site institucional",
    summary:
      "Uma presença digital acolhedora para apresentar especialidades e facilitar o contato de pacientes e famílias.",
    mediaLabel: "Passeio pelo site, fachada e ambientação conceitual da Clínica Voe Alto",
    logo: {
      src: "/assets/production/site/projects/voe-alto-logo-mark.png",
      mutedSrc: "/assets/production/site/projects/voe-alto-logo-mark.png",
      width: 724,
      height: 606,
      className: "project-row__logo--voe-alto",
    },
    links: [
      {
        href: "https://clinicavoealto.com.br/",
        label: "Conhecer o site",
        ariaLabel: "Conhecer o site da Clínica Voe Alto, abre outro site em nova aba",
      },
    ],
    media: [
      {
        kind: "video",
        poster: "/assets/production/site/projects/voe-alto-site-tour-poster-v2.webp",
        alt: "Passeio em vídeo pelo site da Clínica Voe Alto.",
        focal: "50% 50%",
        fallback: "Passeio pelo site indisponível.",
        sources: [
          {
            src: "/assets/production/site/projects/voe-alto-site-tour-v2.webm",
            type: "video/webm",
          },
          {
            src: "/assets/production/site/projects/voe-alto-site-tour-v2.mp4",
            type: "video/mp4",
          },
        ],
      },
      {
        kind: "image",
        src: "/assets/production/site/projects/voe-alto-02-fachada.webp",
        alt: "Fachada da Clínica Voe Alto apresentada no site do projeto.",
        width: 1122,
        height: 1402,
        focal: "50% 55%",
        fallback: "Imagem da fachada indisponível.",
      },
      {
        kind: "image",
        src: "/assets/production/site/projects/voe-alto-mockup-03-tablet-v1.webp",
        alt: "Ambientação conceitual do site da Clínica Voe Alto em um tablet.",
        width: 1536,
        height: 1024,
        focal: "51% 50%",
        fallback: "Apresentação do site indisponível.",
      },
    ],
  },
];

function ProjectFrame({ media }: { media: ProjectMedia }) {
  return (
    <figure
      className="project-frame"
      style={{ "--project-focal": media.focal } as CSSProperties}
    >
      {media.kind === "image" ? (
        <Image
          src={media.src}
          alt={media.alt}
          width={media.width}
          height={media.height}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <video muted loop playsInline preload="metadata" poster={media.poster} aria-label={media.alt}>
          {media.sources.map((source) => (
            <source src={source.src} type={source.type} key={source.src} />
          ))}
        </video>
      )}
      <span className="project-frame__fallback">{media.fallback}</span>
    </figure>
  );
}

export function ProjectsSection() {
  return (
    <section className="projects" id="projetos" aria-labelledby="projects-title">
      <header className="projects__intro">
        <div className="projects__intro-copy">
          <h2 className="projects__title" id="projects-title">
            <span className="projects__title-line">
              <span className="projects__title-line-inner">
                Projetos reais para apresentar, organizar e divulgar
              </span>
            </span>
            <span className="projects__title-line">
              <span className="projects__title-line-inner">
                negócios com mais <span className="projects__title-emphasis">clareza.</span>
              </span>
            </span>
          </h2>
        </div>
      </header>

      <ol className="projects__list">
        {projects.map((project) => (
          <li key={project.id}>
            <article
              className="project-row"
              id={`projeto-${project.id}`}
              aria-labelledby={`project-${project.id}-title`}
            >
              <div className="project-row__content">
                <div className="project-row__meta">
                  <div className="project-row__heading">
                    <span
                      className={`project-row__logo ${project.logo.className ?? ""}`.trim()}
                      aria-hidden="true"
                    >
                      <Image
                        src={project.logo.src}
                        alt=""
                        width={project.logo.width}
                        height={project.logo.height}
                      />
                      <span className="project-row__logo-muted">
                        <Image
                          src={project.logo.mutedSrc}
                          alt=""
                          width={project.logo.width}
                          height={project.logo.height}
                        />
                      </span>
                    </span>
                    <div>
                      <h3 className="project-row__name" id={`project-${project.id}-title`}>
                        {project.name}
                      </h3>
                      <span className="project-row__type">{project.type}</span>
                    </div>
                  </div>
                  <p className="project-row__summary">{project.summary}</p>
                  <div className="project-row__links">
                    {project.links.map((link) => (
                      <a
                        className="project-row__link"
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.ariaLabel}
                        key={link.href}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="project-row__media" aria-label={project.mediaLabel}>
                  {project.media.map((media) => (
                    <ProjectFrame media={media} key={media.kind === "image" ? media.src : media.poster} />
                  ))}
                </div>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
