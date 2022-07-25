import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Client } from '../classes/client';
import { Commande } from '../classes/commande';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }


  findbyIdAndPassword(client: Client){
    
    return this.http.get<Client>("http://localhost:8080/commerce/client/"+ client.id + "/" + client.password);

  }

  create(client: Client){
    const body = JSON.stringify(client);
    return this.http.post("http://localhost:8080/commerce/client", body,{
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    })

  }

  findbyId(id: number){
    return this.http.get<Client>("http://localhost:8080/commerce/client/" + id);

  }

  findCommandeByClient(id: number){
    return this.http.get<Array<Commande>>("http://localhost:8080/commerce/commande/findbyclient/" + id);
  }

}
