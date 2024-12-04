import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Funcionario } from '../../../models/funcionario.model';
import { FuncionarioService } from '../../../services/funcionario.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-funcionario-list',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule
    , MatButtonModule, RouterModule, MatPaginatorModule],
  templateUrl: './funcionario-list.component.html',
  styleUrl: './funcionario-list.component.css'
})
export class FuncionarioListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'email', 'login', 'acao'];
  funcionarios: Funcionario[] = [];

  totalRecords = 0;
  pageSize = 10;
  page = 0;

  constructor(private funcionarioService: FuncionarioService) {

  }

  ngOnInit(): void {
    this.funcionarioService.findAll(this.page, this.pageSize).subscribe(
      data => {
      this.funcionarios = data;
    });

    this.funcionarioService.count().subscribe(data => { 
      this.totalRecords = data
    });
  }

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }

  excluir(funcionario: Funcionario) {
    if (funcionario.id != null) {
      this.funcionarioService.delete(funcionario).subscribe({
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