import { BrandSymbol } from "@/components/brand-symbol";
import { whatsappUrl } from "@/lib/site";

const steps = [
  {
    title: "Entender",
    description: "Conversamos sobre a necessidade, o contexto e o objetivo.",
  },
  {
    title: "Definir",
    description: "Definimos escopo, prazo e investimento para o projeto.",
  },
  {
    title: "Criar",
    description: "Desenvolvemos, validamos e entregamos o escopo.",
  },
];

export function ProcessSection() {
  return (
    <section className="process-section" id="como-trabalhamos" aria-labelledby="process-title">
      <header className="process-section__intro">
        <div className="process-section__intro-copy">
          <h2 className="process-section__title" id="process-title">
            <span className="process-section__title-line">
              <span className="process-section__title-line-inner">
                Atendimento <span className="process-section__title-emphasis">direto,</span>
              </span>
            </span>
            {" "}
            <span className="process-section__title-line">
              <span className="process-section__title-line-inner">do início à entrega.</span>
            </span>
          </h2>
        </div>
      </header>

      <div className="process-section__body">
        <ol className="process-steps">
          {steps.map((step) => (
            <li className="process-step" key={step.title}>
              <div>
                <h3 className="process-step__title">{step.title}</h3>
                <p className="process-step__description">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>

        <aside className="studio-panel" aria-labelledby="studio-panel-title">
          <div>
            <p className="studio-panel__eyebrow">Sifego / estúdio</p>
            <h3 className="studio-panel__title" id="studio-panel-title">
              Você conversa com quem entende, planeja e acompanha o projeto.
            </h3>
            <p className="studio-panel__description">
              A Sifego é um estúdio digital liderado por Thalles Leal.
            </p>
          </div>

          <div className="studio-panel__closing">
            <a
              className="studio-panel__cta external-action"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Agende uma reunião pelo WhatsApp, abre outro site em nova aba"
            >
              Agende uma reunião
            </a>
            <p className="studio-panel__support">
              Conte o que sua empresa precisa. A conversa inicial organiza as informações para
              prepararmos uma proposta personalizada.
            </p>
            <BrandSymbol className="studio-panel__symbol" />
          </div>
          {/* A fotografia do fundador não integra a composição até existir um retrato aprovado. */}
        </aside>
      </div>
    </section>
  );
}
