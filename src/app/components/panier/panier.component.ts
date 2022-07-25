import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Article } from 'src/app/classes/article';
import { Commande } from 'src/app/classes/commande';
import { LigneCommande } from 'src/app/classes/ligne-commande';
import { ArticleService } from 'src/app/services/article.service';
import { CommandeService } from 'src/app/services/commande.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  commande:Commande=new Commande();
  registerForm: FormGroup;
  submitted = false;
  articles:Article[]=[];
  idarticle:number;
  quantite:number;

  constructor(private formBuilder: FormBuilder,private router:Router,
    private artSrv : ArticleService,private commerceSrv : CommandeService) { 
    this.registerForm = new FormGroup({
        quantite: new FormControl(this.quantite, [Validators.required]),
        idarticle: new FormControl(this.idarticle, [Validators.required])
    });

  }

  ngOnInit(): void {
    this.commande=JSON.parse(sessionStorage.getItem("commande"));
    this.artSrv.findbyorderbytarifasc().subscribe((data: Article[])=>{
      this.articles = data;
    });
  }
  get quantiteForm() { return this.registerForm.get('quantite'); }
  get idArticleForm() { return this.registerForm.get('idarticle'); }
  recapitulatif(){
       this.router.navigate(['/recapitulatif']);
  }
  onSubmit(){
    if (this.registerForm.invalid) {
        return;
    }
    let articleSelect=new Article();
    for (const art of this.articles) {
      if(art.id ==this.idarticle) articleSelect =art;
    }
    this.commerceSrv.ajouterLigne(this.commande,articleSelect,this.quantite);
    this.commerceSrv.sauvegarde(this.commande);
    this.idarticle=undefined;
    this.quantite=undefined;

  }
  viderpanier(){
    this.commande.lignes=new Array<LigneCommande>();
    this.commande.prixTotal=0;

     this.commerceSrv.sauvegarde(this.commande);
  }
  supprimer(ligne:LigneCommande){
      const index: number = this.commande.lignes.indexOf(ligne);
      if (index !== -1) {
        this.commande.lignes.splice(index,1);
      }
      this.commerceSrv.sauvegarde(this.commande);
  }

}
