import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Acabamento } from '../../../models/acabamento.model';
import { AcabamentoService } from '../../../services/acabamento.service';
import { Router, RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-acabamento-list',
  standalone: true,
  imports: [NgFor, MatButtonModule, RouterModule, MatIconModule, MatTableModule, MatToolbarModule],
  templateUrl: './acabamento-list.component.html',
  styleUrl: './acabamento-list.component.css'
})
export class AcabamentoListComponent implements OnInit{
  displayedColumns: string[] = ['id', 'material', 'acao']; 
  acabamentos: Acabamento[] = [];

  constructor(private acabamentoService: AcabamentoService,
              private router: Router,
              private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.acabamentoService.findAll().subscribe(data => {
      this.acabamentos = data;
    });
  }

  excluir(arma: Acabamento) {
    if (arma.id != null) {
      this.acabamentoService.delete(arma).subscribe({
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
