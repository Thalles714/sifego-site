import Link from "next/link";
import { BrandSymbol } from "@/components/brand-symbol";
import { projectNavigation, services } from "@/lib/content";
import { whatsappUrl } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer" id="rodape" aria-label="Rodapé da Sifego">
      <nav className="site-footer__directory-grid" aria-label="Diretório do rodapé">
        <section className="footer-group" aria-labelledby="footer-projects-title">
          <h2 className="footer-group__label" id="footer-projects-title">Projetos</h2>
          <ul className="footer-group__list">
            {projectNavigation.map((project) => (
              <li key={project.id}><a className="footer-group__link" href={`#projeto-${project.id}`}>{project.label}</a></li>
            ))}
          </ul>
        </section>

        <section className="footer-group" aria-labelledby="footer-services-title">
          <h2 className="footer-group__label" id="footer-services-title">Serviços</h2>
          <ul className="footer-group__list">
            {services.map((service) => (
              <li key={service.id}><a className="footer-group__link" href={`#servico-${service.id}`}>{service.title}</a></li>
            ))}
          </ul>
        </section>

        <section className="footer-group" aria-labelledby="footer-navigation-title">
          <h2 className="footer-group__label" id="footer-navigation-title">Navegação</h2>
          <ul className="footer-group__list">
            <li><a className="footer-group__link" href="#inicio">Início</a></li>
            <li><a className="footer-group__link" href="#projetos">Projetos</a></li>
            <li><a className="footer-group__link" href="#servicos">Serviços</a></li>
            <li><a className="footer-group__link" href="#como-trabalhamos">Como trabalhamos</a></li>
            <li><Link className="footer-group__link" href="/politica-de-privacidade">Privacidade</Link></li>
            <li><a className="footer-group__link" href="#inicio">Voltar ao topo</a></li>
          </ul>
        </section>

        <section className="footer-group" aria-labelledby="footer-contact-title">
          <h2 className="footer-group__label" id="footer-contact-title">Contato</h2>
          <ul className="footer-group__list">
            <li>
              <a
                className="footer-group__link footer-group__link--external"
                href={whatsappUrl}
                data-analytics-event="whatsapp_click"
                data-cta-location="footer_directory"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp da Sifego, abre outro site em nova aba"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </section>
      </nav>

      <div className="site-footer__closing">
        <div className="site-footer__conversation">
          <h2 className="site-footer__title">Vamos conversar sobre o seu projeto?</h2>
          <div className="site-footer__actions">
            <a
              className="site-footer__cta external-action"
              href={whatsappUrl}
              data-analytics-event="whatsapp_click"
              data-cta-location="footer_cta"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Agende uma reunião pelo WhatsApp, abre outro site em nova aba"
            >
              Agende uma reunião
            </a>
            <p className="site-footer__support">Conversa inicial para entender a necessidade e preparar sua proposta.</p>
          </div>
        </div>

        <div className="site-footer__institutional">
          <p>© <span data-current-year>2026</span> Sifego</p>
          <p>Soluções digitais sob medida</p>
        </div>

        <a className="site-footer__symbol-link" href="#inicio" aria-label="Sifego, voltar ao início">
          <BrandSymbol className="site-footer__symbol" />
        </a>
      </div>
    </footer>
  );
}
