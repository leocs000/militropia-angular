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
import { CalibreService } from '../../../services/calibre.service';
import { Calibre } from '../../../models/calibre.model';

@Component({
  selector: 'app-calibre-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule,
    RouterModule, MatSelectModule],
  templateUrl: './calibre-form.component.html',
  styleUrl: './calibre-form.component.css'
})
export class CalibreFormComponent {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private calibreService: CalibreService,
              private router: Router,
              private activatedRoute: ActivatedRoute
  ){
    this.formGroup = this.formBuilder.group({
      id:[null],
      calibre:['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void{
    const calibre: Calibre = this.activatedRoute.snapshot.data['calibre'];
    console.log(calibre);

    this.formGroup = this.formBuilder.group({
      id:[(calibre && calibre.id) ? calibre.id : null],
      calibre: [(calibre && calibre.calibre) ? calibre.calibre : '', Validators.required],
    });
  }

  salvar() {
    if (this.formGroup.valid) {
      const calibre = this.formGroup.value;
      if (calibre.id == null) {
        console.log("entrou no new");
        this.calibreService.insert(calibre).subscribe({
          next: (grupoCadastrado) => {
            this.router.navigateByUrl('/admin/calibres');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          }
        });
      } else {
        this.calibreService.update(calibre).subscribe({
          next: (calibreAlterado) => {
            this.router.navigateByUrl('/admin/calibres');
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
      const calibre = this.formGroup.value;
      if (calibre.id != null) {
        this.calibreService.delete(calibre).subscribe({
          next: () => {
            this.router.navigateByUrl('/admin/calibres');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }

}
