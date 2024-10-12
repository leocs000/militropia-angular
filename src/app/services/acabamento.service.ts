import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Acabamento } from '../models/acabamento.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcabamentoService {

  private baseUrl = 'http://localhost:8080/acabamentos'

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<Acabamento[]>{
    return this.httpClient.get<Acabamento[]>(this.baseUrl);
  }

  findById(id: string): Observable<Acabamento>{
    return this.httpClient.get<Acabamento>(`${this.baseUrl}/${id}`);
  }

  insert(acabamento: Acabamento): Observable<Acabamento>{
/*    const data = {
      nome: arma.nome,
      idEstado: arma..id
    };
*/    
    return this.httpClient.post<Acabamento>(this.baseUrl, acabamento);
  }

  update(acabamento: Acabamento): Observable<Acabamento>{
/*    const data = {
      nome: arma.nome,
      idEstado: arma.estado.id
    };
*/
    return this.httpClient.put<Acabamento>(`${this.baseUrl}/${acabamento.id}`, acabamento);
  }

  delete(arma: Acabamento): Observable<any>{
    return this.httpClient.delete<Acabamento>(`${this.baseUrl}/${arma.id}`);
  }
}
