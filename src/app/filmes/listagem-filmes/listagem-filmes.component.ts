import { Component, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs/operators'
import { FilmesService } from 'src/app/core/filmes.service';
import { Filme } from 'src/app/shared/models/filme';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ConfigParams } from 'src/app/shared/models/config-params';
import { Router } from '@angular/router';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {

  readonly semFoto: 'https://www.termoparts.com.br/wp-content/uploads/2017/10/no-image-300x300.jpg'

  config: ConfigParams = {
    pagina: 0,
    limite: 4
  }
  filmes: Filme[] = []
  filtro: FormGroup
  generos: Array<string>

  constructor(private filmesService: FilmesService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.filtro = this.fb.group(
      {
        texto: [''],
        genero: ['']
      }
    )

    this.filtro.get('texto').valueChanges
      .pipe(debounceTime(400))
      .subscribe((val: string) => {
        this.config.pesquisa = val
        this.reiniciarConsulta()
      })
    this.filtro.get('genero').valueChanges.subscribe((val: string) => {
      this.config.campo = { tipo: 'genero', valor: val }
      this.reiniciarConsulta()
    })

    this.generos = [
      "Ação",
      "Aventura",
      "Ficção Científica",
      "Romance",
      "Terror"
    ]

    this.listarFilmes()
  }

  open(id: number): void {
    this.router.navigateByUrl('/filmes/' + id)
  }

  onScroll(): void {
    this.listarFilmes()
  }

  private listarFilmes(): void {
    this.filmesService.listar(this.config).subscribe((filmes: Filme[]) => this.filmes.push(...filmes))
    this.config.pagina++
  }

  private reiniciarConsulta(): void {
    this.config.pagina = 0
    this.filmes = []
    this.listarFilmes()
  }

}
