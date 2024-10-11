import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Cliente } from '../../../models/cliente.model';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule
    , MatButtonModule, RouterModule],
  templateUrl: './cliente-list.component.html',
  styleUrl: './cliente-list.component.css'
})
export class ClienteListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'telefone', 'numeroRegistro_posse_porte', 'login', 'senha'];
  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService) {

  }

  ngOnInit(): void {
    this.clienteService.findAll().subscribe(
      data => {
      this.clientes = data;
    })
  }

}