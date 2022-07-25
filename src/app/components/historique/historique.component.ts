import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientService } from 'src/app/services/client.service';
import { Commande } from 'src/app/classes/commande';
import { LigneCommande } from 'src/app/classes/ligne-commande';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {

  listCommande: Array<Commande> = new Array<Commande>();

  constructor(private http: HttpClient, private service: ClientService) { }

  ngOnInit(): void {
    let id = JSON.parse(sessionStorage.getItem("commande")).client.id;

    this.service.findCommandeByClient(id).subscribe(
      response => {
       this.listCommande = response;
       this.listCommande.sort( (objA, objB) => objB.date.getTime() - objA.date.getTime(), );
       console.log(this.listCommande);
   
      },
      err => {
       console.log("***** Erreur *****");
      }); 
  }

}
