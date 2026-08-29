# ADR 001: Next.js como fundação do site

Data: 26 de agosto de 2026  
Status: aceito para a migração

## Contexto

A página aprovada estava concentrada em um único arquivo HTML com estilos e comportamentos embutidos. O resultado visual era válido, mas a estrutura dificultava manutenção, testes, evolução, metadados por rota e controle da fronteira de publicação.

## Decisão

Usar Next.js com App Router, React, TypeScript estrito e ESLint. A aplicação permanece majoritariamente estática, com JavaScript no cliente somente para os comportamentos interativos já aprovados.

Os assets usados pelo front são copiados para `public/assets` e registrados por hash. Coleções de produção, referências, templates e o acervo anterior permanecem fora da aplicação publicada.

## Consequências

- A interface passa a ser composta por seções independentes.
- SEO técnico, robots, sitemap, manifest e rotas institucionais passam a ser controlados pelo framework.
- A experiência pode ser validada por tipos, lint, build e testes automatizados.
- A publicação exige um ambiente compatível com Next.js ou uma futura decisão explícita por exportação estática.
- O uso de Next.js não transforma tecnologias em categorias comerciais da Sifego.
