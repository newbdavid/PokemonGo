import { Component, OnInit } from '@angular/core';
import {Http, Response} from "@angular/http";
import {MasterUrlService} from "../services/master-url.service";
import {NgForm} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-celula',
  templateUrl: './celula.component.html',
  styleUrls: ['./celula.component.css']
})
export class CelulaComponent implements OnInit {

  private _parametros: any;
  Celulas=[];
  nuevaCelula={};

  constructor(private _ActivatedRoute: ActivatedRoute,
              private _http:Http,
              private _masterURL:MasterUrlService  ) {  }

  ngOnInit() {
    this.listarCelula()

  }
  crearCelula(formulario  :   NgForm  )
  {
    this.nuevaCelula = {
      sector_Celula: formulario.value.sector_Celula,
      edad_Minima: formulario.value.edad_Minima,
      edad_Maxima: formulario.value.edad_Maxima,
      id_Lider: formulario.value.id_Lider
    }

    this._http.post(this._masterURL.url + 'Celula', this.nuevaCelula)
      .subscribe(
        (res: Response) => {
          this.Celulas.push(res.json());
          this.Celulas[this.Celulas.length-1].formularioCerrado=true;
          this.nuevaCelula = {};

        },
        (err) => {
          console.log("Error:", err);
        }
      )
  }

  listarCelula(){
    this._ActivatedRoute.params.subscribe(
      parametros=>{
        this._parametros=parametros;
        this._http.get(this._masterURL.url+'Celula')
          .subscribe(
            (res:Response)=>{
              this.Celulas=res.json().map((value)=>{
                value.formularioCerrado=true;
                return value;
              });

            },
            (err) => {
              console.log("Ocurrio un error", err);
            }
          );
      }
    )


  }

  borrarCelula(id: number) {
    this._http.delete(this._masterURL.url + "Celula/" + id)
      .subscribe(
        (res) => {
          let celulaBorrada = res.json();
          this.Celulas = this.Celulas.filter(value => celulaBorrada.id != value.id);
        },
        (err) => {
          console.log(err);
        }
      )
  }

  editarCelula(celula: any) {
    let parametros = {
      sector_Celula: celula.sector_Celula,
      edad_Minima: celula.edad_Minima,
      edad_Maxima: celula.edad_Maxima,
      id_Lider: celula.id_Lider

    };
    this._http.put(this._masterURL.url + "Celula/" + celula.id, parametros)
      .subscribe(
        (res: Response) => {
          celula.formularioCerrado = !celula.formularioCerrado;

        },
        (err) => {
          console.log("Error:", err);
        }
      )
  }

}

