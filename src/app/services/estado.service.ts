import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estado } from '../models/estado.model';


@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  private baseUrl = 'http://localhost:8080/estados'
//  private baseUrl = './assets/Estados.json'

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<Estado[]>{
    return this.httpClient.get<Estado[]>(this.baseUrl);
  }

  findById(id: string): Observable<Estado>{
    return this.httpClient.get<Estado>(`${this.baseUrl}/${id}`);
  }

  insert(estado: Estado): Observable<Estado>{
    console.log(estado);
    return this.httpClient.post<Estado>(this.baseUrl, estado);
  }

  update(estado: Estado): Observable<Estado>{
    console.log(estado);
    return this.httpClient.put<Estado>(`${this.baseUrl}/${estado.id}`, estado);
  }

  delete(estado: Estado): Observable<any>{
    return this.httpClient.delete<Estado>(`${this.baseUrl}/${estado.id}`);
  }

}
