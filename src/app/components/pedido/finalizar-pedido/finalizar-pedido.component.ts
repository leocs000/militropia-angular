import { Component } from '@angular/core';
import { CarrinhoService } from '../../../services/carrinho.service';
import { ClienteService } from '../../../services/cliente.service';
import { PedidoService } from '../../../services/pedido.service';
import { Cliente } from '../../../models/cliente.model';
import { FormaPagamento } from '../../../models/forma-pagamento.model';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import {MatRadioChange, MatRadioModule} from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-finalizar-pedido',
  standalone: true,
  imports: [MatFormFieldModule, MatLabel, MatRadioModule, CommonModule,FormsModule],
  templateUrl: './finalizar-pedido.component.html',
  styleUrl: './finalizar-pedido.component.css'
})
export class FinalizarPedidoComponent {
  carrinhoItens: any[] = [];
  cliente: any;
  formasDePagamento: FormaPagamento[] = [];
  formaDePagamentoSelecionada: number = 0;
  frete: number = 0;
  totalCompra: number = 0;

  constructor(
    private carrinhoService: CarrinhoService,
    private clienteService: ClienteService,
    private pedidoService: PedidoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carrinhoItens = this.carrinhoService.obter();
    this.clienteService.findDadosPessoais().subscribe(data => {
      this.cliente = data;
    });
    this.pedidoService.formaPagamento().subscribe(data => {
      this.formasDePagamento = data;
    });
    this.atualizarTotal();
  }

  atualizarTotal(): void {
    this.totalCompra = this.carrinhoItens.reduce((total, item) => total + item.quantidade * item.preco, 0) + this.frete;
  }

  calcularTotal(): number {
    return this.totalCompra;
  }

  selecionarFormaDePagamento(event: MatRadioChange): void { 
    this.formaDePagamentoSelecionada = event.value;
  }

  atualizarFrete(event: Event): void { 
    const inputElement = event.target as HTMLInputElement; 
    this.frete = parseFloat(inputElement.value) || 0; 
    this.atualizarTotal(); 
  }

  finalizarCompra(): void {
    console.log('------------------------------\n\n')
    console.log(this.formaDePagamentoSelecionada)
    console.log('\n\n------------------------------')
    this.pedidoService.insert( this.carrinhoItens, this.formaDePagamentoSelecionada).subscribe({
      next:(res) => {
        this.carrinhoService.removerTudo();
        console.log(res);
        //this.router.navigateByUrl('/user/pedidofinalizado');
        window.location.href = '/user/pedidofinalizado';
      },
      error: (err) => {
        console.log('Erro ao Enviar Pedido' + JSON.stringify(err));
      }
    });
  }
}