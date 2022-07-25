import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/classes/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  id:any;
  article:Article=new Article();
  registerForm: FormGroup;
  constructor(private router:Router,private route:ActivatedRoute,private artSrv:ArticleService,private formBuilder: FormBuilder) { 
    
  }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{this.id=params['id']});
    this.init();
    this.registerForm = new FormGroup({
      nom: new FormControl(this.article.nom, [Validators.required]),
      description: new FormControl(this.article.description, [Validators.required]),
      tarif: new FormControl(this.article.tarif, [Validators.required]),
      categorie: new FormControl(this.article.categorie, [Validators.required]),
      image: new FormControl(this.article.image, [Validators.required])
  });
  }
  init(){
    this.artSrv.getById(this.id).subscribe((data: Article)=>{
      this.article = data;
    });
  }
 get image() { return this.registerForm.get('image'); }
  get file() { return this.registerForm.get('file'); }
  get categorie() { return this.registerForm.get('categorie'); }
  get tarif() { return this.registerForm.get('tarif'); }
  get description() { return this.registerForm.get('description'); }
  get nom() { return this.registerForm.get('nom'); }
  get f() { return this.registerForm.controls; }
  supprimer(){
   this.artSrv.delete(this.article.id).subscribe();
    this.router.navigate(['/articles']);
  }
  onSubmit(){
    this.artSrv.update(this.article).subscribe();
    this.router.navigate(['/articles']);
  }
}

