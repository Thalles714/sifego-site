import Image from "next/image";
import { services, type ServiceContent } from "@/lib/content";

type RailCard = {
  id: string;
  title: string;
  description: string;
  next: {
    id: string;
    label: string;
    returnsToStart?: boolean;
  };
};

const railCards: Array<ServiceContent & Pick<RailCard, "next">> = services.map((service, index) => {
  const nextService = services[index + 1];
  return {
    ...service,
    next: nextService
      ? { id: nextService.id, label: `Mostrar o serviço ${nextService.title}` }
      : { id: "sobre", label: "Voltar ao início dos serviços", returnsToStart: true },
  };
});

function RailStepButton({ next }: { next: RailCard["next"] }) {
  return (
    <button
      className={`rail-card__step${next.returnsToStart ? " rail-card__step--return" : ""}`}
      type="button"
      data-rail-step={next.id}
      aria-controls={`hero-card-${next.id}`}
      aria-label={next.label}
    >
      <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
        {next.returnsToStart ? (
          <path
            d="M6 10.5v-8M2.75 5.5 6 2.25 9.25 5.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M6 1.5v8M2.75 6.5 6 9.75 9.25 6.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </button>
  );
}

export function HeroSection() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="hero__top">
        <h1 className="hero__title" id="hero-title">
          <span className="headline-mask">
            <span className="headline-line headline-line__inner">
              Soluções digitais para o que
            </span>
          </span>
          {" "}
          <span className="headline-mask">
            <span className="headline-line headline-line--brand headline-line__inner">
              <span className="hero__brand-name">seu negócio precisa.</span>
            </span>
          </span>
        </h1>
      </div>

      <div className="hero__stage">
        <figure className="showreel" aria-label="Filme conceitual da marca Sifego">
          <div className="showreel__motion">
            <video
              className="showreel__video"
              data-showreel-version="v10"
              muted
              loop
              playsInline
              preload="metadata"
              poster="/assets/production/site/hero-rail/01-sobre-citylight.webp"
              aria-label="Filme conceitual da marca Sifego"
            >
              <source
                media="(max-width: 767px)"
                src="/assets/production/final/showreel-sifego-brand-hero-mobile-v10.mp4"
                type="video/mp4"
              />
              <source
                src="/assets/production/final/showreel-sifego-brand-hero-ultrawide-v10.mp4"
                type="video/mp4"
              />
            </video>

            <div className="showreel__placeholder" aria-hidden="true">
              <Image
                className="showreel__poster"
                src="/assets/production/site/hero-rail/01-sobre-citylight.webp"
                alt=""
                fill
                sizes="(max-width: 767px) 100vw, 78vw"
                priority
                fetchPriority="high"
              />
            </div>
            <p className="showreel__fallback">Filme da Sifego indisponível.</p>
          </div>
        </figure>

        <div className="service-rail-shell">
          <aside
            className="service-rail"
            aria-label="Serviços em destaque"
            aria-describedby="rail-instructions"
            tabIndex={0}
          >
            <span id="rail-instructions" hidden>
              Use a rolagem, as setas do teclado ou os controles dos cartões para navegar.
            </span>
            <div className="service-rail__track">
              <article
                className="rail-card rail-card--about"
                data-card="sobre"
                id="hero-card-sobre"
                tabIndex={-1}
              >
                <div className="rail-card__copy">
                  <div className="rail-card__topline rail-card__topline--about">
                    <h2>Sobre Sifego</h2>
                    <span className="rail-card__topline-actions">
                      <span className="rail-card__availability">Agenda aberta</span>
                      <RailStepButton next={{ id: "sites", label: "Mostrar o serviço Sites e landing pages" }} />
                    </span>
                  </div>
                  <p>
                    Criamos sites, sistemas, automações, branding e campanhas com escopo, prazo e
                    investimento definidos para cada projeto.
                  </p>
                </div>
                <div className="rail-card__media rail-card__media--about has-image">
                  <Image
                    className="rail-card__media-image"
                    src="/assets/production/site/hero-rail/01-sobre-citylight.webp"
                    alt="Aplicação conceitual da marca Sifego em um citylight arquitetônico."
                    width={960}
                    height={540}
                    sizes="(max-width: 991px) calc(100vw - 32px), 22vw"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />
                </div>
              </article>

              {railCards.map((card) => (
                <article
                  className="rail-card"
                  data-card={card.id}
                  id={`hero-card-${card.id}`}
                  tabIndex={-1}
                  key={card.id}
                >
                  <div className="rail-card__copy">
                    <div className="rail-card__topline">
                      <span>Serviço</span>
                      <RailStepButton next={card.next} />
                    </div>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>
                  <div
                    className={`rail-card__media rail-card__media--${card.railMedia.treatment} has-image`}
                  >
                    <Image
                      className="rail-card__media-image"
                      src={card.railMedia.src}
                      alt={card.railMedia.alt}
                      width={card.railMedia.width}
                      height={card.railMedia.height}
                      sizes="(max-width: 991px) calc(100vw - 32px), 22vw"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </article>
              ))}
            </div>
          </aside>
          <div className="service-rail__fade" aria-hidden="true"></div>
        </div>
      </div>
    </section>
  );
}
