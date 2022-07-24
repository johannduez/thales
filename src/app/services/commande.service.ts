import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commande } from '../classes/commande';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
   private apiServer = "http://localhost:8080/commerce/commande";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  create(product): Observable<Commande> {
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
    return this.httpClient.post<Commande>(this.apiServer , JSON.stringify(product, getCircularReplacer()), this.httpOptions);
    
  } 
}
