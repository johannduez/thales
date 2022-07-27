import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Article } from 'src/app/classes/article';
import { Commande } from 'src/app/classes/commande';
import { LigneCommande } from 'src/app/classes/ligne-commande';
import { ArticleService } from 'src/app/services/article.service';
import { CommandeService } from 'src/app/services/commande.service';
import { DialogComponent } from '../dialog/dialog.component';
import { PanierDialogComponent, PanierDialogModel } from '../panier-dialog/panier-dialog.component';

@Component({
  selector: 'app-magasin',
  templateUrl: './magasin.component.html',
  styleUrls: ['./magasin.component.css']
})
export class MagasinComponent implements OnInit {
  articles:Array<Article> = new Array<Article>();
  articlesBase2:Article[]=[];
  hideme=[];
  pages: number = 1;
  cOrdi:number=1;
  cTel:number=1;
  cElec:number=1;
  fNom:string="";
  fPMin:number=0;
  fPMax:number=10000;
  commande:Commande=new Commande();
  constructor(private router:Router,private srv : ArticleService,
    private dialog: MatDialog,private commerceSrv : CommandeService,
    private domSanitizer: DomSanitizer) { 
  }

  ngOnInit(): void {
    this.srv.findbyorderbytarifasc().subscribe((data: Article[])=>{
      this.articlesBase2 = data;
      for(let art of this.articlesBase2){
         art.retrievedImage = this.domSanitizer.bypassSecurityTrustUrl('data:image/jepg;base64,' + art.picByte);
      }
     // sessionStorage.setItem("test",JSON.stringify(data));
    });
    //this.articlesBase2=JSON.parse( sessionStorage.getItem("test"));
    for(let art of this.articlesBase2){
         art.retrievedImage = this.domSanitizer.bypassSecurityTrustUrl('data:image/jepg;base64,' + art.picByte);
        this.articles.push(art);
    }
    this.commande=JSON.parse(sessionStorage.getItem("commande"));
  }
  filtrePrix(article:Article){
    if(this.fPMin!=0 && this.fPMin!=undefined){
      if(this.fPMin>article.tarif)return false;
    }
    if(this.fPMax!=0 && this.fPMax!=undefined){
      if(this.fPMax<article.tarif)return false;
    }
    return true;
  }
  filtreNom(article:Article){
 
    if(this.fNom!="" && this.fNom!=undefined){
      let nomArticle:string=String.prototype.toUpperCase.call(article.nom);
      let fNomUpper:string=String.prototype.toUpperCase.call(this.fNom);
      if(nomArticle.includes(fNomUpper)) return true;
      else return false;

    }
    return true;
  }
  filtreCombo(article:Article){
    if(this.cOrdi==1 && article.categorie=="Ordinateur") return true;
    if(this.cTel==1 && article.categorie=="Téléphone") return true;
    if(this.cElec==1 && article.categorie=="Electroménager") return true;
    return false;
  }

  filtre(){
    let fordi:string="0";
    if(this.cOrdi==1)fordi="1";
    let ftel:string="0";
    if(this.cTel==1)ftel="1";
    let felec:string="0";
    if(this.cElec==1)felec="1";
    this.srv.findfiltretotal(ftel,fordi,felec,this.fPMax,this.fPMin,this.fNom).subscribe((data: Article[])=>{
      this.articlesBase2 = data;
      for(let art of this.articlesBase2){
         art.retrievedImage = this.domSanitizer.bypassSecurityTrustUrl('data:image/jepg;base64,' + art.picByte);
      }
    });/*
    this.articles = new Array<Article>();
    for(let art of this.articlesBase2){
      if(this.filtreCombo(art) && this.filtreNom(art) && this.filtrePrix(art)){
        this.articles.push(art);
      }
    }*/


  }

  ajouter(art:Article){
    let quantite:number=1;
    this.commerceSrv.ajouterLigne(this.commande,art,quantite);
    this.commerceSrv.sauvegarde(this.commande);


    const dialogConfig = new MatDialogConfig();
    this.dialog.open(DialogComponent, dialogConfig);
 
     
  }
  panier(){
 // this.router.navigate(['/panier']);
    const dialogData = new PanierDialogModel();
    const dialogRef = this.dialog.open(PanierDialogComponent, {
      maxWidth: "600px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.commande=JSON.parse(sessionStorage.getItem("commande"));
    });
  }
}
