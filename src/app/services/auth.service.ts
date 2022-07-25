import { Injectable } from '@angular/core';
import { Commande } from '../classes/commande';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean;
  nom:string;
  prenom:string;
  isLoggedAdmin:boolean;


  constructor() { 
    if(sessionStorage.getItem("admin") != null){
      this.isLoggedAdmin=true;
     }else{
      this.isLoggedAdmin=false;
     }
    if(sessionStorage.getItem("commande") != null){
      this.isLoggedIn = true;
      this.nom = JSON.parse(sessionStorage.getItem("commande")).client.nom;
      this.prenom = JSON.parse(sessionStorage.getItem("commande")).client.prenom;
    } else {
      this.isLoggedIn = false;
    }
  }
}
