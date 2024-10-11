import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { EnderecoService } from '../../../services/endereco.service';

@Component({
  selector: 'app-endereco-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule,
    RouterModule, MatSelectModule],
  templateUrl: './endereco-form.component.html',
  styleUrl: './endereco-form.component.css'
})

export class EnderecoFormComponent {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private enderecoService: EnderecoService,
    private router: Router) {
      this.formGroup = this.formBuilder.group({
        nome:['', Validators.required],
        sigla:['', Validators.required]
      }) 
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const novoEndereco = this.formGroup.value;
      this.enderecoService.insert(novoEndereco).subscribe({
        next: (enderecoCadastrado) => {
          this.router.navigateByUrl('/enderecos');
        },
        error: (err) => {
          console.log('Erro ao salvar', + JSON.stringify(err));
        }
      })
    }
  }

  
  salvar() {
    if (this.formGroup.valid) {
      const endereco = this.formGroup.value;
      if (endereco.id ==null) {
        this.enderecoService.insert(endereco).subscribe({
          next: (enderecoCadastrado) => {
            this.router.navigateByUrl('/enderecos');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          }
        });
      } else {
        this.enderecoService.update(endereco).subscribe({
          next: (enderecoAlterado) => {
            this.router.navigateByUrl('/enderecos');
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
      const endereco = this.formGroup.value;
      if (endereco.id != null) {
        this.enderecoService.delete(endereco).subscribe({
          next: () => {
            this.router.navigateByUrl('/enderecos');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }


}
