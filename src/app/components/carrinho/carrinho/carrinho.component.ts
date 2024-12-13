import { NgIf, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ItemCarrinho } from '../../../models/item-carrinho.model';
import { CarrinhoService } from '../../../services/carrinho.service';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { NgModel, NgModelGroup } from '@angular/forms';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { ArmaService } from '../../../services/arma.service';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [NgIf, NgFor, MatIconModule, CommonModule, MatFormFieldModule, MatLabel, MatDividerModule, RouterLink],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent {
  carrinhoItens: ItemCarrinho[] = [];
  frete: number = 0; 
  totalCompra: number = 0;

  constructor(private carrinhoService: CarrinhoService,
              private armaService: ArmaService,
              private router: Router )
  {  }
  
  ngOnInit(): void {
    this.carrinhoService.carrinho$.subscribe(itens => { 
      this.carrinhoItens = itens;
    });
    this.atualizarTotal();
  }



  incrementarQuantidade(item: any): void { 
    item.quantidade++; 

    this.atualizarTotal(); 
  } 
  
  decrementarQuantidade(item: any): void { 
    if (item.quantidade > 1) { 
      item.quantidade--; 

      this.atualizarTotal(); 
    } 
  }

  removerItem(item: ItemCarrinho) {
    this.carrinhoService.removerItem(item);
  }

  atualizarTotal(): void { 
    this.totalCompra = this.carrinhoItens.reduce((total, item) => total + item.quantidade * item.preco, 0) + this.frete; 
  }

  calcularTotal(): number {
    return this.carrinhoItens.reduce((total, item) => total + item.quantidade * item.preco, 0);
  }

  finalizarCompra() {

    // verifidcar se estah logado

    // 

  }
}
