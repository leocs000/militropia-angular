import { Injectable } from '@angular/core';
import { ItemCarrinho } from '../models/item-carrinho.model';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  private carrinhoSubject = new BehaviorSubject<ItemCarrinho[]>([]);
  carrinho$ = this.carrinhoSubject.asObservable();

  constructor(private localStorageService: LocalStorageService) { 
    // verificando se tem dados no carrinho no local storage e atualiza o subject
    const carrinhoArmazenado = localStorageService.getItem('carrinho') || [];
    this.carrinhoSubject.next(carrinhoArmazenado);
  }

  adicionar(itemCarrinho: ItemCarrinho): void {
    const carrinhoAtual = this.carrinhoSubject.value;
    const itemExistente = carrinhoAtual.find(item => item.id === itemCarrinho.id);

    if (itemExistente) {
      itemExistente.quantidade += itemCarrinho.quantidade || 1;
    } else {
      carrinhoAtual.push(itemCarrinho);
    }

    this.carrinhoSubject.next(carrinhoAtual);
    this.atualizarArmazenamentoLocal();
  }

  removerTudo(): void {
    this.localStorageService.removeItem('carrinho');
    // window.location.reload(); // reload na pagina
  }

  removerItem(itemCarrinho: ItemCarrinho): void {
    const carrinhoAtual = this.carrinhoSubject.value;
    const carrinhoAtualizado = carrinhoAtual.filter(item => item.id !== itemCarrinho.id);

    this.carrinhoSubject.next(carrinhoAtualizado);
    this.atualizarArmazenamentoLocal();
  }

  obter() : ItemCarrinho[] {
    return this.carrinhoSubject.value;
  }

  contarItens(): number { 
    return this.carrinhoSubject.value.reduce((total, item) => total + item.quantidade, 0); 
  }

  private atualizarArmazenamentoLocal(): void {
    this.localStorageService.setItem('carrinho', this.carrinhoSubject.value);
  }
}
