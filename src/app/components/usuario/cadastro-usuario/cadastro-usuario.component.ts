import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EnderecoFormComponent } from '../../endereco/endereco-form/endereco-form.component';
import { Endereco } from '../../../models/endereco.model';
import { EnderecoService } from '../../../services/endereco.service';
import { MatStepperModule } from '@angular/material/stepper';

@Component({
  selector: 'app-cadastro-usuario',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule,
    RouterModule, EnderecoFormComponent, MatStepperModule],
  templateUrl: './cadastro-usuario.component.html',
  styleUrl: './cadastro-usuario.component.css'
})

export class CadastroUsuarioComponent implements OnInit {
  cadastroForm: FormGroup;

  constructor(private fb: FormBuilder, 
    private usuarioService: UsuarioService,
    private enderecoService: EnderecoService,
    private route: Router) {
      this.cadastroForm = this.fb.group({ 
        dadosUsuario: this.fb.group({ 
          nome: ['', Validators.required], 
          cpf: ['', Validators.required], 
          email: ['', [Validators.required, Validators.email]], 
          numeroRegistro_posse_porte: [''], 
          login: ['', Validators.required], 
          senha: ['', Validators.required] 
        }), 
        dadosEndereco: this.fb.group({ 
          enderecoNome: [''], 
          cep: [''], 
          logradouro: [''], 
          numero: [''], 
          complemento: [''], 
          bairro: [''], 
          cidade: [''], 
          estado: [''] 
        }) 
        });
  }

  ngOnInit(): void {
    
  }

  buscarCep() {
    const cep = this.cadastroForm.get('dadosEndereco.cep')?.value;
  
    if (cep) {
      this.enderecoService.findbyCep(cep).subscribe(
        (data: any) => {
          console.log(data);
          this.cadastroForm.patchValue({
            dadosEndereco: {
              logradouro: data.logradouro,
              bairro: data.bairro,
              cidade: data.localidade,
              estado: data.uf
            }
          });
        },
        (error: any) => {
          console.error('Erro ao buscar CEP:', error);
        }
      );
    }
  }
  

  onSubmit(): void {
    const usuario = {
      nome: this.cadastroForm.get('dadosUsuario.nome')?.value,
      cpf: this.cadastroForm.get('dadosUsuario.cpf')?.value,
      email: this.cadastroForm.get('dadosUsuario.email')?.value,
      numeroRegistro_posse_porte: this.cadastroForm.get('dadosUsuario.numeroRegistro_posse_porte')?.value,
      listaEnderecos: [{
        nome: this.cadastroForm.get('dadosEndereco.enderecoNome')?.value,
        logradouro: this.cadastroForm.get('dadosEndereco.logradouro')?.value,
        numero: this.cadastroForm.get('dadosEndereco.numero')?.value,
        complemento: this.cadastroForm.get('dadosEndereco.complemento')?.value,
        bairro: this.cadastroForm.get('dadosEndereco.bairro')?.value,
        cep: this.cadastroForm.get('dadosEndereco.cep')?.value,
        cidade: this.cadastroForm.get('dadosEndereco.cidade')?.value,
        estado: this.cadastroForm.get('dadosEndereco.estado')?.value
      }],
      login: this.cadastroForm.get('dadosUsuario.login')?.value,
      senha: this.cadastroForm.get('dadosUsuario.senha')?.value
    };
  
    this.usuarioService.create(usuario).subscribe({   
      next: (res) => {
        console.log('Usuário cadastrado com sucesso:', res);
        this.route.navigateByUrl('/login');
      }
    });
  }
  

  getFormGroup(controlName: string): FormGroup { 
    return this.cadastroForm.get(controlName) as FormGroup; 
  }
}
