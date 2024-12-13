import { Endereco } from "./endereco.model";
import { Usuario } from "./usuario.model";

export class Cliente {
    id!: number;
    nome!: string;
    cpf!: string;
    email!: string;
    listaTelefones!: string[];
    enderecos!: Endereco[];
    usuario!: Usuario;
}
