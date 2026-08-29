# Preparação da presença digital, SEO, AEO/GEO e mensuração

Data da auditoria: 28 de agosto de 2026

Ambiente definitivo: pendente de domínio próprio

Homologação: `https://sifego.pages.dev`
Indexação: bloqueada por decisão explícita

## 1. Estado inicial registrado

- Repositório da aplicação limpo na branch `main`, remoto `https://github.com/Thalles714/sifego-site.git`.
- Landing page, política de privacidade e página 404 já existentes.
- Um H1 por página pública, hierarquia H2/H3 coerente e `lang="pt-BR"`.
- Title, description, Open Graph, Twitter Card, favicon, manifest, imagem social versionada e canonical condicional já existentes.
- `robots.txt` gerado pelo Next.js com `Disallow: /` enquanto `NEXT_PUBLIC_SITE_INDEXABLE=false`.
- Meta robots e Googlebot com `noindex, nofollow`.
- `X-Robots-Tag: noindex, nofollow` configurado para URLs `pages.dev` no Cloudflare Pages.
- Sitemap XML gerado com a home e a política, sem datas artificiais.
- CSP, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy` e `Permissions-Policy` existentes.
- Links externos abrem com `noopener noreferrer`, têm labels acessíveis e o WhatsApp é a única conversão principal.
- Não havia dados estruturados, `llms.txt`, GA4 ou Search Console.

O diretório principal possui mudanças e arquivos do usuário fora do repositório da aplicação. Eles não foram alterados, movidos, publicados nem incluídos neste trabalho.

## 2. Pesquisa de palavras-chave

Metodologia: observação dos resultados atuais para consultas brasileiras, leitura de intenção e aderência à oferta. Nenhuma ferramenta paga foi usada. Volume mensal, CPC e dificuldade numérica não foram confirmados e não são apresentados como fatos.

| Palavra-chave | Intenção, público e estágio | SERP e concorrência observada | Relevância e conversão | Página recomendada | Vantagens e riscos |
|---|---|---|---|---|---|
| soluções digitais sob medida | Comercial ampla; empresas comparando caminhos; consideração | Estúdios e software houses com ofertas múltiplas; concorrência moderada e significado ainda amplo | Alta aderência institucional; conversão média/alta | Home | Representa a oferta inteira; exige explicar imediatamente o que está incluído |
| soluções digitais para empresas | Comercial/informacional; decisores ainda definindo a solução; descoberta | Mistura consultorias, software, SaaS e conteúdo educativo; concorrência difusa | Boa cobertura, intenção menos específica | Futuro conteúdo institucional | Vocabulário natural; pode atrair busca por ferramentas prontas |
| criação de sites profissionais | Comercial; empresas e profissionais buscando fornecedor; decisão | Muitas agências, páginas locais e ofertas por preço; concorrência alta | Conversão alta para o serviço | Futura página de sites | Termo claro; disputa forte e risco de comparação apenas por preço |
| criação de landing pages | Comercial; anunciantes e empresas com campanha; decisão | Agências, construtores no-code e conteúdo educativo; concorrência alta | Conversão alta e escopo objetivo | Futura página de sites e landing pages | Intenção direta; precisa diferenciar serviço sob medida de ferramenta DIY |
| desenvolvimento de sistemas sob medida | Comercial; empresas com processo específico; consideração/decisão | Software houses e consultores especializados; concorrência moderada/alta | Conversão alta, ticket e ciclo maiores | Futura página de aplicativos personalizados | Linguagem muito aderente; requer prova e conteúdo original mais profundo |
| automação de processos empresariais | Comercial/informacional; operações com tarefas repetitivas; consideração | Consultorias BPM, RPA, SaaS e integradores; concorrência moderada/alta | Conversão alta quando o problema é concreto | Futura página de automações | Orientada ao problema; pode atrair procura por ferramentas ou cursos |
| integração de sistemas | Comercial/técnica; empresas com ferramentas desconectadas; consideração | Integradores corporativos, APIs e consultorias; concorrência alta | Conversão média/alta | Futura página de automações e integrações | Termo consolidado; amplo e frequentemente enterprise |
| branding e identidade visual | Comercial; negócios novos ou em reposicionamento; decisão | Estúdios, agências e pacotes de identidade; concorrência alta | Conversão alta para escopo bem explicado | Futura página de branding | Une estratégia e execução; risco de expectativa sobre naming, jurídico e impressão |
| gestão de tráfego pago | Comercial; empresas que querem contratar operação; decisão | Agências especializadas, diretórios e resultados locais; concorrência muito alta | Conversão alta, mas exige qualificação de mídia mínima | Futura página de tráfego | Termo usado pelo público; risco de promessa de resultado e disputa por preço |
| consultoria digital para empresas | Comercial/informacional; decisores que precisam priorizar; consideração | Consultorias de transformação digital e tecnologia; concorrência moderada, conceito amplo | Conversão média | Futura página de consultoria | Compatível com a oferta paga; precisa diferenciar conversa inicial de consultoria |

### Seleção recomendada

- Principal institucional: **soluções digitais sob medida**.
- Secundárias prioritárias: **criação de sites profissionais**, **desenvolvimento de sistemas sob medida**, **automação de processos empresariais**, **branding e identidade visual**, **gestão de tráfego pago**.
- Por serviço:
  - Sites e landing pages: **criação de sites profissionais**.
  - Tráfego pago: **gestão de tráfego pago**.
  - Aplicativos personalizados: **desenvolvimento de sistemas sob medida**.
  - Automações e integrações: **automação de processos empresariais**.
  - Branding: **branding e identidade visual**.
  - Consultoria: **consultoria digital para empresas**.

A home já comunica a ideia principal com linguagem natural. A headline aprovada não foi alterada para acomodar uma correspondência exata.

Fontes de observação: [Rafael Klein, sistemas personalizados](https://rafaelklein.com.br/solucoes/sistemas-web-personalizados), [Rosynni Lab, landing pages](https://www.rosynnilab.com.br/landing-pages), [AvantiCoreX, integração de sistemas](https://avanticorex.com.br/servicos/integracao-de-sistemas/), [B20, branding](https://b20.com.br/branding), [iguito, diretório de tráfego pago](https://iguito.com/pt/trafego-pago/), [B2B Stack, consultoria em transformação digital](https://www.b2bstack.com.br/categoria/consultoria-transformacao-digital).

## 3. Titles, descriptions e indexação

| URL | Objetivo | Palavra-chave | Title (aprox.) | Meta description (aprox.) | H1 | Canonical | Indexação atual |
|---|---|---|---|---|---|---|---|
| `/` | Apresentar a Sifego, serviços, projetos e próximo passo | soluções digitais sob medida | `Sifego \| Soluções digitais sob medida para empresas` (51) | `Sites, sistemas, automações, branding e campanhas com escopo definido para a necessidade de cada empresa.` (105) | `Soluções digitais para o que seu negócio precisa.` | Gerado com `NEXT_PUBLIC_SITE_URL` | `noindex, nofollow` |
| `/politica-de-privacidade` | Explicar o tratamento de informações | política de privacidade Sifego | `Política de privacidade \| Sifego` (32) | `Como a Sifego trata informações relacionadas ao uso deste site.` (63) | `Política de privacidade` | `/politica-de-privacidade` | `noindex, nofollow` |
| rota inexistente | Recuperar navegação após erro 404 | não aplicável | `Página não encontrada \| Sifego` | não aplicável | `Esta página não foi encontrada.` | não aplicável | não indexável |

## 4. Implementações técnicas

- JSON-LD na home com `Organization`, `WebSite` e seis entidades `Service`.
- Dados limitados ao que aparece no site ou está documentado: nome, descrição, fundador, Brasil, WhatsApp e serviços.
- Nenhum `LocalBusiness`, endereço, avaliação, estrela, prêmio ou `AggregateRating`.
- `llms.txt` factual e experimental, com serviços, limites, processo comercial, WhatsApp e páginas importantes.
- Canonical específico para a política de privacidade.
- CSP previamente compatível com o carregamento futuro do Google tag.
- GA4 preparado com `NEXT_PUBLIC_GA_MEASUREMENT_ID` e `NEXT_PUBLIC_ANALYTICS_ENABLED=false`.
- O script só carrega se o ID seguir o formato `G-...` e a ativação estiver explicitamente em `true`.
- Google Signals e personalização de anúncios ficam desativados no código.
- Evento customizado `whatsapp_click` com `cta_location`, `link_url` e `page_path` nos cinco links de WhatsApp.
- Nenhuma mensagem, texto digitado, número do visitante ou conversa é coletada pelo evento.

O JSON-LD segue a recomendação de usar dados completos, visíveis e não enganosos. A presença de marcação não garante resultado enriquecido ou citação. Fontes: [Organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization), [diretrizes gerais de dados estruturados](https://developers.google.com/search/docs/appearance/structured-data/sd-policies), [nomes de sites com `WebSite`](https://developers.google.com/search/docs/appearance/site-names).

O `llms.txt` é tratado como convenção experimental, não como sinal garantido. O trabalho de AEO/GEO está concentrado em clareza, entidades consistentes, conteúdo útil, estrutura semântica e SEO convencional. A orientação atual do Google afirma que as práticas fundamentais de SEO continuam relevantes para recursos generativos. Fontes: [guia oficial para recursos generativos](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide), [proposta do llms.txt](https://llmstxt.org/).

## 5. Páginas de serviços e FAQ

Não foram criadas páginas de serviço neste ciclo. A arquitetura aprovada prevê uma landing e o conteúdo atual de cada serviço é uma frase curta. Criar seis URLs agora produziria páginas superficiais e repetitivas.

Evolução recomendada: criar uma página por vez quando houver conteúdo original sobre situações atendidas, processo, limites, entregáveis, exemplos reais e dúvidas específicas. A ordem inicial sugerida é sites, sistemas e automações, pois combinam intenção comercial direta com provas já visíveis no portfólio.

Também não foi criado `FAQPage`. O site atual não possui uma seção de perguntas visível e respostas artificiais não ajudariam o visitante. Dúvidas reais podem ser reunidas a partir das conversas comerciais antes de uma futura FAQ.

## 6. GA4 preparado, ainda inativo

Não criar a propriedade nem ativar a coleta antes do domínio e da decisão de consentimento.

Quando autorizado:

1. Criar a propriedade e um fluxo Web usando o domínio próprio.
2. Registrar o Measurement ID apenas como variável de ambiente do Cloudflare Pages.
3. Definir retenção mínima compatível com a finalidade.
4. Manter Google Signals, publicidade, remarketing e compartilhamento ampliado desativados.
5. Atualizar a política de privacidade com provedor, finalidade, base/consentimento, retenção e forma de revogação.
6. Implementar e validar o mecanismo de consentimento aplicável antes de definir `NEXT_PUBLIC_ANALYTICS_ENABLED=true`.
7. Testar `page_view` e `whatsapp_click` no Realtime e DebugView, sem clicar para enviar mensagem.
8. Criar uma dimensão personalizada para `cta_location` somente se o relatório realmente for usado.

Relatórios iniciais: aquisição por origem/mídia, busca orgânica, referência, redes sociais, direto, dispositivo, landing page e cliques no WhatsApp. Eventos e consentimento seguem [configuração oficial de eventos](https://developers.google.com/analytics/devguides/collection/ga4/events) e [gestão de consentimento](https://support.google.com/analytics/answer/12329599).

UTMs futuras:

- Instagram: `?utm_source=instagram&utm_medium=social&utm_campaign=perfil`
- Facebook: `?utm_source=facebook&utm_medium=social&utm_campaign=perfil`

## 7. Search Console após o domínio

Nenhuma propriedade foi criada, nenhum sitemap foi enviado e nenhuma indexação foi solicitada.

Após a compra do domínio:

1. Adicionar uma propriedade de domínio, sem protocolo e sem caminho.
2. Verificar a propriedade por registro DNS.
3. Configurar HTTPS e escolher a forma canônica (`www` ou raiz).
4. Atualizar `NEXT_PUBLIC_SITE_URL`, canonical, Open Graph, sitemap e `llms.txt`.
5. Manter `NEXT_PUBLIC_SITE_INDEXABLE=false` e validar o novo build.
6. Testar redirects, headers, conteúdo, dados estruturados e links no domínio real.
7. Pedir autorização explícita para indexar.
8. Somente depois, remover todas as camadas de `noindex`, publicar, enviar o sitemap e solicitar inspeção das páginas principais.

Uma propriedade de domínio cobre protocolos e subdomínios e exige DNS. Fonte: [propriedades do Search Console](https://support.google.com/webmasters/answer/34592).

## 8. Redes sociais e Meta

Estado: preparação editorial concluída; criação/configuração depende de login, disponibilidade de `@sifego`, 2FA, aceite de termos e escolha de conta ou portfólio pelo proprietário.

Configuração recomendada:

- Instagram: nome `Sifego`, usuário preferencial `@sifego`, conta profissional do tipo empresa, categoria verdadeira ligada a serviços digitais, símbolo oficial, WhatsApp e site de homologação com UTM enquanto o domínio não existe.
- Facebook: Página `Sifego`, categoria específica e verdadeira, símbolo oficial, sem endereço e sem horário presencial, site e WhatsApp.
- Administração inicialmente restrita ao proprietário; ativar 2FA.
- Conectar a Página e o Instagram pelo Meta Business Suite ou Central de Contas.
- Não publicar posts nem criar alternativa de usuário sem aprovação.
- Não criar Google Business Profile.

Os textos preparados estão em `docs/redes-sociais-conteudo-inicial.md`. Não foram criadas imagens sociais novas; isso preserva os materiais visuais aprovados e evita iniciar produção sem o fluxo visual obrigatório.

## 9. Testes realizados

- `npm run check`: lint, TypeScript, branding, configuração de hosting, inventário dos 40 assets e build aprovados.
- Build estático: home, 404, ícone, `llms.txt`, manifest, política, robots e sitemap gerados.
- E2E local: 26 testes aprovados e 4 pulados por serem exclusivos do outro dispositivo.
- Axe: nenhuma violação automática crítica ou séria.
- Teclado, mobile, desktop, temas, pausa de vídeo e `prefers-reduced-motion`: aprovados pela suíte.
- Console, falhas de runtime, rotas públicas, metadados sociais, 404 e bloqueio de indexação: aprovados.
- 40 assets: tamanho e SHA-256 conferidos.
- `npm audit`: nenhuma vulnerabilidade encontrada.
- Homologação antes do novo deploy: HTTP 200, HTTPS, CSP, Permissions Policy, Referrer Policy, `X-Content-Type-Options`, `X-Frame-Options` e `X-Robots-Tag: noindex, nofollow` confirmados na resposta pública.

### Lighthouse da homologação

Condições: Lighthouse 13.0.3, Chrome headless, URL `https://sifego.pages.dev/`, 28 de agosto de 2026. As rodadas são dados de laboratório e variam conforme rede, cache e servidor.

| Rodada | Dispositivo | Performance | Acessibilidade | Boas práticas | SEO | FCP | LCP | TBT | CLS | Speed Index | Peso | Requisições |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | Mobile | 68 | 100 | 100 | 69 | 1,2 s | 6,3 s | 100 ms | 0 | 9,3 s | 6.856 KiB | 48 |
| 2 | Mobile | 65 | 100 | 100 | 69 | 1,3 s | 6,3 s | 230 ms | 0 | 8,9 s | 5.977 KiB | 48 |
| 3 | Mobile | 68 | 100 | 100 | 69 | 1,8 s | 7,1 s | 90 ms | 0,006 | 6,7 s | 3.737 KiB | 48 |
| Mediana | Mobile | **68** | **100** | **100** | **69** | **1,3 s** | **6,3 s** | **100 ms** | **0** | **8,9 s** | **5.977 KiB** | **48** |
| 1 | Desktop | 83 | 100 | 100 | 69 | 0,9 s | 1,7 s | 20 ms | 0,001 | 4,4 s | 4.022 KiB | 47 |
| 2 | Desktop | 84 | 100 | 100 | 69 | 0,8 s | 1,6 s | 30 ms | 0,002 | 4,5 s | 14.075 KiB | 47 |
| 3 | Desktop | 85 | 100 | 100 | 69 | 0,9 s | 1,5 s | 10 ms | 0,003 | 4,3 s | 5.835 KiB | 47 |
| Mediana | Desktop | **84** | **100** | **100** | **69** | **0,9 s** | **1,6 s** | **20 ms** | **0,002** | **4,4 s** | **5.835 KiB** | **47** |

O SEO fica deliberadamente em 69 porque a homologação está bloqueada por `noindex` e `robots.txt`; liberar rastreamento apenas para aumentar a nota violaria a decisão do projeto. Acessibilidade e boas práticas atingiram 100 nas seis rodadas.

No mobile, o LCP é o poster do showreel e a carga total foi dominada por mídia. A rodada mediana transferiu cerca de 6 MiB, dos quais aproximadamente 3,9 MiB eram mídia e 1,9 MiB imagens; não havia terceiros. O relatório também apontou imagens maiores que o tamanho de exibição. A qualidade aprovada do showreel não foi reduzida sem comparação. Um ciclo futuro deve comparar, lado a lado: encodes mobile menores, poster responsivo, poster sem transição tardia, posteres de projetos em tamanhos responsivos e carregamento de vídeos abaixo da dobra somente quando próximos do viewport.

A API do PageSpeed Insights foi tentada nas seis combinações, mas recusou todas por cota diária compartilhada. O Lighthouse local oficial produziu as métricas acima. Fonte metodológica: [PageSpeed Insights API](https://developers.google.com/speed/docs/insights/v5/get-started).

### Validação após publicação

- Commit publicado: `73e582b` na branch `main`.
- Homologação principal: `https://sifego.pages.dev`.
- Preview imutável do deploy: `https://5701a2da.sifego.pages.dev`.
- Home e `llms.txt`: HTTP 200.
- `llms.txt`: `text/plain; charset=utf-8`.
- JSON-LD público: `Organization`, `WebSite` e seis entidades `Service` confirmados no HTML.
- GA4 público: ausente, como esperado enquanto `NEXT_PUBLIC_ANALYTICS_ENABLED=false`.
- `robots.txt`: `Disallow: /`.
- Meta robots e `X-Robots-Tag`: `noindex, nofollow`.
- Sitemap público válido, não enviado a mecanismos de busca.
- E2E na homologação: 26 aprovados e 4 pulados conforme dispositivo.

Ainda pendente: validação do JSON-LD em ferramenta visual externa após a futura liberação de rastreamento. O HTML e a estrutura foram validados localmente e na resposta pública.

## 10. Dependências do domínio e plano 30, 60 e 90 dias

### Antes do domínio

- Concluir Instagram, Facebook e conexão Meta com o proprietário presente.
- Aprovar textos e peças antes de publicar.
- Manter homologação bloqueada e não promovê-la como endereço definitivo.
- Completar auditorias públicas quando houver autorização de acesso de rede/navegador.

### 30 dias após o domínio

- Configurar DNS, HTTPS, canonicals, sitemap, robots, Open Graph e `llms.txt`.
- Criar GA4 e Search Console, validar consentimento e pedir autorização de indexação.
- Publicar perfis sociais com links do domínio e `sameAs` no JSON-LD.
- Medir baseline de desempenho e corrigir regressões comprovadas.

### 60 dias

- Monitorar consultas, páginas, cobertura, origem e cliques no WhatsApp.
- Reunir perguntas reais das conversas e decidir se existe base para FAQ.
- Planejar a primeira página de serviço com conteúdo original e prova real.

### 90 dias

- Publicar conteúdo útil orientado por dúvidas e dados observados, sem páginas em massa.
- Avaliar páginas de serviços adicionais conforme demanda e evidência.
- Revisar titles, snippets, Core Web Vitals, links internos e conversão para WhatsApp.

SEO não garante primeira posição nem citação por ferramentas de IA. O resultado depende de indexação, utilidade e originalidade do conteúdo, concorrência, autoridade, experiência da página, consistência da marca e tempo.
