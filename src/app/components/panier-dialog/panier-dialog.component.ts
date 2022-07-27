import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Commande } from 'src/app/classes/commande';
import { LigneCommande } from 'src/app/classes/ligne-commande';
import { CommandeService } from 'src/app/services/commande.service';

@Component({
  selector: 'app-panier-dialog',
  templateUrl: './panier-dialog.component.html',
  styleUrls: ['./panier-dialog.component.css']
})
export class PanierDialogComponent implements OnInit {
  commande:Commande;
  constructor(public dialogRef: MatDialogRef<PanierDialogComponent>,private commerceSrv : CommandeService) { }

  ngOnInit(): void {
    this.commande=JSON.parse(sessionStorage.getItem("commande"));
  }
  onCommand(): void {
    this.commerceSrv.sauvegarde(this.commande);
    this.dialogRef.close("ok");
  }
  ajouter(ligne:LigneCommande){
    this.commerceSrv.ajouter(this.commande,ligne);
  }
  enlever(ligne:LigneCommande){
    this.commerceSrv.enlever(this.commande,ligne);
  }
  supprimer(ligne:LigneCommande){
    this.commerceSrv.supprimer(this.commande,ligne);
  }
}
export class PanierDialogModel {
  constructor() {
  }
}
