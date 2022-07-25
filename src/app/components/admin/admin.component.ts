import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from 'src/app/classes/admin';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  registerForm: FormGroup;
  admin: Admin = new Admin();
  erreurFlag: boolean = false;
  erreurActif: boolean = false;

  constructor(private router:Router,private auth:AuthService, private formBuilder: FormBuilder, private service: AdminService) { }

  ngOnInit(): void {
     this.registerForm = new FormGroup({
      login: new FormControl(this.admin.login, [Validators.required]),
      password: new FormControl(this.admin.password, [Validators.required])
  });
  }

  get login() { return this.registerForm.get('login'); }
  get password() { return this.registerForm.get('password'); }
  onSubmit() {
    this.erreurActif=false;
     this.erreurFlag=false;
    this.service.findbyLoginAndPassword(this.admin).subscribe(
      response => {

        if(response != null){
          this.admin = response;
          if(this.admin.actif==1){
            this.auth.isLoggedAdmin=true;
            sessionStorage.setItem("admin", JSON.stringify(this.admin));
            this.router.navigate(['/articles']);
          }
          else{
            this.erreurActif=true;
          }
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
