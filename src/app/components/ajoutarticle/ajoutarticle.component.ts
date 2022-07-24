import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Article } from 'src/app/classes/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-ajoutarticle',
  templateUrl: './ajoutarticle.component.html',
  styleUrls: ['./ajoutarticle.component.css']
})
export class AjoutarticleComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  article:Article=new Article();
  constructor(private formBuilder: FormBuilder,private srv : ArticleService) { 
    
  }

  ngOnInit(): void {

    this.registerForm = new FormGroup({
      nom: new FormControl(this.article.nom, [Validators.required]),
      description: new FormControl(this.article.description, [Validators.required]),
      tarif: new FormControl(this.article.tarif, [Validators.required]),
      categorie: new FormControl(this.article.categorie, [Validators.required]),
      image: new FormControl(this.article.image, [Validators.required])
  });
    
}

  get image() { return this.registerForm.get('image'); }
  get file() { return this.registerForm.get('file'); }
  get categorie() { return this.registerForm.get('categorie'); }
  get tarif() { return this.registerForm.get('tarif'); }
  get description() { return this.registerForm.get('description'); }
  get nom() { return this.registerForm.get('nom'); }
  get f() { return this.registerForm.controls; }

  onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
    
        this.srv.create(this.article);

  }
  onReset() {
        this.submitted = false;
        this.registerForm.reset();
  } 

}
