import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Filme } from '../shared/models/filme';

const url = 'http://localhost:3000/filmes/'

@Injectable({
  providedIn: 'root'
})
export class FilmesService {

  constructor(private http: HttpClient) { }

  salvar(filme: Filme): Observable<Filme> {
    return this.http.post<Filme>(url, filme)
  }

  listar(pagina: number, qtdRegistros: number): Observable<Filme[]> {
    console.log(pagina, qtdRegistros)
    let httpParams = new HttpParams()
    httpParams = httpParams.set('_page', pagina.toString())
    httpParams = httpParams.set('_limit', qtdRegistros.toString())
    return this.http.get<Filme[]>(url, { params: httpParams })
  }

}
