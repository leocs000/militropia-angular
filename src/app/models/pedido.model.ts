import { Cliente } from "./cliente.model";
import { FormaPagamento } from "./forma-pagamento.model";
import { ItemCarrinho } from "./item-carrinho.model";

export class Pedido {
    idPedido!: number;
    cliente!: Cliente;
    data!: string;
    totalPedido!: number;
    pagamento!: FormaPagamento;
    itens!: ItemCarrinho[];
}
