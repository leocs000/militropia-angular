import { NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { Material } from '../../../models/material.model';
import { MaterialService } from '../../../services/material.service';

@Component({
  selector: 'app-material-list',
  standalone: true,
  imports: [NgFor, MatButtonModule, RouterModule, MatIconModule, MatTableModule, MatToolbarModule, MatPaginatorModule],
  templateUrl: './material-list.component.html',
  styleUrl: './material-list.component.css'
})
export class MaterialListComponent implements OnInit{
  displayedColumns: string[] = ['id', 'material', 'acao']; 
  materiais: Material[] = [];

  totalRecords = 0;
  pageSize = 10;
  page = 0;

  constructor(private materialService: MaterialService,
    private router: Router,
    private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.materialService.findAll(this.page, this.pageSize).subscribe(data => {
      this.materiais = data;
    });

    this.materialService.count().subscribe(data => { 
      this.totalRecords = data
    });
  }

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }

  excluir(material: Material) {
    if (material.id != null) {
      this.materialService.delete(material).subscribe({
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
