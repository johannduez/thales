import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Commande } from 'src/app/classes/commande';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Client } from 'src/app/classes/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {
  registerForm: FormGroup;
  client: Client = new Client();
  clientTest: Client = new Client();
  erreurFlag: boolean = false;

  constructor(private router:Router,private auth:AuthService, private formBuilder: FormBuilder, private service: ClientService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      id: new FormControl(this.client.id, [Validators.required]),
      password: new FormControl(this.client.password, [Validators.required])
  });

  }

  get id() { return this.registerForm.get('id'); }
  get password() { return this.registerForm.get('password'); }

  onSubmit() {

    this.service.findbyIdAndPassword(this.client).subscribe(
      response => {
        console.log(response);

        if(response != null){
          this.client = response;
    
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

}
