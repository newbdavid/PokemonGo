import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AudioPodcastComponent } from './audio-podcast/audio-podcast.component';
import { CelulaComponent } from './celula/celula.component';
import { CreyenteComponent } from './creyente/creyente.component';
import { FotoReunionComponent } from './foto-reunion/foto-reunion.component';
import { InicioComponent } from './inicio/inicio.component';
import { MinisterioComponent } from './ministerio/ministerio.component';
import { PredicaTextoComponent } from './predica-texto/predica-texto.component';
import { ReunionJovenesComponent } from './reunion-jovenes/reunion-jovenes.component';
import { SirveEnComponent } from './sirve-en/sirve-en.component';
import {routing} from "./app.routes";
import {MasterUrlService} from "./services/master-url.service";
import { PokemonComponent } from './pokemon/pokemon.component';
import { EntrenadorComponent } from './entrenador/entrenador.component';

@NgModule({
  declarations: [
    AppComponent,
    AudioPodcastComponent,
    CelulaComponent,
    CreyenteComponent,
    FotoReunionComponent,
    InicioComponent,
    MinisterioComponent,
    PredicaTextoComponent,
    ReunionJovenesComponent,
    SirveEnComponent,
    PokemonComponent,
    EntrenadorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
MasterUrlService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
