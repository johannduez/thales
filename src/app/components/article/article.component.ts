import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
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
  selectedFile: File;

  constructor(private router:Router,
    private route:ActivatedRoute,private artSrv:ArticleService,
    private formBuilder: FormBuilder,private domSanitizer: DomSanitizer) { 
    
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
    this.artSrv.getById(this.id).subscribe(
        (res:Article) => {
          this.article =res;
        this.article.retrievedImage = this.domSanitizer.bypassSecurityTrustUrl('data:image/jepg;base64,' + this.article.picByte);
         
        }
      );
  }
 get image() { return this.registerForm.get('image'); }
  get file() { return this.registerForm.get('file'); }
  get categorie() { return this.registerForm.get('categorie'); }
  get tarif() { return this.registerForm.get('tarif'); }
  get description() { return this.registerForm.get('description'); }
  get nom() { return this.registerForm.get('nom'); }
  get f() { return this.registerForm.controls; }

  onSubmit(){
    const uploadImageData = new FormData();
    if(this.selectedFile!=undefined)
      uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    else uploadImageData.append('imageFile',this.selectedFile);  
    uploadImageData.append('id',this.article.id.toString());
    uploadImageData.append('categorie',this.article.categorie);
    uploadImageData.append('description',this.article.description);
    uploadImageData.append('nom',this.article.nom);
    uploadImageData.append('tarif',this.article.tarif.toString());
    uploadImageData.append('version',this.article.version.toString());
    uploadImageData.append('picByte',this.article.picByte);
   
    this.artSrv.update(uploadImageData).subscribe(
      response=>{
        this.router.navigate(['/articles']);
      }
    );
    
  }
  //Gets called when the user selects an image
  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
    this.article.image=this.selectedFile.name
  }
}

