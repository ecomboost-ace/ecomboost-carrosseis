# Carrosséis EcomBoost

Produção e publicação automática dos carrosséis do Instagram **@ecomboost.ace**.

## Fluxo

1. **Pauta**: uma linha na planilha [Carrosséis EcomBoost · Pautas e publicação](https://docs.google.com/spreadsheets/d/1YZMqSz3HYhZOG6BWbobZTBLwYE9DaX0DG1cmmDEoboA/edit), status `Ideia`.
2. **Produção** (Claude): texto dos slides, legenda, fotos, design, checagens. Imagens em JPG no Cloudinary (`rlz9umtr`, preset `ecomboost_carrosseis`). Status vira `Aguardando aprovação`.
3. **Ajustes**: comentário na coluna "Comentários da aprovação" + status `Ajustes pedidos`. Claude refaz e volta para `Aguardando aprovação`.
4. **Aprovação**: status `Aprovado`.
5. **Publicação** (Make, cenário 6827220, a cada 15 min): publica quando chega a data e o horário da linha, grava o link do post e muda o status para `Publicado`. Falha vira `Erro`.
6. **Isca**: ManyChat responde quem comentar a palavra-chave em qualquer post.

## Estrutura

- `carrosseis/NNN-tema/`: um carrossel por pasta (`carrossel.html`, `img/`, `jpg/`, `legenda.txt`, `urls.txt`).
- `modelo/carrossel-modelo.html`: referência de layout aprovada (001 Nespresso).
- `scripts/render.js <html> <pasta-saida>`: gera `slide-01.png` a `slide-NN.png` (1080×1350).
- `scripts/widows.js <html>`: aponta palavras viúvas. Precisa responder "sem viúvas".
- `scripts/build.js`: injeta os ícones (`<i data-icon="nome">`, lucide-static).

```bash
npm ci
node scripts/widows.js carrosseis/001-nespresso/carrossel.html
node scripts/render.js carrosseis/001-nespresso/carrossel.html out
```

Converter para JPG (qualidade 92) antes de subir. O Instagram só aceita JPEG, 4:5, até 8 MB e de 2 a 10 imagens.

## Regras editoriais

- Linhas: **Case / notícia** (prioridade), **Educacional**, **Guia prático**. De 1 a 2 por semana.
- Tudo amarrado ao método **POC**: Posicionamento, Oferta e Conversão.
- Case: gancho contra-intuitivo → história → 3 pilares (com o efeito UAU no meio) → framework prático → CTA.
- Uma isca e uma palavra-chave por carrossel. CTA no último slide: "Comente PALAVRA…".
- Números e datas de marcas reais: conferir antes de pedir aprovação. Quando aproximados, avisar na legenda.
- Legenda no estilo EcomBoost: gancho forte, conceitos em CAIXA ALTA, listas com ↳, CTA de comentário.

## Regras de design

- Paleta: verde esmeralda (`#041C15`, `#06261D`, `#0B3D2E`, `#14573F`), dourado (`#C9A54C`, `#E6CD86`) e creme (`#F3EDE0`).
- Títulos em Playfair Display (serifada, 800, destaque em itálico dourado); texto em Inter.
- **Capa**: foto publicitária real da marca citada, com o produto visível e espaço livre para o título sem cobrir o que importa.
- Ao longo do carrossel, alternar fotos com produtos recortados (PNG) sobre o verde com brilho dourado.
- Marca citada: fotos oficiais da marca (site ou imprensa), com crédito "Imagens: divulgação MARCA" no rodapé. Sem marca: banco de imagens. IA só em último caso.
- Leitura escaneável: listas com ícones, linha do tempo para histórias, framework prático em cartões.
- Nenhuma palavra viúva em títulos e textos.
- Topo: "EcomBoost" e @ecomboost.ace. Rodapé: indicador de página e "ARRASTE →" na capa.
