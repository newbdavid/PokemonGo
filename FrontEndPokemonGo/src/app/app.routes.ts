import {Routes, RouterModule} from "@angular/router";
import {InicioComponent} from "./inicio/inicio.component";
import {MinisterioComponent} from "./ministerio/ministerio.component";
import {CreyenteComponent} from "./creyente/creyente.component";
import {ReunionJovenesComponent} from "./reunion-jovenes/reunion-jovenes.component";
import {FotoReunionComponent} from "./foto-reunion/foto-reunion.component";
import {AudioPodcastComponent} from "./audio-podcast/audio-podcast.component";
import {PredicaTextoComponent} from "./predica-texto/predica-texto.component";
import {CelulaComponent} from "./celula/celula.component";
import {SirveEnComponent} from "./sirve-en/sirve-en.component";
import {ModuleWithProviders} from "@angular/core";

export const routes:Routes=[
  {path: 'inicio', component:InicioComponent},
  {path: 'ministerio', component: MinisterioComponent},
  {path: 'creyente', component: CreyenteComponent},
  {path: 'reunionJovenes', component: ReunionJovenesComponent},
  {path: 'reunionJovenes/:idReunionJovenes/fotoReunion', component: FotoReunionComponent},
  {path: 'reunionJovenes/:idReunionJovenes/audioPodcast', component: AudioPodcastComponent},
  {path: 'reunionJovenes/:idReunionJovenes/predicaTexto', component: PredicaTextoComponent},
  {path: 'creyente/:idCreyente/celula', component: CelulaComponent},
  {path: 'creyente/:idCreyente/sirveEn', component: SirveEnComponent},
  {path: '', redirectTo: 'inicio', pathMatch: 'full'}
];

export const routing:ModuleWithProviders=RouterModule.forRoot(routes);
