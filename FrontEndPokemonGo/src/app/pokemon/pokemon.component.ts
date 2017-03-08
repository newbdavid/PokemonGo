import { Component, OnInit } from '@angular/core';
import {Http, Response} from "@angular/http";
import {MasterUrlService} from "../services/master-url.service";
import {NgForm} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  private _parametros: any;
  pokemones=[];
  nuevoPokemon={};
  entrenador={};


  constructor(private _ActivedRoute: ActivatedRoute,private _http:Http,private _masterURL:MasterUrlService) { }

  ngOnInit() {

    this.listarPokemon();

  }



  crearPokemon(formulario: NgForm) {


    this._http.post(this._masterURL.url + "Pokemon", {
      nombre: formulario.value.nombre,
      tipoPokemon1: formulario.value.tipoPokemon1,
      tipoPokemon2: formulario.value.tipoPokemon2,
      idPokemon: formulario.value.idPokemon

    }).subscribe(
      (res) => {

        this.pokemones.push(res.json());
        this.pokemones[this.pokemones.length-1].formularioCerrado=true;
        this.nuevoPokemon = {};


      },
      (err) => {
        console.log("Ocurrio un error", err);
      }
    );


  }

  listarPokemon() {
    this._ActivedRoute.params.subscribe(
      parametros => {
        this._parametros = parametros;
        this._http.get(this._masterURL.url + 'Pokemon')
          .subscribe(
            (res: Response) => {
              this.pokemones = res.json().map((value) => {
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

  borrarPokemon(id: number) {
    this._http.delete(this._masterURL.url + "Entrenador/" + id)
      .subscribe(
        (res) => {
          let PokemonBorrado = res.json();
          this.pokemones = this.pokemones.filter(value => PokemonBorrado.id != value.id);
        },
        (err) => {
          console.log(err);
        }
      )
  }

  buscarEntrenador(id:any){
    this._ActivedRoute.params.subscribe(
      parametros => {

        this._http.get(this._masterURL.url + 'Entrenador?id='+id)
          .subscribe(
            (res: Response) => {
              this.entrenador = res.json();
              return this.entrenador;

            },
            (err) => {
              console.log("Ocurrio un error", err);
            }
          );
      }
    )
  }

  editarPokemon(entrenador: any) {

    let parametros = {
      nombre: entrenador.nombre,
      tipoPokemon1: entrenador.tipoPokemon1,
      tipoPokemon2: entrenador.tipoPokemon2,
      idPokemon: this.buscarEntrenador(entrenador.idPokemon),


    };
    this._http.put(this._masterURL.url + "Pokemon/" + entrenador.id, parametros)
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
