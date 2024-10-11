import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Funcionario } from '../models/funcionario.model';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  private baseUrl = 'http://localhost:8080/funcionarios';

  constructor(private httpClient: HttpClient) {
  }

  findAll(): Observable<Funcionario[]> {
    return this.httpClient.get<Funcionario[]>(this.baseUrl); 
  }

  findById(id: string): Observable<Funcionario> {
    return this.httpClient.get<Funcionario>(`${this.baseUrl}/${id}`); 
  }

  insert(funcionario: Funcionario): Observable<Funcionario> {
    return this.httpClient.post<Funcionario>(this.baseUrl, funcionario);
  }

  update(funcionario: Funcionario): Observable<Funcionario> {
    return this.httpClient.put<any>(`${this.baseUrl}/${funcionario.id}`, funcionario); 
  }

  delete(id: number): Observable<any>{
    return this.httpClient.delete<any>(`${this.baseUrl}/${id}`); 
  }

}