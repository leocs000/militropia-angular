import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncionarioService } from '../../../services/funcionario.service';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Funcionario } from '../../../models/funcionario.model';


@Component({
  selector: 'app-funcionario-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatButtonModule, NgIf, MatInputModule, MatCardModule, MatToolbarModule],
  templateUrl: './funcionario-form.component.html',
  styleUrl: './funcionario-form.component.css'
})
export class FuncionarioFormComponent implements OnInit{
  formGroup: FormGroup;
  funcionarios: Funcionario[] = [];

  constructor(private formBuilder: FormBuilder,
    private funcionarioService: FuncionarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
      this.formGroup = this.formBuilder.group({
        id: [null],
        nome: ['', Validators.required],
        cpf: ['', Validators.required],
        email: ['', Validators.required],
        telefone: ['', Validators.required],
        matricula: ['', Validators.required],
        login: ['', Validators.required],
        senha: ['', Validators.required],
        }
      ) 
  }

  ngOnInit(): void {
    this.funcionarioService.findAll().subscribe(data =>{
      this.funcionarios = data;
      this.initializeForm();
    })
  }

  initializeForm(): void{
    const funcionario: Funcionario = this.activatedRoute.snapshot.data['funcionario'];

    //selecionando o estasdo
//    const estado = this.funcionarios.find(estado => estado.id === (municipio?.estado?.id || null));

    this.formGroup = this.formBuilder.group({
      id:[(funcionario && funcionario.id) ? funcionario.id : null],
      nome: [(funcionario && funcionario.nome) ? funcionario.nome : '', Validators.required],
      cpf: [(funcionario && funcionario.cpf) ? funcionario.cpf : '', Validators.required],
      email: [(funcionario && funcionario.email) ? funcionario.email : '', Validators.required],
      telefone: [(funcionario && funcionario.telefone) ? funcionario.telefone : '', Validators.required],
      matricula: [(funcionario && funcionario.matricula) ? funcionario.matricula : '', Validators.required],
      login: [(funcionario && funcionario.login) ? funcionario.login : '', Validators.required],
      senha: [(funcionario && funcionario.senha) ? funcionario.senha : '', Validators.required],
    });
  }


  onSubmit() {
    if (this.formGroup.valid) {
      const novoFuncionario = this.formGroup.value;
      this.funcionarioService.insert(novoFuncionario).subscribe({
        next: (funcionarioCadastrado) => {
          this.router.navigateByUrl('/admin/funcionarios');
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
            this.router.navigateByUrl('/admin/funcionarios');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          }
        });
      } else {
        this.funcionarioService.update(funcionario).subscribe({
          next: (funcionarioAlterado) => {
            this.router.navigateByUrl('/admin/funcionarios');
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

function ngOnInit() {
  throw new Error('Function not implemented.');
}

