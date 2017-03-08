import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Http, Response} from "@angular/http";
import {MasterUrlService} from "../services/master-url.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-audio-podcast',
  templateUrl: './audio-podcast.component.html',
  styleUrls: ['./audio-podcast.component.css']
})
export class AudioPodcastComponent implements OnInit {

  private _parametros: any;
  audioPodcasts=[];
  nuevoAudioPodcast={};

  constructor(private _ActivedRoute: ActivatedRoute, private _http:Http,private _masterURL:MasterUrlService) { }

  ngOnInit() {

    this.listarAudioPodcast();

  }



  crearAudioPodcast(formulario: NgForm) {


    this._http.post(this._masterURL.url + "audioPodcast", {
      archivoMp3: formulario.value.archivoMp3,
      idReunionJovenes:this._parametros.idReunionJovenes
    }).subscribe(
      (res:Response) => {

        this.audioPodcasts.push(res.json());
        this.audioPodcasts[this.audioPodcasts.length-1].formularioCerrado=true;
        this.nuevoAudioPodcast = {};

      },
      (err) => {
        console.log("Ocurrio un error", err);
      }
    );


  }

  listarAudioPodcast(){
    this._ActivedRoute.params.subscribe(
      parametros=>{
        this._parametros=parametros;
        this._http.get(this._masterURL.url+'audioPodcast?idReunionJovenes='+this._parametros.idReunionJovenes)
          .subscribe(
            (res:Response)=>{
              this.audioPodcasts=res.json().map((value)=>{
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

  borrarAudioPodcast(id: number) {
    this._http.delete(this._masterURL.url + "audioPodcast/" + id)
      .subscribe(
        (res) => {
          let audioPodcastBorrado = res.json();
          this.audioPodcasts = this.audioPodcasts.filter(value => audioPodcastBorrado.id != value.id);
        },
        (err) => {
          console.log(err);
        }
      )
  }

  editarAudioPodcast(audioPodcast: any) {
    let parametros = {
      archivoMp3: audioPodcast.archivoMp3,
      idReunionJovenes:this._parametros.idReunionJovenes
    };
    this._http.put(this._masterURL.url + "audioPodcast/" + audioPodcast.id, parametros)
      .subscribe(
        (res: Response) => {
          audioPodcast.formularioCerrado = !audioPodcast.formularioCerrado;

        },
        (err) => {
          console.log("Error:", err);
        }
      )
  }

}
