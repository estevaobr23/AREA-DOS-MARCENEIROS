import "server-only";
import { getCustomerProducts } from "@/lib/data/products";
import type { Produto } from "@/lib/config/catalogo";

/**
 * Regra única de "este produto é do cliente?". Sob DEV_BYPASS_AUTH (só fora de
 * produção, Supabase pausado) todo produto sem oferta `aVenda` conta como
 * liberado, para navegar o conteúdo local. Produto com `aVenda` continua
 * aparecendo como oferta — o conteúdo dele depende do Storage do Supabase.
 */
export function produtoLiberado(produto: Produto, liberados: Set<string>): boolean {
  if (produto.caktoProductId !== null && liberados.has(produto.caktoProductId)) {
    return true;
  }
  return (
    process.env.NODE_ENV !== "production" &&
    process.env.DEV_BYPASS_AUTH === "true" &&
    !produto.aVenda
  );
}

/**
 * Conjunto de `cakto_product_id` a que o cliente tem acesso liberado
 * (entitlement ativo). A vitrine usa isso para decidir se um `Produto` do
 * CATALOGO aparece como "seu", como oferta, ou não aparece.
 *
 * Fonte de verdade é o banco (entitlements), nunca o CATALOGO.
 */
export async function idsProdutosLiberados(
  customerId: string
): Promise<Set<string>> {
  const produtos = await getCustomerProducts(customerId);
  return new Set(
    produtos
      .map((p) => p.cakto_product_id)
      .filter((id): id is string => Boolean(id))
  );
}

/** Confere entitlement pelo slug canônico gravado em products. */
export async function temAcessoAoProduto(
  customerId: string,
  produtoSlug: string
): Promise<boolean> {
  const produtos = await getCustomerProducts(customerId);
  return produtos.some((produto) => produto.slug === produtoSlug);
}
