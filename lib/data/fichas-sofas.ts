import "server-only";
import { readdirSync } from "node:fs";
import path from "node:path";

/**
 * Feed do produto "40 Projetos de Sofás e Móveis para Varanda/Área Gourmet".
 * Diferente de gatos/cães: aqui não existe ficha técnica em PDF nem modelo
 * 3D — cada projeto tem só a imagem de referência (4 perspectivas, fundo
 * branco) e a prancha técnica colorida (cotas + vista funcional), as duas
 * geradas fora do app e copiadas para public/fichas-sofas/. Arquivos
 * públicos (sem Supabase Storage), mesmo padrão do acervo de gatos.
 */
export const PRODUTO_SOFAS_SLUG = "sofas-varandas";

const DIR_REFERENCIA = path.join(process.cwd(), "public/fichas-sofas/referencia");
const DIR_FICHA = path.join(process.cwd(), "public/fichas-sofas/ficha");

export interface CategoriaSofa {
  titulo: string;
  faixa: [number, number];
}

export const CATEGORIAS_SOFAS: CategoriaSofa[] = [
  { titulo: "Sofás Retos", faixa: [1, 6] },
  { titulo: "Sofás em L", faixa: [7, 11] },
  { titulo: "Sofás Modulares", faixa: [12, 16] },
  { titulo: "Chaise e Lounge", faixa: [17, 20] },
  { titulo: "Bancos e Baús", faixa: [21, 26] },
  { titulo: "Varandas Compactas", faixa: [27, 30] },
  { titulo: "Área Gourmet e Conjuntos", faixa: [31, 35] },
  { titulo: "Especiais e Multifuncionais", faixa: [36, 40] },
];

interface ItemLista {
  numero: number;
  nome: string;
  descricao: string;
}

// Espelha lista_40_projetos.md (fonte: 40 projetos sofas e varandas/).
const LISTA: ItemLista[] = [
  { numero: 1, nome: "Sofá Reto 2 Lugares Ripado", descricao: "Encosto em ripas verticais, braços largos de madeira, compacto para varanda pequena." },
  { numero: 2, nome: "Sofá Reto 3 Lugares Painel Cheio", descricao: "Encosto em painel maciço sem vãos, robusto, estilo mais fechado." },
  { numero: 3, nome: "Sofá Reto Compacto Sem Braço", descricao: "2 lugares, sem braços, ideal para espaço apertado/apartamento." },
  { numero: 4, nome: "Sofá Reto com Braço Largo Multifuncional", descricao: "Braços largos o suficiente para apoiar copo/prato, 2-3 lugares." },
  { numero: 5, nome: "Sofá Reto Baixo Estilo Zen", descricao: "Assento rebaixado, linhas horizontais, visual mais clean/minimalista." },
  { numero: 6, nome: "Sofá Reto Pé Palito Elevado", descricao: "Estrutura elevada do chão com pés inclinados, visual mais leve." },
  { numero: 7, nome: "Sofá em L Pequeno (Canto Compacto)", descricao: "Para varandas pequenas, um lado curto." },
  { numero: 8, nome: "Sofá em L Grande com Chaise Integrada", descricao: "Lado longo funciona como chaise, para área ampla." },
  { numero: 9, nome: "Sofá em L Simétrico com Mesa de Canto Embutida", descricao: "Mesinha triangular no encontro dos módulos." },
  { numero: 10, nome: "Sofá em L com Encosto Ajustável", descricao: "Encosto de um dos módulos reclina/ajusta ângulo." },
  { numero: 11, nome: "Sofá em L Aberto (Dois Módulos Soltos Encaixáveis)", descricao: "Dois blocos retos que se unem formando L, podem separar." },
  { numero: 12, nome: "Módulo Único Multiposição", descricao: "Peça única que serve como poltrona, pode ser combinada com outras." },
  { numero: 13, nome: "Conjunto Modular 3 Peças (2 retos + 1 canto)", descricao: "Sistema clássico de recombinação." },
  { numero: 14, nome: "Conjunto Modular Curvo (Formato Semicírculo)", descricao: "Módulos que formam uma curva, uso em áreas gourmet grandes." },
  { numero: 15, nome: "Módulo com Pufe Solto Integrado", descricao: "Módulo principal + pufe avulso que vira apoio de pé ou assento extra." },
  { numero: 16, nome: "Sistema Modular Empilhável/Compacto", descricao: "Módulos que se guardam encaixados um sobre o outro (uso sazonal)." },
  { numero: 17, nome: "Chaise Longue Individual", descricao: "Peça solta, reclinada, para um único usuário relaxar." },
  { numero: 18, nome: "Sofá com Chaise Lateral Fixa", descricao: "Sofá reto de um lado + chaise incorporada do outro." },
  { numero: 19, nome: "Espreguiçadeira de Madeira com Estofado Removível", descricao: "Reclinável tipo lounge de piscina, mais horizontal." },
  { numero: 20, nome: "Namoradeira Lounge (2 Lugares Frente a Frente Adaptado)", descricao: "Assento largo estilo lounge para casal, mais baixo e largo que sofá comum." },
  { numero: 21, nome: "Banco Reto Simples", descricao: "Banco de madeira sem baú, assento estofado solto, uso versátil." },
  { numero: 22, nome: "Banco com Baú Interno (Tampo Assento)", descricao: "Tampo do assento abre, armazenamento interno, estofado por cima." },
  { numero: 23, nome: "Banco com Encosto Baixo", descricao: "Meio caminho entre banco e sofá, encosto curto." },
  { numero: 24, nome: "Banco Dobrável/Retrátil", descricao: "Pernas ou estrutura dobram para economia de espaço." },
  { numero: 25, nome: "Banco Baú Duplo (Dois Compartimentos)", descricao: "Dividido em duas seções internas independentes." },
  { numero: 26, nome: "Banco Alto Tipo Bar para Área Gourmet", descricao: "Altura de bancada, para uso com balcão/bancada gourmet." },
  { numero: 27, nome: "Conjunto Compacto 2 Poltronas + Mesa Lateral", descricao: "Solução mínima para varanda de apartamento pequeno." },
  { numero: 28, nome: "Sofá-Cama Dobrável para Varanda", descricao: "Sofá reto compacto que abre em superfície plana." },
  { numero: 29, nome: "Cadeira de Varanda com Braço-Mesa", descricao: "Poltrona individual com braço alargado que serve de apoio/mesa." },
  { numero: 30, nome: "Kit Varanda Suspenso (Banco + Prateleira Integrada)", descricao: "Banco compacto com prateleira/nicho fixado acima ou ao lado." },
  { numero: 31, nome: "Conjunto Gourmet Sofá + 2 Poltronas + Mesa de Centro", descricao: "Conjunto completo para área gourmet média." },
  { numero: 32, nome: "Sofá com Mesa Integrada Lateral (Bandeja Fixa)", descricao: "Braço de um dos lados se estende em mesa/bandeja." },
  { numero: 33, nome: "Conjunto Ilha Gourmet (Módulos ao Redor de Mesa Central)", descricao: "Módulos dispostos formando espaço de convívio em torno de uma mesa." },
  { numero: 34, nome: "Bancada-Banco Integrada para Área Gourmet", descricao: "Banco fixo acoplado à estrutura da bancada/churrasqueira." },
  { numero: 35, nome: "Conjunto Gourmet Compacto 4 Lugares com Mesa Dobrável", descricao: "Para espaços gourmet menores, mesa que dobra/recolhe." },
  { numero: 36, nome: "Sofá-Rede Suspenso de Madeira", descricao: "Estrutura de madeira que sustenta assento suspenso tipo balanço." },
  { numero: 37, nome: "Banco-Jardineira (Banco com Floreira Integrada)", descricao: "Banco com espaço para vasos/plantas embutido na estrutura." },
  { numero: 38, nome: "Sofá Pérgola (Estrutura com Cobertura Ripada Integrada)", descricao: "Sofá com estrutura superior de ripas formando sombra." },
  { numero: 39, nome: "Conjunto Multifuncional Mesa-Banco Conversível", descricao: "Banco que se transforma/reconfigura em mesa." },
  { numero: 40, nome: "Poltrona-Ovo de Madeira (Formato Envolvente)", descricao: "Formato curvo/envolvente, diferencial visual forte, peça de destaque." },
];

export interface FichaSofa {
  numero: string; // "01".."40"
  chave: string; // "01".."40", identifica o projeto na URL
  nome: string;
  descricao: string;
  categoria: string;
  referenciaArquivo: string; // nome do arquivo em public/fichas-sofas/referencia
  fichaArquivo: string | null; // nome do arquivo em public/fichas-sofas/ficha, se existir
}

function categoriaDoNumero(numero: number): string {
  const encontrada = CATEGORIAS_SOFAS.find(
    (c) => numero >= c.faixa[0] && numero <= c.faixa[1]
  );
  return encontrada?.titulo ?? "Sofás e Varandas";
}

function listarArquivos(dir: string): string[] {
  try {
    return readdirSync(dir);
  } catch {
    return [];
  }
}

function acharArquivoPorNumero(arquivos: string[], numero: string): string | null {
  const prefixoDuplo = `${numero}_`;
  const prefixoComProjeto = `projeto_${numero}_`;
  const arquivo = arquivos.find(
    (nome) => nome.startsWith(prefixoDuplo) || nome.startsWith(prefixoComProjeto)
  );
  return arquivo ?? null;
}

export const FICHAS_SOFAS: FichaSofa[] = (() => {
  const arquivosReferencia = listarArquivos(DIR_REFERENCIA);
  const arquivosFicha = listarArquivos(DIR_FICHA);

  return LISTA.map((item) => {
    const numero = String(item.numero).padStart(2, "0");
    const referenciaArquivo = acharArquivoPorNumero(arquivosReferencia, numero);
    const fichaArquivo = acharArquivoPorNumero(arquivosFicha, numero);

    if (!referenciaArquivo) {
      throw new Error(
        `Imagem de referência não encontrada para o projeto ${numero} (${item.nome}).`
      );
    }

    return {
      numero,
      chave: numero,
      nome: item.nome,
      descricao: item.descricao,
      categoria: categoriaDoNumero(item.numero),
      referenciaArquivo,
      fichaArquivo,
    } satisfies FichaSofa;
  });
})();

export function acharFichaSofa(chave: string): FichaSofa | undefined {
  return FICHAS_SOFAS.find((ficha) => ficha.chave === chave);
}
