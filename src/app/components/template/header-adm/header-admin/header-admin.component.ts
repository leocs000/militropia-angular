import { Component } from '@angular/core';
import { Usuario } from '../../../../models/usuario.model';
import { Subscription } from 'rxjs';
import { SidebarService } from '../../../../services/sidebar.service';
import { AuthService } from '../../../../services/auth.service';
import { CarrinhoService } from '../../../../services/carrinho.service';
import { Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-header-admin',
  standalone: true,
  imports: [NgIf ,MatToolbar, MatIconModule, MatBadgeModule, MatButtonModule, MatIconButton, RouterModule, MatMenuModule],
  templateUrl: './header-admin.component.html',
  styleUrl: './header-admin.component.css'
})
export class HeaderAdminComponent {
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
