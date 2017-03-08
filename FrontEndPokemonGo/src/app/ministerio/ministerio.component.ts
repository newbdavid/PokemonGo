import {Component, OnInit, Input} from '@angular/core';
import {Http, Response} from "@angular/http";
import {MasterUrlService} from "../services/master-url.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-ministerio',
  templateUrl: './ministerio.component.html',
  styleUrls: ['./ministerio.component.css']
})
export class MinisterioComponent implements OnInit {
  ministerios=[];
  nuevoMinisterio={};


  constructor(private _http:Http,private _masterURL:MasterUrlService) { }

  ngOnInit() {

    this.listarMinisterio();

  }



  crearMinisterio(formulario: NgForm) {


    this._http.post(this._masterURL.url + "ministerio", {
      nombreMinisterio: formulario.value.nombreMinisterio,

    }).subscribe(
      (res) => {

        this.ministerios.push(res.json());
        this.ministerios[this.ministerios.length-1].formularioCerrado=true;
        this.nuevoMinisterio = {};

      },
      (err) => {
        console.log("Ocurrio un error", err);
      }
    );


  }

  listarMinisterio(){
    this._http.get(this._masterURL.url+"ministerio")
      .subscribe(
        (res:Response)=>{
          this.ministerios=res.json().map((value)=>{
            value.formularioCerrado=true;
            return value;
          });

        },
        (err) => {
          console.log("Ocurrio un error", err);
        }
      );

  }

  borrarMinisterio(id: number) {
    this._http.delete(this._masterURL.url + "ministerio/" + id)
      .subscribe(
        (res) => {
          let ministerioBorrado = res.json();
          this.ministerios = this.ministerios.filter(value => ministerioBorrado.id != value.id);
        },
        (err) => {
          console.log(err);
        }
      )
  }

  editarMinisterio(ministerio: any) {
    let parametros = {
      nombreMinisterio: ministerio.nombreMinisterio,

    };
    this._http.put(this._masterURL.url + "ministerio/" + ministerio.id, parametros)
      .subscribe(
        (res: Response) => {
          ministerio.formularioCerrado = !ministerio.formularioCerrado;

        },
        (err) => {
          console.log("Error:", err);
        }
      )
  }

}
