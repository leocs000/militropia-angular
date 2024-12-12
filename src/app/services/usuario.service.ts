import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl = 'http://localhost:8080/usuarios';

  constructor(private httpClient: HttpClient) { }
  
  create(usuario: string, senha: string): Observable<Usuario>{
    const data = {
      login: usuario,
      senha: senha,
      idPerfil: 1
    };
        
    return this.httpClient.post<Usuario>(this.baseUrl, data);
  }

}
