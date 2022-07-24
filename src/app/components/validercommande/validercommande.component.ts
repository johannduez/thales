import { Component, OnDestroy, OnInit } from '@angular/core';
import { Client } from 'src/app/classes/client';
import { Commande } from 'src/app/classes/commande';

@Component({
  selector: 'app-validercommande',
  templateUrl: './validercommande.component.html',
  styleUrls: ['./validercommande.component.css']
})
export class ValidercommandeComponent implements OnInit, OnDestroy {
  commande:Commande=new Commande();
  constructor() { }

  ngOnInit(): void {
    this.commande=JSON.parse(sessionStorage.getItem("commande"));
  }
  ngOnDestroy() {
    let client:Client=this.commande.client;
    this.commande=new Commande();
    this.commande.client=client;
    let str:string=JSON.stringify(this.commande);
    sessionStorage.setItem("commande",str);
  }
}
