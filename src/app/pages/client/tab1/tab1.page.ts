import { Component, OnInit } from '@angular/core';
import { RestService } from '../../../services/rest.service';
import { News } from 'src/app/interfaces/news';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  // token: any;
  articles: News[]=[];
  cicles: any;
  df=1;
  contador=0;
  contador2=0;
  clIDs=[];
  cicleUser= this.restService.getcicleUser();


  constructor(public restService: RestService,) {
    // this.hacerLogin();
    this.obtenerArticles();
    
  
  }
 
  // hacerLogin(){
  //   this.restService.login('raulreyes@gmail.com','123456').then(data => {
  //     console.log(data);
  //     this.token = data;
  //   });
  // }

  obtenerArticles(){
    this.restService.getArticles()
    .then((res: any) => {
      this.articles=res.data;
      console.log(this.articles);
      if(this.df>0){
        this.contador=0;
        this.clIDs=[];
        this.articles.forEach((id: { cicle_id: number; }) => {
          console.log("FOREACH");
          if(id.cicle_id==this.cicleUser){
            console.log(this.cicleUser);
            this.clIDs[this.contador]=id;
            this.contador = this.contador+1;
          }
        });
        this.articles = this.clIDs;
      }
    },
    );
  }

onChange(){
     if(this.df===1){
       this.df=0
     }
     else{
       this.df=1
     }
      this.obtenerArticles();
    }
  }