import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Acabamento } from '../../../models/acabamento.model';
import { AcabamentoService } from '../../../services/acabamento.service';
import { Router, RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-acabamento-list',
  standalone: true,
  imports: [NgFor, MatButtonModule, RouterModule, MatIconModule, MatTableModule, 
            MatToolbarModule, MatPaginatorModule],
  templateUrl: './acabamento-list.component.html',
  styleUrl: './acabamento-list.component.css'
})
export class AcabamentoListComponent implements OnInit{
  displayedColumns: string[] = ['id', 'material', 'acao']; 
  acabamentos: Acabamento[] = [];

  totalRecords = 0;
  pageSize = 10;
  page = 0;

  constructor(private acabamentoService: AcabamentoService,
              private router: Router,
              private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.acabamentoService.findAll(this.page, this.pageSize).subscribe(data => {
      this.acabamentos = data;
    });

    this.acabamentoService.count().subscribe(data => { 
      this.totalRecords = data
    });
  }

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }

  excluir(acabamento: Acabamento) {
    if (acabamento.id != null) {
      this.acabamentoService.delete(acabamento).subscribe({
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
