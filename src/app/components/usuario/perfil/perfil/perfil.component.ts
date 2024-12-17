import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../../models/cliente.model';
import { ClienteService } from '../../../../services/cliente.service';
import { CommonModule, NgFor } from '@angular/common';
import { PedidoService } from '../../../../services/pedido.service';
import { Pedido } from '../../../../models/pedido.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit{
  cliente!: Cliente;
  pedidos: Pedido[] = [];

  constructor(private clienteService: ClienteService,
      private pedidoService: PedidoService,
      private route: Router
  ) {}

  ngOnInit(): void {
    this.clienteService.findDadosPessoais().subscribe(data => {
      this.cliente = data;
    });

    this.pedidoService.meusPedidos().subscribe(data => {
      this.pedidos = data;
    });
  }

  editarSenha(): void {
    this.route.navigateByUrl('/user/alterarsenha')
    console.log('Editar Senha');
  }

  editarLogin(): void {
    // Lógica para editar o login
    console.log('Editar Login');
  }

  alterarDados(): void {
    // Lógica para alterar os dados do usuário
    console.log('Alterar Dados');
  }

}
