# Rotina automática de carrosséis

Instruções para a tarefa agendada que roda nos dias úteis. Leia também o `README.md`, que traz as regras editoriais e de design.

## Antes de começar

1. `npm ci` na raiz do repositório.
2. Leia a aba **Pautas** da planilha `1YZMqSz3HYhZOG6BWbobZTBLwYE9DaX0DG1cmmDEoboA` (intervalo `Pautas!A:P`) com o conector do Google Sheets.

Colunas: A ID · B Data · C Horário · D Linha · E Tema · F Ângulo / gancho · G Marca citada · H Isca · I Palavra-chave · J Status · K Prévia · L Legenda · M Imagens (URLs JPG, uma por linha) · N Comentários da aprovação · O Link do post · P Publicado em. As colunas Q e R são fórmulas: nunca escreva nelas.

## O que fazer com cada status

| Status | Ação |
|---|---|
| `Ajustes pedidos` | Aplicar os pedidos da coluna N no carrossel da pasta `carrosseis/<ID>-*`. Primeiro os ajustes, depois as ideias novas. |
| `Ideia` | Produzir o carrossel do zero. No máximo 2 por execução. |
| Qualquer outro | Não mexer. Nunca marque `Aprovado` e nunca mexa no cenário do Make. |

Ao começar uma linha, mude o status para `Em produção`.

## Produzir ou ajustar um carrossel

1. **Pasta**: `carrosseis/<ID com 3 dígitos>-<tema-curto>/`. Para um carrossel novo, copie `carrosseis/001-nespresso/carrossel.html` como base e adapte. Mantenha o CSS, o topo, o rodapé e os componentes (palco com PNG, foto com degradê, linhas com ícones, linha do tempo, cartões do framework, CTA com caixa de comentário).
2. **Pesquisa**: confira na web cada número, data e fato citado. Se não der para confirmar, troque o dado por outro confirmável ou deixe de fora.
3. **Fotos**: com marca citada, use fotos oficiais do site da marca (busque imagens grandes no HTML das páginas). A capa precisa de uma foto publicitária com o produto visível e espaço para o título. Sem marca, use banco de imagens. Salve as fotos em `img/` e ponha "Imagens: divulgação MARCA" no rodapé.
4. **Texto**: siga as regras do README. O último slide traz o CTA com a palavra-chave da coluna I.
5. **Checagens**:
   - `node scripts/widows.js <html>` precisa responder `sem viúvas`.
   - `node scripts/render.js <html> out` e olhe cada PNG: nada cortado, nada sobrepondo, logo legível.
6. **JPG**: converta cada slide para JPG (qualidade 92) em `jpg/`.
7. **Upload** (sem chave):
   ```bash
   curl -sS https://api.cloudinary.com/v1_1/rlz9umtr/image/upload \
     -F file=@jpg/slide-01.jpg -F upload_preset=ecomboost_carrosseis \
     -F public_id=<ID>-<tema>-v<N>-slide-01
   ```
   Use um `v<N>` novo a cada versão, porque o preset não sobrescreve arquivos. Monte também uma prévia com todos os slides lado a lado e suba como `<ID>-<tema>-v<N>-previa`.
8. **Planilha**, na mesma linha:
   - K: `=HYPERLINK("<url da prévia>";"Ver prévia")`
   - L: a legenda completa
   - M: as URLs dos slides, uma por linha, na ordem
   - N: acrescente no fim (sem apagar o que já existe) `Ajustado em DD/MM HH:mm: <o que mudou>.` ou `Produzido em DD/MM HH:mm.`
   - J: `Aguardando aprovação`
   - Se a linha não tiver data ou horário, deixe em branco e avise na coluna N.
9. **Git**: commit da pasta do carrossel e `git push origin main`.

## Se algo falhar

Coloque o status `Erro`, explique na coluna N em uma frase e siga para a próxima linha.
