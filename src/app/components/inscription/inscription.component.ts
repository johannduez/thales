import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/classes/client';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  registerForm: FormGroup;
  client: Client = new Client();
  erreurFlag: boolean = false;
  erreurIdFlag: boolean = false;
  erreurPasswordCFlag: boolean = false;
  passwordConfirmation: string;

  constructor(private router: Router, private service: ClientService) { }

  ngOnInit(): void {
    this.client.id=0;
    this.registerForm = new FormGroup({
      id: new FormControl(this.client.id, [Validators.required]),
      password: new FormControl(this.client.password, [Validators.required]),
      passwordConfirmation: new FormControl(this.passwordConfirmation, [Validators.required]),
      nom: new FormControl(this.client.nom, [Validators.required]),
      prenom: new FormControl(this.client.prenom, [Validators.required]),
      adresse: new FormControl(this.client.adresse, [Validators.required]),
    });
  
  }

  get id() { return this.registerForm.get('id'); }
  get password() { return this.registerForm.get('password'); }
  get passwordC() { return this.registerForm.get('passwordConfirmation'); }
  get nom() { return this.registerForm.get('nom'); }
  get prenom() { return this.registerForm.get('prenom'); }
  get adresse() { return this.registerForm.get('adresse'); }

  onSubmit(){
    if(this.client.password != this.passwordConfirmation)
      this.erreurPasswordCFlag = true;
    else 
      this.erreurPasswordCFlag = false;
    

    if(this.client.id>0)
      this.erreurIdFlag = false;
    else 
      this.erreurIdFlag = true;

    this.service.findbyId(this.client.id).subscribe(
      response => {
        this.erreurFlag = true;
      },
      err => {
        this.erreurFlag = false;
        if(!this.erreurFlag && !this.erreurIdFlag && !this.erreurPasswordCFlag){
          this.service.create(this.client).subscribe(
            response => {
              this.router.navigate(['/authentification']);
            },
            err => {
              this.erreurFlag = true;
            }); 
        }

      });


    
  }

}
