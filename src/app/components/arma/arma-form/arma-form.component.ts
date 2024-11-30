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
import { Arma } from '../../../models/arma.model';
import { ArmaService } from '../../../services/arma.service';
import { Material } from '../../../models/material.model';
import { Calibre } from '../../../models/calibre.model';
import { TipoArma } from '../../../models/tipo-arma.model';
import { Acabamento } from '../../../models/acabamento.model';
import { TipoTiro } from '../../../models/tipo-tiro.model';
import { MaterialService } from '../../../services/material.service';
import { AcabamentoService } from '../../../services/acabamento.service';
import { TipoTiroService } from '../../../services/tipo-tiro.service';
import { CalibreService } from '../../../services/calibre.service';
import { PageEvent } from '@angular/material/paginator';
import { forkJoin } from 'rxjs';
import { TipoArmaService } from '../../../services/tipo-arma.service';

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
  materiais: Material[] = [];
  calibres: Calibre[] = [];
  tiposArma: TipoArma[] = [];
  acabamentos: Acabamento[] = [];
  tiposTiro: TipoTiro[] = [];

  constructor(private formBuilder: FormBuilder,
    private armaService: ArmaService,
    private materialService: MaterialService,
    private calibreService: CalibreService,
    private tipoArmaService: TipoArmaService,
    private acabamentoService: AcabamentoService,
    private tiposTiroService: TipoTiroService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    //inicializando
    this.formGroup = this.formBuilder.group({
      id:[null],
      nome:['', Validators.required],
      descricao: [''],
      preco: [null, Validators.required],
      qtdNoEstoque: ['', Validators.required],
      fabricante:['',Validators.required],
      modelo: ['', Validators.required],
      material:[null],
      calibre:[null],
      tipoArma: [null, Validators.required],
      acabamento: [null],
      peso: [null],
      propulsor:[''],
      tipoTiro:[null],
      velocidade:[''],
      capacidadeDeTiro: [''],
      
    });
  }

  ngOnInit(): void {
    forkJoin({ 
      armas: this.armaService.findAll(), 
      materiais: this.materialService.findAll(), 
      calibres: this.calibreService.findAll(), 
      tiposArma: this.tipoArmaService.findAll(), 
      acabamentos: this.acabamentoService.findAll(), 
      tiposTiro: this.tiposTiroService.findAll() 
    }).subscribe(data => { 
      this.armas = data.armas; 
      this.materiais = data.materiais; 
      this.calibres = data.calibres; 
      this.tiposArma = data.tiposArma; 
      this.acabamentos = data.acabamentos; 
      this.tiposTiro = data.tiposTiro; 
      this.initializeForm(); 
    });
  }

  initializeForm(): void{
    const arma: Arma = this.activatedRoute.snapshot.data['arma'];


    const material = this.materiais.find(material => material.id === (arma?.material?.id || null));
    const calibre = this.calibres.find(calibre => calibre.id === (arma?.calibre?.id || null));
    const tipoArma = this.tiposArma.find(tipoArma => tipoArma.id === (arma?.tipo?.id || null));
    const acabamento = this.acabamentos.find(acabamento => acabamento.id === (arma?.acabamento?.id || null));
    const tipoTiro = this.tiposTiro.find(tipoTiro => tipoTiro.id === (arma?.tipoTiro?.id || null));

    console.log(tipoArma);

    this.formGroup = this.formBuilder.group({
      id:[(arma && arma.id) ? arma.id : null],
      nome: [(arma && arma.nome) ? arma.nome : '', Validators.required],
      descricao: [(arma && arma.descricao) ? arma.descricao : ''],
      preco: [(arma && arma.preco) ? arma.preco : '', Validators.required],
      qtdNoEstoque: [(arma && arma.qtdNoEstoque) ? arma.qtdNoEstoque : '', Validators.required],
      fabricante:[(arma && arma.fabricante) ? arma.fabricante : '', Validators.required],
      modelo: [(arma && arma.modelo) ? arma.modelo : '', Validators.required],
      material:[material],
      calibre:[calibre],
      tipoArma: [tipoArma, Validators.required],
      acabamento: [acabamento],
      peso: [(arma && arma.peso) ? arma.peso : ''],
      propulsor:[(arma && arma.propulsor) ? arma.propulsor : ''],
      tipoTiro:[tipoTiro],
      velocidade:[(arma && arma.velocidade) ? arma.velocidade : ''],
      capacidadeDeTiro: [(arma && arma.capacidadeDeTiro) ? arma.capacidadeDeTiro : ''],
    });
  }

  salvar() {
    if (this.formGroup.valid) {
      const arma = this.formGroup.value;
      console.log(arma)
      if (arma.id ==null) {
        this.armaService.insert(arma).subscribe({
          next: (armaCadastrado) => {
            this.router.navigateByUrl('/armas');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          }
        });
      } else {
        this.armaService.update(arma).subscribe({
          next: (armaAlterado) => {
            this.router.navigateByUrl('/armas');
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
      const arma = this.formGroup.value;
      if (arma.id != null) {
        this.armaService.delete(arma).subscribe({
          next: () => {
            this.router.navigateByUrl('/armas');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }

}
