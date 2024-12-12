import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-cadastro-usuario',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule,
    RouterModule],
  templateUrl: './cadastro-usuario.component.html',
  styleUrl: './cadastro-usuario.component.css'
})
export class CadastroUsuarioComponent {
  cadastroForm: FormGroup; 
  
  constructor(private formBuilder: FormBuilder, 
    private router: Router,
    private usuarioService: UsuarioService) { 
      this.cadastroForm = this.formBuilder.group({ 
        username: ['', Validators.required], 
        password: ['', Validators.required],  
      }); 
    } 
    
  ngOnInit(): void {} 
  
  onSubmit(): void { 
    if (this.cadastroForm.valid) { 
      const username = this.cadastroForm.get('username')?.value;
      const password = this.cadastroForm.get('password')?.value;

      this.usuarioService.create(username, password).subscribe ({
        next: (resp) => {
          // redirecionando para a pagina principal
          this.router.navigateByUrl('/login');
        },
        error: (err) => {
          console.log(err);
        }
      }) 
    } 
  }
}
