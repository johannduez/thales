import { Article } from "./article";
import { Commande } from "./commande";

export class LigneCommande {
 
	id:number=0;
	quantite:number=0;
	prix:number=0;
	commande:Commande=new Commande();
	article:Article=new Article();
	version:number=0;
}
