import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { ArmaService } from '../../../services/arma.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Arma } from '../../../models/arma.model';

@Component({
  selector: 'app-arma-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule,
    RouterModule, MatSelectModule],
  templateUrl: './arma-form.component.html',
  styleUrl: './arma-form.component.css'
})
export class ArmaFormComponent implements OnInit{

  formGroup: FormGroup;
  armas: Arma[] = [];

  constructor(private formBuilder: FormBuilder,
    private armaService: ArmaService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    //inicializando
    this.formGroup = this.formBuilder.group({
      id:[null],
      nome:['', Validators.required],
      estado:[null]
    });
  }

  ngOnInit(): void {
    this.armaService.findAll().subscribe(data =>{
      this.armas = data;
      this.initializeForm();
    })
  }

  initializeForm(): void{
    const arma: Arma = this.activatedRoute.snapshot.data['arma'];

    //selecionando o estasdo
//    const estado = this.armas.find(estado => estado.id === (municipio?.estado?.id || null));

    this.formGroup = this.formBuilder.group({
      id:[(arma && arma.id) ? arma.id : null],
      nome: [(arma && arma.nome) ? arma.nome : '', Validators.required],
      qtdNoEstoque: [(municipio && municipio.nome) ? municipio.nome : '', Validators.required],
      preco: [(municipio && municipio.nome) ? municipio.nome : '', Validators.required],
      descricao: [(municipio && municipio.nome) ? municipio.nome : '', Validators.required],
      tipo: [(municipio && municipio.nome) ? municipio.nome : '', Validators.required],
      marca: [(municipio && municipio.nome) ? municipio.nome : '', Validators.required],
      acabamento: [(municipio && municipio.nome) ? municipio.nome : '', Validators.required],
      calibre!: [(municipio && municipio.nome) ? municipio.nome : '', Validators.required],
      comprimentoDoCano: [(municipio && municipio.nome) ? municipio.nome : '', Validators.required],
      capacidadeDeTiro: [(municipio && municipio.nome) ? municipio.nome : '', Validators.required],
      numeroSigma: [(municipio && municipio.nome) ? municipio.nome : '', Validators.required],
      numeroDaArma: [(municipio && municipio.nome) ? municipio.nome : '', Validators.required],
      modelo: [(municipio && municipio.nome) ? municipio.nome : '', Validators.required],
      rna: [(municipio && municipio.nome) ? municipio.nome : '', Validators.required],
    });
  }

  salvar() {
    if (this.formGroup.valid) {
      const municipio = this.formGroup.value;
      if (municipio.id ==null) {
        this.municipioService.insert(municipio).subscribe({
          next: (municipioCadastrado) => {
            this.router.navigateByUrl('/municipios');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          }
        });
      } else {
        this.municipioService.update(municipio).subscribe({
          next: (municipioAlterado) => {
            this.router.navigateByUrl('/municipios');
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
      const municipio = this.formGroup.value;
      if (municipio.id != null) {
        this.municipioService.delete(municipio).subscribe({
          next: () => {
            this.router.navigateByUrl('/municipios');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }

}
