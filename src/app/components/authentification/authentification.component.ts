import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Commande } from 'src/app/classes/commande';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Client } from 'src/app/classes/client';
import { ClientService } from 'src/app/services/client.service';
import { CookieService } from 'ngx-cookie-service';
import { Cookieauthentification } from 'src/app/classes/cookieauthentification';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {
  registerForm: FormGroup;
  client: Client = new Client();
  erreurFlag: boolean = false;
  souvenir: boolean = false;

  constructor(private router:Router,private auth:AuthService, private formBuilder: FormBuilder, private service: ClientService, private cookie: CookieService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      id: new FormControl(this.client.id, [Validators.required]),
      password: new FormControl(this.client.password, [Validators.required])
  });

    if(this.cookie.get("user") != null){
      let cookieA: Cookieauthentification = JSON.parse(this.cookie.get("user"));
      this.client.id = cookieA.id;
      this.client.password = cookieA.password;
    }
    
  }

  get id() { return this.registerForm.get('id'); }
  get password() { return this.registerForm.get('password'); }

  onSubmit() {

    this.erreurFlag = false;
    this.service.findbyIdAndPassword(this.client).subscribe(
      response => {

        if(response != null){
          this.client = response;
          
          if(this.souvenir){
            let cookieAuth : Cookieauthentification = new Cookieauthentification();
            cookieAuth.id = this.client.id;
            cookieAuth.password = this.client.password;
      
            this.cookie.set('user',JSON.stringify(cookieAuth));
          }

          let commande: Commande = new Commande();
          commande.client = this.client;
          sessionStorage.setItem("commande", JSON.stringify(commande));
    
          this.auth.isLoggedIn=true;
          this.auth.nom=commande.client.nom;
          this.auth.prenom=commande.client.prenom;
          
          this.router.navigate(['/accueil']);
        } else {
          this.erreurFlag = true;
        } 

      },
      err => {
          console.log("***** Erreur *****");
      }
    );
  }

  cbox(){
    this.souvenir = !this.souvenir;
  }

}
