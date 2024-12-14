import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl = 'http://localhost:8080/cadastro';

  constructor(private httpClient: HttpClient) { }
  
  create(cpf: string, email: string, login: string, senha: string): Observable<Usuario>{
    const data = {
      cpf: cpf,
      email: email,
      login: login,
      senha: senha,
      idPerfil: 1
    };
        
    return this.httpClient.post<Usuario>(this.baseUrl, data);
  }

}
