import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Client } from '../classes/client';
<<<<<<< HEAD
import { Commande } from '../classes/commande';
=======
import { Observable } from 'rxjs';
>>>>>>> a166860654843c604ecc5d74e9831d36c26e2e10

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

 private apiServer = "http://localhost:8080/commerce/client";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  findbyIdAndPassword(client: Client){
    
    return this.http.get<Client>(this.apiServer+"/"+ client.id + "/" + client.password);

  }

  create(client: Client){
    const body = JSON.stringify(client);
    return this.http.post(this.apiServer, body,this.httpOptions)

  }

  findbyId(id: number){
    return this.http.get<Client>("http://localhost:8080/commerce/client/" + id);

  }

  findCommandeByClient(id: number){
    return this.http.get<Array<Commande>>("http://localhost:8080/commerce/commande/findbyclient/" + id);
    return this.http.get<Client>(this.apiServer+"/" + id);
    
  }
  update( client): Observable<Client> {
   return this.http.put<Client>(this.apiServer , JSON.stringify(client), this.httpOptions);
    
  }

}
