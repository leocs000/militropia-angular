import { Injectable } from '@angular/core';
import { Calibre } from '../models/calibre.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CalibreService {

  private baseUrl = 'http://localhost:8080/calibres'

  constructor(private httpClient: HttpClient) { }

  findAll(page?: number, pageSize?: number): Observable<Calibre[]>{

    let params = {};

    if (page !== undefined && pageSize !== undefined) {
      params = {
        page: page.toString(),
        pageSize: pageSize.toString()
      }
    }

    return this.httpClient.get<Calibre[]>(this.baseUrl, {params});
  }

  count(): Observable<number>{
    return this.httpClient.get<number>(`${this.baseUrl}/count`);
  }

  findById(id: string): Observable<Calibre>{
    return this.httpClient.get<Calibre>(`${this.baseUrl}/${id}`);
  }

  insert(calibre: Calibre): Observable<Calibre>{
/*    const data = {
      nome: arma.nome,
      idEstado: arma..id
    };
*/    
    return this.httpClient.post<Calibre>(this.baseUrl, calibre);
  }

  update(calibre: Calibre): Observable<Calibre>{
/*    const data = {
      nome: arma.nome,
      idEstado: arma.estado.id
    };
*/
    return this.httpClient.put<Calibre>(`${this.baseUrl}/${calibre.id}`, calibre);
  }

  delete(arma: Calibre): Observable<any>{
    return this.httpClient.delete<Calibre>(`${this.baseUrl}/${arma.id}`);
  }
}
