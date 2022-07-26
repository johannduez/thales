import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Client } from 'src/app/classes/client';
import { Commande } from 'src/app/classes/commande';
import { ClientService } from 'src/app/services/client.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  client:Client=new Client();
  commande:Commande=new Commande();
  registerForm: FormGroup;
  message:boolean=false;
  passwordConfirmation: string;
  erreurPasswordCFlag: boolean = false;
  constructor(private formBuilder: FormBuilder, private service: ClientService, private auth: AuthService, private router: Router) { }

  

  ngOnInit(): void {
    console.log("ClientComponent");
    this.commande=JSON.parse(sessionStorage.getItem("commande"));
    this.service.findbyId(this.commande.client.id).subscribe(
    response => {this.client=response});

    this.registerForm = new FormGroup({
      nom: new FormControl(this.client.nom, [Validators.required]),
      prenom: new FormControl(this.client.prenom, [Validators.required]),
      adresse: new FormControl(this.client.adresse, [Validators.required]),
      password: new FormControl(this.client.password, [Validators.required]),
      passwordConfirmation: new FormControl(this.passwordConfirmation, [Validators.required])
  });
  }

  get nom() { return this.registerForm.get('nom'); }
  get prenom() { return this.registerForm.get('prenom'); }
  get adresse() { return this.registerForm.get('adresse'); }
  get password() { return this.registerForm.get('password'); }
  get passwordC() { return this.registerForm.get('passwordConfirmation'); }

  onSubmit(){

    if(this.client.password != this.passwordConfirmation)
      this.erreurPasswordCFlag = true;
    else 
      this.erreurPasswordCFlag = false;

     if (this.registerForm.invalid || this.erreurPasswordCFlag == true) {
            return;
        }
    
        this.service.update(this.client).subscribe(
              response => {
                this.client=response;
                this.commande.client = this.client;
                sessionStorage.setItem("commande",JSON.stringify(this.commande));
                this.auth.setUser();
                this.router.navigate(['/profil']);
              });
             
  }
}
