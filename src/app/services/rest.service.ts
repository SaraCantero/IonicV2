import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
//import { registerLocaleData } from "@angular/common";
//import { resolve } from "dns";

@Injectable({
  providedIn: "root",
})
export class RestService {
  
  apiUrl = "https://allsites.es/sales_in_api/public/api";
  token: any;
  //tokenLogin: any; //Recibe el token del metodo login
  ofertaId: any;
  //userId: any;
  //cicleUser: any;

  //Temporales
  tokenLogin = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiODY4ZDQ0MzgwNThkZDVlYzM3YzFhNzBlZmFjOTAxY2FhZTk5NjJmNzBlMTM4ODJmZGUzNTZkZjkzNDVhMjI5MzE0OTQwNDhlODdhZmIwZjMiLCJpYXQiOjE2MTMwMzA4MzQsIm5iZiI6MTYxMzAzMDgzNCwiZXhwIjoxNjQ0NTY2ODM0LCJzdWIiOiIzNyIsInNjb3BlcyI6W119.ikS3Css9uviVgfGW9vqO9X3w1fei42T6BmU7p6pzNK0NRZoaXhKZNW-Vbmiw2ACgBV78D5e0rXBapWJHVa_RWmV2KqTv7u1bAhpug3ktO4THzdml_phoxy9QydsdrOHE60p4Qxs3oY8exPM2IJ0X65EFiS7PkB33hrc9P2YSVtqVX5_6CReZ0xeOZhZlRxb12CMOR_YMCoVSR-e4xwW5IfMADTT8LoUyEeCHYWW8QkhiAvBgeY8nhJFhqMD5i6BWFJU4oWPOFbpKfDxbnjE26B4nyNxGBc0YKfYxOigFe9TbY1NXCs6xvCpgpE0hFXy7Ywl02C2i042c5_oq1wMdxGiw6ql_QuYLIN1NBE3FNHsG0-Z09F0uu8Vu_fnnHqCrhW4bftdspx61HvWbW8T7WZgUYr9tXwLJCO9hQ7dGDzqWAsV9AUMlZcJDsTMaQLSCC4xWibiFv6Pa7HxXZkK41x3OutkBHhUNJtF0uHrFyNuTE_nRIxn7e1V8cZw7V6FOk8iDRKZx9pMpIBtD4Ogq54QcDCW3d3xsSvHO_JF2GSliVjfqeJzayezjFfgvK05Iet4xvLjQ6Jqo0wA8UTxT4x17hM8krXavLWi_Cij0jJI9m1o2_-wpAk5Vwm7G-TbiY2A5KKJnLiOcQcdqN5kZ5rKJf2L8XQxiK0jT9R1w_RE";
  cicleUser=1;
  userId=37;
  //
 

  constructor(private http: HttpClient) {}

  //Metodos

  getUsuarios(){
    return new Promise((resolve) => {
      this.http.get(this.apiUrl +"/users", {
        headers: new HttpHeaders().set('Authorization','Bearer ' + this.tokenLogin),
      }).subscribe(
        (data)=>{
          console.log(data);
          resolve(data);
        },
        (err) =>{
          console.log(err);
        }
      );
      });
    
    }

  getArticles() {
    return new Promise((resolve) => {
      this.http.get(this.apiUrl + "/articles", {}).subscribe(
        (data) => {
          console.log(data);
          resolve(data);
         
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }

  getOffers() {
    return new Promise<any>((resolve) => {
      this.http.get(this.apiUrl + "/offersNotApplied/"+this.userId, { 
        headers: new HttpHeaders().set('Authorization','Bearer ' + this.tokenLogin),
      }).subscribe(
        (data) => {
          resolve(data);
        },
        (err) => {
          console.log(err)
        }
      );
    });

  }

  getCicles(){
    return new Promise<any>((resolve) => {
      this.http.get(this.apiUrl + "/cicles"
      ).subscribe(
        (data) => {
          resolve(data);
        },
        (err) => {
          console.log(err)
        }
      );
    });
  }

  getApliquesOffers(){

    return new Promise<any>((resolve) => {
      this.http.get(this.apiUrl + "/offersApplied/"+this.userId, { 
        headers: new HttpHeaders().set('Authorization','Bearer ' + this.tokenLogin),
      }).subscribe(
        (data) => {
          resolve(data);
        },
        (err) => {
          console.log(err)
        }
      );
    });
  }

  postApliqueOffer(user_id: any, offer_id: any){

    return new Promise<any>((resolve) => {
      this.http.post(this.apiUrl + "/applied", {
        user_id: user_id,
        offer_id: offer_id,}, {
        headers: new HttpHeaders().set('Authorization','Bearer ' + this.tokenLogin),
      }).subscribe(
        (data) => {
          console.log(data);
          resolve(data);
        },
        (err) => {
          console.log(err)
        }
      );
    });
  }

  //Register/Login

  register(name:String, surname:String, email:String, password:String, c_password:String, cicle_id: String){
    return new Promise((resolve) => {
      this.http.post(this.apiUrl+"/register", {
        name: name,
        surname: surname,  
        email: email,
        password: password,
        c_password: c_password,
        cicle_id: cicle_id,
      }).subscribe(
        (data) => {
          resolve(data);
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }

  login(email:String, password:String) {
    return new Promise((resolve) => {
      this.http
        .post(this.apiUrl + "/login", {
          email: email,
          password: password,
        })
        .subscribe(
          (data) => {
            this.token = data;
            resolve(data);
          },
          (err) => {
            console.log(err);
          }
        );
    });
  }

  activarUser(user_id:String){
    return new Promise((resolve)=>{
      this.http.post(this.apiUrl + "/activate", {
        user_id: user_id,
        headers: new HttpHeaders().set('Authorization','Bearer ' + this.token2),
      })
      .subscribe(
        (data)=>{
          resolve(data);
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }

  //Token
  setToken(valor: any){
    this.tokenLogin= valor;
  }

  getToken(){
    return this.tokenLogin;
  }

  //CicleUser
  setcicleUser(valor: any){
    this.cicleUser=valor;
  }
  getcicleUser(){
    return this.cicleUser;
  }

  //OfertasId
  setOfertaId(valor: any){

    this.ofertaId=valor;
  }

  getOfertaId(){

    return this.ofertaId;
  }

  //UserId
  setUserId(valor: any){

    this.userId=valor;
  }
  getUserId(){
    return this.userId;
  }
}