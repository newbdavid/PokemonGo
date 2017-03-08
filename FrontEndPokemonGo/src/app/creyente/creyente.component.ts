import { Component, OnInit } from '@angular/core';
import {Http, Response} from "@angular/http";
import {MasterUrlService} from "../services/master-url.service";
import {NgForm} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-creyente',
  templateUrl: './creyente.component.html',
  styleUrls: ['./creyente.component.css']
})
export class CreyenteComponent implements OnInit {

  private _parametros: any;
  Creyentes=[];
  nuevoCreyente={};

  constructor(private _ActivatedRoute: ActivatedRoute,
              private _http:Http,
              private _masterURL:MasterUrlService  ) {  }

  ngOnInit() {
    this.listarCreyente()

  }
  crearCreyente(formulario  :   NgForm  )
  {
    this.nuevoCreyente = {
      idCelula: formulario.value.idCelula,
      nombres_Creyente: formulario.value.nombres_Creyente,
      telefono_Celular: formulario.value.telefono_Celular,
      telefono_fijo: formulario.value.telefono_fijo,
      sector_Vivienda: formulario.value.sector_Vivienda,
      fecha_Nacimiento: formulario.value.fecha_Nacimiento,
      lidera_Celula: formulario.value.lidera_Celula
    }

    this._http.post(this._masterURL.url + 'Creyente', this.nuevoCreyente)
      .subscribe(
        (res: Response) => {
          this.Creyentes.push(res.json());
          this.Creyentes[this.Creyentes.length-1].formularioCerrado=true;
          this.nuevoCreyente = {};

        },
        (err) => {
          console.log("Error:", err);
        }
      )
  }

  listarCreyente(){
    this._ActivatedRoute.params.subscribe(
      parametros=>{
        this._parametros=parametros;
        this._http.get(this._masterURL.url+'Creyente')
          .subscribe(
            (res:Response)=>{
              this.Creyentes=res.json().map((value)=>{
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

  borrarCreyente(id: number) {
    this._http.delete(this._masterURL.url + "Creyente/" + id)
      .subscribe(
        (res) => {
          let creyenteBorrado = res.json();
          this.Creyentes = this.Creyentes.filter(value => creyenteBorrado.id != value.id);
        },
        (err) => {
          console.log(err);
        }
      )
  }

  editarCreyente(creyente: any) {
    let parametros = {
      idCelula: creyente.idCelula,
      nombres_Creyente: creyente.nombres_Creyente,
      telefono_Celular: creyente.telefono_Celular,
      telefono_fijo: creyente.telefono_fijo,
      sector_Vivienda: creyente.sector_Vivienda,
      fecha_Nacimiento: creyente.fecha_Nacimiento,
      lidera_Celula: creyente.lidera_Celula

    };
    this._http.put(this._masterURL.url + "Creyente/" + creyente.id, parametros)
      .subscribe(
        (res: Response) => {
          creyente.formularioCerrado = !creyente.formularioCerrado;

        },
        (err) => {
          console.log("Error:", err);
        }
      )
  }

}
