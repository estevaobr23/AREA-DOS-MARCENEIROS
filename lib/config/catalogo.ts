// lib/config/catalogo.ts
//
// Fonte ÚNICA da vitrine da área de membros. A UI (aba "Início" e a página
// /produto/<slug>) só renderiza o que estiver aqui — nada de produto, bônus,
// preço ou contagem inventada na tela.
//
// COMO USAR:
//   - cada `Produto` vira um card na aba "Início" e uma página /produto/<slug>;
//   - `caktoProductId` casa com `products.cakto_product_id` no Supabase. É ele
//     que decide se o cliente vê o produto como "seu" (tem entitlement ativo)
//     ou como oferta. `null` = produto sem checkout ainda;
//   - `itens` são os cards DENTRO da página do produto: exatamente 1 do tipo
//     "principal" e quantos "bonus" existirem. Sem bônus? Deixe só o principal;
//   - `aVenda` é OBRIGATÓRIO em todo produto (regra do usuário, 27/09/2026):
//     toda oferta do marceneiro tem que aparecer na Início pra todo mundo,
//     mesmo quem não tem acesso — sem card fantasma escondido. Quem já tem
//     entitlement abre o produto; quem não tem vê a oferta com preço e link
//     de checkout.
//
// Ao adicionar um produto novo aqui, confirme que existe a linha correspondente
// em `products` no banco (mesmo `cakto_product_id`) — senão ninguém terá acesso.

export type ItemProduto = {
  /** Identificador do item dentro do produto (chave de lista, âncora). */
  slug: string;
  tipo: "principal" | "bonus";
  titulo: string;
  descricao: string;
  /** Caminho de imagem em /public (ex: "/modelos/039-.../preview.png"). */
  capa: string;
  /** Destino do card. Rota interna já existente (ex: "/projetos"). */
  href: string;
};

export type Produto = {
  /** Rota da página do produto: /produto/<slug>. */
  slug: string;
  /** Casa com products.cakto_product_id no banco. null = sem checkout ainda. */
  caktoProductId: string | null;
  titulo: string;
  subtitulo: string;
  /** Imagem de capa do produto na vitrine, caminho em /public. */
  capa: string;
  /** 1 item "principal" + N "bonus". */
  itens: ItemProduto[];
  /** Obrigatório: preço/link exibido a quem ainda não tem acesso a este produto. */
  aVenda: { precoBRL: number; url: string };
};

export const CATALOGO: Produto[] = [
  {
    slug: "acervo-3d-gatos",
    // Tem que ser IDÊNTICO ao products.cakto_product_id no Supabase (projeto
    // gatos-membros / xcopknglpddvkqalafml) — é o ID DA OFERTA na Cakto, não
    // do produto raiz (o webhook cakto-webhook casa por offer.id primeiro).
    // Corrigido em 27/09/2026: o valor antigo era um UUID de produto Cakto
    // que nunca existiu na tabela products; o entitlement de teste real está
    // gravado com "p5mahz4" (oferta "Plano Completo VIP" do produto
    // a77ae4f9-..., "100 Móveis e Acessórios para Gatos").
    caktoProductId: "p5mahz4",
    titulo: "Biblioteca de Fichas Visuais — Móveis para Gatos",
    subtitulo:
      "Fichas visuais A4 com medidas sugeridas, peças e montagem. Projetos selecionados também incluem visualização 3D interativa.",
    // Mockup "header/plano completo" real do produto (o mesmo usado na
    // página de vendas), não uma foto de peça avulsa — pedido do usuário em
    // 18/09/2026: capa do card tem que ser o hero, não um preview de projeto.
    capa: "/vitrine/hero-gatos.webp",
    itens: [
      {
        slug: "acervo",
        tipo: "principal",
        titulo: "Todos os projetos",
        descricao:
          "Móveis e playgrounds em 3D, agrupados por família. Cada projeto abre com visualizador interativo, peças, medidas adaptáveis, montagem e calculadora de custos.",
        // Caminho corrigido em 18/09/2026: a pasta "041-torre-alta-vertical"
        // não existe mais — os projetos foram renumerados e a torre alta
        // vertical real é "003-torre-alta-vertical" (imagem quebrada antes).
        capa: "/modelos/003-torre-alta-vertical/preview.png",
        href: "/projetos/gatos",
      },
      // Sem bônus por enquanto. Para adicionar um, copie um item com
      // tipo: "bonus" e aponte o href para a rota do conteúdo dele.
    ],
    // aVenda: mesmo o cliente de teste tendo acesso, todo produto precisa
    // aparecer para quem NÃO comprou ainda — regra do usuário em 27/09/2026:
    // toda oferta fica visível na Início, mesmo sem entitlement. Link é o
    // checkout ativo da oferta "p5mahz4" na Cakto.
    aVenda: { precoBRL: 29.9, url: "https://pay.cakto.com.br/p5mahz4" },
  },
  {
    slug: "50-projetos-moveis-caes",
    // Tem que ser IDÊNTICO ao products.cakto_product_id no Supabase (mesmo
    // projeto gatos-membros). Corrigido em 27/09/2026: "8a2469fd-..." era um
    // UUID de produto Cakto com status "deleted" e nunca existiu em
    // products; o produto real e ativo é "40 Projetos de Casinhas e Móveis
    // para Cães", já cadastrado no banco com a oferta "ptbzkoi".
    caktoProductId: "ptbzkoi",
    titulo: "40 Projetos de Casinhas e Móveis para Cães",
    subtitulo:
      "Biblioteca visual com projetos de casinhas, camas, comedouros e acessórios para planejar, adaptar e construir.",
    // Mesmo mockup usado no header e no "plano completo" do site de vendas
    // real (dist/index.html referencia hero-header-transparent-*.png) — não
    // o hero-header.png com fundo, que é uma variante não usada no site.
    capa: "/vitrine/hero-caes.png",
    itens: [
      {
        slug: "acervo",
        tipo: "principal",
        titulo: "Todos os projetos",
        descricao:
          "Fichas técnicas com lista de peças, medidas e passo a passo de montagem.",
        capa: "/vitrine/hero-caes.png",
        href: "/produto/50-projetos-moveis-caes",
      },
    ],
    // aVenda: sem entitlement de teste para este produto — o card aparece
    // como oferta até a compra real liberar o acesso. Link é o checkout
    // ativo da oferta "ptbzkoi" na Cakto.
    aVenda: { precoBRL: 17.9, url: "https://pay.cakto.com.br/ptbzkoi" },
  },
  {
    slug: "sofas-varandas",
    // Checkout criado na Cakto em 26/09/2026 ("Catálogo 40 Sofás", produto
    // a6a41630-..., oferta padrão "peirk5a"). Linha correspondente inserida
    // em products no Supabase (gatos-membros) no mesmo dia — sem essa linha
    // o webhook cakto-webhook não teria como conceder o entitlement.
    caktoProductId: "peirk5a",
    titulo: "40 Projetos de Sofás e Móveis para Varanda/Área Gourmet",
    subtitulo:
      "Biblioteca visual com 40 projetos de sofás, bancos e conjuntos para varanda e área gourmet: imagem de referência + ficha técnica com cotas.",
    // Sem hero próprio ainda — capa provisória é a referência do projeto 01.
    capa: "/fichas-sofas/referencia/01_sofa_reto_2_lugares_ripado.png",
    itens: [
      {
        slug: "acervo",
        tipo: "principal",
        titulo: "Todos os projetos",
        descricao:
          "Imagem de referência e ficha técnica com cotas, materiais e construção para cada um dos 40 projetos.",
        capa: "/fichas-sofas/referencia/01_sofa_reto_2_lugares_ripado.png",
        href: "/produto/sofas-varandas",
      },
    ],
    aVenda: { precoBRL: 29.9, url: "https://pay.cakto.com.br/peirk5a" },
  },
];

/** Acha um produto pelo slug da rota. */
export function acharProduto(slug: string): Produto | undefined {
  return CATALOGO.find((p) => p.slug === slug);
}
