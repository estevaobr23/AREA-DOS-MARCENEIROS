import Link from "next/link";
import type { ReactNode } from "react";

export type OpcaoModo<T extends string> = {
  valor: T;
  rotulo: string;
  icone: ReactNode;
};

/** Modo vem da URL (?modo=) para sobreviver ao "Voltar" e poder ser compartilhado. */
export function lerModo<T extends string>(
  bruto: string | string[] | undefined,
  validos: readonly T[],
  padrao: T
): T {
  const valor = Array.isArray(bruto) ? bruto[0] : bruto;
  return validos.includes(valor as T) ? (valor as T) : padrao;
}

export function SeletorModo<T extends string>({
  base,
  atual,
  opcoes,
  rotulo,
}: {
  base: string;
  atual: T;
  opcoes: OpcaoModo<T>[];
  rotulo: string;
}) {
  return (
    <nav className="sfModos" aria-label={rotulo}>
      {opcoes.map((opcao) => (
        <Link
          key={opcao.valor}
          className="sfModo"
          href={`${base}?modo=${opcao.valor}`}
          aria-current={opcao.valor === atual ? "page" : undefined}
          scroll={false}
        >
          {opcao.icone}
          {opcao.rotulo}
        </Link>
      ))}
    </nav>
  );
}

const svg = { width: 15, height: 15, viewBox: "0 0 16 16", fill: "none", "aria-hidden": true } as const;
const traco = { stroke: "currentColor", strokeWidth: 1.4 } as const;

export const IconeGrade = (
  <svg {...svg}>
    <rect x="2" y="2" width="5" height="5" rx="1" {...traco} />
    <rect x="9" y="2" width="5" height="5" rx="1" {...traco} />
    <rect x="2" y="9" width="5" height="5" rx="1" {...traco} />
    <rect x="9" y="9" width="5" height="5" rx="1" {...traco} />
  </svg>
);

export const IconeLista = (
  <svg {...svg}>
    <rect x="2" y="2.5" width="12" height="4" rx="1" {...traco} />
    <rect x="2" y="9.5" width="12" height="4" rx="1" {...traco} />
  </svg>
);

export const IconeUnico = (
  <svg {...svg}>
    <rect x="4.5" y="1.5" width="7" height="13" rx="1" {...traco} />
  </svg>
);

export const IconeDuplo = (
  <svg {...svg}>
    <rect x="1.5" y="2.5" width="5.5" height="11" rx="1" {...traco} />
    <rect x="9" y="2.5" width="5.5" height="11" rx="1" {...traco} />
  </svg>
);

export const IconeLateral = (
  <svg {...svg}>
    <rect x="4.5" y="2.5" width="7" height="11" rx="1" {...traco} />
    <path d="M2 5v6M14 5v6" {...traco} strokeLinecap="round" />
  </svg>
);
