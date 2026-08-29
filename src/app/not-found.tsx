import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página não encontrada | Sifego",
};

export default function NotFoundPage() {
  return (
    <main className="legal-page" id="conteudo">
      <div className="legal-page__shell">
        <p className="legal-page__eyebrow">Erro 404</p>
        <h1 className="legal-page__title">Esta página não foi encontrada.</h1>
        <p className="legal-page__lead">O endereço pode ter mudado ou não existir.</p>
        <Link className="legal-page__back" href="/">
          Voltar para o início
        </Link>
      </div>
    </main>
  );
}
