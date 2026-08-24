# Pousada Cataratas — como construir com este design system

## Envolva tudo em `Brand`

`Brand` é a raiz obrigatória. É ela que liga as duas famílias tipográficas e a
cor de tinta base. **Sem `Brand` à volta, os componentes continuam a funcionar
mas renderizam na fonte do documento** — deixam de parecer da marca, e nada no
ecrã avisa que falta.

```jsx
<Brand>
  <Band tone="cream-light">
    <SectionHeader align="center" rule eyebrow="Reconhecimento" title="A pousada mais bem avaliada" />
  </Band>
</Brand>
```

## O idioma de estilo: tokens CSS, não classes utilitárias

Não há utilitários tipo Tailwind aqui, e não há props de estilo. Os componentes
trazem o seu próprio aspecto; **para a sua própria composição, use as variáveis
CSS** — são a única maneira de o que você escreve combinar com o que o DS
desenha. Nunca invente hexadecimais.

| Grupo | Tokens |
|---|---|
| Marca | `--pc-navy` `--pc-navy-dark` `--pc-navy-light` `--pc-gold` `--pc-gold-dark` `--pc-blue` `--pc-blue-dark` |
| Texto | `--pc-ink` `--pc-text` `--pc-text-muted` `--pc-text-soft` `--pc-text-faint` `--pc-text-label` |
| Superfícies | `--pc-surface` `--pc-cream-light` `--pc-cream-soft` `--pc-cream` `--pc-cream-deep` `--pc-slate` |
| Fios | `--pc-line` `--pc-line-soft` `--pc-line-navy` `--pc-line-gold` |
| Tipografia | `--pc-font-serif` `--pc-font-sans` |
| Entreletra | `--pc-track-eyebrow` `--pc-track-wide` `--pc-track-btn` |
| Espaço | `--pc-space-1` … `--pc-space-6` |
| Sombra | `--pc-shadow-soft` `--pc-shadow` |

```jsx
<div style={{ background: "var(--pc-cream)", padding: "var(--pc-space-5)", color: "var(--pc-text-muted)" }}>
```

## Regras da casa

- **Canto reto.** Nenhuma superfície de conteúdo é arredondada. Se acrescentar
  um contentor seu, `border-radius: 0`.
- **Um recurso de separação, nunca três.** Um cartão distingue-se do fundo por
  tom, **ou** por um fio de 1px, **ou** por uma sombra baixa — ver `Card` com
  `variant` `plain` / `bordered` / `raised`.
- **Serifada só em títulos e números de destaque** (`--pc-font-serif`); todo o
  resto na sem-serifa.
- **Versais espaçadas** são a assinatura da marca: rótulos e botões vão em
  maiúsculas por CSS — escreva o texto normal, não em CAPS.
- **O azul `--pc-blue` é exclusivo da acção de reservar.** Dourado para
  campanhas, navy para o resto.
- **Nunca `@media` para adaptar um componente.** `StatGroup` e `ListRow`
  reorganizam-se por consulta de contentor, por isso funcionam dentro de colunas
  estreitas. Se compuser algo que precise de se adaptar, use `@container`.

## Os componentes

`Brand` (raiz) · `Band` (faixa de secção) · `SectionHeader` `Eyebrow` `Rule`
(cabeçalhos) · `Button` · `Card` · `Stat` `StatGroup` (números) · `Stars`
`Rating` (avaliação) · `ListRow` (linha de lista).

Props que mais mudam o aspecto:

- `Button` — `variant` `solid` | `outline` | `chip`, `tone` `navy` | `gold` |
  `blue`, `size` `sm` | `md` | `lg`, e `external` para a seta diagonal de link
  que abre fora.
- `Band` — `tone` `surface` | `cream` | `cream-light` | `navy`.
- `Card` — `variant` `plain` | `bordered` | `raised`.
- `SectionHeader` — `align` `start` | `center`, `rule` para o fio dourado.

**Sobre `Band tone="navy"` os componentes invertem-se sozinhos** — títulos e
rótulos passam a branco, o `Button variant="outline"` fica de contorno branco.
Não force cores à mão nessa faixa.

## Onde está a verdade

Leia os ficheiros reais antes de estilizar — batem sempre o resumo acima:
`_ds/<pasta>/styles.css` e o que ele importa (`_ds_bundle.css` traz o `:root`
com todos os tokens e as regras dos componentes), e o `.prompt.md` de cada
componente, que tem a sua descrição e as props com comentário.

## Exemplo idiomático

```jsx
<Brand>
  <Band tone="cream-light">
    <SectionHeader
      align="center"
      rule
      eyebrow="Reconhecimento"
      title="A pousada mais bem avaliada de Foz do Iguaçu"
      intro="Nº 1 no ranking de pousadas, entre 84 avaliadas pelos viajantes."
    />
    <div style={{ marginTop: "var(--pc-space-4)", display: "flex", justifyContent: "center", gap: "var(--pc-space-2)" }}>
      <Rating value={4.5} display="4,5" label="4,5 de 5 estrelas" />
    </div>
    <div style={{ marginTop: "var(--pc-space-4)", textAlign: "center" }}>
      <Button variant="solid" tone="blue" size="lg">Reservar agora</Button>
    </div>
  </Band>
</Brand>
```
