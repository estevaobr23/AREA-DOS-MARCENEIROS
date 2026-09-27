import type { Metadata, Viewport } from "next";
import { Navegacao } from "./navegacao";
import "./globals.css";
import "./inicio.css";

// Aplica o tema salvo ANTES da primeira pintura — sem isso a tela nasce
// clara e pisca pra escura um instante depois em quem já escolheu dark.
// Só pode rodar assim (script inline síncrono no <head>), não em useEffect.
const SCRIPT_TEMA = `
try {
  var t = localStorage.getItem("tema");
  if (t === "dark") document.documentElement.dataset.theme = "dark";
} catch (e) {}
`;

export const metadata: Metadata = {
  title: "Móveis para Gatos",
  description: "Novo acervo de móveis para gatos em criação.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <script dangerouslySetInnerHTML={{ __html: SCRIPT_TEMA }} />
      </head>
      <body>
        <Navegacao />
        {children}

        <footer className="iniRodape">
          <div className="envolucro">
            Novo acervo em criação. Cada projeto será publicado somente após a
            revisão visual e técnica da nova coleção.
          </div>
        </footer>
      </body>
    </html>
  );
}
