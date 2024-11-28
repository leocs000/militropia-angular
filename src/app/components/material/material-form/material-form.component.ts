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
import { Material } from '../../../models/material.model';
import { MaterialService } from '../../../services/material.service';

@Component({
  selector: 'app-material-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule,
    RouterModule, MatSelectModule],
  templateUrl: './material-form.component.html',
  styleUrl: './material-form.component.css'
})
export class MaterialFormComponent {

  formGroup: FormGroup;
  materiais: Material[] = [];

  constructor(private formBuilder: FormBuilder,
    private materialService: MaterialService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    //inicializando
    this.formGroup = this.formBuilder.group({
      id:[null],
      material:['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void{
    const material: Material = this.activatedRoute.snapshot.data['material'];
    console.log(material);

    this.formGroup = this.formBuilder.group({
      id:[(material && material.id) ? material.id : null],
      material: [(material && material.material) ? material.material : '', Validators.required],
    });
  }

  salvar() {
    if (this.formGroup.valid) {
      const material = this.formGroup.value;
      if (material.id == null) {
        console.log("entrou no new");
        this.materialService.insert(material).subscribe({
          next: (grupoCadastrado) => {
            this.router.navigateByUrl('/materiais');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          }
        });
      } else {
        this.materialService.update(material).subscribe({
          next: (acabamentoAlterado) => {
            this.router.navigateByUrl('/materiais');
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
      const material = this.formGroup.value;
      if (material.id != null) {
        this.materialService.delete(material).subscribe({
          next: () => {
            this.router.navigateByUrl('/acabamentos');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }
}
