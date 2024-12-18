import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Calibre } from '../../../models/calibre.model';
import { CalibreService } from '../../../services/calibre.service';

@Component({
  selector: 'app-calibre-list',
  standalone: true,
  imports: [NgFor, MatButtonModule, RouterModule, MatIconModule, MatTableModule, 
    MatToolbarModule, MatPaginatorModule],
  templateUrl: './calibre-list.component.html',
  styleUrl: './calibre-list.component.css'
})
export class CalibreListComponent implements OnInit{
  displayedColumns: string[] = ['id', 'calibre', 'acao']; 
  calibres: Calibre[] = [];

  totalRecords = 0;
  pageSize = 10;
  page = 0;

  constructor(private calibreService: CalibreService){}

  ngOnInit(): void {
    this.calibreService.findAll(this.page, this.pageSize).subscribe(data => {
      this.calibres = data;
    });

    this.calibreService.count().subscribe(data => { 
      this.totalRecords = data
    });
  }

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }

  excluir(calibre: Calibre) {
    if (calibre.id != null) {
      this.calibreService.delete(calibre).subscribe({
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
