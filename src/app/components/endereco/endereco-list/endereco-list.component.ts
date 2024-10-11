import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Endereco } from '../../../models/endereco.model';
import { EnderecoService } from '../../../services/endereco.service';

@Component({
  selector: 'app-endereco-list',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule
    , MatButtonModule, RouterModule],
  templateUrl: './endereco-list.component.html',
  styleUrl: './endereco-list.component.css'
})
export class EnderecoListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'logradouro', 'cep'];
  enderecos: Endereco[] = [];

  constructor(private enderecoService: EnderecoService) {

  }

  ngOnInit(): void {
    this.enderecoService.findAll().subscribe(
      data => {
      this.enderecos = data;
    })
  }

}