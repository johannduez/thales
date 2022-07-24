import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Commande } from 'src/app/classes/commande';
import { CommandeService } from 'src/app/services/commande.service';
import { LignecommandeService } from 'src/app/services/lignecommande.service';

@Component({
  selector: 'app-recapitulatif',
  templateUrl: './recapitulatif.component.html',
  styleUrls: ['./recapitulatif.component.css']
})
export class RecapitulatifComponent implements OnInit {
  commande:Commande=new Commande();
  id:number;
  constructor(private router:Router,private commandeService:CommandeService,
    private lignecommandeService:LignecommandeService) { }

  ngOnInit(): void {
    this.commande=JSON.parse(sessionStorage.getItem("commande"));
  }
  
  valider(){

    this.commandeService.create(this.commande).subscribe((res:Commande)=>{
       for (let ligne of this.commande.lignes) {
            ligne.commande=res;
            this.lignecommandeService.create(ligne).subscribe();
        }
    });

    this.router.navigate(['/validercommande']);
  }
}
