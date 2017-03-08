import {Component, OnInit, Input} from '@angular/core';
import {Http, Response} from "@angular/http";
import {MasterUrlService} from "../services/master-url.service";
import {NgForm} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-predica-texto',
  templateUrl: './predica-texto.component.html',
  styleUrls: ['./predica-texto.component.css']
})
export class PredicaTextoComponent implements OnInit {

  private _parametros: any;
  predicaTextos=[];
  nuevoPredicaTexto={};

  constructor(private _ActivedRoute: ActivatedRoute, private _http:Http,private _masterURL:MasterUrlService) { }

  ngOnInit() {

    this.listarPredicaTexto();

  }



  crearPredicaTexto(formulario: NgForm) {


    this._http.post(this._masterURL.url + "predicaTexto", {
      archivoPdf: formulario.value.archivoPdf,
      idReunionJovenes:this._parametros.idReunionJovenes
    }).subscribe(
      (res:Response) => {

        this.predicaTextos.push(res.json());
        this.predicaTextos[this.predicaTextos.length-1].formularioCerrado=true;
        this.nuevoPredicaTexto = {};

      },
      (err) => {
        console.log("Ocurrio un error", err);
      }
    );


  }

  listarPredicaTexto(){
    this._ActivedRoute.params.subscribe(
      parametros=>{
        this._parametros=parametros;
        this._http.get(this._masterURL.url+'predicaTexto?idReunionJovenes='+this._parametros.idReunionJovenes)
          .subscribe(
            (res:Response)=>{
              this.predicaTextos=res.json().map((value)=>{
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

  borrarPredicaTexto(id: number) {
    this._http.delete(this._masterURL.url + "predicaTexto/" + id)
      .subscribe(
        (res) => {
          let predicaTextoBorrado = res.json();
          this.predicaTextos = this.predicaTextos.filter(value => predicaTextoBorrado.id != value.id);
        },
        (err) => {
          console.log(err);
        }
      )
  }

  editarPredicaTexto(predicaTexto: any) {
    let parametros = {
      archivoPdf: predicaTexto.archivoPdf,
      idReunionJovenes:this._parametros.idReunionJovenes
    };
    this._http.put(this._masterURL.url + "predicaTexto/" + predicaTexto.id, parametros)
      .subscribe(
        (res: Response) => {
          predicaTexto.formularioCerrado = !predicaTexto.formularioCerrado;

        },
        (err) => {
          console.log("Error:", err);
        }
      )
  }

}
