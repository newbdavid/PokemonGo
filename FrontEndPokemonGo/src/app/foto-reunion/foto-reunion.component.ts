import { Component, OnInit } from '@angular/core';
import {Http, Response} from "@angular/http";
import {MasterUrlService} from "../services/master-url.service";
import {NgForm} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-foto-reunion',
  templateUrl: './foto-reunion.component.html',
  styleUrls: ['./foto-reunion.component.css']
})
export class FotoReunionComponent implements OnInit {

  private _parametros: any;
  fotosReunion=[];
  nuevaFotoReunion={};

  constructor(private _ActivedRoute: ActivatedRoute, private _http:Http,private _masterURL:MasterUrlService) { }

  ngOnInit() {

    this.listarFotoReunion();

  }



  crearFotoReunion(formulario: NgForm) {


    this._http.post(this._masterURL.url + "FotoReunion", {
      archivo_Foto: formulario.value.archivo_Foto,
      idReunionJovenes:this._parametros.idReunionJovenes
    }).subscribe(
      (res:Response) => {

        this.fotosReunion.push(res.json());
        this.fotosReunion[this.fotosReunion.length-1].formularioCerrado=true;
        this.nuevaFotoReunion = {};

      },
      (err) => {
        console.log("Ocurrio un error", err);
      }
    );


  }

  listarFotoReunion(){
    this._ActivedRoute.params.subscribe(
      parametros=>{
        this._parametros=parametros;
        this._http.get(this._masterURL.url+'FotoReunion?idReunionJovenes='+this._parametros.idReunionJovenes)
          .subscribe(
            (res:Response)=>{
              this.fotosReunion=res.json().map((value)=>{
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

  borrarFotoReunion(id: number) {
    this._http.delete(this._masterURL.url + "FotoReunion/" + id)
      .subscribe(
        (res) => {
          let predicaFotoReunionBorrada = res.json();
          this.fotosReunion = this.fotosReunion.filter(value => predicaFotoReunionBorrada.id != value.id);
        },
        (err) => {
          console.log(err);
        }
      )
  }

  editarFotoReunion(fotoReunion: any) {
    let parametros = {
      archivo_Foto: fotoReunion.archivo_Foto,
      idReunionJovenes:this._parametros.idReunionJovenes
    };
    this._http.put(this._masterURL.url + "FotoReunion/" + fotoReunion.id, parametros)
      .subscribe(
        (res: Response) => {
          fotoReunion.formularioCerrado = !fotoReunion.formularioCerrado;

        },
        (err) => {
          console.log("Error:", err);
        }
      )
  }

}
