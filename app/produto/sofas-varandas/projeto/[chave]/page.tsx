import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireCustomer } from "@/lib/auth/session";
import {
  acharFichaSofa,
  FICHAS_SOFAS,
  PRODUTO_SOFAS_SLUG,
  type FichaSofa,
} from "@/lib/data/fichas-sofas";
import "../../../../inicio.css";
import "../../sofas.css";

type Params = { chave: string };

const BASE = `/produto/${PRODUTO_SOFAS_SLUG}`;

export function generateStaticParams(): Params[] {
  return FICHAS_SOFAS.map((f) => ({ chave: f.chave }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { chave } = await params;
  const ficha = acharFichaSofa(chave);
  return {
    title: ficha ? `${ficha.nome} · Sofás e Varanda` : "Projeto · Sofás e Varanda",
  };
}

export default async function PaginaProjetoSofa({
  params,
}: {
  params: Promise<Params>;
}) {
  await requireCustomer();

  const { chave } = await params;
  const indice = FICHAS_SOFAS.findIndex((item) => item.chave === chave);
  if (indice === -1) notFound();

  const ficha = FICHAS_SOFAS[indice];
  const anterior = FICHAS_SOFAS[indice - 1];
  const proxima = FICHAS_SOFAS[indice + 1];
  const urlReferencia = `/fichas-sofas/referencia/${ficha.referenciaArquivo}`;
  const urlFicha = ficha.fichaArquivo ? `/fichas-sofas/ficha/${ficha.fichaArquivo}` : null;

  return (
    <main className="envolucro sfPagina">
      <Link className="prodVoltar" href={BASE}>
        <span aria-hidden>←</span> Voltar aos {FICHAS_SOFAS.length} projetos
      </Link>

      <section className="sfHeroi" style={{ marginTop: 18 }}>
        <div className="sfHeroiImagem">
          <Image
            src={urlReferencia}
            alt={`Imagem de referência do projeto ${ficha.nome}: vistas frontal, 3/4, lateral e traseira`}
            fill
            sizes="(max-width: 800px) 100vw, 560px"
            priority
          />
        </div>
        <div className="sfHeroiTexto">
          <span className="sfSobre">{ficha.categoria}</span>
          <h1 className="sfTitulo">{ficha.nome}</h1>
          <p className="sfSub">{ficha.descricao}</p>
          <div className="sfEtiquetas">
            <span>Projeto {ficha.numero}</span>
            <span>
              {indice + 1} de {FICHAS_SOFAS.length}
            </span>
            <span>Madeira maciça + estofado</span>
          </div>
          <div className="sfAcoes">
            {urlFicha && (
              <a className="sfBotao" href="#ficha">
                Ver ficha técnica <span aria-hidden>↓</span>
              </a>
            )}
            <Link className="sfBotao sfBotao--claro" href={`${BASE}/fichas`}>
              Todas as fichas
            </Link>
          </div>
        </div>
      </section>

      {urlFicha && (
        <section id="ficha" className="sfPalco sfFichaBloco" aria-labelledby="titulo-ficha">
          <div className="sfFichaBlocoTopo">
            <div>
              <b>FICHA TÉCNICA · PROJETO {ficha.numero}</b>
              <h2 id="titulo-ficha">Cotas, peças e construção</h2>
            </div>
            <a href={urlFicha} target="_blank" rel="noreferrer">
              Abrir em tamanho real ↗
            </a>
          </div>
          <a className="sfFolhaPapel" href={urlFicha} target="_blank" rel="noreferrer">
            <Image
              src={urlFicha}
              alt={`Ficha técnica do projeto ${ficha.nome}`}
              fill
              sizes="(max-width: 800px) 92vw, 780px"
            />
          </a>
        </section>
      )}

      <aside className="sfAviso">
        <span aria-hidden>⚠️</span>
        <p style={{ margin: 0 }}>
          <strong>Medidas a validar em protótipo.</strong> A ficha é referência
          de design e ponto de partida. Confira as dimensões no local de uso e
          valide encaixes antes de produzir em série.
        </p>
      </aside>

      <nav className="sfVizinhos" aria-label="Navegar entre projetos">
        {anterior ? <Vizinho ficha={anterior} rotulo="Anterior" /> : <span />}
        {proxima && <Vizinho ficha={proxima} rotulo="Próximo" proximo />}
      </nav>
    </main>
  );
}

function Vizinho({
  ficha,
  rotulo,
  proximo,
}: {
  ficha: FichaSofa;
  rotulo: string;
  proximo?: boolean;
}) {
  return (
    <Link
      className={proximo ? "sfVizinho sfVizinho--prox" : "sfVizinho"}
      href={`${BASE}/projeto/${ficha.chave}`}
    >
      <div className="sfVizinhoImagem">
        <Image
          src={`/fichas-sofas/referencia/${ficha.referenciaArquivo}`}
          alt=""
          fill
          sizes="72px"
        />
      </div>
      <div>
        <small>
          {proximo ? "" : "← "}
          {rotulo} · {ficha.numero}
          {proximo ? " →" : ""}
        </small>
        <span>{ficha.nome}</span>
      </div>
    </Link>
  );
}
