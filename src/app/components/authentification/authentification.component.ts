import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Commande } from 'src/app/classes/commande';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
f(){
  let commande:Commande=new Commande();
  commande.client.id=1;
  commande.client.adresse="greasque";
   commande.client.nom="duez";
  commande.client.password="1";
  commande.client.prenom="johann";
   commande.prixTotal=0;
   let str:string=JSON.stringify(commande);
  sessionStorage.setItem("commande",str);
  console.log(commande);
  window.location.reload();
 
}
}
