import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../classes/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }
   findbyLoginAndPassword(admin: Admin){
    
    return this.http.get<Admin>("http://localhost:8080/commerce/administration/"+ admin.login + "/" + admin.password);

  }
}
