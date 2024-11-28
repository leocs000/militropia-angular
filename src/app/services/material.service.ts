import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Material } from '../models/material.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  private baseUrl = 'http://localhost:8080/materiais'

  constructor(private httpClient: HttpClient) { }

  findAll(page?: number, pageSize?: number): Observable<Material[]>{

    let params = {};

    if (page !== undefined && pageSize !== undefined) {
      params = {
        page: page.toString(),
        pageSize: pageSize.toString()
      }
    }

    return this.httpClient.get<Material[]>(this.baseUrl, {params});
  }

  count(): Observable<number>{
    return this.httpClient.get<number>(`${this.baseUrl}/count`);
  }

  findById(id: string): Observable<Material>{
    return this.httpClient.get<Material>(`${this.baseUrl}/${id}`);
  }

  insert(material: Material): Observable<Material>{
/*    const data = {
      nome: arma.nome,
      idEstado: arma..id
    };
*/    
    return this.httpClient.post<Material>(this.baseUrl, material);
  }

  update(material: Material): Observable<Material>{
/*    const data = {
      nome: arma.nome,
      idEstado: arma.estado.id
    };
*/
    return this.httpClient.put<Material>(`${this.baseUrl}/${material.id}`, material);
  }

  delete(arma: Material): Observable<any>{
    return this.httpClient.delete<Material>(`${this.baseUrl}/${arma.id}`);
  }
}
