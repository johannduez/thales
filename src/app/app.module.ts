import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MagasinComponent } from './components/magasin/magasin.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthentificationComponent } from './components/authentification/authentification.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecapitulatifComponent } from './components/recapitulatif/recapitulatif.component';
import { ValidercommandeComponent } from './components/validercommande/validercommande.component';
import { AjoutarticleComponent } from './components/ajoutarticle/ajoutarticle.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AccueilComponent } from './components/accueil/accueil.component';
import { DeconnexionComponent } from './components/deconnexion/deconnexion.component';
import { PanierComponent } from './components/panier/panier.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { ArticleComponent } from './components/article/article.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { HistoriqueComponent } from './components/historique/historique.component';
import { AdminComponent } from './components/admin/admin.component';
import { ProfilComponent } from './components/profil/profil.component';
import { ClientComponent } from './components/client/client.component';
import { CookieService } from 'ngx-cookie-service';



export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    MagasinComponent,
    AuthentificationComponent,
    DialogComponent,
    RecapitulatifComponent,
    ValidercommandeComponent,
    AjoutarticleComponent,
    AccueilComponent,
    DeconnexionComponent,
    PanierComponent,
    ArticlesComponent,
    ArticleComponent,
    InscriptionComponent,
    HistoriqueComponent,
    AdminComponent,
    ProfilComponent,
    ClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatDialogModule,
    BrowserAnimationsModule,
     TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
    
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
