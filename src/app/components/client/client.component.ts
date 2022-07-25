import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Client } from 'src/app/classes/client';
import { Commande } from 'src/app/classes/commande';
import { ClientService } from 'src/app/services/client.service';

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
  constructor(private formBuilder: FormBuilder, private service: ClientService) { }

  ngOnInit(): void {
    console.log("ClientComponent");
    this.commande=JSON.parse(sessionStorage.getItem("commande"));
    this.service.findbyId(this.commande.client.id).subscribe(
    response => {this.client=response});

    this.registerForm = new FormGroup({
      nom: new FormControl(this.client.nom, [Validators.required]),
      prenom: new FormControl(this.client.prenom, [Validators.required]),
      adresse: new FormControl(this.client.adresse, [Validators.required]),
      password: new FormControl(this.client.password, [Validators.required])
  });
  }

  get nom() { return this.registerForm.get('nom'); }
  get prenom() { return this.registerForm.get('prenom'); }
  get adresse() { return this.registerForm.get('adresse'); }
  get password() { return this.registerForm.get('password'); }
  onSubmit(){
    this.message=false;
     if (this.registerForm.invalid) {
            return;
        }
    
        this.service.update(this.client).subscribe(
              response => {
                this.client=response;
                this.message=true;});
             
  }
}
