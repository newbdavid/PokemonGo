import { Component, OnInit } from '@angular/core';
import {Http, Response} from "@angular/http";
import {MasterUrlService} from "../services/master-url.service";
import {NgForm} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-reunion-jovenes',
  templateUrl: './reunion-jovenes.component.html',
  styleUrls: ['./reunion-jovenes.component.css']
})
export class ReunionJovenesComponent implements OnInit {

  private _parametros: any;
  reunionesJovenes=[];
  nuevaReunionJovenes={};

  constructor(private _ActivedRoute: ActivatedRoute, private _http:Http,private _masterURL:MasterUrlService) { }

  ngOnInit() {

    this.listarReunionJovenes();

  }



  crearReunionJovenes(formulario: NgForm) {


    this._http.post(this._masterURL.url + "ReunionJovenes", {
      //Maybe something more here
      tema_Reunion: formulario.value.tema_Reunion,

    }).subscribe(
      (res:Response) => {

        this.reunionesJovenes.push(res.json());
        this.reunionesJovenes[this.reunionesJovenes.length-1].formularioCerrado=true;
        this.nuevaReunionJovenes = {};

      },
      (err) => {
        console.log("Ocurrio un error", err);
      }
    );


  }

  listarReunionJovenes(){
    this._ActivedRoute.params.subscribe(
      parametros=>{
        this._parametros=parametros;
        this._http.get(this._masterURL.url+'ReunionJovenes')
          .subscribe(
            (res:Response)=>{
              this.reunionesJovenes=res.json().map((value)=>{
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

  borrarReunionJovenes(id: number) {
    this._http.delete(this._masterURL.url + "ReunionJovenes/" + id)
      .subscribe(
        (res) => {
          let ReunionBorrada = res.json();
          this.reunionesJovenes = this.reunionesJovenes.filter(value => ReunionBorrada.id != value.id);
        },
        (err) => {
          console.log(err);
        }
      )
  }

  editarReunionJovenes(reunionJovenes: any) {
    let parametros = {

      //Aqui puede venir mas
      tema_Reunion: reunionJovenes.tema_Reunion,

    };
    this._http.put(this._masterURL.url + "ReunionJovenes/" + reunionJovenes.id, parametros)
      .subscribe(
        (res: Response) => {
          reunionJovenes.formularioCerrado = !reunionJovenes.formularioCerrado;

        },
        (err) => {
          console.log("Error:", err);
        }
      )
  }

}
