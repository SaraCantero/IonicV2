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
  data: News[] = Array(4);

  constructor(public restService: RestService,) {
    // this.hacerLogin();
    this.obtenerArticles();
    
  
  }
   loadData(event) {
     setTimeout(()=>{
       console.log("Cargando noticias...");
       if(this.data.length > this.articles.length ){
       event.target.complete();
        return;
      }
      const nuevoArr = Array(4);
      this.data.push( ...nuevoArr);
      event.target.complete();

     }, 1000);
   
   }

  //  infArticles(event?){
  //   this.restService.getTopHeadlines()
  //   .subscribe(resp => {
  //     console.log('articles', resp);
  //     if(resp.articles.length ===0){
  //       event.target.disabled=true;
  //       event.target.complete();
  //       return;
  //     }
  //     this.articles.push(...resp.articles);
  //     if(event){
  //       event.target.complete();
  //     }
  //   })
  //  }



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