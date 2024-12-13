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
import { TipoTiroService } from '../../../services/tipo-tiro.service';
import { TipoTiro } from '../../../models/tipo-tiro.model';

@Component({
  selector: 'app-tipo-tiro-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule,
    RouterModule, MatSelectModule],
  templateUrl: './tipo-tiro-form.component.html',
  styleUrl: './tipo-tiro-form.component.css'
})
export class TipoTiroFormComponent implements OnInit{
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private tipoTiroService: TipoTiroService,
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
    const tipoTiro: TipoTiro = this.activatedRoute.snapshot.data['tipoTiro'];
    console.log(tipoTiro);

    this.formGroup = this.formBuilder.group({
      id:[(tipoTiro && tipoTiro.id) ? tipoTiro.id : null],
      descricao: [(tipoTiro && tipoTiro.descricao) ? tipoTiro.descricao : '', Validators.required],
    });
  }

  salvar() {
    if (this.formGroup.valid) {
      const tipoTiro = this.formGroup.value;
      if (tipoTiro.id == null) {
        console.log("entrou no new");
        this.tipoTiroService.insert(tipoTiro).subscribe({
          next: (grupoCadastrado) => {
            this.router.navigateByUrl('/admin/tipotiros');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          }
        });
      } else {
        this.tipoTiroService.update(tipoTiro).subscribe({
          next: (objetoAlterado) => {
            this.router.navigateByUrl('/admin/tipotiros');
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
      const tipoTiro = this.formGroup.value;
      if (tipoTiro.id != null) {
        this.tipoTiroService.delete(tipoTiro).subscribe({
          next: () => {
            this.router.navigateByUrl('/admin/tipoTiros');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }
}
