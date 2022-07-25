import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LigneCommande } from '../classes/ligne-commande';

@Injectable({
  providedIn: 'root'
})
export class LignecommandeService {
 private apiServer = "http://localhost:8080/commerce/lignecommande";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  create(product): Observable<LigneCommande> {
    const getCircularReplacer = () => {
      const seen = new WeakSet();
      return (key, value) => {
        if (typeof value === "object" && value !== null) {
          if (seen.has(value)) {
            return;
          }
          seen.add(value);
        }
        return value;
      };
    };
    return this.httpClient.post<LigneCommande>(this.apiServer , JSON.stringify(product, getCircularReplacer()), this.httpOptions);
    
  }
   getById(id): Observable<LigneCommande> {
    return this.httpClient.get<LigneCommande>(this.apiServer + '/' + id);
    
  }
}
