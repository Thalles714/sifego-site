import { getSiteUrl, whatsappUrl } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const siteUrl = getSiteUrl();
  const page = (pathname: string) => new URL(pathname, siteUrl).toString();

  const content = `# Sifego

> Estúdio de soluções digitais sob medida para empresas e profissionais de todo o Brasil que precisam apresentar, organizar, automatizar ou divulgar seus negócios.

## Serviços

- Sites e landing pages: páginas para apresentar empresas, ofertas e campanhas.
- Tráfego pago: planejamento, acompanhamento e ajuste de campanhas; o investimento em mídia é pago separadamente pelo cliente.
- Aplicativos personalizados: sistemas, painéis e aplicações web para organizar informações e processos.
- Automações e integrações: fluxos que reduzem tarefas manuais e conectam ferramentas.
- Branding: direção e sistemas de identidade visual; registro jurídico e produção gráfica não estão incluídos automaticamente.
- Consultoria digital: serviço pago, com objetivo, escopo, entregáveis e prazo definidos.

## Como contratar

A conversa inicial pelo WhatsApp serve para compreender a necessidade e preparar uma proposta personalizada. Ela não inclui consultoria completa nem auditoria gratuita. Cada projeto recebe escopo, prazo, condições e investimento próprios; não existe preço universal.

Inteligência artificial e criação de prompts não fazem parte da oferta comercial da Sifego.

## Páginas importantes

- [Página inicial](${page("/")})
- [Política de privacidade](${page("/politica-de-privacidade")})
- [WhatsApp oficial](${whatsappUrl})
`;

  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
