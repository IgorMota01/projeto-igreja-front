import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CatequeseCadastro } from '../models/catequesecadastro.model';

@Injectable({ providedIn: 'root' })
export class CatequeseService {
  private apiUrl = 'http://localhost:8080/api/catequese';

  constructor(private http: HttpClient) {}

  cadastrar(dados: CatequeseCadastro) {
    return this.http.post(this.apiUrl, dados);
  }
}
