import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoTiro } from '../models/tipo-tiro.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoTiroService {

  private baseUrl = 'http://localhost:8080/tipotiros'

  constructor(private httpClient: HttpClient) { }

  findAll(page?: number, pageSize?: number): Observable<TipoTiro[]>{

    let params = {};

    if (page !== undefined && pageSize !== undefined) {
      params = {
        page: page.toString(),
        pageSize: pageSize.toString()
      }
    }

    return this.httpClient.get<TipoTiro[]>(this.baseUrl, {params});
  }

  count(): Observable<number>{
    return this.httpClient.get<number>(`${this.baseUrl}/count`);
  }

  findById(id: string): Observable<TipoTiro>{
    return this.httpClient.get<TipoTiro>(`${this.baseUrl}/${id}`);
  }

  insert(tipotiro: TipoTiro): Observable<TipoTiro>{
/*    const data = {
      nome: arma.nome,
      idEstado: arma..id
    };
*/    
    return this.httpClient.post<TipoTiro>(this.baseUrl, tipotiro);
  }

  update(tipotiro: TipoTiro): Observable<TipoTiro>{
/*    const data = {
      nome: arma.nome,
      idEstado: arma.estado.id
    };
*/
    return this.httpClient.put<TipoTiro>(`${this.baseUrl}/${tipotiro.id}`, tipotiro);
  }

  delete(arma: TipoTiro): Observable<any>{
    return this.httpClient.delete<TipoTiro>(`${this.baseUrl}/${arma.id}`);
  }
}
