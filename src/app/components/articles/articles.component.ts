import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/classes/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articles:Article[]=[];
  constructor(private artSrv : ArticleService) { }

  ngOnInit(): void {
     this.artSrv.getAll().subscribe((data: Article[])=>{
      this.articles = data;
    });
  }

}
