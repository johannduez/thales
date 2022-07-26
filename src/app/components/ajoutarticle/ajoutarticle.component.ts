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
    selectedFile: File;
  constructor(private formBuilder: FormBuilder,private srv : ArticleService) { 
    
  }

  ngOnInit(): void {

    this.registerForm = new FormGroup({
      nom: new FormControl(this.article.nom, [Validators.required]),
      description: new FormControl(this.article.description, [Validators.required]),
      tarif: new FormControl(this.article.tarif, [Validators.required]),
      categorie: new FormControl(this.article.categorie, [Validators.required]),
      image: new FormControl(this.article.image, [Validators.required]),
      file: new FormControl(null, [Validators.required])
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
    
       /* this.srv.create(this.article);*/
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


         this.srv.create(uploadImageData).subscribe();
        this.registerForm.reset();

  }
  onReset() {
        this.submitted = false;
        this.registerForm.reset();
       
  } 
  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
    this.article.image=this.selectedFile.name
  }

}
