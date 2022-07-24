import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Article } from 'src/app/classes/article';
import { Commande } from 'src/app/classes/commande';
import { LigneCommande } from 'src/app/classes/ligne-commande';
import { ArticleService } from 'src/app/services/article.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-magasin',
  templateUrl: './magasin.component.html',
  styleUrls: ['./magasin.component.css']
})
export class MagasinComponent implements OnInit {
  articles:Array<Article> = new Array<Article>();
  articlesBase:Array<Article> = new Array<Article>();
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
  constructor(private srv : ArticleService,private http:HttpClient,
    private dialog: MatDialog) { 
/* this.http.get("http://localhost:8080/commerce/article/findall").subscribe(
      reponse=>{this.Mylist=reponse;},
      err=>{console.log("***********Ko");}
    );*/
   


  }

  ngOnInit(): void {
 /*this.http.get<Article[]>("http://localhost:8080/commerce/article/findall").subscribe(
      reponse=>{
        console.log(reponse);
        reponse.forEach(entry=> {
          //console.log(entry);
          let article:Article=new Article();
          article.categorie=entry.categorie;
          article.description=entry.description;
          article.id=entry.id;
          article.image=entry.image;
          article.nom=entry.nom;
          article.tarif=entry.tarif;
          //console.log(article);
          this.articlesBase.push(article);
          this.articlesBase2.push(article);
        })
      
      },
      err=>{console.log("***********Ko");}
    );*/
    this.srv.findbyorderbytarifasc().subscribe((data: Article[])=>{
      this.articlesBase2 = data;
    });
    this.commande=JSON.parse(sessionStorage.getItem("commande"));

 
/*console.log(this.articlesBase);
console.log(this.articlesBase2);
console.log(this.articlesBase.length);
this.articlesBase2.forEach(entry=> {console.log(entry);});
for (const article of this.articlesBase) {
  console.log(article.nom);
}
for (let index = 0; index < this.articlesBase2.length; index++) {
  const element = this.articlesBase[index];
  console.log(element.nom);
}
    this.filtre();*/
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
  /*filtre(){
    this.articles= new Array<Article>();
    
    for (const article of this.articlesBase) {
     if(this.filtrePrix(article) && this.filtreNom(article)
      && this.filtreCombo(article)){
        this.articles.push(article);
      
      }
    }
    this.articles.sort((a,b)=> a.tarif-b.tarif);

  }*/
  filtre(){
    let fordi:string="0";
    if(this.cOrdi==1)fordi="1";
    let ftel:string="0";
    if(this.cTel==1)ftel="1";
    let felec:string="0";
    if(this.cElec==1)felec="1";
    this.srv.findfiltretotal(ftel,fordi,felec,this.fPMax,this.fPMin,this.fNom).subscribe((data: Article[])=>{
      this.articlesBase2 = data;
    });
  }

  ajouter(art:Article){
  
    let quantite:number=1;
    let trouv:Boolean=false;
    for (let ligne of this.commande.lignes) {
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
            this.commande.lignes.push(ligneCommande);
    }
    this.commande.prixTotal+=quantite*art.tarif;
        
    let str:string=JSON.stringify(this.commande);
    sessionStorage.setItem("commande",str);


    const dialogConfig = new MatDialogConfig();
    this.dialog.open(DialogComponent, dialogConfig);
 
  /*  dialogRef.afterClosed().subscribe(result => {
      //NOTE: The result can also be nothing if the user presses the `esc` key or clicks outside the dialog
      if (result == 'confirm') {
        console.log('Unregistered');
      }
    })*/


   /* this.commande.ajouterLigne(art,quantite);*/
     
  }
}
