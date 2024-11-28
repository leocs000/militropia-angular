import { Acabamento } from "./acabamento.model";
import { Calibre } from "./calibre.model";
import { Material } from "./material.model";
import { TipoArma } from "./tipo-arma.model";
import { TipoTiro } from "./tipo-tiro.model";

export class Arma {
    id!: number;
    nome!: string;
    descricao!: string;
    preco!: number;
    qtdNoEstoque!: number;
    fabricante!: string;
    modelo!: string;
    material!: Material;
    calibre!: Calibre;
    tipo!: TipoArma;
    acabamento!: Acabamento;
    peso!: number;
    propulsor!: string;
    tipoTiro!: TipoTiro;
    velocidade!: string;
    capacidadeDeTiro!: number;
    nomeImagem!: string;
}
