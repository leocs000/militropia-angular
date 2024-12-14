import { Location, NgFor, NgIf } from '@angular/common';
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
import { forkJoin } from 'rxjs';
import { TipoArmaService } from '../../../services/tipo-arma.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-arma-form',
  standalone: true,
  imports: [NgIf, NgFor, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule,
    RouterModule, MatSelectModule, MatIconModule],
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

  fileName: string = '';
  selectedFile: File | null = null; 
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private formBuilder: FormBuilder,
    private armaService: ArmaService,
    private materialService: MaterialService,
    private calibreService: CalibreService,
    private tipoArmaService: TipoArmaService,
    private acabamentoService: AcabamentoService,
    private tiposTiroService: TipoTiroService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location) {

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
      tipo: [null, Validators.required],
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
    }).subscribe({
      next: data => { 
        this.armas = data.armas; 
        this.materiais = data.materiais; 
        this.calibres = data.calibres; 
        this.tiposArma = data.tiposArma; 
        this.acabamentos = data.acabamentos; 
        this.tiposTiro = data.tiposTiro; 
        this.initializeForm(); 
      },
      error: err => {
        console.error('Erro ao carregar dados', err);
      }
    });
    
    
  }

  voltarPagina() {
    this.location.back();
  }

  initializeForm(): void{
    const arma: Arma = this.activatedRoute.snapshot.data['arma'];


    const material = this.materiais.find(material => material.id === (arma?.material?.id || null));
    const calibre = this.calibres.find(calibre => calibre.id === (arma?.calibre?.id || null));
    const tipoArma = this.tiposArma.find(tipoArma => tipoArma.id === (arma?.tipo?.id || null));
    const acabamento = this.acabamentos.find(acabamento => acabamento.id === (arma?.acabamento?.id || null));
    const tipoTiro = this.tiposTiro.find(tipoTiro => tipoTiro.id === (arma?.tipoTiro?.id || null));

    // carregando a imagem do preview
    if (arma && arma.nomeImagem) {
      this.imagePreview = this.armaService.getUrlImage(arma.nomeImagem);
      this.fileName = arma.nomeImagem;
    }

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
      tipo: [tipoArma, Validators.required],
      acabamento: [acabamento],
      peso: [(arma && arma.peso) ? arma.peso : ''],
      propulsor:[(arma && arma.propulsor) ? arma.propulsor : ''],
      tipoTiro:[tipoTiro],
      velocidade:[(arma && arma.velocidade) ? arma.velocidade : ''],
      capacidadeDeTiro: [(arma && arma.capacidadeDeTiro) ? arma.capacidadeDeTiro : ''],
    });
  }

  tratarErros(errorResponse: HttpErrorResponse) {

    if (errorResponse.status === 400) {
      if (errorResponse.error?.errors) {
        errorResponse.error.errors.forEach((validationError: any) => {
          const formControl = this.formGroup.get(validationError.fieldName);

          if (formControl) {
            formControl.setErrors({apiError: validationError.message})
          }

        });
      }
    } else if (errorResponse.status < 400){
      alert(errorResponse.error?.message || 'Erro genérico do envio do formulário.');
    } else if (errorResponse.status >= 500) {
      alert('Erro interno do servidor.');
    }

  }

  carregarImagemSelecionada(event: any) {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      this.fileName = this.selectedFile.name;
      // carregando image preview
      const reader = new FileReader();
      reader.onload = e => this.imagePreview = reader.result;
      reader.readAsDataURL(this.selectedFile);
    }

  }

  private uploadImage(armaId: number) {
    if (this.selectedFile) {
      this.armaService.uploadImage(armaId, this.selectedFile.name, this.selectedFile)
      .subscribe({
        next: () => {
          this.voltarPagina();
        },
        error: err => {
          console.log('Erro ao fazer o upload da imagem');
          // tratar o erro
        }
      })
    } else {
      this.voltarPagina();
    }
  }

  salvar() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const arma = this.formGroup.value;

      // selecionando a operacao (insert ou update)
      const operacao = arma.id == null
      ? this.armaService.insert(arma)
      : this.armaService.update(arma);

      // executando a operacao
      operacao.subscribe({
        next: (armaCadastrada) => {
          this.uploadImage(armaCadastrada.id);
        },
        error: (error) => {
          console.log('Erro ao Salvar' + JSON.stringify(error));
          this.tratarErros(error);
        }
      });
    }
  }

  excluir() {
    if (this.formGroup.valid) {
      const arma = this.formGroup.value;
      if (arma.id != null) {
        this.armaService.delete(arma).subscribe({
          next: () => {
            this.router.navigateByUrl('/admin/armas');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }

}
