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

  getUrlImage(nomeImagem: string): string {
    return `${this.baseUrl}/download/imagem/${nomeImagem}`; 
  }

  uploadImage(id: number, nomeImagem: string, imagem: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('id', id.toString());
    formData.append('nomeImagem', imagem.name);
    formData.append('imagem', imagem, imagem.name);
    
    return this.httpClient.patch<Arma>(`${this.baseUrl}/upload/imagem/`, formData);
  }
  
  findAll(page?: number, pageSize?: number): Observable<Arma[]>{

    let params = {};

    if (page !== undefined && pageSize !== undefined) {
      params = {
        page: page.toString(),
        pageSize: pageSize.toString()
      }
    }
    return this.httpClient.get<Arma[]>(this.baseUrl, {params});
  }

  count(): Observable<number>{
    return this.httpClient.get<number>(`${this.baseUrl}/count`);
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
