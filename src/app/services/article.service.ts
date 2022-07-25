import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Article } from '../classes/article';
import {  throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiServer = "http://localhost:8080/commerce/article";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
    
 
  constructor(private httpClient: HttpClient) { }
 
 create(data)
  {
   const body = JSON.stringify(data);

    this.httpClient.post(this.apiServer, body, this.httpOptions).
      subscribe(response => {
        console.log("crud service post OK");
      },
      err => {
        console.log("crud service post KO")
      });
  }
  
  getAll(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(this.apiServer);
  }
  findbyorderbytarifasc(): Observable<Article[]>{
    return this.httpClient.get<Article[]>(this.apiServer + '/findbyorderbytarifasc');

  }
  findfiltretotal(tel:string, ordi:string, elec:string, 
    prixMax:number, prixMin:number, leNom:string): Observable<Article[]> {
    return this.httpClient.get<Article[]>
    (this.apiServer + '/findfiltretotal/'+tel+'/'+ordi+'/'+elec+'/'+prixMax+'/'+prixMin+'/'+leNom);
  }
  getById(id): Observable<Article> {
    return this.httpClient.get<Article>(this.apiServer + '/' + id);
    
  }
  update( article): Observable<Article> {
   return this.httpClient.put<Article>(this.apiServer , JSON.stringify(article), this.httpOptions);
    
  }
    delete(id){
    return this.httpClient.delete<Article>(this.apiServer + '/' + id, this.httpOptions);
  }




}
