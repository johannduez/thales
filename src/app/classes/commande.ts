import { Injectable } from "@angular/core";
import { Article } from "./article";
import { Client } from "./client";
import { LigneCommande } from "./ligne-commande";

export class Commande {
    id:number=0;
	client:Client=new Client();
	date: Date = new Date();;
	prixTotal:number=0;
	lignes = new Array<LigneCommande>();
    version:number=0;


   /* ajouterLigne(art:Article,quantite:number):void{
        
        let trouv:Boolean=false;
        for (let ligne of this.lignes) {
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
            this.lignes.push(ligneCommande);
            this.prixTotal=this.prixTotal
        }
        this.prixTotal+=quantite*art.tarif;
    }*/
}
