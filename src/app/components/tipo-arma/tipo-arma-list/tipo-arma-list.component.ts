import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { TipoArma } from '../../../models/tipo-arma.model';
import { TipoArmaService } from '../../../services/tipo-arma.service';

@Component({
  selector: 'app-tipo-arma-list',
  standalone: true,
  imports: [NgFor, MatButtonModule, RouterModule, MatIconModule, MatTableModule, 
    MatToolbarModule, MatPaginatorModule],
  templateUrl: './tipo-arma-list.component.html',
  styleUrl: './tipo-arma-list.component.css'
})
export class TipoArmaListComponent implements OnInit{
  displayedColumns: string[] = ['id', 'descricao', 'acao']; 
  tiposArma: TipoArma[] = [];

  totalRecords = 0;
  pageSize = 10;
  page = 0;

  constructor(private tipoArmaService: TipoArmaService){}

  ngOnInit(): void {
    this.tipoArmaService.findAll(this.page, this.pageSize).subscribe(data => {
      this.tiposArma = data;
    });

    this.tipoArmaService.count().subscribe(data => { 
      this.totalRecords = data
    });
  }

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }

  excluir(tipoArma: TipoArma) {
    if (tipoArma.id != null) {
      this.tipoArmaService.delete(tipoArma).subscribe({
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
