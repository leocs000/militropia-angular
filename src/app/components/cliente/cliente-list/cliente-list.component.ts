import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Cliente } from '../../../models/cliente.model';
import { ClienteService } from '../../../services/cliente.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule
    , MatButtonModule, RouterModule, MatPaginatorModule],
  templateUrl: './cliente-list.component.html',
  styleUrl: './cliente-list.component.css'
})
export class ClienteListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'email', 'login', 'acao'];
  clientes: Cliente[] = [];

  totalRecords = 0;
  pageSize = 10;
  page = 0;

  constructor(private clienteService: ClienteService) {

  }

  ngOnInit(): void {
    this.clienteService.findAll(this.page, this.pageSize).subscribe(
      data => {
      this.clientes = data;
    });

    this.clienteService.count().subscribe(data => { 
      this.totalRecords = data
    });
  }
  
  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }

  excluir(cliente: Cliente) {
    if (cliente.id != null) {
      this.clienteService.delete(cliente).subscribe({
        next: () => {
          window.location.reload();
        },
        error: (err) => {
          console.log("não entrou");
          console.log('Erro ao Excluir' + JSON.stringify(err));
        }
      });
    }
  }

}