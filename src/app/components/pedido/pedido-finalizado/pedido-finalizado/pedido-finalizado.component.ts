import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedido-finalizado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedido-finalizado.component.html',
  styleUrl: './pedido-finalizado.component.css'
})
export class PedidoFinalizadoComponent {
  pedido: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.pedido = navigation.extras.state['pedido'];
    }
  }

  voltarParaHome(): void {
    this.router.navigateByUrl('/');
  }
}
