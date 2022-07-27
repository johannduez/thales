import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../classes/article';
import { Commande } from '../classes/commande';
import { LigneCommande } from '../classes/ligne-commande';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
   private apiServer = "http://localhost:8080/commerce/commande";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  create(product): Observable<Commande> {
    const getCircularReplacer = () => {
      const seen = new WeakSet();
      return (key, value) => {
        if (typeof value === "object" && value !== null) {
          if (seen.has(value)) {
            return;
          }
          seen.add(value);
        }
        return value;
      };
    };
    return this.httpClient.post<Commande>(this.apiServer , JSON.stringify(product, getCircularReplacer()), this.httpOptions);
    
  }


  ajouterLigne(commande:Commande,art:Article,quantite:number):void{
        
        let trouv:Boolean=false;
        for (let ligne of commande.lignes) {
            if(ligne.article.id == art.id){
                trouv=true;
                ligne.prix+= quantite*art.tarif;
                ligne.quantite+=quantite;
            }
        }
        if(!trouv){
            let ligneCommande:LigneCommande=new LigneCommande();
            ligneCommande.article=art;
            ligneCommande.prix=quantite*art.tarif;
            ligneCommande.quantite=quantite;
            commande.lignes.push(ligneCommande);
           
        }
        commande.prixTotal+=quantite*art.tarif;
    }
  
    sauvegarde(commande:Commande){
      let str:string=JSON.stringify(commande);
      sessionStorage.setItem("commande",str);
    }
    ajouter(commande:Commande,ligne:LigneCommande){
      ligne.quantite+=1;
      ligne.prix+=ligne.article.tarif;
      commande.prixTotal+=ligne.article.tarif;
      this.sauvegarde(commande);
    }
    enlever(commande:Commande,ligne:LigneCommande){
    if(ligne.quantite>1){
      ligne.quantite-=1;
      ligne.prix-=ligne.article.tarif;
      commande.prixTotal-=ligne.article.tarif;
      this.sauvegarde(commande);
    }
    else{
      this.supprimer(commande,ligne);
    }
  }
    supprimer(commande:Commande,ligne:LigneCommande){
      const index: number = commande.lignes.indexOf(ligne);
      if (index !== -1) {
        commande.lignes.splice(index,1);
      }
      commande.prixTotal-=ligne.prix;
      this.sauvegarde(commande);
  }


}
