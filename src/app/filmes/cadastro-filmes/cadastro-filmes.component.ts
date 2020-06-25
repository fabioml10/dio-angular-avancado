import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  cadastro: FormGroup;

  constructor(private fb: FormBuilder) { }

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

  }



  salvar(): void {
    this.cadastro.markAllAsTouched()
    if (this.cadastro.invalid) {
      return
    }
    alert(JSON.stringify(this.cadastro.value, null, 4))
  }

  reiniciar(): void {
    this.cadastro.reset()
  }

}
