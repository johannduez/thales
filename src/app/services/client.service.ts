import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../classes/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  findbyIdAndPassword(client: Client){

    this.http.get<Client>("http://localhost:8080/commerce/client/"+ client.id + "/" + client.password).subscribe(
      response => {
        console.log(response);
        sessionStorage.setItem("client",JSON.stringify(response));
      },
      err => {
          console.log("***** Erreur *****");
      }
    );

  }

  findbyIdAndPassword2(client: Client){
    
    return this.http.get<Client>("http://localhost:8080/commerce/client/"+ client.id + "/" + client.password);

  }
}
