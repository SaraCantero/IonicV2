import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ModalController } from "@ionic/angular";
import { OfferComponent } from "../components/offer/offer.component";
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
  type="admin";

  //Temporales
  tokenLogin = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiODY4ZDQ0MzgwNThkZDVlYzM3YzFhNzBlZmFjOTAxY2FhZTk5NjJmNzBlMTM4ODJmZGUzNTZkZjkzNDVhMjI5MzE0OTQwNDhlODdhZmIwZjMiLCJpYXQiOjE2MTMwMzA4MzQsIm5iZiI6MTYxMzAzMDgzNCwiZXhwIjoxNjQ0NTY2ODM0LCJzdWIiOiIzNyIsInNjb3BlcyI6W119.ikS3Css9uviVgfGW9vqO9X3w1fei42T6BmU7p6pzNK0NRZoaXhKZNW-Vbmiw2ACgBV78D5e0rXBapWJHVa_RWmV2KqTv7u1bAhpug3ktO4THzdml_phoxy9QydsdrOHE60p4Qxs3oY8exPM2IJ0X65EFiS7PkB33hrc9P2YSVtqVX5_6CReZ0xeOZhZlRxb12CMOR_YMCoVSR-e4xwW5IfMADTT8LoUyEeCHYWW8QkhiAvBgeY8nhJFhqMD5i6BWFJU4oWPOFbpKfDxbnjE26B4nyNxGBc0YKfYxOigFe9TbY1NXCs6xvCpgpE0hFXy7Ywl02C2i042c5_oq1wMdxGiw6ql_QuYLIN1NBE3FNHsG0-Z09F0uu8Vu_fnnHqCrhW4bftdspx61HvWbW8T7WZgUYr9tXwLJCO9hQ7dGDzqWAsV9AUMlZcJDsTMaQLSCC4xWibiFv6Pa7HxXZkK41x3OutkBHhUNJtF0uHrFyNuTE_nRIxn7e1V8cZw7V6FOk8iDRKZx9pMpIBtD4Ogq54QcDCW3d3xsSvHO_JF2GSliVjfqeJzayezjFfgvK05Iet4xvLjQ6Jqo0wA8UTxT4x17hM8krXavLWi_Cij0jJI9m1o2_-wpAk5Vwm7G-TbiY2A5KKJnLiOcQcdqN5kZ5rKJf2L8XQxiK0jT9R1w_RE";
  token2 = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDUzYTFhOTNmNjMyOGE4ZWJjY2ZlYzZkMGE0YzgwZmE1M2RhYzBiNzgzOGI4NmVjZmE1NGU4YzZmOWIwM2ZkZDI4ZDFmMGM4MmVlYzZlMTciLCJpYXQiOjE2MTMwNDEwMTQsIm5iZiI6MTYxMzA0MTAxNCwiZXhwIjoxNjQ0NTc3MDE0LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.g3ouhEO3AGccEQxQdAhWy67JDfVXL1NbPDgvnT75TfuUQBCMYvyo3l3i1J1dzekfzOI9-GCgmS5EtZkINK4NvKp2FVIEjpAli9XJGd5Fnbr8cqN823NFMMBkCGdohGAFNkOo03jOgeX7ubg4NYRsF2R-h59UlKkaUVeDayezKId3pYQ_OE1snZugT5Gp7TMaK9KlDJlbC5z04qY6I_QL5CeTMETv8GjjViRPbcL4l3faC8dpIC7hbh-kyblsXD2lk60bU0ByfGZkEMxJjR_Obbh_2TqIXY19d4PZRU7qQOXfHgcwxF9ftPAWK_piAxKkwpJZnWE1HCFp3AWqdNlh2PphFyUvwqT5sj_TzX_-JViFhFhRrQ6bvqiiiyykw4OwmHVsNLgXtZCfWxUIAuM3OA8QHXxisMeMzJx0HW3wEKV3dE2DzJ9dnV7JBET8t0To5tXNm1wIxBsPA2cQtsQ9uexC2JAtBUBzIQn8Hm7IJGfWJ-i-VA09EUV6ObAgDKd0EKVmHyv5e1iPr3aCXzPEYOojOY_8QNH4jHeDOSnl_avInuxhIn9QEVcP0eP5GW6YDwMwBBYfOY_V2knjChvI3Egai6viMfAhhmuP2aRQa5tDAl4iIRh_Fa60o53Swl0vHnSut3fKlKIZRMfHprZi95nT_xu6JKb6hiexO1BNtcw";
  cicleUser=1;
  userId=37;
  //
 

  constructor(private http: HttpClient, private modalCtrl: ModalController) {}

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

  getAllOffers() {
    return new Promise<any>((resolve) => {
      this.http.get(this.apiUrl + "/offers", { 
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

  async abrirModal($id: any, $titulo: any, $descripcion: any, $ciclo: any, $fecha: any, $cand: any){
    const modal = await this.modalCtrl.create({
      component: OfferComponent,
      componentProps: {
      headline: $titulo,
      description: $descripcion,
      id: 'Id: '+$id,
      cicle_id: 'Id Ciclo: '+$ciclo,
      date_max: 'Fecha máx: '+$fecha,
      num_candidates: 'Num Candidatos: '+$cand
      }
      });
      await modal.present();
  }
  
  borrarOfertas(idO: any){
    return new Promise<any>((resolve) => {
      this.http.delete(this.apiUrl + "/offers/"+idO, { 
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

  activarUser(user_id:any){
    return new Promise((resolve)=>{
      this.http.post(this.apiUrl + "/activate", {
        user_id: user_id},{
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

  //Type
  setType(valor: any){
    this.type=valor;
  }

  getType(){
    return this.type;
  }
}