import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de privacidade | Sifego",
  description: "Como a Sifego trata informações relacionadas ao uso deste site.",
  alternates: { canonical: "/politica-de-privacidade" },
  openGraph: {
    title: "Política de privacidade | Sifego",
    description: "Como a Sifego trata informações relacionadas ao uso deste site.",
    url: "/politica-de-privacidade",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="legal-page" id="conteudo">
      <article className="legal-page__shell">
        <p className="legal-page__eyebrow">Privacidade</p>
        <h1 className="legal-page__title">Política de privacidade</h1>
        <p className="legal-page__lead">
          Esta página explica quais informações podem ser tratadas quando você visita o site da Sifego ou inicia uma conversa pelo WhatsApp.
        </p>

        <section>
          <h2>Informações tratadas pelo site</h2>
          <p>
            O site não possui formulário de cadastro, área de usuário ou coleta direta de dados pessoais. Informações técnicas essenciais podem ser registradas pela infraestrutura de hospedagem para segurança, disponibilidade e diagnóstico.
          </p>
        </section>

        <section>
          <h2>Contato pelo WhatsApp</h2>
          <p>
            Ao usar os links de conversa, você deixa este site e passa a utilizar o WhatsApp. As informações enviadas nessa conversa são usadas para compreender sua necessidade, responder ao contato e preparar uma proposta quando for adequado.
          </p>
        </section>

        <section>
          <h2>Compartilhamento e conservação</h2>
          <p>
            A Sifego não comercializa dados pessoais. Informações podem ser tratadas por fornecedores necessários à comunicação e à hospedagem, dentro das finalidades descritas nesta política. Os dados são mantidos somente pelo período necessário para atender ao contato e cumprir obrigações aplicáveis.
          </p>
        </section>

        <section>
          <h2>Seus direitos e contato</h2>
          <p>
            Você pode solicitar informações, correção ou exclusão de dados fornecidos em uma conversa entrando em contato pelo mesmo canal de WhatsApp disponível no site.
          </p>
        </section>

        <p className="legal-page__updated">Última atualização: 26 de agosto de 2026.</p>
        <Link className="legal-page__back" href="/">
          Voltar para o site
        </Link>
      </article>
    </main>
  );
}
