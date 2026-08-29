import Image from "next/image";
import { services, type ServiceContent } from "@/lib/content";

function ServiceMedia({ service }: { service: ServiceContent }) {
  const media = service.showcaseMedia;
  if (media.kind === "video") {
    return (
      <div className="service-proof__video-shell">
        <Image
          className="service-proof__poster"
          src={media.poster}
          alt=""
          fill
          sizes="(max-width: 767px) 100vw, 50vw"
          loading="lazy"
          decoding="async"
        />
        <video
          className="service-proof__video"
          data-service-video
          data-branding-version="v04"
          muted
          loop
          playsInline
          preload="metadata"
          poster={media.poster}
          aria-label={media.alt}
        >
          <source src={media.src} type="video/webm" />
        </video>
      </div>
    );
  }

  return (
    <Image
      src={media.src}
      alt={media.alt}
      width={media.width}
      height={media.height}
      sizes="(max-width: 767px) 100vw, 50vw"
      loading="lazy"
      decoding="async"
    />
  );
}

export function ServicesSection() {
  return (
    <section className="service-showcase" id="servicos" aria-labelledby="services-title">
      <header className="service-showcase__intro">
        <div className="service-showcase__intro-copy">
          <h2 className="service-showcase__title" id="services-title">
            <span className="service-showcase__title-line">
              <span className="service-showcase__title-line-inner">
                A solução certa começa pelo problema
              </span>
            </span>
            <span className="service-showcase__title-line">
              <span className="service-showcase__title-line-inner service-showcase__title-emphasis">
                que precisa resolver.
              </span>
            </span>
          </h2>
        </div>
      </header>

      <ol className="service-showcase__grid">
        {services.map((service) => (
          <li key={service.id}>
            <article
              className="service-proof"
              id={`servico-${service.id}`}
              data-service-proof
              aria-labelledby={`servico-${service.id}-title`}
            >
              <figure className="service-proof__media">
                <ServiceMedia service={service} />
                <span className="service-proof__fallback">Mídia indisponível.</span>
              </figure>
              <div className="service-proof__copy">
                <div>
                  <h3 className="service-proof__title" id={`servico-${service.id}-title`}>
                    {service.title}
                  </h3>
                  <p className="service-proof__description">{service.description}</p>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
