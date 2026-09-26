import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { requireCustomer } from "@/lib/auth/session";
import {
  FICHAS_SOFAS,
  PRODUTO_SOFAS_SLUG,
  type FichaSofa,
} from "@/lib/data/fichas-sofas";
import {
  IconeDuplo,
  IconeLateral,
  IconeUnico,
  lerModo,
  SeletorModo,
} from "../componentes";
import { TrilhoLateral } from "../trilho-lateral";
import "../../../inicio.css";
import "../sofas.css";

export const metadata: Metadata = {
  title: "Todas as fichas · Sofás e Varanda",
};

const MODOS = ["unico", "duplo", "lateral"] as const;
type Modo = (typeof MODOS)[number];

const BASE = `/produto/${PRODUTO_SOFAS_SLUG}`;

export default async function PaginaFichasSofas({
  searchParams,
}: {
  searchParams: Promise<{ modo?: string | string[] }>;
}) {
  await requireCustomer();
  const modo: Modo = lerModo((await searchParams).modo, MODOS, "unico");
  const fichas = FICHAS_SOFAS.filter((f) => f.fichaArquivo);

  return (
    <main className="envolucro sfPagina">
      <header className="sfTopo">
        <Link className="prodVoltar" href={BASE}>
          <span aria-hidden>←</span> Voltar aos projetos
        </Link>
        <span className="sfSobre" style={{ display: "block" }}>
          Catálogo completo · {fichas.length} fichas
        </span>
        <h1 className="sfTitulo">Todas as fichas técnicas</h1>
        <p className="sfSub">
          Folheie o catálogo inteiro sem sair da página. Clique numa ficha para
          abrir o projeto dela.
        </p>
      </header>

      <div className="sfBarra">
        <SeletorModo<Modo>
          base={`${BASE}/fichas`}
          atual={modo}
          rotulo="Formato do feed de fichas"
          opcoes={[
            { valor: "unico", rotulo: "Único", icone: IconeUnico },
            { valor: "duplo", rotulo: "Duplo", icone: IconeDuplo },
            { valor: "lateral", rotulo: "Lateral", icone: IconeLateral },
          ]}
        />
      </div>

      <section className="sfPalco" aria-label="Fichas técnicas">
        {modo === "lateral" ? (
          <TrilhoLateral total={fichas.length}>
            {fichas.map((f, i) => (
              <Folha key={f.chave} ficha={f} prioridade={i < 2} />
            ))}
          </TrilhoLateral>
        ) : (
          <div className={`sfFeed sfFeed--${modo}`}>
            {fichas.map((f, i) => (
              <Folha key={f.chave} ficha={f} prioridade={i < (modo === "duplo" ? 2 : 1)} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function Folha({ ficha, prioridade }: { ficha: FichaSofa; prioridade: boolean }) {
  const href = `${BASE}/projeto/${ficha.chave}`;
  return (
    <figure className="sfFolha">
      <figcaption className="sfFolhaTopo">
        <div>
          <b>PROJETO {ficha.numero}</b>
          <h3>{ficha.nome}</h3>
        </div>
        <Link href={href}>
          Abrir <span aria-hidden>→</span>
        </Link>
      </figcaption>
      <Link className="sfFolhaPapel" href={href} aria-label={`Abrir projeto ${ficha.nome}`}>
        <Image
          src={`/fichas-sofas/ficha/${ficha.fichaArquivo}`}
          alt={`Ficha técnica do projeto ${ficha.nome}`}
          fill
          sizes="(max-width: 800px) 92vw, 720px"
          priority={prioridade}
        />
      </Link>
    </figure>
  );
}
