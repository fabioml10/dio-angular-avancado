import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { Filme } from 'src/app/shared/models/filme';
import { FilmesService } from 'src/app/core/filmes.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { Alert } from 'src/app/shared/models/alert';
import { Router } from '@angular/router';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  cadastro: FormGroup;
  generos: Array<string>

  constructor(
    public validacao: ValidarCamposService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private filmeService: FilmesService,
    private router: Router
  ) { }

  get f() {
    return this.cadastro.controls
  }

  ngOnInit(): void {

    //vincula com o form do html
    this.cadastro = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      foto: [''],
      dataLancamento: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      nota: [0, [Validators.min(0), Validators.max(10)]],
      IMDb: [''],
      genero: ['', [Validators.required]]
    });

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
    this.salvar(filme)
  }

  reiniciar(): void {
    this.cadastro.reset()
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
}
