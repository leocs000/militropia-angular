import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Arma } from '../../../models/arma.model';
import { ArmaService } from '../../../services/arma.service';

@Component({
  selector: 'app-arma-list',
  standalone: true,
  imports: [NgFor, MatButtonModule, RouterModule, MatIconModule, MatTableModule, MatToolbarModule],
  templateUrl: './arma-list.component.html',
  styleUrl: './arma-list.component.css'
})
export class ArmaListComponent implements OnInit{
  displayedColumns: string[] = ['id', 'nome', 'acao'];
  armas: Arma[] = [];

  constructor(private armaService: ArmaService) {}

  ngOnInit(): void {
    this.armaService.findAll().subscribe(data => {
      this.armas = data;
    });
  }

}
