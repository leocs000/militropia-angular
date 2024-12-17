import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButton, MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { MatBadge, MatBadgeModule } from '@angular/material/badge';
import { Subscription } from 'rxjs';
import { SidebarService } from '../../../services/sidebar.service';
import { Usuario } from '../../../models/usuario.model';
import { AuthService } from '../../../services/auth.service';
import { CarrinhoService } from '../../../services/carrinho.service';
import { MatMenuModule } from '@angular/material/menu';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf ,MatToolbar, MatIconModule, MatBadgeModule, MatButtonModule, MatIconButton, RouterModule, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  usuarioLogado: Usuario | null = null;
  
  totalItensCarrinho: number = 0;

  private subscription = new Subscription();

  constructor(
    private sidebarService: SidebarService,
    private authService: AuthService,
    private carrinhoService: CarrinhoService,
    private route: Router) {

  }

  ngOnInit(): void {
    this.subscription.add(this.authService.getUsuarioLogado().subscribe(usuario => { 
        this.usuarioLogado = usuario; 
        console.log(`usuario nome: ${usuario?.login}`);
      }
    ));
    console.log(`usuario logado: ${this.usuarioLogado?.login}`);
    this.carrinhoService.carrinho$.subscribe(carrinho => { 
      this.totalItensCarrinho = carrinho.reduce((total, item) => total + item.quantidade, 0); 
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  clickMenu() {
    this.sidebarService.toggle();
  }

  deslogar() {
    this.authService.removeToken();
    this.authService.removeUsuarioLogado();
    this.usuarioLogado = null;
    this.route.navigateByUrl('/ecommerce');
  }

  irParaLogin() { 
    this.route.navigateByUrl('/login'); 
  }
}
