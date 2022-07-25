import { Component, OnInit } from '@angular/core';
import { Commande } from 'src/app/classes/commande';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  commande:Commande=new Commande();
  constructor() { }

  ngOnInit(): void {
    this.commande=JSON.parse(sessionStorage.getItem("commande"));
  }

}
