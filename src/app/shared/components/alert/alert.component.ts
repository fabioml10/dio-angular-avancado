import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alert } from '../../models/alert';

@Component({
  selector: 'dio-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  alerta = {
    titulo: 'Sucesso!',
    texto: 'Registro salvo com sucesso.',
    btnSucesso: 'OK',
    btnCancelar: 'Cancelar',
    corBtnSuccesso: "accent",
    corBtnCancelar: "warn",
    possuiBtnCancelar: false
  } as Alert

  constructor(
    public dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Alert
  ) { }

  ngOnInit() {
    if (this.data) {
      this.alerta.titulo = this.data.titulo || this.alerta.titulo
      this.alerta.texto = this.data.texto || this.alerta.texto
      this.alerta.btnSucesso = this.data.btnSucesso || this.alerta.btnSucesso
      this.alerta.btnCancelar = this.data.btnCancelar || this.alerta.btnCancelar
      this.alerta.corBtnSuccesso = this.data.corBtnSuccesso || this.alerta.corBtnSuccesso
      this.alerta.corBtnCancelar = this.data.corBtnCancelar || this.alerta.corBtnCancelar
      this.alerta.possuiBtnCancelar = this.data.possuiBtnCancelar || this.alerta.possuiBtnCancelar
    }
  }

}
