import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemCarrinho } from '../models/item-carrinho.model';
import { Pedido } from '../models/pedido.model';
import { FormaPagamento } from '../models/forma-pagamento.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private baseUrl = 'http://localhost:8080/pedidos'
  
    constructor(private httpClient: HttpClient) { }
  
    findAll(page?: number, pageSize?: number): Observable<Pedido[]>{
  
      let params = {};
  
      if (page !== undefined && pageSize !== undefined) {
        params = {
          page: page.toString(),
          pageSize: pageSize.toString()
        }
      }
  
      return this.httpClient.get<Pedido[]>(this.baseUrl, {params});
    }

    meusPedidos(page?: number, pageSize?: number): Observable<Pedido[]>{
  
      let params = {};
  
      if (page !== undefined && pageSize !== undefined) {
        params = {
          page: page.toString(),
          pageSize: pageSize.toString()
        }
      }
  
      return this.httpClient.get<Pedido[]>(`${this.baseUrl}/meusPedidos`, {params});
    }
  
    formaPagamento(): Observable<FormaPagamento[]>{
      return this.httpClient.get<FormaPagamento[]>(`${this.baseUrl}/formapagamento`);
    }

    count(): Observable<number>{
      return this.httpClient.get<number>(`${this.baseUrl}/count`);
    }
  
    insert(itens: ItemCarrinho[], formaPagamento: number): Observable<Pedido>{
      const data = {
        itens: itens.map(item => 
          ({
            quantidade: item.quantidade, 
            idArma: item.id 
          })), 
          idFormaDePagamento: formaPagamento
      };
    
      return this.httpClient.post<Pedido>(this.baseUrl, data);
    }
}
