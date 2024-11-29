import { NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { TipoTiro } from '../../../models/tipo-tiro.model';
import { TipoTiroService } from '../../../services/tipo-tiro.service';

@Component({
  selector: 'app-tipo-tiro-list',
  standalone: true,
  imports: [NgFor, MatButtonModule, RouterModule, MatIconModule, MatTableModule, MatToolbarModule, MatPaginatorModule],
  templateUrl: './tipo-tiro-list.component.html',
  styleUrl: './tipo-tiro-list.component.css'
})
export class TipoTiroListComponent implements OnInit{
  displayedColumns: string[] = ['id', 'material', 'acao']; 
  tipoTiros: TipoTiro[] = [];

  totalRecords = 0;
  pageSize = 10;
  page = 0;

  constructor(private tipoTiroService: TipoTiroService,
    private router: Router,
    private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.tipoTiroService.findAll(this.page, this.pageSize).subscribe(data => {
      this.tipoTiros = data;
    });

    this.tipoTiroService.count().subscribe(data => { 
      this.totalRecords = data
    });
  }

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }

  excluir(tipoTiro: TipoTiro) {
    if (tipoTiro.id != null) {
      this.tipoTiroService.delete(tipoTiro).subscribe({
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
