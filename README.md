# Site Sifego

Aplicação oficial da Sifego migrada da versão estática aprovada para Next.js, React e TypeScript estrito.

## Estado de publicação

O projeto nasce com indexação desativada. A política, os 40 assets e o showreel v10 foram aprovados em 28 de agosto de 2026. Não altere `NEXT_PUBLIC_SITE_INDEXABLE` para `true` antes da aprovação explícita da publicação definitiva.

## Desenvolvimento local

Requisitos:

- Node.js 20.9 ou superior.
- npm 11 ou versão compatível com o Node instalado.

Comandos:

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run assets:check
npm run test:e2e
npm run build
```

Abra `http://localhost:3000` durante o desenvolvimento.

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e defina:

- `NEXT_PUBLIC_SITE_URL`: domínio absoluto da publicação, incluindo `https://`.
- `NEXT_PUBLIC_SITE_INDEXABLE`: mantenha `false` até a aprovação final de publicação.

## Estrutura

- `src/app`: rotas, layout, metadados, sitemap, robots e páginas institucionais.
- `src/components`: seções visuais e experiência interativa.
- `src/lib`: configuração compartilhada do site.
- `public/assets`: apenas os 40 arquivos usados pela aplicação.
- `tests/e2e`: regressões de layout, navegação, movimento reduzido e acessibilidade.
- `runtime-assets-manifest.json`: inventário reproduzível com tamanho e SHA-256 dos assets em uso.
- `scripts/runtime-assets.mjs`: detecta referências ausentes, arquivos públicos sem uso e divergências no manifesto.
- `scripts/generate-favicon.mjs`: recria o favicon ICO a partir do símbolo SVG aprovado.
- `scripts/generate-social-image.mjs`: recria a imagem Open Graph de 1200 × 630 px.
- `scripts/check-cloudflare-config.mjs`: valida exportação, headers, cache e bloqueio dos endereços de staging.

## Decisões importantes

- A versão estática aprovada permanece na raiz do projeto e na tag Git `approved-static-2026-08-25`.
- O diretório `acervo-anterior/` não é importado pela aplicação e não deve ser alterado.
- As fontes são servidas pelo mecanismo de fontes do Next.js, sem requisição do navegador ao Google Fonts.
- Imagens já exportadas para web são servidas sem nova recompressão para preservar fidelidade visual.
- Não há formulário ou backend no site. A única ação de conversão continua sendo iniciar uma conversa no WhatsApp.
- O arquivo `public/_headers` aplica CSP, proteção contra framing, política de referrer, restrição de permissões e cache imutável no Cloudflare Pages.
- Vídeos contínuos possuem pausa persistente e respeitam `prefers-reduced-motion` e economia de dados.

## Publicação

O projeto está preparado como exportação estática para Cloudflare Pages. Configuração do staging:

1. Framework preset: `Next.js (Static HTML Export)`.
2. Build command: `npm run build`.
3. Build directory: `out`.
4. Definir `NEXT_PUBLIC_SITE_URL` com o endereço HTTPS do ambiente.
5. Manter `NEXT_PUBLIC_SITE_INDEXABLE=false` no staging.
6. Executar `npm run check` e `npm run test:e2e` antes do envio.
7. Alterar `NEXT_PUBLIC_SITE_INDEXABLE` para `true` somente após aprovação definitiva e em domínio próprio aprovado.

Consulte `../docs/pre-publicacao/` para a auditoria técnica, os bloqueios externos e o checklist de publicação.
