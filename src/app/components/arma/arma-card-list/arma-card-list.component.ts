import { NgFor } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardActions, MatCardContent, MatCardFooter, MatCardModule, MatCardTitle } from '@angular/material/card';
import { Arma } from '../../../models/arma.model';
import { ArmaService } from '../../../services/arma.service';
import { CarrinhoService } from '../../../services/carrinho.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SidebarComponent } from '../../template/sidebar/sidebar.component';
import { MatIcon } from '@angular/material/icon';

type Card = {
  idArma: number,
  titulo: string;
  tipo: string
  preco: number
  imageUrl: string
}

@Component({
  selector: 'app-arma-card-list',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, NgFor, 
    MatCardActions, MatCardContent, MatCardTitle, MatCardFooter, SidebarComponent, MatIcon],
  templateUrl: './arma-card-list.component.html',
  styleUrl: './arma-card-list.component.css'
})
export class ArmaCardListComponent {
  armas: Arma[] = [];
  cards = signal<Card[]>([]);

  constructor(private armaService: ArmaService,
              private carrinhoService: CarrinhoService,
              private snackBar: MatSnackBar
  ) {

  }
  ngOnInit(): void {
    this.carregarArmas();
  }

  carregarArmas() {
    // buscando as armas
    this.armaService.findAll(0,10).subscribe (data => {
      this.armas = data;
      this.carregarCards();
    })
  }

  carregarCards() {
    const cards: Card[] = [];
    this.armas.forEach(arma => {
      cards.push({
        idArma: arma.id,
        titulo: arma.nome,
        tipo: arma.tipo.descricao,
        preco: arma.preco,
        imageUrl: this.armaService.getUrlImage(arma.nomeImagem)
      })
    });
    this.cards.set(cards);
  }

  adicionarAoCarrinho(card: Card) {
    this.showSnackbarTopPosition('Produto adicionado ao carrinho');
    this.carrinhoService.adicionar({
      id: card.idArma,
      nome: card.titulo,
      preco: card.preco,
      quantidade: 1,
      imageUrl: card.imageUrl
    });
  }

  showSnackbarTopPosition(content: any) {
    this.snackBar.open(content, 'fechar', {
      duration: 3000,
      verticalPosition: "top",
      horizontalPosition: "center"
    });
  }
}
