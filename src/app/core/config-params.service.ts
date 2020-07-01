import { Injectable } from '@angular/core';
import { ConfigParams } from '../shared/models/config-params';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigParamsService {

  constructor() { }

  configurarParametros(config: ConfigParams): HttpParams {

    let httpParams = new HttpParams()

    if (config.pagina) {
      httpParams = httpParams.set('_page', config.pagina.toString())
    }
    if (config.limite) {
      httpParams = httpParams.set('_limit', config.limite.toString())
    }
    httpParams = httpParams.set('_sort', 'id')
    httpParams = httpParams.set('_order', 'desc')
    if (config.pesquisa) {
      httpParams = httpParams.set('q', config.pesquisa.toString())
    }
    // if (config.campo.tipo) {
    //   httpParams = httpParams.set(config.campo.tipo, config.campo.valor.toString())
    // }
    return httpParams

  }
}
