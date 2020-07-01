import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmesService } from 'src/app/core/filmes.service';
import { Filme } from 'src/app/shared/models/filme';
import { Alert } from 'src/app/shared/models/alert';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'dio-visualizar-filmes',
  templateUrl: './visualizar-filmes.component.html',
  styleUrls: ['./visualizar-filmes.component.scss']
})
export class VisualizarFilmesComponent implements OnInit {

  readonly semFoto: 'https://www.termoparts.com.br/wp-content/uploads/2017/10/no-image-300x300.jpg'
  filme: Filme
  id: number

  constructor(
    public dialog: MatDialog,
    private ar: ActivatedRoute,
    private filmesService: FilmesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.ar.snapshot.params['id']
    this.visualizar()
  }

  excluir(): void {

    const config = {
      data: {
        titulo: "Excluir?",
        descricao: "Realmente deseja excluir?",
        possuiBtnCancelar: true
      } as Alert
    }

    const dialog = this.dialog.open(AlertComponent, config)
    dialog.afterClosed().subscribe((opcao: boolean) => {
      if (opcao) {
        this.filmesService.excluir(this.id).subscribe(() => this.router.navigateByUrl('/filmes'))
      }
    })

  }

  editar(): void {
    this.router.navigateByUrl('/fimes/cadastro/' + this.id)
  }

  private visualizar(): void {
    this.filmesService.visualizar(this.id).subscribe((filme: Filme) => this.filme = filme)
  }

}
