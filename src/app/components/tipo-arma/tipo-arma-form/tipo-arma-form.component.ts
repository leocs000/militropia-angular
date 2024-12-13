import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TipoArmaService } from '../../../services/tipo-arma.service';
import { TipoArma } from '../../../models/tipo-arma.model';

@Component({
  selector: 'app-tipo-arma-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule,
    RouterModule, MatSelectModule],
  templateUrl: './tipo-arma-form.component.html',
  styleUrl: './tipo-arma-form.component.css'
})
export class TipoArmaFormComponent implements OnInit{
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private tipoArmaService: TipoArmaService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    //inicializando
    this.formGroup = this.formBuilder.group({
      id:[null],
      descricao:['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void{
    const tipoArma: TipoArma = this.activatedRoute.snapshot.data['tipoArma'];
    console.log(tipoArma);

    this.formGroup = this.formBuilder.group({
      id:[(tipoArma && tipoArma.id) ? tipoArma.id : null],
      descricao: [(tipoArma && tipoArma.descricao) ? tipoArma.descricao : '', Validators.required],
    });
  }

  salvar() {
    if (this.formGroup.valid) {
      const tipoArma = this.formGroup.value;
      if (tipoArma.id == null) {
        console.log("entrou no new");
        this.tipoArmaService.insert(tipoArma).subscribe({
          next: (grupoCadastrado) => {
            this.router.navigateByUrl('/admin/tiposarma');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          }
        });
      } else {
        this.tipoArmaService.update(tipoArma).subscribe({
          next: (tipoArmaAlterado) => {
            this.router.navigateByUrl('/admin/tiposarma');
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
      const tipoArma = this.formGroup.value;
      if (tipoArma.id != null) {
        this.tipoArmaService.delete(tipoArma).subscribe({
          next: () => {
            this.router.navigateByUrl('/admin/tiposarma');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }
}
