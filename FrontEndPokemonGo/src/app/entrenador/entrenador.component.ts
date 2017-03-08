import { Component, OnInit } from '@angular/core';
import {Http, Response} from "@angular/http";
import {MasterUrlService} from "../services/master-url.service";
import {NgForm} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-entrenador',
  templateUrl: './entrenador.component.html',
  styleUrls: ['./entrenador.component.css']
})
export class EntrenadorComponent implements OnInit {
  private _parametros: any;
  entrenadores=[];
  nuevoEntrenador={};
  regionSelecionada="";


  constructor(private _ActivedRoute: ActivatedRoute,private _http:Http,private _masterURL:MasterUrlService) { }

  ngOnInit() {

    this.listarEntrenador();

  }

  

  crearEntrenador(formulario: NgForm) {


    this._http.post(this._masterURL.url + "Entrenador", {
      nombre: formulario.value.nombre,
      region: formulario.value.region,
      fechaInicioMaestroPokemon: formulario.value.fechaInicioMaestroPokemon

    }).subscribe(
      (res) => {
        console.log(formulario.value.region);
        this.entrenadores.push(res.json());
        this.entrenadores[this.entrenadores.length-1].formularioCerrado=true;
        this.nuevoEntrenador = {};

      },
      (err) => {
        console.log("Ocurrio un error", err);
      }
    );


  }

  listarEntrenador() {
    this._ActivedRoute.params.subscribe(
      parametros => {
        this._parametros = parametros;
        this._http.get(this._masterURL.url + 'Entrenador')
          .subscribe(
            (res: Response) => {
              this.entrenadores = res.json().map((value) => {
                value.formularioCerrado = true;
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

  borrarEntrenador(id: number) {
    this._http.delete(this._masterURL.url + "Entrenador/" + id)
      .subscribe(
        (res) => {
          let EntrenadorBorrado = res.json();
          this.entrenadores = this.entrenadores.filter(value => EntrenadorBorrado.id != value.id);
        },
        (err) => {
          console.log(err);
        }
      )
  }

  editarEntrenador(entrenador: any) {
    let parametros = {
      nombre: entrenador.nombre,
      region: entrenador.region,
      fechaInicioMaestroPokemon: entrenador.fechaInicioMaestroPokemon,

    };
    this._http.put(this._masterURL.url + "Entrenador/" + entrenador.id, parametros)
      .subscribe(
        (res: Response) => {
          entrenador.formularioCerrado = !entrenador.formularioCerrado;

        },
        (err) => {
          console.log("Error:", err);
        }
      )
  }

}
