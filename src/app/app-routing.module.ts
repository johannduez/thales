import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './components/accueil/accueil.component';
import { AjoutarticleComponent } from './components/ajoutarticle/ajoutarticle.component';
import { ArticleComponent } from './components/article/article.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { AuthentificationComponent } from './components/authentification/authentification.component';
import { DeconnexionComponent } from './components/deconnexion/deconnexion.component';
import { MagasinComponent } from './components/magasin/magasin.component';
import { PanierComponent } from './components/panier/panier.component';
import { RecapitulatifComponent } from './components/recapitulatif/recapitulatif.component';
import { ValidercommandeComponent } from './components/validercommande/validercommande.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { HistoriqueComponent } from './components/historique/historique.component';
import { AdminComponent } from './components/admin/admin.component';
import { ProfilComponent } from './components/profil/profil.component';
import { ClientComponent } from './components/client/client.component';
import { ImageComponent } from './components/image/image.component';

const routes: Routes = [{path:'magasin',component:MagasinComponent},
{path:'authentification',component:AuthentificationComponent},
{path:'recapitulatif',component:RecapitulatifComponent},
{path:'validercommande',component:ValidercommandeComponent},
{path:'ajoutarticle',component:AjoutarticleComponent},
{path:'accueil',component:AccueilComponent},
{path:'deconnexion',component:DeconnexionComponent},
{path:'panier',component:PanierComponent},
{path:'articles',component:ArticlesComponent},
{path:'article/:id',component:ArticleComponent},
{path:'inscription',component:InscriptionComponent},
{path:'historique',component:HistoriqueComponent},
{path:'admin',component:AdminComponent},
{path:'profil',component:ProfilComponent},
{path:'client',component:ClientComponent},
{path:'image',component:ImageComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
