import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { requireCustomer } from "@/lib/auth/session";
import {
  CATEGORIAS_SOFAS,
  FICHAS_SOFAS,
  PRODUTO_SOFAS_SLUG,
  type FichaSofa,
} from "@/lib/data/fichas-sofas";
import {
  IconeGrade,
  IconeLista,
  lerModo,
  SeletorModo,
} from "./componentes";
import "../../inicio.css";
import "./sofas.css";

export const metadata: Metadata = {
  title: "40 Projetos de Sofás e Varanda · Área de Membros",
};

const MODOS = ["categorias", "lista"] as const;
type Modo = (typeof MODOS)[number];

const BASE = `/produto/${PRODUTO_SOFAS_SLUG}`;

function ancora(titulo: string) {
  return titulo
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default async function PaginaSofasVarandas({
  searchParams,
}: {
  searchParams: Promise<{ modo?: string | string[] }>;
}) {
  await requireCustomer();
  const modo: Modo = lerModo((await searchParams).modo, MODOS, "categorias");

  const categorias = CATEGORIAS_SOFAS.map((c) => ({
    ...c,
    fichas: FICHAS_SOFAS.filter((f) => f.categoria === c.titulo),
  })).filter((c) => c.fichas.length > 0);

  return (
    <main className="envolucro sfPagina">
      <header className="sfTopo">
        <Link className="prodVoltar" href="/">
          <span aria-hidden>←</span> Voltar para Início
        </Link>
        <span className="sfSobre" style={{ display: "block" }}>
          {FICHAS_SOFAS.length} projetos · {categorias.length} categorias
        </span>
        <h1 className="sfTitulo">Sofás, bancos e conjuntos para varanda</h1>
        <p className="sfSub">
          Escolha um projeto para abrir a imagem de referência e a ficha técnica
          completa, ou folheie todas as fichas de uma vez.
        </p>
      </header>

      <div className="sfBarra">
        <SeletorModo<Modo>
          base={BASE}
          atual={modo}
          rotulo="Modo de exibição dos projetos"
          opcoes={[
            { valor: "categorias", rotulo: "Por categoria", icone: IconeGrade },
            { valor: "lista", rotulo: "Lista única", icone: IconeLista },
          ]}
        />
        <Link className="sfBotao" href={`${BASE}/fichas`}>
          Ver todas as fichas <span aria-hidden>→</span>
        </Link>
      </div>

      {modo === "categorias" ? (
        <>
          <nav className="sfIndice" aria-label="Ir para categoria">
            {categorias.map((c) => (
              <a key={c.titulo} href={`#${ancora(c.titulo)}`}>
                {c.titulo}
                <span>{c.fichas.length}</span>
              </a>
            ))}
          </nav>

          {categorias.map((c) => (
            <section
              key={c.titulo}
              id={ancora(c.titulo)}
              className="sfCategoria"
              aria-labelledby={`t-${ancora(c.titulo)}`}
            >
              <div className="sfCategoriaTopo">
                <h2 id={`t-${ancora(c.titulo)}`}>{c.titulo}</h2>
                <span>
                  {c.fichas[0].numero}–{c.fichas[c.fichas.length - 1].numero}
                </span>
              </div>
              <div className="sfGrade">
                {c.fichas.map((f) => (
                  <CardProjeto key={f.chave} ficha={f} />
                ))}
              </div>
            </section>
          ))}
        </>
      ) : (
        <div className="sfLista">
          {FICHAS_SOFAS.map((f) => (
            <LinhaProjeto key={f.chave} ficha={f} />
          ))}
        </div>
      )}
    </main>
  );
}

function CardProjeto({ ficha }: { ficha: FichaSofa }) {
  return (
    <Link className="sfCard" href={`${BASE}/projeto/${ficha.chave}`}>
      <div className="sfCardImagem">
        <span className="sfNumero">{ficha.numero}</span>
        <Image
          src={`/fichas-sofas/referencia/${ficha.referenciaArquivo}`}
          alt=""
          fill
          sizes="(max-width: 600px) 100vw, 280px"
        />
      </div>
      <div className="sfCardCorpo">
        <span className="sfCardTitulo">{ficha.nome}</span>
        <p className="sfCardTexto">{ficha.descricao}</p>
        <span className="sfCardAcao">
          Abrir projeto <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  );
}

function LinhaProjeto({ ficha }: { ficha: FichaSofa }) {
  return (
    <Link className="sfLinha" href={`${BASE}/projeto/${ficha.chave}`}>
      <div className="sfLinhaImagem">
        <Image
          src={`/fichas-sofas/referencia/${ficha.referenciaArquivo}`}
          alt=""
          fill
          sizes="150px"
        />
      </div>
      <div className="sfLinhaCorpo">
        <div className="sfLinhaMeta">
          <b>{ficha.numero}</b>
          <span>{ficha.categoria}</span>
        </div>
        <span className="sfLinhaTitulo">{ficha.nome}</span>
        <p className="sfLinhaTexto">{ficha.descricao}</p>
      </div>
      <span className="sfLinhaSeta" aria-hidden>
        →
      </span>
    </Link>
  );
}
