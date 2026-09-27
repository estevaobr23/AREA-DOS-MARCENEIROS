import Image from "next/image";
import Link from "next/link";
import { requireCustomer } from "@/lib/auth/session";
import { idsProdutosLiberados, produtoLiberado } from "@/lib/data/acesso";
import { CATALOGO } from "@/lib/config/catalogo";
import { precoBRL } from "@/lib/config/ofertas";
import "../inicio.css";

export const metadata = { title: "Projetos · Área de Membros" };

/**
 * Porta de entrada da aba Projetos: um card por produto, nenhum projeto
 * exposto aqui. O destino de cada card é o item "principal" do produto no
 * CATALOGO — a lista de projetos daquele material, e só dele.
 */
export default async function Projetos() {
  const cliente = await requireCustomer();
  const liberados = await idsProdutosLiberados(cliente.id);

  // Toda oferta aparece aqui também, mesmo sem entitlement — mesma regra da
  // Início (ver lib/config/catalogo.ts).
  const cards = CATALOGO.map((produto) => ({
    produto,
    temAcesso: produtoLiberado(produto, liberados),
    destino:
      produto.itens.find((i) => i.tipo === "principal")?.href ??
      `/produto/${produto.slug}`,
  }));

  return (
    <main className="envolucro">
      <div className="pagTopo">
        <h1 className="pagTitulo">Projetos</h1>
        <p className="pagSub">
          Escolha o material para abrir os projetos dele.
        </p>
      </div>

      {cards.length === 0 ? (
        <p className="vitVazio">
          Ainda não há produtos liberados nesta conta.
        </p>
      ) : (
        <div className="vitGrade">
          {cards.map(({ produto, temAcesso, destino }) =>
            temAcesso ? (
              <Link key={produto.slug} className="vitCard" href={destino}>
                <div className="vitCapa">
                  <Image
                    src={produto.capa}
                    alt=""
                    fill
                    sizes="(max-width: 700px) 100vw, 340px"
                  />
                </div>
                <div className="vitCorpo">
                  <span className="vitTitulo">{produto.titulo}</span>
                  <p className="vitSub">{produto.subtitulo}</p>
                  <span className="vitAcao">
                    Ver projetos <span aria-hidden>→</span>
                  </span>
                </div>
              </Link>
            ) : (
              <a
                key={produto.slug}
                className="vitCard vitCard--oferta"
                href={produto.aVenda.url}
              >
                <div className="vitCapa">
                  <Image
                    src={produto.capa}
                    alt=""
                    fill
                    sizes="(max-width: 700px) 100vw, 340px"
                  />
                  <span className="vitSelo">Adquira</span>
                </div>
                <div className="vitCorpo">
                  <span className="vitTitulo">{produto.titulo}</span>
                  <p className="vitSub">{produto.subtitulo}</p>
                  <span className="vitAcao">
                    {precoBRL(produto.aVenda.precoBRL)}{" "}
                    <span aria-hidden>→</span>
                  </span>
                </div>
              </a>
            )
          )}
        </div>
      )}
    </main>
  );
}
