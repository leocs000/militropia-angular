import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Arma } from '../models/arma.model';
import { TipoArma } from '../models/tipo-arma.model';

@Injectable({
  providedIn: 'root'
})
export class ArmaService {

  private baseUrl = 'http://localhost:8080/armas'

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<Arma[]>{
    return this.httpClient.get<Arma[]>(this.baseUrl);
  }

  findTiposArma(): Observable<TipoArma[]>{
    return this.httpClient.get<TipoArma[]>(`${this.baseUrl}/tiposarma`);
  }

  findById(id: string): Observable<Arma>{
    return this.httpClient.get<Arma>(`${this.baseUrl}/${id}`);
  }

  insert(arma: Arma): Observable<Arma>{
    const data = {
      nome: arma.nome,
      qtdNoEstoque: arma.qtdNoEstoque,
      preco: arma.preco,
      descricao: arma.descricao,
      fabricante: arma.fabricante,
      modelo: arma.modelo,
      peso: arma.peso,
      idMaterial: arma.material.id,
      idCalibre: arma.calibre.id,
      idTipoArma: arma.tipo.id,
      idAcabamento: arma.acabamento.id,
      capacidadeDeTiro: arma.capacidadeDeTiro,
      propulsor: arma.propulsor,
      velocidade: arma.velocidade,
      idtipoTiro: arma.tipoTiro.id,
    };
    
    return this.httpClient.post<Arma>(this.baseUrl, data);
  }

  update(arma: Arma): Observable<Arma>{
    const data = {
      nome: arma.nome,
      qtdNoEstoque: arma.qtdNoEstoque,
      preco: arma.preco,
      descricao: arma.descricao,
      fabricante: arma.fabricante,
      modelo: arma.modelo,
      peso: arma.peso,
      idMaterial: arma.material.id,
      idCalibre: arma.calibre.id,
      idTipoArma: arma.tipo.id,
      idAcabamento: arma.acabamento.id,
      capacidadeDeTiro: arma.capacidadeDeTiro,
      propulsor: arma.propulsor,
      velocidade: arma.velocidade,
      idtipoTiro: arma.tipoTiro.id,
    };
    return this.httpClient.put<Arma>(`${this.baseUrl}/${arma.id}`, data);
  }

  delete(arma: Arma): Observable<any>{
    return this.httpClient.delete<Arma>(`${this.baseUrl}/${arma.id}`);
  }

}
