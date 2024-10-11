import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { FuncionarioService } from '../../../services/funcionario.service';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';


@Component({
  selector: 'app-funcionario-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatButtonModule, NgIf, MatInputModule, MatCardModule, MatToolbarModule],
  templateUrl: './funcionario-form.component.html',
  styleUrl: './funcionario-form.component.css'
})
export class FuncionarioFormComponent {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private funcionarioService: FuncionarioService,
    private router: Router) {
      this.formGroup = this.formBuilder.group({
        nome:['', Validators.required],
        sigla:['', Validators.required]
      }) 
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const novoFuncionario = this.formGroup.value;
      this.funcionarioService.insert(novoFuncionario).subscribe({
        next: (funcionarioCadastrado) => {
          this.router.navigateByUrl('/funcionarios');
        },
        error: (err) => {
          console.log('Erro ao salvar', + JSON.stringify(err));
        }
      })
    }
  }

  
  salvar() {
    if (this.formGroup.valid) {
      const funcionario = this.formGroup.value;
      if (funcionario.id ==null) {
        this.funcionarioService.insert(funcionario).subscribe({
          next: (funcionarioCadastrado) => {
            this.router.navigateByUrl('/funcionarios');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          }
        });
      } else {
        this.funcionarioService.update(funcionario).subscribe({
          next: (funcionarioAlterado) => {
            this.router.navigateByUrl('/funcionarios');
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
      const funcionario = this.formGroup.value;
      if (funcionario.id != null) {
        this.funcionarioService.delete(funcionario).subscribe({
          next: () => {
            this.router.navigateByUrl('/funcionarios');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }


}

