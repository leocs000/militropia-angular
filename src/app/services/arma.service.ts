import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Arma } from '../models/arma.model';

@Injectable({
  providedIn: 'root'
})
export class ArmaService {

  private baseUrl = 'http://localhost:8080/armas'

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<Arma[]>{
    return this.httpClient.get<Arma[]>(this.baseUrl);
  }

  findById(id: string): Observable<Arma>{
    return this.httpClient.get<Arma>(`${this.baseUrl}/${id}`);
  }

  insert(arma: Arma): Observable<Arma>{
/*    const data = {
      nome: arma.nome,
      idEstado: arma..id
    };
*/    
    return this.httpClient.post<Arma>(this.baseUrl, arma);
  }

  update(arma: Arma): Observable<Arma>{
/*    const data = {
      nome: arma.nome,
      idEstado: arma.estado.id
    };
*/    
    return this.httpClient.put<Arma>(`${this.baseUrl}/${arma.id}`, arma);
  }

  delete(arma: Arma): Observable<any>{
    return this.httpClient.delete<Arma>(`${this.baseUrl}/${arma.id}`);
  }
}
