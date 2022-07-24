import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutarticleComponent } from './components/ajoutarticle/ajoutarticle.component';
import { AuthentificationComponent } from './components/authentification/authentification.component';
import { MagasinComponent } from './components/magasin/magasin.component';
import { RecapitulatifComponent } from './components/recapitulatif/recapitulatif.component';
import { ValidercommandeComponent } from './components/validercommande/validercommande.component';

const routes: Routes = [{path:'magasin',component:MagasinComponent},
{path:'authentification',component:AuthentificationComponent},
{path:'recapitulatif',component:RecapitulatifComponent},
{path:'validercommande',component:ValidercommandeComponent},
{path:'ajoutarticle',component:AjoutarticleComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }