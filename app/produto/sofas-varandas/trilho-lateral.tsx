"use client";

import { useRef, type ReactNode } from "react";

/**
 * Carrossel horizontal com scroll-snap nativo. As setas existem porque no
 * desktop com mouse comum não há rolagem horizontal sem Shift — no toque o
 * arraste nativo já resolve.
 */
export function TrilhoLateral({
  total,
  children,
}: {
  total: number;
  children: ReactNode;
}) {
  const trilho = useRef<HTMLDivElement>(null);

  function mover(direcao: 1 | -1) {
    const el = trilho.current;
    const folha = el?.firstElementChild as HTMLElement | null;
    if (!el || !folha) return;
    const passo = folha.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0");
    el.scrollBy({ left: passo * direcao, behavior: "smooth" });
  }

  return (
    <div className="sfLateral">
      <div className="sfLateralTopo">
        <p>{total} fichas · arraste para o lado ou use as setas</p>
        <div className="sfSetas">
          <button type="button" onClick={() => mover(-1)} aria-label="Ficha anterior">
            ←
          </button>
          <button type="button" onClick={() => mover(1)} aria-label="Próxima ficha">
            →
          </button>
        </div>
      </div>
      <div
        ref={trilho}
        className="sfTrilho"
        tabIndex={0}
        aria-label="Fichas técnicas em sequência horizontal"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") { e.preventDefault(); mover(1); }
          if (e.key === "ArrowLeft") { e.preventDefault(); mover(-1); }
        }}
      >
        {children}
      </div>
    </div>
  );
}
