import { BrandSymbol } from "@/components/brand-symbol";
import { whatsappUrl } from "@/lib/site";

export function SiteHeader() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>

      <header className="topbar" aria-label="Navegação principal">
        <div className="topbar__left">
          <a className="brand-mark" href="#inicio" aria-label="Sifego, voltar ao início">
            <BrandSymbol className="brand-mark__symbol" />
          </a>

          <nav className="service-nav" aria-label="Navegar pelas seções do site">
            <a className="nav-chip" href="#inicio">
              Início
            </a>
            <a className="nav-chip" href="#projetos">
              Projetos
            </a>
            <a className="nav-chip" href="#servicos">
              Serviços
            </a>
            <a className="nav-chip" href="#como-trabalhamos">
              Como trabalhamos
            </a>
          </nav>

          <button
            className="mobile-services-toggle"
            type="button"
            aria-controls="mobile-services-menu"
            aria-expanded="false"
          >
            Menu
          </button>
        </div>

        <div className="topbar__right">
          <a
            className="contact-chip external-action"
            href={whatsappUrl}
            data-analytics-event="whatsapp_click"
            data-cta-location="header"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contato no WhatsApp, abre outro site em nova aba"
          >
            Contato
          </a>
          <button
            className="motion-toggle"
            type="button"
            aria-label="Pausar vídeos"
            aria-pressed="false"
            title="Pausar vídeos"
            data-state="playing"
          >
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path className="motion-toggle__pause" d="M6.75 5.5v9M13.25 5.5v9" />
              <path className="motion-toggle__play" d="m7.25 5.25 7 4.75-7 4.75z" />
            </svg>
          </button>
          <button
            className="theme-toggle"
            type="button"
            aria-label="Ativar tema claro"
            title="Alternar tema"
          >
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <circle cx="10" cy="10" r="3.2" stroke="currentColor" strokeWidth="1.4" />
              <path
                d="M10 1.8v2M10 16.2v2M18.2 10h-2M3.8 10h-2M15.8 4.2l-1.4 1.4M5.6 14.4l-1.4 1.4M15.8 15.8l-1.4-1.4M5.6 5.6 4.2 4.2"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.4"
              />
            </svg>
          </button>
        </div>
      </header>

      <div className="mobile-menu" id="mobile-services-menu" hidden>
        <a href="#inicio">Início</a>
        <a href="#projetos">Projetos</a>
        <a href="#servicos">Serviços</a>
        <a href="#como-trabalhamos">Como trabalhamos</a>
      </div>
    </>
  );
}
