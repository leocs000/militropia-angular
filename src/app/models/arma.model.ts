import { Acabamento } from "./acabamento.model";
import { Calibre } from "./calibre.model";
import { TipoArma } from "./tipo-arma.model";

export class Arma {
    id!: number;
    nome!: string;
    qtdNoEstoque!: number;
    preco!: number;
    descricao!: string;
    tipo!: TipoArma;
    marca!: string;
    acabamento!: Acabamento;
    calibre!: Calibre;
    comprimentoDoCano!: string;
    capacidadeDeTiro!: number;
    numeroSigma!: string;
    numeroDaArma!: string;
    modelo!: string;
    rna!: string;
}
