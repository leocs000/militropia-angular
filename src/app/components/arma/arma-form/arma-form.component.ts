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
      estado:[null],
      qtdNoEstoque: ['', Validators.required],
      preco: ['', Validators.required],
      descricao: ['', Validators.required],
      tipo: [1],
      marca: ['', Validators.required],
      acabamento: ['', Validators.required],
      calibre: ['', Validators.required],
      comprimentoDoCano: ['', Validators.required],
      capacidadeDeTiro: ['', Validators.required],
      numeroSigma: ['', Validators.required],
      numeroDaArma: ['', Validators.required],
      modelo: ['', Validators.required],
      rna: ['', Validators.required],
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
      qtdNoEstoque: [(arma && arma.qtdNoEstoque) ? arma.qtdNoEstoque : '', Validators.required],
      preco: [(arma && arma.preco) ? arma.preco : '', Validators.required],
      descricao: [(arma && arma.descricao) ? arma.descricao : '', Validators.required],
      tipo: [1],
      marca: [(arma && arma.marca) ? arma.marca : '', Validators.required],
      acabamento: [(arma && arma.acabamento) ? arma.acabamento : '', Validators.required],
      calibre: [(arma && arma.calibre) ? arma.calibre : '', Validators.required],
      comprimentoDoCano: [(arma && arma.comprimentoDoCano) ? arma.comprimentoDoCano : '', Validators.required],
      capacidadeDeTiro: [(arma && arma.capacidadeDeTiro) ? arma.capacidadeDeTiro : '', Validators.required],
      numeroSigma: [(arma && arma.numeroSigma) ? arma.numeroSigma : '', Validators.required],
      numeroDaArma: [(arma && arma.numeroDaArma) ? arma.numeroDaArma : '', Validators.required],
      modelo: [(arma && arma.modelo) ? arma.modelo : '', Validators.required],
      rna: [(arma && arma.rna) ? arma.rna : '', Validators.required],
    });
  }

  salvar() {
    if (this.formGroup.valid) {
      const arma = this.formGroup.value;
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
