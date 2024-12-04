import { NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { Arma } from '../../../models/arma.model';
import { ArmaService } from '../../../services/arma.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-arma-list',
  standalone: true,
  imports: [NgFor, MatButtonModule, RouterModule, MatIconModule, MatTableModule, MatToolbarModule, MatPaginatorModule],
  templateUrl: './arma-list.component.html',
  styleUrl: './arma-list.component.css'
})
export class ArmaListComponent implements OnInit{
  displayedColumns: string[] = ['id', 'nome', 'acao']; 
  armas: Arma[] = [];

  totalRecords = 0;
  pageSize = 10;
  page = 0;

  constructor(private armaService: ArmaService,
              private router: Router,
              private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.armaService.findAll(this.page, this.pageSize).subscribe(data => {
      this.armas = data;
    });

    this.armaService.count().subscribe(data => {
      this.totalRecords = data;
    });
  }

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }

  excluir(arma: Arma) {
    if (arma.id != null) {
      this.armaService.delete(arma).subscribe({
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
