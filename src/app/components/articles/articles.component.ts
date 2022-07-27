import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Article } from 'src/app/classes/article';
import { ArticleService } from 'src/app/services/article.service';
import { ConfirmationDialogComponent, ConfirmDialogModel } from '../confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})

export class ArticlesComponent implements OnInit {
  articles:Article[]=[];
  result: string = '';
  dataSource: MatTableDataSource<Article>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[]  = ['id', 'nom','description','tarif','categorie','image','modifier','supprimer'];
  constructor(public dialog: MatDialog,private router:Router,private artSrv : ArticleService,private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
     this.init();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  init(){
    this.artSrv.getAll().subscribe((data: Article[])=>{
      this.articles = data;
      for(let art of this.articles){
         art.retrievedImage = this.domSanitizer.bypassSecurityTrustUrl('data:image/jepg;base64,' + art.picByte);

      }
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    });
    
    //this.dataSource = new MatTableDataSource(this.articles);
  }
  supprimer(article:Article){
    const dialogData = new ConfirmDialogModel();
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: "600px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      if(this.result =="ok"){
           this.artSrv.delete(article.id).subscribe();
           this.articles = this.articles.filter(item => item.id != article.id);
      }

    });
 

  }
 
  modifier(article:Article){
     this.router.navigate(['/article/'+article.id]);

  }

}
