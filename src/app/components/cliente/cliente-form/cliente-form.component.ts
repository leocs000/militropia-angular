import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Cliente } from '../../../models/cliente.model';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule,
    RouterModule, MatSelectModule],
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.css'
})

export class ClienteFormComponent {
  formGroup: FormGroup;


  constructor(private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
      this.formGroup = this.formBuilder.group({
        id:[null],
        nome:['', Validators.required],
        cpf: ['', Validators.required],
        email: ['', Validators.required],
        telefone: ['', Validators.required],
        numeroRegistro_posse_porte: ['', Validators.required],
        login: ['', Validators.required],
        senha: ['', Validators.required],
      })
  }

  initializeForm(): void{
    const cliente: Cliente = this.activatedRoute.snapshot.data['cliente'];

    //selecionando o estasdo
//    const estado = this.clientes.find(estado => estado.id === (municipio?.estado?.id || null));

    this.formGroup = this.formBuilder.group({
      id:[(cliente && cliente.id) ? cliente.id : null],
      nome: [(cliente && cliente.nome) ? cliente.nome : '', Validators.required],
      cpf: [(cliente && cliente.cpf) ? cliente.cpf : '', Validators.required],
      email: [(cliente && cliente.email) ? cliente.email : '', Validators.required],
      telefone: [(cliente && cliente.telefone) ? cliente.telefone : '', Validators.required],
      numeroRegistro_posse_porte: [(cliente && cliente.numeroRegistro_posse_porte) ? cliente.numeroRegistro_posse_porte : '', Validators.required],
      login: [(cliente && cliente.login) ? cliente.login : '', Validators.required],
      senha: [(cliente && cliente.senha) ? cliente.senha : '', Validators.required]
    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const novoCliente = this.formGroup.value;
      this.clienteService.insert(novoCliente).subscribe({
        next: (clienteCadastrado) => {
          this.router.navigateByUrl('/clientes');
        },
        error: (err) => {
          console.log('Erro ao salvar', + JSON.stringify(err));
        }
      })
    }
  }

  
  salvar() {
    if (this.formGroup.valid) {
      const cliente = this.formGroup.value;
      if (cliente.id ==null) {
        this.clienteService.insert(cliente).subscribe({
          next: (clienteCadastrado) => {
            this.router.navigateByUrl('/clientes');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          }
        });
      } else {
        this.clienteService.update(cliente).subscribe({
          next: (clienteAlterado) => {
            this.router.navigateByUrl('/clientes');
          },
          error: (err) => {
            console.log('Erro ao Editar' + JSON.stringify(err));
          }
        });
      }
    }
  }

  excluir() {
    if (this.formGroup.valid) {
      const cliente = this.formGroup.value;
      if (cliente.id != null) {
        this.clienteService.delete(cliente).subscribe({
          next: () => {
            this.router.navigateByUrl('/clientes');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }


}