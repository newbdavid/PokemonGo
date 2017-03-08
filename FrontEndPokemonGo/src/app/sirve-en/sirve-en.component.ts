import {Component, OnInit, Input} from '@angular/core';
import {Http, Response} from "@angular/http";
import {MasterUrlService} from "../services/master-url.service";
import {NgForm} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-sirve-en',
  templateUrl: './sirve-en.component.html',
  styleUrls: ['./sirve-en.component.css']
})
export class SirveEnComponent implements OnInit {

  private _parametros: any;
  sirveEns=[];
  nuevoSirveEn={};

  constructor(private _ActivedRoute: ActivatedRoute, private _http:Http,private _masterURL:MasterUrlService) { }

  ngOnInit() {

    this.listarSirveEn();

  }



  crearSirveEn(formulario: NgForm) {


    this._http.post(this._masterURL.url + "sirveEn", {
      fechaInicio: formulario.value.fechaInicio,
      fechaFin:formulario.value.fechaFin,
      idMinisterio:this._parametros.idMinisterio,
      // idCreyente:this._parametros.idCreyente
    }).subscribe(
      (res:Response) => {

        this.sirveEns.push(res.json());
        this.sirveEns[this.sirveEns.length-1].formularioCerrado=true;
        this.nuevoSirveEn = {};

      },
      (err) => {
        console.log("Ocurrio un error", err);
      }
    );


  }

  listarSirveEn(){
    this._ActivedRoute.params.subscribe(
      parametros=>{
        this._parametros=parametros;
        this._http.get(this._masterURL.url+'sirveEn?idMinisterio='+this._parametros.idMinisterio)
          .subscribe(
            (res:Response)=>{
              this.sirveEns=res.json().map((value)=>{
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

  borrarSirveEn(id: number) {
    this._http.delete(this._masterURL.url + "sirveEn/" + id)
      .subscribe(
        (res) => {
          let sirveEnBorrado = res.json();
          this.sirveEns = this.sirveEns.filter(value => sirveEnBorrado.id != value.id);
        },
        (err) => {
          console.log(err);
        }
      )
  }

  editarSirveEn(sirveEn: any) {
    let parametros = {
      fechaInicio: sirveEn.fechaInicio,
      fechaFin:sirveEn.fechaFin,
      idMinisterio:this._parametros.idMinisterio
    };
    this._http.put(this._masterURL.url + "sirveEn/" + sirveEn.id, parametros)
      .subscribe(
        (res: Response) => {
          sirveEn.formularioCerrado = !sirveEn.formularioCerrado;

        },
        (err) => {
          console.log("Error:", err);
        }
      )
  }

}
