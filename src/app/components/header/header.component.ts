import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Commande } from 'src/app/classes/commande';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  commande:Commande=new Commande();
  langue:string="";
  constructor(public translate: TranslateService,private auth:AuthService) {
    this.translate.addLangs(['fr','en']);
    this.translate.setDefaultLang('fr');
   }

  ngOnInit(): void {
      this.commande=JSON.parse(sessionStorage.getItem("commande"));
     try {
        this.langue=JSON.parse(sessionStorage.getItem("langue"));
     } catch (e) {
        this.langue="fr";
     }
     
  }
  switchLang(lang: string) {
    this.translate.use(lang);
    sessionStorage.setItem("langue",lang);
  }
  get authentification():boolean {
    return this.auth.isLoggedIn;
  }
  nom():string{
    return this.auth.nom;
  }
  prenom():string{
    return this.auth.prenom;
  }

}
