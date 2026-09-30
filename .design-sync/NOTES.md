# design-sync — notas deste repositório

## O essencial

- **O design system não existia.** Este repositório é a app Next.js do site
  (`pousada-next`, `private: true`), sem `dist/`, sem Storybook e sem camada de
  tokens. O pacote `design-system/` foi **escrito** no primeiro sync (2026-08-24),
  extraindo os valores que o site já usava: a paleta saiu da contagem de
  ocorrências de cada hex em `app/` e `components/`, a tipografia de
  `app/fonts.ts`, e os padrões de componente dos `pc-*` de `app/[lang]/home.css`
  e dos estilos inline de `app/[lang]/page.tsx`.
- **O site ainda NÃO usa o design system.** As páginas continuam com os `pc-*` e
  os estilos inline. O prefixo do DS é `pcds-` justamente para os dois poderem
  coexistir enquanto não houver migração. Se um dia migrarem, esta nota deixa de
  valer — verifique antes de assumir que o site é a fonte da verdade.

## Como correr

```sh
npm install --prefix design-system      # só na primeira vez / clone novo
npm run build --prefix design-system    # produz design-system/dist/
node .ds-sync/package-build.mjs --config .design-sync/config.json \
  --node-modules design-system/node_modules --entry ./design-system/dist/index.js --out ./ds-bundle
node .ds-sync/package-validate.mjs ./ds-bundle
```

- `--node-modules design-system/node_modules` — o React resolve lá (é
  peerDependency, o npm instala-a na mesma). A raiz também tem React, serve
  igualmente.
- O `build.mjs` do pacote chama `npx tsc` com `shell: true`, o que faz o Node
  imprimir um `DeprecationWarning [DEP0190]`. É ruído, não erro.

## O que se aprendeu a fazer as previews

- **`componentSrcMap` é obrigatório aqui.** Os componentes vivem agrupados por
  tema (`Typography.tsx` tem 3, `Surfaces.tsx` 2, `Stats.tsx` 2, `Rating.tsx` 2)
  e o conversor empareja por nome de ficheiro. Sem o mapa só 4 de 12 emparelham
  e os outros 8 perdem o JSDoc de cabeçalho no `.prompt.md`. Ao acrescentar um
  componente a um ficheiro existente, **acrescente-o também ao mapa**.
- **`provider: {component: "Brand"}`** — sem a raiz `.pcds` à volta os cartões
  renderizam na fonte do documento, não na da marca. O provider trata disso em
  todas as previews de uma vez.
- **`overrides` com `cardMode: "column"`** em `Band`, `Card` e `Stat`: as suas
  histórias são mais largas do que uma célula da grelha do produto e eram
  cortadas (`[GRID_OVERFLOW]`).

## Defeitos que a verificação apanhou (e que já estão corrigidos)

Ficam aqui porque são o tipo de coisa que volta a entrar sem se dar por ela:

- **Media queries de viewport em componentes.** `StatGroup` e `ListRow` usavam
  `@media`, por isso dentro de uma coluna estreita num ecrã largo continuavam na
  disposição larga e cortavam conteúdo. Passaram a **consultas de contentor**
  (`@container`), com um invólucro exterior a medir e um interior a reorganizar —
  um elemento não se pode estilizar a si próprio por `@container`. **Num
  componente de DS, nunca use `@media` para adaptação de layout.**
- **Texto fixado em azul dentro da faixa azul.** `SectionHeader` e `Stat` tinham
  a cor cravada, o que dava azul sobre azul — invisível — em `Band tone="navy"`.
  Há agora um bloco de inversão `.pcds-band--navy .pcds-*`. **Qualquer
  componente novo com cor de texto fixa precisa da sua linha nesse bloco.**
- **O mesmo `tone` a dar duas cores.** `tone="navy"` era `--pc-navy-light` em
  `solid` e `--pc-navy` em `chip`. Unificado em `--pc-navy`. O `--pc-navy-light`
  continua a existir como token para preenchimentos grandes em faixa pálida (é o
  que o botão de reconhecimento do site usa).

## Avisos conhecidos (esperados — não são novidade)

- `[FONT_REMOTE] "Gilda Display"` — a serifada vem do Google Fonts por `@import`
  remoto, tal como no site (`next/font/google` em `app/fonts.ts`). É intencional:
  não há ficheiro local dela no repositório. As outras duas famílias (Helvetica
  Neue Cyr e Archivo) são ficheiros de `public/fonts/` e viajam no bundle.
- `tokens/` sai **vazio** no bundle. O `tokensGlob` não emparelha, mas os tokens
  chegam à mesma: ficam no `:root` de `_ds_bundle.css`, que `styles.css`
  importa. O validador confirma-o (`tokens: 40 defined, 23 referenced`), por isso
  é cosmético. Se um dia quiser um `tokens/` povoado, o caminho é fazer o build
  do pacote emitir `dist/tokens.css` à parte, em vez de o embutir.

## Riscos de re-sync

- **O pacote é escrito à mão e o site não o consome.** Nada garante que a paleta
  do DS continue a ser a do site: se alguém mudar um hex em `home.css`, o DS não
  dá por isso. Antes de um re-sync, vale a pena repetir a contagem de cores
  (`grep -ohE "#[0-9A-Fa-f]{6}" app components -r`) e comparar com
  `design-system/src/tokens.css`.
- **A Gilda Display depende da rede** no momento em que o cartão renderiza. Num
  ambiente sem saída para `fonts.googleapis.com` os títulos caem para Georgia e
  as capturas parecem erradas sem que nada esteja partido.
- **As previews contêm dados reais da pousada** (27 apartamentos, 4.8, 418
  avaliações, nomes das promoções). Se esses números mudarem no site, as previews
  ficam desactualizadas — não quebram, mas mentem. Os do site vivem em
  `lib/tripadvisor.ts`.
- **`design-system/dist/` está no `.gitignore`.** Um clone novo tem de correr o
  build antes do conversor, senão dá `[NO_DIST]`.
- Verificado com Node 24.15.0, npm 11.12.1, esbuild 0.24 e Playwright/Chromium
  instalados em `%LOCALAPPDATA%\ms-playwright` durante este sync.
