import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { Filme } from 'src/app/shared/models/filme';
import { FilmesService } from 'src/app/core/filmes.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { Alert } from 'src/app/shared/models/alert';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  id: number
  cadastro: FormGroup;
  generos: Array<string>

  constructor(
    public validacao: ValidarCamposService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private filmeService: FilmesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  get f() {
    return this.cadastro.controls
  }

  ngOnInit(): void {

    this.id = this.activatedRoute.snapshot.params['id']

    if (this.id) {
      this.filmeService.visualizar(this.id).subscribe((filme: Filme) => this.criarFormulario(filme))
    } else {
      this.criarFormulario(this.criarFilmeBranco())
    }

    this.generos = [
      "Ação",
      "Aventura",
      "Ficção Científica",
      "Romance",
      "Terror"
    ]
  }

  submit(): void {
    this.cadastro.markAllAsTouched()
    if (this.cadastro.invalid) {
      return
    }
    const filme = this.cadastro.getRawValue() as Filme
    if (this.id) {
      filme.id = this.id
      this.editar(filme)
    } else {
      this.salvar(filme)
    }
  }

  reiniciar(): void {
    this.cadastro.reset()
  }

  private criarFormulario(filme: Filme): void {
    this.cadastro = this.fb.group({
      titulo: [filme.titulo, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      foto: [filme.foto],
      dataLancamento: [filme.dataLancamento, [Validators.required]],
      descricao: [filme.descricao, [Validators.required]],
      nota: [filme.nota, [Validators.min(0), Validators.max(10)]],
      IMDb: [filme.IMDb],
      genero: [filme.genero, [Validators.required]]
    });
  }

  private criarFilmeBranco(): Filme {
    return {
      id: null,
      titulo: null,
      foto: null,
      dataLancamento: null,
      descricao: null,
      nota: null,
      IMDb: null,
      genero: null
    } as Filme
  }

  private salvar(filme: Filme): void {
    this.filmeService.salvar(filme).subscribe(() => {
      const config = {
        data: {
          btnSucesso: 'Listagem',
          btnCancelar: 'Cadastrar outro item',
          possuiBtnCancelar: true
        } as Alert
      }
      const dialog = this.dialog.open(AlertComponent, config)
      dialog.afterClosed().subscribe((opcao: boolean) => {
        if (opcao) {
          this.router.navigateByUrl('filmes')
        } else {
          this.reiniciar()
        }
      })
    },
      () => {
        const config = {
          data: {
            titulo: 'Erro!',
            text: 'Não foi possível salvar o registro.',
            corBtnSuccesso: 'warn',
            possuiBtnCancelar: false
          } as Alert
        }
        this.dialog.open(AlertComponent, config)
      },
      () => { console.log("Finaly") }
    )
  }

  private editar(filme: Filme): void {
    this.filmeService.editar(filme).subscribe(() => {
      const config = {
        data: {
          descricao: "Registro atualizado com sucesso.",
          btnSucesso: 'Listagem',
        } as Alert
      }
      const dialog = this.dialog.open(AlertComponent, config)
      dialog.afterClosed().subscribe(() => this.router.navigateByUrl('filmes'))
    },
      () => {
        const config = {
          data: {
            titulo: 'Erro!',
            text: 'Não foi possível editar o registro.',
            corBtnSuccesso: 'warn',
            possuiBtnCancelar: false
          } as Alert
        }
        this.dialog.open(AlertComponent, config)
      },
      () => { console.log("Finaly") }
    )
  }
}
