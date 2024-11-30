import { Injectable } from '@angular/core';
import { TipoArma } from '../models/tipo-arma.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoArmaService {

  private baseUrl = 'http://localhost:8080/tiposarma'

  constructor(private httpClient: HttpClient) { }

  findAll(page?: number, pageSize?: number): Observable<TipoArma[]>{

    let params = {};

    if (page !== undefined && pageSize !== undefined) {
      params = {
        page: page.toString(),
        pageSize: pageSize.toString()
      }
    }

    return this.httpClient.get<TipoArma[]>(this.baseUrl, {params});
  }

  count(): Observable<number>{
    return this.httpClient.get<number>(`${this.baseUrl}/count`);
  }

  findById(id: string): Observable<TipoArma>{
    return this.httpClient.get<TipoArma>(`${this.baseUrl}/${id}`);
  }

  insert(tipoarma: TipoArma): Observable<TipoArma>{
/*    const data = {
      nome: arma.nome,
      idEstado: arma..id
    };
*/    
    return this.httpClient.post<TipoArma>(this.baseUrl, tipoarma);
  }

  update(tipoarma: TipoArma): Observable<TipoArma>{
/*    const data = {
      nome: arma.nome,
      idEstado: arma.estado.id
    };
*/
    return this.httpClient.put<TipoArma>(`${this.baseUrl}/${tipoarma.id}`, tipoarma);
  }

  delete(arma: TipoArma): Observable<any>{
    return this.httpClient.delete<TipoArma>(`${this.baseUrl}/${arma.id}`);
  }
}
